import styles from './Decisions.module.css';

export type OrbitStoryAct = {
  id: string;
  icon: string;
  title: string;
  description: string;
  accentClassName: string;
};

export type OrbitDetailItem = {
  id: string;
  icon: string;
  title: string;
  description: string;
  accentClassName: string;
};

export type OrbitExperienceFlow = {
  steps: {
    id: string;
    label: string;
    icon: string;
  }[];
  paragraphs: string[];
};

export type OrbitWorldNode = {
  id: string;
  icon: string;
  title: string;
  description: string;
  x: number;
  y: number;
  accentClassName: string;
};

export type OrbitWorldSupportCard = {
  id: string;
  icon: string;
  title: string;
  description: string;
  accentClassName: string;
};

export type OrbitWorldConstellation = {
  centerSymbol: string;
  centerLabel: string;
  nodes: OrbitWorldNode[];
  supportCards: OrbitWorldSupportCard[];
};

export type OrbitEntry = {
  id: string;
  title: string;
  imageSrc: string;
  transform: string;
  labelClassName?: string;
  description: string;
  ctaLabel: string;
  eyebrow: string;
  tags: string[];
  storyActs?: OrbitStoryAct[];
  detailItems?: OrbitDetailItem[];
  experienceFlow?: OrbitExperienceFlow;
  worldConstellation?: OrbitWorldConstellation;
};

export const orbitEntries: OrbitEntry[] = [
  {
    id: 'actos',
    title: 'La historia',
    eyebrow: 'LA FUNCIÓN',
    imageSrc: '/images/obra teatral.png',
    transform:
      'translate(-50%, -50%) translate(clamp(-400px, -32vw, -300px), clamp(-300px, -22vw, -210px))',
    description: 'Esta es la travesía que abre Lunnaris.',
    ctaLabel: 'Inicia la función y recórrela.',
    tags: [],
    storyActs: [
      {
        id: 'origen',
        icon: '✺',
        title: 'El origen del mundo',
        description:
          'La primera luz rompe la sombra y da forma a la materia, al pulso y al nacimiento de todo.',
        accentClassName: styles.storyActOrigin,
      },
      {
        id: 'cielo',
        icon: '☽',
        title: 'Los misterios del cielo',
        description:
          'El firmamento se abre como un mapa sagrado lleno de signos, presagios y secretos.',
        accentClassName: styles.storyActSky,
      },
      {
        id: 'caida',
        icon: '✦',
        title: 'La caída de la humanidad',
        description:
          'El orgullo rompe el equilibrio y deja un eco de ruinas, memoria herida y preguntas sin cerrar.',
        accentClassName: styles.storyActFall,
      },
    ],
  },
  {
    id: 'dominios',
    title: 'Experiencia interactiva',
    eyebrow: 'CÓMO SE VIVE',
    imageSrc: '/images/dominios.png',
    transform:
      'translate(-50%, -50%) translate(clamp(300px, 32vw, 400px), clamp(210px, 20vw, 300px))',
    description: 'La obra no termina en el libro.',
    ctaLabel: 'Activa la función.',
    tags: [],
    experienceFlow: {
      steps: [
        { id: 'libro', label: 'Libro', icon: '📘' },
        { id: 'acceso', label: 'Acceso', icon: '🔓' },
        { id: 'contenido', label: 'Contenido', icon: '✨' },
        { id: 'continuacion', label: 'Continuación', icon: '🌙' },
      ],
      paragraphs: [
        'La historia no se queda en la página.',
        'A medida que avanzas,\nse abren nuevas formas de explorar Lunnaris.',
        'Todo forma parte de la función.\nY apenas comienza.',
      ],
    },
  },
  {
    id: 'cosmovision',
    title: '¿Qué incluye?',
    eyebrow: 'LO QUE RECIBES',
    imageSrc: '/images/cartas.png',
    transform:
      'translate(-50%, -50%) translate(clamp(300px, 32vw, 400px), clamp(-300px, -22vw, -210px))',
    description: 'Todo esto forma parte de la función.',
    ctaLabel: 'Recíbelo en tus manos.',
    tags: [],
    detailItems: [
      {
        id: 'libro',
        icon: '📘',
        title: 'El libro',
        description: 'El tomo inaugural de Lunnarïs, donde comienza la historia.',
        accentClassName: styles.detailCardBook,
      },
      {
        id: 'cartas',
        icon: '🃏',
        title: 'Cartas',
        description: 'Fragmentos del universo que expanden la experiencia.',
        accentClassName: styles.detailCardCards,
      },
      {
        id: 'mapas',
        icon: '🗺️',
        title: 'Mapas',
        description: 'Representaciones del mundo que guían el recorrido.',
        accentClassName: styles.detailCardMaps,
      },
      {
        id: 'dominios',
        icon: '🛡️',
        title: 'Dominios',
        description: 'Símbolos y estructuras que organizan el conocimiento.',
        accentClassName: styles.detailCardDomains,
      },
    ],
  },
  {
    id: 'lectura',
    title: 'El mundo',
    eyebrow: 'EL UNIVERSO',
    imageSrc: '/images/fuego.png',
    transform:
      'translate(-50%, -50%) translate(clamp(-400px, -32vw, -300px), clamp(210px, 20vw, 300px))',
    description: 'Este es el mapa de Lunnaris.',
    ctaLabel: 'Entra al recorrido.',
    tags: [],
    worldConstellation: {
      centerSymbol: '⟁',
      centerLabel: 'Lunnaris',
      nodes: [
        {
          id: 'actos',
          icon: '✦',
          title: 'Actos',
          description: 'La historia avanza en ciclos y escenas que ordenan la travesía.',
          x: 50,
          y: 12,
          accentClassName: styles.worldNodeActs,
        },
        {
          id: 'simbolos',
          icon: '☽',
          title: 'Símbolos',
          description: 'Los signos revelan capas ocultas del universo y orientan la lectura.',
          x: 78,
          y: 26,
          accentClassName: styles.worldNodeSymbols,
        },
        {
          id: 'dominios',
          icon: '🛡️',
          title: 'Dominios',
          description: 'Fuerzas y estructuras que sostienen el conocimiento del mundo.',
          x: 78,
          y: 60,
          accentClassName: styles.worldNodeDomains,
        },
        {
          id: 'ruinas',
          icon: '🜂',
          title: 'Ruinas',
          description: 'La caída de la humanidad dejó memoria, vestigios y preguntas abiertas.',
          x: 50,
          y: 74,
          accentClassName: styles.worldNodeRuins,
        },
        {
          id: 'cielo',
          icon: '✺',
          title: 'Cielo',
          description: 'Constelaciones, presagios y rutas celestes expanden la contemplación.',
          x: 22,
          y: 60,
          accentClassName: styles.worldNodeSky,
        },
        {
          id: 'fuego',
          icon: '🔥',
          title: 'Fuego',
          description: 'El pulso vital que atraviesa la materia y mantiene el universo encendido.',
          x: 22,
          y: 26,
          accentClassName: styles.worldNodeFire,
        },
      ],
      supportCards: [
        {
          id: 'exploracion',
          icon: '🧭',
          title: 'Exploración',
          description: 'Cada nodo abre una ruta del universo y convierte la lectura en recorrido.',
          accentClassName: styles.worldNodeSymbols,
        },
        {
          id: 'contemplacion',
          icon: '🌌',
          title: 'Contemplación',
          description: 'El mapa invita a detenerse, mirar conexiones y descubrir sentido en cada signo.',
          accentClassName: styles.worldNodeSky,
        },
      ],
    },
  },
];
