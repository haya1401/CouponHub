import "./AnimatedBackground.css";

export default function AnimatedBackground() {

  const particles = Array.from({ length: 40 });

  return (

    <div
      className="animated-background"
      aria-hidden="true"
    >

      {/* الإضاءات */}

      <div className="glow glow-blue"></div>

      <div className="glow glow-gold"></div>

      <div className="glow glow-purple"></div>

      {/* الجسيمات */}

      <div className="particles">

        {particles.map((_, index) => (

          <span

            key={index}

            style={{

              left: `${Math.random() * 100}%`,

              animationDelay: `${Math.random() * 12}s`,

              animationDuration: `${8 + Math.random() * 8}s`,

              width: `${4 + Math.random() * 6}px`,

              height: `${4 + Math.random() * 6}px`

            }}

          />

        ))}

      </div>

    </div>

  );

}
