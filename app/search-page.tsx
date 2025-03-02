import { StyleSheet, TextInput, View, FlatList, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { NavigationBar } from '@/components/NavigationBar';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { searchAsync, setQuery } from '@/store/slices/searchSlice';
import { SearchResultCard } from '@/components/SearchResultCard';
import { Toasts, toast } from '@backpackapp-io/react-native-toast';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function SearchPage() {
  const [searchText, setSearchText] = useState('');
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { results, loading, error, query } = useAppSelector(state => state.search);
  const textColor = useThemeColor({}, 'text');
  const primaryColor = useThemeColor({}, 'primary');

  useEffect(() => {
    if (error) {
      toast(error);
    }
  }, [error]);

  const handleBackPress = () => {
    router.back();
  };

  const handleSearch = () => {
    if (searchText.trim()) {
      dispatch(setQuery(searchText));
      dispatch(searchAsync({ query: searchText }));
    }
  };

  // 使用独立组件替代内联渲染函数
  
  return (
    <View style={styles.container}>
      <NavigationBar 
        title="搜索" 
        leftIcon="chevron.left"
        onLeftPress={handleBackPress}
      />
      <GestureHandlerRootView style={styles.content}>
        <View style={styles.searchContainer}>
          <IconSymbol 
            name="magnifyingglass" 
            size={20} 
            style={styles.searchIcon} 
            color={textColor}
          />
          <TextInput
            style={[styles.searchInput, { color: textColor }]}
            placeholder="搜索..."
            placeholderTextColor="#666"
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
            autoFocus={true}
          />
          {searchText.length > 0 && (
            <IconSymbol
              name="xmark.circle.fill"
              size={20}
              style={styles.clearIcon}
              color={textColor}
            />
          )}
        </View>
        
        {/* 加载状态 */}
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={primaryColor} />
            <ThemedText style={styles.loadingText}>思考中...</ThemedText>
          </View>
        )}
        
        {/* 错误信息 */}
        {error && !loading && (
          <View style={styles.errorContainer}>
            <IconSymbol name="exclamationmark.triangle" size={40} color="#FF6B6B" />
            <ThemedText style={styles.errorText}>{error}</ThemedText>
          </View>
        )}
        
        {/* 搜索结果列表 - 使用独立组件 */}
        {!loading && !error && results.length > 0 && (
          <FlatList
            data={results}
            renderItem={({ item }) => <SearchResultCard item={item} />}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.resultsList}
            showsVerticalScrollIndicator={false}
          />
        )}
        
        {/* 无搜索结果 */}
        {!loading && !error && results.length === 0 && query && (
          <View style={styles.emptyContainer}>
            <IconSymbol name="magnifyingglass" size={40} color="#999" />
            <ThemedText style={styles.emptyText}>没有找到相关结果</ThemedText>
          </View>
        )}
        
        {/* 初始状态 */}
        {!loading && !error && results.length === 0 && !query && (
          <View style={styles.initialContainer}>
            <IconSymbol name="text.magnifyingglass" size={60} color="#999" />
            <ThemedText style={styles.initialText}>输入关键词开始搜索</ThemedText>
          </View>
        )}
        <Toasts />
      </GestureHandlerRootView>
    </View>
  );
}

// styles 对象中移除了与 SearchResultCard 相关的样式
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    padding: 0,
  },
  clearIcon: {
    marginLeft: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 18,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    marginTop: 16,
    fontSize: 16,
    color: '#FF6B6B',
    textAlign: 'center',
  },
  resultsList: {
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    opacity: 0.6,
    textAlign: 'center',
  },
  initialContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialText: {
    marginTop: 16,
    fontSize: 18,
    opacity: 0.6,
    textAlign: 'center',
  },
});