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

const ProductDetailsPage = ({ id }) => {
  const isMongoId = id && /^[0-9a-fA-F]{24}$/.test(id);
  const { data: product, isLoading, isError } = useGetProductQuery(id, {
    skip: !isMongoId,
  });

  const staticPrd = products_data.find((p) => String(p._id) === String(id));
  const currentProduct = (!isError && product?.data) ? product.data : (staticPrd || products_data[0]);

  let content = null;
  if (isLoading && isMongoId) {
    content = <PrdDetailsLoader loading={isLoading} />;
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
      <SEO pageTitle={currentProduct?.title || "Product Details"} />
      <HeaderTwo style_2={true} />
      {content}
      <Footer primary_style={true} />
    </Wrapper>
  );
};

export default ProductDetailsPage;

export const getServerSideProps = async (context) => {
  const { params, query } = context;
  const id = params?.id || query?.id || null;

  return {
    props: {
      id,
    },
  };
};
