export default function MarketStage2D() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* CICLORAMA / FONDO */}
      <div
        className="absolute inset-0 bg-[url('/assets/stage/cyclorama.png')] bg-cover"
        style={{ transform: 'translateZ(-300px)' }}
      />

      {/* ESCENARIO BASE */}
      <div className="absolute inset-0 bg-[url('/assets/stage/floor.png')] bg-bottom bg-no-repeat" />

      {/* CORTINAS LATERALES */}
      <div className="absolute inset-y-0 left-0 w-1/4 bg-[url('/assets/stage/curtain-left.png')] bg-cover" />
      <div className="absolute inset-y-0 right-0 w-1/4 bg-[url('/assets/stage/curtain-right.png')] bg-cover" />

      {/* CORTINA FRONTAL */}
      <div className="absolute inset-0 bg-[url('/assets/stage/curtain-front.png')] bg-cover" />
    </div>
  );
}
