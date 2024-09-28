import { FC } from 'react';
import { Numpad } from './components/numpad.tsx';
import { SiteList } from './components/site-list.tsx';
import { sites } from './constants/sites.ts';
import { useSwitchStore } from './store/switch.ts';

export const App: FC = () => {
  const { showList } = useSwitchStore();
  return (
    <div className="flex h-screen flex-row items-center justify-center gap-8 overflow-hidden">
      {showList ? <SiteList sites={sites} /> : null}
      <Numpad />
    </div>
  );
};
