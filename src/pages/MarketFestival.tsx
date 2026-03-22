import { Link } from 'react-router-dom';
import styles from './MarketFestival.module.css';

export default function MarketFestival() {
  return (
    <div className={styles.root}>
      <div className={styles.backdrop} />
      <div className={styles.content}>
        <p className={`${styles.eyebrow} font-display`}>Festival Celeste</p>
        <h1 className={`${styles.title} font-display`}>Explorar el Festival Celeste</h1>
        <p className={`${styles.body} font-ritual`}>
          Escenarios, rituales y actos que encienden el cielo. Esta pagina sera la
          puerta de entrada al festival.
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
