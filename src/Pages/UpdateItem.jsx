import axios from "axios";
import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";

const UpdateItem = () => {
  const { user } = useContext(AuthContext);
  const { data } = useLoaderData();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const updateData = Object.fromEntries(formData.entries());

    axios
      .put(
        `https://where-is-it-server-eight.vercel.app/items/${data._id}`,
        updateData
      )
      .then((res) => {
        if (res.data.acknowledged) {
          Swal.fire({
            icon: "success",
            title: "Update Successful",
            text: "Your item has been updated!",
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: "Something went wrong. Please try again.",
        });
      });
  };

  return (
    <div className="min-h-screen bg-base-100 py-10 px-4 text-base-content">
      <Helmet>
        <title>Lost-Found | Update Item</title>
      </Helmet>

      <div className="max-w-3xl mx-auto bg-base-200 shadow-2xl rounded-2xl p-10">
        <h2 className="text-4xl font-bold text-center text-primary mb-10">
          Update Your Lost & Found Item
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="font-semibold mb-1 block">Title</label>
            <input
              type="text"
              name="title"
              defaultValue={data.title}
              placeholder="Enter item title"
              className="input w-full bg-base-300 input-bordered"
              required
            />
          </div>

          <div>
            <label className="font-semibold mb-1 block">Category</label>
            <input
              type="text"
              name="category"
              defaultValue={data.category}
              placeholder="Enter item category"
              className="input w-full bg-base-300 input-bordered"
              required
            />
          </div>

          <div>
            <label className="font-semibold mb-1 block">Location</label>
            <input
              type="text"
              name="location"
              defaultValue={data.location}
              placeholder="Enter item location"
              className="input w-full bg-base-300 input-bordered"
              required
            />
          </div>

          <div>
            <label className="font-semibold mb-1 block">Description</label>
            <textarea
              name="description"
              defaultValue={data.description}
              placeholder="Describe the item..."
              className="textarea w-full bg-base-300 textarea-bordered"
              rows="4"
              required
            ></textarea>
          </div>

          <div>
            <label className="font-semibold mb-1 block">Post Type</label>
            <select
              name="postType"
              defaultValue={data.postType}
              className="select w-full bg-base-300 select-bordered"
              required
            >
              <option value="">Select Post Type</option>
              <option value="Lost">Lost</option>
              <option value="Found">Found</option>
            </select>
          </div>

          <div>
            <label className="font-semibold mb-1 block">Image URL</label>
            <input
              type="url"
              name="thumbnail"
              defaultValue={data.thumbnail}
              placeholder="Enter image URL"
              className="input w-full bg-base-300 input-bordered"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="font-semibold mb-1 block">Email</label>
              <input
                type="email"
                name="email"
                defaultValue={data.email}
                readOnly
                className="input w-full bg-base-300 input-bordered cursor-not-allowed"
              />
            </div>
            <div>
              <label className="font-semibold mb-1 block">User Name</label>
              <input
                type="text"
                name="userName"
                defaultValue={user?.displayName || ""}
                readOnly
                className="input w-full bg-base-300 input-bordered cursor-not-allowed"
              />
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="btn btn-primary font-bold text-lg mt-4"
            >
              Update Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateItem;
