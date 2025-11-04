import { useState } from "react";
import "./App.css";

export default function App() {
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState("");
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [top, setTop] = useState(null);

  
  const API_BASE =
    window.location.hostname === "localhost"
      ? "http://localhost:7071/api"
      : "/api";

  const onFile = (e) => {
    const f = e.target.files?.[0];
    setError("");
    setTop(null);
    setFile(f || null);
    setFilename(f ? f.name : "");
    setPreview(f ? URL.createObjectURL(f) : null);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setError("");
    setTop(null);

    try {
      
      const res = await fetch(`${API_BASE}/predict`, {
        method: "POST",
        body: file,
      });
      if (!res.ok) throw new Error(`${res.status}: ${await res.text()}`);

      const json = await res.json();
      const preds = json?.predictions || json?.Predictions || [];
      const best =
        Array.isArray(preds) && preds.length
          ? [...preds].sort((a, b) => b.probability - a.probability)[0]
          : null;

      if (!best) throw new Error("Ei ennusteita vastauksessa.");
      setTop({ tagName: best.tagName, probability: best.probability });
    } catch (err) {
      setError(err.message || "Tuntematon virhe.");
    } finally {
      setLoading(false);
    }
  };

  const renderResult = () => {
    if (!top) return null;
    const pct = (top.probability * 100).toFixed(1);
    const isSukka = (top.tagName || "").toLowerCase().includes("sukka");
    const emoji = isSukka ? "🧦" : "🧤";
    const label = isSukka ? "Sukka" : "Hanska";
    return (
      <p className="resultLine">
        <strong>Tulos:</strong> {pct}% {emoji} {label}
      </p>
    );
  };

  return (
    <main className="page">
      <section className="card">
        <header className="header">
          <h1>🧦Sukka vai 🧤Hanska?</h1>
          <p className="sub">
            Lataa kuva, niin palvelu tunnistaa onko se sukka vai hanska.
          </p>
        </header>

        <form className="form" onSubmit={onSubmit}>
          <label className="fileInput">
            <input type="file" accept="image/*" onChange={onFile} />
            <span>Valitse kuva...</span>
          </label>
          <span className="filename" title={filename || "Ei valittua tiedostoa."}>
            {filename || "Ei valittua tiedostoa"}
          </span>

          {preview && (
            <div className="previewWrap">
              <img src={preview} alt="Esikatselu" className="previewImg" />
            </div>
          )}

          <button className="btn primary" type="submit" disabled={!file || loading}>
            {loading ? "Analysoidaan..." : "Tunnista"}
          </button>
        </form>

        {error && (
          <div className="alert">
            <strong>Virhe: </strong>
            {error}
          </div>
        )}

        {!error && !loading && renderResult()}
      </section>
    </main>
  );
}
