import React, {useEffect} from 'react';
import {styles} from './styles';
import Animated, {
  Easing,
  cancelAnimation,
  useAnimatedProps,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const InputCursor = () => {
  const cursor = useSharedValue(1);

  useEffect(() => {
    startAnimation();
    return () => {
      cancelAnimation(cursor);
    };
  }, []);

  const startAnimation = () => {
    cursor.value = withRepeat(
      withSequence(
        withDelay(250, withTiming(0, {duration: 120, easing: Easing.linear})),
        withDelay(250, withTiming(1, {duration: 120, easing: Easing.linear})),
      ),
      -1,
    );
  };

  const animatedProps = useAnimatedProps(() => {
    return {
      opacity: cursor.value,
    };
  });

  return <Animated.View style={styles.view} animatedProps={animatedProps} />;
};

export default InputCursor;
