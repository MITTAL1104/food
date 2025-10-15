import React from "react";
import "./ListCategory.css";
import { useState } from "react";
import axios from "axios";
import {toast} from "react-toastify"
import { useEffect } from "react";

const ListCategory = () => {

  const url = import.meta.env.VITE_API_URL;
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/category/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error");
    }
  };

    const removeCategory = async (categoryId) => {
    try {
      const response = await axios.post(`${url}/api/category/remove`, { id: categoryId });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchList(); // Refresh list after removal
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error removing category");
    }
  };

//   const removeFood = async (foodId) => {
//     const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
//     await fetchList();
//     if (response.data.success) {
//       toast.success(response.data.message);
//     } else {
//       toast.error("Error");
//     }
//   };

  useEffect(() => {
    fetchList();
  },[]);

  return (
    <div className="categorylist add flex-col">
      <p>All Categories List</p>
      <div className="categorylist-table">
        <div className="categorylist-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className="categorylist-table-format">
              <img src={`${url}/categoryImages/` + item.image} alt="" />
              <p>{item.name}</p>
              <p onClick={() => removeCategory(item._id)} className="cursor">
                X
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListCategory;
