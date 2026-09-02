import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, Navigation,Autoplay } from "swiper";
// internal
import { useGetRelatedProductsQuery } from "@/redux/features/productApi";
import ProductItem from "../products/beauty/product-item";
import ErrorMsg from "../common/error-msg";
import { HomeNewArrivalPrdLoader } from "../loader";

// slider setting
const slider_setting = {
  slidesPerView: 4,
  spaceBetween: 24,
  navigation: {
    nextEl: ".tp-related-slider-button-next",
    prevEl: ".tp-related-slider-button-prev",
  },
  autoplay: {
    delay: 5000,
  },
  breakpoints: {
    1200: {
      slidesPerView: 4,
    },
    992: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 2,
    },
    576: {
      slidesPerView: 2,
    },
    0: {
      slidesPerView: 1,
    },
  },
};

import products_data from "@/data/products-data";

const RelatedProducts = ({ id }) => {
  const isMongoId = id && /^[0-9a-fA-F]{24}$/.test(id);
  const { data: products, isError, isLoading } = useGetRelatedProductsQuery(id, {
    skip: !isMongoId,
  });

  // decide what to render
  let content = null;

  if (isLoading && isMongoId) {
    content = <HomeNewArrivalPrdLoader loading={isLoading}/>;
  } else {
    const product_items = (!isError && products?.data && products.data.length > 0)
      ? products.data
      : products_data.filter((p) => p._id !== id).slice(0, 8);

    content = (
      <Swiper
        {...slider_setting}
        modules={[Autoplay, Navigation]}
        className="tp-product-related-slider-active swiper-container mb-10"
      >
        {product_items.map((item, i) => (
          <SwiperSlide key={item._id || i}>
            <ProductItem product={item} primary_style={true} />
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }
  return (
    <div className="tp-product-related-slider">
      {content}
    </div>
  );
};

export default RelatedProducts;
