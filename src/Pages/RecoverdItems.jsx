import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Helmet } from "react-helmet-async";
import { ImSpinner9 } from "react-icons/im";

const RecoveredItems = () => {
  const { user } = useContext(AuthContext);
  const [recovered, setRecovered] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axios(
        `https://where-is-it-server-eight.vercel.app/allRecovered/${user.email}`
      )
        .then((res) => {
          setRecovered(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }
  }, [user]);

  return (
    <div className="p-4 md:p-8 bg-base-100 text-base-content min-h-screen">
      <Helmet>
        <title>Lost-Found | Recovered Items</title>
      </Helmet>

      <h1 className="text-xl md:text-3xl font-bold mb-6 text-center text-primary">
        Recovered Items
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <ImSpinner9 className="animate-spin text-5xl text-primary" />
        </div>
      ) : recovered.length === 0 ? (
        <p className="text-center text-error font-semibold">
          No recovered items found for your account.
        </p>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-xl border border-base-300">
          <table className="min-w-full divide-y divide-base-300">
            <thead className="bg-primary/10">
              <tr>
                {["#", "Item", "Category", "Location", "Date", "Status"].map(
                  (heading, idx) => (
                    <th
                      key={idx}
                      className={`px-4 py-3 text-left text-sm font-medium text-primary/80 ${
                        heading === "Date" ? "hidden sm:table-cell" : ""
                      }`}
                    >
                      {heading}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/20 bg-base-100">
              {recovered.map((item, index) => (
                <tr
                  key={item._id}
                  className="hover:bg-primary/20 transition-colors duration-200"
                >
                  <td className="px-4 py-3 text-sm text-primary">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 flex items-center gap-3 text-sm font-medium text-primary">
                    <img
                      className="w-10 h-10 rounded-full border border-primary object-cover"
                      src={item.photo}
                      alt={item.name}
                    />
                    <span>{item.name}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-primary">
                    {item.category}
                  </td>
                  <td className="px-4 py-3 text-sm text-primary">
                    {item.location}
                  </td>
                  <td className="px-4 py-3 text-sm text-primary hidden sm:table-cell">
                    {new Date(item.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold text-success">
                    {item.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RecoveredItems;
