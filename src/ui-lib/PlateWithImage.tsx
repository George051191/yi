/* eslint-disable no-nested-ternary */
/* eslint-disable ternary/nesting */
/* eslint-disable ternary/no-dupe */
/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { FC, ReactElement, ReactNode } from 'react';
import styled from 'styled-components';
import { TPlateWithImage } from '../types/componentsTypes';

const Div = styled.div<{ isReversed: boolean, height: number, gap: number, padding: number, withback: boolean }>`
    display: inline-flex;
    flex-direction: ${({ isReversed }) => (isReversed ? 'row-reverse' : 'row')};
    height:${({ height }) => height}px;
    align-items: center;
    width: 100%;
    gap:${({ gap }) => gap}px;
    padding-top: ${({ padding }) => padding}px;
    @media screen and (max-width: 1290px) {
      // eslint-disable-next-line ternary/nesting, ternary/nesting, ternary/nesting
      flex-direction: ${({ withback, isReversed }) => (!withback ? 'column-reverse' : isReversed ? 'row-reverse' : 'row')};
      height: ${({ withback, height }) => (!withback ? 'auto' : `${height}`)};
      &:last-of-type {
        padding-top: 0;
        margin-top: ${({ withback }) => (!withback ? '400px' : '0')} ;
      }
    }
    @media screen and (max-width: 760px) {
      height: auto;
    }
`;

const Image = styled.img<{ imageHeight: number, align: string, width: number, inView: boolean, withBack: boolean }>`
    width:  ${({ width }) => width}%;
    height: ${({ imageHeight }) => imageHeight}%;
    object-fit: contain;
    flex: auto;
    
    align-self: ${({ align }) => align};
    opacity: ${({ inView }) => (inView ? '1' : '0')};
    transform: ${({ inView }) => (inView ? 'translate(0px)' : 'translate(200px)')};
    transition: all ease 1s;
    @media screen and (max-width: 1560px) {
      width: 44vw;
    }
    @media screen and (max-width: 1405px) {
      align-self: center;
    }
    @media screen and (max-width:1290px) {
      width: ${({ withBack }) => (!withBack ? '70%' : '44vw')}
    }
    @media screen and (max-width: 760px) {
      display: ${({ withBack }) => (withBack ? 'none' : 'block')};
    }
    @media screen and (max-width:470px) {
      width: ${({ withBack }) => (!withBack ? '320px' : '44vw')}
    }
`;
const RightImage = styled.img<{ imageHeight: number, align: string, width: number, inView: boolean, withBack: boolean }>`
    width:  ${({ width }) => width}%;
    height: ${({ imageHeight }) => imageHeight}%;
    object-fit: contain;
    flex: auto;
    z-index: 5000;
    align-self: ${({ align }) => align};
    opacity: ${({ inView }) => (inView ? '1' : '0')};
    transform: ${({ inView }) => (inView ? 'translate(0px)' : 'translate(-200px)')};
    transition: all ease 1s;
    @media screen and (max-width: 1560px) {
      width: 44vw;
    }
    @media screen and (max-width:1290px) {
      width: ${({ withBack }) => (!withBack ? '70%' : '44vw')}
    }
    @media screen and (max-width: 760px) {
      display: ${({ withBack }) => (withBack ? 'none' : 'block')};
    }
    @media screen and (max-width:470px) {
      width: ${({ withBack }) => (!withBack ? '320px' : '44vw')}
    }
`;
const PlateWithImage: FC<TPlateWithImage> = ({
  isReversed, height, image, children, gap = 8, padding = 0, align = 'inherit', imageHeight, width, isInView = false, isRight = false, withBackImage = false,
}) => (
  <Div withback={withBackImage} padding={padding} gap={gap} isReversed={isReversed} height={height}>
    {children}
    {isRight ? <RightImage withBack={withBackImage} inView={isInView} width={width} align={align} imageHeight={imageHeight} src={image} />
      : <Image withBack={withBackImage} inView={isInView} width={width} align={align} imageHeight={imageHeight} src={image} />}

  </Div>
);

export default PlateWithImage;
