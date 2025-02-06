import React from "react";

const OrderDetails = ({ order, worker, onClose }) => {
  const handlePrint = () => {
    // Open a new window for printing
    const printWindow = window.open("", "_blank");

    // Generate the HTML content to be printed
    const content = `
      <html>
        <head>
          <title>Order Details</title>
          <style>
            /* Define any custom styles for printing */
            /* For example, hide unnecessary elements */
            .modal-header, .modal-footer, .btn {
              display: none;
            }
          </style>
        </head>
        <body>
          <h2>Order Details</h2>
          <p><strong>Имя замерщика:</strong> ${worker.name}</p>
          <p><strong>Адрес:</strong> ${order.address}</p>
          <p><strong>Телефон номер:</strong> ${order.phone}</p>
          <p><strong>Срок:</strong> ${order.date}</p>
          <p><strong>Комментарий:</strong> ${order.comment}</p>
          <p><strong>Вид жалюзи:</strong> ${order.type}, ${order.type2}</p>
          <p><strong>Механизм:</strong> ${order.mechanism}</p>
          <p><strong>Размер(Код - Ш х В):</strong></p>
          ${order.dimensions
            .map(
              (dimension, index) => `
            <p key=${index}>${dimension[0]} - ${dimension[1]}м x ${dimension[2]}м</p>
          `
            )
            .join("")}
        </body>
      </html>
    `;

    // Write the content to the new window
    printWindow.document.write(content);

    // Close the print window after printing is complete
    printWindow.document.close();
    printWindow.print();
  };

  return (
    order && (
      <div
        className={`modal fade ${order ? "show" : ""}`}
        id="orderModal"
        tabIndex="-1"
        aria-labelledby="orderModalLabel"
        aria-hidden={!order}
        style={{ display: order ? "block" : "none" }}
      >
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="orderModalLabel">
                Детали заказа
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={onClose}
              ></button>
            </div>
            <div
              className="modal-body"
              style={{ backgroundColor: "#75c8d573" }}
            >
              <div className="row">
                <div className="col">
                  <p>
                    <strong>Имя замерщика:</strong>
                  </p>
                  <p id="orderName">{worker.name}</p>
                  <p>
                    <strong>Адрес:</strong>
                  </p>
                  <p id="orderAddress">{order.address}</p>
                  <p>
                    <strong>Телефон номер:</strong>
                  </p>
                  <p id="orderPhone">{order.phone}</p>
                  <p>
                    <strong>Срок:</strong>
                  </p>
                  <p id="orderDate">{order.date}</p>
                  <p>
                    <strong>Комментарий:</strong>
                  </p>
                  <p id="orderComment">{order.comment}</p>
                </div>
                <div className="col">
                  <p>
                    <strong>Вид жалюзи:</strong>
                  </p>
                  <p id="blindType">
                    {order.type}, {order.type2}
                  </p>
                  <p>
                    <strong>Механизм:</strong>
                  </p>
                  <p id="mechanism">{order.mechanism}</p>
                  <p>
                    <strong>Размер(Код - Ш х В):</strong>
                  </p>
                  {order.dimensions.map((order, index) => {
                    return (
                      <p key={index} id="blindSize">
                        {order[0]} - {order[1]}м x {order[2]}м
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handlePrint}
              >
                Принт
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={onClose}
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default OrderDetails;
