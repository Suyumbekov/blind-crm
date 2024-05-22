import { Routes, Route, Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Workers from "./Workers";
import Fabric from "./Fabric";
import Order from "./Order";

const AdminLayout = () => (
  <div className="d-flex">
    <Sidebar />
    <div className="content p-3" style={{ flex: 1 }}>
      <Outlet />
    </div>
  </div>
);

const AdminPage = ({ workers, fabrics, orders }) => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route path="fabrics" element={<Fabric fabrics={fabrics} />} />
        <Route path="workers" element={<Workers workers={workers} />} />
        <Route path="orders" element={<Order orders={orders} />} />
      </Route>
    </Routes>
  );
};

export default AdminPage;
