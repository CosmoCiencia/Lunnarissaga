import type { OrbitWorldConstellation, OrbitWorldNode } from './orbitData';
import styles from './Decisions.module.css';

type WorldConstellationProps = {
  worldConstellation?: OrbitWorldConstellation;
  activeNode: OrbitWorldNode | null;
  onSelectNode: (nodeId: string) => void;
};

export default function WorldConstellation({
  worldConstellation,
  activeNode,
  onSelectNode,
}: WorldConstellationProps) {
  if (!worldConstellation) {
    return null;
  }

  return (
    <div className={styles.worldConstellation}>
      <div className={styles.worldMap}>
        <svg
          className={styles.worldMapSvg}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <circle cx="50" cy="42" r="28" className={styles.worldMapRingOuter} />
          <circle cx="50" cy="42" r="16" className={styles.worldMapRingInner} />
          {worldConstellation.nodes.map((node) => (
            <line
              key={node.id}
              x1="50"
              y1="42"
              x2={node.x}
              y2={node.y}
              className={styles.worldMapLine}
            />
          ))}
        </svg>

        <div className={styles.worldCenter}>
          <span className={styles.worldCenterSymbol} aria-hidden="true">
            {worldConstellation.centerSymbol}
          </span>
          <p className={styles.worldCenterLabel}>{worldConstellation.centerLabel}</p>
        </div>

        {worldConstellation.nodes.map((node) => (
          <button
            key={node.id}
            type="button"
            className={`${styles.worldNode} ${node.accentClassName} ${
              activeNode?.id === node.id ? styles.worldNodeActive : ''
            }`}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            onClick={() => onSelectNode(node.id)}
          >
            <span className={styles.worldNodeOrb} aria-hidden="true">
              {node.icon}
            </span>
            <span className={styles.worldNodeLabel}>{node.title}</span>
          </button>
        ))}
      </div>
      <div className={styles.worldInfoGrid}>
        {activeNode ? (
          <article className={styles.worldInfoCard}>
            <div className={styles.worldInfoHeader}>
              <span
                className={`${styles.worldInfoIcon} ${activeNode.accentClassName}`}
                aria-hidden="true"
              >
                {activeNode.icon}
              </span>
              <h3 className={styles.worldInfoTitle}>{activeNode.title}</h3>
            </div>
            <p className={styles.worldInfoBody}>{activeNode.description}</p>
          </article>
        ) : null}

        {worldConstellation.supportCards.map((card) => (
          <article key={card.id} className={styles.worldInfoCard}>
            <div className={styles.worldInfoHeader}>
              <span className={`${styles.worldInfoIcon} ${card.accentClassName}`} aria-hidden="true">
                {card.icon}
              </span>
              <h3 className={styles.worldInfoTitle}>{card.title}</h3>
            </div>
            <p className={styles.worldInfoBody}>{card.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
