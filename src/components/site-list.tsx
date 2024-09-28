import { FC } from 'react';

export interface Site {
  id: string;
  url: string;
  title: string;
  description: string;
}

export const SiteList: FC<{ sites: Site[] }> = ({ sites }) => {
  return (
    <div className="flex h-full flex-col gap-4 overflow-auto px-4 py-8">
      {sites
        .filter((s) => !s.url.startsWith('command://'))
        .map((site) => (
          <div key={site.url} className="flex w-[390px] flex-col rounded-lg bg-red-950 p-2">
            <div>
              <span className="font-mono text-4xl font-bold">{site.id}</span>
              <span className="ml-2 font-mono text-xl font-bold">{site.title}</span>
            </div>
            <a href={site.url} className="font-mono font-bold text-red-300">
              {site.url}
            </a>
          </div>
        ))}
    </div>
  );
};
