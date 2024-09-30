import type {} from '@redux-devtools/extension'; // required for devtools typing
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type Dispatch<T> = (v: T | ((v: T) => T)) => void;

interface BearState {
  showList: boolean;
  curtainMode: boolean;
  setShowList: Dispatch<boolean>;
  setCurtainMode: Dispatch<boolean>;
}

export const useSwitchStore = create<BearState>()(
  devtools(
    (set, get) => ({
      showList: false,
      curtainMode: false,
      setShowList: (showList) => {
        const newValue = typeof showList === 'function' ? showList(get().showList) : showList;
        set({ showList: newValue });
      },
      setCurtainMode: (curtainMode) => {
        const newValue = typeof curtainMode === 'function' ? curtainMode(get().curtainMode) : curtainMode;
        set({ curtainMode: newValue });
      },
    }),
    {
      name: 'switch-storage',
    }
  )
);
