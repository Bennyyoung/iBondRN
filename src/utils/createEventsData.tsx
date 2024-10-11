import { SvgIcon } from "@/assets/icons";

export const categoryOptions = [
  {
    id: 'corporate',
    value: 'Corporate'
  },
  {
    id: 'education',
    value: 'Education'
  },
  {
    id: 'career',
    value: 'Career'
  },
  {
    id: 'culture',
    value: 'Culture'
  },
  {
    id: 'entertainment',
    value: 'Entertainment'
  },
  {
    id: 'social',
    value: 'Social'
  },
  {
    id: 'sport',
    value: 'Sport'
  },
];

export const eventType = [
  {
    id: 'physical',
    value: 'Physical'
  },
  {
    id: 'virtual',
    value: 'Virtual'
  },
];

export const privacyOptions = [
  {
    id: 'public',
    value: 'Public',
    iconName: 'globe',
    label: 'Anyone on and off iBond Elite'
  },
  {
    id: 'private',
    value: 'Private',
    iconName: 'lock',
    label: 'Only people you invite can see and join event'
  },
  {
    id: 'followers',
    value: 'Followers Only',
    iconName: 'followers',
    label: "It'll be shown only to your followers"
  },
  {
    id: 'group',
    value: 'Group',
    iconName: 'group',
    label: 'Members of a group that you belong',
    arrowRight: 'rightArrow'
  },
];

export const groupOptions = [
  {
    id: 'segun owo',
    value: 'Segun OWO Private club',
    image: <SvgIcon name="segunOwoPrivateClub" size="sm" style={{ marginRight: 20 }} />
  },
  {
    id: 'finesse gub',
    value: 'Finesse Hub',
    image: <SvgIcon name="segunOwoPrivateClub" size="sm" style={{ marginRight: 20 }} />
  },
  {
    id: 'dpa mastermind community',
    value: 'The DPA Priate Mastermind Community',
    image: <SvgIcon name="segunOwoPrivateClub" size="sm" style={{ marginRight: 20 }} />
  },
  {
    id: 'ui/ux desingners',
    value: 'UI/UX Designers & Developers',
    image: <SvgIcon name="segunOwoPrivateClub" size="sm" style={{ marginRight: 20 }} />
  },
  {
    id: 'lautech',
    value: 'LAUTECH Student UNION',
    image: <SvgIcon name="segunOwoPrivateClub" size="sm" style={{ marginRight: 20 }} />
  },
]