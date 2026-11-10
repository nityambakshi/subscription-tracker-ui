import type { BrandLogoDetails } from '@/types/brand-logo';
import { BiLogoAdobe } from 'react-icons/bi';
import { SiIcloud, SiNetflix, SiNotion, SiSpotify } from 'react-icons/si';

export const iconsBySubscription: Record<string, BrandLogoDetails> = {
  netflix: {
    logo: SiNetflix,
    color: '#E50914',
  },
  adobe: {
    logo: BiLogoAdobe,
    color: '#FF0000',
  },
  spotify: {
    logo: SiSpotify,
    color: '#1DB954',
  },
  icloud: {
    logo: SiIcloud,
    color: '#3693F3',
  },
  notion: {
    logo: SiNotion,
    color: '#FFFFFF',
  },
};
