import React, { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Swal from "sweetalert2";

const AddItem = () => {
  const { user } = useContext(AuthContext);
  const [date, setDate] = useState(new Date());

  const initialState = {
    postType: "Lost",
    thumbnail: "",
    title: "",
    description: "",
    category: "",
    location: "",
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      date,
      name: user.displayName,
      email: user.email,
      status: "",
    };

    try {
      const res = await axios.post(
        "https://where-is-it-server-eight.vercel.app/items",
        data
      );
      if (res.data.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "Item has been added successfully.",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });
        setFormData(initialState);
        setDate(new Date());
      }
    } catch (err) {
      console.error("Post failed:", err);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Try again.",
        icon: "error",
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 rounded-2xl shadow-lg my-6 border border-base-300 bg-base-100 text-base-content">
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">
        Add Lost or Found Item
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Post Type */}
        <div>
          <label className="block font-semibold mb-1">Post Type</label>
          <select
            name="postType"
            value={formData.postType}
            onChange={handleChange}
            className="w-full border border-base-300 p-2 rounded focus:outline-none bg-base-200"
          >
            <option value="Lost">Lost</option>
            <option value="Found">Found</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">Thumbnail URL</label>
          <input
            type="text"
            name="thumbnail"
            value={formData.thumbnail}
            onChange={handleChange}
            className="w-full border border-base-300 p-2 rounded bg-base-200"
            placeholder="https://example.com/image.jpg"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-base-300 p-2 rounded bg-base-200"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-base-300 p-2 rounded bg-base-200"
            rows={4}
            required
          ></textarea>
        </div>

        <div>
          <label className="block font-semibold mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-base-300 p-2 rounded bg-base-200"
            placeholder="e.g. electronics, bag, document"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border border-base-300 p-2 rounded bg-base-200"
            placeholder="Enter lost/found location"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Date Lost/Found</label>
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            className="w-full border border-base-300 p-2 rounded bg-base-200 text-base-content"
            required
          />
        </div>

        <div className="bg-base-200 border border-base-300 rounded p-3">
          <p>
            <strong>Contact Name:</strong> {user.displayName}
          </p>
          <p>
            <strong>Contact Email:</strong> {user.email}
          </p>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-primary hover:bg-primary-focus text-white font-semibold px-6 py-2 rounded shadow transition"
          >
            Add Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddItem;
