import "./App.css";

import { useEffect, useState } from "react";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";

import Nav from "./components/UI/Nav";
import Table from "./components/UI/Table";
import OrderFormModal from "./components/UI/OrderFormModal";
import OrderDetails from "./components/UI/OrderDetails";
import Backdrop from "./components/UI/Backdrop";
import AdminPage from "./pages/Admin/AdminPage";
import DepoPage from "./pages/DepoPage";

function App() {
  // State to store orders fetched from the server
  const [orders, setOrders] = useState([]);
  const [counter, setCounter] = useState(0);
  const [workers, setWorkers] = useState([]);
  const [fabrics, setFabrics] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch data from the server when the component mounts
  useEffect(() => {
    fetchOrders();
  }, []); // Empty dependency array to ensure the effect runs only once

  // Function to fetch orders from the server
  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "https://sunroll-server.dt.r.appspot.com/api/orders"
      ); // Replace this with your actual API endpoint
      console.log(response.data);
      // response.data.data.sort((a, b) => a.status - b.status);
      response.data.data.sort((a, b) => {
        if (a.endDate && b.endDate) {
          const dateA = new Date(a.endDate);
          const dateB = new Date(b.endDate);
          return dateB - dateA;
        } else {
          return a.status - b.status;
        }
      });
      setOrders(response.data.data); // Update the orders state with the fetched data
      setCounter(response.data.status_counter);
      setWorkers(response.data.workers);
      setFabrics(response.data.fabrics);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    console.log("Opening modal", isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    console.log("Closing modal", isModalOpen);
  };

  const updateOrders = (data) => {
    setOrders([data, ...orders]);
    setCounter(counter + 1);
  };

  const statusChange = async (id, status, dateTime) => {
    try {
      // Make a PUT request to update the status of the order
      await axios.put(
        `https://sunroll-server.dt.r.appspot.com/api/order/${id}`,
        {
          status: status,
          endDate: dateTime,
        }
      );

      // If the request is successful, update the status of the corresponding order in the state
      const updatedOrders = orders.map((order) => {
        if (order._id === id) {
          return { ...order, status: status };
        }
        return order;
      });
      setOrders(updatedOrders);

      if (status === 3) {
        setCounter(counter - 1);
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [backdrop, setBackdrop] = useState(false);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setBackdrop(true);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
    setBackdrop(false);
  };

  const handleAddWorker = async (name) => {
    try {
      const response = await axios.post(
        "https://sunroll-server.dt.r.appspot.com/api/worker",
        {
          name,
        }
      );
      const newWorker = response.data.worker;
      setWorkers((prevWorkers) => [...prevWorkers, newWorker]);
    } catch (error) {
      console.error("Error adding worker:", error);
    }
  };

  const handleDeleteWorker = async (workerId) => {
    try {
      await axios.delete(
        `https://sunroll-server.dt.r.appspot.com/api/workers/${workerId}`
      );
      setWorkers((workers) =>
        workers.filter((worker) => worker._id !== workerId)
      );
    } catch (error) {
      console.error("Error deleting worker:", error);
    }
  };
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Nav counter={counter} button={openModal} />
              <Table
                orders={orders}
                onStatusChange={statusChange}
                onOrderClick={handleOrderClick}
              />
              {selectedOrder && (
                <>
                  <OrderDetails
                    order={selectedOrder}
                    onClose={handleCloseModal}
                  />
                  <Backdrop display={backdrop} />
                </>
              )}
              <OrderFormModal
                isOpen={isModalOpen}
                onClose={closeModal}
                updateOrders={updateOrders}
                workers={workers}
              />
              <Toaster />
            </>
          }
        />
        <Route
          path="/admin/*"
          element={
            <AdminPage
              workers={workers}
              onAddWorker={handleAddWorker}
              onDeleteWorker={handleDeleteWorker}
              fabrics={fabrics}
              orders={orders}
            />
          }
        />
        <Route path="/depo" element={<DepoPage fabrics={fabrics} />} />
      </Routes>
    </div>
  );
}

export default App;
