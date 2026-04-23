import { useNavigate } from "react-router-dom";

export default function RoleSelection() {
  const navigate = useNavigate();

  const lang = localStorage.getItem("lang") || "en";

  const text = {
    en: {
      title: "Select Role",
      farmer: "Farmer",
      labour: "Labour",
      both: "Both"
    },
    kn: {
      title: "ಪಾತ್ರ ಆಯ್ಕೆಮಾಡಿ",
      farmer: "ರೈತ",
      labour: "ಕಾರ್ಮಿಕ",
      both: "ಎರಡೂ"
    },
    hi: {
      title: "भूमिका चुनें",
      farmer: "किसान",
      labour: "मजदूर",
      both: "दोनों"
    }
  };

  return (
    <div style={container}>
      <h1 style={{ marginBottom: "30px" }}>
        {text[lang].title}
      </h1>

      <div style={{ display: "flex", gap: "20px" }}>
        
        <button
          style={btn}
          onClick={() => {
            localStorage.setItem("role", "farmer");
            navigate("/login");
          }}
        >
          {text[lang].farmer} 🌾
        </button>

        <button
          style={btn}
          onClick={() => {
            localStorage.setItem("role", "labour");
            navigate("/login");
          }}
        >
          {text[lang].labour} 👷
        </button>

        <button
          style={btn}
          onClick={() => {
            localStorage.setItem("role", "both");
            navigate("/login");
          }}
        >
          {text[lang].both} 🔄
        </button>

      </div>
    </div>
  );
}

const container = {
  height: "100vh",
  background: "#0B0F1A",
  color: "white",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const btn = {
  padding: "12px 20px",
  borderRadius: "10px",
  border: "none",
  background: "linear-gradient(135deg,#6C4CF1,#9D4EDD)",
  color: "white",
  cursor: "pointer",
};