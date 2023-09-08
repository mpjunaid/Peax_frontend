"use client";

import Modal from "react-modal";

import Layout from "./layout";
import { useEffect, useState } from "react";
import "./globals.css";
import { Pie } from "react-chartjs-2";
import { Chart, Tooltip, Title, ArcElement, Legend } from "chart.js";
import PriceHistoryChart from "./components/PriceHistoryChart";
import PieChart from "./components/PieChart";

export default function Home() {
  const [message, setMessage] = useState("");
  const [auth, setAuth] = useState(false);
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [apiError, setApiError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [pieChartData, setPieChartData] = useState(null);

  const [editedData, setEditedData] = useState({
    id: null,
    name: "",
    description: "",
    price: "",
    stock: "",
    supplier: "",
    category: "",
  });

  const handleEditClick = (row) => {
    console.log("Handle edit click triggered with row:", row);

    setEditedData({
      id: row.id,
      name: row.name,
      price: row.price,
      stock: row.stock,
      supplier: row.supplier,
      description: row.description,
      category: row.category,
    });
    openModal(row);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(`Setting ${name} to ${value}`);

    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async () => {
    try {
      const { id, name, price, stock, supplier, description, category } =
        editedData;

      console.log({ id, name, price, stock, supplier, description, category });
      const response = await fetch(
        "http://localhost:8000/api/plantEditWithId/",
        {
          credentials: "include",
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id,
            name,
            price,
            stock,
            supplier,
            description,
            category,
          }),
        }
      );
      const responseData = await response.json();
      if (response.status === 200) {
        console.log("Registration successful");
        // Reload the page after successful registration
        window.location.reload();
      } else {
        console.error("Registration failed");
        // Handle registration error here
        console.error("Response data:", responseData);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle fetch or other errors here
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("http://localhost:8000/api/plants/", {
          credentials: "include",
        });

        if (response.status === 403) {
          setMessage("You are not logged in");
          setAuth(false);
          setApiError(true);
          return;
        }

        const content = await response.json();
        if (content.data.name) {
          setMessage(`Hi ${content.data.name}`);
          setAuth(true);
        } else {
          setMessage("You are not logged in");
          setAuth(false);
        }

        if (content.objects) {
          setPlants(content.objects);
        }
      } catch (e) {
        setMessage("You are not logged in");
        setAuth(false);
      }
    })();
  }, []);

  const filteredPlants = plants.filter(
    (plant) =>
      plant.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!categoryFilter || plant.category === categoryFilter)
  );

  const openModal = (row) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedRow(null);
    setIsModalOpen(false);
  };

  let content;
  if (apiError) {
    content = (
      <>
        <div className="flex flex-col">
          <div className="card card-compact bg-base-100 shadow-xl gap-2 p-2 m-1">
            {/* <figure>
              <img src="/next.svg" alt="Shoes" />
            </figure> */}
            <div className="card-body">
              <div className="flex flex-row  gap-4 p-2 items-center justify-center">
                <div className="flex flex-col ">
                  <h2 className="card-title w-96 text-6xl">
                    We make your business profitable
                  </h2>
                  <p className="mt-2 text-orange-500 text-lg italic">
                    With live market stock price
                  </p>
                </div>
                <img style={{ height: "400px" }} src="/person.png" alt="Easy" />
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-around">
            <div className="card card-compact w-80 bg-base-100 shadow-xl gap-4 p-2 m-4">
              <figure>
                <img src="data.png" className="w-64" alt="Easy" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Efficient data management</h2>
              </div>
            </div>

            <div className="card card-compact w-80 bg-base-100 shadow-xl gap-4 p-2 m-4">
              <figure>
                <img src="easy_to.png" className="w-64" alt="Easy" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Easy-to-use interface</h2>
              </div>
            </div>
            <div className="card card-compact w-80 bg-base-100 shadow-xl gap-4 p-2 m-4">
              <figure>
                <img src="Search.PNG" className="w-64" alt="Easy" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  Powerful filtering and search capabilities
                </h2>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    content = (
      <div className="flex flex-row ">
        <div className="flex-col  gap-2 mb-8">
          <div className="card p-2 bg-base-100 shadow-md m-4">
            <div className="card-body">
              <h1 className="font-semibold">
                Percentage distrubtion of categories
              </h1>

              <div>{plants.length > 0 && <PieChart plants={plants} />}</div>
            </div>
          </div>
          <div className="card p-4 bg-base-100 shadow-md m-4">
            <div className="card-body">
              <div>
                {plants.length > 0 && <PriceHistoryChart data={plants} />}
              </div>
            </div>
          </div>
        </div>
        <div className="card p-4 bg-base-100 shadow-md m-4">
          <div className="card-body">
            <input
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Flowers">Flowers</option>
              <option value="Fruits">Fruits</option>
              <option value="Vegetables">Vegetables</option>
            </select>
            <div className="overflow-x-auto">
              <table className="table ">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Supplier</th>
                    <th>Category</th>
                    {/* <th>Created At</th> */}
                    <th>Updated At</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPlants.map((plant) => (
                    <tr key={plant.id}>
                      <td>{plant.name}</td>
                      <td>{plant.description}</td>
                      <td>{plant.price}</td>
                      <td>{plant.stock}</td>
                      <td>{plant.supplier}</td>
                      <td>{plant.category}</td>
                      {/* <td>{plant.created_at}</td> */}
                      <td>{plant.updated_at}</td>
                      <td>
                        <button onClick={() => handleEditClick(plant)}>
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Layout auth={auth}>
        {content}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Edit Modal"
        >
          {selectedRow && (
            <div className="flex  flex-row   text-xl justify-center">
              <div
                style={{ width: "350px", height: "400px" }}
                className="bg-blue-200 p-4 rounded-l-lg"
              >
                <h2 className="font-semibold">
                  Edit the selected plant details
                </h2>
                <p className="font-light p-2">
                  {" "}
                  Please edit the details of the stock, price and supplier. The
                  decription and category is hidden at this point and can be
                  added easily to these options. The name and Id values is not
                  enabled to be edited at this point.
                </p>
              </div>
              <div
                style={{ width: "600px", height: "400px" }}
                className="flex  bg-green-100 flex-col p-4 rounded-r-lg text-xl justify-center"
              >
                <div className="flex flex-row items-center">
                  <label className="w-32">Id</label>
                  <input
                    type="text"
                    placeholder={selectedRow.id}
                    className="input input-bordered input-info w-full max-w-xs"
                    disabled
                  />
                </div>
                <div className="flex flex-row items-center ">
                  <label className="w-32">Name</label>
                  <input
                    type="text"
                    placeholder={selectedRow.name}
                    className="input input-bordered input-info w-full max-w-xs"
                    disabled
                  />
                </div>
                <div className="flex flex-row items-center">
                  <label className="w-32">Price</label>
                  <input
                    type="number"
                    onChange={handleInputChange}
                    name="price"
                    value={editedData.price}
                    className="input input-bordered input-info w-full max-w-xs"
                  />
                </div>
                <div className="flex flex-row items-center">
                  <label className="w-32">Stock</label>
                  <input
                    type="number"
                    onChange={handleInputChange}
                    name="stock"
                    value={editedData.stock}
                    className="input input-bordered input-info w-full max-w-xs"
                  />
                </div>
                <div className="flex flex-row items-center">
                  <label className="w-32">Supplier</label>
                  <input
                    type="text"
                    onChange={handleInputChange}
                    name="supplier"
                    value={editedData.supplier}
                    className="input input-bordered input-info w-full max-w-xs"
                  />
                </div>

                <div className="flex flex-row justify-around p-2 m-4 gap-4">
                  <button
                    className="btn btn-success"
                    onClick={handleFormSubmit}
                  >
                    Submit
                  </button>
                  <button className="btn btn-info" onClick={closeModal}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </Layout>
    </>
  );
}
