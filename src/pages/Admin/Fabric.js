const Fabric = ({ fabrics }) => {
  return (
    <>
      <h2>Ткани</h2>

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
    </>
  );
};

export default Fabric;
