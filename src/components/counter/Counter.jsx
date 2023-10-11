const Counter = ({ data, count }) => {
  return (
    <div
      style={{
        position: "fixed",
        right: "20px",
        color: "#fff",
        backgroundColor: "rgba(25, 118, 210, 0.7)",
        borderRadius: "10px",
        fontWeight: "bold",
      }}
    >
      &nbsp;{count}/{data.length}&nbsp;
    </div>
  );
};

export default Counter;
