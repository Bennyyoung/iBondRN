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
import globe from '@/assets/svg/globe.svg';
import lock from '@/assets/svg/lock.svg';
import followers from '@/assets/svg/followers.svg';
import group from '@/assets/svg/group.svg';
import rightArrow from '@/assets/svg/rightArrow.svg';
import clock from '@/assets/svg/clock.svg';
import chevron_upward from '@/assets/svg/chevron_upward.svg';
import gallery_add from '@/assets/svg/gallery_add.svg';
import contact_list from '@/assets/svg/contact_list.svg';
import search from '@/assets/svg/search.svg';
import profile from "@/assets/svg/profile.svg"
import security_lock from "@/assets/svg/security_lock.svg"
import security from "@/assets/svg/security.svg"
import notification from "@/assets/svg/notification.svg"
import book from "@/assets/svg/book.svg"
import database from "@/assets/svg/database.svg"
import moon from "@/assets/svg/moon.svg"
import info_circle from "@/assets/svg/info-circle.svg"

const svgIconPack = {
  appleIcon,
  authLine,
  facebookIcon,
  googleIcon,
  onboarding_background,
  chevron_downward,
  chevron_upward,
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
  location,
  globe,
  lock,
  followers,
  group,
  rightArrow,
  clock,
  gallery_add,
  contact_list,
  search,
  profile,
  security_lock,
  security,
  notification,
  book,
  database,
  moon,
  info_circle
};

export { svgIconPack };

export type SvgIconPackType = keyof typeof svgIconPack;
