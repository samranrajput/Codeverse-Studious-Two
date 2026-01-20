import React, { useState, useEffect, useRef, useCallback } from "react";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import sideBarLogo from "../../assets/images/logo2.png";
import logo from "../../assets/images/logo.png";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import "./Navbar.css";

// Proper Interface for Nav Items
interface NavItem {
  label: string;
  href: string;
  id: string;
}

const items: NavItem[] = [
  { label: "Home", href: "#home", id: "home" },
  { label: "About Us", href: "#about", id: "about" },
  { label: "Highlights", href: "#highlights", id: "highlights" },
  { label: "Services", href: "#services", id: "services" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Client Reviews", href: "#clientReviews", id: "clientReviews" },
  { label: "Contact Us", href: "#contact", id: "contact" },
];

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const navRef = useRef<HTMLUListElement>(null);

  // ✅ Optimized Click Outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  // ✅ Optimized Scroll Observer
  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      root: null,
      threshold: 0.6,
    };

    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          setActiveSection(id);
          // Professional URL Update (Optional)
          window.history.replaceState(null, "", `#${id}`);
        }
      });
    };

    const observer = new IntersectionObserver(handleObserver, observerOptions);

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // UseCallback for performance on toggle
  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  return (
    <nav className="themed-border">
      <figure className="navbar-logo">
        <img src={logo} alt="Codeverse Studious Navbar Logo" />
      </figure>

      <ul ref={navRef} className={`${menuOpen ? "active" : ""}`}>
        <figure className="sidebar-logo">
          <img src={sideBarLogo} alt="Codeverse Studious Sidebar Logo" />
        </figure>

        {items.map((item) => (
          <li
            key={item.id}
            className={activeSection === item.id ? "active" : ""}
          >
            <a
              href={item.href}
              className="themed-text"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      <div
        className={`theme-toggle-burger-menu-side ${menuOpen ? "active-style" : ""}`}
      >
        <ThemeToggle />
        <div className="burger-menu" onClick={toggleMenu}>
          {menuOpen ? (
            <HiX className="themed-text" style={{ fontSize: "2.5rem" }} />
          ) : (
            <HiMenuAlt4
              className="themed-text"
              style={{ fontSize: "2.5rem" }}
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
