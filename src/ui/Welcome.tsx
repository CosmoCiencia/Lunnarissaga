import styles from './Welcome.module.css';

type WelcomeProps = {
  onStart: () => void;
};

export default function Welcome({ onStart }: WelcomeProps) {
  return (
    <div className={styles.root}>
      <div className={styles.background} />
      <div className={styles.backdrop} />

      <div className={styles.panel}>
        <div className={styles.titleWrapper}>
          <h1 className={`${styles.titleMain} font-display`}>
            <span className={styles.tightT}>T</span>eatro Celeste
          </h1>

          <h2 className={`${styles.titleSub} font-display`}>Inaugura su primera función</h2>

          <img
            src="/images/escudo%20reina.png"
            alt="Escudo de la reina"
            className={styles.crest}
          />
        </div>

        <div className={styles.menu}>
          <button type="button" onClick={onStart} className={styles.primaryButton}>
            <span>Participar</span>
          </button>
        </div>
      </div>
    </div>
  );
}
