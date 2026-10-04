import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
ScrollTrigger.config({ ignoreMobileResize: true });

// BaseHead's inline script adds `motion` unless the visitor prefers
// reduced motion. Without it the page stays static and fully visible.
const motion = document.documentElement.classList.contains('motion');

// Light inertia for mouse and trackpad only. Touch keeps native scroll —
// smoothing that drifts from the finger feels wrong on phones.
// ScrollSmoother must exist before any ScrollTrigger is created.
const smoother =
	motion && matchMedia('(pointer: fine)').matches
		? ScrollSmoother.create({
				wrapper: '#smooth-wrapper',
				content: '#smooth-content',
				smooth: 0.8,
			})
		: null;

// Styles that only make sense while the smoother is translating the page
// (GPU layer, no rubber-band overscroll) hang off this class — see global.css.
if (smoother) document.documentElement.classList.add('has-smoother');

document.querySelectorAll<HTMLAnchorElement>('a[data-anchor]').forEach((a) => {
	a.addEventListener('click', (e) => {
		const href = a.getAttribute('href');
		if (!href?.startsWith('#')) return;
		e.preventDefault();
		if (smoother) {
			smoother.scrollTo(href, true, 'top top');
		} else {
			document.querySelector(href)?.scrollIntoView({ behavior: motion ? 'smooth' : 'auto' });
		}
	});
});

// The name only fades in; its position changes solely with the scroll.
const playIntro = () => {
	const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
	tl.from('[data-intro="name"]', { autoAlpha: 0, duration: 1 }, 0)
		.fromTo(
			'[data-intro="rule"]',
			{ autoAlpha: 1, scaleX: 0 },
			{ autoAlpha: 1, scaleX: 1, duration: 1.2, ease: 'power3.inOut' },
			0.1
		)
		.from('[data-intro="bar"]', { autoAlpha: 0, duration: 0.8 }, 0.4);

	// Reloaded mid-page: show the finished state rather than replaying.
	if ((smoother?.scrollTop() ?? window.scrollY) > 10) tl.progress(1);
};

const setupReveals = () => {
	const targets = gsap.utils.toArray<HTMLElement>('[data-reveal]');
	gsap.set(targets, { autoAlpha: 0, y: 16 });
	ScrollTrigger.batch(targets, {
		start: 'top 85%',
		once: true,
		onEnter: (batch) =>
			gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power2.out', stagger: 0.08 }),
	});
};

if (motion) {
	// Wait for the web font (up to 1s) so the intro doesn't fade in the
	// fallback face and then swap.
	const fontsOrTimeout = Promise.race([
		document.fonts.ready,
		new Promise((resolve) => setTimeout(resolve, 1000)),
	]);
	fontsOrTimeout.then(() => {
		playIntro();
		setupReveals();
	});
	// A late font swap changes layout; re-measure trigger positions.
	document.fonts.ready.then(() => ScrollTrigger.refresh());
}
