import type {ViewStyle} from 'react-native';

export interface ISlideView {
  onSlideChange: (val: number) => void;
  pitchStyle?: ViewStyle;
  controlStyle?: ViewStyle;
  trackStyle?: ViewStyle;
}

type ContextType = {[K: string]: unknown};

export interface IContext extends ContextType {
  activity: boolean;
  pointX: number;
  pointY: number;
}
