import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedOut } from "@/redux/features/auth/authSlice";

// language
function Language({ active, handleActive }) {
  const [currentLang, setCurrentLang] = useState("English");

  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "Hindi (हिंदी)" },
    { code: "gu", name: "Gujarati (ગુજરાતી)" },
    { code: "es", name: "Spanish (Español)" },
    { code: "fr", name: "French (Français)" },
    { code: "de", name: "German (Deutsch)" },
  ];

  const handleSelect = (langName) => {
    setCurrentLang(langName);
    if (typeof window !== "undefined") {
      localStorage.setItem("selected_lang", langName);
    }
    handleActive("");
  };

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("selected_lang");
      if (saved) setCurrentLang(saved);
    }
  }, []);

  return (
    <div className="tp-header-top-menu-item tp-header-lang">
      <span
        onClick={() => handleActive('lang')}
        className="tp-header-lang-toggle cursor-pointer"
        id="tp-header-lang-toggle"
      >
        {currentLang} <i className="fa-regular fa-angle-down"></i>
      </span>
      <ul className={active === 'lang' ? "tp-lang-list-open" : ""}>
        {languages.map((l) => (
          <li key={l.code}>
            <a
              onClick={(e) => {
                e.preventDefault();
                handleSelect(l.name);
              }}
              className={`cursor-pointer ${currentLang === l.name ? "active text-primary fw-bold" : ""}`}
              href="#"
            >
              {l.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

// currency
function Currency({ active, handleActive }) {
  const [currentCurrency, setCurrentCurrency] = useState("USD ($)");

  const currencies = [
    { code: "USD", symbol: "$", label: "USD ($)" },
    { code: "INR", symbol: "₹", label: "INR (₹)" },
    { code: "EUR", symbol: "€", label: "EUR (€)" },
    { code: "GBP", symbol: "£", label: "GBP (£)" },
    { code: "AED", symbol: "د.إ", label: "AED (د.إ)" },
    { code: "CAD", symbol: "$", label: "CAD ($)" },
  ];

  const handleSelect = (curr) => {
    setCurrentCurrency(curr.label);
    if (typeof window !== "undefined") {
      localStorage.setItem("selected_currency", JSON.stringify(curr));
    }
    handleActive("");
  };

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("selected_currency");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed?.label) setCurrentCurrency(parsed.label);
        } catch (e) {}
      }
    }
  }, []);

  return (
    <div className="tp-header-top-menu-item tp-header-currency">
      <span
        onClick={() => handleActive('currency')}
        className="tp-header-currency-toggle cursor-pointer"
        id="tp-header-currency-toggle"
      >
        {currentCurrency} <i className="fa-regular fa-angle-down"></i>
      </span>
      <ul className={active === 'currency' ? "tp-currency-list-open" : ""}>
        {currencies.map((c) => (
          <li key={c.code}>
            <a
              onClick={(e) => {
                e.preventDefault();
                handleSelect(c);
              }}
              className={`cursor-pointer ${currentCurrency === c.label ? "active text-primary fw-bold" : ""}`}
              href="#"
            >
              {c.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

// setting
function ProfileSetting({active,handleActive}) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  // handle logout
  const handleLogout = () => {
    dispatch(userLoggedOut());
    router.push('/')
  }
  return (
    <div className="tp-header-top-menu-item tp-header-setting">
      <span
        onClick={() => handleActive('setting')}
        className="tp-header-setting-toggle"
        id="tp-header-setting-toggle"
      >
        Setting
      </span>
      <ul className={active === 'setting' ? "tp-setting-list-open" : ""}>
        <li>
          <Link href="/profile">My Profile</Link>
        </li>
        <li>
          <Link href="/wishlist">Wishlist</Link>
        </li>
        <li>
          <Link href="/cart">Cart</Link>
        </li>
        <li>
          {!user?.name &&<Link href="/login" className="cursor-pointer">Login</Link>}
          {user?.name &&<a onClick={handleLogout} className="cursor-pointer">Logout</a>}
        </li>
      </ul>
    </div>
  );
}

const HeaderTopRight = () => {
  const [active, setIsActive] = useState('');
  // handle active
  const handleActive = (type) => {
    if(type === active){
      setIsActive('')
    }
    else {
      setIsActive(type)
    }
  }
  return (
    <div className="tp-header-top-menu d-flex align-items-center justify-content-end">
      <Language active={active} handleActive={handleActive} />
      <Currency active={active} handleActive={handleActive} />
      <ProfileSetting active={active} handleActive={handleActive} />
    </div>
  );
};

export default HeaderTopRight;
