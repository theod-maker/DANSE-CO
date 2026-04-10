import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const FacebookIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.container} container`}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <h3 className={styles.logo}>Danse & CO</h3>
            <p className={styles.description}>
              L'école de danse sportive à Saint-Michel-Chef-Chef. Rejoignez-nous pour apprendre la danse dans une ambiance conviviale et professionnelle.
            </p>
            <div className={styles.socials}>
              <a href="#" aria-label="Instagram"><InstagramIcon size={20} /></a>
              <a href="#" aria-label="Facebook"><FacebookIcon size={20} /></a>
            </div>
          </div>

          <div className={styles.links}>
            <h4>Navigation</h4>
            <ul>
              <li><Link to="/">Accueil</Link></li>
              <li><Link to="/planning">Planning</Link></li>
              <li><Link to="/profs">Les Professeurs</Link></li>
              <li><Link to="/tarifs">Tarifs</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className={styles.contact}>
            <h4>Contact</h4>
            <ul>
              <li><Phone size={18} /> 06.17.09.93.49</li>
              <li><Mail size={18} /> DANSANDCO@OUTLOOK.FR</li>
              <li><MapPin size={18} /> 17 Rue du Chevecier, 44730 Saint-Michel-Chef-Chef</li>
            </ul>
          </div>

          <div className={styles.venues}>
            <h4>Nos Salles</h4>
            <ul>
              <li><strong>Le Canopus:</strong> 129 Bd de l'Océan</li>
              <li><strong>Salle Caraïbes:</strong> Complexe de la Viauderie</li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} Danse & CO. Tous droits réservés.</p>
          <p>Conçu pour une expérience utilisateur exceptionnelle.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
