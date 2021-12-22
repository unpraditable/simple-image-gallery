import "./Lightbox.scss";

export default function Lightbox({ isLightBoxShown, image, hideLightbox }) {
  return (
    isLightBoxShown && (
      <div className="lightbox" onClick={hideLightbox}>
        <div className="lightbox__container">
          <header className="lightbox__header">
            <p>{image.user.name}</p>
          </header>
          <div className="lightbox__image">
            <img src={image.urls.regular} alt={image.alt_description} />
          </div>
          <div className="lightbox__description">
            <p>{image.description}</p>
          </div>
        </div>
      </div>
    )
  );
}
