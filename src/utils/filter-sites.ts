import { Site } from '../components/site-list.tsx';

export const filterSites = (prefix: string, sites: Site[]) => {
  return sites.filter((site) => site.id.startsWith(prefix));
};

export const matchPrefix = (prefix: string, full: string) => {
  if (full.startsWith(prefix)) {
    return [prefix, full.slice(prefix.length)];
  } else {
    return ['', full];
  }
};
