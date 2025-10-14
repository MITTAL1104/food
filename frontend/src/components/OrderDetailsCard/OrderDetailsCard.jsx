import React from "react";
import "./OrderDetailsCard.css";

const OrderDetailsCard = ({ order, onClose }) => {

  if (!order) return null;
  const address = order.address || {};
  const url = import.meta.env.VITE_API_URL;

  return (
    <div className="order-details-overlay">
      <div className="order-details-card-lg">
        <button className="close-btn" onClick={onClose}>
          X
        </button>
        <h2>Order Summary</h2>
        <div className="order-details-row">
          <div>
            <strong>Date:</strong>{" "}
            <span>
              {new Date(order.date).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <div>
            <strong>Amount:</strong>{" "}
            <span>₹{order.amount}.00</span>
          </div>
          <div>
            <strong>Payment:</strong>{" "}
            <span>{order.payment ? "Paid" : "Not Paid"}</span>
          </div>
          {order.promoCode && (
            <div>
              <strong>Promo:</strong>{" "}
              <span>
                {order.promoCode} (₹{order.promoDiscount} Off)
              </span>
            </div>
          )}
        </div>
        <hr />
        <div className="order-details-address-block">
          <strong>Delivery Address</strong>
          <div>
            {address.firstName} {address.lastName}
          </div>
          <div>
            {address.street}, {address.city}, {address.state} -{" "}
            {address.zipcode}
          </div>
          <div>Contact: {address.phone}</div>
        </div>
        <hr />
        <strong>Items:</strong>
        <div className="order-details-item-list">
          {order.items.map((item, i) => (
            <div key={i} className="order-details-item">
              <img
                src={`${url}/images/` + item.image}
                alt={item.name}
                className="order-details-item-img"
              />
              <div>
                <div><b>{item.name}</b></div>
                <div style={{ fontSize: "0.92em" }}>{item.description}</div>
                <div>Category: {item.category}</div>
                <div>Price: ₹{item.price}</div>
                <div>Quantity: {item.quantity}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsCard;
