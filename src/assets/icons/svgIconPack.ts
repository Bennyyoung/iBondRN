import appleIcon from '@/assets/svg/appleLogo.svg';
import authLine from '@/assets/svg/authLine.svg';
import facebookIcon from '@/assets/svg/facebookLogo.svg';
import googleIcon from '@/assets/svg/googleLogo.svg';

const svgIconPack = {
  appleIcon,
  authLine,
  facebookIcon,
  googleIcon,
};

export {svgIconPack};

export type SvgIconPackType = keyof typeof svgIconPack;
