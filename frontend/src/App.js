import React, { useState } from "react";

function App() {
  const [tapeInput, setTapeInput] = useState("1110001");
  const [allSteps, setAllSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [error, setError] = useState("");

  const handleSimulate = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tape: tapeInput }),
      });

      const data = await response.json();

      if (data.error) {
        setAllSteps([]);
        setCurrentStepIndex(0);
        setError(data.error);
      } else {
        setAllSteps(data.steps);
        setCurrentStepIndex(0);
        setError("");

        // Animate step-by-step
        let index = 0;
        const interval = setInterval(() => {
          index++;
          if (index >= data.steps.length) {
            clearInterval(interval);
          } else {
            setCurrentStepIndex(index);
          }
        }, 500); // 500ms between steps (adjustable)
      }
    } catch (err) {
      setError("Could not connect to backend.");
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h2>Turing Bubble Sort Simulator</h2>

      <input
        value={tapeInput}
        onChange={(e) => setTapeInput(e.target.value)}
        placeholder="Enter tape (e.g., 1110001)"
        style={{ width: "200px", marginRight: "10px" }}
      />
      <button onClick={handleSimulate}>Run Simulation</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ marginTop: "1.5rem" }}>
        {allSteps.length > 0 && (
          <div>
            <strong>Step {currentStepIndex}:</strong>{" "}
            {allSteps[currentStepIndex].tape.split("").map((val, i) => (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  width: "20px",
                  textAlign: "center",
                  fontWeight:
                    i === allSteps[currentStepIndex].head ? "bold" : "normal",
                  color:
                    i === allSteps[currentStepIndex].head ? "red" : "black",
                }}
              >
                {val}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
