import { useCallback } from 'react';
import {
  CONFETTI,
  CONFETTI_SCHOOL_PRIDE,
  CONFETTI_SNOW,
  CONFETTI_STARS,
  TOGGLE_CURTAIN_MODE,
  TOGGLE_SITE_LIST,
} from '../constants/commands.ts';
import { useSwitchStore } from '../store/switch.ts';
import { playConfetti, playConfettiSchoolPride, playConfettiSnow, playConfettiStars } from '../utils/confetti.ts';

export const useCommands = () => {
  const { setShowList, setCurtainMode } = useSwitchStore();
  const executeCommand = useCallback(
    (command: string) => {
      switch (command) {
        case TOGGLE_SITE_LIST:
          setShowList((showList) => !showList);
          break;
        case TOGGLE_CURTAIN_MODE:
          setCurtainMode((curtainMode) => !curtainMode);
          break;
        case CONFETTI:
          playConfetti();
          break;
        case CONFETTI_SNOW:
          playConfettiSnow();
          break;
        case CONFETTI_STARS:
          playConfettiStars();
          break;
        case CONFETTI_SCHOOL_PRIDE:
          playConfettiSchoolPride();
          break;
        default:
          console.error(`Unknown command: ${command}`);
      }
    },
    [setCurtainMode, setShowList]
  );
  return { executeCommand };
};
