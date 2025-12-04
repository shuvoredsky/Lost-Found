import React from "react";
import Lottie from "lottie-react";
import lottieChat from "../assets/lottie/chat.json";

const stories = [
  {
    name: "Reza Ahmed",
    photo:
      "https://i.ibb.co/cXp2wYVP/front-view-male-student-wearing-black-backpack-holding-copybooks-files-blue-wall.jpg",
    feedback:
      "I thought I’d never find my wallet, but someone returned it within hours!",
    location: "Dhaka University",
  },
  {
    name: "Tania Islam",
    photo:
      "https://i.ibb.co/zh6kpbS6/pretty-brunette-female-standing-pointing-by-finger.jpg",
    feedback:
      "Thanks to this platform, I got back my lost phone from a kind stranger!",
    location: "North South University",
  },
  {
    name: "Asif Hossain",
    photo:
      "https://i.ibb.co/m5MXG4CV/front-view-male-student-dark-t-shirt-yellow-backpack-holding-files-books-smiling-light-blue-wall.jpg",
    feedback:
      "Lost my bag in the metro. Posted here and within a day, someone returned it!",
    location: "Dhaka Metro",
  },
  {
    name: "Farzana Rahman",
    photo:
      "https://i.ibb.co/YB540sjN/young-smiling-student-woman-white-background.jpg",
    feedback:
      "I never believed I’d get my documents back. But this site proved me wrong!",
    location: "Northern University",
  },
];

const SuccessStories = () => {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-base-100 text-base-content">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-primary lg:mb-6 mb-2">
          Real Success Stories
        </h2>

        <div className="w-32 sm:w-48 mx-auto lg:mb-6 mb-2">
          <Lottie animationData={lottieChat} loop={true} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stories.map((story, index) => (
            <div
              key={index}
              className="bg-base-200 border border-base-300 shadow-md rounded-xl p-6 flex flex-col items-center text-center hover:shadow-xl transition"
            >
              <img
                src={story.photo}
                alt={story.name}
                className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-primary/30"
              />
              <h3 className="text-lg font-semibold text-primary">
                {story.name}
              </h3>
              <p className="text-sm text-secondary italic">{story.location}</p>
              <p className="mt-3 text-sm text-base-content/80">
                "{story.feedback}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuccessStories;
