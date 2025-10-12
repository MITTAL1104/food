import React from 'react'
import './Promocodes.css'
import { useState } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const Promocodes = () => {

  const url = import.meta.env.VITE_API_URL;
  const [list,setList] = useState([]);
  const [showModal,setShowModal] = useState(false);
  const [form,setForm] = useState({
    code:"",
    discountType:"fixed",
    discountValue:"",
    minOrderValue:"",
    maxDiscountValue:"",
    expiresAt:"",
    usageLimit:""
  });

  const fetchList = async() =>{
    const response = await axios.get(`${url}/api/promo/get`);
    if(response.data.success){
      setList(response.data.data);
    }else{
      toast.error("Error");
    }
  }

  const handleInputChange = (e) => {
    setForm({...form,[e.target.name]:e.target.value});
  }

  const addPromocode = async(e) =>{
    e.preventDefault();
    try{
      const response = await axios.post(`${url}/api/promo/add`,form);
      if(response.data.success){
        toast.success("Promo code added!");
        setForm({
          code:"",
          discountType:"fixed",
          discountValue:"",
          minOrderValue:"",
          maxDiscountValue:"",
          expiresAt:"",
          usageLimit:""
        });
        setShowModal(false);
        fetchList();
      }else{
        toast.error("Error");
      }
    }catch(error){
      console.log(error);
      toast.error("Error");
    }
  }

  const removePromocode = async(promoId)=>{
    const response = await axios.delete(`${url}/api/promo/remove`,{
      data:{id:promoId}
    });
    await fetchList();
    if(response.data.success){
      toast.success(response.data.message);
    }else{
      toast.error("Error");
    }
  }

  useEffect(()=>{
    fetchList();
  },[])

  return (
    <div className="promolist add flex-col">
      <p>All Promo Codes</p>
      <div className="promolist-table">
        <div className="promolist-table-format title">
          <b>Code</b>
          <b>Type</b>
          <b>Value</b>
          <b>Min Cart Value</b>
          <b>Max Discount</b>
          <b>Expires At</b>
          <b>Usage Limit</b>
          <b>Used Count</b>
          <b>Action</b>
        </div>
        {list.map((item,index)=>(
          <div key={index} className="promolist-table-format">
            <p>{item.code}</p>
            <p>{item.discountType.toUpperCase()}</p>
            <p>{item.discountValue}</p>
            <p>{item.minOrderValue}</p>
            <p>{item.maxDiscountValue || "-"}</p>
            <p>{item.expiresAt?new Date(item.expiresAt).toLocaleDateString():"-"}</p>
            <p>{item.usageLimit || "-"}</p>
            <p>{item.usedCount || 0}</p>
            <p onClick={() => removePromocode(item._id)} className='cursor'>x</p>
          </div>
        ))}
      </div>
      <button className="add-promocode-btn" onClick={()=>setShowModal(true)}>
        Add Promo Code
      </button>

      {showModal && (
        <div className="promocode-modal">
          <div className="promocode-card">
            <button className="close-btn" onClick={()=>setShowModal(false)}>x</button>
            <form onSubmit={addPromocode} className="promocode-form">
              <h3>Add Promo Code</h3>
              <input type="text" name="code" placeholder="Code" value={form.code} onChange={handleInputChange} required/>
              <select name="discountType" value={form.discountType} onChange={handleInputChange}>
                <option value="fixed">FIXED</option>
                <option value="percentage">PERCENTAGE</option>
              </select>
              <input type="number" name="discountValue" placeholder="Discount Value" value={form.discountValue} onChange={handleInputChange} required/>
              <input type="number" name="minOrderValue" placeholder="Min Order Value" value={form.minOrderValue} onChange={handleInputChange} required/>
              <input type="number" name="maxDiscountValue" placeholder="Max Discount Value (for % type)" value={form.maxDiscountValue} onChange={handleInputChange}/>
              <input type="date" name="expiresAt" placeholder="Expiry Date" value={form.expiresAt} onChange={handleInputChange} required/>
              <input type="number" name="usageLimit" placeholder="Usage Limit" value={form.usageLimit} onChange={handleInputChange}/>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Promocodes