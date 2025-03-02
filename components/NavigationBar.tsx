import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol, IconSymbolName } from '@/components/ui/IconSymbol';
import { useThemeColor } from '@/hooks/useThemeColor';

interface NavigationBarProps {
  title: string;
  leftIcon?: IconSymbolName;
  rightIcon?: IconSymbolName;
  onLeftPress?: () => void;
  onRightPress?: () => void;
}

export function NavigationBar({
  title,
  leftIcon = 'chevron.left',
  rightIcon,
  onLeftPress,
  onRightPress,
}: NavigationBarProps) {
  const insets = useSafeAreaInsets();
  const bgColor = useThemeColor({  }, 'primary');
  const txtColor = useThemeColor({  }, 'text');
  
  return (
    <View style={[
      styles.container, 
      { 
        backgroundColor: bgColor,
        paddingTop: insets.top,
        height: 52 + insets.top,
      }
    ]}>
      <View style={styles.leftContainer}>
        {onLeftPress && (
          <TouchableOpacity onPress={onLeftPress} style={styles.iconButton}>
            <IconSymbol name={leftIcon} size={24} color={txtColor} />
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.titleContainer}>
        <ThemedText style={[styles.title, { color: txtColor }]}>{title}</ThemedText>
      </View>
      
      <View style={styles.rightContainer}>
        {onRightPress && rightIcon && (
          <TouchableOpacity onPress={onRightPress} style={styles.iconButton}>
            <IconSymbol name={rightIcon} size={24} color={txtColor} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    width: '100%'
  },
  leftContainer: {
    width: 40,
    alignItems: 'flex-start',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  rightContainer: {
    width: 40,
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconButton: {
    padding: 8,
  },
});