import React, { useState } from "react";

const Workers = ({ workers, onAddWorker, onDeleteWorker }) => {
  const [newWorkerName, setNewWorkerName] = useState("");

  const handleAddWorker = async () => {
    if (newWorkerName.trim() !== "") {
      const addedWorker = await onAddWorker(newWorkerName);
      if (addedWorker) {
        setNewWorkerName(""); // Clear input only if the worker was successfully added
      }
    }
  };

  return (
    <>
      <h2>Замерщики</h2>
      <table className="table table-bordered w-50 border-primary">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">
              <input
                type="text"
                value={newWorkerName}
                onChange={(e) => setNewWorkerName(e.target.value)}
                placeholder="Введите имя замерщика"
                className="form-control"
              />
              <button className="btn btn-primary" onClick={handleAddWorker}>
                Добавить
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {workers.map((worker, index) => (
            <tr key={index}>
              <td>{worker.name}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => onDeleteWorker(worker._id)}
                >
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Workers;
