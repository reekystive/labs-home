import classNames from 'classnames';
import { FC, useCallback, useEffect, useRef, useState } from 'react';

import { sites } from '../constants/sites.ts';
import { useCommands } from '../hooks/use-commands.ts';
import { filterSites, matchPrefix } from '../utils/filter-sites';
import scss from './numpad.module.scss';
import { Site } from './site-list.tsx';

const KEY_MAP: Record<string, string[]> = {
  a: ['a', 'A'],
  b: ['b', 'B'],
  c: ['c', 'C'],
  d: ['d', 'D'],
  e: ['e', 'E'],
  f: ['f', 'F'],
  0: ['0'],
  1: ['1'],
  2: ['2'],
  3: ['3'],
  4: ['4'],
  5: ['5'],
  6: ['6'],
  7: ['7'],
  8: ['8'],
  9: ['9'],
  x: ['x', 'X'],
  del: ['Backspace'],
  ok: ['Enter'],
};

const REVERSE_KEY_MAP = Object.entries(KEY_MAP).reduce<Record<string, string>>((acc, [key, values]) => {
  for (const value of values) {
    acc[value] = key;
  }
  return acc;
}, {});

const VALID_KEYS = Object.keys(KEY_MAP).reduce<string[]>((acc, key) => {
  const values = KEY_MAP[key] ?? [];
  return [...acc, ...values];
}, []);

export const NumpadButton: FC<{
  value: string;
  onClick?: (value: string) => void;
  colspan?: number;
  active?: boolean;
}> = ({ onClick, value, colspan, active }) => {
  return (
    <button
      className={classNames(
        'flex size-16 items-center justify-center rounded-lg bg-red-950 font-mono text-2xl font-bold outline-none transition-all ease-quick hover:bg-red-900 active:scale-90 active:bg-red-900',
        active ? '!scale-90 !bg-red-900' : ''
      )}
      style={{
        width: `${String((colspan ?? 1) * 4.5 - 0.5)}rem`,
      }}
      onClick={() => {
        onClick?.(value);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') e.preventDefault();
        if (e.key === ' ') e.preventDefault();
      }}
    >
      {value}
    </button>
  );
};

const BlinkingCursor: FC<{ overlay?: boolean }> = ({ overlay }) => {
  return (
    <span
      className={`h-[1lh] w-[1ch] bg-white font-mono text-2xl font-bold ${scss.blink} ${overlay ? 'absolute' : ''}`}
    ></span>
  );
};

export const Screen: FC<{ value: string; onChange?: (v: string | null) => void }> = ({ value, onChange }) => {
  return (
    <div className="flex h-48 w-[280px] flex-col gap-1 overflow-hidden rounded-lg bg-red-950 p-1">
      <div className="flex min-w-0 break-all p-1 font-mono text-2xl font-bold">
        {value === '' ? <BlinkingCursor overlay /> : null}
        <span className={value === '' ? 'opacity-50' : ''}>{value || 'Kia Ora!'}</span>
        {value === '' ? null : <BlinkingCursor />}
      </div>
      <Suggestions sites={sites} prefix={value} onChange={onChange} />
    </div>
  );
};

