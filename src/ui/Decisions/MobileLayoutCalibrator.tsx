import { useMemo, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import {
  cloneMobileLayoutConfig,
  mobileLayoutConfig,
  mobileOrbitIds,
  type MobileLayoutConfig,
  type MobileOrbitId,
} from '../../config/mobileLayout';
import styles from '../../styles/Decisions/MobileLayoutCalibrator.module.css';

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

type MobileLayoutCalibratorProps = {
  layout: MobileLayoutConfig;
  onChange: (layout: MobileLayoutConfig) => void;
};

type DragTarget =
  | { kind: 'header' }
  | { kind: 'divider' }
  | { kind: 'orbitStage' }
  | { kind: 'cta' }
  | { kind: 'secureNote' }
  | { kind: 'orbit'; orbitId: MobileOrbitId };

export default function MobileLayoutCalibrator({
  layout,
  onChange,
}: MobileLayoutCalibratorProps) {
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  const [panelCollapsed, setPanelCollapsed] = useState(false);
  const dragStartRef = useRef<{
    pointerX: number;
    pointerY: number;
    layout: MobileLayoutConfig;
    target: DragTarget;
  } | null>(null);

  const handleStyleMap = useMemo(
    () => ({
      header: {
        left: `${layout.decisions.header.xPct}%`,
        top: `${layout.decisions.header.topVh}vh`,
      },
      divider: {
        left: `${layout.decisions.divider.xPct}%`,
        top: `${layout.decisions.divider.topVh}vh`,
      },
      orbitStage: {
        left: `${layout.decisions.orbitStage.xPct}%`,
        top: `${layout.decisions.orbitStage.topVh}vh`,
      },
      cta: {
        left: `${layout.decisions.cta.xPct}%`,
        top: `${100 - layout.decisions.cta.bottomVh}vh`,
      },
      secureNote: {
        left: `${layout.decisions.secureNote.xPct}%`,
        top: `${100 - layout.decisions.secureNote.bottomVh}vh`,
      },
    }),
    [layout],
  );

  const updateLayout = (updater: (draft: MobileLayoutConfig) => void) => {
    const draft = cloneMobileLayoutConfig(layout);
    updater(draft);
    onChange(draft);
  };

  const handlePointerDown = (target: DragTarget) => (event: ReactPointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    dragStartRef.current = {
      pointerX: event.clientX,
      pointerY: event.clientY,
      layout: cloneMobileLayoutConfig(layout),
      target,
    };

    const onPointerMove = (moveEvent: PointerEvent) => {
      if (!dragStartRef.current) {
        return;
      }

      const deltaXPct = (moveEvent.clientX - dragStartRef.current.pointerX) / window.innerWidth * 100;
      const deltaYPct = (moveEvent.clientY - dragStartRef.current.pointerY) / window.innerHeight * 100;
      const nextLayout = cloneMobileLayoutConfig(dragStartRef.current.layout);

      switch (dragStartRef.current.target.kind) {
        case 'header':
          nextLayout.decisions.header.xPct += deltaXPct;
          nextLayout.decisions.header.topVh += deltaYPct;
          break;
        case 'divider':
          nextLayout.decisions.divider.xPct += deltaXPct;
          nextLayout.decisions.divider.topVh += deltaYPct;
          break;
        case 'orbitStage':
          nextLayout.decisions.orbitStage.xPct += deltaXPct;
          nextLayout.decisions.orbitStage.topVh += deltaYPct;
          break;
        case 'cta':
          nextLayout.decisions.cta.xPct += deltaXPct;
          nextLayout.decisions.cta.bottomVh -= deltaYPct;
          break;
        case 'secureNote':
          nextLayout.decisions.secureNote.xPct += deltaXPct;
          nextLayout.decisions.secureNote.bottomVh -= deltaYPct;
          break;
        case 'orbit':
          nextLayout.decisions.orbits[dragStartRef.current.target.orbitId].xVw += deltaXPct;
          nextLayout.decisions.orbits[dragStartRef.current.target.orbitId].yVh += deltaYPct;
          break;
      }

      onChange(nextLayout);
    };

    const onPointerUp = () => {
      dragStartRef.current = null;
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  const handleSave = async () => {
    setSaveStatus('saving');

    try {
      const response = await fetch('/__save-mobile-layout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(layout),
      });

      if (!response.ok) {
        throw new Error('No se pudo guardar');
      }

      setSaveStatus('saved');
    } catch {
      setSaveStatus('error');
    }
  };

  return (
    <>
      <div className={styles.overlay}>
        <div
          className={`${styles.handle} ${styles.headerHandle}`}
          style={handleStyleMap.header}
          onPointerDown={handlePointerDown({ kind: 'header' })}
        >
          Header
        </div>

        <div
          className={`${styles.handle} ${styles.dividerHandle}`}
          style={handleStyleMap.divider}
          onPointerDown={handlePointerDown({ kind: 'divider' })}
        >
          Divisor
        </div>

        <div
          className={`${styles.handle} ${styles.orbitStageHandle}`}
          style={handleStyleMap.orbitStage}
          onPointerDown={handlePointerDown({ kind: 'orbitStage' })}
        >
          Centro
        </div>

        {mobileOrbitIds.map((orbitId) => (
          <div
            key={orbitId}
            className={`${styles.handle} ${styles.orbitHandle}`}
            style={{
              left: `calc(${layout.decisions.orbitStage.xPct}% + ${layout.decisions.orbits[orbitId].xVw}vw)`,
              top: `calc(${layout.decisions.orbitStage.topVh}vh + ${layout.decisions.orbits[orbitId].yVh}vh)`,
            }}
            onPointerDown={handlePointerDown({ kind: 'orbit', orbitId })}
          >
            {orbitId}
          </div>
        ))}

        <div
          className={`${styles.handle} ${styles.ctaHandle}`}
          style={handleStyleMap.cta}
          onPointerDown={handlePointerDown({ kind: 'cta' })}
        >
          CTA
        </div>

        <div
          className={`${styles.handle} ${styles.noteHandle}`}
          style={handleStyleMap.secureNote}
          onPointerDown={handlePointerDown({ kind: 'secureNote' })}
        >
          Nota
        </div>
      </div>

      <aside className={styles.panel}>
        <div className={styles.panelHeader}>
          <h2 className={styles.title}>Calibración móvil</h2>
          <button
            type="button"
            className={styles.toggleButton}
            onClick={() => setPanelCollapsed((value) => !value)}
          >
            {panelCollapsed ? 'Mostrar sliders' : 'Esconder sliders'}
          </button>
        </div>

        {!panelCollapsed ? (
          <>
            <p className={styles.meta}>
              Arrastra los handles sobre la pantalla. Los controles de abajo afinan el libro 3D y los tamaños.
            </p>

            <div className={styles.section}>
              <p className={styles.sectionTitle}>Escena</p>
              <div className={styles.grid}>
                <RangeField
                  label="Escala libro"
                  min={0.4}
                  max={1.2}
                  step={0.01}
                  value={layout.stage.scale}
                  onChange={(value) => updateLayout((draft) => {
                    draft.stage.scale = value;
                  })}
                />
                <RangeField
                  label="Libro Y"
                  min={0}
                  max={4}
                  step={0.01}
                  value={layout.stage.bookY}
                  onChange={(value) => updateLayout((draft) => {
                    draft.stage.bookY = value;
                  })}
                />
                <RangeField
                  label="Cámara Y"
                  min={0}
                  max={5}
                  step={0.01}
                  value={layout.stage.cameraY}
                  onChange={(value) => updateLayout((draft) => {
                    draft.stage.cameraY = value;
                  })}
                />
                <RangeField
                  label="Cámara Z"
                  min={4}
                  max={9}
                  step={0.01}
                  value={layout.stage.cameraZ}
                  onChange={(value) => updateLayout((draft) => {
                    draft.stage.cameraZ = value;
                  })}
                />
                <RangeField
                  label="Target Y"
                  min={0}
                  max={5}
                  step={0.01}
                  value={layout.stage.targetY}
                  onChange={(value) => updateLayout((draft) => {
                    draft.stage.targetY = value;
                  })}
                />
                <RangeField
                  label="FOV"
                  min={30}
                  max={60}
                  step={0.1}
                  value={layout.stage.fov}
                  onChange={(value) => updateLayout((draft) => {
                    draft.stage.fov = value;
                  })}
                />
                <RangeField
                  label="Tamaño orbes"
                  min={12}
                  max={32}
                  step={0.2}
                  value={layout.decisions.orbitSizeVw}
                  onChange={(value) => updateLayout((draft) => {
                    draft.decisions.orbitSizeVw = value;
                  })}
                />
                <RangeField
                  label="Ancho CTA"
                  min={55}
                  max={96}
                  step={0.5}
                  value={layout.decisions.cta.widthVw}
                  onChange={(value) => updateLayout((draft) => {
                    draft.decisions.cta.widthVw = value;
                  })}
                />
              </div>
            </div>
          </>
        ) : null}

        <div className={styles.actions}>
          <button type="button" className={styles.button} onClick={() => onChange(cloneMobileLayoutConfig(mobileLayoutConfig))}>
            Reset
          </button>
          <button type="button" className={`${styles.button} ${styles.buttonPrimary}`} onClick={handleSave}>
            Guardar en código
          </button>
        </div>

        <p className={styles.status}>
          {saveStatus === 'idle' && 'Listo para guardar'}
          {saveStatus === 'saving' && 'Guardando...'}
          {saveStatus === 'saved' && 'Guardado en src/config/mobile-layout.json'}
          {saveStatus === 'error' && 'Error guardando'}
        </p>
      </aside>
    </>
  );
}

type RangeFieldProps = {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
};

function RangeField({ label, min, max, step, value, onChange }: RangeFieldProps) {
  return (
    <div className={styles.field}>
      <label>
        {label}: {value.toFixed(2)}
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </div>
  );
}
