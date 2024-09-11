import { VariantProps } from '@shopify/restyle';
import React, { FC } from 'react';
import { ActivityIndicator } from 'react-native';
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
        {...containerProps}>
        {iconName && iconSize && (
          <Box mr="xs">
            <SvgIcon name={iconName} size={iconSize} />
          </Box>
        )}
        {typeof label === 'string' ? (
          <Text variant={labelVariant} {...labelProps}>
            {label}
          </Text>
        ) : (
          <Text variant={labelVariant} {...labelProps} />
        )}

        {isLoading ? (
          <Box marginLeft="sm">
            <ActivityIndicator color={activityIndicatorColor} />
          </Box>
        ) : null}
      </Box>
    </BaseButton>
  );
};

export { CustomButton };
