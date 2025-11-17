import React from "react";
import "./docs.css"

const keywords = [
  {
    kannada: "srsti (ಸೃಷ್ಟಿ)",
    sanskrit: "srsti (सृष्टि)",
    description: "Used to declare a variable.",
    example: "srsti x = 10"
  },
  {
    kannada: "mudrisu (ಮುದ್ರಿಸು)",
    sanskrit: "mudran (मुद्रण)",
    description: "Prints output to console.",
    example: 'mudrisu "Hello World"'
  },
  {
    kannada: "onduVele (ಒಂದು ವೇಳೆ)",
    sanskrit: "yadhi (यदि)",
    description: "Executes a block of code if a condition is true.",
    example: "onduVele (x > 5) { mudrisu x }"
  },
  {
    kannada: "illadiddare (ಇಲ್ಲದಿದ್ದರೆ)",
    sanskrit: "anyatha (अन्यथा)",
    description: "Executes alternative block if condition is false.",
    example: "illadiddare { mudrisu 0 }"
  },
  {
    kannada: "chakkra (ಚಕ್ರ)",
    sanskrit: "chakra (चक्र)",
    description: "For loop - repeats code block with initialization, condition, and increment.",
    example: "chakkra (srsti i = 0; i < 5; i = i + 1) { mudrisu i }"
  },
  {
    kannada: "jabaki (ಜಬಾಕಿ)",
    sanskrit: "yavat (यावत्)",
    description: "While loop - repeats code block while condition is true.",
    example: "jabaki (x > 0) { mudrisu x }"
  },
  {
    kannada: "kriya (ಕ್ರಿಯೆ)",
    sanskrit: "karma (कर्म)",
    description: "Declares a function with parameters.",
    example: "kriya add(a, b) { tippu a + b }"
  },
  {
    kannada: "tuppada (ತುಪ್ಪಡ)",
    sanskrit: "suchi (सूची)",
    description: "Declares an array/list to store multiple values.",
    example: "tuppada nums = [1, 2, 3, 4, 5]"
  },
  {
    kannada: "tippu (ತಿಪ್ಪು)",
    sanskrit: "vyakti (व्यक्ति)",
    description: "Returns a value from a function.",
    example: "tippu x + y"
  },
];
const Docs = () => {
  const [selectedLanguage, setSelectedLanguage] = React.useState('kannada');

  const examples = {
    basic: `// Basic variable and print
srsti name = "IndScript"
mudrisu name
mudrisu "Welcome to IndScript!"`,
    
    conditions: `// If-else conditions
srsti age = 18
onduVele (age >= 18) {
    mudrisu "You are an adult"
} illadiddare {
    mudrisu "You are a minor"
}`,
    
    loops: `// For loop example
chakkra (srsti i = 1; i <= 5; i = i + 1) {
    mudrisu "Count: " + i
}

// While loop example
srsti x = 10
jabaki (x > 0) {
    mudrisu x
    x = x - 1
}`,
    
    functions: `// Function declaration and usage
kriya greet(name) {
    tippu "Hello, " + name + "!"
}

srsti message = greet("World")
mudrisu message`,
    
    arrays: `// Array operations
tuppada numbers = [1, 2, 3, 4, 5]
mudrisu numbers
tuppada fruits = ["apple", "banana", "mango"]
mudrisu fruits`
  };

  return (
    <div id="docsContainer">
      <div className="docs-wrapper">
        <h2 style={{ opacity: ".5", marginBottom: "30px", textAlign: "center", fontSize: "28px" }}>
          📚 IndScript Documentation
        </h2>
        
        {/* Language Toggle */}
        <div className="language-toggle">
          <button 
            className={selectedLanguage === 'kannada' ? 'active' : ''}
            onClick={() => setSelectedLanguage('kannada')}
          >
            ಕನ್ನಡ (Kannada)
          </button>
          <button 
            className={selectedLanguage === 'sanskrit' ? 'active' : ''}
            onClick={() => setSelectedLanguage('sanskrit')}
          >
            संस्कृत (Sanskrit)  
          </button>
        </div>

        {/* Keywords Table */}
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Keyword</th>
                <th>Description</th>
                <th>Example Usage</th>
              </tr>
            </thead>
            <tbody>
              {keywords.map((keyword, index) => (
                <tr key={index}>
                  <td className="keyword-cell">
                    <code>{selectedLanguage === 'kannada' ? keyword.kannada : keyword.sanskrit}</code>
                  </td>
                  <td>{keyword.description}</td>
                  <td className="example-cell">
                    <code>{keyword.example}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Code Examples */}
        <div className="examples-container">
          <h3>💡 Code Examples</h3>
          
          <div className="example-grid">
            <div className="example-card">
              <h4>🎯 Basic Usage</h4>
              <pre><code>{examples.basic}</code></pre>
            </div>
            
            <div className="example-card">
              <h4>🔀 Conditions</h4>
              <pre><code>{examples.conditions}</code></pre>
            </div>
            
            <div className="example-card">
              <h4>🔁 Loops</h4>
              <pre><code>{examples.loops}</code></pre>
            </div>
            
            <div className="example-card">
              <h4>⚡ Functions</h4>
              <pre><code>{examples.functions}</code></pre>
            </div>
            
            <div className="example-card">
              <h4>📋 Arrays</h4>
              <pre><code>{examples.arrays}</code></pre>
            </div>
          </div>
        </div>

        {/* Operators Guide */}
        <div className="operators-section">
          <h3>🔧 Operators & Syntax</h3>
          <div className="operators-grid">
            <div className="operator-card">
              <h4>Arithmetic</h4>
              <ul>
                <li><code>+</code> Addition</li>
                <li><code>-</code> Subtraction</li>
                <li><code>*</code> Multiplication</li>
                <li><code>/</code> Division</li>
                <li><code>%</code> Modulus</li>
              </ul>
            </div>
            <div className="operator-card">
              <h4>Comparison</h4>
              <ul>
                <li><code>==</code> Equal to</li>
                <li><code>!=</code> Not equal</li>
                <li><code>&gt;</code> Greater than</li>
                <li><code>&lt;</code> Less than</li>
                <li><code>&gt;=</code> Greater or equal</li>
                <li><code>&lt;=</code> Less or equal</li>
              </ul>
            </div>
            <div className="operator-card">
              <h4>Comments</h4>
              <ul>
                <li><code>// Single line</code></li>
                <li><code>/* Multi-line */</code></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Docs;
