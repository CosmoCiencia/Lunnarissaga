import type { OrbitExperienceFlow } from './orbitData';
import styles from '../../styles/Decisions/ExperienceFlow.module.css';

type ExperienceFlowProps = {
  experienceFlow?: OrbitExperienceFlow;
};

export default function ExperienceFlow({ experienceFlow }: ExperienceFlowProps) {
  if (!experienceFlow) {
    return null;
  }

  return (
    <div className={styles.experienceSystem}>
      <div className={styles.systemTrack}>
        {experienceFlow.steps.map((step) => (
          <div key={step.id} className={styles.systemStep}>
            <div className={styles.systemNode}>
              <span className={styles.systemNodeIndex}>{step.icon}</span>
            </div>
            <p className={styles.systemStepLabel}>{step.label}</p>
          </div>
        ))}
      </div>

      <div className={styles.systemNarrative}>
        {experienceFlow.paragraphs.map((paragraph) => (
          <p key={paragraph} className={styles.systemParagraph}>
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
