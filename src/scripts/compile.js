function lexer(input, language) {
  const keywords =
    language === "kannada"
      ? ["srsti", "mudrisu", "onduVele", "illadiddare", "chakkra", "jabaki", "kriya", "tuppada", "tippu"]
      : ["srsti", "mudran", "yadhi", "anyatha", "chakra", "yavat", "karma", "suchi", "vyakti"];
  
  // Extended keywords mapping:
  // srsti/srsti = variable declaration
  // mudrisu/mudran = print
  // onduVele/yadhi = if
  // illadiddare/anyatha = else  
  // chakkra/chakra = for loop
  // jabaki/yavat = while loop
  // kriya/karma = function
  // tuppada/suchi = array/list
  // tippu/vyakti = return

  const tokens = [];
  let cursor = 0;

  const isAlphaNum = (char) => /[a-zA-Z0-9_]/.test(char); // No change needed
  const isOperator = (char) => /[+\-*%/=<>\!]/.test(char); // Fixed unnecessary escapes
  const isWhitespace = (char) => /\s/.test(char);

  while (cursor < input.length) {
    let char = input[cursor];

    if (isWhitespace(char)) {
      cursor++;
      continue;
    }

    // Handle comments (// for single line)
    if (char === '/' && input[cursor + 1] === '/') {
      while (cursor < input.length && input[cursor] !== '\n') {
        cursor++;
      }
      continue;
    }

    // Handle multi-line comments (/* */)
    if (char === '/' && input[cursor + 1] === '*') {
      cursor += 2;
      while (cursor < input.length - 1) {
        if (input[cursor] === '*' && input[cursor + 1] === '/') {
          cursor += 2;
          break;
        }
        cursor++;
      }
      continue;
    }

    if (/[a-zA-Z_]/.test(char)) {
      let word = "";
      while (cursor < input.length && isAlphaNum(char)) {
        word += char;
        char = input[++cursor];
      }

      const type = keywords.includes(word) ? "keyword" : "identifier";
      tokens.push({ type, value: word });
      continue;
    }

    if (/\d/.test(char)) {
      let num = "";
      while (cursor < input.length && /\d/.test(char)) {
        num += char;
        char = input[++cursor];
      }
      tokens.push({ type: "number", value: parseInt(num, 10) });
      continue;
    }

    if (char === '"') {
      let str = "";
      char = input[++cursor];
      while (cursor < input.length && char !== '"') {
        str += char;
        char = input[++cursor];
      }
      if (char === '"') {
        cursor++; // Skip the closing quote
      } else {
        console.error("Unterminated string literal"); // Debugging log
      }
      tokens.push({ type: "string", value: str });
      continue;
    }

    if (isOperator(char)) {
      let operator = char;
      const nextChar = input[cursor + 1];
      if (char === "=" && nextChar === "=") operator = "==";
      else if (char === "!" && nextChar === "=") operator = "!=";
      else if (char === "<" && nextChar === "=") operator = "<=";
      else if (char === ">" && nextChar === "=") operator = ">=";

      if (operator.length > 1) cursor++;
      tokens.push({ type: "operator", value: operator });
      cursor++;
      continue;
    }

    if (["(", ")", "{", "}", "[", "]", ";", ","].includes(char)) {
      const type =
        char === "(" || char === ")"
          ? "paren"
          : char === "{" || char === "}"
          ? "brace"
          : char === "[" || char === "]"
          ? "bracket"
          : char === ","
          ? "comma"
          : "semicolon";
      tokens.push({ type, value: char });
      cursor++;
      continue;
    }

    console.error(`Unexpected character: ${char}`); // Debugging log
    cursor++;
  }

  return [tokens, keywords];
}

