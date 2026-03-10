import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X, Music, Music2, Heart, Star, Sparkles, Play } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const [lightbox, setLightbox] = useState({ active: false, index: 0 });

    const petalContainerRef = useRef(null);
    const heroTitleRef = useRef(null);
    const heroSubtitleRef = useRef(null);
    const heroDateRef = useRef(null);
    const scrollIndicatorRef = useRef(null);
    const heroDividerRef = useRef(null);

    const galleryImages = [
        { src: '/couple-1.png', caption: 'Together Forever' },
        { src: '/couple-2.png', caption: 'Heart of Roses' },
        { src: '/couple-3.png', caption: 'A Rose for You' },
        { src: '/couple-1.png', caption: 'Our Journey' },
        { src: '/couple-2.png', caption: 'Love Blooms' },
        { src: '/couple-3.png', caption: 'Eternal Love' }
    ];

    const timelineData = [
        { title: "The Day We Met", date: "When it all began...", text: "The universe conspired to bring us together, and from that first glance, everything changed forever.", side: "left" },
        { title: "First Adventure Together", date: "Where the magic began...", text: "Our first outing together was filled with laughter, nervous butterflies, and the beginning of something wonderful.", side: "right" },
        { title: "Falling Deeper in Love", date: "Every day together...", text: "With every conversation, every shared meal, every quiet moment together, our love grew stronger and deeper.", side: "left" },
        { title: "Today & Forever", date: "Happy Anniversary! 🎉", text: "Here we are, celebrating our love. Every day with you is a gift I'll always treasure. Here's to forever! 💕", side: "right" }
    ];

    useEffect(() => {
        // Falling Petals / Gold Dust
        const container = petalContainerRef.current;
        const dustCount = window.innerWidth < 768 ? 20 : 40;

        const animateDust = (dust) => {
            const startX = Math.random() * window.innerWidth;
            const duration = 15 + Math.random() * 20;
            const delay = Math.random() * 10;

            gsap.set(dust, { x: startX, y: -20, opacity: 0 });
            gsap.to(dust, {
                y: window.innerHeight + 20,
                x: `+=${(Math.random() - 0.5) * 200}`,
                opacity: 0.4,
                duration,
                delay,
                ease: 'none',
                onComplete: () => animateDust(dust),
            });
        };

        if (container) {
            for (let i = 0; i < dustCount; i++) {
                const dust = document.createElement('div');
                dust.classList.add('petal');
                const size = 2 + Math.random() * 4;
                Object.assign(dust.style, {
                    width: `${size}px`,
                    height: `${size}px`,
                    background: 'var(--color-primary-light)',
                    borderRadius: '50%',
                    filter: 'blur(1px)',
                    boxShadow: '0 0 10px var(--color-primary)',
                    position: 'fixed',
                    pointerEvents: 'none',
                    zIndex: '1',
                });
                container.appendChild(dust);
                animateDust(dust);
            }
        }

        // Hero Animations
        const heroTl = gsap.timeline({ delay: 0.5 });
        heroTl.to(heroSubtitleRef.current, { y: 0, opacity: 1, duration: 1.5, ease: 'power2.out' })
            .to('.title-line', { y: 0, opacity: 1, duration: 1.8, stagger: 0.2, ease: 'power3.out' }, '-=1')
            .to(heroDividerRef.current, { scaleX: 1, opacity: 1, duration: 1.5, ease: 'power2.inOut' }, '-=1')
            .to(heroDateRef.current, { y: 0, opacity: 1, duration: 1.2, ease: 'power2.out' }, '-=0.8')
            .to(scrollIndicatorRef.current, { opacity: 1, y: 0, duration: 1.5, ease: 'power2.out' }, '-=0.5');

        // Scroll Animations - Wish Section
        gsap.to('.wish-card', {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.wish-card',
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });

        gsap.to('.wish-text', {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.3,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.wish-text',
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });

        // Scroll Animations - Gallery
        gsap.to('.gallery-item', {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.gallery-grid',
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });

        // Scroll Animations - Timeline
        gsap.to('.timeline-item', {
            opacity: 1,
            x: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.timeline',
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });

        // Scroll Animations - Video Area
        gsap.to('.video-card', {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.video-grid',
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });

        // Parallax & Active Link
        gsap.utils.toArray('section').forEach(section => {
            ScrollTrigger.create({
                trigger: section,
                start: 'top 50%',
                onEnter: () => setActiveSection(section.id),
                onEnterBack: () => setActiveSection(section.id)
            });
        });

        gsap.to('.hero-overlay', {
            y: 100,
            ease: 'none',
            scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: 1 }
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
            if (container) container.innerHTML = '';
        };
    }, []);

    const openLightbox = (index) => setLightbox({ active: true, index });
    const closeLightbox = () => setLightbox({ ...lightbox, active: false });

    return (
        <div className="app-container">
            <div id="petal-container" ref={petalContainerRef}></div>

            <button className="music-btn" onClick={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? <Music2 className="music-icon" /> : <Music className="music-icon" />}
            </button>

            <nav className={`navbar ${activeSection !== 'hero' ? 'scrolled' : ''}`}>
                <div className="nav-brand">
                    <span className="nav-title">Our Anniversary</span>
                </div>
                <button className="nav-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X /> : <Menu />}
                </button>
                <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                    {['hero', 'wish', 'gallery', 'timeline', 'video'].map(id => (
                        <li key={id}>
                            <a href={`#${id}`} className={`nav-link ${activeSection === id ? 'active' : ''}`}
                                onClick={() => setIsMenuOpen(false)}>
                                {id.charAt(0).toUpperCase() + id.slice(1)}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            <section id="hero" className="hero-section">
                <div className="hero-grain"></div>
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <div className="hero-frame">
                        <img src="/floral-frame.png" alt="Floral Frame" className="hero-frame-img" />
                    </div>
                    <p className="hero-subtitle" ref={heroSubtitleRef}>Celebrating Our Love</p>
                    <h1 className="hero-title" ref={heroTitleRef}>
                        <span className="title-line">Happy</span>
                        <span className="title-line accent">Anniversary</span>
                    </h1>
                    <div className="hero-divider" ref={heroDividerRef} style={{ opacity: 0 }}></div>
                    <p className="hero-date" ref={heroDateRef}>March 6, 2026</p>
                    <div className="hero-scroll-indicator" ref={scrollIndicatorRef}>
                        <span className="scroll-text">Scroll to explore</span>
                        <div className="scroll-arrow">↓</div>
                    </div>
                </div>
            </section>

            <section id="wish" className="wish-section">
                <div className="wish-container">
                    <div className="wish-card" style={{ opacity: 0 }}>
                        <h2 className="wish-heading">My Dearest</h2>
                        <div className="wish-divider">
                            <span className="divider-line"></span>
                            <Heart size={20} fill="currentColor" />
                            <span className="divider-line"></span>
                        </div>
                        <p className="wish-text" style={{ opacity: 0 }}>
                            Every moment with you is a beautiful petal in the garden of our love.
                            Today, as we celebrate another year of togetherness, my heart is overflowing
                            with gratitude and joy.
                        </p>
                        <p className="wish-text" style={{ opacity: 0 }}>
                            You are my sunshine on rainy days, my anchor in stormy seas, and my
                            reason to smile every single day. Thank you for being the most amazing
                            partner anyone could ever wish for.
                        </p>
                        <p className="wish-text" style={{ opacity: 0 }}>
                            Here's to the memories we've made, the laughter we've shared, and the
                            countless adventures that still await us. I love you more than words
                            could ever express.
                        </p>
                        <div className="wish-signature">
                            <p className="signature-text">Forever & Always Yours</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="gallery" className="gallery-section">
                <div className="section-header">
                    <h2 className="section-title">Our Beautiful Moments</h2>
                </div>
                <p className="section-subtitle">A collection of our most treasured memories</p>
                <div className="gallery-grid">
                    {galleryImages.map((img, i) => (
                        <div key={i} className="gallery-item" onClick={() => openLightbox(i)} style={{ opacity: 0 }}>
                            <div className="gallery-frame">
                                <img src={img.src} alt={img.caption} loading="lazy" />
                                <div className="gallery-overlay">
                                    <p className="gallery-caption">{img.caption}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section id="timeline" className="timeline-section">
                <div className="section-header">
                    <h2 className="section-title">Our Love Story</h2>
                </div>
                <p className="section-subtitle">Beautiful milestones of our journey together</p>
                <div className="timeline">
                    {timelineData.map((item, i) => (
                        <div key={i} className={`timeline-item ${item.side}`} style={{ opacity: 0 }}>
                            <div className="timeline-dot"></div>
                            <div className="timeline-card">
                                <h3 className="timeline-title">{item.title}</h3>
                                <p className="timeline-date">{item.date}</p>
                                <p className="timeline-text">{item.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section id="video" className="video-section">
                <div className="section-header">
                    <h2 className="section-title">Our Special Moments</h2>
                </div>
                <p className="section-subtitle">Relive the beautiful moments we've shared</p>
                <div className="video-grid">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="video-card" style={{ opacity: 0 }}>
                            <div className="video-placeholder">
                                <div className="video-play-btn">
                                    <Play size={24} fill="currentColor" />
                                </div>
                                <p className="video-label">{i === 1 ? 'Our First Memory' : i === 2 ? 'Together Always' : 'Our Happy Moments'}</p>
                                <p className="video-sublabel">Click to add your video</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {lightbox.active && (
                <div className="lightbox active" onClick={closeLightbox}>
                    <button className="lightbox-close" onClick={closeLightbox}>✕</button>
                    <div className="lightbox-content" onClick={e => e.stopPropagation()}>
                        <img src={galleryImages[lightbox.index].src} alt="Gallery" />
                        <p className="lightbox-caption">{galleryImages[lightbox.index].caption}</p>
                    </div>
                </div>
            )}

            <footer className="footer">
                <div className="footer-content">
                    <p className="footer-title">Made with 💕 for Our Special Day</p>
                    <p className="footer-quote">"In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine."</p>
                    <p className="footer-author">— Maya Angelou</p>
                </div>
            </footer>
        </div>
    );
};

export default App;
