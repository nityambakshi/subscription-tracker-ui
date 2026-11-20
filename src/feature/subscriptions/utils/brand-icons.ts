import type { BrandLogoDetails } from '@/types/brand-logo';
import {
  BiLogoAdobe,
  BiLogoAmazon,
  BiLogoAudible,
  BiLogoAws,
  BiLogoGmail,
  BiLogoHeroku,
  BiLogoLinkedin,
  BiLogoMailchimp,
  BiLogoMicrosoft,
  BiLogoMicrosoftTeams,
  BiLogoSlack,
} from 'react-icons/bi';
import { FcGoogle } from 'react-icons/fc';
import {
  Si1Password,
  SiAirtable,
  SiAnthropic,
  SiApple,
  SiApplemusic,
  SiAppletv,
  SiAsana,
  SiBitwarden,
  SiBox,
  SiCalendly,
  SiClaude,
  SiClickup,
  SiCloudflare,
  SiCrunchyroll,
  SiCursor,
  SiDashlane,
  SiDeezer,
  SiDiscord,
  SiDoordash,
  SiDropbox,
  SiDuolingo,
  SiEvernote,
  SiFigma,
  SiGithub,
  SiGithubcopilot,
  SiGoogledrive,
  SiGrammarly,
  SiHbomax,
  SiHeadspace,
  SiIcloud,
  SiLastpass,
  SiLinear,
  SiLoom,
  SiMax,
  SiMedium,
  SiMiro,
  SiNetflix,
  SiNetlify,
  SiNewyorktimes,
  SiNordvpn,
  SiNotion,
  SiParamountplus,
  SiPatreon,
  SiPaypal,
  SiPeloton,
  SiPerplexity,
  SiShopify,
  SiSoundcloud,
  SiSpotify,
  SiStripe,
  SiSubstack,
  SiTodoist,
  SiTrello,
  SiTwitch,
  SiUber,
  SiVercel,
  SiYoutube,
  SiYoutubemusic,
  SiZoom,
} from 'react-icons/si';
import { TbBrandDisney, TbBrandGoogleOne, TbBrandOpenai } from 'react-icons/tb';

