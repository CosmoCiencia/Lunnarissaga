import { Link } from 'react-router-dom';
import styles from './MarketLunaris.module.css';

export default function MarketLunaris() {
  return (
    <div className={styles.root}>
      <div className={styles.backdrop} />
      <div className={styles.content}>
        <p className={`${styles.eyebrow} font-display`}>Lunnaris</p>
        <h1 className={`${styles.title} font-display`}>Adquirir Lunnaris</h1>
        <p className={`${styles.body} font-ritual`}>
          El objeto legendario en forma de libro ilustrado. Aqui podras ver
          detalles, ediciones y formas de adquirirlo.
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
