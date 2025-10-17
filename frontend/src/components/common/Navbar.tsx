import React, { useState, useEffect } from "react";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/solid";

interface NavLink {
  name: string;
  href: string;
}

interface MegaMenuSection {
  title: string;
  links: NavLink[];
}

interface MegaMenuSectionProps {
  section: MegaMenuSection;
  isMobile?: boolean;
}

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isExtraMenuOpen, setIsExtraMenuOpen] = useState<boolean>(false);
  const [isMobileExtraMenuOpen, setIsMobileExtraMenuOpen] =
    useState<boolean>(false);

  const navLinks: NavLink[] = [
    { name: "Wydarzenia", href: "TBA" },
    { name: "Projekty", href: "/ProjectsPage" },
    { name: "O nas", href: "/AboutPage" },
    { name: "Aktualności", href: "TBA" },
  ];

  const megaMenuSections: MegaMenuSection[] = [
    {
      title: "Działalność Koła",
      links: [
        { name: "Statut", href: "/TBA" },
        { name: "Zarząd", href: "/TBA" },
        { name: "TBA", href: "/TBA" },
        { name: "TBA", href: "/TBA" },
      ],
    },
    {
      title: "Nasze Media",
      links: [
        { name: "Facebook", href: "#" },
        { name: "Instagram", href: "#" },
        { name: "Discord", href: "#" },
      ],
    },
    {
      title: "Projekty Wewnętrzne",
      links: [
        { name: "Gutenberg", href: "/TBA" },
        { name: "Mordor", href: "/TBA" },
      ],
    },
    {
      title: "Kontakt",
      links: [
        { name: "Formularz Kontaktowy", href: "/TBA" },
        { name: "TBA", href: "/TBA" },
      ],
    },
    {
      title: "Dla Studentów",
      links: [
        { name: "TBA", href: "/TBA" },
        { name: "TBA", href: "/TBA" },
        { name: "TBA", href: "/TBA" },
      ],
    },
    {
      title: "Zasoby",
      links: [
        { name: "TBA", href: "/TBA" },
        { name: "TBA", href: "/TBA" },
        { name: "TBA", href: "/TBA" },
      ],
    },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsExtraMenuOpen(false);
      } else {
        setIsMobileMenuOpen(false);
        setIsMobileExtraMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileExtraMenuOpen(false);
  };

  const navStyles = isScrolled
    ? "bg-white/95 shadow-lg border-transparent"
    : "bg-transparent border border-black/50";

  const MegaMenuSection: React.FC<MegaMenuSectionProps> = ({
    section,
    isMobile = false,
  }) => (
    <div className={isMobile ? "text-center" : ""}>
      <h3
        className={`font-medium text-gray-900 font-inter ${
          isMobile ? "text-lg mb-4" : "text-base mb-4"
        }`}
      >
        {section.title}
      </h3>
      <div className="space-y-3">
        {section.links.map((link: NavLink) => (
          <a
            key={link.name}
            href={link.href}
            onClick={isMobile ? closeMobileMenu : undefined}
            className={`block text-gray-700 hover:text-gray-900 transition-colors py-1 ${
              isMobile ? "text-base" : "text-sm"
            }`}
          >
            {link.name}
          </a>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-7xl z-50 rounded-full p-2 transition-all duration-300 ${navStyles}`}
      >
        <div className="flex items-center justify-between px-6">
          <div className="flex-shrink-0">
            <a href="/">
              <img
                className="h-10 w-auto"
                src="/src/assets/images/base/logo-ksi.svg"
                alt="KSI Logo"
              />
            </a>
          </div>

          <div className="hidden md:flex items-center gap-x-6 font-inter">
            {navLinks.map((link: NavLink) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm leading-6 text-gray-900 hover:text-gray-700 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => setIsExtraMenuOpen(!isExtraMenuOpen)}
              className="text-sm text-gray-900 hover:text-gray-700 transition-colors flex items-center gap-1"
            >
              Więcej
              {isExtraMenuOpen ? (
                <ChevronUpIcon className="h-3 w-3" />
              ) : (
                <ChevronDownIcon className="h-3 w-3" />
              )}
            </button>
          </div>

          <div className="hidden md:block">
            <a
              href="/join"
              className="rounded-xl bg-slate-800 px-4 py-2 text-sm font-medium font-inter text-white shadow-sm hover:bg-slate-700 transition-colors"
            >
              Dołącz do nas
            </a>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-1 hover:bg-gray-100 rounded-md transition-colors"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Desktop Menu */}
      {isExtraMenuOpen && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 w-[90%] max-w-7xl z-40">
          <div className="origin-top rounded-xl bg-white shadow-lg border border-black/50 p-8 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-10">
              {megaMenuSections.map(
                (section: MegaMenuSection, index: number) => (
                  <MegaMenuSection key={index} section={section} />
                )
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white md:hidden overflow-y-auto">
          <div className="sticky top-0 bg-white flex items-center justify-between p-6 border-b border-gray-100 z-10">
            <a href="/" onClick={closeMobileMenu}>
              <img
                className="h-10 w-auto"
                src="/src/assets/images/base/logo-ksi.svg"
                alt="KSI Logo"
              />
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="min-h-[calc(100vh-80px)] flex flex-col">
            <div className="flex-1 px-8 py-12">
              <div className="text-center space-y-8">
                <div className="space-y-6">
                  {navLinks.map((link: NavLink) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={closeMobileMenu}
                      className="block text-2xl font-semibold text-gray-900 hover:text-gray-600 transition-colors py-2"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>

                <div className="space-y-6">
                  <button
                    onClick={() =>
                      setIsMobileExtraMenuOpen(!isMobileExtraMenuOpen)
                    }
                    className="flex items-center justify-center gap-2 text-2xl font-semibold text-gray-900 hover:text-gray-600 transition-colors py-2 mx-auto"
                  >
                    Więcej
                    {isMobileExtraMenuOpen ? (
                      <ChevronUpIcon className="h-5 w-5" />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5" />
                    )}
                  </button>

                  {isMobileExtraMenuOpen && (
                    <div className="mt-6 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="grid grid-cols-1 gap-8 text-left max-w-sm mx-auto">
                        {megaMenuSections.map(
                          (section: MegaMenuSection, index: number) => (
                            <MegaMenuSection
                              key={index}
                              section={section}
                              isMobile={true}
                            />
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 text-center">
              <a
                href="/join"
                onClick={closeMobileMenu}
                className="inline-block rounded-xl bg-slate-800 px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-slate-700 transition-colors"
              >
                Dołącz do nas
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Navbar;
