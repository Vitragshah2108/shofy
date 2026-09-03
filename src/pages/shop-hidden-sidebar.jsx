import React, { useState,useEffect } from "react";
import SEO from "@/components/seo";
import Wrapper from "@/layout/wrapper";
import HeaderTwo from "@/layout/headers/header-2";
import ShopBreadcrumb from "@/components/breadcrumb/shop-breadcrumb";
import { useGetAllProductsQuery } from "@/redux/features/productApi";
import ErrorMsg from "@/components/common/error-msg";
import ShopHiddenSidebarArea from "@/components/shop/shop-hidden-sidebar-area";
import ShopFilterOffCanvas from "@/components/common/shop-filter-offcanvas";
import Footer from "@/layout/footers/footer";
import ShopHiddenLoader from "@/components/loader/shop/shop-hidden-loader";

import products_data from "@/data/products-data";

const ShopHiddenSidebarPage = () => {
  const { data: products, isError, isLoading } = useGetAllProductsQuery();
  const [priceValue, setPriceValue] = useState([0, 0]);
  const [selectValue, setSelectValue] = useState("");
  const [currPage, setCurrPage] = useState(1);
  const remoteData = (!isError && Array.isArray(products?.data)) ? products.data : [];
  const raw_products = [
    ...products_data,
    ...remoteData.filter((r) => !products_data.some((p) => p._id === r._id)),
  ];

  // Load the maximum price once the products have been loaded
  useEffect(() => {
    if (raw_products && raw_products.length > 0) {
      const maxPrice = raw_products.reduce((max, product) => {
        return product.price > max ? product.price : max;
      }, 0);
      setPriceValue([0, maxPrice]);
    }
  }, [raw_products]);

  // selectHandleFilter
  const selectHandleFilter = (e) => {
    setSelectValue(e.value);
  };
  // handleChanges
  const handleChanges = (val) => {
    setCurrPage(1)
    setPriceValue(val);
  };
  // other props
  const otherProps = {
    priceFilterValues: {
      priceValue,
      handleChanges,
    },
    selectHandleFilter,
    currPage,
    setCurrPage,
  };
  // decide what to render
  let content = null;

  if (isLoading) {
    content = <ShopHiddenLoader loading={isLoading}  />;
  } else {
    // products
    let product_items = raw_products;
    // select short filtering
    if (selectValue) {
      if (selectValue === "Default Sorting") {
        product_items = raw_products;
      } else if (selectValue === "Low to High") {
        product_items = raw_products
          .slice()
          .sort((a, b) => Number(a.price) - Number(b.price));
      } else if (selectValue === "High to Low") {
        product_items = products.data
          .slice()
          .sort((a, b) => Number(b.price) - Number(a.price));
      } else if (selectValue === "New Added") {
        product_items = products.data
          .slice()
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } else if (selectValue === "On Sale") {
        product_items = products.data.filter((p) => p.discount > 0);
      } else {
        product_items = products.data;
      }
    }

    content = (
      <>
        <ShopHiddenSidebarArea
          all_products={raw_products}
          products={product_items}
          otherProps={otherProps}
        />

        <ShopFilterOffCanvas
          all_products={raw_products}
          otherProps={otherProps}
        />
      </>
    );
  }
  return (
    <Wrapper>
      <SEO pageTitle="Shop" />
      <HeaderTwo style_2={true} />
      <ShopBreadcrumb title="Full Width Collection" subtitle="All Products" />
      {content}
      <Footer primary_style={true} />
    </Wrapper>
  );
};

export default ShopHiddenSidebarPage;
