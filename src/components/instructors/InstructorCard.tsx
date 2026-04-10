import { motion } from 'framer-motion';
import { Music } from 'lucide-react';
import styles from './InstructorCard.module.css';

interface InstructorProps {
  name: string;
  specialty: string;
  bio: string;
  experience: string;
  photoUrl?: string;
}

const InstructorCard = ({ name, specialty, bio, experience, photoUrl }: InstructorProps) => {
  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.imagePlaceholder}>
        {photoUrl ? (
          <img src={photoUrl} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className={styles.overlay}>
            <Music size={40} className={styles.icon} />
          </div>
        )}
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.name}>{name}</h3>
        <div className={styles.specialty}>
          <span>{specialty}</span>
        </div>
        <p className={styles.bio}>{bio}</p>
        <div className={styles.experience}>
          <strong>Expérience :</strong> {experience}
        </div>
      </div>
    </motion.div>
  );
};

export default InstructorCard;
