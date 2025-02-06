import React from "react";

const Table = ({ orders, workers, onStatusChange, onOrderClick }) => {
  const handleStatusChange = (orderId, newStatus, event, dateTime = "") => {
    // Call the onStatusChange function passed from the parent component
    event.stopPropagation();
    onStatusChange(orderId, newStatus, dateTime);
  };

  // Helper function to get the worker name from the worker ID
  const getWorkerName = (workerId) => {
    const worker = workers.find((worker) => worker.id === workerId);
    return worker ? worker.name : "Unknown";
  };

  const handleOrderClick = (order) => {
    onOrderClick(order);
  };
  return (
    <table
      className="table table-sm table-bordered border-dark"
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
            <td>{getWorkerName(order.worker_id)}</td>
            <td>
              {order.type}, {order.type2}, {order.mechanism}
            </td>
            <td>{order.date}</td>
            <td>
              {order.status === 1 ? (
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={(event) => handleStatusChange(order.id, 2, event)}
                >
                  Принять
                </button>
              ) : order.status === 2 ? (
                <button
                  className="btn btn-warning"
                  type="button"
                  onClick={(event) =>
                    handleStatusChange(
                      order.id,
                      3,
                      event,
                      new Date().toISOString()
                    )
                  }
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
