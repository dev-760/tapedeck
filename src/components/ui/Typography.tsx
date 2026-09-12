import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../theme/theme';

interface TypographyProps extends TextProps {
  variant?: 'displayLarge' | 'displayMedium' | 'displaySmall' | 'bodyLarge' | 'bodyMedium' | 'bodySmall' | 'labelLarge' | 'labelMedium' | 'labelSmall' | 'mono';
  color?: string;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'bodyMedium',
  color = COLORS.onSurface,
  align,
  style,
  children,
  ...props
}) => {
  return (
    <Text
      style={[
        styles[variant],
        { color },
        align && { textAlign: align },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  displayLarge: {
    fontFamily: FONTS.displayBold,
    fontSize: 57,
    letterSpacing: -0.25,
  },
  displayMedium: {
    fontFamily: FONTS.display,
    fontSize: 45,
  },
  displaySmall: {
    fontFamily: FONTS.display,
    fontSize: 36,
  },
  bodyLarge: {
    fontFamily: FONTS.displayRegular,
    fontSize: 16,
    letterSpacing: 0.5,
  },
  bodyMedium: {
    fontFamily: FONTS.displayRegular,
    fontSize: 14,
    letterSpacing: 0.25,
  },
  bodySmall: {
    fontFamily: FONTS.displayRegular,
    fontSize: 12,
    letterSpacing: 0.4,
  },
  labelLarge: {
    fontFamily: FONTS.displayMedium,
    fontSize: 14,
    letterSpacing: 0.1,
  },
  labelMedium: {
    fontFamily: FONTS.displayMedium,
    fontSize: 12,
    letterSpacing: 0.5,
  },
  labelSmall: {
    fontFamily: FONTS.displayMedium,
    fontSize: 11,
    letterSpacing: 0.5,
  },
  mono: {
    fontFamily: FONTS.mono,
    fontSize: 14,
  },
});
