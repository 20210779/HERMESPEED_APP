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