function parser(tokens, keywords) {
  const ast = {
    type: "Program",
    body: [],
  };

  function parseExpression() {
    let expr = "";
    let depth = 0;
    while (tokens.length > 0) {
      const token = tokens[0];
      if ((token.type === "semicolon" || 
           (token.type === "keyword" && depth === 0) ||
           (token.type === "brace" && token.value === "}" && depth === 0) ||
           (token.type === "comma" && depth === 0)) && depth === 0) {
        break;
      }
      if (token.type === "paren" || token.type === "bracket" || token.type === "brace") {
        depth += token.value === "(" || token.value === "[" || token.value === "{" ? 1 : -1;
      }
      expr += tokens.shift().value + " ";
    }
    return expr.trim();
  }

  while (tokens.length > 0) {
    let token = tokens.shift();

    if (token.type === "keyword" && token.value === keywords[0]) {
      // Handle variable declaration (srsti)
      if (tokens.length === 0) {
        throw new Error("Expected variable name after 'srsti'");
      }
      let varName = tokens.shift().value;
      let value = null;
      // Check for assignment
      if (
        tokens.length > 0 &&
        tokens[0].type === "operator" &&
        tokens[0].value === "="
      ) {
        tokens.shift(); // Consume '='
        // If next token is a string, use its value as a string literal
        if (tokens.length > 0 && tokens[0].type === "string") {
          value = '"' + tokens.shift().value + '"';
        } else {
          let expression = "";
          while (
            tokens.length > 0 &&
            tokens[0].type !== "keyword" &&
            tokens[0].value !== "}"
          ) {
            expression += tokens.shift().value;
          }
          value = expression.trim();
        }
      }
      ast.body.push({
        type: "Decleration",
        name: varName,
        value: value,
      });
    }

    if (token.type === "keyword" && token.value === keywords[1]) {
      // Handle print statement (mudrisu)
      if (tokens.length === 0) {
        throw new Error("Expected expression after 'mudrisu'");
      }
      let expressionToken = tokens.shift();
      let expression;
      if (expressionToken.type === "string") {
        expression = '"' + expressionToken.value + '"';
      } else {
        expression = expressionToken.value;
      }
      ast.body.push({
        type: "Print",
        expression: expression,
      });
    }

    if (token.type === "keyword" && token.value === keywords[2]) {
      // Handle if statement (onduVele)
      if (tokens.length === 0 || tokens[0].value !== "(") {
        throw new Error("Expected '(' after 'onduVele'");
      }
      tokens.shift(); // Consume '('

      let condition = "";
      while (
        tokens.length > 0 &&
        (tokens[0].type !== "paren" || tokens[0].value !== ")")
      ) {
        condition += tokens.shift().value;
      }
      if (tokens.length === 0 || tokens[0].value !== ")") {
        throw new Error("Expected ')' after condition");
      }
      tokens.shift(); // Consume ')'

      if (tokens.length === 0 || tokens[0].value !== "{") {
        throw new Error("Expected '{' after condition");
      }
      tokens.shift(); // Consume '{'

      let body = [];
      while (tokens.length > 0 && tokens[0].value !== "}") {
        body.push(tokens.shift());
      }
      if (tokens.length === 0 || tokens[0].value !== "}") {
        throw new Error("Expected '}' after if body");
      }
      tokens.shift(); // Consume '}'

      // Check for else (illadiddare)
      let elseBody = null;
      if (
        tokens.length > 0 &&
        tokens[0].type === "keyword" &&
        tokens[0].value === keywords[3]
      ) {
        tokens.shift(); // Consume 'illadiddare'
        if (tokens.length === 0 || tokens[0].value !== "{") {
          throw new Error("Expected '{' after 'illadiddare'");
        }
        tokens.shift(); // Consume '{'
        elseBody = [];
        while (tokens.length > 0 && tokens[0].value !== "}") {
          elseBody.push(tokens.shift());
        }
        if (tokens.length === 0 || tokens[0].value !== "}") {
          throw new Error("Expected '}' after else body");
        }
        tokens.shift(); // Consume '}'
      }

      ast.body.push({
        type: "IfStatement",
        condition: condition.trim(),
        body: parser(body, keywords), // Recursively parse the body
        elseBody: elseBody ? parser(elseBody, keywords) : null, // Recursively parse the else body
      });
    }

    // Handle for loop (chakkra/chakra)
    if (token.type === "keyword" && token.value === keywords[4]) {
      if (tokens.length === 0 || tokens[0].value !== "(") {
        throw new Error("Expected '(' after for loop keyword");
      }
      tokens.shift(); // Consume '('

      let init = parseExpression();
      if (tokens.length === 0 || tokens[0].type !== "semicolon") {
        throw new Error("Expected ';' after for loop initialization");
      }
      tokens.shift(); // Consume ';'

      let condition = parseExpression();
      if (tokens.length === 0 || tokens[0].type !== "semicolon") {
        throw new Error("Expected ';' after for loop condition");
      }
      tokens.shift(); // Consume ';'

      let increment = parseExpression();
      if (tokens.length === 0 || tokens[0].value !== ")") {
        throw new Error("Expected ')' after for loop increment");
      }
      tokens.shift(); // Consume ')'

      if (tokens.length === 0 || tokens[0].value !== "{") {
        throw new Error("Expected '{' after for loop header");
      }
      tokens.shift(); // Consume '{'

      let body = [];
      while (tokens.length > 0 && tokens[0].value !== "}") {
        body.push(tokens.shift());
      }
      if (tokens.length === 0 || tokens[0].value !== "}") {
        throw new Error("Expected '}' after for loop body");
      }
      tokens.shift(); // Consume '}'

      ast.body.push({
        type: "ForLoop",
        init: init.trim(),
        condition: condition.trim(),
        increment: increment.trim(),
        body: parser(body, keywords)
      });
    }

    // Handle while loop (jabaki/yavat)
    if (token.type === "keyword" && token.value === keywords[5]) {
      if (tokens.length === 0 || tokens[0].value !== "(") {
        throw new Error("Expected '(' after while loop keyword");
      }
      tokens.shift(); // Consume '('

      let condition = "";
      while (tokens.length > 0 && (tokens[0].type !== "paren" || tokens[0].value !== ")")) {
        condition += tokens.shift().value;
      }
      if (tokens.length === 0 || tokens[0].value !== ")") {
        throw new Error("Expected ')' after while loop condition");
      }
      tokens.shift(); // Consume ')'

      if (tokens.length === 0 || tokens[0].value !== "{") {
        throw new Error("Expected '{' after while loop condition");
      }
      tokens.shift(); // Consume '{'

      let body = [];
      while (tokens.length > 0 && tokens[0].value !== "}") {
        body.push(tokens.shift());
      }
      if (tokens.length === 0 || tokens[0].value !== "}") {
        throw new Error("Expected '}' after while loop body");
      }
      tokens.shift(); // Consume '}'

      ast.body.push({
        type: "WhileLoop",
        condition: condition.trim(),
        body: parser(body, keywords)
      });
    }

    // Handle function declaration (kriya/karma)
    if (token.type === "keyword" && token.value === keywords[6]) {
      if (tokens.length === 0) {
        throw new Error("Expected function name after function keyword");
      }
      let funcName = tokens.shift().value;

      if (tokens.length === 0 || tokens[0].value !== "(") {
        throw new Error("Expected '(' after function name");
      }
      tokens.shift(); // Consume '('

      let params = [];
      while (tokens.length > 0 && tokens[0].value !== ")") {
        if (tokens[0].type === "identifier") {
          params.push(tokens.shift().value);
        }
        if (tokens.length > 0 && tokens[0].type === "comma") {
          tokens.shift(); // Consume comma
        }
      }
      if (tokens.length === 0 || tokens[0].value !== ")") {
        throw new Error("Expected ')' after function parameters");
      }
      tokens.shift(); // Consume ')'

      if (tokens.length === 0 || tokens[0].value !== "{") {
        throw new Error("Expected '{' after function parameters");
      }
      tokens.shift(); // Consume '{'

      let body = [];
      while (tokens.length > 0 && tokens[0].value !== "}") {
        body.push(tokens.shift());
      }
      if (tokens.length === 0 || tokens[0].value !== "}") {
        throw new Error("Expected '}' after function body");
      }
      tokens.shift(); // Consume '}'

      ast.body.push({
        type: "FunctionDeclaration",
        name: funcName,
        params: params,
        body: parser(body, keywords)
      });
    }

    // Handle array declaration (tuppada/suchi)
    if (token.type === "keyword" && token.value === keywords[7]) {
      if (tokens.length === 0) {
        throw new Error("Expected array name after array keyword");
      }
      let arrayName = tokens.shift().value;
      
      if (tokens.length > 0 && tokens[0].type === "operator" && tokens[0].value === "=") {
        tokens.shift(); // Consume '='
        
        if (tokens.length > 0 && tokens[0].value === "[") {
          tokens.shift(); // Consume '['
          let elements = [];
          
          while (tokens.length > 0 && tokens[0].value !== "]") {
            let element = parseExpression();
            if (element) elements.push(element);
            if (tokens.length > 0 && tokens[0].type === "comma") {
              tokens.shift(); // Consume comma
            }
          }
          
          if (tokens.length === 0 || tokens[0].value !== "]") {
            throw new Error("Expected ']' after array elements");
          }
          tokens.shift(); // Consume ']'
          
          ast.body.push({
            type: "ArrayDeclaration",
            name: arrayName,
            elements: elements
          });
        }
      }
    }

    // Handle return statement (tippu/vyakti)
    if (token.type === "keyword" && token.value === keywords[8]) {
      let expression = parseExpression();
      ast.body.push({
        type: "ReturnStatement",
        expression: expression
      });
    }
  }

  return ast;
}

