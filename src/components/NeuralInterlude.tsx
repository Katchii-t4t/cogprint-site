import NeuralNetworkBg from "./NeuralNetworkBg";

export default function NeuralInterlude() {
  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-cog-bg">

      {/* Animated neural network fills the background */}
      <NeuralNetworkBg className="absolute inset-0 w-full h-full" />

      {/* Gradient fades into the white sections above and below */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
      <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-transparent to-white/40" />

      {/* Central quote */}
      <div className="relative z-10 text-center max-w-3xl px-8">
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-cog-cyan/60 mx-auto mb-8" />

        <p className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-snug text-white">
          Every mind is{" "}
          <span
            className="text-cog-cyan"
            style={{ textShadow: "0 0 40px rgba(0,229,255,0.6)" }}
          >
            unique.
          </span>
          <br />
          Every mind deserves to be{" "}
          <span
            className="text-cog-cyan"
            style={{ textShadow: "0 0 40px rgba(0,229,255,0.6)" }}
          >
            understood.
          </span>
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-cog-cyan/40" />
          <span className="text-xs font-mono tracking-widest text-cog-muted">
            THE COGNITIVE FINGERPRINT PROJECT
          </span>
          <div className="h-px w-12 bg-cog-cyan/40" />
        </div>

        <div className="w-px h-16 bg-gradient-to-b from-cog-cyan/60 to-transparent mx-auto mt-8" />
      </div>
    </div>
  );
}
