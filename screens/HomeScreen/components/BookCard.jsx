import React from 'react';
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import CustomText from './CustomText';
import Book from '../../../assets/images/book.png';

const BookCard = ({ book, theme, onPress, index, isSkeleton = false }) => {
  const { width } = useWindowDimensions();
  const cardWidth = Math.min(560, width - 24);
  const pressScale = React.useRef(new Animated.Value(1)).current;
  const mountOpacity = React.useRef(new Animated.Value(0)).current;
  const mountTranslate = React.useRef(new Animated.Value(12)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(mountOpacity, {
        toValue: 1,
        duration: 220,
        delay: Math.min(index * 40, 250),
        useNativeDriver: true,
      }),
      Animated.timing(mountTranslate, {
        toValue: 0,
        duration: 220,
        delay: Math.min(index * 40, 250),
        useNativeDriver: true,
      }),
    ]).start();
  }, [index, mountOpacity, mountTranslate]);

  const handlePressIn = () => {
    Animated.spring(pressScale, {
      toValue: 0.98,
      useNativeDriver: true,
      speed: 20,
      bounciness: 0,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(pressScale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 0,
    }).start();
  };

  if (isSkeleton) {
    return (
      <Animated.View
        style={[
          styles.bookItem,
          styles.skeletonItem,
          {
            width: cardWidth,
            borderBottomColor: theme.colors.border,
            backgroundColor: theme.colors.card,
            opacity: mountOpacity,
            transform: [{ translateY: mountTranslate }],
          },
        ]}
      >
        <View style={[styles.skeletonImage, { backgroundColor: theme.colors.border }]} />
        <View style={styles.bookInfo}>
          <View style={[styles.skeletonLine, { width: '80%', backgroundColor: theme.colors.border }]} />
          <View style={[styles.skeletonLine, { width: '55%', backgroundColor: theme.colors.border }]} />
        </View>
      </Animated.View>
    );
  }

  return (
    <Animated.View
      style={{
        opacity: mountOpacity,
        transform: [{ translateY: mountTranslate }, { scale: pressScale }],
      }}
    >
      <Pressable
        style={[
          styles.bookItem,
          {
            width: cardWidth,
            borderBottomColor: theme.colors.border,
          },
        ]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Image
          source={book?.volumeInfo?.imageLinks?.thumbnail ? { uri: book.volumeInfo.imageLinks.thumbnail } : Book}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.bookInfo}>
          <CustomText type="title" text={book?.volumeInfo?.title} style={{ color: theme.colors.text }}>
            {book?.volumeInfo?.title}
          </CustomText>
          <CustomText
            type="author"
            text={book?.volumeInfo?.authors?.join(', ')}
            style={{ color: theme.colors.muted }}
          >
            {book?.volumeInfo?.authors?.join(', ')}
          </CustomText>
        </View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  bookItem: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  skeletonItem: {
    borderRadius: 12,
    borderBottomWidth: 0,
    padding: 10,
  },
  bookInfo: {
    width: '70%',
    flexDirection: 'column',
    gap: 8,
  },
  image: {
    width: 75,
    height: 75,
    marginRight: 20,
  },
  skeletonImage: {
    width: 75,
    height: 75,
    marginRight: 20,
    borderRadius: 8,
  },
  skeletonLine: {
    height: 10,
    borderRadius: 6,
  },
});

export default BookCard;
