import { VariantProps } from '@shopify/restyle';
import React, { FC } from 'react';
import { ActivityIndicator } from 'react-native';
import { BaseButton, BaseButtonProps } from './BaseButton';
import { PaletteType, Theme, useTheme } from '@/constants/theme';
import Text, { TextProps } from './Text';
import Box, { BoxProps } from './Box';

type CustomButtonProps = BaseButtonProps &
  VariantProps<Theme, 'textVariants', 'labelVariant'> & {
    label: string | JSX.Element;
    labelProps?: Omit<TextProps, 'children'>;
    isLoading?: boolean;
    loadingIconColor?: PaletteType;
    containerProps?: BoxProps;
  };

const CustomButton: FC<CustomButtonProps> = props => {
  const {
    label,
    isLoading,
    labelVariant,
    labelProps,
    loadingIconColor,
    containerProps,
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
