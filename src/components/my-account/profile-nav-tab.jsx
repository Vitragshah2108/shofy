import React from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { userLoggedOut } from "@/redux/features/auth/authSlice";

function SingleNav({ active = false, id, title, icon }) {
  return (
    <button
      className={`nav-link ${active ? "active" : ""}`}
      id={`nav-${id}-tab`}
      data-bs-toggle="tab"
      data-bs-target={`#nav-${id}`}
      type="button"
      role="tab"
      aria-controls={id}
      aria-selected={active ? "true" : "false"}
    >
      <span>
        <i className={icon}></i>
      </span>
      {title}
    </button>
  );
}

const ProfileNavTab = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(userLoggedOut());
    router.push("/login");
  };

  return (
    <nav>
      <div
        className="nav nav-tabs tp-tab-menu flex-column"
        id="profile-tab"
        role="tablist"
      >
        <SingleNav
          active={true}
          id="profile"
          title="Profile"
          icon="fa-regular fa-user-pen"
        />
        <SingleNav
          id="information"
          title="Information"
          icon="fa-regular fa-circle-info"
        />
        <SingleNav
          id="order"
          title="My Orders"
          icon="fa-light fa-clipboard-list-check"
        />
        <SingleNav
          id="password"
          title="Change Password"
          icon="fa-regular fa-lock"
        />
        <button
          onClick={handleLogout}
          className="nav-link text-danger text-start mt-10"
          type="button"
        >
          <span>
            <i className="fa-regular fa-arrow-right-from-bracket"></i>
          </span>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default ProfileNavTab;
