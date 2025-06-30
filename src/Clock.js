import React, { useEffect, useState } from "react";

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = String(time.getHours()).padStart(2, "0");
  const minutes = String(time.getMinutes()).padStart(2, "0");
  const seconds = String(time.getSeconds()).padStart(2, "0");

  const active = {
    hour1: parseInt(hours[0]),
    hour2: parseInt(hours[1]),
    min1: parseInt(minutes[0]),
    min2: parseInt(minutes[1]),
    sec1: parseInt(seconds[0]),
    sec2: parseInt(seconds[1]),
  };

  const getTimeClass = (hour) => {
    if (hour >= 6 && hour < 12) return "morning";
    else if (hour >= 12 && hour < 18) return "noon";
    else if (hour >= 18 && hour < 20) return "evening";
    else if (hour >= 20 && hour < 24) return "night";
    else return "late-night";
  };

  const renderColumn = (digits, activeDigit, className) => {
    const digitHeight = 36;
    const centerOffset = ((digitHeight * digits.length) / 2) - digitHeight / 2;
    const translateOffset = centerOffset - activeDigit * digitHeight;

    return (
      <div style={styles.columnWrapper}>
        <div style={styles.digitViewport}>
          <div
            style={{
              ...styles.digitColumn,
              transform: `translateY(${translateOffset}px)`,
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
                width: "100%",
                backgroundColor: "#e2dad0",
                borderRadius: "7px",
                zIndex: 0,
                boxShadow: "0 5px 12px rgba(225, 226, 120, 0.6), inset 0 0 3px rgba(95, 97, 77, 0.65)",
                border: "1px solid #d8cfc6",
              }}
            />
            {digits.map((digit, index) => (
              <div
                key={index}
                className={`${className}-${digit}`}
                style={{
                  ...styles.digit,
                  ...(digit === activeDigit ? styles.activeDigit : {}),
                  zIndex: 1,
                }}
              >
                {digit}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const Separator = () => <div style={styles.separator}>:</div>;

  const hour = time.getHours();
  const isMobile = window.innerWidth < 768;

  return (
    <div className={`wrapper ${getTimeClass(hour)}`} style={styles.wrapper}>
      <div className="layoutContainer" style={styles.layoutContainer}>
        <div className="titleBox" style={styles.titleBox}>
          <h1 style={styles.title}>🧠⏳ Time Anatomy</h1>
        </div>

        <div className="clock" style={{
          ...styles.clock,
          transform: `scale(${Math.min(window.innerWidth / 480, 1)})`, 
          transformOrigin: "top center",
        }}>
          {renderColumn([0, 1, 2], active.hour1, "hour1")}
          {renderColumn([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], active.hour2, "hour2")}
          <Separator />
          {renderColumn([0, 1, 2, 3, 4, 5], active.min1, "min1")}
          {renderColumn([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], active.min2, "min2")}
          <Separator />
          {renderColumn([0, 1, 2, 3, 4, 5], active.sec1, "sec1")}
          {renderColumn([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], active.sec2, "sec2")}
        </div>
        <div className="infoBox" style={styles.infoBox}>
          <div style={styles.infoText}>
            🗓️ {time.toLocaleDateString(undefined, {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <div style={styles.infoText}>
            🕰️ {time.toLocaleTimeString(undefined, {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
  minHeight: "100vh",
  width: "100vw",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(16deg, #d8cfc6, #a89e8f, #c9c5bf)",
  //backgroundSize: "200% 200%",
  //animation: "gradientFlow 40s ease infinite",
  position: "relative",
  zIndex: 0,
  overflow: "hidden",
},

layoutContainer: {
  width: "100%",
  maxWidth: "1400px",
  margin: "0 auto",
  padding: "0 2vw",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "row", 
  justifyContent: "space-between",
  alignItems: "center",
  gap: "20px",
  flexWrap: "wrap", 
},


  titleBox: {
  flex: "1 1 250px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "10px",
  width: "100%", 
  minWidth: 0,   },

  title: {
  fontSize: "clamp(1.5rem, 3vw, 3rem)",
  color: "#ffffff",
  fontWeight: "bold",
  textShadow: "1px 1px 4px rgba(167, 154, 16, 0.58)",
  textAlign: "center",        
  whiteSpace: "normal",       
  wordBreak: "break-word",    
  
},

  clock: {
  flex: "2 1 480px",
  display: "flex",
  flexWrap: "nowrap",
  justifyContent: "center",
  alignItems: "center",
  gap: "8px",
  overflow: "visible",
  padding: "10px 15px",
},
  columnWrapper: {
    width: "30px",
    padding: "4px",
    height: "670px",
    padding : "0 10px",
  },
  digitViewport: {
    height: "100%",
    width: "30px",
    overflow: "visible",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    zIndex: 2,
  },
  digitColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    transition: "transform 0.5s cubic-bezier(0.25, 1.5, 0.5, 1)",

  },
  digit: {
    width: "30px",
    height: "30px",
    color: "#6f5e43",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1.2rem",
    fontWeight: "600",
    
    margin: "3px 0",
  },
activeDigit: {
  width: "36px",
  height: "36px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#7b4402",
  color: "#fee973",
  fontSize: "1.3rem",
  fontWeight: "bold",
  borderRadius: "50%", 
  border: "3px solid transparent",
  background: "linear-gradient(#4E2B02, #7b4402) padding-box, linear-gradient(135deg, #FFD700, #FFC371) border-box",
  transform: "scale(1.3)",
  zIndex: 3,
  boxShadow: "0 0 12px rgba(255, 223, 128, 0.6)"

  
},


  separator: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#ffffff",
    animation: "blink 1s step-start infinite",
    margin: "0 4px",
    textShadow: "0 0 5px rgba(0,0,0,0.4)",
  },
  infoBox: {
  flex: "1 1 100%",
  marginBottom: "20px",
  padding: "20px 25px",
  borderRadius: "20px",
  background: "linear-gradient(145deg, rgba(255, 255, 255, 0.08), rgba(0, 0, 0, 0.25))",
  boxShadow: "0 8px 20px rgba(241, 243, 116, 0.6), inset 0 0 10px rgba(117, 120, 97, 0.65)",
  border: "3px solid #d8cfc6",
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
  color: "#f9f9f9", 
  fontSize: "1.3rem",
  fontWeight: "600",
  fontFamily: "'Segoe UI', sans-serif",
  maxWidth: "340px",
  letterSpacing: "0.6px",
  textAlign: "left",
  zIndex: 3,
  transition: "all 0.3s ease-in-out",
},
infoText: {
  marginBottom: "12px",
  lineHeight: "1.7",
  color: "#fff", 
}

};

const styleTag = document.createElement("style");
styleTag.innerHTML = `

@keyframes blink {
  0%, 100% { opacity: 1 }
  50% { opacity: 0 }
}
@keyframes pulse {
  0% { box-shadow: 0 0 0px rgba(161, 196, 253, 0.5); }
  50% { box-shadow: 0 0 12px rgba(161, 196, 253, 0.8); }
  100% { box-shadow: 0 0 0px rgba(161, 196, 253, 0.5); }
}
@keyframes gradientFlow {
  0% { background-position: 0% 0%; }
  25% { background-position: 100% 0%; }
  50% { background-position: 100% 100%; }
  75% { background-position: 0% 100%; }
  100% { background-position: 0% 0%; }
}
.clock::-webkit-scrollbar {
  display: none; /* Chrome, Safari */
}

.clock {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;     /* Firefox */
}


@media (max-width: 768px) {
  .wrapper .layoutContainer {
    flex-direction: column !important;  /* now vertical */
    align-items: center !important;
    justify-content: center !important;
  }

  .wrapper .titleBox {
    width: 100% !important;
    justify-content: center !important;
    margin-bottom: 10px;
  }

  .wrapper .clock {
    order: 2;
    justify-content: center !important;
  }

  .wrapper .infoBox {
    order: 3;
    align-self: center !important;
    margin-top: 15px;
  }
    .wrapper .titleBox h1 {
    text-align: center !important;
  }
}

`;
document.head.appendChild(styleTag);

export default Clock;
