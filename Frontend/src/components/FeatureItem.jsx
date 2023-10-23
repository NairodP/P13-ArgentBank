export default function featureItem({ imagePath, imageAlt, title, description }) {
  return (
    <div className="feature-item">
      <img src={imagePath} alt={imageAlt} className="feature-icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{description}</p>
    </div>
  );
}