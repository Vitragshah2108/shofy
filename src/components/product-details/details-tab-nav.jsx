import React, { useRef, useEffect } from 'react';
import ReviewForm from '../forms/review-form';
import ReviewItem from './review-item';

const DetailsTabNav = ({ product }) => {
  const {_id, description, additionalInformation, reviews } = product || {};
  const activeRef = useRef(null)
  const marker = useRef(null);
  // handleActive
  const handleActive = (e) => {
    if (e.target.classList.contains('active')) {
      marker.current.style.left = e.target.offsetLeft + "px";
      marker.current.style.width = e.target.offsetWidth + "px";
    }
  }
  useEffect(() => {
    if (activeRef.current?.classList.contains('active')) {
      marker.current.style.left = activeRef.current.offsetLeft + 'px';
      marker.current.style.width = activeRef.current.offsetWidth + 'px';
    }
  }, []);
  // nav item
  function NavItem({ active = false, id, title, linkRef }) {
    return (
      <button
        ref={linkRef}
        className={`nav-link ${active ? "active" : ""}`}
        id={`nav-${id}-tab`}
        data-bs-toggle="tab"
        data-bs-target={`#nav-${id}`}
        type="button"
        role="tab"
        aria-controls={`nav-${id}`}
        aria-selected={active ? "true" : "false"}
        tabIndex="-1"
        onClick={e => handleActive(e)}
      >
        {title}
      </button>
    );
  }

  return (
    <>
      <div className="tp-product-details-tab-nav tp-tab">
        <nav>
          <div className="nav nav-tabs justify-content-center p-relative tp-product-tab" id="navPresentationTab" role="tablist">
            <NavItem active={true} linkRef={activeRef} id="desc" title="Description" />
            <NavItem id="additional" title="Additional information" />
            <NavItem id="review" title={`Reviews (${reviews?.length || 0})`} />

            <span ref={marker} id="productTabMarker" className="tp-product-details-tab-line"></span>
          </div>
        </nav>
        <div className="tab-content" id="navPresentationTabContent">
          {/* nav-desc */}
          <div className="tab-pane fade show active" id="nav-desc" role="tabpanel" aria-labelledby="nav-desc-tab" tabIndex="-1">
            <div className="tp-product-details-desc-wrapper pt-60">
              <div className="row">
                <div className="col-xl-12">
                  <div className="tp-product-details-desc-item">
                    <div className="row align-items-center">
                      <div className="col-lg-12">
                        <div className="tp-product-details-desc-content">
                          <p>{description || "Experience exceptional quality, premium design, and cutting-edge engineering with top performance and long-lasting durability."}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* add info */}
          <div className="tab-pane fade" id="nav-additional" role="tabpanel" aria-labelledby="nav-additional-tab" tabIndex="-1">
            <div className="tp-product-details-additional-info pt-60">
              <div className="row justify-content-center">
                <div className="col-xl-10">
                  <table>
                    <tbody>
                      {additionalInformation && additionalInformation.length > 0 ? (
                        additionalInformation.map((info, i) => (
                          <tr key={i}>
                            <td>{info.key}</td>
                            <td>{info.value}</td>
                          </tr>
                        ))
                      ) : (
                        <>
                          <tr><td>Brand</td><td>Official Manufacturer Guaranteed</td></tr>
                          <tr><td>Connectivity</td><td>High-speed USB-C / Wireless Bluetooth</td></tr>
                          <tr><td>Warranty</td><td>1-Year Comprehensive Warranty</td></tr>
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {/* review */}
          <div className="tab-pane fade" id="nav-review" role="tabpanel" aria-labelledby="nav-review-tab" tabIndex="-1">
            <div className="tp-product-details-review-wrapper pt-60">
              <div className="row">
                <div className="col-lg-6">
                  <div className="tp-product-details-review-statics">

                    {/* reviews */}
                    <div className="tp-product-details-review-list pr-110">
                      <h3 className="tp-product-details-review-title">Rating & Review</h3>
                      {(!reviews || reviews.length === 0) && (
                        <h3 className="tp-product-details-review-title">
                          There are no reviews yet.
                        </h3>
                      )}
                      {reviews && reviews.length > 0 && reviews.map((item, i) => (
                        <ReviewItem key={item._id || item.userId || i} review={item} />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="tp-product-details-review-form">
                    <h3 className="tp-product-details-review-form-title">Review this product</h3>
                    <p>Your email address will not be published. Required fields are marked *</p>
                    {/* form start */}
                    <ReviewForm product_id={_id} />
                    {/* form end */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsTabNav;