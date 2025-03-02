import { StyleSheet, View, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { NavigationBar } from '@/components/NavigationBar';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  
  // 估算导航栏高度（包含状态栏）
  const navBarHeight = 56 + insets.top;
  // 估算标签栏高度（包含底部安全区域）
  const tabBarHeight = 46 + insets.bottom;
  // 计算内容区域高度
  const contentHeight = height - navBarHeight - tabBarHeight;

  return (
    <View style={styles.container}>
      <NavigationBar 
        title="Info Card" 
      />
      <ThemedView style={{ height: contentHeight }}>
        {/* 这里可以添加内容列表 */}
        <View style={styles.container}/>
        {/* 底部搜索框 */}
        <View style={styles.bottomSearchContainer}>
          <Link href="/search-page" asChild style={[styles.searchButton]}>
            <TouchableOpacity>
              <IconSymbol 
                name="camera" 
                size={24} 
                color={useThemeColor({}, 'text')}
              />
              <ThemedText style={[styles.searchButtonText, { color: useThemeColor({}, 'text') }]}>Ask anything</ThemedText>
              <IconSymbol 
                name="mic.fill" 
                size={24} 
                color={useThemeColor({}, 'text')}
              />
            </TouchableOpacity>
          </Link>
        </View>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomSearchContainer: {
    left: 0,
    right: 0,
    alignItems: 'center',
    height: 64
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: '90%',
    justifyContent: 'space-between',
    backgroundColor: '#fff'
  },
  searchButtonText: {
    fontSize: 16,
    flex: 1,
    marginLeft: 10,
  },
});