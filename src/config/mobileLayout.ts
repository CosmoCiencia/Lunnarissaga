import mobileLayoutData from './mobile-layout.json';

export const mobileOrbitIds = ['actos', 'dominios', 'lectura', 'cosmovision'] as const;

export type MobileOrbitId = (typeof mobileOrbitIds)[number];

export type MobileLayoutConfig = {
  decisions: {
    header: {
      xPct: number;
      topVh: number;
    };
    divider: {
      xPct: number;
      topVh: number;
    };
    orbitStage: {
      xPct: number;
      topVh: number;
    };
    orbitSizeVw: number;
    orbits: Record<
      MobileOrbitId,
      {
        xVw: number;
        yVh: number;
      }
    >;
    cta: {
      xPct: number;
      bottomVh: number;
      widthVw: number;
    };
    secureNote: {
      xPct: number;
      bottomVh: number;
    };
  };
  stage: {
    pedestalVisibleMobile: boolean;
    pedestalY: number;
    bookY: number;
    cameraY: number;
    cameraZ: number;
    targetY: number;
    scale: number;
    fov: number;
  };
};

export const mobileLayoutConfig = mobileLayoutData as MobileLayoutConfig;

export function cloneMobileLayoutConfig(config: MobileLayoutConfig): MobileLayoutConfig {
  return JSON.parse(JSON.stringify(config)) as MobileLayoutConfig;
}
