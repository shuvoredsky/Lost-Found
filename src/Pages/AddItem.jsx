import React, { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Swal from "sweetalert2";

const AddItem = () => {
  const { user } = useContext(AuthContext);
  const [date, setDate] = useState(new Date());
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [uploading, setUploading] = useState(false);

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

  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  
  const uploadImageToImgBB = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        formData
      );
      return response.data.data.display_url;
    } catch (error) {
      console.error("Image upload failed:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (!imageFile) {
      Swal.fire({
        title: "Warning!",
        text: "Please select an image first.",
        icon: "warning",
      });
      return;
    }

    setUploading(true);

    try {

      const imageUrl = await uploadImageToImgBB(imageFile);

      
      const data = {
        ...formData,
        thumbnail: imageUrl, 
        date,
        name: user.displayName,
        email: user.email,
        status: "",
      };


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
        setImageFile(null);
        setImagePreview("");
      }
    } catch (err) {
      console.error("Post failed:", err);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Try again.",
        icon: "error",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 rounded-2xl shadow-lg my-6 border border-base-300 bg-base-100 text-base-content">
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">
        Add Lost or Found Item
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
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
          <label className="block font-semibold mb-1">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border border-base-300 p-2 rounded bg-base-200 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-primary file:text-white hover:file:bg-primary-focus"
            required
          />
          
          {imagePreview && (
            <div className="mt-3">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-40 h-40 object-cover rounded border border-base-300"
              />
            </div>
          )}
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
            disabled={uploading}
            className="bg-primary hover:bg-primary-focus text-white font-semibold px-6 py-2 rounded shadow transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? "Uploading..." : "Add Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddItem;