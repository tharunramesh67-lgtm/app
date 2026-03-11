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
        { src: '/couple-1.png', caption: 'You and me, always' },
        { src: '/couple-2.png', caption: 'Beautiful memories' },
        { src: '/couple-3.png', caption: 'Just for you' },
        { src: '/couple-1.png', caption: 'Our path together' },
        { src: '/couple-2.png', caption: 'Growing together' },
        { src: '/couple-3.png', caption: 'My forever love' }
    ];

    const timelineData = [
        { title: "Where It All Began", date: "The day my life changed", text: "I knew from the very first moment we met that you were someone special. My life has been better every single day since then.", side: "left" },
        { title: "Our First Adventure", date: "Our first little trip together", text: "I couldn't stop smiling that whole day. I knew right then that I wanted to share many more adventures just like that with you.", side: "right" },
        { title: "Growing Closer", date: "Finding my home in you", text: "As time went by, my love for you just kept growing. You've become my home, my heart, and my absolute favorite part of every day.", side: "left" },
        { title: "Happy Anniversary", date: "To us, forever", text: "I'm so proud of the life we've built together. Happy Anniversary, my love—I can't wait to see what our future holds.", side: "right" }
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
                    <p className="hero-subtitle" ref={heroSubtitleRef}>Every Day Is a Gift With You</p>
                    <h1 className="hero-title" ref={heroTitleRef}>
                        <span className="title-line">Our</span>
                        <span className="title-line accent">Beautiful Story</span>
                    </h1>
                    <div className="hero-divider" ref={heroDividerRef} style={{ opacity: 0 }}></div>
                    <p className="hero-date" ref={heroDateRef}>March 11, 2026</p>
                    <div className="hero-scroll-indicator" ref={scrollIndicatorRef}>
                        <span className="scroll-text">Looking back at us</span>
                        <div className="scroll-arrow">↓</div>
                    </div>
                </div>
            </section>

            <section id="wish" className="wish-section">
                <div className="wish-container">
                    <div className="wish-card" style={{ opacity: 0 }}>
                        <h2 className="wish-heading">To My Everything chikkkuh</h2>
                        <div className="wish-divider">
                            <span className="divider-line"></span>
                            <Heart size={20} fill="currentColor" />
                            <span className="divider-line"></span>
                        </div>
                        <p className="wish-text" style={{ opacity: 0 }}>
                            Being with you is the best thing I've ever been on. Every single day 
                            we spend together makes me so grateful for what we have.
                        </p>
                        <p className="wish-text" style={{ opacity: 0 }}>
                            You're my best friend and the one and only person I can always count on. You 
                            make my entire world so much brighter just by being in it.
                        </p>
                        <p className="wish-text" style={{ opacity: 0 }}>
                            I treasure every memory we've made together, and I'm so excited for 
                            everything that's still to come. I love you more than words can say.
                        </p>
                        <div className="wish-signature">
                            <p className="signature-text">Forever Yours bubu</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="gallery" className="gallery-section">
                <div className="section-header">
                    <h2 className="section-title">Moments I Treasure</h2>
                </div>
                <p className="section-subtitle">A look at some of our favorite days together</p>
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
                    <h2 className="section-title">Our Special Journey</h2>
                </div>
                <p className="section-subtitle">The steps that led me to you</p>
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
                    <h2 className="section-title">Moments We'll Never Forget</h2>
                </div>
                <p className="section-subtitle">Looking back at our happiest times</p>
                <div className="video-grid">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="video-card" style={{ opacity: 0 }}>
                            <div className="video-placeholder">
                                <div className="video-play-btn">
                                    <Play size={24} fill="currentColor" />
                                </div>
                                <p className="video-label">{i === 1 ? 'Our First Memory' : i === 2 ? 'Together Always' : 'Our Happy Moments'}</p>
                                <p className="video-sublabel"></p>
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
                    <p className="footer-title">Made with all my love for you</p>
                    <p className="footer-quote">"In all the universe, there is no one for me like you. and there is no one for you like me. we are the like soil and the root of a tree."</p>
                    <p className="footer-author">— Tharun</p>
                </div>
            </footer>
        </div>
    );
};

export default App;
