import { useState } from "react";
import { useSelector } from "react-redux";
// internal
import useCartInfo from "@/hooks/use-cart-info";
import ErrorMsg from "../common/error-msg";
import StripePaymentModal from "./stripe-payment-modal";

const CheckoutOrderArea = ({ checkoutData }) => {
  const {
    handleShippingCost,
    cartTotal = 0,
    stripe,
    isCheckoutSubmit,
    register,
    errors,
    showCard,
    setShowCard,
    shippingCost,
    discountAmount,
    isStripeModalOpen,
    setIsStripeModalOpen,
    billingFormData,
  } = checkoutData;
  const { cart_products } = useSelector((state) => state.cart);
  const { total } = useCartInfo();
  return (
    <div className="tp-checkout-place white-bg">
      <h3 className="tp-checkout-place-title">Your Order</h3>

      <div className="tp-order-info-list">
        <ul>
          {/*  header */}
          <li className="tp-order-info-list-header">
            <h4>Product</h4>
            <h4>Total</h4>
          </li>

          {/*  item list */}
          {cart_products.map((item) => (
            <li key={item._id} className="tp-order-info-list-desc">
              <p>
                {item.title} <span> x {item.orderQuantity}</span>
              </p>
              <span>${item.price.toFixed(2)}</span>
            </li>
          ))}

          {/*  shipping */}
          <li className="tp-order-info-list-shipping">
            <span>Shipping</span>
            <div className="tp-order-info-list-shipping-item d-flex flex-column align-items-end">
              <span>
                <input
                  {...register(`shippingOption`, {
                    required: `Shipping Option is required!`,
                  })}
                  id="flat_shipping"
                  type="radio"
                  name="shippingOption"
                />
                <label
                  onClick={() => handleShippingCost(60)}
                  htmlFor="flat_shipping"
                >
                  Delivery: Today Cost :<span>$60.00</span>
                </label>
                <ErrorMsg msg={errors?.shippingOption?.message} />
              </span>
              <span>
                <input
                  {...register(`shippingOption`, {
                    required: `Shipping Option is required!`,
                  })}
                  id="flat_rate"
                  type="radio"
                  name="shippingOption"
                />
                <label
                  onClick={() => handleShippingCost(20)}
                  htmlFor="flat_rate"
                >
                  Delivery: 7 Days Cost: <span>$20.00</span>
                </label>
                <ErrorMsg msg={errors?.shippingOption?.message} />
              </span>
            </div>
          </li>

           {/*  subtotal */}
           <li className="tp-order-info-list-subtotal">
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </li>

           {/*  shipping cost */}
           <li className="tp-order-info-list-subtotal">
            <span>Shipping Cost</span>
            <span>${shippingCost.toFixed(2)}</span>
          </li>

           {/* discount */}
           <li className="tp-order-info-list-subtotal">
            <span>Discount</span>
            <span>${discountAmount.toFixed(2)}</span>
          </li>

          {/* total */}
          <li className="tp-order-info-list-total">
            <span>Total</span>
            <span>${parseFloat(cartTotal).toFixed(2)}</span>
          </li>
        </ul>
      </div>
      <div className="tp-checkout-payment">
        <div className="tp-checkout-payment-item">
          <input
            {...register(`payment`, {
              required: `Payment Option is required!`,
            })}
            onClick={() => setShowCard(true)}
            onChange={(e) => {
              register(`payment`).onChange(e);
              setShowCard(true);
            }}
            type="radio"
            id="back_transfer"
            name="payment"
            value="Card"
          />
          <label onClick={() => setShowCard(true)} htmlFor="back_transfer">
            Credit Card (Stripe Modal)
          </label>
          {showCard && (
            <div className="direct-bank-transfer p-3 rounded-3 mt-2 mb-2" style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0" }}>
              <div className="d-flex align-items-center gap-2 mb-2 text-success">
                <i className="fa-solid fa-circle-check fs-6"></i>
                <span className="fw-semibold" style={{ fontSize: "13.5px" }}>Stripe Modal Checkout Active</span>
              </div>
              <p className="mb-2 text-muted" style={{ fontSize: "12.5px", lineHeight: "1.4" }}>
                Clicking <strong>Place Order</strong> below will open the dedicated Stripe Payment Modal for instant card testing.
              </p>
              <div className="stripe-test-badge">
                <small style={{ fontSize: "12px", color: "#15803d" }}>
                  <strong>Test Card:</strong> <code>4242 4242 4242 4242</code>
                </small>
              </div>
            </div>
          )}
          <ErrorMsg msg={errors?.payment?.message} />
        </div>
        <div className="tp-checkout-payment-item">
          <input
            {...register(`payment`, {
              required: `Payment Option is required!`,
            })}
            onClick={() => setShowCard(false)}
            onChange={(e) => {
              register(`payment`).onChange(e);
              setShowCard(false);
            }}
            type="radio"
            id="cod"
            name="payment"
            value="COD"
          />
          <label onClick={() => setShowCard(false)} htmlFor="cod">
            Cash on Delivery
          </label>
          <ErrorMsg msg={errors?.payment?.message} />
        </div>
      </div>

      <div className="tp-checkout-btn-wrapper">
        <button
          type="submit"
          disabled={!stripe || isCheckoutSubmit}
          className="tp-checkout-btn w-100"
        >
          {isCheckoutSubmit ? "Processing Order..." : "Place Order"}
        </button>
      </div>

      {/* Dedicated Stripe Modal */}
      <StripePaymentModal
        isOpen={isStripeModalOpen}
        onClose={() => setIsStripeModalOpen(false)}
        billingData={billingFormData}
        cartTotal={cartTotal}
        total={total}
        shippingCost={shippingCost}
        discountAmount={discountAmount}
        cart_products={cart_products}
      />
    </div>
  );
};

export default CheckoutOrderArea;
