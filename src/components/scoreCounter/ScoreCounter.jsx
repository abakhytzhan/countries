const ScoreCounter = ({ list, total, countRight, countWrong }) => {
  return (
    <div className="quiz-counter">
      <span
        style={{
          background: "DimGray",
        }}
      >
        {total} / {list.length}
      </span>
      <span
        style={{
          background: "green",
        }}
      >
        {countRight} correctly
      </span>
      <span
        style={{
          background: "red",
        }}
      >
        {countWrong} wrong
      </span>
    </div>
  );
};

export default ScoreCounter;
