import { useNavigate } from "react-router-dom";

export default function LanguagePage() {
  const navigate = useNavigate();

  const selectLang = (lang) => {
    localStorage.setItem("lang", lang);
    navigate("/role");
  };

  return (
    <div style={container}>
      <h2>Welcome!</h2>
      <h3>Please Select Language</h3>

      <div style={grid}>
        <button style={btn} onClick={() => selectLang("en")}>English</button>
        <button style={btn} onClick={() => selectLang("kn")}>ಕನ್ನಡ</button>
        <button style={btn} onClick={() => selectLang("hi")}>हिंदी</button>
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

const grid = {
  display: "flex",
  gap: "20px",
  marginTop: "20px",
};

const btn = {
  padding: "15px 25px",
  borderRadius: "10px",
  border: "none",
  background: "#1F2937",
  color: "white",
  cursor: "pointer",
};