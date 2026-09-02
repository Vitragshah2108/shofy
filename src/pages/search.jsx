import CommonBreadcrumb from "@/components/breadcrumb/common-breadcrumb";
import ErrorMsg from "@/components/common/error-msg";
import SearchPrdLoader from "@/components/loader/search-prd-loader";
import ProductItem from "@/components/products/fashion/product-item";
import SEO from "@/components/seo";
import ShopTopLeft from "@/components/shop/shop-top-left";
import Footer from "@/layout/footers/footer";
import HeaderTwo from "@/layout/headers/header-2";
import Wrapper from "@/layout/wrapper";
import { useGetAllProductsQuery } from "@/redux/features/productApi";
import NiceSelect from "@/ui/nice-select";
import { useState } from "react";
// internal

import products_data from "@/data/products-data";

export default function SearchPage({ query }) {
  const { searchText, productType } = query;
  const { data: products, isError, isLoading } = useGetAllProductsQuery();
  const [shortValue, setShortValue] = useState("");
  const perView = 12;
  const [next, setNext] = useState(perView);

  // selectShortHandler
  const shortHandler = (e) => {
    setShortValue(e.value);
  };

  // handleLoadMore
  const handleLoadMore = () => {
    setNext((value) => value + 4);
  };

  // Smart search helper
  const smartMatch = (product, term, filterType) => {
    if (!term) return true;
    const cleanTerm = term.toLowerCase().trim();
    // Generate singular/plural tokens
    const tokens = cleanTerm.split(/\s+/).filter(Boolean);

    // Build searchable haystack
    const title = (product.title || "").toLowerCase();
    const categoryName = (product.category?.name || product.parent || "").toLowerCase();
    const subCategory = (product.children || "").toLowerCase();
    const brand = (product.brand?.name || "").toLowerCase();
    const tags = Array.isArray(product.tags) ? product.tags.join(" ").toLowerCase() : "";
    const description = (product.description || "").toLowerCase();
    const type = (product.productType || "").toLowerCase();

    // Check productType filter if provided
    if (filterType && filterType !== "Select Category" && filterType !== "all") {
      const cleanFilter = filterType.toLowerCase();
      const matchType = type.includes(cleanFilter) || categoryName.includes(cleanFilter) || subCategory.includes(cleanFilter);
      if (!matchType) return false;
    }

    const fullHaystack = `${title} ${categoryName} ${subCategory} ${brand} ${tags} ${description} ${type}`;

    // Test each token
    return tokens.every((token) => {
      // Direct substring
      if (fullHaystack.includes(token)) return true;
      // Singular / Plural variations (e.g. headphone <-> headphones)
      if (token.endsWith("s") && fullHaystack.includes(token.slice(0, -1))) return true;
      if (!token.endsWith("s") && fullHaystack.includes(`${token}s`)) return true;
      if (token === "phone" && (fullHaystack.includes("mobile") || fullHaystack.includes("smartphones"))) return true;
      if (token === "headphone" && (fullHaystack.includes("earphone") || fullHaystack.includes("earbuds") || fullHaystack.includes("headset") || fullHaystack.includes("audio"))) return true;
      if (token === "tab" && fullHaystack.includes("tablet")) return true;
      if (token === "pc" && (fullHaystack.includes("computer") || fullHaystack.includes("desktop") || fullHaystack.includes("gaming"))) return true;
      return false;
    });
  };

  // decide what to render
  let content = null;
  if (isLoading) {
    content = <SearchPrdLoader loading={isLoading} />;
  } else {
    const remoteData = (!isError && Array.isArray(products?.data)) ? products.data : [];
    const all_products = [
      ...products_data,
      ...remoteData.filter((r) => !products_data.some((p) => p._id === r._id)),
    ];
    let product_items = all_products.filter((prd) => smartMatch(prd, searchText, productType));

    // Price low to high
    if (shortValue === "Price low to high") {
      product_items = product_items
        .slice()
        .sort((a, b) => Number(a.price) - Number(b.price));
    }
    // Price high to low
    if (shortValue === "Price high to low") {
      product_items = product_items
        .slice()
        .sort((a, b) => Number(b.price) - Number(a.price));
    }

    if (product_items.length === 0) {
      content = (
        <div className="text-center pt-80 pb-80">
          <h3>Sorry, nothing matched <span style={{ color: '#0989FF' }}>"{searchText}"</span> search terms</h3>
          <p className="mt-10 text-muted">Try searching with broader keywords like <strong>headphone, watch, tablet, camera, charger, speaker</strong></p>
        </div>
      );
    }

    else {
      content = ( 
        <>
          <section className="tp-shop-area pb-120">
            <div className="container">
              <div className="row">
                <div className="col-xl-12 col-lg-12">
                  <div className="tp-shop-main-wrapper">
                    <div className="tp-shop-top mb-45">
                      <div className="row">
                        <div className="col-xl-6">

                          <div className="tp-shop-top-left d-flex align-items-center ">
                            <div className="tp-shop-top-result">
                              <p>Showing 1–{product_items.length} of {all_products.length} results</p>
                            </div>
                          </div>

                        </div>
                        <div className="col-xl-6">
                          <div className="tp-shop-top-right d-sm-flex align-items-center justify-content-xl-end">
                            <div className="tp-shop-top-select">
                              <NiceSelect
                                options={[
                                  { value: "Short By Price", text: "Short By Price" },
                                  { value: "Price low to high", text: "Price low to high" },
                                  { value: "Price high to low", text: "Price high to low" },
                                ]}
                                defaultCurrent={0}
                                onChange={shortHandler}
                                name="Short By Price"
                              />
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                    
                      <div className="tp-shop-items-wrapper tp-shop-item-primary">
                        <div className="row">
                          {product_items
                            .slice(0, next)
                            ?.map((item) => (
                              <div
                                key={item._id}
                                className="col-xl-3 col-lg-4 col-md-6 col-sm-6"
                              >
                                <ProductItem product={item} />
                              </div>
                            ))}
                        </div>
                      </div>

                    {/* load more btn start */}
                    {next < product_items?.length && (
                      <div className="load-more-btn text-center pt-50">
                        <button onClick={handleLoadMore} className="tp-btn tp-btn-2 tp-btn-blue">
                          Load More
                        </button>
                      </div>
                    )}
                    {/* load more btn end */}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      );
    }
  }

  return (
    <Wrapper>
      <SEO pageTitle="Wishlist" />
      <HeaderTwo style_2={true} />
      <CommonBreadcrumb title="Search Products" subtitle="Search Products" />
      {content}
      <Footer primary_style={true} />
    </Wrapper>
  );
}

export const getServerSideProps = async (context) => {
  const { query } = context;

  return {
    props: {
      query,
    },
  };
};
