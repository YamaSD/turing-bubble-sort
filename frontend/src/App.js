import React, { useState } from "react";

function App() {
  const [tapeInput, setTapeInput] = useState("1110001");
  const [steps, setSteps] = useState([]);
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
        setError(data.error);
        setSteps([]);
      } else {
        setSteps(data.steps);
        setError("");
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
        {steps.map((step, index) => (
          <div key={index} style={{ marginBottom: "8px" }}>
            <strong>Step {index}:</strong>{" "}
            {step.tape.split("").map((val, i) => (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  width: "20px",
                  textAlign: "center",
                  fontWeight: i === step.head ? "bold" : "normal",
                  color: i === step.head ? "red" : "black",
                }}
              >
                {val}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
