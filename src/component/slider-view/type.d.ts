type ContextType = {[K: string]: unknown};

export interface IContext extends ContextType {
  activity: boolean;
}