const brandIcons: Record<string, BrandLogoDetails> = {
  netflix: { logo: SiNetflix, color: '#E50914' },
  disneyplus: { logo: TbBrandDisney, color: '#113CCF' },
  max: { logo: SiMax, color: '#002BE7' },
  hbomax: { logo: SiHbomax, color: '#B43EFE' },
  paramountplus: { logo: SiParamountplus, color: '#0064FF' },
  crunchyroll: { logo: SiCrunchyroll, color: '#F47521' },
  twitch: { logo: SiTwitch, color: '#9146FF' },
  youtube: { logo: SiYoutube, color: '#FF0000' },
  youtubemusic: { logo: SiYoutubemusic, color: '#FF0000' },
  appletv: { logo: SiAppletv, color: 'currentColor' },

  spotify: { logo: SiSpotify, color: '#1DB954' },
  applemusic: { logo: SiApplemusic, color: '#FA243C' },
  audible: { logo: BiLogoAudible, color: '#F8991C' },
  soundcloud: { logo: SiSoundcloud, color: '#FF5500' },
  deezer: { logo: SiDeezer, color: '#A238FF' },

  notion: { logo: SiNotion, color: 'currentColor' },
  adobe: { logo: BiLogoAdobe, color: '#FF0000' },
  figma: { logo: SiFigma, color: '#F24E1E' },
  slack: { logo: BiLogoSlack, color: '#4A154B' },
  microsoft: { logo: BiLogoMicrosoft, color: '#00A4EF' },
  zoom: { logo: SiZoom, color: '#2D8CFF' },
  teams: { logo: BiLogoMicrosoftTeams, color: '#6264A7' },
  trello: { logo: SiTrello, color: '#0052CC' },
  asana: { logo: SiAsana, color: '#F06A6A' },
  todoist: { logo: SiTodoist, color: '#E44332' },
  linear: { logo: SiLinear, color: '#5E6AD2' },
  clickup: { logo: SiClickup, color: '#7B68EE' },
  airtable: { logo: SiAirtable, color: '#18BFFF' },
  evernote: { logo: SiEvernote, color: '#00A82D' },
  dropbox: { logo: SiDropbox, color: '#0061FF' },
  box: { logo: SiBox, color: '#0061D5' },
  calendly: { logo: SiCalendly, color: '#006BFF' },
  loom: { logo: SiLoom, color: '#625DF5' },
  miro: { logo: SiMiro, color: '#FFD02F' },
  mailchimp: { logo: BiLogoMailchimp, color: '#FFE01B' },

  openai: { logo: TbBrandOpenai, color: '#10A37F' },
  claude: { logo: SiClaude, color: '#D97757' },
  anthropic: { logo: SiAnthropic, color: '#D4A27F' },
  perplexity: { logo: SiPerplexity, color: '#20808D' },
  cursor: { logo: SiCursor, color: 'currentColor' },
  githubcopilot: { logo: SiGithubcopilot, color: 'currentColor' },
  grammarly: { logo: SiGrammarly, color: '#15C39A' },

  github: { logo: SiGithub, color: 'currentColor' },
  aws: { logo: BiLogoAws, color: '#FF9900' },
  amazon: { logo: BiLogoAmazon, color: '#FF9900' },
  vercel: { logo: SiVercel, color: 'currentColor' },
  netlify: { logo: SiNetlify, color: '#00C7B7' },
  cloudflare: { logo: SiCloudflare, color: '#F38020' },
  heroku: { logo: BiLogoHeroku, color: '#430098' },

  nordvpn: { logo: SiNordvpn, color: '#4687FF' },
  '1password': { logo: Si1Password, color: '#0094F5' },
  bitwarden: { logo: SiBitwarden, color: '#175DDC' },
  lastpass: { logo: SiLastpass, color: '#D32D27' },
  dashlane: { logo: SiDashlane, color: '#0E61F6' },

  duolingo: { logo: SiDuolingo, color: '#58CC02' },
  headspace: { logo: SiHeadspace, color: '#F47D31' },
  peloton: { logo: SiPeloton, color: '#FF3347' },

  medium: { logo: SiMedium, color: 'currentColor' },
  substack: { logo: SiSubstack, color: '#FF6719' },
  newyorktimes: { logo: SiNewyorktimes, color: 'currentColor' },
  patreon: { logo: SiPatreon, color: '#FF424D' },

  paypal: { logo: SiPaypal, color: '#003087' },
  shopify: { logo: SiShopify, color: '#96BF48' },
  stripe: { logo: SiStripe, color: '#635BFF' },

  discord: { logo: SiDiscord, color: '#5865F2' },
  linkedin: { logo: BiLogoLinkedin, color: '#0A66C2' },
  uber: { logo: SiUber, color: 'currentColor' },
  doordash: { logo: SiDoordash, color: '#FF3008' },

  apple: { logo: SiApple, color: 'currentColor' },
  icloud: { logo: SiIcloud, color: '#3693F3' },
  google: { logo: FcGoogle, color: '#4285F4' },
  googleone: { logo: TbBrandGoogleOne, color: '#4285F4' },
  gmail: { logo: BiLogoGmail, color: '#EA4335' },
  googledrive: { logo: SiGoogledrive, color: '#4285F4' },
};

/** Only aliases when there is no distinct product icon — same mark as the target. */
const aliases: Record<string, string> = {
  primevideo: 'amazon',
  amazonprime: 'amazon',
  disney: 'disneyplus',
  adobecc: 'adobe',
  adobecreativecloud: 'adobe',
  icloudplus: 'icloud',
  youtubepremium: 'youtube',
  hbo: 'hbomax',
  paramount: 'paramountplus',
  microsoft365: 'microsoft',
  office: 'microsoft',
  office365: 'microsoft',
  chatgpt: 'openai',
  nyt: 'newyorktimes',
};

export const DEFAULT_LOGO_KEY = 'default';

export function normaliseName(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '');
}

// Maps the typed name to a logo key. Used by the form, and stored as logoKey.
export function findBrandKey(name: string): string {
  const normalised = normaliseName(name);
  if (!normalised) return DEFAULT_LOGO_KEY;

  if (brandIcons[normalised]) return normalised;
  if (aliases[normalised]) return aliases[normalised];

  // "Netflix Premium" starts with "netflix"; keys under 4 characters are skipped
  const prefixMatch = Object.keys(brandIcons).find(
    (key) => key.length >= 4 && normalised.startsWith(key)
  );

  return prefixMatch ?? DEFAULT_LOGO_KEY;
}

// The table reads this. Primary brands plus aliases, so every key resolves.
export const iconsBySubscription: Record<string, BrandLogoDetails> = {
  ...brandIcons,
  ...Object.fromEntries(
    Object.entries(aliases).flatMap(([alias, target]) =>
      brandIcons[target] ? [[alias, brandIcons[target]]] : []
    )
  ),
};
