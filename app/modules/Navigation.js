"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'subscribe', label: 'Subskrypcja', href: '/subscribe' },
    { id: 'unsubscribe', label: 'Anulowanie', href: '/unsubscribe' },
    { id: 'contact', label: 'Kontakt', href: '/contact' }
  ];

  const getActiveItem = () => {
    const activeItem = menuItems.find(item => item.href === pathname);
    return activeItem ? activeItem.id : (pathname === '/' ? 'home' : '');
  };

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when navigating
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  if (!isMounted) return null;

  const activeItemId = getActiveItem();

  const navStyles = {
    nav: {
      backgroundColor: isScrolled ? 'rgba(240, 253, 244, 0.98)' : 'rgba(240, 253, 244, 0.85)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: isScrolled ? '1px solid rgba(226, 232, 240, 0.8)' : '1px solid transparent',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      width: '100%',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1.5rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: isScrolled ? '5.5rem' : '7rem',
      transition: 'height 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      transition: 'transform 0.3s ease',
      transform: isScrolled ? 'scale(0.9)' : 'scale(1)',
    },
    desktopMenu: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      backgroundColor: 'rgba(241, 245, 249, 0.5)',
      padding: '0.25rem',
      borderRadius: '9999px',
      border: '1px solid rgba(226, 232, 240, 0.5)',
    },
    menuItem: {
      padding: '0.5rem 1.25rem',
      fontSize: '0.875rem',
      fontWeight: '600',
      textDecoration: 'none',
      color: '#64748b',
      borderRadius: '9999px',
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
    },
    activeMenuItem: {
      color: '#fff',
      backgroundColor: '#3c8500',
      boxShadow: '0 4px 6px -1px rgba(60, 133, 0, 0.2), 0 2px 4px -1px rgba(60, 133, 0, 0.1)',
    },
    mobileToggle: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '44px',
      height: '44px',
      borderRadius: '12px',
      color: '#1e293b',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
      border: '1px solid rgba(203, 213, 225, 0.8)',
      cursor: 'pointer',
      transition: 'all 0.2s',
      zIndex: 1001,
      padding: 0,
    },
    mobileOverlay: {
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.2)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      opacity: isOpen ? 1 : 0,
      visibility: isOpen ? 'visible' : 'hidden',
      transition: 'all 0.4s ease',
      zIndex: 1000,
    },
    mobileMenu: {
      position: 'fixed',
      top: '0',
      right: '0',
      width: '80%',
      maxWidth: '300px',
      height: '100vh',
      backgroundColor: '#fff',
      boxShadow: '-10px 0 25px -5px rgba(0, 0, 0, 0.1)',
      padding: '7rem 1.5rem 1.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
      transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.5s',
      zIndex: 1000,
      visibility: isOpen ? 'visible' : 'hidden',
      pointerEvents: isOpen ? 'auto' : 'none',
    },
    mobileMenuItem: {
      padding: '0.875rem 1.25rem',
      borderRadius: '12px',
      fontSize: '1rem',
      fontWeight: '600',
      textDecoration: 'none',
      color: '#475569',
      transition: 'all 0.2s',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
    },
    activeMobileMenuItem: {
      color: '#3c8500',
      backgroundColor: 'rgba(60, 133, 0, 0.05)',
      border: '1px solid rgba(60, 133, 0, 0.1)',
    }
  };

  return (
    <nav style={navStyles.nav}>
      <div style={navStyles.container}>
        <div style={navStyles.logoContainer}>
          <Link href="/" title="TrashAlert Home">
            <Image
              src='/logo.png'
              alt='TrashAlert Logo'
              width={180}
              height={90}
              style={{ objectFit: 'contain', mixBlendMode: 'multiply' }}
              priority
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="desktop-nav" style={navStyles.desktopMenu}>
          {menuItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              style={{
                ...navStyles.menuItem,
                ...(activeItemId === item.id ? navStyles.activeMenuItem : {})
              }}
              className="nav-link"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile menu toggle */}
        <button
          className="mobile-toggle"
          onClick={() => setIsOpen(!isOpen)}
          style={navStyles.mobileToggle}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile Menu Overlay & Drawer */}
      <div
        style={navStyles.mobileOverlay}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />
      <div style={navStyles.mobileMenu}>
        {menuItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            style={{
              ...navStyles.mobileMenuItem,
              ...(activeItemId === item.id ? navStyles.activeMobileMenuItem : {})
            }}
          >
            {item.label}
          </Link>
        ))}
      </div>

      <style jsx>{`
        .nav-link:hover:not(.active) {
          color: #1e293b;
          background-color: rgba(255, 255, 255, 0.8);
        }
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
