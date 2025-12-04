import { Helmet } from "react-helmet-async";
import LostFoundItemCard from "../Components/LostFoundItemCard";
import { useEffect, useState } from "react";
import LostFoundSlider from "../Components/LostFoundSlider";
import HowItWorks from "../Components/HowItWorks";
import AnimatedCounter from "../Components/AnimatedCounter";
import SuccessStories from "../Components/SuccessStories";
import InfoSection from "../Components/InfoSection";
import Slider from "../Components/Slider";

const Home = () => {
  const [itemCard, setItemCard] = useState([]);

  useEffect(() => {
    fetch("https://where-is-it-server-eight.vercel.app/items")
      .then((res) => res.json())
      .then((data) => {
        const sortedItem = data
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 6);
        setItemCard(sortedItem);
      });
  }, []);

  return (
    <div className="bg-base-200 text-base-content min-h-screen">
      <Helmet>
        <title>Lost-Found | Home</title>
      </Helmet>
      {/* <LostFoundSlider /> */}
      <Slider></Slider>
      <LostFoundItemCard itemCard={itemCard} />
      <SuccessStories />
      <AnimatedCounter />
      <InfoSection />
      <HowItWorks />
    </div>
  );
};

export default Home;
