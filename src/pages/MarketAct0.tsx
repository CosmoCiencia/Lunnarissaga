import MarketStage3D from '../canvas/MarketStage3D';
import MarketStage2D from '../stage/MarketStage2D';
import MarketDecisions from '../ui/MarketDecisions';

export default function MarketAct0() {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      {/* ESCENARIO 2D */}
      <MarketStage2D />

      {/* MÁSCARA 3D */}
      <MarketStage3D />

      {/* ATMÓSFERA */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,220,160,0.08)_0%,rgba(0,0,0,0.85)_70%)]" />

      {/* TEXTO */}
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div className="pointer-events-none max-w-xl text-center text-ash">
          <p className="font-display text-sm uppercase tracking-[0.35em] text-ember/80">
            Market Mágico
          </p>
          <h1 className="mt-4 font-display text-4xl md:text-5xl text-ember">
            la obra está a punto de comenzar
          </h1>
          <p className="mt-4 text-lg text-ash/90">La máscara aguarda. Tú decides.</p>
        </div>
      </div>

      {/* DECISIONES */}
      <div className="absolute bottom-12 left-0 right-0 flex justify-center">
        <MarketDecisions />
      </div>
    </div>
  );
}
