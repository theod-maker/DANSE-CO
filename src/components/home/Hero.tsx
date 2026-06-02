import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay}></div>
      <div className={`${styles.container} container`}>
        <motion.div 
          className={styles.content}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className={styles.tagline}>Saison 2026 - 2027</span>
          <h1 className={styles.title}>
            Faites le premier pas avec <span>Danse & CO</span>
          </h1>
          <p className={styles.description}>
            Découvrez l'élégance de la Danse Sportive et le plaisir de bouger à Saint-Michel-Chef-Chef. Tous niveaux, tous âges, une seule passion.
          </p>
          <div className={styles.actions}>
            <Link to="/planning" className={styles.primaryBtn}>
              Voir le Planning <ArrowRight size={20} />
            </Link>
            <Link to="/disciplines" className={styles.secondaryBtn}>
              Nos Disciplines
            </Link>
          </div>
        </motion.div>
      </div>
      
      {/* Decorative element */}
      <div className={styles.scrollIndicator}>
        <div className={styles.mouse}>
          <div className={styles.wheel}></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
