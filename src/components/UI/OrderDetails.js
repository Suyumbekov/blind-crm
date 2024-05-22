import React from "react";

const OrderDetails = ({ order, onClose }) => {
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
                  <p id="orderName">{order.name}</p>
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
                    <strong>Размер(Ш х В):</strong>
                  </p>
                  {order.dimensions.map((order, index) => {
                    return (
                      <p key={index} id="blindSize">
                        {order[0]}м x {order[1]}м
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="modal-footer">
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
