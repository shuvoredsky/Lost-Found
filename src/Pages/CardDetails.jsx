import React, { useContext, useState } from "react";
import { useLoaderData } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaRegCalendarAlt,
  FaUser,
} from "react-icons/fa";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const CardDetails = () => {
  const { user } = useContext(AuthContext); // fixed from use()

  const { data } = useLoaderData();

  const [recoverDate, setRecoverDate] = useState(new Date());

  const {
    _id,
    postType,
    thumbnail,
    title,
    description,
    category,
    location,
    date,
    name,
    email,
    status,
  } = data;

  const handleRecoverdItems = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    data.userName = user.displayName;
    data.userEmail = user.email;
    data.userImage = user.photoURL;

    if (status === "recovered") {
      // You cannot return JSX inside event handler, so instead show a Swal alert:
      Swal.fire({
        icon: "info",
        title: "Already Recovered",
        text: "This item has already been marked as recovered.",
      });
      return;
    }

    try {
      const res = await axios.post(
        `https://where-is-it-server-eight.vercel.app/recovered-items/${_id}`,
        data
      );
      if (res.data.acknowledged) {
        Swal.fire("Item marked as recovered!");
      }
    } catch (err) {
      console.error("Recovery failed:", err);
      Swal.fire(
        "Error",
        err.response?.data?.message || "Something went wrong",
        "error"
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-12 px-6">
      <Helmet>
        <title>Lost-Found - Card Details</title>
      </Helmet>

      <div className="bg-base-100 shadow-2xl rounded-2xl overflow-hidden">
        <div className="h-64 bg-base-200">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="p-6 space-y-4 text-base-content">
          <h2 className="text-3xl font-bold text-primary">
            {postType === "Found" ? "Found Item" : "Lost Item"}
          </h2>

          <div>
            <button
              className="btn btn-primary"
              disabled={status === "recovered"}
              onClick={() => document.getElementById("my_modal_5").showModal()}
            >
              {postType === "Found" ? "This is Mine!" : "Found This!"}
            </button>

            <dialog
              id="my_modal_5"
              className="modal modal-bottom sm:modal-middle"
            >
              <div className="modal-box bg-base-100">
                <form
                  onSubmit={handleRecoverdItems}
                  className="space-y-4 bg-base-100 p-6 rounded-xl"
                >
                  <input
                    name="location"
                    type="text"
                    required
                    placeholder="Recovered location"
                    className="input input-bordered w-full bg-base-200"
                  />

                  <label className="block font-semibold text-base-content">
                    Date Lost or Found
                  </label>
                  <DatePicker
                    name="date"
                    selected={recoverDate}
                    onChange={(date) => setRecoverDate(date)}
                    className="input input-bordered w-full bg-base-200"
                    required
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={user.displayName}
                      readOnly
                      className="input input-bordered w-full bg-base-200"
                    />
                    <input
                      type="text"
                      value={user.email}
                      readOnly
                      className="input input-bordered w-full bg-base-200"
                    />
                  </div>

                  <div className="flex justify-center">
                    <img
                      src={user.photoURL}
                      alt="User"
                      className="w-16 h-16 rounded-full border border-base-300"
                    />
                  </div>

                  <button type="submit" className="btn btn-success w-full mt-4">
                    Submit Recovery Info
                  </button>
                </form>

                <div className="modal-action">
                  <form method="dialog">
                    <button className="btn btn-ghost">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>

          <p className="text-xl font-semibold text-base-content">{title}</p>

          <p className="text-base-content opacity-70 leading-relaxed">
            {description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 text-base-content text-base">
            <div>
              <strong>Category:</strong> {category}
            </div>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-primary" />
              <span>
                <strong>Location:</strong> {location}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaRegCalendarAlt className="text-primary" />
              <span>
                <strong>Date:</strong> {new Date(date).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaUser className="text-primary" />
              <span>
                <strong>Posted by:</strong> {name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-primary" />
              <span>
                <strong>Email:</strong> {email}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
