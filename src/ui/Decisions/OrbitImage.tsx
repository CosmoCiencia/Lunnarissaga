import type { CSSProperties } from 'react';
import styles from './Decisions.module.css';

type OrbitImageProps = {
  imageSrc: string;
  title: string;
  style?: CSSProperties;
  onClick?: () => void;
  labelClassName?: string;
};

export default function OrbitImage({
  imageSrc,
  title,
  style,
  onClick,
  labelClassName,
}: OrbitImageProps) {
  return (
    <button
      type="button"
      className={`${styles.orbitImageOnly} ${styles.orbitImageButton}`}
      style={style}
      onClick={onClick}
    >
      <div className={styles.orbitImageFrame}>
        <img
          src={imageSrc}
          alt={title}
          className={styles.orbitImage}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className={`${styles.orbitLabel} ${labelClassName ?? ''} font-display`}>{title}</div>
    </button>
  );
}
