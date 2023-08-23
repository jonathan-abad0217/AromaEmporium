import React, { useState } from "react";

const ProductSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/e-commerce/products/search`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productName: searchQuery }),
        }
      );
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error searching for courses:", error);
    }
  };

  return (
    <div>
      <h2>Product Search</h2>
      <div className="form-group">
        <label htmlFor="courseName">Product Name:</label>
        <input
          type="text"
          id="productName"
          className="form-control"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
      </div>
      <button className="btn btn-primary mt-3" onClick={handleSearch}>
        Search
      </button>
      <h3>Search Results:</h3>
      <ul>
        {searchResults.map((product) => (
          <li key={product._id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductSearch;
