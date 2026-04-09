export const CountdownCard = ({ value, label }) => {
  return (
    <div className="flex flex-col">
      <h4 className="text-4xl sm:text-5xl font-bold font-mono">
        {String(value).padStart(2, "0")}
      </h4>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  );
};
