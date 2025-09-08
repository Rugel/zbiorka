"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

// Ikony jako komponenty (zamiennik lucide-react)
const MenuIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="white" strokeWidth="4">
    <line x1="6" y1="12" x2="42" y2="12"></line>
    <line x1="6" y1="24" x2="42" y2="24"></line>
    <line x1="6" y1="36" x2="42" y2="36"></line>
  </svg>
);

const CloseIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="white" strokeWidth="4">
    <line x1="36" y1="12" x2="12" y2="36"></line>
    <line x1="12" y1="12" x2="36" y2="36"></line>
  </svg>
);

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { id: 'home', label: 'Strona główna', href: '/' },
    { id: 'about', label: 'Subskrypcja', href: '/subscribe' },
    { id: 'services', label: 'Anulowanie', href: '/unsubscribe' },
    { id: 'contact', label: 'Kontakt', href: '/contact' }
  ];

  // Sprawdź który element jest aktywny na podstawie aktualnej ścieżki
  const getActiveItem = () => {
    const activeItem = menuItems.find(item => item.href === pathname);
    return activeItem ? activeItem.id : 'home';
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const styles = {
    nav: {
      backgroundColor: '#3C8500',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      borderBottom: '1px solid #e5e7eb'
    },
    container: {
      maxWidth: '1380px',
      margin: '0 auto',
      padding: '0 1rem',
    },
    navbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '8rem'
    },
    desktopMenu: {
      display: 'flex',
      alignItems: 'center',
      gap: '2rem'
    },
    menuItem: {
      position: 'relative',
      padding: '0.5rem 0.75rem',
      fontSize: '1.2rem',
      fontWeight: '600',
      textDecoration: 'none',
      color: '#ffffff',
      cursor: 'pointer'
    },
    activeIndicator: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '2px',
      backgroundColor: '#ffffff',
      borderRadius: '9999px'
    },
    mobileButton: {
      fontSize: '1.5rem',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0.5rem',
      borderRadius: '0.375rem',
      color: '#ffffff',
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    mobileMenu: {
      transition: 'all 0.3s ease-in-out',
      overflow: 'hidden',
      backgroundColor: '#ffffff',
      borderTop: '1px solid #e5e7eb'
    },
    mobileMenuContent: {
      padding: '0.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.25rem',
      alignItems: 'center'
    },
    mobileMenuItem: {
      display: 'block',
      padding: '0.5rem 0.75rem',
      borderRadius: '0.375rem',
      fontSize: '1.2rem',
      fontWeight: '600',
      textDecoration: 'none',
      transition: 'all 0.2s',
      color: 'black',
      
    },
    activeMobileMenuItem: {
      color: '#2563eb',
      backgroundColor: '#eeeeee'
    }
  };

  // Nie renderuj niczego dopóki komponent nie jest zamontowany (hydration safety)
  if (!isMounted) {
    return null;
  }

  const activeItemId = getActiveItem();

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <div style={styles.navbar}>
          {/* Logo */}
          <div>
            <Link href="/" title="Przejdź na stronę główną"><Image src={'/logo.png'} alt='Logo' width={130} height={130} /></Link>
          </div>

          {/* Desktop Menu */}
          <div className="desktop-menu" style={styles.desktopMenu}>
            {menuItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                style={{
                  ...styles.menuItem,
                  ...(activeItemId === item.id ? styles.activeMenuItem : {})
                }}
              >
                {item.label}
                {activeItemId === item.id && (
                  <span style={styles.activeIndicator}></span>
                )}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="mobile-button">
            <button
              onClick={toggleMenu}
              style={styles.mobileButton}
              onMouseEnter={(e) => {
                e.target.style.color = '#111827';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#374151';
              }}
            >
              {isOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div style={{
        ...styles.mobileMenu,
        maxHeight: isOpen ? '16rem' : '0',
        opacity: isOpen ? '1' : '0'
      }}>
        <div style={styles.mobileMenuContent}>
          {menuItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => setIsOpen(false)} // Zamknij menu po kliknięciu
              style={{
                ...styles.mobileMenuItem,
                ...(activeItemId === item.id ? styles.activeMobileMenuItem : {})
              }}
              onMouseEnter={(e) => {
                if (activeItemId !== item.id) {
                  e.target.style.backgroundColor = '#f9fafb';
                  e.target.style.color = '#111827';
                }
              }}
              onMouseLeave={(e) => {
                if (activeItemId !== item.id) {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#374151';
                }
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Media Query dla responsywności */}
      <style jsx>{`
        @media (min-width: 768px) {
          .desktop-menu {
            display: flex !important;
          }
          .mobile-button {
            display: none !important;
          }
        }
        @media (max-width: 767px) {
          .desktop-menu {
            display: none !important;
          }
          .mobile-button {
            display: block !important;
          }
        }
      `}</style>
    </nav>
  );
}