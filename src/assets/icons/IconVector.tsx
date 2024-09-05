import React, { VFC } from 'react';

import Box, { BoxProps } from '@/components/Box';

import { SvgIcon, SvgIconProps } from './SvgIcon';
import { svgIconPack } from './svgIconPack';

export type IconProps = SvgIconProps & {
  containerProps?: BoxProps;
};
const IconVector: VFC<IconProps> = ({ containerProps, name, ...rest }) =>
  name in svgIconPack ? (
    <Box {...containerProps}>
      <SvgIcon
        color="whiteColor"
        name={name}
        size={rest?.size ?? 'sm'}
        {...rest}
      />
    </Box>
  ) : (
    <Box {...containerProps} height={24} width={24} />
  );

export { IconVector };
