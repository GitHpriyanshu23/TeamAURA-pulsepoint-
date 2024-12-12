import React, { useState } from "react";

function WasteManagementSystem() {
  const [wasteCounters, setWasteCounters] = useState({
    regular: {
      dressings: 0,
      napkins: 0,
      gloves: 0,
    },
    biohazardous: {
      blood_tubing: 0,
      bloody_dressing: 0,
      infectious_materials: 0,
    },
    sharps: {
      syringes: 0,
      needles: 0,
      blades: 0,
    },
    pharmaceutical: {
      vials: 0,
      expired_medicine: 0,
      cytotoxic: 0,
    },
  });

  const handleIncrease = (category, item) => {
    setWasteCounters((prevState) => ({
      ...prevState,
      [category]: {
        ...prevState[category],
        [item]: prevState[category][item] + 1,
      },
    }));
  };

  const handleDecrease = (category, item) => {
    setWasteCounters((prevState) => ({
      ...prevState,
      [category]: {
        ...prevState[category],
        [item]: Math.max(prevState[category][item] - 1, 0),
      },
    }));
  };

  const disposeAllWaste = () => {
    alert("All waste from all categories has been disposed to the municipal system.");
    setWasteCounters({
      regular: { dressings: 0, napkins: 0, gloves: 0 },
      biohazardous: { blood_tubing: 0, bloody_dressing: 0, infectious_materials: 0 },
      sharps: { syringes: 0, needles: 0, blades: 0 },
      pharmaceutical: { vials: 0, expired_medicine: 0, cytotoxic: 0 },
    });
  };

  const displayDisposedWaste = () => {
    const disposedWaste = Object.entries(wasteCounters)
      .map(([category, items]) =>
        Object.entries(items)
          .map(([item, count]) => `${item.replace(/_/g, " ")}: ${count}`)
          .join("\n")
      )
      .join("\n\n");
    alert(`Waste disposed so far:\n\n${disposedWaste}`);
  };

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", background: "#e3f2fd", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <header style={{ background: "#3f51b5", color: "white", textAlign: "center", padding: "20px" }}>
        <h1>Waste Management System</h1>
      </header>

      <main style={{ flex: 1, padding: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            width: "100%",
            maxWidth: "1200px",
          }}
        >
          {/* Regular Waste */}
          <CategoryBox title="Regular Waste" items={wasteCounters.regular} category="regular" onIncrease={handleIncrease} onDecrease={handleDecrease} />

          {/* Biohazardous Waste */}
          <CategoryBox title="Biohazardous Waste" items={wasteCounters.biohazardous} category="biohazardous" onIncrease={handleIncrease} onDecrease={handleDecrease} />

          {/* Sharps Waste */}
          <CategoryBox title="Sharps Waste" items={wasteCounters.sharps} category="sharps" onIncrease={handleIncrease} onDecrease={handleDecrease} />

          {/* Pharmaceutical Waste */}
          <CategoryBox title="Pharmaceutical Waste" items={wasteCounters.pharmaceutical} category="pharmaceutical" onIncrease={handleIncrease} onDecrease={handleDecrease} />
        </div>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button onClick={disposeAllWaste} style={buttonStyle("#FF5722")}>
            Dispose All Waste to Municipal
          </button>
          <button onClick={displayDisposedWaste} style={buttonStyle("#4CAF50")}>
            View Disposed Waste Data
          </button>
        </div>
      </main>

      
    </div>
  );
}

function CategoryBox({ title, items, category, onIncrease, onDecrease }) {
  return (
    <div style={categoryStyle}>
      <h2>{title}</h2>
      {Object.keys(items).map((item) => (
        <WasteItem
          key={item}
          name={item}
          count={items[item]}
          onIncrease={() => onIncrease(category, item)}
          onDecrease={() => onDecrease(category, item)}
        />
      ))}
    </div>
  );
}

function WasteItem({ name, count, onIncrease, onDecrease }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
      <span style={{ textTransform: "capitalize" }}>{name.replace(/_/g, " ")}:</span>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <button onClick={onDecrease} style={buttonStyle("black")}>
          -
        </button>
        <span>{count}</span>
        <button onClick={onIncrease} style={buttonStyle("black")}>
          +
        </button>
      </div>
    </div>
  );
}

const categoryStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
};

const buttonStyle = (color) => ({
  background: color,
  color: "white",
  border: "none",
  padding: "10px 20px",
  borderRadius: "5px",
  cursor: "pointer",
  fontWeight: "bold",
});

export default WasteManagementSystem;
