import styled from "styled-components";

const BannerWrapper = styled.div`
  height: calc(55vh - 80px);
`;

const BannerImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const HeroBanner = ({ image, description }) => {
  if (!image) return null;

  return (
    <>
      {
        <BannerWrapper data-testid="hero-banner">
          <BannerImage src={image} alt={description} />
        </BannerWrapper>
      }
    </>
  );
};

export default HeroBanner;
