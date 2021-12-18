import "./ImageCard.scss";

export default function ImageCard({ images, showLightbox }) {
  return images.length > 0 ? (
    images.map((image) => (
      <li
        className="image-card"
        key={image.id}
        onClick={() => showLightbox(image.id)}
      >
        <img src={image.urls.thumb} alt={image.alt_description} />
      </li>
    ))
  ) : (
    <p>No Images Found</p>
  );
}