export const Suggestions: FC<{ sites: Site[]; prefix: string; onChange?: (v: string | null) => void }> = ({
  sites,
  prefix,
  onChange,
}) => {
  const [selected, setSelected] = useState(0);

  let filteredSites = filterSites(prefix, sites).slice(0, 4);
  if (prefix === '') {
    filteredSites = [];
  }
  const selectedUrl = filteredSites[selected]?.url ?? null;
  useEffect(() => {
    onChange?.(selectedUrl);
  }, [onChange, selectedUrl]);

  useEffect(() => {
    if (selected >= filteredSites.length) {
      setSelected(Math.max(0, filteredSites.length - 1));
    }
  }, [selected, filteredSites.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      console.log(e.key);
      if (e.repeat) return;
      if (e.key === 'ArrowUp') {
        setSelected((prev) => (prev - 1 + filteredSites.length) % filteredSites.length);
      }
      if (e.key === 'ArrowDown') {
        setSelected((prev) => (prev + 1) % filteredSites.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [filteredSites.length]);

  return (
    <div className="flex flex-col font-mono">
      {filteredSites.map((site, index) => (
        <div
          key={site.url}
          className={`flex flex-col rounded-md px-1 py-0.5 ${selected === index ? 'bg-red-900' : ''}`}
        >
          <div className="text-xs leading-tight">
            <span className="font-bold">
              <span className="text-red-400">{matchPrefix(prefix, site.id)[0]}</span>
              <span>{matchPrefix(prefix, site.id)[1]}</span>
            </span>
            <span className="ml-2 font-bold">{site.title}</span>
          </div>
          <a href={site.url} className="text-xs font-bold leading-tight text-red-300">
            {site.url}
          </a>
        </div>
      ))}
    </div>
  );
};

export const Numpad: FC = () => {
  const numpadRef = useRef<HTMLDivElement>(null);
  const [activeKeys, setActiveKeys] = useState<string[]>([]);
  const [value, setValue] = useState<string>('');
  const url = useRef<string | null>(null);
  const { executeCommand } = useCommands();

  const updateValue = (v: string | ((prev: string) => string)) => {
    setValue((prev) => {
      let newValue: string;
      if (typeof v === 'string') {
        newValue = v;
      } else {
        newValue = v(prev);
      }
      if (newValue.length > prev.length && newValue.length > 16) {
        return prev;
      }
      return newValue;
    });
  };

  const handleOk = useCallback(() => {
    if (!url.current) {
      return;
    }
    if (url.current.startsWith('command://')) {
      executeCommand(url.current);
    } else {
      window.open(url.current, '_blank');
    }
  }, [executeCommand]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat && e.key !== 'Backspace') return;
      if (!VALID_KEYS.includes(e.key)) return;
      setActiveKeys((prev) => [...prev, REVERSE_KEY_MAP[e.key] ?? 'NULL']);
      if (REVERSE_KEY_MAP[e.key] === 'del') {
        updateValue((prev) => prev.slice(0, -1));
        return;
      }
      if (REVERSE_KEY_MAP[e.key] === 'ok') {
        handleOk();
        return;
      }
      updateValue((prev) => prev + (REVERSE_KEY_MAP[e.key] ?? ''));
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.repeat) return;
      if (!VALID_KEYS.includes(e.key)) return;
      setActiveKeys((prev) => prev.filter((key) => key !== REVERSE_KEY_MAP[e.key]));
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleOk]);

  useEffect(() => {
    const handleWindowBlur = () => {
      setActiveKeys([]);
    };
    window.addEventListener('blur', handleWindowBlur);
    return () => {
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, []);

  return (
    <div className="flex select-none flex-col gap-2" ref={numpadRef}>
      <Screen
        value={value}
        onChange={(v) => {
          url.current = v;
        }}
      />
      <div className="flex flex-row gap-2">
        <NumpadButton value="d" active={activeKeys.includes('d')} onClick={() => updateValue((v) => v + 'd')} />
        <NumpadButton value="e" active={activeKeys.includes('e')} onClick={() => updateValue((v) => v + 'e')} />
        <NumpadButton value="f" active={activeKeys.includes('f')} onClick={() => updateValue((v) => v + 'f')} />
        <NumpadButton
          value="del"
          active={activeKeys.includes('del')}
          onClick={() => updateValue((v) => v.slice(0, -1))}
        />
      </div>
      <div className="flex flex-row gap-2">
        <NumpadButton value="7" active={activeKeys.includes('7')} onClick={() => updateValue((v) => v + '7')} />
        <NumpadButton value="8" active={activeKeys.includes('8')} onClick={() => updateValue((v) => v + '8')} />
        <NumpadButton value="9" active={activeKeys.includes('9')} onClick={() => updateValue((v) => v + '9')} />
        <NumpadButton value="c" active={activeKeys.includes('c')} onClick={() => updateValue((v) => v + 'c')} />
      </div>
      <div className="flex flex-row gap-2">
        <NumpadButton value="4" active={activeKeys.includes('4')} onClick={() => updateValue((v) => v + '4')} />
        <NumpadButton value="5" active={activeKeys.includes('5')} onClick={() => updateValue((v) => v + '5')} />
        <NumpadButton value="6" active={activeKeys.includes('6')} onClick={() => updateValue((v) => v + '6')} />
        <NumpadButton value="b" active={activeKeys.includes('b')} onClick={() => updateValue((v) => v + 'b')} />
      </div>
      <div className="flex flex-row gap-2">
        <NumpadButton value="1" active={activeKeys.includes('1')} onClick={() => updateValue((v) => v + '1')} />
        <NumpadButton value="2" active={activeKeys.includes('2')} onClick={() => updateValue((v) => v + '2')} />
        <NumpadButton value="3" active={activeKeys.includes('3')} onClick={() => updateValue((v) => v + '3')} />
        <NumpadButton value="a" active={activeKeys.includes('a')} onClick={() => updateValue((v) => v + 'a')} />
      </div>
      <div className="flex flex-row gap-2">
        <NumpadButton value="0" active={activeKeys.includes('0')} onClick={() => updateValue((v) => v + '0')} />
        <NumpadButton value="x" active={activeKeys.includes('x')} onClick={() => updateValue((v) => v + 'x')} />
        <NumpadButton value="ok" colspan={2} active={activeKeys.includes('ok')} onClick={() => handleOk()} />
      </div>
    </div>
  );
};
