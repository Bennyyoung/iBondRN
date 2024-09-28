import appleIcon from '@/assets/svg/appleLogo.svg';
import authLine from '@/assets/svg/authLine.svg';
import facebookIcon from '@/assets/svg/facebookLogo.svg';
import googleIcon from '@/assets/svg/googleLogo.svg';
import onboarding_background from '@/assets/svg/bg-image.svg';
import chevron_downward from '@/assets/svg/dropdown.svg';
import calender from '@/assets/svg/calender.svg';
import error_close from '@/assets/svg/error_close.svg';
import check_mark from '@/assets/svg/check_mark.svg';
import eyeoff_error from '@/assets/svg/eyeoff_error.svg';
import success from '@/assets/svg/success.svg';
import upload_avatar from '@/assets/svg/upload_avatar.svg';
import camera from '@/assets/svg/camera.svg';
import library from '@/assets/svg/gallery.svg';
import file from '@/assets/svg/folder-open.svg';
import edit from '@/assets/svg/edit.svg';
import location from '@/assets/svg/location.svg';

const svgIconPack = {
  appleIcon,
  authLine,
  facebookIcon,
  googleIcon,
  onboarding_background,
  chevron_downward,
  calender,
  check_mark,
  error_close,
  eyeoff_error,
  success,
  upload_avatar,
  camera,
  library,
  file,
  edit,
  location
};

export { svgIconPack };

export type SvgIconPackType = keyof typeof svgIconPack;
