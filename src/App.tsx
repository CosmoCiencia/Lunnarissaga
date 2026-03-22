import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import MarketStage3D from './canvas/MarketStage3D';
import MarketDecisions from './ui/MarketDecisions';
import MarketWelcome from './ui/MarketWelcome';

import MarketFestival from './pages/MarketFestival';
import MarketCosmovision from './pages/MarketCosmovision';
import MarketLunaris from './pages/MarketLunaris';

export default function App() {
  const [started, setStarted] = useState(false);

  return (
    <div className="w-screen h-screen relative overflow-hidden">
      {/* ESCENA 3D SIEMPRE MONTADA */}
      {started && (
        <div className="absolute inset-0 z-0">
          <MarketStage3D />
        </div>
      )}

      {/* INTERFAZ / RUTAS */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Routes>
          <Route
            path="/"
            element={
              <>
                {!started && (
                  <div className="pointer-events-auto">
                    <MarketWelcome onStart={() => setStarted(true)} />
                  </div>
                )}

                {started && (
                  <div className="pointer-events-auto">
                    <MarketDecisions />
                  </div>
                )}
              </>
            }
          />

          <Route
            path="/festival"
            element={
              <div className="pointer-events-auto">
                <MarketFestival />
              </div>
            }
          />

          <Route
            path="/cosmovision"
            element={
              <div className="pointer-events-auto">
                <MarketCosmovision />
              </div>
            }
          />

          <Route
            path="/lunaris"
            element={
              <div className="pointer-events-auto">
                <MarketLunaris />
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
}
