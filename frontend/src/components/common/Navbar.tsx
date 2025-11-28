import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Transition } from '@headlessui/react';
import { 
  Bars3Icon, XMarkIcon, ChevronDownIcon, CodeBracketIcon, BookOpenIcon, EnvelopeIcon, PrinterIcon 
} from '@heroicons/react/24/outline';
import { FaFacebook, FaInstagram, FaGithub } from 'react-icons/fa';
import logoKsi from "../../assets/images/base/logo-ksi.svg"

const DashboardLinkComponent: React.FC<{ link: DashboardLink; onClick?: () => void }> = ({ link, onClick }) => (
  <a
    href={link.href}
    onClick={onClick}
    target={link.href.startsWith('http') ? '_blank' : undefined}
    rel="noopener noreferrer"
    className="group flex flex-col items-center justify-center text-center p-4 rounded-2xl bg-gray-50/75 hover:bg-gray-100 transition-colors duration-200 w-32"
  >
    <link.icon className="h-7 w-7 text-gray-500 group-hover:text-slate-800 transition-colors duration-200" />
    <span className="mt-2 text-sm font-medium text-gray-800">{link.name}</span>
  </a>
);

interface NavLink {
  name: string;
  href: string;
}

interface DashboardLink {
  name: string;
  href: string;
  icon: React.ElementType;
}

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isExtraMenuOpen, setIsExtraMenuOpen] = useState<boolean>(false);
  const [isMobileExtraMenuOpen, setIsMobileExtraMenuOpen] = useState<boolean>(false);
  
  const extraMenuRef = useRef<HTMLDivElement>(null);
  const extraMenuButtonRef = useRef<HTMLButtonElement>(null);

  const navLinks: NavLink[] = [
    { name: 'Wydarzenia', href: '/events' },
    { name: 'Projekty', href: '/projects' },
    { name: 'O nas', href: '/about' },
    { name: 'Aktualności', href: '/news' },
  ];

  const dashboardLinks: DashboardLink[] = [
    { name: 'Facebook', href: 'https://facebook.com/ksi.uj', icon: FaFacebook },
    { name: 'Instagram', href: 'https://instagram.com/ksiuj', icon: FaInstagram },
    { name: 'GitHub', href: 'https://github.com/KSIUJ', icon: FaGithub },
    { name: 'Mordor', href: 'http://mordor.ksi.ii.uj.edu.pl/', icon: CodeBracketIcon }, 
    { name: 'Informator', href: 'https://informator.ksi.ii.uj.edu.pl', icon: BookOpenIcon },
    { name: 'Gutenberg', href: 'http://ksi.sh/print', icon: PrinterIcon },
    { name: 'Kontakt', href: 'mailto:ksi@uj.edu.pl', icon: EnvelopeIcon },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (extraMenuRef.current && !extraMenuRef.current.contains(event.target as Node) && extraMenuButtonRef.current && !extraMenuButtonRef.current.contains(event.target as Node)) {
        setIsExtraMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
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
  const navStyles = 'bg-white/95 shadow-lg border-transparent';

  return (
    <>
      <nav className={`fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-7xl z-50 rounded-full p-2 transform-gpu transition-all duration-300 ${navStyles}`}>
        <div className="flex items-center justify-between px-6">
          <div className="flex-shrink-0">
            <Link to="/">
              <img className="h-10 w-auto" src={logoKsi} alt="KSI Logo" />
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-x-6 font-inter">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.href} className="text-sm leading-6 text-gray-900 hover:text-gray-700 transition-colors">
                {link.name}
              </Link>
            ))}
            <button ref={extraMenuButtonRef} onClick={() => setIsExtraMenuOpen(!isExtraMenuOpen)} className="text-sm text-gray-900 hover:text-gray-700 transition-colors flex items-center gap-1">
              Linki
              <ChevronDownIcon className={`h-3 w-3 transition-transform duration-200 ${isExtraMenuOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
          <div className="hidden md:block">
            <a href="https://discord.gg/UZks6SHafQ" target="_blank" rel="noopener noreferrer" className="rounded-full bg-slate-800 px-6 py-2 text-sm font-medium font-inter text-white shadow-sm hover:bg-slate-700 transition-colors">
              Dołącz do nas
            </a>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(true)} className="p-1 hover:bg-gray-100 rounded-md transition-colors">
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>
      <Transition show={isExtraMenuOpen} as={React.Fragment} enter="transition ease-out duration-300" enterFrom="opacity-0 scale-95 -translate-y-2" enterTo="opacity-100 scale-100 translate-y-0" leave="transition ease-in duration-200" leaveFrom="opacity-100 scale-100 translate-y-0" leaveTo="opacity-0 scale-95 -translate-y-2">
        <div ref={extraMenuRef} className="fixed top-24 left-1/2 -translate-x-1/2 w-[90%] max-w-7xl z-40">
          <div className="origin-top rounded-3xl bg-white shadow-lg border border-black/10 p-6">
            <div className="flex flex-wrap justify-center gap-4">
              {dashboardLinks.map((link) => (<DashboardLinkComponent key={link.name} link={link} />))}
            </div>
          </div>
        </div>
      </Transition>
      <Transition show={isMobileMenuOpen} as={React.Fragment} enter="transition ease-in-out duration-300 transform" enterFrom="translate-x-full" enterTo="translate-x-0" leave="transition ease-in-out duration-300 transform" leaveFrom="translate-x-0" leaveTo="translate-x-full">
        <div className="fixed inset-0 z-50 bg-white md:hidden overflow-y-auto">
          <div className="sticky top-0 bg-white flex items-center justify-between p-6 border-b border-gray-100 z-10">
            <Link to="/" onClick={closeMobileMenu}>
              <img className="h-10 w-auto" src={logoKsi} alt="KSI Logo" />
            </Link>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="min-h-[calc(100vh-80px)] flex flex-col">
            <div className="flex-1 px-8 py-12">
              <div className="text-center space-y-8">
                <div className="space-y-6">
                  {navLinks.map((link) => (<Link key={link.name} to={link.href} onClick={closeMobileMenu} className="block text-2xl font-semibold text-gray-900 hover:text-gray-600 transition-colors py-2">{link.name}</Link>))}
                </div>
                <div className="space-y-6">
                  <button onClick={() => setIsMobileExtraMenuOpen(!isMobileExtraMenuOpen)} className="flex items-center justify-center gap-2 text-2xl font-semibold text-gray-900 hover:text-gray-600 transition-colors py-2 mx-auto">
                    Linki <ChevronDownIcon className={`h-5 w-5 transition-transform duration-200 ${isMobileExtraMenuOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <Transition show={isMobileExtraMenuOpen} enter="transition ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="transition ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                    <div className="mt-6">
                      <div className="flex flex-wrap justify-center gap-4 max-w-sm mx-auto">
                        {dashboardLinks.map((link) => (<DashboardLinkComponent key={link.name} link={link} onClick={closeMobileMenu} />))}
                      </div>
                    </div>
                  </Transition>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 text-center">
              <a href="https://discord.gg/UZks6SHafQ" target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu} className="inline-block rounded-full bg-slate-800 px-6 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-700 transition-colors">
                Dołącz do nas
              </a>
            </div>
          </div>
        </div>
      </Transition>
    </>
  );
};

export default Navbar;