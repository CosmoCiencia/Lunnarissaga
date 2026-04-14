import { useState } from 'react';
import { Link } from 'react-router-dom';
import OrbitImage from './OrbitImage';
import OrbitModal from './OrbitModal';
import { orbitEntries, type OrbitEntry } from './orbitData';
import styles from './Decisions.module.css';

export default function Decisions() {
  const [activeOrbit, setActiveOrbit] = useState<OrbitEntry | null>(null);

  return (
    <div className={`${styles.root} ${activeOrbit ? styles.modalOpen : ''}`}>
      <div className={styles.header}>
        <div className={`${styles.title} font-display`}>Lunnarïs Tomo 1</div>
        <div className={styles.subtitle}>
          <span>Una obra itinerante</span>
          <span>que llega hasta tu casa</span>
        </div>
      </div>

      <div className={styles.orbitStage}>
        {orbitEntries.map((entry) => (
          <OrbitImage
            key={entry.id}
            title={entry.title}
            imageSrc={entry.imageSrc}
            labelClassName={entry.labelClassName}
            style={{ transform: entry.transform }}
            onClick={() => setActiveOrbit(entry)}
          />
        ))}
      </div>

      <div className={styles.purchaseWrap}>
        <Link to="/lunaris" className={`${styles.ctaLink} ${styles.purchaseLink} font-display`}>
          Adquirir Lunnarïs
        </Link>
      </div>

      <OrbitModal activeOrbit={activeOrbit} onClose={() => setActiveOrbit(null)} />
    </div>
  );
}
