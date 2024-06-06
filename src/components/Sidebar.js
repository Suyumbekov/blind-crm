import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <div className="admin d-flex flex-column p-3 text-bg-dark">
        <p className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
          <svg className="bi pe-none me-2" width="40" height="32">
            <use xlinkHref="#bootstrap"></use>
          </svg>
          <span className="fs-4">Админка</span>
        </p>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <NavLink to="/" className="nav-link text-white" aria-current="page">
              Главная страница
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/workers" className="nav-link text-white">
              Замерщики
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/fabrics" className="nav-link text-white">
              Ткани
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/orders" className="nav-link text-white">
              Заказы
            </NavLink>
          </li>
        </ul>
        <hr />
      </div>
    </>
  );
};

export default Sidebar;
