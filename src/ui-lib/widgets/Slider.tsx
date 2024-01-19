/* eslint-disable react/require-default-props */
/* eslint-disable react/no-array-index-key */
import React, {
  memo, FC, useState, useEffect,
} from 'react';
import styled from 'styled-components';
import { ArrowIcon } from '../icons';
import def from '../../assets/starOnly.png';
import folderImg from '../../assets/folderImg.png';
import { useDispatch } from '../../store/store.types';
import {
  openBigPopup,
  setImgesToSlider,
} from '../../store/allSlice';

const SliderItem = styled.div<{ isBig?: boolean }>`
    border-radius: 50%;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border:${({ theme: { mainTextColor } }) => `${mainTextColor} 1px solid`};
`;

const DocumentImage = styled.img<{ forAchieve: boolean }>`
  width: ${({ forAchieve }) => (forAchieve ? '51%' : '67%')};
  height: 100%;
  object-fit: cover;
`;

const DocumentImageFull = styled(DocumentImage)`
  width: 100%;
`;

const Bullet = styled.span<{ isCurrent: boolean }>`
    width: 15px;
    height: 15px;
    border-radius: 50px;
    background-color: ${({ isCurrent, theme: { sliderColor, mainButtonColor } }) => (isCurrent ? sliderColor : mainButtonColor)};
`;

const Slider = styled.div<{ width: number, height: number }>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  list-style: none;
  padding: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
`;

const LeftWrapper = styled.div`
  position: absolute;
  top: 41%;
  left: 110%;
`;

const RightWrapper = styled.div`
  position: absolute;
  top: 42%;
  left: -13%;
  transform: rotate(180deg);
`;

const BulletContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 36px;
  align-self: center;
`;

const SliderComponent: FC<{ forAchieve?: boolean, width: number, height: number, imagesArray: string[], setIndexToParent?: (inx: number) => void }> = ({
  forAchieve = false, width, height, imagesArray, setIndexToParent,
}) => {
  const [currentSlide, setSlide] = useState<string>('');
  const [currentIndex, setIndex] = useState(0);
  const dispatch = useDispatch();
  const increaseSlide = () => {
    const newIndex = currentIndex + 1;
    const newSlide = imagesArray[newIndex];
    if (newSlide) {
      setIndex(newIndex);
      setSlide(newSlide);
      setIndexToParent && setIndexToParent(newIndex);
      return;
    }
    return;
  };

  const decreaseSlide = () => {
    const newIndex = currentIndex - 1;
    const newSlide = imagesArray[newIndex];
    if (newSlide) {
      setIndex(newIndex);
      setIndexToParent && setIndexToParent(newIndex);
      setSlide(newSlide);
      return;
    }
    return;
  };
  /*   useEffect(() => {
    if (setIndexToParent && currentIndex !== 0 && imagesArray.length > 1) {
      setSlide(imagesArray[currentIndex - 1]);
    }
  }, [imagesArray]); */

  useEffect(() => {
    setSlide(imagesArray[0]);
  }, [imagesArray[0]]);

  const calculateSlide = (index: number) => {
    setIndex(index);
    setSlide(imagesArray[index]);
  };

  return (
    <Slider width={width} height={height}>

      <LeftWrapper><ArrowIcon onClick={() => increaseSlide()} isOpen={false} /></LeftWrapper>
      <RightWrapper><ArrowIcon onClick={() => decreaseSlide()} isOpen={false} /></RightWrapper>
      <SliderItem>
        {!currentSlide
          ? <DocumentImage forAchieve={forAchieve} style={{ objectFit: 'contain' }} src={forAchieve ? folderImg : def} />
          : <DocumentImageFull onClick={() => { dispatch(openBigPopup(true)); dispatch(setImgesToSlider(imagesArray)); }} forAchieve={false} src={currentSlide} />}

      </SliderItem>
      <BulletContainer>
        {imagesArray.map((el, index) => (
          <Bullet key={index} onClick={() => calculateSlide(index)} isCurrent={index === currentIndex} />
        ))}
      </BulletContainer>
    </Slider>
  );
};

export default SliderComponent;
