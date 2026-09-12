import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../theme/theme';

interface IconProps {
  name: React.ComponentProps<typeof Ionicons>['name'];
  size?: number;
  color?: string;
  style?: any;
}

export const Icon: React.FC<IconProps> = ({ name, size = 24, color = COLORS.onSurface, style }) => {
  return <Ionicons name={name} size={size} color={color} style={style} />;
};
