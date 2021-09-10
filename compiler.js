let tokeniser = (input) => {
  let tokens = [];
  let current = 0;
  while (current < input.length) {
    // identifier
    let identReGex = /[a-z]/i;
    let identValue = "";
    let char = input[current];
    if (identReGex.test(char)) {
      while (identReGex.test(char) && current < input.length) {
        identValue += char;
        char = input[++current];
      }
      switch (identValue) {
        case "let":
          tokens.push({
            type: "IDENT",
            value: "let",
          });
          break;

        case "print":
          tokens.push({
            type: "IDENT",
            value: "print",
          });
          break;
        default:
          throw new TypeError("unkown identifier: " + identValue);
      }
      continue;
    }
    // numbers
    let numReGex = /[1-9]/;
    if (numReGex.test(char)) {
      let numValue = "";
      while (numReGex.test(char)) {
        numValue += char;
        char = input[++current];
      }
      tokens.push({
        type: "NUMBER",
        value: numValue,
      });
      continue;
    }

    // let stringReGex = /[a-z]/i;
    if (char === '"') {
      char = input[++current];
      let strValue = "";
      while (char !== '"') {
        strValue += char;
        char = input[++current];
      }
      tokens.push({
        type: "STRING",
        value: strValue,
      });
      current++;
      continue;
    }
    let WHITESPACE = /\s/;
    if (WHITESPACE.test(char)) {
      current++;
      continue;
    }
    if (char === "(") {
      tokens.push({
        type: "OPENPAREN",
        value: "(",
      });
      current++;
      continue;
    }
    if (char === ")") {
      tokens.push({
        type: "CLOSEPARAN",
        value: ")",
      });
      current++;
      continue;
    }
    // if (char == '\n') {
    //     tokens.push({
    //         type: "NEWLINE",
    //         value: char
    //     });
    //     current++;
    //     continue;
    // }
    throw new TypeError("unknown character: " + char);
  }
  return tokens;
};


function parser(tokens) {
  let current = 0;
  function walk() {
    let token = tokens[current];
    if (token.type === "STRING") {
      current++;
      return {
        type: "STRING",
        value: token,
      };
    }
    if (token.type === "NUMBER") {
      current++;
      return {
        type: "NUMBER",
        value: token,
      };
    }
    if (token.type === "IDENT") {
      switch (token.value) {
        case "print":
          token = tokens[++current];
          let node = {
            type: "CALLEXPRESSION",
            name: "print",
            params: [],
          };
          if (token.type === "OPENPAREN") {
            // while (token.type !== 'CLOSEPAREN' &&
            // current < tokens.length) {
            //     token = tokens[++current];
            //     node.params.push[token];
            // }
            token = tokens[++current];
            node.params.push(token);
            current++;
            current++;
            return node;
          }

          // now the parser should checks if the next token if it is an open paren and while there is no close paren adds it to the parame
          break;
        default:
          break;
      }
    }
    throw new TypeError(token.type);
  }
  let ast = {
    type: "Program",
    body: [],
  };
  while (current < tokens.length) {
    ast.body.push(walk());
  }
  return ast;
}
/*

TODO 2: the parser 
it takes the tokens array and creates an ast 
we initialize the currnet var with zero and we create the walk function insitde it
it check the type of the token if it's a number then it retuens an object with type of numberLiteral and a value of the token.value, if it was a string we do the same but if the token type was an open paranthasis we retuen a node with type of callExpression and name equals token.name and paramertsre is an empty array then 
we call a wile function that's loops untill there is no token.type = paren or there is a closing paren then we push the tokens into the parameters array and we assign the the current token to token. 
and we sikip the closing paren 
and we return the node
if we have an unknown token we throw an error
*/

/*
TODO 3: the traverser


*/
function callExTransformer(callExN) {
    let newNode = {
      type: "NEWCALLEXPRESSION",
      name: callExN.name,
      params: [],
    };
    callExN.params.forEach((child) => {
      switch (child.type) {
        case "CALLEXPRESSION":
          newNode.params.push(callExTransformer(child));
          break;
        case "NUMBER":
          let newNumber = {
            type: "NEWNUMBER",
            value: child.value,
          };
          newNode.params.push(newNumber)
          break;
        case "STRING":
          let newString = {
            type: "NEWSTRING",
            value: child.value,
          };
          newNode.params.push(newString)
          break;
          default:
              console.log('it s an error');
              throw new TypeError(node.type)
      }
    });
  return newNode;
  }
let trasformer = (ast) => {
  let newAst = {
    type: "Program",
    body: [],
  };
  ast.body.forEach((node) => {
    switch (node.type) {
      case "CALLEXPRESSION":
        let newNode = callExTransformer(node);
        newAst.body.push(newNode);
        break;
    
        case "NUMBER":
            let newNumber = {
              type: "NEWNUMBER",
              value: child.value,
            };
            newAst.body.push(newNumber);
            break;
          case "STRING":
            let newString = {
              type: "NEWSTRING",
              value: child.value,
            };
            newAst.body.push(newString);
            break;
            default:
                console.log('it s an error');
                throw new TypeError(node.type)
        }
    });
    return newAst;
};


let codeGenerator = (node) => {
  switch (node.type) {
    case 'Program':
      return node.body.map(codeGenerator).join("\n");


      case "NEWCALLEXPRESSION":
        return (node.name 
        + '('
        + node.params.map(child => codeGenerator(child)).join(",")
        + ')'
        );

      case "NEWNUMBER":
        return node.value;
  
      case "NEWSTRING":
        return '"' + node.value + '"';
  
      default:
        throw new TypeError(node.type);
  }
}
let ast = parser(tokeniser(`print("hello")`));
let newAst = trasformer(ast);
let finalCode = codeGenerator(newAst);
console.log(finalCode);
// console.log(tokeniser(`12 let \n( "sdf" ) 344 "helloe"`));
