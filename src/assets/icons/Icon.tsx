import React, { FC } from 'react';

import Box, { BoxProps } from '@/components/Box';

import { ImageIcon, ImageIconProps } from './ImageIcon';

export type IconProps = ImageIconProps & {
  containerProps?: BoxProps;
};

const Icon: FC<IconProps> = ({ containerProps, ...rest }) => (
  <Box {...containerProps}>
    <ImageIcon size="sm" {...rest} />
  </Box>
);

export { Icon };
