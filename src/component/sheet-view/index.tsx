import React, {useState} from 'react';
import {styles} from './styles';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {Dimensions} from 'react-native';

const screenHeight = Dimensions.get('screen').height;

const SheetView = () => {
  const animatedHeight = useSharedValue(400);
  const animatedMain = useSharedValue(400);
  const onGestureHandler = useAnimatedGestureHandler({
    onActive: event => {
      console.log('ActiveEvent: ', screenHeight - event.absoluteY);
      animatedHeight.value = screenHeight - event.absoluteY;
    },
    onFinish: event => {
      if (event.absoluteY < (screenHeight / 100) * 60) {
        animatedMain.value = (screenHeight / 100) * 70;
        animatedHeight.value = (screenHeight / 100) * 70;
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
