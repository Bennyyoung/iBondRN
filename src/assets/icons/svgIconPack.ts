import appleIcon from '@/assets/svg/appleLogo.svg';
import authLine from '@/assets/svg/authLine.svg';
import facebookIcon from '@/assets/svg/facebookLogo.svg';
import googleIcon from '@/assets/svg/googleLogo.svg';
import onboarding_background from '@/assets/svg/bg-image.svg';
import chevron_downward from '@/assets/svg/dropdown.svg';
import calender from '@/assets/svg/calender.svg';

const svgIconPack = {
  appleIcon,
  authLine,
  facebookIcon,
  googleIcon,
  onboarding_background,
  chevron_downward,
  calender,
};

export { svgIconPack };

export type SvgIconPackType = keyof typeof svgIconPack;
