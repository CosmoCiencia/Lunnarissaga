import type { OrbitDetailItem } from './orbitData';
import styles from '../../styles/Decisions/DetailItems.module.css';

type DetailItemsProps = {
  detailItems?: OrbitDetailItem[];
};

export default function DetailItems({ detailItems }: DetailItemsProps) {
  if (!detailItems) {
    return null;
  }

  return (
    <div className={styles.detailCardsGrid}>
      {detailItems.map((item) => (
        <article key={item.id} className={`${styles.detailCard} ${item.accentClassName}`}>
          <div className={styles.detailCardHeader}>
            <span className={styles.detailCardIcon} aria-hidden="true">
              {item.icon}
            </span>
            <h3 className={styles.detailCardTitle}>{item.title}</h3>
          </div>
          <p className={styles.detailCardBody}>{item.description}</p>
        </article>
      ))}
    </div>
  );
}
