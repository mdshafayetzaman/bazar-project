import React from 'react';
import Marquee from './ component/Marquee';
import Hero from './ component/Banner';
import ProductCard from './ component/ProductCard';

const HomePage = () => {
  return (
    <div>
      <Marquee></Marquee>
      <Hero></Hero>
      <ProductCard></ProductCard>
    </div>
  );
};

export default HomePage;
