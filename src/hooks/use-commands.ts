import { useCallback } from 'react';
import { TOGGLE_SITE_LIST } from '../constants/commands.ts';
import { useSwitchStore } from '../store/switch.ts';

export const useCommands = () => {
  const { setShowList } = useSwitchStore();
  const executeCommand = useCallback(
    (command: string) => {
      switch (command) {
        case TOGGLE_SITE_LIST:
          setShowList((showList) => !showList);
          break;
        default:
          console.error(`Unknown command: ${command}`);
      }
    },
    [setShowList]
  );
  return { executeCommand };
};
