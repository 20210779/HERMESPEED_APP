import React, { useRef } from 'react';
import { Dimensions, Text, View, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';

const data = [...new Array(6).keys()];
const width = Dimensions.get('window').width;

export default function CarruselScreen({ navigation }) {
  const ref = useRef(null);
  const progress = useSharedValue(0);

  const onProgressChange = (offsetProgress, absoluteProgress) => {
    progress.value = absoluteProgress;
  };

  const onPressPagination = (index) => {
    ref.current.scrollTo({ index, animated: true });
  };

  return (
    <View style={styles.container}>
       
      <View style={styles.carouselContainer}>
        
        <Carousel
          ref={ref}
          width={width}
          height={width / 2}
          data={data}
          onProgressChange={onProgressChange}
          renderItem={({ index }) => (
            <View style={styles.carouselItem}>
              <Text style={styles.carouselItemText}>{index}</Text>
            </View>
          )}
          
        />
        <Pagination
          progress={progress}
          data={data}
          dotStyle={styles.dotStyle}
          containerStyle={styles.paginationContainer}
          onPress={onPressPagination}
        />
       
      </View>
      
    </View>
  );
}

const Pagination = ({ progress, data, dotStyle, containerStyle, onPress }) => {
  return (
    <View style={[styles.paginationContainer, containerStyle]}>
      {data.map((_, index) => {
        const animatedStyle = useAnimatedStyle(() => {
          const isActive = Math.round(progress.value) === index;
          return {
            opacity: withTiming(isActive ? 1 : 0.5),
            transform: [
              {
                scale: withTiming(isActive ? 1.2 : 1),
              },
            ],
          };
        });

        return (
          <Animated.View
            key={index}
            style={[styles.dotStyle, dotStyle, animatedStyle]}
            onStartShouldSetResponder={() => {
              onPress(index);
              return true;
            }}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  carouselContainer: {
    alignItems: 'center',
    position: 'absolute',
    top:20,
  },
  carouselItem: {
    flex: 1,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  carouselItemText: {
    textAlign: 'center',
    fontSize: 30,
  },
  dotStyle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'black',
    marginHorizontal: 4,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
