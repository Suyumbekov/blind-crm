import React from "react";

const Table = ({ orders, onStatusChange, onOrderClick }) => {
  const handleStatusChange = (orderId, newStatus) => {
    // Call the onStatusChange function passed from the parent component
    onStatusChange(orderId, newStatus);
  };

  const handleOrderClick = (order) => {
    onOrderClick(order);
  };
  return (
    <table
      className="table table-sm"
      style={{
        boxShadow:
          "0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)",
      }}
    >
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Имя замерщика</th>
          <th scope="col">Вид жалюзи</th>
          <th scope="col">Срок</th>
          <th scope="col">Комментарий</th>
          <th scope="col">Статус</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order, index) => (
          <tr
            key={index}
            className={order.status === 3 ? "finished" : ""}
            onClick={() => handleOrderClick(order)}
          >
            <td>{index + 1}</td>
            <td>{order.name}</td>
            <td>
              {order.type}, {order.type2}, {order.mechanism}
            </td>
            <td>{order.date}</td>
            <td>{order.comment}</td>
            <td>
              {order.status === 1 ? (
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => handleStatusChange(order._id, 2)}
                >
                  Принять
                </button>
              ) : order.status === 2 ? (
                <button
                  className="btn btn-warning"
                  type="button"
                  onClick={() => handleStatusChange(order._id, 3)}
                >
                  Готово
                </button>
              ) : (
                <img className="done" src="./img/complete.svg" alt="done" />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
