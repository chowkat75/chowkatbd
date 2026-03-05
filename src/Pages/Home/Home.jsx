import React from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaWhatsapp } from 'react-icons/fa';
import Header from '../../Components/Header/Header';
import Slider from '../../Components/Slider/Slider';
import ProductPage from '../../Components/Product/Product';

const Home = () => {
  return (
    <div className="">
      <Header></Header>
      <Slider></Slider>
      <ProductPage></ProductPage>
    </div>
  );
};

export default Home;
