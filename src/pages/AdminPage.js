import Nav from "../components/UI/Nav";
const AdminPage = ({ counter }) => {
  return (
    <>
      <Nav counter={counter} />
      <p>Hello, world</p>;
    </>
  );
};

export default AdminPage;
