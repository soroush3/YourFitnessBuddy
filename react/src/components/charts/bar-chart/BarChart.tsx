import "./BarChart.css";

type BarChartProps = {
  readonly data: Array<{color: string; value: number}>;
};

export default function BarChart({data}: BarChartProps) {
  const total = data.reduce((acc, {value}) => acc + value, 0);

  return (
    <div className="bar-chart-container purp-border">
      {total !== 0 ? (
        <div style={{display: "flex", height: "100%"}}>
          {data.map(({color, value}, idx) => {
            const width = (value / total) * 100;
            return width !== 0 ? (
              <div
                key={idx}
                style={{
                  width: `${width}%`,
                  border: "1px solid",
                  color: color,
                  backgroundColor: color,
                }}
              >
                {value}
              </div>
            ) : null;
          })}
        </div>
      ) : null}
    </div>
  );
}
