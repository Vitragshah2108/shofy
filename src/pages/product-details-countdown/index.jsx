import React from 'react';
// internal
import SEO from '@/components/seo';
import HeaderTwo from '@/layout/headers/header-2';
import Footer from '@/layout/footers/footer';
import Wrapper from '@/layout/wrapper';
import ErrorMsg from '@/components/common/error-msg';
import { useGetProductQuery } from '@/redux/features/productApi';
import ProductDetailsBreadcrumb from '@/components/breadcrumb/product-details-breadcrumb';
import ProductDetailsArea from '@/components/product-details/product-details-area';
import PrdDetailsLoader from '@/components/loader/prd-details-loader';

import products_data from '@/data/products-data';

const ProductDetailsCountdownPage = () => {
  const countdownProductFallback = {
    ...products_data[0],
    offerDate: {
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 4 * 24 * 3600 * 1000).toISOString(),
    },
  };

  const { data: product, isLoading, isError } = useGetProductQuery("641e887d05f9ee1717e134b2", {
    skip: false,
  });

  const currentProduct = (!isError && product?.data) 
    ? {
        ...product.data,
        offerDate: product.data.offerDate || countdownProductFallback.offerDate,
      } 
    : countdownProductFallback;

  let content = null;
  if (isLoading) {
    content = <PrdDetailsLoader loading={isLoading}/>;
  } else if (currentProduct) {
    content = (
      <>
        <ProductDetailsBreadcrumb 
          category={currentProduct.category?.name || currentProduct.parent || "Electronics"} 
          title={currentProduct.title} 
        />
        <ProductDetailsArea productItem={currentProduct} />
      </>
    );
  } else {
    content = <ErrorMsg msg="Product not found" />;
  }

  return (
    <Wrapper>
      <SEO pageTitle={currentProduct?.title || "Product Details Countdown"} />
      <HeaderTwo style_2={true} />
      {content}
      <Footer primary_style={true} />
    </Wrapper>
  );
};

export default ProductDetailsCountdownPage;
