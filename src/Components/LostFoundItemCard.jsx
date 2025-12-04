import React from "react";
import { Link } from "react-router";

const LostFoundItemCard = ({ itemCard }) => {
  return (
    <div className="py-10 bg-base-100 text-base-content">
      <h1 className="text-3xl font-bold text-center text-primary pb-5">
        Latest Find & Lost Items
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 max-w-6xl mx-auto">
        {itemCard.map((item) => (
          <div
            key={item._id}
            className="bg-base-200 text-base-content rounded-xl shadow-md overflow-hidden border border-base-300"
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <p className="text-sm text-secondary mb-1 font-medium uppercase">
                {item.postType}
              </p>
              <h2 className="text-lg font-semibold">{item.title}</h2>

              <Link
                to={`/items/${item._id}`}
                className="inline-block mt-4 px-4 py-2 rounded bg-primary text-primary-content hover:bg-primary-focus transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* See All Button */}
      <div className="text-center mt-8">
        <Link
          to="/allItems"
          className="px-6 py-2 bg-accent text-accent-content rounded hover:bg-accent-focus transition"
        >
          See All
        </Link>
      </div>
    </div>
  );
};

export default LostFoundItemCard;
