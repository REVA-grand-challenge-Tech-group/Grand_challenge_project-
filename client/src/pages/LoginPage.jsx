import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();

  const lang = localStorage.getItem("lang") || "en";
  const role = localStorage.getItem("role");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const text = {
    en: {
      title: "Login",
      name: "Enter Name",
      phone: "Enter Phone Number",
      login: "Continue",
      role: "Role"
    },
    kn: {
      title: "ಲಾಗಿನ್",
      name: "ಹೆಸರು ನಮೂದಿಸಿ",
      phone: "ಫೋನ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ",
      login: "ಮುಂದುವರಿಸಿ",
      role: "ಪಾತ್ರ"
    },
    hi: {
      title: "लॉगिन",
      name: "नाम दर्ज करें",
      phone: "फोन नंबर दर्ज करें",
      login: "जारी रखें",
      role: "भूमिका"
    }
  };

  return (
    <div style={container}>
      <div style={box}>
        <h2>{text[lang].title} 🔐</h2>

        <p style={{ fontSize: "14px", opacity: 0.7 }}>
          {text[lang].role}: {role}
        </p>

        <input
          placeholder={text[lang].name}
          style={input}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder={text[lang].phone}
          style={input}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button
          style={btn}
          onClick={() => {
            localStorage.setItem("name", name);
            localStorage.setItem("phone", phone);
            navigate("/dashboard");
          }}
        >
          {text[lang].login}
        </button>
      </div>
    </div>
  );
}

const container = {
  height: "100vh",
  background: "#0B0F1A",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
};

const box = {
  padding: "30px",
  borderRadius: "15px",
  background: "#111827",
  boxShadow: "0 0 20px rgba(108,76,241,0.5)",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  minWidth: "250px",
};

const input = {
  padding: "10px",
  borderRadius: "8px",
  border: "none",
};

const btn = {
  padding: "10px",
  borderRadius: "8px",
  border: "none",
  background: "linear-gradient(135deg,#6C4CF1,#9D4EDD)",
  color: "white",
  cursor: "pointer",
};