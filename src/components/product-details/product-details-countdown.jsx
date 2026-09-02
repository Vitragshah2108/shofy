import React, { useState, useEffect } from "react";
import Timer from "../common/timer";
import dayjs from "dayjs";

const ProductDetailsCountdown = ({ offerExpiryTime }) => {
  const [expiry, setExpiry] = useState(null);

  useEffect(() => {
    if (offerExpiryTime && dayjs().isBefore(offerExpiryTime)) {
      setExpiry(new Date(offerExpiryTime));
    } else {
      // Dynamic rolling 3-day countdown for persistent high-urgency flash sale
      const target = new Date(Date.now() + (2 * 24 + 14) * 3600 * 1000 + 45 * 60 * 1000);
      setExpiry(target);
    }
  }, [offerExpiryTime]);

  if (!expiry) return null;

  return (
    <div className="tp-product-details-countdown d-flex align-items-center justify-content-between flex-wrap mt-25 mb-25">
      <h4 className="tp-product-details-countdown-title">
        <i className="fa-solid fa-fire-flame-curved"></i> Flash Sale end in:{" "}
      </h4>
      <div className="tp-product-details-countdown-time">
        <Timer expiryTimestamp={expiry} />
      </div>
    </div>
  );
};

export default ProductDetailsCountdown;
