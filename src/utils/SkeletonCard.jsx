import Skeleton from "react-loading-skeleton";

function SkeletonCard({ height, size, gridLg }) {
  return (
    <div className={`grid lg:grid-cols-${gridLg} gap-6`}>
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
