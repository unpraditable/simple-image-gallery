import React from "react";
import "./ImageCard.scss";

function ImageCard({ images, showLightbox, isReady }) {
  return images.length > 0
    ? images.map((image, i) => (
        <li className="image-card" key={i} onClick={() => showLightbox(image)}>
          <img src={image.urls.thumb} alt={image.alt_description} />
        </li>
      ))
    : isReady && <p>No Images Found</p>;
}

export default React.memo(ImageCard);
