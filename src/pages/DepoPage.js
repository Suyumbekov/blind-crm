import { Link } from "react-router-dom";

const DepoPage = ({ fabrics }) => {
  return (
    <>
      <nav
        className="navbar navbar-expand navbar-dark mb-4"
        style={{ backgroundColor: "#007d83" }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand text-white" to="/">
            <img src="/img/logo2.png" alt="" />
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
                  Заказы
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="ps-4">
        <h2>Ткани</h2>

        <table className="table table-bordered w-50 border-primary">
          <thead>
            <tr>
              <th scope="col">Название</th>
              <th scope="col">Статус</th>
            </tr>
          </thead>
          <tbody>
            {fabrics.map((fabric, index) => (
              <tr key={index}>
                <td>{fabric.name}</td>
                <td>
                  {fabric.amount === 0 ? "Нет в наличии" : fabric.amount + "м"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DepoPage;
