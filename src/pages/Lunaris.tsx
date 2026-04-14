import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Lunaris.module.css';

const offerItems = [
  {
    id: 'book',
    icon: '📖',
    label: 'Libro físico',
  },
  {
    id: 'web',
    icon: '🌐',
    label: 'Experiencia web',
  },
  {
    id: 'materials',
    icon: '🚚',
    label: 'Envío incluido',
  },
  {
    id: 'access',
    icon: '🔓',
    label: 'Acceso exclusivo',
  },
] as const;

export default function Lunaris() {
  const [pageReady, setPageReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const revealPage = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (!cancelled) {
            setPageReady(true);
          }
        });
      });
    };

    const fontSet = document.fonts;
    if (!fontSet) {
      revealPage();
      return () => {
        cancelled = true;
      };
    }

    Promise.race([
      fontSet.ready,
      new Promise<void>((resolve) => window.setTimeout(resolve, 2500)),
    ]).then(revealPage);

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className={`${styles.root} ${pageReady ? styles.rootReady : styles.rootLoading}`}>
      <div className={styles.backdrop} />

      <main className={styles.shell}>
        <header className={styles.header}>
          <h1 className={`${styles.title} font-display`}>La función está a punto de comenzar</h1>
          <p className={`${styles.subtitle} ritual-text`}>
            Completa la reserva para pasar al pago y recibir Lunnarïs en tu hogar.
          </p>
        </header>

        <section className={styles.productCard}>
          <div className={styles.offerCard}>
            <p className={`${styles.offerEyebrow} font-display`}>La ofrenda</p>
            <h2 className={`${styles.offerTitle} font-display`}>Lunnarïs Saga · Tomo I</h2>
            <p className={`${styles.offerDescription} ritual-text`}>
              Una edición física ceremonial que abre la experiencia expandida de Teatro Celeste.
            </p>

            <div className={styles.offerGrid} aria-label="Lo que incluye la ofrenda">
              {offerItems.map((item) => (
                <div key={item.id} className={styles.offerItem}>
                  <span className={styles.offerIcon} aria-hidden="true">
                    {item.icon}
                  </span>
                  <span className={styles.offerText}>{item.label}</span>
                </div>
              ))}
            </div>

            <div className={styles.priceSection}>
              <p className={`${styles.offeringLabel} font-display`}>Total</p>
              <div className={`${styles.offerPrice} font-display`}>159.000 COP</div>
              <p className={styles.priceNote}>Incluye envío a cualquier ciudad de Colombia</p>
            </div>

            <Link to="/lunaris/checkout" className={`${styles.offerButton} font-display`}>
              Iniciar la función
            </Link>

            <div className={styles.offerTrust}>
              <span>✔ La función llega a cualquier ciudad de Colombia</span>
              <span>✔ El acceso se confirma al instante</span>
              <span>✔ El pago es seguro (Wompi, PSE, Nequi)</span>
              <span>✔ Esta es la edición inaugural</span>
            </div>
          </div>
        </section>

        <footer className={styles.footer}>
          <p className={styles.finalText}>En pocos días, el Teatro Celeste viajará hasta tu hogar.</p>

          <Link to="/" className={`${styles.backLink} font-display`}>
            Volver
          </Link>
        </footer>
      </main>
    </div>
  );
}