function codeGen(node) {
  switch (node.type) {
    case "Program":
      return node.body.map(codeGen).join("\n");
    case "Decleration":
      return `const ${node.name} = ${node.value || 'undefined'};`;
    case "LetDecleration": // Handle let declarations in loops
      return `let ${node.name} = ${node.value || 'undefined'};`;
    case "Print":
      return `console.log(${node.expression});`;
    case "IfStatement":
      return (
        `if (${node.condition}) {\n${codeGen(node.body)}\n}` +
        (node.elseBody ? ` else {\n${codeGen(node.elseBody)}\n}` : "")
      );
    case "ForLoop":
      return `for (${node.init}; ${node.condition}; ${node.increment}) {\n${codeGen(node.body)}\n}`;
    case "WhileLoop":
      return `while (${node.condition}) {\n${codeGen(node.body)}\n}`;
    case "FunctionDeclaration":
      return `function ${node.name}(${node.params.join(', ')}) {\n${codeGen(node.body)}\n}`;
    case "ArrayDeclaration":
      return `const ${node.name} = [${node.elements.join(', ')}];`;
    case "ReturnStatement":
      return `return ${node.expression};`;
    default:
      throw new TypeError(`Unknown node type: ${node.type}`);
  }
}

function compiler(input, language) {
  const [tokens, keywords] = lexer(input, language);
  const ast = parser(tokens, keywords);
  const executableCode = codeGen(ast);
  return executableCode;
}

export function runner(input, language) {
  const executableCode = compiler(input, language);
  let output = "";

  const originalConsoleLog = console.log;
  console.log = (...args) => {
    output += args.join(" ") + "\n";
  };

  try {
    eval(executableCode);
  } catch (error) {
    output += `Error: ${error.message}\n`;
  } finally {
    console.log = originalConsoleLog;
  }

  return output.trim();
}
