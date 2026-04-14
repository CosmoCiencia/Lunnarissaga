import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import {
  cloneMobileLayoutConfig,
  mobileLayoutConfig,
  type MobileLayoutConfig,
} from './config/mobileLayout';
import Welcome from './ui/Welcome';

// Lazy components
const Stage = lazy(() => import('./canvas/Stage'));
const Decisions = lazy(() => import('./ui/Decisions/Decisions'));
const Festival = lazy(() => import('./pages/Festival'));
const Cosmovision = lazy(() => import('./pages/Cosmovision'));
const Lunaris = lazy(() => import('./pages/Lunaris'));
const LunarisCheckout = lazy(() => import('./pages/LunarisCheckout'));

const WHATSAPP_NUMBER = '573001234567';
const WHATSAPP_MESSAGE = encodeURIComponent('Hola, quiero información sobre Teatro Celeste.');

// Loader visual simple (puedes estilizar luego)
function Loader() {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black text-white text-lg">
      Cargando experiencia...
    </div>
  );
}

export default function App() {
  const [started, setStarted] = useState(false);
  const [showUI, setShowUI] = useState(false);

  const [layout, setLayout] = useState<MobileLayoutConfig>(() =>
    cloneMobileLayoutConfig(mobileLayoutConfig)
  );

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

  // 🔥 carga progresiva (primero 3D, luego UI)
  useEffect(() => {
    if (started) {
      const timer = setTimeout(() => {
        setShowUI(true);
      }, 500); // puedes ajustar (300–800ms ideal)

      return () => clearTimeout(timer);
    }
  }, [started]);

  return (
    <>
      <Routes>
        {/* HOME / EXPERIENCIA PRINCIPAL */}
        <Route
          path="/"
          element={
            <div className="w-screen h-screen relative overflow-hidden">
              {!started && <Welcome onStart={() => setStarted(true)} />}

              {started && (
                <Suspense fallback={<Loader />}>
                  <Stage mobileLayout={layout} />
                </Suspense>
              )}

              {started && showUI && (
                <Suspense fallback={null}>
                  <Decisions mobileLayout={layout} onMobileLayoutChange={setLayout} />
                </Suspense>
              )}
            </div>
          }
        />

        {/* OTRAS RUTAS */}
        <Route
          path="/festival"
          element={
            <Suspense fallback={<Loader />}>
              <Festival />
            </Suspense>
          }
        />
        <Route
          path="/cosmovision"
          element={
            <Suspense fallback={<Loader />}>
              <Cosmovision />
            </Suspense>
          }
        />
        <Route
          path="/lunaris"
          element={
            <Suspense fallback={<Loader />}>
              <Lunaris />
            </Suspense>
          }
        />
        <Route
          path="/lunaris/checkout"
          element={
            <Suspense fallback={<Loader />}>
              <LunarisCheckout />
            </Suspense>
          }
        />
      </Routes>

      {/* BOTÓN WHATSAPP */}
      <a
        className="whatsapp-float"
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        aria-label="Escribir por WhatsApp"
      >
        <span className="whatsapp-float__badge" aria-hidden="true">
          WA
        </span>
        <span>WhatsApp</span>
      </a>
    </>
  );
}
