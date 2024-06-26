import {
  Inter,
  Lusitana,
  Roboto_Mono,
  Baloo_Bhaijaan_2,
  DM_Sans,
  Nanum_Gothic_Coding,
  Nanum_Gothic,
  Lato,
  Space_Mono,
} from 'next/font/google';

export const inter = Inter({ subsets: ['latin'] });

export const lusitana = Lusitana({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
});

export const BB = Baloo_Bhaijaan_2({
  subsets: ['latin'],
  display: 'swap',
});

export const DMSANS = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
});

export const nanum_coding = Nanum_Gothic_Coding({
    subsets: ['latin'],
    display: 'swap',
    weight: '400'
})

export const lato = Lato({
    subsets: ['latin'],
    display: 'swap',
    weight: '400'
})

export const space_Mono = Space_Mono({
    subsets: ['latin'],
    display: 'swap',
    weight: '400'
})