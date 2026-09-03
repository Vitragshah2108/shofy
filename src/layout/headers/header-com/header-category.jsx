import React from "react";
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

const HeaderCategory = ({ isCategoryActive, categoryType = "electronics" }) => {
  const {
    data: categories,
    isError,
    isLoading,
  } = useGetProductTypeCategoryQuery(categoryType);
  const router = useRouter();

  // handle category route
  const handleCategoryRoute = (title, route) => {
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
      <a
        className="cursor-pointer"
        onClick={() => handleCategoryRoute(item.parent, "parent")}
      >
        {item.img && (
          <span>
            <Image src={item.img} alt="cate img" width={50} height={50} />
          </span>
        )}
        {item.parent}
      </a>

      {item.children && (
        <ul className="tp-submenu">
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

export default HeaderCategory;
