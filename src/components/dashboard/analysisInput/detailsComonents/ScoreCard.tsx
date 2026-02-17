const getColor = (rating: string) => {
  if (!rating) return "bg-gray-500";

  const r = rating.toLowerCase();

  if (r.includes("excellent") || r.includes("very good")) return "bg-green-500";

  if (r.includes("good") || r.includes("fair")) return "bg-yellow-500";

  if (r.includes("poor") || r.includes("critical")) return "bg-red-500";

  return "bg-gray-500";
};

const ScoreCard = ({
  title,
  score,
  maxScore,
  rating,
  percentage,
  danger,
}: any) => {
  const percent = maxScore ? (score / maxScore) * 100 : score;

  return (
    <div className="bg-white border rounded-xl shadow-sm p-6 space-y-4">
      <h3 className="font-semibold text-lg">{title}</h3>

      {/* Score */}
      <div className="text-3xl font-bold">
        {percentage ? `${score}%` : `${score}/${maxScore}`}
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className={`h-3 ${getColor(rating)}`}
          style={{ width: `${percent}%` }}
        />
      </div>

      {/* Rating */}
      <div
        className={`inline-block px-3 py-1 text-xs font-semibold rounded-full text-white ${getColor(
          rating,
        )}`}
      >
        {rating}
      </div>
    </div>
  );
};

export default ScoreCard;
