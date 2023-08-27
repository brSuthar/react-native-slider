import React from 'react';
import {styles} from './styles';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const SheetView = () => {
  const animatedHeight = useSharedValue(0);
  const animatedMain = useSharedValue(0);
  const onGestureHandler = useAnimatedGestureHandler({
    onActive: event => {
      console.log('ActiveEvent: ', 400 - event.y);
      animatedHeight.value = event.y;
    },
    onFinish: event => {
      animatedMain.value = event.y;
    },
  });

  const mainStyle = useAnimatedStyle(() => {
    return {
      height: 400 - animatedMain.value,
    };
  });

  const viewStyle = useAnimatedStyle(() => {
    return {
      height: 400 - animatedHeight.value,
    };
  });

  return (
    <PanGestureHandler onGestureEvent={onGestureHandler}>
      <Animated.View style={[styles.container, mainStyle]}>
        <Animated.View style={[styles.view, viewStyle]} />
        {/* <View style={styles.header} /> */}
        {/* <FlatList
          data={[1, 2, 3, 4, 5, 6, 7, 6, 7]}
          renderItem={() => {
            return (
              <View
                style={{
                  width: '100%',
                  backgroundColor: '#076B81',
                  height: 80,
                  marginBottom: 12,
                }}
              />
            );
          }}
        /> */}
      </Animated.View>
    </PanGestureHandler>
  );
};

export default SheetView;
