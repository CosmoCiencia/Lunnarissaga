import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import type { MobileLayoutConfig } from '../../config/mobileLayout';
import { mobileOrbitIds } from '../../config/mobileLayout';
import OrbitImage from './OrbitImage';
import MobileLayoutCalibrator from './MobileLayoutCalibrator';
import OrbitModal from './OrbitModal';
import { orbitEntries, type OrbitEntry } from './orbitData';
import styles from '../../styles/Decisions/Decisions.module.css';

type DecisionsProps = {
  mobileLayout: MobileLayoutConfig;
  onMobileLayoutChange: (layout: MobileLayoutConfig) => void;
};

export default function Decisions({ mobileLayout, onMobileLayoutChange }: DecisionsProps) {
  const [activeOrbit, setActiveOrbit] = useState<OrbitEntry | null>(null);
  const mobileOrbitEntries = mobileOrbitIds
    .map((id) => orbitEntries.find((entry) => entry.id === id))
    .filter((entry): entry is OrbitEntry => Boolean(entry));
  const isCalibrateMode = useMemo(
    () =>
      import.meta.env.DEV &&
      new URLSearchParams(window.location.search).get('calibrate') === 'mobile',
    [],
  );

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

      <div className={styles.mobileLayout}>
        <div
          className={styles.mobileHeader}
          style={{
            left: `${mobileLayout.decisions.header.xPct}%`,
            top: `${mobileLayout.decisions.header.topVh}vh`,
          }}
        >
          <div className={`${styles.mobileTitle} ${styles.title} font-display`}>Lunnarïs Tomo 1</div>
          <div className={styles.mobileSubtitle}>
            <span>Una obra itinerante</span>
            <span>que llega hasta tu casa</span>
          </div>
        </div>

        <div
          className={styles.mobileDivider}
          aria-hidden="true"
          style={{
            left: `${mobileLayout.decisions.divider.xPct}%`,
            top: `${mobileLayout.decisions.divider.topVh}vh`,
          }}
        >
          <span className={styles.mobileDividerLine} />
          <span className={styles.mobileDividerMark}>✦</span>
          <span className={styles.mobileDividerLine} />
        </div>

        <div
          className={styles.mobileOrbitStage}
          style={{
            left: `${mobileLayout.decisions.orbitStage.xPct}%`,
            top: `${mobileLayout.decisions.orbitStage.topVh}vh`,
          }}
        >
          {mobileOrbitEntries.map((entry) => (
            <OrbitImage
              key={entry.id}
              title={entry.title}
              imageSrc={entry.imageSrc}
              labelClassName={styles.mobileOrbitLabel}
              style={{
                width: `${mobileLayout.decisions.orbitSizeVw}vw`,
                height: `${mobileLayout.decisions.orbitSizeVw}vw`,
                transform: `translate(-50%, -50%) translate(${mobileLayout.decisions.orbits[entry.id as keyof typeof mobileLayout.decisions.orbits].xVw}vw, ${mobileLayout.decisions.orbits[entry.id as keyof typeof mobileLayout.decisions.orbits].yVh}vh)`,
              }}
              onClick={() => setActiveOrbit(entry)}
            />
          ))}
        </div>

        <div
          className={styles.mobilePurchaseWrap}
          style={{
            left: `${mobileLayout.decisions.cta.xPct}%`,
            bottom: `${mobileLayout.decisions.cta.bottomVh}vh`,
            width: `${mobileLayout.decisions.cta.widthVw}vw`,
          }}
        >
          <Link to="/lunaris" className={`${styles.ctaLink} ${styles.mobilePurchaseLink} font-display`}>
            <span>Adquirir Lunnarïs</span>
            <span className={styles.mobilePurchaseStar} aria-hidden="true">
              ✦
            </span>
          </Link>
        </div>

        <p
          className={styles.mobileSecureNote}
          style={{
            left: `${mobileLayout.decisions.secureNote.xPct}%`,
            bottom: `${mobileLayout.decisions.secureNote.bottomVh}vh`,
          }}
        >
          Compra 100% segura
        </p>
      </div>

      {isCalibrateMode ? (
        <MobileLayoutCalibrator layout={mobileLayout} onChange={onMobileLayoutChange} />
      ) : null}

      <OrbitModal activeOrbit={activeOrbit} onClose={() => setActiveOrbit(null)} />
    </div>
  );
}
