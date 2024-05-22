const Workers = ({ workers }) => {
  return (
    <>
      <h2>Замерщики</h2>

      <table className="table table-bordered w-50 border-primary">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {workers.map((worker, index) => (
            <tr key={index}>
              <td>{worker.name}</td>
              <td>
                <button type="button" className="btn btn-danger">
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
