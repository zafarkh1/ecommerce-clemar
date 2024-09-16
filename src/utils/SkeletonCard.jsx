import Skeleton from "react-loading-skeleton";

function SkeletonCard({ height, size, gridLg }) {
  const skeletonBaseColor = "#e0e0e0"; // Custom base color
  const skeletonHighlightColor = "#f5f5f5"; // Custom highlight color
  return (
    <div className={`grid lg:grid-cols-${gridLg} grid-cols-2 lg:gap-6 gap-2`}>
      {Array(size)
        .fill()
        .map((_, index) => (
          <div key={index}>
            <Skeleton
              height={height}
              style={{ borderRadius: "0.5rem" }}
              baseColor={skeletonBaseColor} // Set base color
              highlightColor={skeletonHighlightColor} // Set highlight color
            />
          </div>
        ))}
    </div>
  );
}

export default SkeletonCard;
