import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './MarketDecisions.module.css';

type MenuEntry = {
  id: string;
  title: string;
  route: string;
  icon: string;
  description: string;
};

const menuEntries: MenuEntry[] = [
  {
    id: 'taller',
    title: 'Taller del Artesano',
    route: '/festival',
    icon: '⚒',
    description: 'Forja, piezas y caminos artesanales dentro del complejo.',
  },
  {
    id: 'oraculo',
    title: 'Casa del Oráculo',
    route: '/cosmovision',
    icon: '◉',
    description: 'Lecturas, señales y rutas de interpretación del oráculo.',
  },
  {
    id: 'juegos',
    title: 'Salón de Juegos',
    route: '/lunaris',
    icon: '⌂',
    description: 'Dinámicas y pruebas para explorar el sistema completo.',
  },
  {
    id: 'explorar',
    title: 'Explorar Market',
    route: '/festival',
    icon: '✦',
    description: 'Recorre el complejo, su historia y sus rutas.',
  },
];

export default function MarketDecisions() {
  const [activeId, setActiveId] = useState(menuEntries[0].id);

  const activeEntry = useMemo(() => {
    return menuEntries.find((entry) => entry.id === activeId) ?? menuEntries[0];
  }, [activeId]);

  return (
    <div className={styles.root}>
      {/* HEADER */}

      <header className={styles.header}>
        <h1 className={`${styles.title} font-display`}>lunnaris saga</h1>
        <p className={`${styles.subtitle} font-display`}> Edición digital</p>
      </header>

      {/* CONTENEDOR PRINCIPAL */}

      <div className={styles.layout}>
        {/* MENU */}

        <aside className={styles.menuPanel}>
          <div className={styles.panelTop}>
            <p className={`${styles.panelKicker} font-display`}>Gremio de Navegantes</p>
            <h2 className={`${styles.panelTitle} font-display`}>Selecciona tu misión</h2>
          </div>

          <nav className={styles.menuList} aria-label="Menú principal">
            {menuEntries.map((entry) => {
              const isActive = entry.id === activeId;

              return (
                <Link
                  key={entry.id}
                  to={entry.route}
                  className={`${styles.menuItem} ${isActive ? styles.menuItemActive : ''}`}
                  onMouseEnter={() => setActiveId(entry.id)}
                  onFocus={() => setActiveId(entry.id)}
                >
                  <span className={styles.menuRune}>✦</span>
                  <span className={styles.menuIcon}>{entry.icon}</span>

                  <span className={`${styles.menuLabel} font-display`}>{entry.title}</span>
                </Link>
              );
            })}
          </nav>

          {/* DESCRIPCION */}

          <div className={styles.descriptionCard}>
            <p className={`${styles.descriptionTitle} font-display`}>Bitácora</p>
            <p className={styles.description}>{activeEntry.description}</p>
          </div>

          {/* BOTON */}

          <Link to="/lunaris" className={`${styles.purchaseButton} font-display`}>
            Forjar Destino
          </Link>
        </aside>
      </div>

      {/* GLOW */}

      <div className={styles.bottomGlow} />
    </div>
  );
}
