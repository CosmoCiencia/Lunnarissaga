import { Link } from 'react-router-dom';
import styles from './MarketCosmovision.module.css';

export default function MarketCosmovision() {
  return (
    <div className={styles.root}>
      <div className={styles.backdrop} />
      <div className={styles.content}>
        <p className={`${styles.eyebrow} font-display`}>Cosmovision</p>
        <h1 className={`${styles.title} font-display`}>Conocer la Cosmovision</h1>
        <p className={`${styles.body} font-ritual`}>
          Un universo que se expande, mitos y simbolos que dan forma a la obra.
          Aqui podras explorar la historia y su imaginario.
        </p>
        <div className={styles.actions}>
          <Link to="/" className={`${styles.backLink} font-display`}>
            Volver al Menu
          </Link>
        </div>
      </div>
    </div>
  );
}
