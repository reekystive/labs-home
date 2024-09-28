import { Site } from '../components/site-list';
import { TOGGLE_SITE_LIST } from './commands.ts';

const allSites: (Site & { hidden?: boolean })[] = [
  { id: '0x23', url: 'https://git.d.reeky.org:233/', title: "Reeky's GitLab Server", description: '今天想写点什么?' },
  { id: '0x39', url: 'https://chat.d.reeky.org:233/', title: 'ChatGPT Next', description: '不要钱的 ChatGPT 来了' },
  {
    id: '0x3f',
    url: 'https://nginx.d.reeky.org:233/',
    title: 'Nginx Proxy Manager',
    description: 'Nginx Proxy Manager 管理面板',
  },
  {
    id: '0x42',
    url: 'https://netdata.d.reeky.org:233/',
    title: 'Netdata Monitor',
    description: '服务器快撑不住了...',
  },
  {
    id: '0x46',
    url: 'https://aria2.d.reeky.org:233/',
    title: 'Aria2 Downloader',
    description: 'Aria2 下载管理器',
    hidden: true,
  },
  {
    id: '0x9c',
    url: 'https://clash.d.reeky.org:233/',
    title: 'Clash Dashboard',
    description: 'Clash 管理面板',
  },
  {
    id: '0x9d',
    url: 'https://drive.d.reeky.org:233/',
    title: '205 Cloud Drive',
    description: '205 云盘',
  },
  {
    id: '0x5d',
    url: 'https://files.d.reeky.org:233/',
    title: 'File Browser',
    description: '文件管理器',
  },
  {
    id: '0x99',
    url: 'https://grafana.d.reeky.org:233/',
    title: 'Grafana Monitor',
    description: 'Grafana 监控面板',
  },
  {
    id: '0x9a',
    url: 'https://hass.d.reeky.org:233/',
    title: 'Home Assistant',
    description: '家庭自动化',
  },
  {
    id: '0x7c',
    url: 'https://mihome.d.reeky.org:233/',
    title: 'MiHome Geek Version',
    description: '米家极客版',
  },
  {
    id: '0x6d',
    url: 'https://portainer.d.reeky.org:233/',
    title: 'Portainer',
    description: '容器管理面板',
  },
  {
    id: '0x6e',
    url: 'https://router.d.reeky.org:233/',
    title: 'ASUS Router',
    description: '路由器管理面板',
  },
  {
    id: '0x4d',
    url: 'https://xboard.d.reeky.org:233/',
    title: 'Xboard',
    description: 'Xboard 管理',
  },
  {
    id: '0xff',
    url: TOGGLE_SITE_LIST,
    title: 'Toggle site list',
    description: 'Show or hide the site list',
  },
];

export const sites: Site[] = allSites.filter((site) => !site.hidden);

const ids = allSites.map((site) => site.id);
if (new Set(ids).size !== ids.length) {
  throw new Error('duplicate site id');
}
