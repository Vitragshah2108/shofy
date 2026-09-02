import React from "react";
import { useRouter } from "next/router";
// internal
import ErrorMsg from "@/components/common/error-msg";
import { useGetProductTypeCategoryQuery } from "@/redux/features/categoryApi";
import CategoryListLoader from "@/components/loader/home/category-list-loader";

import category_data from "@/data/category-data";

const PrdCategoryList = () => {
  const {
    data: categories,
    isError,
    isLoading,
  } = useGetProductTypeCategoryQuery("electronics");
  const router = useRouter()

  // handle category route
  const handleCategoryRoute = (title) => {
    router.push(
      `/shop?category=${title
        .toLowerCase()
        .replace("&", "")
        .split(" ")
        .join("-")}`
    )
  }
  // decide what to render
  let content = null;

  if (isLoading) {
    content = <CategoryListLoader loading={isLoading}/>;
  } else {
    const category_items = categories?.result && categories.result.length > 0 
      ? categories.result 
      : category_data;

    content = category_items.map((item) => (
      <li key={item._id}>
        <a onClick={()=>handleCategoryRoute(item.parent)} className="cursor-pointer">{item.parent}</a>
      </li>
    ));
  }
  return <ul>{content}</ul>;
};

export default PrdCategoryList;
