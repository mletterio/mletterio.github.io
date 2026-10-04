// Site-wide data. Import from any component with `import { … } from '../consts'`.

export const SITE_TITLE = 'Michael Letterio';
export const SITE_DESCRIPTION = 'Photographer and software engineer in Boston.';

export const SOCIAL_LINKS = [
	{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/michael-letterio' },
	{ label: 'GitHub', href: 'https://github.com/mletterio' },
];

// Page sections, in order. Each <Section id="…"> looks itself up here, so
// the numbered running heads follow this order — reorder or add entries to
// change them.
export type SectionMeta = { id: string; label: string; subtitle?: string };

export const SECTIONS: SectionMeta[] = [
	{ id: 'about', label: 'About', subtitle: 'Short introduction' },
	{ id: 'work', label: 'Work', subtitle: 'Recent projects' },
];

// Rows for <IndexList>. Other lists (e.g. experience: role / organization /
// years) can reuse the same shape.
export type IndexRow = { title: string; description: string; year: string; href?: string };

export const WORK: IndexRow[] = [
	{
		title: 'SailBoard',
		description: 'Display relevant weather info for sailing in Boston Harbor on an ePaper display.',
		year: '2024',
		href: 'https://github.com/mletterio/SailBoard',
	},
	{
		title: 'This site',
		description: 'Portfolio built with Astro and GSAP.',
		year: '2026',
		href: 'https://github.com/mletterio/mletterio.github.io',
	},
];
