import type { OrbitStoryAct } from './orbitData';
import styles from './Decisions.module.css';

type StoryActsProps = {
  storyActs?: OrbitStoryAct[];
};

export default function StoryActs({ storyActs }: StoryActsProps) {
  if (!storyActs) {
    return null;
  }

  return (
    <div className={styles.storyActsGrid}>
      {storyActs.map((act) => (
        <article key={act.id} className={`${styles.storyActCard} ${act.accentClassName}`}>
          <div className={styles.storyActHeader}>
            <span className={styles.storyActIcon} aria-hidden="true">
              {act.icon}
            </span>
            <p className={styles.storyActEyebrow}>Acto</p>
          </div>
          <h3 className={styles.storyActTitle}>{act.title}</h3>
          <p className={styles.storyActBody}>{act.description}</p>
        </article>
      ))}
    </div>
  );
}
