import React from 'react'
import Navbar from '../components/Navbar'
import Announcement from '../components/Announcement'
import Slider from '../components/Slider'
import Categories from '../components/Categories'
import Products from '../components/Products'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import NavBarUser from '../components/NavBarUser'
const UserHome = () => {
  return (
    <div>
       <Announcement/>
        <NavBarUser/>
        <Slider/>
        <Categories/>
         <Products/> 
         <Newsletter/> 
         <Footer/>
    </div>
  )
}

export default UserHome