import React, {FC, useEffect, useState} from 'react';
import {LayoutChangeEvent, Text, View} from 'react-native';
import {styles} from './styles';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent as GestureTypes,
  PanGestureHandlerEventPayload as PanTypes,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  runOnUI,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {IContext, ISlideView} from './type';

const SliderView: FC<ISlideView> = (props: ISlideView) => {
  const {onSlideChange} = props;
  const [layout, setLayout] = useState({height: 0, width: 0});
  const [mainWidth, setMainWidth] = useState(0);
  const slideX = useSharedValue(0);

  const onLayoutChanged = (event: LayoutChangeEvent) => {
    const {height, width} = event.nativeEvent.layout;
    setLayout({height, width});
  };

  const onMainLayout = (event: LayoutChangeEvent) => {
    const {width} = event.nativeEvent.layout;
    setMainWidth(width);
  };

  const onGestureEvent = useAnimatedGestureHandler<GestureTypes, IContext>({
    onStart: (event: PanTypes, context: IContext) => {
      const {x} = event;
      const {position} = context;
      if ((position - 18 < x && position + 18 > x) || position === undefined) {
        context.activity = true;
        if (x >= 18 && x < mainWidth - 18 && position) {
          slideX.value = x - 18;
          context.position = x;
          console.log('');
          queueMicrotask(function () {
            'worklet';
            runOnJS(onSlideChange)(((x - 18) / (mainWidth - 18)) * 100);
          });
        }
      }
    },
    onActive: (event: PanTypes, context) => {
      const {x} = event;
      const {activity} = context;
      if (activity) {
        if (x >= 18 && x < mainWidth - 18) {
          slideX.value = x - 18;
          context.position = x;
          queueMicrotask(function () {
            'worklet';
            runOnJS(onSlideChange)(((x - 18) / (mainWidth - 18)) * 100);
          });
        }
      }
    },
    onFinish: (event: PanTypes, context) => {
      context.activity = false;
    },
    onFail: (event: PanTypes, context) => {
      context.activity = false;
    },
  });

  const activeStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: slideX.value}],
    };
  });

  return (
    <PanGestureHandler shouldCancelWhenOutside onGestureEvent={onGestureEvent}>
      <Animated.View
        onLayout={onMainLayout}
        style={[styles.container, {height: layout.height}]}>
        <View style={styles.line} />
        <Animated.View
          onLayout={onLayoutChanged}
          style={[styles.view, activeStyle]}
        />
      </Animated.View>
    </PanGestureHandler>
  );
};

export default SliderView;
