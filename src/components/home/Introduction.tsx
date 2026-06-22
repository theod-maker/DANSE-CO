https://danse-co.vercel.apphttps://danse-co.vercel.appimport { motion } from 'framer-motion';
import styles from './Introduction.module.css';

const Introduction = () => {
  return (
    <section className={`${styles.intro} section-padding`}>
      <div className={`${styles.container} container`}>
        <div className={styles.grid}>
          <motion.div 
            className={styles.textContent}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={styles.title}>L'Esprit <span>Dans'&amp;Co</span></h2>
            <p className={styles.highlight}>
              Depuis de nombreuses années, nous partageons notre passion pour la danse dans le cadre enchanteur de Saint-Michel-Chef-Chef.
            </p>
            <p className={styles.text}>
              Que vous soyez débutant ou danseur confirmé, notre association vous accueille dans une ambiance conviviale et dynamique. Nous mettons l'accent sur la qualité de l'enseignement tout en préservant le plaisir de la danse de loisir et sportive.
            </p>
            <p className={styles.text}>
              Nos cours se déroulent dans des salles équipées pour vous offrir les meilleures conditions de pratique. Rejoignez une communauté passionnée et faites vibrer votre quotidien au rythme de la musique !
            </p>
            
            <div className={styles.stats}>
              <div className={styles.statItem}>
                <span className={styles.statValue}>10+</span>
                <span className={styles.statLabel}>Années d'expérience</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statValue}>2</span>
                <span className={styles.statLabel}>Salles de cours</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statValue}>5+</span>
                <span className={styles.statLabel}>Styles de danse</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className={styles.imageContent}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={styles.imageWrapper}>
              <div className={styles.imagePlaceholder}>
                <span>Image: Danseurs en mouvement</span>
              </div>
              <div className={styles.imageDecoration}></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
