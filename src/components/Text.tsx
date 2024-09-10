import { createText } from '@shopify/restyle';
import React, { FC } from 'react';
import { Theme } from '@/constants/theme';

/**
 * Custom `Text` component with type checked layout stylings and props including typography.
 * All styles can be passed as props rather than using the StyleSheet API, and we can select a variant with predefined styles.
 *
 * Includes all the props that are available in the native `Text` component.
 * Fully themeable.
 * @see https://github.com/Shopify/restyle#text
 */
const RestyleText = createText<Theme>();

export type RestyleTextProps = React.ComponentProps<typeof RestyleText>;

export type TextProps = RestyleTextProps & {
  fontVariant?: keyof Theme['fontSizes'];
};

const Text: FC<TextProps> = props => {
  const {
    children,
    fontVariant = 'p',
    variant = 'body',
    color = 'black',
    ...rest
  } = props;

  return (
    <RestyleText
      allowFontScaling={false}
      variant={variant}
      {...rest}
      color={color}>
      {children}
    </RestyleText>
  );
};

export default Text;
