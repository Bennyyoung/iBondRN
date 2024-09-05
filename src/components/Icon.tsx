import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';

import logo from '@/assets/svg/appleLogo.svg';

import { RFValue } from 'react-native-responsive-fontsize';

type IconFunction = React.FC<SvgProps>;

export const ICONS = {
  logo,
};

export type IconName = keyof typeof ICONS;
export type IconProps = SvgProps & {
  name: IconName;
  size?: number;
  style?: StyleProp<ViewStyle>;
  stroke?: string;
  outerStroke?: string;
};

/**
 * Custom Icon component based on design systems used in the figma
 */
function Icon({ name, size = 24, style, ...props }: IconProps) {
  const IconImpl: IconFunction = ICONS[name as IconName];
  return IconImpl ? (
    <IconImpl
      height={RFValue(size)}
      style={style}
      width={RFValue(size)}
      {...props}
    />
  ) : null;
}

export default Icon;
