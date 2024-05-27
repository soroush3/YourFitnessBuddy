import "./DateInput.css";

type DateInputProps = {
  readonly date: string;
  readonly handleDateChange: (newDate: string) => void;
};

export default function DateInput({date, handleDateChange}: DateInputProps) {
  const handleIncrementalChange = (change: number) => {
    const dateObj = new Date(date);
    dateObj.setDate(dateObj.getUTCDate() + change);
    handleDateChange(dateObj.toLocaleDateString("en-CA"));
  };

  return (
    <div className="date-input">
      <button
        onClick={() => handleIncrementalChange(-1)}
        className="date-button"
      >
        -
      </button>
      <input
        required
        style={{cursor: "pointer"}}
        type="date"
        value={date}
        onChange={(e) => {
          const newDate = e.target.value;
          if (newDate.length === 0) return;
          handleDateChange(newDate);
        }}
      />
      <button
        onClick={() => handleIncrementalChange(1)}
        className="date-button"
      >
        +
      </button>
    </div>
  );
}
