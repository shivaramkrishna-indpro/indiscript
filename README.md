# 🚀 IndScript - Programming in Sanskrit & Kannada

IndScript is a delightful toy programming language that brings together the elegance of Sanskrit and the expressiveness of Kannada. Write code in your native Indian languages and experience programming in a whole new way!

## ✨ Features

### 🔤 Dual Language Support
- **Kannada Mode** - Write code using ಕನ್ನಡ keywords
- **Sanskrit Mode** - Write code using संस्कृत keywords
- Easy language switching with a simple toggle

### 🛠️ Language Constructs

| Feature | Kannada | Sanskrit | Description |
|---------|---------|-----------|-------------|
| Variables | `srsti` (ಸೃಷ್ಟಿ) | `srsti` (सृष्टि) | Declare variables |
| Print | `mudrisu` (ಮುದ್ರಿಸು) | `mudran` (मुद्रण) | Print output |
| Conditions | `onduVele` (ಒಂದು ವೇಳೆ) | `yadhi` (यदि) | If statements |
| Else | `illadiddare` (ಇಲ್ಲದಿದ್ದರೆ) | `anyatha` (अन्यथा) | Else statements |
| For Loop | `chakkra` (ಚಕ್ರ) | `chakra` (चक्र) | For loops |
| While Loop | `jabaki` (ಜಬಾಕಿ) | `yavat` (यावत्) | While loops |
| Functions | `kriya` (ಕ್ರಿಯೆ) | `karma` (कर्म) | Function declarations |
| Arrays | `tuppada` (ತುಪ್ಪಡ) | `suchi` (सूची) | Array/List declarations |
| Return | `tippu` (ತಿಪ್ಪು) | `vyakti` (व्यक्ति) | Return statements |

### 🎯 Code Editor Features

- **🌙 Dark/Light Theme** - Toggle between dark and light modes
- **📄 Line Numbers** - Clear line numbering for better code navigation
- **⌨️ Keyboard Shortcuts**:
  - `Ctrl + Enter` - Run code instantly
  - `Tab` - Auto-indentation (4 spaces)
  - Auto-complete for brackets: `()`, `[]`, `{}`, `""`, `''`
- **📋 Copy/Paste** - Easy code copying functionality
- **🗑️ Clear Editor** - Quick reset button
- **📊 Live Stats** - Real-time line and character count
- **❓ Interactive Help** - Built-in help modal with syntax guide

### 🎨 Modern UI/UX

- **🌈 Gradient Backgrounds** - Beautiful gradient designs
- **💫 Animations** - Smooth transitions and hover effects
- **📱 Responsive Design** - Works perfectly on all devices
- **🎪 Interactive Elements** - Engaging user interface components
- **🔥 Syntax Examples** - Pre-loaded code samples for quick testing

### 📚 Enhanced Documentation

- **📖 Interactive Docs** - Comprehensive language guide
- **💡 Code Examples** - Real-world usage examples
- **🔧 Operators Guide** - Complete operators reference
- **🚀 Quick Start** - Fast learning curve with examples

## 💻 Usage Examples

### Basic Variable and Print
```javascript
// Kannada
srsti name = "IndScript"
mudrisu name

// Sanskrit  
srsti name = "IndScript"
mudran name
```

### Conditions
```javascript
// Kannada
srsti age = 25
onduVele (age >= 18) {
    mudrisu "You are an adult"
} illadiddare {
    mudrisu "You are a minor"
}

// Sanskrit
srsti age = 25
yadhi (age >= 18) {
    mudran "You are an adult"  
} anyatha {
    mudran "You are a minor"
}
```

### Loops
```javascript
// For Loop (Kannada)
chakkra (srsti i = 1; i <= 5; i = i + 1) {
    mudrisu "Count: " + i
}

// While Loop (Sanskrit)
srsti x = 10
yavat (x > 0) {
    mudran x
    x = x - 1
}
```

### Functions
```javascript
// Kannada
kriya greet(name) {
    tippu "Hello, " + name + "!"
}

srsti message = greet("World")
mudrisu message

// Sanskrit
karma add(a, b) {
    vyakti a + b
}

srsti result = add(5, 3)
mudran result
```

### Arrays
```javascript
// Kannada
tuppada fruits = ["apple", "banana", "mango"]
mudrisu fruits

// Sanskrit
suchi numbers = [1, 2, 3, 4, 5]
mudran numbers
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd indiscript
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Technical Stack

- **Frontend**: React.js with modern ES6+ features
- **Styling**: Advanced CSS with gradients and animations
- **Parser**: Custom-built lexer and parser
- **Code Generation**: AST-based JavaScript compilation
- **Development**: Create React App with hot reloading

## 🎯 Advanced Features

### Operator Support
- **Arithmetic**: `+`, `-`, `*`, `/`, `%`
- **Comparison**: `==`, `!=`, `>`, `<`, `>=`, `<=`
- **Assignment**: `=`
- **Comments**: `//` (single-line), `/* */` (multi-line)

### Error Handling
- Comprehensive syntax error reporting
- Runtime error catching and display
- Helpful error messages for debugging

## 🌟 What's New (Recent Updates)

### 🚀 Major Enhancements
1. **Extended Language Support** - Added loops, functions, arrays, and comments
2. **Modern Code Editor** - Professional-grade editor with syntax highlighting
3. **Interactive Help System** - Built-in documentation and keyboard shortcuts
4. **Theme Support** - Dark/Light mode toggle
5. **Responsive Design** - Mobile-friendly interface
6. **Enhanced Documentation** - Comprehensive guides and examples

### 🎨 UI/UX Improvements
1. **Gradient Backgrounds** - Beautiful visual design
2. **Smooth Animations** - Enhanced user experience
3. **Interactive Elements** - Engaging hover effects
4. **Better Typography** - Improved readability
5. **Loading States** - Better feedback for user actions

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Areas for Contribution
- 🌐 More Indian language support (Tamil, Telugu, Hindi, etc.)
- 🔧 Additional language constructs (classes, modules)
- 🎨 UI/UX improvements
- 📚 Documentation enhancements
- 🧪 Testing and quality assurance

---

**Made with ❤️ and passion for Indian languages**

*IndScript - Where tradition meets technology!* 🚀