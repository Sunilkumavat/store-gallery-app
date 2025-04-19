import React, { useEffect, useState } from "react";
import axios from "axios";
import Categories from "./Categories";

const StoreList = () => {
  const [stores, setStores] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStores = async (categoryId) => {
    setLoading(true);
    try {
      const url = categoryId
        ? `http://localhost:3001/stores?cats=${selectedCategory}`
        : `http://localhost:3001/stores`;

      const response = await axios.get(url);
      setStores(response.data);
    } catch (err) {
      setError("Failed to fetch stores");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Selected Category:", selectedCategory);
    fetchStores(selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Store Listing</h1>
      <Categories onSelect={setSelectedCategory} />

      {loading && <p>Loading stores...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stores.map((store) => (
          <div key={store.id} className="border p-4 rounded shadow">
            <h2 className="text-lg font-semibold">{store.name}</h2>
            <p>{store.description}</p>
            <p className="text-sm text-gray-500">Clicks: {store.clicks}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreList;
