import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { ImSpinner9 } from "react-icons/im";

const ManageMyItem = () => {
  const { data } = useLoaderData();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setItems(data);
    setTimeout(() => setLoading(false), 600);
  }, [data]);

  const handleDeleteItem = async (_id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const response = await axios.delete(
          `https://where-is-it-server-eight.vercel.app/my-items/${_id}`
        );

        if (response.data.deletedCount) {
          Swal.fire({
            title: "Deleted!",
            text: "Your item has been deleted.",
            icon: "success",
          });

          setItems((prev) => prev.filter((item) => item._id !== _id));
        }
      } catch (error) {
        console.error("Delete failed", error);
        Swal.fire("Error", "Something went wrong while deleting", "error");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh] bg-base-100 text-base-content">
        <ImSpinner9 className="animate-spin text-5xl text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 bg-base-100 text-base-content">
      <Helmet>
        <title>Lost-Found | My Items</title>
      </Helmet>
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-primary">
        My Items
      </h1>

      {items.length === 0 ? (
        <div className="text-center text-base-content opacity-70 text-lg py-10">
          No items found. You haven't posted any lost/found item yet.
        </div>
      ) : (
        <div className="shadow rounded-lg border border-base-300 overflow-hidden">
          {/* Desktop Table View */}
          <div className="hidden md:block">
            <table className="min-w-full divide-y divide-base-300">
              <thead className="bg-base-200 text-base-content">
                <tr>
                  {[
                    "Title",
                    "Category",
                    "Location",
                    "Post Type",
                    "Actions",
                  ].map((title) => (
                    <th
                      key={title}
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    >
                      {title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-base-100 divide-y divide-base-300">
                {items.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-base-200 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={item.thumbnail}
                          alt="item"
                          className="w-10 h-10 rounded-full object-cover border border-base-300"
                        />
                        <span className="ml-3 font-semibold">{item.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">{item.category}</td>
                    <td className="px-6 py-4 text-sm">{item.location}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          item.postType === "Lost"
                            ? "bg-error text-error-content"
                            : "bg-success text-success-content"
                        }`}
                      >
                        {item.postType}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-sm font-medium">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => handleDeleteItem(item._id)}
                          className="btn btn-error btn-sm"
                        >
                          Delete
                        </button>
                        <Link
                          to={`/update-item/${item._id}`}
                          className="btn btn-success btn-sm"
                        >
                          Update
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4 p-4">
            {items.map((item) => (
              <div
                key={item._id}
                className="bg-base-100 p-4 rounded-lg shadow border border-base-300"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <img
                    src={item.thumbnail}
                    alt="item"
                    className="w-12 h-12 rounded-full object-cover border border-base-300"
                  />
                  <div>
                    <h3 className="font-semibold text-base-content">
                      {item.title}
                    </h3>
                    <p className="text-sm opacity-70">{item.category}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-medium">Location:</span>{" "}
                    {item.location}
                  </p>
                  <p>
                    <span className="font-medium">Status:</span>
                    <span
                      className={`ml-2 px-2 py-1 rounded text-xs font-medium ${
                        item.postType === "Lost"
                          ? "bg-error text-error-content"
                          : "bg-success text-success-content"
                      }`}
                    >
                      {item.postType}
                    </span>
                  </p>
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    onClick={() => handleDeleteItem(item._id)}
                    className="btn btn-error btn-sm"
                  >
                    Delete
                  </button>
                  <Link
                    to={`/update-item/${item._id}`}
                    className="btn btn-success btn-sm"
                  >
                    Update
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageMyItem;
