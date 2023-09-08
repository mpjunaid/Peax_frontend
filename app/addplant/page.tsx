"use client";

import Modal from "react-modal";

import Layout from "../layout";
import { useEffect, useState } from "react";
import "../globals.css";

export default function Home() {
  const [auth, setAuth] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [userName, setUserName] = useState(""); // State to store user name

  const [addData, setAddData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    supplier: "",
    category: "",
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("http://localhost:8000/api/user/", {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          if (data.name) {
            setAuth(true);
            setUserName(data.name); // Set the user name in the state
          } else {
            // Redirect to the home page if no name is returned
            window.location.href = "/";
          }
        } else {
          // Redirect to the home page on error
          window.location.href = "/";
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setApiError(true);
      }
    })();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAddData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      addData.name.length < 5 ||
      addData.stock === "" ||
      addData.price === "" ||
      addData.description === "" ||
      addData.category === ""
    ) {
      // Perform validation checks
      console.log("Validation error: Please fill in all required fields.");
      return;
    }
    console.log(JSON.stringify(addData, null, 2));
    try {
      const response = await fetch("http://localhost:8000/api/plantAdd/", {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addData, null, 2),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        window.location.href = "/";
      } else {
        console.log("Error:", response);
      }
    } catch (error) {
      console.error("Error adding plant:", error);
    }
  };

  return (
    <>
      <Layout auth={auth}>
        {/* <div>
          {userName ? <p>Welcome, {userName}!</p> : <p>Loading user data...</p>}
        </div> */}
        <form onSubmit={handleSubmit} className="flex justify-center">
          <div style={{ width: "600px" }} className="w-100 ">
            <div className="flex flex-col bg-gray-100 p-4 gap-4 m-4 text-xl justify-center">
              <div className="flex flex-row items-center gap-4 justify-between p-2">
                <label className="w-32">Name </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                  value={addData.name}
                  onChange={handleInputChange}
                  minLength={5}
                  required
                />
              </div>
              <div className="flex flex-row items-center gap-4 justify-between p-2">
                <label className="w-32"> Description</label>

                <input
                  type="text"
                  placeholder="Type here"
                  name="description"
                  className="input input-bordered w-full max-w-xs"
                  value={addData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="flex flex-row items-center gap-4 justify-between p-2">
                <label className="w-32"> Price</label>
                <input
                  type="number"
                  name="price"
                  className="input input-bordered w-full max-w-xs"
                  value={addData.price}
                  onChange={handleInputChange}
                  step="0.01"
                  required
                />
              </div>
              <div className="flex flex-row items-center gap-4 justify-between p-2">
                <label className="w-32"> Stock</label>
                <input
                  type="number"
                  name="stock"
                  className="input input-bordered w-full max-w-xs"
                  value={addData.stock}
                  onChange={handleInputChange}
                  step="1"
                  required
                />
              </div>
              <div className="flex flex-row items-center gap-4 justify-between p-2">
                <label className="w-32"> Supplier</label>

                <input
                  type="text"
                  placeholder="Type here"
                  name="supplier"
                  className="input input-bordered w-full max-w-xs"
                  value={addData.supplier}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-row items-center gap-4 justify-between p-2">
                <label className="w-32"> Category</label>

                <select
                  className="select select-bordered w-full max-w-xs"
                  name="category"
                  value={addData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option disabled selected value="">
                    Select a category
                  </option>
                  <option value="Flowers">Flowers</option>
                  <option value="Fruits">Fruits</option>
                  <option value="Vegetables">Vegetables</option>
                </select>
              </div>
              <div className="flex flex-row justify-between gap-4 p-2">
                <a href="/" className="btn btn-secondary w-24">
                  Cancel
                </a>
                <button className="btn btn-primary w-24" type="submit">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </Layout>
    </>
  );
}
