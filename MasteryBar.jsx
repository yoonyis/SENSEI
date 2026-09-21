function MasteryBar({ value }) {
  return (
    <div className="mastery-container">
      <div className="mastery-background">
        <div
          className="mastery-fill"
          style={{ width: `${value}%` }}
        />
      </div>

      <span className="mastery-value">
        {value}%
      </span>
    </div>
  );
}

export default MasteryBar;