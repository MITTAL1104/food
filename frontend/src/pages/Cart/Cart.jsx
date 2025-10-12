import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url, setAppliedPromoCode, setPromoDiscount } =
    useContext(StoreContext);
  const navigate = useNavigate();
  const [promocode,setPromocode] = useState("");
  const [promoDetails,setPromoDetails] = useState(null);
  const [discount,setDiscount] = useState(0);
  const [promoError,setPromoError] = useState("");

  const handleApplyPromo = async()=>{
    setPromoError("");
    try{
      const response = await axios.post(`${url}/api/promo/validate`,{
        code:promocode,
        orderValue:getTotalCartAmount()
      });
      if(response.data.success){
        const promo = response.data.data;
        setPromoDetails(promo);
        let discountValue=0;
        if(promo.discountType==="percentage"){
          discountValue=(getTotalCartAmount()*promo.discountValue)/100;
          if(promo.maxDiscountValue){
            discountValue=Math.min(discountValue,promo.maxDiscountValue);
          }
        }else if(promo.discountType==="fixed"){
          discountValue=promo.discountValue;
        }
        setDiscount(discountValue);
        setAppliedPromoCode(promocode);
        setPromoDiscount(discountValue);
      }else{
        setPromoDetails(null);
        setDiscount(0);
        setPromoError(response.data.message);
        setAppliedPromoCode("");
        setPromoDiscount(0);
      }
    }catch(error){
      setPromoDetails(null);
      setDiscount(0);
      setPromoError(error);
    }
  }

  useEffect(() => {
    if(promocode){
      handleApplyPromo();
    }
  },[cartItems])

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={url + "/images/" + item.image} alt="" />
                  <p>{item.name}</p>
                  <p>₹{item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>₹{item.price * cartItems[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className="cross">
                    x
                  </p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 50}</p>
            </div>
            <hr />
            {discount>0 && (
              <>
                <div className="cart-total-details">
                  <p>Promo Discount</p>
                  <p>-₹{discount}</p>
                </div>
                <hr/>
              </>
            )}
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 50-discount}
              </b>
            </div>
          </div>
          <button onClick={() => navigate("/order")}>
            PROCEED TO CHECKOUT
          </button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="Promo Code" value={promocode} onChange={e=> setPromocode(e.target.value)}/>
              <button onClick={handleApplyPromo} className="cursor">Submit</button>
            </div>
            {promoError && (
              <p style={{color:"red",marginTop:"8px"}}>{promoError}</p>
            )}
            {promoDetails && (
              <p  style={{color:"green",marginTop:"8px"}}>
                Promo applied: {promoDetails.code}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
