import React from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import lottieShare from "../assets/lottie/shareInfo.json";
import { Link } from "react-router";

const InfoSection = () => {
  return (
    <div className="py-16 px-6 lg:px-20 bg-base-100 text-base-content">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        <div>
          <h2 className="text-3xl font-bold text-primary mb-4">
            Never Lose Hope!
          </h2>
          <p className="mb-6">
            Every lost item holds a story, and every story deserves a happy
            ending. Post your lost item and let our kind-hearted community help
            you find it again.
          </p>
          <Link to="/add-lost-found" className="btn btn-primary">
            Add Your Item
          </Link>
        </div>

        <motion.div
          className="w-full"
          animate={{
            rotate: [0, 1.5, -1.5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div>
            <Lottie animationData={lottieShare} loop={true} />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default InfoSection;
