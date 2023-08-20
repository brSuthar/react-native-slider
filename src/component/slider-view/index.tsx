import React, {FC, useMemo, useState} from 'react';
import {LayoutChangeEvent, View} from 'react-native';
import {styles} from './styles';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent as GestureTypes,
  PanGestureHandlerEventPayload as PanTypes,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {IContext, ISlideView} from './type';

const SliderView: FC<ISlideView> = (props: ISlideView) => {
  const {onSlideChange, trackStyle, pitchStyle, controlStyle} = props;

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

  const centerPoint = useMemo(() => {
    return layout.width / 2;
  }, [layout.width]);

  const onGestureEvent = useAnimatedGestureHandler<GestureTypes, IContext>({
    onStart: (event: PanTypes, context: IContext) => {
      const {x} = event;
      const {pointX, pointY} = context;
      if (
        (pointX <= x && pointY >= x && x >= 0 && x <= mainWidth) ||
        pointX === undefined
      ) {
        context.activity = true;
        slideX.value = x;
        context.pointX = x - centerPoint;
        context.pointY = x + centerPoint;
        queueMicrotask(function () {
          'worklet';
          runOnJS(onSlideChange)(Math.round((x / mainWidth) * 100));
        });
      }
    },
    onActive: (event: PanTypes, context) => {
      const {x} = event;
      const {activity} = context;

      if (activity && x >= 0 && x <= mainWidth) {
        slideX.value = x;
        context.pointX = x - centerPoint;
        context.pointY = x + centerPoint;
        queueMicrotask(function () {
          'worklet';
          runOnJS(onSlideChange)(Math.round((x / mainWidth) * 100));
        });
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
      transform: [{translateX: slideX.value - centerPoint}],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View
        onLayout={onMainLayout}
        style={[styles.container, {height: layout.height}, trackStyle]}>
        <View style={[styles.line, pitchStyle]} />
        <Animated.View
          onLayout={onLayoutChanged}
          style={[styles.view, activeStyle, controlStyle]}
        />
      </Animated.View>
    </PanGestureHandler>
  );
};

export default SliderView;
