import { useEffect, useRef } from 'react';
import styles from './MarketWelcome.module.css';

type MarketWelcomeProps = {
  onStart: () => void;
};

export default function MarketWelcome({ onStart }: MarketWelcomeProps) {
  const startedRef = useRef(false);

  const startExperience = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    onStart();
  };

  /* ACTIVAR ENTER PARA INICIAR */

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        startExperience();
      }
    };

    window.addEventListener('keydown', handleKey);

    return () => {
      window.removeEventListener('keydown', handleKey);
    };
  }, []);

  return (
    <div className={styles.root} onClick={startExperience}>
      {/* BACKGROUND */}

      <div className={styles.backdrop} />

      {/* GLOWS */}

      <div className={styles.glowLeft} />
      <div className={styles.glowRight} />

      {/* CORTINAS */}

      <div className={`${styles.curtain} ${styles.curtainLeft}`} />
      <div className={`${styles.curtain} ${styles.curtainRight}`} />
      <div className={styles.curtainEdge} />

      {/* PANEL CENTRAL */}

      <main className={styles.panel}>
        <h1 className={`${styles.title} font-display`}>Una obra de teatro en forma de libro</h1>

        <div className={styles.menu}>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              startExperience();
            }}
            className={styles.primaryButton}
          >
            <span>Iniciar</span>

            <span className={styles.primaryHint}>Enter</span>
          </button>
        </div>
      </main>
    </div>
  );
}
