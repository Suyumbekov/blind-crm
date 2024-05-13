const Backdrop = ({ display }) => {
  return <div className={`backdrop ${!display ? "hide" : ""}`}></div>;
};

export default Backdrop;
