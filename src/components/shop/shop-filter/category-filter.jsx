import React from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
// internal
import { handleFilterSidebarClose } from "@/redux/features/shop-filter-slice";

const defaultCategories = [
  "Smart Tablets",
  "Headphones & Audio",
  "Smart Watches",
  "Computers & Laptops",
  "Cameras & Photo",
  "Mobile Accessories",
];

const CategoryFilter = ({ setCurrPage, shop_right = false, all_products = [] }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  // handle category route
  const handleCategoryRoute = (title) => {
    setCurrPage(1);
    const categoryParam = title.toLowerCase().replace("&", "").split(" ").join("-");
    router.push(`/${shop_right ? 'shop-right-sidebar' : 'shop'}?category=${encodeURIComponent(categoryParam)}`);
    dispatch(handleFilterSidebarClose());
  };

  // calculate categories from products if available
  const categoriesMap = {};
  if (all_products && all_products.length > 0) {
    all_products.forEach((p) => {
      if (p.parent) {
        categoriesMap[p.parent] = (categoriesMap[p.parent] || 0) + 1;
      }
    });
  }

  // fallback categories if none in current items
  if (Object.keys(categoriesMap).length === 0) {
    defaultCategories.forEach((cat) => {
      categoriesMap[cat] = 0;
    });
  }

  const categoryEntries = Object.entries(categoriesMap);

  return (
    <div className="tp-shop-widget mb-50">
      <h3 className="tp-shop-widget-title">Categories</h3>
      <div className="tp-shop-widget-content">
        <div className="tp-shop-widget-categories">
          <ul>
            {categoryEntries.map(([parent, count]) => {
              const formattedSlug = parent.toLowerCase().replace("&", "").split(" ").join("-");
              const isActive = router.query.category === formattedSlug;
              return (
                <li key={parent}>
                  <a
                    onClick={() => handleCategoryRoute(parent)}
                    style={{ cursor: "pointer" }}
                    className={isActive ? "active font-bold text-primary" : ""}
                  >
                    {parent} <span>{count}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
