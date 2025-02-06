import { useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

const Fabric = ({ fabrics }) => {
  const [barcode, setBarcode] = useState("");

  return (
    <>
      <div className="d-flex justify-content-between w-50">
        <h2>Ткани</h2>
        <button className="fabric-btn btn btn-sm" type="button">
          <img src="/img/add-circle.svg" alt="add-circle" />
        </button>
      </div>

      <table className="table table-bordered w-50 border-primary">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Количество</th>
          </tr>
        </thead>
        <tbody>
          {fabrics.map((fabric, index) => (
            <tr key={index}>
              <td>{fabric.name}</td>
              <td>{fabric.amount === 0 ? "Нет в наличии" : fabric.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <BarcodeScannerComponent
        width={500}
        height={500}
        onUpdate={(err, result) => {
          if (result) setBarcode(result.text);
          else setBarcode("Not Found");
        }}
      />
      <p>{barcode}</p>
    </>
  );
};

export default Fabric;
