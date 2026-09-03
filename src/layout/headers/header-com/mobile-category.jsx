import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
// internal
import { useGetProductTypeCategoryQuery } from "@/redux/features/categoryApi";
import ErrorMsg from "@/components/common/error-msg";
import Loader from "@/components/loader/loader";

const defaultElectronicsCategories = [
  {
    _id: "cat_tab",
    parent: "Smart Tablets",
    children: ["iPad Pro", "Android Tablets", "Drawing Tablets", "Kids Tablets"],
  },
  {
    _id: "cat_audio",
    parent: "Headphones & Audio",
    children: ["Wireless Earbuds", "Noise Cancelling", "Over-Ear Headphones", "Bluetooth Speakers"],
  },
  {
    _id: "cat_watch",
    parent: "Smart Watches",
    children: ["Apple Watch", "Fitness Trackers", "Galaxy Watch", "Sport Watches"],
  },
  {
    _id: "cat_comp",
    parent: "Computers & Laptops",
    children: ["Gaming Laptops", "MacBooks", "Ultrabooks", "Monitors & Displays"],
  },
  {
    _id: "cat_cam",
    parent: "Cameras & Photo",
    children: ["DSLR Cameras", "Mirrorless Cameras", "Action Cameras", "Lenses & Tripods"],
  },
  {
    _id: "cat_acc",
    parent: "Mobile Accessories",
    children: ["Fast Chargers", "Wireless Chargers", "Power Banks", "Protective Cases"],
  },
];

const MobileCategory = ({ isCategoryActive, categoryType = "electronics", setIsCanvasOpen }) => {
  const { data: categories, isError, isLoading } = useGetProductTypeCategoryQuery(categoryType);
  const [isActiveSubMenu, setIsActiveSubMenu] = useState("");
  const router = useRouter();

  // handleOpenSubMenu
  const handleOpenSubMenu = (title) => {
    if (title === isActiveSubMenu) {
      setIsActiveSubMenu("");
    } else {
      setIsActiveSubMenu(title);
    }
  };

  // handle category route
  const handleCategoryRoute = (title, route) => {
    if (setIsCanvasOpen) setIsCanvasOpen(false);
    if (route === "parent") {
      router.push(
        `/shop?category=${encodeURIComponent(title.toLowerCase())}`
      );
    } else {
      router.push(
        `/shop?subCategory=${encodeURIComponent(title.toLowerCase())}`
      );
    }
  };

  const category_items = categories?.result?.length > 0 ? categories.result : defaultElectronicsCategories;

  let content = category_items.map((item) => (
    <li className="has-dropdown" key={item._id}>
      <a className="cursor-pointer" onClick={() => handleCategoryRoute(item.parent, "parent")}>
        {item.img && (
          <span>
            <Image src={item.img} alt="cate img" width={50} height={50} />
          </span>
        )}
        {item.parent}
        {item.children && item.children.length > 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleOpenSubMenu(item.parent);
            }}
            className="dropdown-toggle-btn"
          >
            <i className="fa-regular fa-angle-right"></i>
          </button>
        )}
      </a>

      {item.children && item.children.length > 0 && (
        <ul className={`tp-submenu ${isActiveSubMenu === item.parent ? "active" : ""}`}>
          {item.children.map((child, i) => (
            <li
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                handleCategoryRoute(child, "children");
              }}
            >
              <a className="cursor-pointer">{child}</a>
            </li>
          ))}
        </ul>
      )}
    </li>
  ));

  return <ul className={isCategoryActive ? "active" : ""}>{content}</ul>;
};

export default MobileCategory;
