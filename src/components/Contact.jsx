import React from 'react';

const Contact = () => {
  return (
    <section id="contact" style={{ 
      width: '100vw',
      height: '100vh',
      flexShrink: 0,
      padding: "0 clamp(20px, 8vw, 150px)", 
      backgroundColor: "#000",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Background decoration */}
      <div style={{
        position: "absolute",
        top: "-10%",
        right: "-5%",
        fontSize: "clamp(10rem, 30vw, 40rem)",
        fontWeight: 900,
        color: "rgba(255, 255, 255, 0.02)",
        lineHeight: 1,
        pointerEvents: "none",
        userSelect: "none",
        fontFamily: "'Space Grotesk', sans-serif"
      }}>
        CONNECT
      </div>

      <div style={{ position: "relative", zIndex: 2 }}>
        <h2 style={{
          fontSize: "clamp(12px, 2vw, 16px)",
          fontWeight: 900,
          fontFamily: "'Inter', sans-serif",
          textTransform: "uppercase",
          letterSpacing: "0.4em",
          color: "rgba(255, 255, 255, 0.4)",
          marginBottom: "3rem"
        }}>
          [ Get in touch ]
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <h3 style={{
            fontSize: "clamp(1.6rem, 4vw, 3.5rem)",
            fontWeight: 800,
            fontFamily: "'Space Grotesk', sans-serif",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            color: "#FFF",
            maxWidth: "900px"
          }}>
            Got a vision? Let's make it real.
          </h3>
          
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem", marginTop: "2rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <span style={{ fontSize: "12px", fontWeight: 700, color: "rgba(255, 255, 255, 0.3)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Academic / Preferred</span>
            <a href="mailto:nitheesh.k2024@vitstudent.ac.in" style={{
              fontSize: "clamp(0.9rem, 2.5vw, 1.8rem)",
              fontWeight: 400,
              fontFamily: "'Times New Roman', serif",
              fontStyle: "italic",
              color: "#FFEB3B", // Accent yellow
              textDecoration: "none",
              borderBottom: "1px solid rgba(255, 235, 59, 0.2)",
              paddingBottom: "4px",
              width: "fit-content",
              transition: "all 0.4s ease"
            }}>
              nitheesh.k2024@vitstudent.ac.in
            </a>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <span style={{ fontSize: "12px", fontWeight: 700, color: "rgba(255, 255, 255, 0.3)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Personal</span>
            <a href="mailto:knitheesh0360@gmail.com" style={{
              fontSize: "clamp(0.8rem, 2vw, 1.4rem)",
              fontWeight: 400,
              fontFamily: "'Times New Roman', serif",
              fontStyle: "italic",
              color: "rgba(255, 255, 255, 0.8)", 
              textDecoration: "none",
              borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
              paddingBottom: "4px",
              width: "fit-content",
              transition: "all 0.4s ease"
            }}>
              knitheesh0360@gmail.com
            </a>
          </div>
        </div>
        </div>

        <div style={{ 
          marginTop: "6rem", 
          display: "flex", 
          gap: "clamp(2rem, 5vw, 4rem)",
          flexWrap: "wrap"
        }}>
          {[
            { name: "LinkedIn", url: "#" },
            { name: "GitHub", url: "#" }
          ].map((social) => (
            <a 
              key={social.name} 
              href={social.url} 
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#FFF",
                textDecoration: "none",
                opacity: 0.6,
                letterSpacing: "0.05em",
                transition: "opacity 0.3s ease"
              }}
              onMouseEnter={(e) => e.target.style.opacity = 1}
              onMouseLeave={(e) => e.target.style.opacity = 0.6}
            >
              {social.name} //
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
