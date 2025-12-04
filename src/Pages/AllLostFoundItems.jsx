import axios from "axios";
import { useEffect, useState } from "react";
import { FaTable, FaThLarge } from "react-icons/fa";
import { ImSpinner9 } from "react-icons/im";
import { Link } from "react-router"; // fix import

const AllLostFoundItems = () => {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState([]);
  const [isTableView, setIsTableView] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios("https://where-is-it-server-eight.vercel.app/items")
      .then((res) => {
        setItems(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <ImSpinner9 className="animate-spin text-5xl text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 bg-base-100 text-base-content">
      <div className="text-center mb-4">
        <form>
          <label className="input input-bordered w-full max-w-md mx-auto flex items-center gap-2 bg-base-100">
            <svg
              className="h-5 w-5 opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="search"
              className="input input-ghost flex-grow bg-base-100"
              placeholder="Search"
            />
          </label>
        </form>
      </div>

      <div className="flex justify-end mb-4 gap-2">
        <button
          onClick={() => setIsTableView(false)}
          className={`btn btn-sm ${!isTableView ? "btn-primary" : "btn-ghost"}`}
          aria-label="Card view"
          type="button"
        >
          <FaThLarge size={20} />
        </button>
        <button
          onClick={() => setIsTableView(true)}
          className={`btn btn-sm ${isTableView ? "btn-primary" : "btn-ghost"}`}
          aria-label="Table view"
          type="button"
        >
          <FaTable size={20} />
        </button>
      </div>

      {isTableView ? (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full bg-base-100 rounded-lg overflow-hidden shadow">
            <thead className="bg-base-200">
              <tr>
                {["Image", "Title", "Category", "Location", "Type"].map(
                  (header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left text-xs font-medium text-base-content opacity-70 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-base-300">
              {items
                .filter((item) =>
                  search
                    ? item.title.toLowerCase().includes(search.toLowerCase())
                    : true
                )
                .map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-base-200 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-base-content font-semibold">
                      {item.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm opacity-70">
                      {item.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm opacity-70">
                      {item.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm opacity-70">
                      {item.postType}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items
            .filter((item) =>
              search
                ? item.title.toLowerCase().includes(search.toLowerCase())
                : true
            )
            .map((item) => (
              <div
                key={item._id}
                className="border rounded-xl p-4 shadow bg-base-100 hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-md mb-3"
                />
                <h2 className="text-lg font-semibold mb-2 line-clamp-1 text-base-content">
                  {item.title}
                </h2>
                <div className="space-y-1 text-sm opacity-70 text-base-content">
                  <p>
                    <span className="font-medium text-base-content">
                      Category:
                    </span>{" "}
                    {item.category}
                  </p>
                  <p>
                    <span className="font-medium text-base-content">
                      Location:
                    </span>{" "}
                    {item.location}
                  </p>
                  <p>
                    <span className="font-medium text-base-content">Type:</span>{" "}
                    {item.postType}
                  </p>
                </div>
                <Link
                  to={`/items/${item._id}`}
                  className="btn btn-primary mt-4 w-full"
                >
                  View Details
                </Link>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default AllLostFoundItems;
