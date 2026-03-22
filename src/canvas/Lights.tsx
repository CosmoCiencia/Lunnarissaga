export default function Lights() {
  return (
    <>
      {/* Ambient general */}
      <ambientLight intensity={0.85} color="#2a3560" />

      {/* Luz calida general */}
      <pointLight
        position={[0, 8.5, 11]}
        intensity={2.2}
        distance={60}
        decay={2.0}
        color="#ffc792"
      />

      {/* Fill frontal */}
      <directionalLight position={[0, 6, 14]} intensity={0.65} color="#cfe1ff" />

      {/* Spots al escenario */}
      <spotLight
        position={[-6.5, 10, 7]}
        intensity={3.2}
        distance={70}
        angle={Math.PI * 0.18}
        penumbra={0.35}
        decay={1.15}
        color="#ffd6a6"
      />
      <spotLight
        position={[6.5, 10, 7]}
        intensity={3.0}
        distance={70}
        angle={Math.PI * 0.18}
        penumbra={0.35}
        decay={1.15}
        color="#ffd6a6"
      />

      {/* Contraluz celestial */}
      <directionalLight position={[0, 7, -14]} intensity={1.1} color="#87a7ff" />

      {/* Luz del acto */}
      <pointLight
        position={[0, 2.6, -1.0]}
        intensity={3.0}
        distance={22}
        decay={2.2}
        color="#88aaff"
      />
    </>
  );
}
