import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../../Shared/Footer/Footer';

const Root = () => {
  return (
    <>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
};

export default Root;
