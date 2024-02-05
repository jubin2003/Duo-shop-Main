import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import {mobile} from "../Responsive";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
  ${mobile({display:"none"})}

`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${props => (props.direction === 'left' ? '10px' : 'unset')};
  right: ${props => (props.direction === 'right' ? '10px' : 'unset')};
  margin: auto;
  cursor: pointer;
  z-index: 2; 
  opacity: 0.5;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: transform 0.5s ease;
`;

const Slide = styled.div`
  min-width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
`;

const ImgContainer = styled.div`
  height: 100%;
  flex: 1;
`;

const Image = styled.img`
  height: 80%;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`;

const Title = styled.h1`
  font-size: 70px;
`;

const Description = styled.p`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 2px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
`;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const totalSlides = 3; // Total number of slides

  const handleArrowClick = direction => {
    if (direction === 'left') {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : totalSlides - 1);
    } else {
      setSlideIndex(slideIndex < totalSlides - 1 ? slideIndex + 1 : 0);
    }
  };

  // Auto-transition slides
  const autoPlayRef = useRef();

  useEffect(() => {
    autoPlayRef.current = nextSlide;
  });

  useEffect(() => {
    const play = () => {
      autoPlayRef.current();
    };

    const interval = setInterval(play, 5000); // Auto transition interval: 5000ms (5 seconds)

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setSlideIndex(current => (current === totalSlides - 1 ? 0 : current + 1));
  };

  return (
    <div>
      <Container>
        <Arrow direction="left" onClick={() => handleArrowClick('left')}>
          <ArrowLeftOutlinedIcon />
        </Arrow>
        <Wrapper style={{ transform: `translateX(-${slideIndex * 100}vw)` }}>
          <Slide>
            <ImgContainer>
              <Image src="../../images/slide1.png" width={550} height={450} />
            </ImgContainer>
            <InfoContainer>
              <Title>WINTER SALE</Title>
              <Description>DON'T COMPROMISE ON STYLE! GET UPTO 30% OFF FOR NEW ARRIVALS</Description>
              <Button>SHOW NOW</Button>
            </InfoContainer>
          </Slide>
          <Slide>
            <ImgContainer>
              <Image src="../../images/slides2.png" width={650} height={550} />
            </ImgContainer>
            <InfoContainer>
              <Title>SUMMER SALE</Title>
              <Description>DON'T COMPROMISE ON STYLE! GET UPTO 20% OFF FOR NEW ARRIVALS</Description>
              <Button>SHOW NOW</Button>
            </InfoContainer>
          </Slide>
          {/* Duplicate the first slide */}
          <Slide>
            <ImgContainer>
              <Image src="../../images/slide3.png" width={650} height={550} />
            </ImgContainer>
            <InfoContainer>
              <Title>MOONSOON SALE</Title>
              <Description>DON'T COMPROMISE ON STYLE! GET UPTO 30% OFF FOR NEW ARRIVALS</Description>
              <Button>SHOW NOW</Button>
            </InfoContainer>
          </Slide>
        </Wrapper>
        <Arrow direction="right" onClick={() => handleArrowClick('right')}>
          <ArrowRightOutlinedIcon />
        </Arrow>
      </Container>
    </div>
  );
};

export default Slider;
