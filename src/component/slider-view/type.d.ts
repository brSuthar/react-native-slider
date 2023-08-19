export interface ISlideView {
  onSlideChange: (val: number) => void;
}

type ContextType = {[K: string]: unknown};

export interface IContext extends ContextType {
  activity: boolean;
  position: number;
}
