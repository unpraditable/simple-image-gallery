export default function Lightbox({ isLightBoxShown, image }) {
  return (
    isLightBoxShown && (
      <div className={`lightbox`}>
        <div className="lightbox__container"></div>
        <header>
          <p>{image.user.name}</p>
        </header>
        <div className="lightbox__image-container">
          <img src={image.urls.regular} alt={image.alt_description} />
        </div>
        <div className="lightbox__image-description">
          <p>{image.description}</p>
        </div>
      </div>
    )
  );
}
