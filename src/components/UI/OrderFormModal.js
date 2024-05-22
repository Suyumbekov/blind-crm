import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const OrderFormModal = ({ isOpen, onClose, updateOrders, workers }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    type: "Зебра", // Default value
    type2: "Мех", // Default value
    mechanism: "32", // Default value
    sum: "",
    date: "",
    comment: "",
    dimensions: [[]], // Array to store additional dimensions
  });

  const closeBtnRef = useRef(null); // Create a ref for the close button

  useEffect(() => {
    if (workers.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        name: workers[0].name,
      }));
    }
  }, [workers]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDimensionChange = (index, e) => {
    const { name, value } = e.target;
    const newDimensions = [...formData.dimensions];
    newDimensions[index] = [...newDimensions[index]]; // Make a copy of the inner array
    if (name === "width") {
      newDimensions[index][0] = value;
    } else if (name === "height") {
      newDimensions[index][1] = value;
    }
    setFormData((prevData) => ({
      ...prevData,
      dimensions: newDimensions,
    }));
  };

  const handleAddDimension = () => {
    setFormData((prevData) => ({
      ...prevData,
      dimensions: [...prevData.dimensions, []],
    }));
  };

  const notify = () => toast.success("Order created successfully.");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post("https://blind-crm.onrender.com/api/order", formData)
        .then((res) => {
          updateOrders(res.data.order);
          notify();
        });
      closeBtnRef.current.click();
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <div
      className={`modal ${isOpen ? "show" : ""}`}
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden={!isOpen}
      style={{ display: isOpen ? "block" : "none" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Создать заказ
            </h5>
            <button
              ref={closeBtnRef}
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit} id="myForm">
              <div className="mb-2">
                <label htmlFor="inputText">Имя замерщика</label>
                <select
                  className="form-select"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                >
                  {workers.map((worker, index) => (
                    <option value={worker.name} key={index}>
                      {worker.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-2">
                <label htmlFor="inputAddress">Адрес</label>
                <input
                  type="text"
                  id="inputAddress"
                  name="address"
                  className="form-control"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-2">
                <label htmlFor="inputNumber">Телефон номер</label>
                <input
                  type="tel"
                  id="inputNumber"
                  name="phone"
                  className="form-control"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label>Вид жалюзи</label>
                <select
                  className="form-select"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                >
                  <option value="Зебра">Зебра</option>
                  <option value="Вертикал">Вертикал</option>
                  <option value="Ролл">Ролл</option>
                  <option value="Плиссе">Плиссе</option>
                  <option value="Дерево">Дерево</option>
                  <option value="Москитная сетка">Москитная сетка</option>
                </select>
              </div>
              {formData.dimensions.map((dimension, index) => (
                <div className="input-group mb-3" key={index}>
                  <span className="input-group-text">Ширина и высота</span>
                  <input
                    type="number"
                    className="form-control"
                    aria-label="Ширина"
                    name="width"
                    value={dimension[0]}
                    onChange={(e) => handleDimensionChange(index, e)}
                    required
                  />
                  <input
                    type="number"
                    className="form-control"
                    aria-label="Высота"
                    name="height"
                    value={dimension[1]}
                    onChange={(e) => handleDimensionChange(index, e)}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleAddDimension}
                  >
                    +
                  </button>
                </div>
              ))}

              <div className="mb-2 row">
                <div className="col-sm-6">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="type2"
                      value="Ткань"
                      id="flexRadioDefault1"
                      checked={formData.type2 === "Ткань"}
                      onChange={handleChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault1"
                    >
                      Ткань
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="flexRadioDefault2"
                      name="type2"
                      value="Мех"
                      checked={formData.type2 === "Мех"}
                      onChange={handleChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault2"
                    >
                      Мех
                    </label>
                  </div>
                </div>
                <label className="col-sm-2 col-form-label">Механизм</label>
                <div className="col-sm-2">
                  <select
                    className="mechanism form-select "
                    name="mechanism"
                    value={formData.mechanism}
                    onChange={handleChange}
                    required
                  >
                    <option value="32">32</option>
                    <option value="25">25</option>
                    <option value="17">17</option>
                  </select>
                </div>
              </div>
              <div className="mb-2">
                <label htmlFor="inputSum">Сумма</label>
                <input
                  type="number"
                  id="inputSum"
                  name="sum"
                  className="form-control"
                  value={formData.sum}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="inputDate">Срок</label>
                <input
                  type="date"
                  id="inputDate"
                  name="date"
                  className="form-control"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-floating mb-2">
                <textarea
                  className="form-control"
                  placeholder="Leave a comment here"
                  name="comment"
                  id="floatingTextarea"
                  value={formData.comment}
                  onChange={handleChange}
                ></textarea>
                <label htmlFor="floatingTextarea">Комментарий</label>
              </div>
              <button type="submit" className="btn btn-primary">
                Создать
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderFormModal;
