import { DM_Serif_Text, Roboto_Mono, Rubik } from 'next/font/google';

const rubik = Rubik({
  display: 'swap',
  subsets: ['latin'],
  weight: '400', 
  variable: '--font-family-body',
});

const dmSerifText = DM_Serif_Text({
  display: 'swap',
  subsets: ['latin'],
  weight: '400',
  variable: '--font-family-heading',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-family-mono',
});

export const fonts = [rubik, dmSerifText, robotoMono];
