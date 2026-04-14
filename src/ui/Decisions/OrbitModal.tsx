import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import DetailItems from './DetailItems';
import ExperienceFlow from './ExperienceFlow';
import StoryActs from './StoryActs';
import WorldConstellation from './WorldConstellation';
import type { OrbitEntry } from './orbitData';
import styles from './Decisions.module.css';

const orbitTagIcons = ['✦', '☽', '⟡', '☼'];

type OrbitModalProps = {
  activeOrbit: OrbitEntry | null;
  onClose: () => void;
};

export default function OrbitModal({ activeOrbit, onClose }: OrbitModalProps) {
  const [selectedWorldNodeId, setSelectedWorldNodeId] = useState<string | null>(null);

  useEffect(() => {
    if (!activeOrbit) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeOrbit, onClose]);

  useEffect(() => {
    if (!activeOrbit?.worldConstellation) {
      setSelectedWorldNodeId(null);
      return;
    }

    setSelectedWorldNodeId(activeOrbit.worldConstellation.nodes[0]?.id ?? null);
  }, [activeOrbit]);

  const activeWorldNode =
    activeOrbit?.worldConstellation?.nodes.find((node) => node.id === selectedWorldNodeId) ??
    activeOrbit?.worldConstellation?.nodes[0] ??
    null;

  if (!activeOrbit) {
    return null;
  }

  const shouldRenderFallbackTags =
    activeOrbit.tags.length > 0 &&
    !activeOrbit.detailItems &&
    !activeOrbit.experienceFlow &&
    !activeOrbit.worldConstellation;

  return (
    <div
      className={styles.modalOverlay}
      role="dialog"
      aria-modal="true"
      aria-label={`${activeOrbit.title} modal`}
      onClick={onClose}
    >
      <div className={styles.modalContent} onClick={(event) => event.stopPropagation()}>
        <div className={styles.modalInner}>
          <button
            type="button"
            className={styles.modalClose}
            aria-label="Cerrar escena"
            onClick={onClose}
          >
            ×
          </button>

          <div className={styles.modalInfoPanel}>
            <div className={styles.modalCopy}>
              <h2 className={`${styles.modalTitle} font-display`}>{activeOrbit.title}</h2>
              <div className={styles.modalDivider} />
              <p className={styles.modalBody}>{activeOrbit.description}</p>
            </div>

            <StoryActs storyActs={activeOrbit.storyActs} />
            <ExperienceFlow experienceFlow={activeOrbit.experienceFlow} />
            <DetailItems detailItems={activeOrbit.detailItems} />
            <WorldConstellation
              worldConstellation={activeOrbit.worldConstellation}
              activeNode={activeWorldNode}
              onSelectNode={setSelectedWorldNodeId}
            />

            {shouldRenderFallbackTags ? (
              <div className={styles.modalIncludesGrid}>
                {activeOrbit.tags.map((tag, index) => (
                  <div key={tag} className={styles.modalIncludeItem}>
                    <div className={styles.modalIncludeIcon}>
                      {orbitTagIcons[index % orbitTagIcons.length]}
                    </div>
                    <p className={styles.modalIncludeTitle}>{tag}</p>
                  </div>
                ))}
              </div>
            ) : null}

            <div className={styles.modalActionWrap}>
              <Link
                to="/lunaris"
                className={`${styles.ctaLink} ${styles.modalActionLink} font-display`}
                onClick={onClose}
              >
                {activeOrbit.ctaLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
