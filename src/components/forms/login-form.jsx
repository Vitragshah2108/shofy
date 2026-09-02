import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRouter } from 'next/router';
import Link from 'next/link';
// internal
import { CloseEye, OpenEye } from '@/svg';
import ErrorMsg from '../common/error-msg';
import { useLoginUserMutation } from '@/redux/features/auth/authApi';
import { notifyError, notifySuccess } from '@/utils/toast';


import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { userLoggedIn } from "@/redux/features/auth/authSlice";

// schema
const schema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});
const LoginForm = () => {
  const [showPass, setShowPass] = useState(false);
  const [loginUser, { }] = useLoginUserMutation();
  const dispatch = useDispatch();
  const router = useRouter();
  const { redirect } = router.query;
  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleLocalLogin = (data) => {
    try {
      const users = JSON.parse(localStorage.getItem("shofy_users") || "[]");
      const matched = users.find(
        (u) => u.email?.toLowerCase() === data.email?.toLowerCase()
      );

      // 1. If user exists in registered accounts list, verify password strictly
      if (matched) {
        if (matched.password === data.password) {
          const sessionData = {
            accessToken: "token_" + Date.now(),
            user: {
              _id: matched._id || "usr_" + Date.now(),
              name: matched.name || "User",
              email: matched.email,
              role: matched.role || "user",
            },
          };
          Cookies.set("userInfo", JSON.stringify(sessionData), { expires: 0.5 });
          dispatch(userLoggedIn(sessionData));
          notifySuccess("Login successfully");
          router.push(redirect || "/profile");
          return { handled: true, success: true };
        } else {
          notifyError("Incorrect password! Please check and try again.");
          return { handled: true, success: false };
        }
      }

      // 2. Check if it's the owner/admin account
      const isOwnerEmail =
        data.email?.toLowerCase() === "vitrag_shah@momentum01.com" ||
        data.email?.toLowerCase() === "vitrag_shah@momentum91.com" ||
        data.email?.toLowerCase() === "vitragshah2108@gmail.com";

      if (isOwnerEmail) {
        const savedOwnerPass = localStorage.getItem("shofy_owner_password");
        if (savedOwnerPass) {
          if (savedOwnerPass === data.password) {
            const sessionData = {
              accessToken: "token_" + Date.now(),
              user: {
                _id: "usr_vitrag",
                name: "Vitrag Shah",
                email: data.email,
                role: "admin",
              },
            };
            Cookies.set("userInfo", JSON.stringify(sessionData), { expires: 0.5 });
            dispatch(userLoggedIn(sessionData));
            notifySuccess("Login successfully");
            router.push(redirect || "/profile");
            return { handled: true, success: true };
          } else {
            notifyError("Incorrect password! Please check and try again.");
            return { handled: true, success: false };
          }
        }
      }

      return { handled: false, success: false };
    } catch (e) {
      return { handled: false, success: false };
    }
  };

  // onSubmit
  const onSubmit = (data) => {
    // 1. Local account password check
    const localResult = handleLocalLogin(data);
    if (localResult.handled) {
      if (localResult.success) {
        reset();
      }
      return;
    }

    // 2. Remote backend query
    loginUser({
      email: data.email,
      password: data.password,
    })
      .then((res) => {
        if (res?.data?.status && res?.data?.data) {
          notifySuccess("Login successfully");
          router.push(redirect || "/profile");
          reset();
        } else {
          notifyError(res?.error?.data?.error || res?.error?.data?.message || "Invalid Email or Password!");
        }
      })
      .catch((err) => {
        notifyError(err?.message || "Invalid Email or Password!");
      });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="tp-login-input-wrapper">
        <div className="tp-login-input-box">
          <div className="tp-login-input">
            <input {...register("email", { required: `Email is required!` })} name="email" id="email" type="email" placeholder="shofy@mail.com" />
          </div>
          <div className="tp-login-input-title">
            <label htmlFor="email">Your Email</label>
          </div>
          <ErrorMsg msg={errors.email?.message} />
        </div>
        <div className="tp-login-input-box">
          <div className="p-relative">
            <div className="tp-login-input">
              <input
                {...register("password", { required: `Password is required!` })}
                id="password"
                type={showPass ? "text" : "password"}
                placeholder="Enter your password"
              />
            </div>
            <div className="tp-login-input-eye" id="password-show-toggle">
              <span className="open-eye" onClick={() => setShowPass(!showPass)}>
                {showPass ? <CloseEye /> : <OpenEye />}
              </span>
            </div>
            <div className="tp-login-input-title">
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <ErrorMsg msg={errors.password?.message}/>
        </div>
      </div>
      <div className="tp-login-suggetions d-sm-flex align-items-center justify-content-between mb-20">
        <div className="tp-login-remeber">
          <input id="remeber" type="checkbox" />
          <label htmlFor="remeber">Remember me</label>
        </div>
        <div className="tp-login-forgot">
          <Link href="/forgot">Forgot Password?</Link>
        </div>
      </div>
      <div className="tp-login-bottom">
        <button type='submit' className="tp-login-btn w-100">Login</button>
      </div>
    </form>
  );
};

export default LoginForm;