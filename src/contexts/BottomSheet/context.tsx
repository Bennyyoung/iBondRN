import { ComponentType, createContext, ReactNode } from 'react';

export type BottomSheetProps = {
  _snapPoints: string[];

  _title?: ReactNode | ComponentType<any>;

  _content?: ReactNode | ComponentType<any>;
  _onChange?: (index: number) => void;
  _onDismiss?: () => void;
  _showHeader?: boolean;
  _action?: ReactNode | ComponentType<any>
};

export type BottomSheetContextProps = {
  createBottomSheet: (props: BottomSheetProps) => void;
  dismissBottomSheet: () => void;
};

export type BottomSheetProviderProps = {
  children: React.JSX.Element;
};

const BottomSheetContext = createContext<BottomSheetContextProps>({
  createBottomSheet: _ => {},
  dismissBottomSheet: () => {},
});

export default BottomSheetContext;
