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
            El <span className={styles.tightT}>T</span>eatro Celeste
          </h1>

          <h2 className={styles.titleSub}>inaugura su primera función</h2>

          <img
            src="/images/escudo-reina.webp"
            alt="Escudo de la reina"
            className={styles.crest}
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </div>

        <div className={styles.menu}>
          <button type="button" onClick={onStart} className={styles.primaryButton}>
            <span>Entrar</span>
          </button>

          <p className={styles.menuLead}>Una obra de teatro en forma de libro</p>

          <p className={styles.menuCaption}>
            <span>Cosmo Ciencia</span>
          </p>
        </div>
      </div>
    </div>
  );
}
