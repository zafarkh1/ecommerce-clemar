import Skeleton from "react-loading-skeleton";

function SkeletonCard({ height, size, gridLg }) {
  return (
    <div className={`grid lg:grid-cols-${gridLg} grid-cols-2 lg:gap-6 gap-2`}>
      {Array(size)
        .fill()
        .map((_, index) => (
          <div key={index}>
            <Skeleton height={height} style={{ borderRadius: "0.5rem" }} />
          </div>
        ))}
    </div>
  );
}

export default SkeletonCard;
