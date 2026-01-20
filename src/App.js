import "./App.css";
import Codeeditor from "./components/codeeditor/codeeditor";
import Docs from "./components/docs/docs";
import logo from "./logo.svg";

function App() {
  return (
    <>
      <div className="heroSection">
        <div className="heroContainer">
          <img src={logo} alt="logo" id="logo" />
          <div>
            <h4 id="heroTitle">
              A Playful Fusion of Sanskrit & Kannada in Code
            </h4>
            <p id="heroDesc">
              🚀 Indiscript is a toy programming language designed for
              experimentation and fun! It blends the elegance of Sanskrit and
              the expressiveness of Kannada, allowing you to write and run code
              in a uniquely Indian way.
            </p>
          </div>
          <div id="ctaContainer">
            <a href="#indiscriptSection">
              <button id="tryButton">Try Indiscript Now</button>
            </a>
            <a href="#docsSection">
              <button id="viewDocsButton">View Docs</button>
            </a>
          </div>
        </div>
      </div>
      <div id="indiscriptSection">
        <Codeeditor />
      </div>
      <div id="docsSection">
        <Docs />
      </div>
      <footer
        style={{
          backgroundColor: "rgba(10, 14, 39, 0.95)",
          textAlign: "center",
          padding: "25px 20px",
          fontWeight: "500",
          borderTop: "1px solid rgba(14, 117, 0, 0.3)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 -4px 20px rgba(14, 117, 0, 0.1)",
          color: "#b8c5d6",
        }}
      >
        ⚡Built with Passion🔥by{" "}
        <span style={{
          color: "#10ff00",
          fontWeight: "700",
          textShadow: "0 0 10px rgba(14, 117, 0, 0.5)"
        }}>
          Shiva Ram Krishna
        </span>
        🚀
      </footer>
    </>
  );
}

export default App;
