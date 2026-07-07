import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Mousewheel } from "swiper/modules";
import { getImagesByApi } from "../../../api/images/images.js";
import { styled } from "styled-components";
import "swiper/css";
import "swiper/css/effect-coverflow";

const Container = styled.div`
  max-width: 1152px;
  width: 100%;
  padding: 40px 0;
  overflow: hidden;
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  user-select: none;
  box-sizing: border-box;
`;

const Title = styled.p`
  font-size: 20px;
`;

const ImageStyled = styled.img`
  width: 100%;
  height: 211px;
  object-fit: cover;
  display: block;
`;

export const Nature = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await getImagesByApi();
        if (res && res.hits) {
          setImages(res.hits);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  
  return (
    <Container>
      <Title>Beautiful nature</Title>
      <Swiper
        modules={[EffectCoverflow, Mousewheel]}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true} 
        slidesPerView={"auto"}
        mousewheel={true}
        loop={true}
        coverflowEffect={{
          rotate: 0,
          stretch: 80,
          depth: 200,
          modifier: 1,
          slideShadows: true,
        }}
        className="natureSwiper"
        style={{ width: "100%", padding: "50px 0" }}
      >
        {images.map(img => (
          <SwiperSlide key={img.id} style={{ width: "280px" }}>
            <ImageStyled src={img.largeImageURL} alt={"nature_image"} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};