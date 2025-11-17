import React, { useState, useRef } from "react";
import "./codeeditor.css";
import { runner } from "../../scripts/compile";

const Codeeditor = () => {
  const [language, setLanguage] = useState("kannada");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const textareaRef = useRef(null);

  // Sample code for different features
  const sampleCode = {
    basic: language === "kannada" ? 
      `// Basic variable and print\nsrsti name = "IndScript"\nmudrisu name` :
      `// Basic variable and print\nsrsti name = "IndScript"\nmudran name`,
    
    loops: language === "kannada" ? 
      `// Loop example\nchakkra (srsti i = 1; i <= 3; i = i + 1) {\n    mudrisu "Count: " + i\n}` :
      `// Loop example\nchakra (srsti i = 1; i <= 3; i = i + 1) {\n    mudran "Count: " + i\n}`,
    
    conditions: language === "kannada" ? 
      `// Condition example\nsrsti age = 20\nonduVele (age >= 18) {\n    mudrisu "Adult"\n} illadiddare {\n    mudrisu "Minor"\n}` :
      `// Condition example\nsrsti age = 20\nyadhi (age >= 18) {\n    mudran "Adult"\n} anyatha {\n    mudran "Minor"\n}`
  };

  // Switch language function
  const handleLanguageSwitch = (lang) => {
    setLanguage(lang);
  };

  // Handle code changes in the editor
  const handleEditorChange = (e) => {
    setCode(e.target.value);
  };

  // Handle keyboard shortcuts
  const handleKeyDown = (e) => {
    // Ctrl + Enter to run code
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      executeCode();
    }
    
    // Tab indentation
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.target;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newValue = code.substring(0, start) + '    ' + code.substring(end);
      setCode(newValue);
      
      // Set cursor position after the inserted tab
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
    }

    // Auto-complete brackets and quotes
    const pairs = {
      '(': ')',
      '[': ']',
      '{': '}',
      '"': '"',
      "'": "'"
    };

    if (pairs[e.key]) {
      e.preventDefault();
      const textarea = e.target;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = code.substring(start, end);
      const newValue = code.substring(0, start) + e.key + selectedText + pairs[e.key] + code.substring(end);
      setCode(newValue);
      
      // Set cursor position
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 1 + selectedText.length;
      }, 0);
    }
  };

  // Load sample code
  const loadSample = (type) => {
    setCode(sampleCode[type]);
  };

  // Copy code to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code).then(() => {
      alert("Code copied to clipboard!");
    });
  };

  // Clear editor
  const clearEditor = () => {
    setCode("");
    setOutput("");
  };

  // Execute code and print it to the console
  const executeCode = () => {
    setIsRunning(true);
    try {
      const result = runner(code, language);
      setOutput(result);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  // Toggle help modal
  const toggleHelp = () => {
    setShowHelp(!showHelp);
  };

  // Get line numbers
  const getLineNumbers = () => {
    const lines = code.split('\n').length;
    return Array.from({length: Math.max(lines, 10)}, (_, i) => i + 1);
  };

  return (
    <div id="editorWrapper">
      <div className="editor-header">
        <h2 className="editor-title">
          ⚡ IndScript Code Editor
        </h2>
        <div className="editor-stats">
          <span className="stat">Lines: {code.split('\n').length}</span>
          <span className="stat">Characters: {code.length}</span>
        </div>
      </div>

      {/* Toolbar */}
      <div className="toolbar">
        <div className="toolbar-left">
          <div id="langBtnContainer">
            <button
              onClick={() => handleLanguageSwitch("kannada")}
              className={language === "kannada" ? "activeLanguage" : ""}
            >
              🔤 ಕನ್ನಡ
            </button>
            <button
              onClick={() => handleLanguageSwitch("sanskrit")}
              className={language === "sanskrit" ? "activeLanguage" : ""}
            >
              🔤 संस्कृत
            </button>
          </div>

          <div className="sample-buttons">
            <button onClick={() => loadSample('basic')} className="sample-btn">
              📝 Basic
            </button>
            <button onClick={() => loadSample('loops')} className="sample-btn">
              🔁 Loops  
            </button>
            <button onClick={() => loadSample('conditions')} className="sample-btn">
              🔀 If-Else
            </button>
          </div>
        </div>

        <div className="toolbar-right">
          <button onClick={toggleHelp} className="help-btn">
            ❓ Help
          </button>
          <button onClick={copyToClipboard} className="action-btn">
            📋 Copy
          </button>
          <button onClick={clearEditor} className="action-btn">
            🗑️ Clear
          </button>
          <button
            id="runButton"
            onClick={executeCode}
            disabled={isRunning}
            className={isRunning ? "running" : ""}
          >
            {isRunning ? "⏳ Running..." : "▶️ Run Code"}
          </button>
        </div>
      </div>

      {/* Code Editor Area */}
      <div className="editor-container">
        <div className="line-numbers">
          {getLineNumbers().map(num => (
            <div key={num} className="line-number">{num}</div>
          ))}
        </div>
        <textarea
          ref={textareaRef}
          className="codeEditor"
          placeholder={`Write your ${language === 'kannada' ? 'ಕನ್ನಡ' : 'संस्कृत'} IndScript code here...\n\nTry:\n${sampleCode.basic}`}
          spellCheck="false"
          value={code}
          onChange={handleEditorChange}
          onKeyDown={handleKeyDown}
        />
      </div>

      {/* Output Section */}
      <div className="output-section">
        <div className="output-header">
          <h3>📤 Output</h3>
          <div className="output-controls">
            <span className="output-status">
              {output ? "✅ Ready" : "⚪ Waiting..."}
            </span>
          </div>
        </div>
        <div className="outputBox">
          {output ? (
            <pre className="output-content">{output}</pre>
          ) : (
            <div className="output-placeholder">
              <p>🎯 Run your code to see the output here!</p>
              <p className="output-hint">
                Press the <strong>Run Code</strong> button or use <kbd>Ctrl + Enter</kbd>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Help */}
      <div className="quick-help">
        <h4>🚀 Quick Start:</h4>
        <div className="help-items">
          <span className="help-item">
            <code>srsti x = 10</code> - Declare variable
          </span>
          <span className="help-item">
            <code>{language === 'kannada' ? 'mudrisu' : 'mudran'} x</code> - Print output
          </span>
          <span className="help-item">
            <code>{language === 'kannada' ? 'onduVele' : 'yadhi'} (x > 5)</code> - Conditions
          </span>
          <span className="help-item">
            <code>{language === 'kannada' ? 'chakkra' : 'chakra'} (i=1; i{"<"}=5; i=i+1)</code> - Loops
          </span>
        </div>
      </div>

      {/* Help Modal */}
      {showHelp && (
        <div className="help-modal-overlay" onClick={toggleHelp}>
          <div className="help-modal" onClick={(e) => e.stopPropagation()}>
            <div className="help-header">
              <h2>🎯 IndScript Help & Shortcuts</h2>
              <button className="close-btn" onClick={toggleHelp}>✕</button>
            </div>
            
            <div className="help-content">
              <div className="help-section">
                <h3>⌨️ Keyboard Shortcuts</h3>
                <ul>
                  <li><kbd>Ctrl</kbd> + <kbd>Enter</kbd> - Run code</li>
                  <li><kbd>Tab</kbd> - Insert 4 spaces (indentation)</li>
                  <li>Auto-complete: <kbd>(</kbd> <kbd>[</kbd> <kbd>{"{"}</kbd> <kbd>"</kbd> <kbd>'</kbd></li>
                </ul>
              </div>

              <div className="help-section">
                <h3>🔤 Language Syntax</h3>
                <div className="syntax-examples">
                  <div className="syntax-item">
                    <h4>Variables</h4>
                    <code>srsti myVar = 42</code>
                  </div>
                  <div className="syntax-item">
                    <h4>Print</h4>
                    <code>{language === 'kannada' ? 'mudrisu' : 'mudran'} "Hello World"</code>
                  </div>
                  <div className="syntax-item">
                    <h4>Conditions</h4>
                    <code>{language === 'kannada' ? 'onduVele' : 'yadhi'} (x > 10) {'{'} {language === 'kannada' ? 'mudrisu' : 'mudran'} "Big" {'}'}</code>
                  </div>
                  <div className="syntax-item">
                    <h4>For Loop</h4>
                    <code>{language === 'kannada' ? 'chakkra' : 'chakra'} (srsti i = 0; i {"<"} 5; i = i + 1) {"{"} {language === 'kannada' ? 'mudrisu' : 'mudran'} i {"}"}</code>
                  </div>
                  <div className="syntax-item">
                    <h4>While Loop</h4>
                    <code>{language === 'kannada' ? 'jabaki' : 'yavat'} (x > 0) {'{'} x = x - 1 {'}'}</code>
                  </div>
                  <div className="syntax-item">
                    <h4>Functions</h4>
                    <code>{language === 'kannada' ? 'kriya' : 'karma'} add(a, b) {'{'} {language === 'kannada' ? 'tippu' : 'vyakti'} a + b {'}'}</code>
                  </div>
                  <div className="syntax-item">
                    <h4>Arrays</h4>
                    <code>{language === 'kannada' ? 'tuppada' : 'suchi'} numbers = [1, 2, 3, 4, 5]</code>
                  </div>
                </div>
              </div>

              <div className="help-section">
                <h3>🔧 Operators</h3>
                <div className="operators-help">
                  <span><code>+</code> Addition</span>
                  <span><code>-</code> Subtraction</span>
                  <span><code>*</code> Multiplication</span>
                  <span><code>/</code> Division</span>
                  <span><code>%</code> Modulus</span>
                  <span><code>==</code> Equal</span>
                  <span><code>!=</code> Not Equal</span>
                  <span><code>{">"}</code> Greater</span>
                  <span><code>{"<"}</code> Less</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Codeeditor;
