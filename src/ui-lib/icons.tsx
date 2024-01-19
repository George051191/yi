import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Arrow } from '../assets/arrow.svg';
import { ReactComponent as Check } from '../assets/checkbox.svg';
import { ReactComponent as CheckDone } from '../assets/doneCheckbox.svg';
import { ReactComponent as AddPic } from '../assets/addSvg.svg';
import { ReactComponent as VkPic } from '../assets/vk.svg';
import { ReactComponent as TgPic } from '../assets/tg.svg';
import { ReactComponent as OkPic } from '../assets/ok.svg';
import { ReactComponent as StarPic } from '../assets/star.svg';
import { ReactComponent as RoundArrowPic } from '../assets/roundArrow.svg';
import { ReactComponent as CheckedRadioPic } from '../assets/checkedRadio.svg';
import { ReactComponent as AlgoPic } from '../assets/algo.svg';
import { ReactComponent as PeoplePic } from '../assets/people.svg';
import { ReactComponent as TopPic } from '../assets/toTop.svg';
import { ReactComponent as BagPic } from '../assets/bag.svg';
import { ReactComponent as TelegramPic } from '../assets/telegram.svg';
import { ReactComponent as ArrowToTopPic } from '../assets/arrowToTop.svg';
import { ReactComponent as DistPic } from '../assets/dist.svg';
import { ReactComponent as RublePic } from '../assets/rub.svg';
import { ReactComponent as QuestionPic } from '../assets/question.svg';
import { ReactComponent as CheckPic } from '../assets/checkInput.svg';
import { ReactComponent as BlueQuestionPic } from '../assets/blueQuestion.svg';
import { ReactComponent as OrangeQuestionPic } from '../assets/orangeQuestion.svg';
import { ReactComponent as CrossPic } from '../assets/cross.svg';
import { ReactComponent as SunPic } from '../assets/sun.svg';
import { ReactComponent as MoonPic } from '../assets/moon.svg';
import { ReactComponent as FilterPic } from '../assets/filter.svg';
import { ReactComponent as ShowPic } from '../assets/eyeShow.svg';
import { ReactComponent as HidePic } from '../assets/eyeHide.svg';
import { ReactComponent as PenPic } from '../assets/redactPen.svg';
import { ReactComponent as DeleteSmallPic } from '../assets/deleteSmallIcon.svg';
import { ReactComponent as OrangeDelPic } from '../assets/orangeDelIcon.svg';
import { ReactComponent as BlackDelPic } from '../assets/blackDeleteIcon.svg';
import { ReactComponent as BreadArrowPic } from '../assets/BreadArrow.svg';
import { ReactComponent as PushButtonPic } from '../assets/PushButtonIcon.svg';
import { ReactComponent as RequiredIcon } from '../assets/requiredIcon.svg';
import { ReactComponent as SearchIcon } from '../assets/Search.svg';
import { ReactComponent as FullDoneIcon } from '../assets/fullDoneIcon.svg';
import { ReactComponent as Shield1 } from '../assets/firstShieldsvg.svg';
import { ReactComponent as Shield2 } from '../assets/secondShieldSvg.svg';
import { ReactComponent as Shield3 } from '../assets/thirdShieldSvg.svg';
import { ReactComponent as PeachPic } from '../assets/Peachicon.svg';
import { ReactComponent as SettingPic } from '../assets/settingImage.svg';
import { ReactComponent as AttentionPic } from '../assets/attention.svg';
import { ReactComponent as DocumentPic } from '../assets/document.svg';
import { ReactComponent as GitPic } from '../assets/mark-github.svg';

export const GitIcon = styled(GitPic)`
  width: 40px;
  height: 40px;
  cursor:pointer;
`;

export const DocumentIcon = styled(DocumentPic)`
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

export const SettingIcon = styled(SettingPic)`
  width:32px;
  height: 32px;
  cursor: pointer;
`;

export const AttentionIcon = styled(AttentionPic)`
  width:32px;
  height: 32px;
  cursor: pointer;
`;

export const ShieldIcon1 = styled(Shield1)`
    width:70px;
    height: 70px;
    z-index: 50;
`;
export const ShieldIcon2 = styled(Shield2)`
    width:70px;
    height: 70px;
    z-index: 50;
`;
export const ShieldIcon3 = styled(Shield3)`
    width:70px;
    height: 70px;
    z-index: 50;
`;

export const FullDonePic = styled(FullDoneIcon)`
    width: 35px;
    height: 35px;
`;

export const SearchPic = styled(SearchIcon)`
    width: 32px;
    height: 32px;
    cursor: pointer;
    position: absolute;
    top: 12px;
    right: 12px;
`;

export const RequiredStarIcon = styled(RequiredIcon)`
    width: 10px;
    height: 10px;
    position: absolute;
    top: 0;
    right: -14px;
    & path {
        stroke: ${({ theme: { errorColor } }) => errorColor}
    }
`;

export const PushPic = styled(PushButtonPic)`
    width: 20px;
    height: 15px;
`;

export const BreadArrow = styled(BreadArrowPic)`
  width: 12px;
  height: 12px;  
`;

export const BlackDelIcon = styled(BlackDelPic)`
  width: 25px;
  height: 25px;
  cursor: pointer;
  z-index: 99999;
`;
export const BlueDeleteIcon = styled(BlackDelPic)`
    position: absolute;
    width: 32px;
    height: 32px;
    top: -11px;
    right: -10px;
    cursor: pointer;
    & path {
        fill:${({ theme: { mainButtonColor } }) => mainButtonColor};
    }

