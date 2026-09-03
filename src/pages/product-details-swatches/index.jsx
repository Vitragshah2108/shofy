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

const ProductDetailsSwatchesPage = () => {
  const { data: product, isLoading, isError } = useGetProductQuery("641e887d05f9ee1717e1348a", {
    skip: false,
  });

  const currentProduct = (!isError && product?.data) ? product.data : products_data[0];

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
      <SEO pageTitle={currentProduct?.title || "Product Details Swatches"} />
      <HeaderTwo style_2={true} />
      {content}
      <Footer primary_style={true} />
    </Wrapper>
  );
};

export default ProductDetailsSwatchesPage;
