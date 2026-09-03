import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { mobile_menu } from "@/data/menu-data";

const MobileMenus = ({ setIsCanvasOpen }) => {
  const [isActiveMenu, setIsActiveMenu] = useState("");
  const router = useRouter();

  // handleOpenSubMenu
  const handleOpenSubMenu = (title) => {
    if (title === isActiveMenu) {
      setIsActiveMenu("");
    } else {
      setIsActiveMenu(title);
    }
  };

  const handleLinkClick = (href) => {
    if (setIsCanvasOpen) setIsCanvasOpen(false);
    if (href) router.push(href);
  };

  return (
    <nav className="tp-main-menu-content">
      {mobile_menu.map((menu, i) => (
        <ul key={i}>
          {menu.sub_menu ? (
            <li className={`has-dropdown ${isActiveMenu === menu.title ? 'dropdown-opened' : ''}`}>
              <a
                className={`cursor-pointer ${isActiveMenu === menu.title ? 'expanded' : ''}`}
                onClick={() => handleOpenSubMenu(menu.title)}
              >
                {menu.title}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenSubMenu(menu.title);
                  }}
                  className={`dropdown-toggle-btn ${isActiveMenu === menu.title ? 'dropdown-opened' : ''}`}
                >
                  <i className="fa-regular fa-angle-right"></i>
                </button>
              </a>
              <ul className={`tp-submenu ${isActiveMenu === menu.title ? 'active' : ''}`}>
                {menu.sub_menus.map((b, idx) => (
                  <li key={idx}>
                    <a
                      className="cursor-pointer"
                      onClick={() => handleLinkClick(b.link)}
                    >
                      {b.title}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ) : (
            <li>
              <a
                className="cursor-pointer"
                onClick={() => handleLinkClick(menu.link)}
              >
                {menu.title}
              </a>
            </li>
          )}
        </ul>
      ))}
    </nav>
  );
};

export default MobileMenus;
