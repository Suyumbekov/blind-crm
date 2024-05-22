import React from "react";

const Order = ({ orders }) => {
  return (
    <table
      className="table table-sm table-bordered border-primary w-75 ms-4"
      style={{
        boxShadow:
          "0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)",
      }}
    >
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Имя замерщика</th>
          <th scope="col">Срок</th>
          <th scope="col">Сумма</th>
          <th scope="col">Статус</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order, index) => (
          <tr key={index} className={order.status === 3 ? "finished" : ""}>
            <td>{index + 1}</td>
            <td>{order.name}</td>
            <td>{order.date}</td>
            <td>{order.sum}</td>
            <td>
              {order.status === 1 ? (
                <img className="pending" src="/img/pending.svg" alt="pending" />
              ) : order.status === 2 ? (
                <img
                  className="in-progress"
                  src="/img/in-progress.svg"
                  alt="in-progress"
                />
              ) : (
                <img className="done" src="/img/complete.svg" alt="done" />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Order;
