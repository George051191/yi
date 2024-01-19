/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from '../../store/store.types';
import { openBigPopup } from '../../store/allSlice';
import { ArrowIcon, BlackDelIcon } from '../icons';

const DocumentImage = styled.img<{ forAchieve: boolean }>`
  height: 100%;
  object-fit: contain;
`;

const DocumentImageFull = styled(DocumentImage)`
  width: 100%;
`;

const Bullet = styled.span<{ isCurrent: boolean }>`
    width: 15px;
    height: 15px;
    border-radius: 50px;
    background-color: ${({ isCurrent, theme: { mainButtonColor, mainTextColor } }) => (isCurrent ? mainTextColor : mainButtonColor)};
`;

const Slider = styled.div`
    max-width: 1083px;
    width: 100%;
    max-height: 800px;
  list-style: none;
  padding: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  z-index: 99999999999999999;
`;

const LeftWrapper = styled.div`
  position: absolute;
  top: 41%;
  left: 100%;
`;

const RightWrapper = styled.div`
  position: absolute;
  top: 42%;
  left: -3%;
  transform: rotate(180deg);
`;

const BulletContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 36px;
  align-self: center;
`;

const BigImageSlider: FC = () => {
  const [currentSlide, setSlide] = useState<string>('');
  const [currentIndex, setIndex] = useState(0);
  const { currentImages } = useSelector((state) => state.all);
  const dispatch = useDispatch();
  const increaseSlide = () => {
    const newIndex = currentIndex + 1;
    const newSlide = currentImages[newIndex];
    if (newSlide) {
      setIndex(newIndex);
      setSlide(newSlide);

      return;
    }
    return;
  };

  const decreaseSlide = () => {
    const newIndex = currentIndex - 1;
    const newSlide = currentImages[newIndex];
    if (newSlide) {
      setIndex(newIndex);

      setSlide(newSlide);
      return;
    }
    return;
  };

  useEffect(() => {
    setSlide(currentImages[0]);
  }, [currentImages[0]]);

  const calculateSlide = (index: number) => {
    setIndex(index);
    setSlide(currentImages[index]);
  };

  return (
    <Slider>
      <BlackDelIcon onClick={() => dispatch(openBigPopup(false))} />
      <LeftWrapper><ArrowIcon style={{ width: '32px', height: '14px' }} onClick={() => increaseSlide()} isOpen={false} /></LeftWrapper>
      <RightWrapper><ArrowIcon style={{ width: '32px', height: '14px' }} onClick={() => decreaseSlide()} isOpen={false} /></RightWrapper>
      <DocumentImageFull forAchieve={false} src={currentSlide} />
      <BulletContainer>
        {currentImages.map((el, index) => (
          <Bullet key={index} onClick={() => calculateSlide(index)} isCurrent={index === currentIndex} />
        ))}
      </BulletContainer>
    </Slider>
  );
};

export default BigImageSlider;
