/* eslint-disable react-native/no-inline-styles */
import { VariantProps } from '@shopify/restyle';
import React, { FC } from 'react';
import { ActivityIndicator, Platform } from 'react-native';
import { BaseButton, BaseButtonProps } from './BaseButton';
import { PaletteType, Theme, useTheme } from '@/constants/theme';
import Text, { TextProps } from './Text';
import Box, { BoxProps } from './Box';
import { SvgIcon } from '@/assets/icons/SvgIcon';
import { SvgIconPackType } from '@/assets/icons';

type CustomButtonProps = BaseButtonProps &
  VariantProps<Theme, 'textVariants', 'labelVariant'> & {
    label: string | JSX.Element;
    labelProps?: Omit<TextProps, 'children'>;
    isLoading?: boolean;
    loadingIconColor?: PaletteType;
    containerProps?: BoxProps;
    iconName?: SvgIconPackType;
    iconSize?: keyof Theme['iconSizes'];
  };

const CustomButton: FC<CustomButtonProps> = props => {
  const {
    label,
    isLoading,
    labelVariant,
    labelProps,
    loadingIconColor,
    containerProps,
    iconName,
    iconSize,
    ...rest
  } = props;

  const theme = useTheme();

  const activityIndicatorColor = theme.colors[loadingIconColor ?? 'whiteColor'];

  return (
    <BaseButton {...rest}>
      <Box
        alignItems="center"
        flexDirection="row"
        justifyContent="center"
        width="100%"
        minHeight={Platform.OS === 'ios' ? 40 : 42}
        {...containerProps}>
        {iconName && iconSize && (
          <Box mr="xs">
            <SvgIcon name={iconName} size={iconSize} />
          </Box>
        )}
        {typeof label === 'string' ? (
          <Text
            variant={labelVariant}
            {...labelProps}
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{ flexShrink: 1 }}>
            {label}
          </Text>
        ) : (
          label
        )}
        {isLoading && (
          <Box marginLeft="sm">
            <ActivityIndicator color={activityIndicatorColor} />
          </Box>
        )}
      </Box>
    </BaseButton>
  );
};

export { CustomButton };
