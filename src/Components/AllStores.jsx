import React, { useEffect, useState } from "react";
import axios from "axios";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";

const AllStores = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axios.get("http://localhost:3001/stores");
        setStores(response.data);
      } catch (err) {
        setError("Failed to fetch stores");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  const handleFavorite = (storeId) => {
    setFavourites((prev) =>
      prev.includes(storeId)
        ? prev.filter((id) => id !== storeId)
        : [...prev, storeId]
    );
  };

  const renderCashback = (store) => {
    if (store.cashback_enabled === 0) {
      return <p className="text-sm text-gray-500">No cashback available</p>;
    }

    const { rate_type, amount_type, cashback_amount } = store;
    const formattedAmount = parseFloat(cashback_amount).toFixed(2);
    const amount =
      amount_type === "fixed" ? `$${formattedAmount}` : `${formattedAmount}%`;
    const cashbackText = `${
      rate_type.charAt(0).toUpperCase() + rate_type.slice(1)
    } ${amount} cashback`;

    return (
      <p className="text-sm text-green-600 font-semibold">{cashbackText}</p>
    );
  };

  if (loading) return <p>Loading stores...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="mx-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full ">
      {stores.map((store) => {
        const isFavourite = favourites.includes(store.id);

        return (
          <div
            key={store.id}
            className="relative border p-4 rounded shadow cursor-pointer hover:shadow-lg transition w-full"
            onClick={() => (window.location.href = store.homepage)}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleFavorite(store.id);
              }}
              className="absolute top-2 right-2"
            >
              {isFavourite ? (
                <HeartSolid className="h-6 w-6 text-red-500" />
              ) : (
                <HeartOutline className="h-6 w-6 text-gray-400 hover:text-red-500" />
              )}
            </button>

            <div className="flex justify-center mb-4">
              <img
                src={store.logo}
                alt={store.name}
                className="h-16 w-16 object-contain"
              />
            </div>

            <h2 className="text-lg font-semibold text-center mb-2">
              {store.name}
            </h2>

            <div className="text-center">{renderCashback(store)}</div>
          </div>
        );
      })}
    </div>
  );
};

export default AllStores;
