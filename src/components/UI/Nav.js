import { Routes, Route, Link } from "react-router-dom";

const Nav = ({ counter, button }) => {
  return (
    <nav
      className="navbar navbar-expand navbar-dark mb-4"
      style={{ backgroundColor: "#2f3c7e" }}
    >
      <div className="container-fluid">
        <a className="navbar-brand text-white" href="#">
          <img src="/img/logo.png" alt="" width="120" height="70" />
        </a>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link text-white fs-5" to="/admin">
                Admin
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link text-white fs-5" to="/depo">
                Склад
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link text-white fs-5" to="/">
                Заказы <span className="counter">{counter}</span>
              </Link>
            </li>
            <li className="nav-item">
              <button
                className="nav-link text-white fs-5"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={button}
              >
                Создать заказы
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
