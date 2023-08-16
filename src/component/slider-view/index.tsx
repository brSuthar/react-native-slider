import React, {useState} from 'react';
import {LayoutChangeEvent, View} from 'react-native';
import {styles} from './styles';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent as GestureTypes,
  PanGestureHandlerEventPayload as PanTypes,
} from 'react-native-gesture-handler';
import Animated, {useAnimatedGestureHandler} from 'react-native-reanimated';
import {IContext} from './type';

const SliderView = () => {
  const [layout, setLayout] = useState({height: 0, width: 0});

  const onLayoutChanged = (event: LayoutChangeEvent) => {
    const {
      layout: {height, width},
    } = event.nativeEvent;
    setLayout({height, width});
  };

  const onGestureEvent = useAnimatedGestureHandler<GestureTypes, IContext>({
    onActive: (event: PanTypes, context) => {
      console.log('OnGestureEvent: ', event.x);
    },
  });

  return (
    <PanGestureHandler shouldCancelWhenOutside onGestureEvent={onGestureEvent}>
      <Animated.View style={[styles.container, {height: layout.height}]}>
        <View style={styles.line} />
        <View onLayout={onLayoutChanged} style={styles.view} />
      </Animated.View>
    </PanGestureHandler>
  );
};

export default SliderView;
