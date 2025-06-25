import '../styles/LoadingSkeleton.css';

const LoadingSkeleton = () => (
  <div className="skeleton-card">
    <div className="skeleton-thumbnail" />
    <div className="skeleton-line short" />
    <div className="skeleton-line long" />
  </div>
);

export default LoadingSkeleton;