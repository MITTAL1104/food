import React, { useEffect, useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'
import { useLocation } from 'react-router-dom'

const Home = () => {

    const [category,setCategory] = useState("All");
    const location = useLocation();

    useEffect(()=>{
      if(location.state?.scrollTo){
        const element = document.getElementById(location.state.scrollTo);
        if(element){
          element.scrollIntoView({behavior:"smooth"})
        }
      }
    },[location.state?.scrollTo])

  return (
    <div>
        <Header/>
        <ExploreMenu category={category} setCategory={setCategory}/>
        <FoodDisplay category={category}/>
        <AppDownload/>
    </div>
  )
}

export default Home