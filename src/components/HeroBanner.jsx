import styled from "styled-components";

const BannerWrapper = styled.div`
  height: calc(40vh - 80px);
`;

const BannerPicture = styled.picture`
  height: inherit;
  width: 100%;
  display: block;
  overflow: hidden;
`;

const BannerSource = styled.source`
  height: inherit;
  width: inherit;
  object-fit: cover;
  object-position: bottom;
`;

const BannerImage = styled.img`
  height: inherit;
  width: inherit;
  object-fit: cover;
  object-position: bottom;
`;

const HeroBanner = ({ images }) => {
  if (!images) return null;

  return (
    <>
      {
        <BannerWrapper data-testid="hero-banner">
          <BannerPicture>
            <BannerSource media="(max-width: 600px)" srcSet={images.mobile} />
            <BannerImage src={images.desktop} alt="" />
          </BannerPicture>
        </BannerWrapper>
      }
    </>
  );
};

export default HeroBanner;
