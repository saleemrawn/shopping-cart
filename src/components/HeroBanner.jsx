import styled from "styled-components";
import Title from "./Title";

const BannerWrapper = styled.div`
  height: calc(40vh - 80px);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BannerTitle = styled(Title)`
  position: absolute;
  font-size: ${(props) => props.theme.headings.mobile.hero};
  text-align: center;
  color: ${(props) => props.theme.colours.white};

  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    font-size: ${(props) => props.theme.headings.desktop.hero};
  }
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

const HeroBanner = ({ images, title = null }) => {
  if (!images) return null;

  return (
    <>
      {
        <BannerWrapper data-testid="hero-banner">
          <BannerTitle level={1}>{title}</BannerTitle>
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
