import type {} from '@redux-devtools/extension'; // required for devtools typing
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface BearState {
  showList: boolean;
  setShowList: (showList: boolean | ((v: boolean) => boolean)) => void;
}

export const useSwitchStore = create<BearState>()(
  devtools(
    (set, get) => ({
      showList: false,
      setShowList: (showList) => {
        const newValue = typeof showList === 'function' ? showList(get().showList) : showList;
        set({ showList: newValue });
      },
    }),
    {
      name: 'switch-storage',
    }
  )
);
