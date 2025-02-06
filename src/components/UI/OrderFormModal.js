import React, { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";

const OrderFormModal = ({ isOpen, onClose, updateOrders, workers }) => {
  const [formData, setFormData] = useState({
    worker_id: "",
    address: "",
    phone: "996",
    type: "Зебра", // Default value
    type2: "Мех", // Default value
    mechanism: "32", // Default value
    sum: "",
    date: "",
    status: 1,
    comment: "",
    dimensions: [[]], // Array to store additional dimensions
  });

  const closeBtnRef = useRef(null); // Create a ref for the close button

  useEffect(() => {
    if (workers.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        worker_id: workers[0].id,
      }));
    }
  }, [workers]);

  const handleChange = (e) => {
    let { name, value } = e.target;

    // Limit the total length of the input
    if (name === "phone" && value.length > 11) {
      value = value.slice(0, 11);
    }

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
      newDimensions[index][1] = value;
    } else if (name === "height") {
      newDimensions[index][2] = value;
    } else if (name === "code") {
      newDimensions[index][0] = value;
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

  const notify = () => toast.success("Заказ успешно создан.");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      updateOrders(formData);
      notify();
      onClose();
      closeBtnRef.current.click();
    } catch (error) {
      toast.error("Ошибка при создании заказа.");
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
                    <option value={worker.id} key={index}>
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
                <div key={index}>
                  <div className="wrapper-width input-group mb-3">
                    <div className="code-width-height">
                      <label htmlFor="code">Код</label>
                      <input
                        id="code"
                        type="text"
                        className="form-control"
                        aria-label="Код"
                        name="code"
                        value={dimension[0]}
                        onChange={(e) => handleDimensionChange(index, e)}
                        required
                      />
                    </div>
                    <div className="code-width-height">
                      <label htmlFor="width">Ширина</label>
                      <input
                        id="width"
                        type="number"
                        className="form-control"
                        aria-label="Ширина"
                        name="width"
                        value={dimension[1]}
                        onChange={(e) => handleDimensionChange(index, e)}
                        required
                      />
                    </div>
                    <div className="code-width-height">
                      <label htmlFor="height">Высота</label>
                      <input
                        id="height"
                        type="number"
                        className="form-control"
                        aria-label="Высота"
                        name="height"
                        value={dimension[2]}
                        onChange={(e) => handleDimensionChange(index, e)}
                        required
                      />
                    </div>

                    <button
                      type="button"
                      className=" btn btn-primary add-btn"
                      onClick={handleAddDimension}
                    >
                      +
                    </button>
                  </div>
                  {dimension[1] && dimension[2] && (
                    <div className="calc">
                      {dimension[1] * dimension[2] < 1
                        ? 1
                        : dimension[1] * dimension[2]}{" "}
                      кв.м
                    </div>
                  )}
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
