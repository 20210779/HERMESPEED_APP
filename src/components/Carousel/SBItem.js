import React from "react";
import { ViewStyle, ViewProps, ImageSourcePropType } from "react-native";
import { LongPressGestureHandler } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import Constants from "expo-constants";

import { SBImageItem } from "./SBImageItem";
import { SBTextItem } from "./SBTextItem";

const SBItem = (props) => {
  const { style, showIndex = true, index, pretty, img, testID, ...animatedViewProps } = props;
  const enablePretty = Constants?.expoConfig?.extra?.enablePretty || false;
  const [isPretty, setIsPretty] = React.useState(pretty || enablePretty);

  return (
    <LongPressGestureHandler
      onActivated={() => {
        setIsPretty(!isPretty);
      }}
    >
      <Animated.View testID={testID} style={{ flex: 1 }} {...animatedViewProps}>
        {isPretty || img ? (
          <SBImageItem style={style} index={index} showIndex={typeof index === "number" && showIndex} img={img} />
        ) : (
          <SBTextItem style={style} index={index} />
        )}
      </Animated.View>
    </LongPressGestureHandler>
  );
};

export default SBItem;
