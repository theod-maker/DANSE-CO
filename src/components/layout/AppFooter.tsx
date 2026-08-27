'use client'
import Link from 'next/link';
import { fallbackSiteInfo } from '../../lib/fallbackContent';

const InstagramIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const FacebookIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const AppFooter: React.FC = () => {
  const siteInfo = fallbackSiteInfo;

  return (
    <footer className="bg-[#F5F0EA] border-t border-[#18102E]/8 px-6 py-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-5 md:gap-8">
        <div>
          <Link href="/">
            <span
              style={{ fontFamily: "'Instrument Serif', serif" }}
              className="text-[#18102E] text-xl tracking-tight"
            >
              Dans'&amp;Co
            </span>
          </Link>
          <p className="text-[#18102E]/30 text-xs mt-2">{siteInfo.footerTagline}</p>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-3 md:gap-x-8 text-sm text-[#18102E]/40">
          <Link href="/planning" className="hover:text-[#6C5CA8] transition-colors">Planning</Link>
          <Link href="/pricing" className="hover:text-[#6C5CA8] transition-colors">Tarifs</Link>
          <Link href="/instructors" className="hover:text-[#6C5CA8] transition-colors">Les membres</Link>
          <Link href="/actualites" className="hover:text-[#6C5CA8] transition-colors">Actualités</Link>
          <Link href="/disciplines" className="hover:text-[#6C5CA8] transition-colors">Les danses</Link>
          <Link href="/histoire" className="hover:text-[#6C5CA8] transition-colors">L'histoire</Link>
          <Link href="/contact" className="hover:text-[#6C5CA8] transition-colors">Contact</Link>
        </div>

        <div className="flex gap-3">
          {siteInfo.instagramUrl && (
            <a href={siteInfo.instagramUrl} target="_blank" rel="noopener noreferrer" className="liquid-glass rounded-full p-2.5 text-[#18102E]/40 hover:text-[#6C5CA8] transition-colors">
              <InstagramIcon size={16} />
            </a>
          )}
          {siteInfo.facebookUrl && (
            <a href={siteInfo.facebookUrl} target="_blank" rel="noopener noreferrer" className="liquid-glass rounded-full p-2.5 text-[#18102E]/40 hover:text-[#6C5CA8] transition-colors">
              <FacebookIcon size={16} />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
