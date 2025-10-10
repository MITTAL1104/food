import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets'
import {toast, ToastContainer} from "react-toastify"

const AppDownload = () => {

  const showToast = () => {
    toast.info("Download functionality coming soon!");
  };

  return (
    <div>
    <ToastContainer/>
    <div className="app-download" id="app-download">
        <p>For Better Experience Download <br/> Tomato App</p>
        <div className="app-download-platforms">
            <img src={assets.play_store} alt="" onClick={showToast } />
            <img src={assets.app_store} alt="" onClick={showToast } />
        </div>
    </div>
    </div>
  )
}

export default AppDownload