`;

export const HeaderCloseIcon = styled(BlackDelPic)`
    position: absolute;
    width: 25px;
    height: 25px;
    cursor: pointer;
    bottom: 0;
    right: 0;
    & path {
        fill:${({ theme: { mainBg } }) => mainBg};
    }
`;

export const OrangeDelIcon = styled(OrangeDelPic)`
       width: 25px;
  height: 25px;
  cursor: pointer;
  position: absolute;
  top: 55px;
    right: 97px;
`;

export const SmallDelete = styled(DeleteSmallPic)`
      width: 25px;
  height: 25px;
  cursor: pointer;
  top: 0;
    right: 8px;

  position: absolute;
`;

export const PenIcon = styled(PenPic)`
  width: 25px;
  height: 25px;
  cursor: pointer;
  position: absolute;
  top: 0;
    right: 31px;
`;

export const ShowIcon = styled(ShowPic)`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

export const HideIcon = styled(HidePic)`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

export const FilterIcon = styled(FilterPic)`
    width: 41px;
    height: 41px;
    cursor: pointer;
`;

export const SunIcon = styled(SunPic)`
    width: 35px;
    height: 35px;
    cursor: pointer;
    @media screen and (max-width: 1000px) {
        width: 23px;
        height: 23px;
    }
`;
export const MoonIcon = styled(MoonPic)`
    width: 35px;
    height: 35px;
    cursor: pointer;
    @media screen and (max-width: 1000px) {
        width: 23px;
        height: 23px;
    }
`;

export const CrossIcon = styled(CrossPic)`
  width: 17.309px;
  height: 17.309px;
  transform: rotate(270deg);  
  cursor: pointer;
`;

export const BlueQuestionIcon = styled(BlueQuestionPic)`
    width: 40px;
    height: 80px;
`;

export const OrangeQuestionIcon = styled(OrangeQuestionPic)`
    width: 30px;
    height: 60px;
`;

export const CheckIputIcon = styled(CheckPic)`
    width: 24px;
    height: 24px;
`;

export const QuestionIcon = styled(QuestionPic)`
    width: 13px;
    height: 28.938px;
`;

export const RubIcon = styled(RublePic)`
    height: 66px;
    width: 19px;
`;

export const DistIcon = styled(DistPic)`
    width: 24px;
    height: 24px;
    margin-left: 16px;
    flex-shrink: 0;
`;

export const ArrowToTopIcon = styled(ArrowToTopPic) <{ isColoured: boolean }>`
    width: 40px;
    height: 40px;
    & path {
        fill: ${({ theme: { mainButtonColor, sliderColor }, isColoured }) => (isColoured ? sliderColor : mainButtonColor)};
    }
`;

export const TelegramIcon = styled(TelegramPic)`
    width: 48px;
    height: 48px;
    cursor: pointer;
`;

export const BagIcon = styled(BagPic)`
    width: 48px;
    height: 48px;
    cursor: pointer;
`;

export const TopIcon = styled(TopPic)`
    width: 70px;
    height: 70px;
`;

export const PeopleIcon = styled(PeoplePic)`
    width: 70px;
    height: 70px;
`;

export const AlgoIcon = styled(AlgoPic)`
    width: 70px;
    height: 70px;
`;

export const CheckedRadio = styled(CheckedRadioPic)`
    width: 35px;
    height: 35px;
    flex-shrink: 0;
`;

export const RoundArrowIcon = styled(RoundArrowPic)`
    width: 50px;
    height: 50px;
`;

export const StarIcon = styled(StarPic) <{ isClicked: boolean }>`
    width: 33.337px;
    height: 33.064px;
    fill: ${({ isClicked, theme: { mainButtonColor } }) => (isClicked ? mainButtonColor : 'none')}; 
    cursor: pointer;
`;

export const VkIcon = styled(VkPic)`
    width:40px;
    height:40px;
    cursor: pointer;
`;

export const TgIcon = styled(TgPic)`
    width:40px;
    height:40px;
    cursor: pointer;
`;

export const OkIcon = styled(OkPic)`
    width:32px;
    height:45px;
    cursor: pointer;
`;

export const AddIcon = styled(AddPic)`
    width: 26px;
    height: 26px;
    cursor: pointer;
`;
export const PeachArrowIcon = styled(PeachPic)`
    width: 60px;
    height: 60px;
    cursor: pointer;
    @media screen and (max-width:1360px) {
    flex-shrink: 0;
  }
`;

export const ArrowIcon = styled(Arrow) <{ isOpen?: boolean }>`
    width: 14px;
    height: 7px;
    transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(270deg)')};
    cursor: pointer;
    transition: all ease .3s;
   
`;
export const ArrowIconNew = styled(Arrow) <{ isOpen: boolean, color: string, width: number }>`
    width: 14px;
    height: 7px;
    transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(270deg)')};
    cursor: pointer;
    transition: all ease .3s;
    & path {
        stroke-width: ${({ width }) => width}px;
        stroke: ${({ color }) => color};
    }
`;

export const CheckIcon = styled(Check)`
    width: 24px;
    height: 24px;
    
    cursor: pointer;
    @media screen and (max-width: 560px) {
    
        width: 16px;
        height: 16px;
      }
`;

export const CheckDoneIcon = styled(CheckDone)`
    width: 13px;
    height: 14px;
    cursor: pointer;
    position: absolute;
    top: 5px;
    left: 6px;
    display: none;
      
    
`;
