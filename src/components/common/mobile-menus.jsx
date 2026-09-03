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

  const navigateTo = (e, href) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (setIsCanvasOpen) setIsCanvasOpen(false);
    if (href) {
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
                      <Link
                        href={b.link}
                        onClick={(e) => navigateTo(e, b.link)}
                        className="cursor-pointer"
                      >
                        {b.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            );
          }

          return (
            <li key={menu.id || i}>
              <Link
                href={menu.link}
                onClick={(e) => navigateTo(e, menu.link)}
                className="cursor-pointer"
              >
                {menu.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default MobileMenus;
