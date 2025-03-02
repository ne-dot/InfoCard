import { View, Image, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { SearchResult } from '@/types/search';

interface SearchResultCardProps {
  item: SearchResult;
}

export function SearchResultCard({ item }: SearchResultCardProps) {
  const cardBgColor = useThemeColor({}, 'card');
  
  return (
    <View style={[styles.resultCard, { backgroundColor: cardBgColor }]}>
      {item.link && (
        <Image 
          source={{ uri: item.link }} 
          style={styles.thumbnail} 
          resizeMode="cover"
        />
      )}
      <View style={styles.resultContent}>
        <ThemedText style={styles.resultTitle} numberOfLines={2}>
          {item.title}
        </ThemedText>
        <ThemedText style={styles.resultSnippet} numberOfLines={3}>
          {item.content}
        </ThemedText>
        {item.date && (
          <ThemedText style={styles.resultDate}>
            {new Date(item.date).toLocaleDateString()}
          </ThemedText>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  resultCard: {
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  thumbnail: {
    height: 160,
    width: '100%',
  },
  resultContent: {
    padding: 16,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  resultSnippet: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  resultDate: {
    fontSize: 12,
    opacity: 0.6,
    marginTop: 4,
  },
});