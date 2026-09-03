import React, { useState } from "react";
import { useRouter } from "next/router";
import { mobile_menu } from "@/data/menu-data";

const MobileMenus = ({ setIsCanvasOpen }) => {
  const [isActiveMenu, setIsActiveMenu] = useState("");
  const router = useRouter();

  const handleOpenSubMenu = (title) => {
    setIsActiveMenu((prev) => (prev === title ? "" : title));
  };

  const handleNav = (href) => {
    if (setIsCanvasOpen) setIsCanvasOpen(false);
    if (href) {
      if (router.asPath === href) return;
      router.push(href);
    }
  };

  return (
    <nav className="tp-main-menu-content">
      <ul>
        {mobile_menu.map((menu, i) => {
          if (menu.sub_menu) {
            const isOpen = isActiveMenu === menu.title;
            return (
              <li key={menu.id || i} className={`has-dropdown ${isOpen ? 'dropdown-opened' : ''}`}>
                <a
                  className={`cursor-pointer ${isOpen ? 'expanded' : ''}`}
                  onClick={() => handleOpenSubMenu(menu.title)}
                >
                  {menu.title}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenSubMenu(menu.title);
                    }}
                    className={`dropdown-toggle-btn ${isOpen ? 'dropdown-opened' : ''}`}
                  >
                    <i className="fa-regular fa-angle-right"></i>
                  </button>
                </a>
                <ul className={`tp-submenu ${isOpen ? 'active' : ''}`} style={{ display: isOpen ? 'block' : 'none' }}>
                  {menu.sub_menus.map((b, idx) => (
                    <li key={idx}>
                      <a
                        className="cursor-pointer"
                        onClick={() => handleNav(b.link)}
                      >
                        {b.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            );
          }

          return (
            <li key={menu.id || i}>
              <a
                className="cursor-pointer"
                onClick={() => handleNav(menu.link)}
              >
                {menu.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default MobileMenus;
