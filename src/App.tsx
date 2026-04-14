import { Suspense, lazy, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import {
  cloneMobileLayoutConfig,
  mobileLayoutConfig,
  type MobileLayoutConfig,
} from './config/mobileLayout';
import Welcome from './ui/Welcome';

const Stage = lazy(() => import('./canvas/Stage'));
const Decisions = lazy(() => import('./ui/Decisions/Decisions'));
const Festival = lazy(() => import('./pages/Festival'));
const Cosmovision = lazy(() => import('./pages/Cosmovision'));
const Lunaris = lazy(() => import('./pages/Lunaris'));
const LunarisCheckout = lazy(() => import('./pages/LunarisCheckout'));

const WHATSAPP_NUMBER = '573001234567';
const WHATSAPP_MESSAGE = encodeURIComponent(
  'Hola, quiero información sobre Teatro Celeste.',
);

export default function App() {
  const [started, setStarted] = useState(false);
  const [layout, setLayout] = useState<MobileLayoutConfig>(() =>
    cloneMobileLayoutConfig(mobileLayoutConfig),
  );
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

  return (
    <>
      <Suspense fallback={null}>
        <Routes>
          <Route
            path="/"
            element={
              <div className="w-screen h-screen relative overflow-hidden">
                {!started && <Welcome onStart={() => setStarted(true)} />}
                {started && <Stage mobileLayout={layout} />}
                {started && <Decisions mobileLayout={layout} onMobileLayoutChange={setLayout} />}
              </div>
            }
          />
          <Route path="/festival" element={<Festival />} />
          <Route path="/cosmovision" element={<Cosmovision />} />
          <Route path="/lunaris" element={<Lunaris />} />
          <Route path="/lunaris/checkout" element={<LunarisCheckout />} />
        </Routes>
      </Suspense>

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
