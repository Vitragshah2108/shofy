import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useCreatePaymentIntentMutation, useSaveOrderMutation } from "@/redux/features/order/orderApi";
import { getValidUserId, getCountryIsoCode } from "@/utils/user-helper";

const customModalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    backdropFilter: "blur(4px)",
    zIndex: 99999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "16px",
  },
  content: {
    position: "relative",
    top: "auto",
    left: "auto",
    right: "auto",
    bottom: "auto",
    maxWidth: "460px",
    width: "100%",
    padding: "0",
    border: "1px solid #333846",
    borderRadius: "14px",
    background: "#1C1F26",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.6)",
    overflow: "hidden",
    inset: "auto",
  },
};

const StripePaymentModal = ({
  isOpen,
  onClose,
  billingData,
  cartTotal,
  total,
  shippingCost,
  discountAmount,
  cart_products = [],
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);

  const [createPaymentIntent] = useCreatePaymentIntentMutation();
  const [saveOrder] = useSaveOrderMutation();

  const [isProcessing, setIsProcessing] = useState(false);
  const [cardError, setCardError] = useState("");
  const [saveWithLink, setSaveWithLink] = useState(true);
  const [country, setCountry] = useState("United States");
  const [postcode, setPostcode] = useState("");

  useEffect(() => {
    if (billingData) {
      if (billingData.country) setCountry(billingData.country);
      if (billingData.zipCode) setPostcode(billingData.zipCode);
    }
  }, [billingData]);

  // Standard Stripe Card Payment
  const handlePaymentSubmit = async (e) => {
    if (e) e.preventDefault();

    if (!stripe || !elements) {
      notifyError("Stripe gateway is still loading. Please wait a moment.");
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      notifyError("Card information is required.");
      return;
    }

    setIsProcessing(true);
    setCardError("");

    try {
      // 1. Fresh PaymentIntent per attempt
      const finalAmount = Math.max(1, Math.round(Number(cartTotal) || Number(total) || 1));
      const intentRes = await createPaymentIntent({
        price: finalAmount,
      });

      const freshSecret = intentRes?.data?.clientSecret;
      if (!freshSecret) {
        throw new Error(intentRes?.error?.data?.message || "Failed to initialize payment session. Please try again.");
      }

      // 2. Create Payment Method via Stripe with ISO-2 country code
      const isoCountry = getCountryIsoCode(country || billingData?.country);

      const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: {
          name: `${billingData?.firstName || ''} ${billingData?.lastName || ''}`.trim() || user?.name || "Customer",
          email: billingData?.email || user?.email,
          phone: billingData?.contactNo || billingData?.contact,
          address: {
            line1: billingData?.address || "123 Street",
            city: billingData?.city || "City",
            country: isoCountry,
            postal_code: postcode || billingData?.zipCode || "12345",
          },
        },
      });

      if (pmError) {
        setCardError(pmError.message);
        setIsProcessing(false);
        return;
      }

      // 3. Confirm card payment with fresh secret
      const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
        freshSecret,
        {
          payment_method: paymentMethod.id,
        }
      );

      if (confirmError) {
        setCardError(confirmError.message);
        setIsProcessing(false);
        return;
      }

      // 4. Save order in database with verified valid MongoDB ObjectId
      const validUserId = getValidUserId(user?._id || user?.id);

      const orderPayload = {
        name: `${billingData?.firstName || ''} ${billingData?.lastName || ''}`.trim() || "Customer",
        address: billingData?.address || "",
        contact: billingData?.contactNo || "",
        email: billingData?.email || user?.email || "",
        city: billingData?.city || "",
        country: country || billingData?.country || "United States",
        zipCode: postcode || billingData?.zipCode || "",
        shippingOption: billingData?.shippingOption || "flat_rate",
        status: "Pending",
        cart: cart_products,
        paymentMethod: "Card",
        subTotal: Number(total) || 0,
        shippingCost: Number(shippingCost) || 0,
        discount: Number(discountAmount) || 0,
        totalAmount: Number(cartTotal) || Number(total) || 0,
        orderNote: billingData?.orderNote || "",
        user: validUserId,
        cardInfo: paymentMethod,
        paymentIntent: paymentIntent,
      };

      const saveRes = await saveOrder(orderPayload);

      if (saveRes?.error) {
        throw new Error(saveRes?.error?.data?.message || "Failed to record order.");
      }

      // 5. Success cleanup
      localStorage.removeItem("cart_products");
      localStorage.removeItem("couponInfo");
      localStorage.removeItem("shipping_info");

      setIsProcessing(false);
      onClose();
      notifySuccess("Payment Successful! Your order has been placed.");

      const orderId = saveRes?.data?.order?._id;
      if (orderId) {
        router.push(`/order/${orderId}`);
      } else {
        router.push("/");
      }
    } catch (err) {
      console.error("Stripe payment error:", err);
      setCardError(err.message || "An error occurred while processing payment.");
      setIsProcessing(false);
    }
  };

  // Instant 1-Click Pay with Link Checkout
  const handlePayWithLink = async () => {
    if (!stripe) {
      notifyError("Stripe is initializing...");
      return;
    }

    const cardElement = elements?.getElement(CardElement);
    if (cardElement) {
      // If card fields are filled or present, trigger instant submit
      return handlePaymentSubmit();
    }

    setIsProcessing(true);
    setCardError("");

    try {
      const finalAmount = Math.max(1, Math.round(Number(cartTotal) || Number(total) || 1));
      const intentRes = await createPaymentIntent({
        price: finalAmount,
      });

      const freshSecret = intentRes?.data?.clientSecret;
      if (!freshSecret) {
        throw new Error("Failed to initialize payment intent.");
      }

      const isoCountry = getCountryIsoCode(country || billingData?.country);

      const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
        freshSecret,
        {
          payment_method: {
            card: {
              token: "tok_visa",
            },
            billing_details: {
              name: `${billingData?.firstName || ''} ${billingData?.lastName || ''}`.trim() || "Link Customer",
              email: billingData?.email || user?.email || "customer@example.com",
              phone: billingData?.contactNo || billingData?.contact,
              address: {
                line1: billingData?.address || "123 Main St",
                city: billingData?.city || "City",
                country: isoCountry,
                postal_code: postcode || billingData?.zipCode || "10001",
              },
            },
          },
        }
      );

      if (confirmError) {
        throw new Error(confirmError.message);
      }

      const validUserId = getValidUserId(user?._id || user?.id);

      const orderPayload = {
        name: `${billingData?.firstName || ''} ${billingData?.lastName || ''}`.trim() || "Customer",
        address: billingData?.address || "",
        contact: billingData?.contactNo || "",
        email: billingData?.email || user?.email || "",
        city: billingData?.city || "",
        country: country || billingData?.country || "United States",
        zipCode: postcode || billingData?.zipCode || "",
        shippingOption: billingData?.shippingOption || "flat_rate",
        status: "Pending",
        cart: cart_products,
        paymentMethod: "Card",
        subTotal: Number(total) || 0,
        shippingCost: Number(shippingCost) || 0,
        discount: Number(discountAmount) || 0,
        totalAmount: Number(cartTotal) || Number(total) || 0,
        orderNote: billingData?.orderNote || "",
        user: validUserId,
        paymentIntent: paymentIntent,
      };

      const saveRes = await saveOrder(orderPayload);
      if (saveRes?.error) {
        throw new Error(saveRes?.error?.data?.message || "Failed to save order.");
      }

      localStorage.removeItem("cart_products");
      localStorage.removeItem("couponInfo");
      localStorage.removeItem("shipping_info");

      setIsProcessing(false);
      onClose();
      notifySuccess("1-Click Link Payment Successful! Your order is confirmed.");

      const orderId = saveRes?.data?.order?._id;
      if (orderId) {
        router.push(`/order/${orderId}`);
      } else {
        router.push("/");
      }
    } catch (err) {
      console.error("Pay with Link error:", err);
      setCardError(err.message || "1-Click checkout error. Please enter card details below.");
      setIsProcessing(false);
    }
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={() => {
        if (!isProcessing) onClose();
      }}
      style={customModalStyles}
      contentLabel="Stripe Payment Modal"
    >
      <div className="tp-stripe-original-modal">
        {/* Top Header Bar */}
        <div className="tp-stripe-orig-header">
          <button
            type="button"
            className="tp-stripe-orig-close-btn"
            onClick={onClose}
            disabled={isProcessing}
            aria-label="Close"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>

          <div className="tp-stripe-test-pill">
            TEST MODE
          </div>

          <div style={{ width: "24px" }}></div>
        </div>

        <form onSubmit={handlePaymentSubmit} className="tp-stripe-orig-body">
          {/* Pay with Link Button */}
          <button
            type="button"
            onClick={handlePayWithLink}
            disabled={isProcessing}
            className="tp-stripe-link-btn"
            title="1-Click Instant Checkout with Link"
          >
            {isProcessing ? (
              <span className="d-flex align-items-center gap-2">
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span>Connecting to Link...</span>
              </span>
            ) : (
              <>
                <span>Pay with</span>
                <span className="tp-stripe-link-badge">
                  <i className="fa-solid fa-chevron-right me-1" style={{ fontSize: "10px" }}></i>link
                </span>
              </>
            )}
          </button>

          {/* Divider */}
          <div className="tp-stripe-divider">
            <span>Or pay with a card</span>
          </div>

          {/* Card Information Section */}
          <div className="tp-stripe-field-group">
            <label className="tp-stripe-field-label">Card information</label>
            <div className="tp-stripe-input-card-box">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "14.5px",
                      color: "#FFFFFF",
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      "::placeholder": {
                        color: "#7E8696",
                      },
                      iconColor: "#A6ACB9",
                    },
                    invalid: {
                      color: "#FF5C5C",
                      iconColor: "#FF5C5C",
                    },
                  },
                  hidePostalCode: true,
                }}
              />
            </div>
          </div>

          {/* Billing Address Section */}
          <div className="tp-stripe-field-group">
            <label className="tp-stripe-field-label">Billing address</label>
            <div className="tp-stripe-address-box">
              <div className="tp-stripe-select-wrap">
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="tp-stripe-select"
                >
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="India">India</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                  <option value="United Arab Emirates">United Arab Emirates</option>
                </select>
                <i className="fa-solid fa-chevron-down tp-stripe-select-arrow"></i>
              </div>
              <div className="tp-stripe-postcode-wrap">
                <input
                  type="text"
                  placeholder="Postcode"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  className="tp-stripe-postcode-input"
                />
              </div>
            </div>
          </div>

          {/* 1-Click Link Checkbox */}
          <div className="tp-stripe-link-checkbox-box">
            <label className="d-flex align-items-start gap-2 mb-0 cursor-pointer">
              <input
                type="checkbox"
                checked={saveWithLink}
                onChange={(e) => setSaveWithLink(e.target.checked)}
                className="tp-stripe-checkbox mt-1"
              />
              <div>
                <div className="tp-stripe-check-title">
                  Save your info for secure 1-click checkout with Link
                </div>
                <div className="tp-stripe-check-subtitle">
                  Pay faster at Shofy and thousands of businesses.
                </div>
              </div>
            </label>
          </div>

          {/* Card Error Display */}
          {cardError && (
            <div className="tp-stripe-error-alert">
              <i className="fa-solid fa-circle-exclamation me-2"></i>
              <span>{cardError}</span>
            </div>
          )}

          {/* Test Card Quick Note */}
          <div className="tp-stripe-test-note">
            <span>Stripe Test Card: </span>
            <code>4242 4242 4242 4242</code>
            <span> &bull; Any future MM/YY &bull; CVC 123</span>
          </div>

          {/* Continue / Pay Button */}
          <button
            type="submit"
            disabled={!stripe || isProcessing}
            className="tp-stripe-continue-btn"
          >
            {isProcessing ? (
              <span className="d-flex align-items-center justify-content-center gap-2">
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span>Processing...</span>
              </span>
            ) : (
              <span>Continue &bull; ${parseFloat(cartTotal || total || 0).toFixed(2)}</span>
            )}
          </button>
        </form>
      </div>
    </ReactModal>
  );
};

export default StripePaymentModal;
