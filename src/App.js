import "./App.css";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";

import Nav from "./components/UI/Nav";
import Table from "./components/UI/Table";
import OrderFormModal from "./components/UI/OrderFormModal";
import OrderDetails from "./components/UI/OrderDetails";
import Backdrop from "./components/UI/Backdrop";
import AdminPage from "./pages/Admin/AdminPage";
import DepoPage from "./pages/DepoPage";
// import { AuthProvider } from "./contexts/AuthContext";
import useFetchData from "./hooks/useFetchData";
import useHandleData from "./hooks/useHandleData";

function App() {
  const [orders, setOrders] = useState([]);
  const [counter, setCounter] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { workers, fabrics, loading, error } = useFetchData(
    setOrders,
    setCounter
  );
  const { updateOrders, statusChange, handleAddWorker, handleDeleteWorker } =
    useHandleData(orders, workers, setOrders, setCounter);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [backdrop, setBackdrop] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setBackdrop(true);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
    setBackdrop(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data: {error.message}</p>;

  return (
    // <AuthProvider>
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Nav counter={counter} button={openModal} />
              <Table
                orders={orders}
                workers={workers}
                onStatusChange={statusChange}
                onOrderClick={handleOrderClick}
              />
              {selectedOrder && (
                <>
                  <OrderDetails
                    order={selectedOrder}
                    worker={workers.find(
                      (worker) => worker.id === selectedOrder.worker_id
                    )}
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
    /* </AuthProvider> */
  );
}

export default App;
