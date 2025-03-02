import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';
import { useState } from 'react';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function SearchScreen() {
  const [searchText, setSearchText] = useState('');

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          name="magnifyingglass"
          style={styles.headerImage}
          color="#808080"
        />
      }>
      <ThemedView style={styles.container}>
        <View style={styles.searchContainer}>
          <IconSymbol 
            name="magnifyingglass" 
            size={20} 
            style={styles.searchIcon} 
            color="#666"
          />
          <TextInput
            style={styles.searchInput}
            placeholder="搜索..."
            placeholderTextColor="#666"
            value={searchText}
            onChangeText={setSearchText}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText('')}>
              <IconSymbol
                name="xmark.circle.fill"
                size={20}
                style={styles.clearIcon}
                color="#666"
              />
            </TouchableOpacity>
          )}
        </View>
        
        {/* 这里可以添加搜索结果列表 */}
        <ThemedText style={styles.resultText}>
          {searchText ? '搜索结果将显示在这里' : '请输入搜索关键词'}
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerImage: {
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
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
  resultText: {
    textAlign: 'center',
    marginTop: 20,
  },
});