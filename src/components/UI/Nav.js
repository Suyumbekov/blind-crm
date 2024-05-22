import { Link } from "react-router-dom";

const Nav = ({ counter, button }) => {
  return (
    <nav
      className="navbar navbar-expand navbar-dark mb-4"
      style={{ backgroundColor: "#2f3c7e" }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand text-white" to="/">
          <img src="/img/logo.png" alt="" />
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/admin">
                Admin
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link text-white" to="/depo">
                Склад
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link text-white" to="/">
                Заказы <span className="counter">{counter}</span>
              </Link>
            </li>
            <li className="nav-item">
              <button
                className="nav-link text-white"
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
