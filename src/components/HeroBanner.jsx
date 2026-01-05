const HeroBanner = ({ image, description }) => {
  if (!image) return null;
  return (
    <>
      <div className="hero-banner-container" data-testid="hero-banner">
        <img src={image} alt={description} />
      </div>
    </>
  );
};

export default HeroBanner;
