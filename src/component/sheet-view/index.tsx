import React, {useState} from 'react';
import {styles} from './styles';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  Easing,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Dimensions} from 'react-native';

const screenHeight = Dimensions.get('screen').height;

const SheetView = () => {
  const animatedHeight = useSharedValue((screenHeight / 100) * 20);
  const animatedMain = useSharedValue((screenHeight / 100) * 20);
  const onGestureHandler = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.start = event.absoluteY;
    },
    onActive: event => {
      // console.log('ActiveEvent: ', screenHeight - event.absoluteY);
      if (event.absoluteY < (screenHeight / 100) * 80) {
        animatedHeight.value = screenHeight - event.absoluteY;
      }
    },
    onFinish: (event, context: any) => {
      if (event.absoluteY < context.start) {
        const timeConfig = {
          duration: 130,
          easing: Easing.linear,
        };
        const range = (screenHeight / 100) * 70;
        animatedMain.value = withTiming(range, timeConfig);
        animatedHeight.value = withTiming(range, timeConfig);
      } else {
        animatedMain.value = (screenHeight / 100) * 20;
        animatedHeight.value = (screenHeight / 100) * 20;
      }
    },
  });

  const mainStyle = useAnimatedStyle(() => {
    return {
      height: animatedMain.value,
    };
  });

  const viewStyle = useAnimatedStyle(() => {
    return {
      height: animatedHeight.value,
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
