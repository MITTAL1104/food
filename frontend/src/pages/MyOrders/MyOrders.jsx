import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";
import { AiOutlineEye } from "react-icons/ai";
import OrderDetailsCard from "../../components/OrderDetailsCard/OrderDetailsCard";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    const response = await axios.post(
      url + "/api/order/userorders",
      {},
      { headers: { token } }
    );
    setData(response.data.data);
    setLoading(false);
  };

  const trackOrder = async (orderId) => {
    const response = await axios.post(
      url + "/api/order/track",
      { orderId },
      { headers: { token } }
    );
    const updatedOrder = response.data.data;
    if (!updatedOrder) return;

    setData((prevData) =>
      prevData.map((order) =>
        order && order._id === updatedOrder._id ? updatedOrder : order
      )
    );
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="my-orders">
      <div className="my-orders-header">
        <h2>My Orders</h2>
        <button className="my-orders-refresh" onClick={fetchOrders}>
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="orders-spinner">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="container">
          {data.map((order, index) => {
            return (
              <div key={index} className="my-orders-order">
                <img src={assets.parcel_icon} alt="" />
                <p>
                  {/* {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return item.name + " x " + item.quantity;
                    } else {
                      return item.name + " x " + item.quantity + ", ";
                    }
                  })} */}
                  {new Date(order.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p>₹{order.amount}.00</p>
                <p>Items: {order.items.length}</p>
                <p>
                  <span>&#x25cf;</span> <b>{order.status}</b>
                </p>
                <button
                  onClick={() => setSelectedOrder(order)}
                >
                    View Order Details
                </button>
                <button onClick={() => trackOrder(order._id)}>
                  Track Order
                </button>
              </div>
            );
          })}

          {selectedOrder &&(
            <OrderDetailsCard order={selectedOrder} onClose={()=>setSelectedOrder()}/>
          )}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
