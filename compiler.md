# Copillers Theory.
## 1. Parsing:
    parsing is splited into two main phaisis lexical analysis and syntactical analysis:
    - Lexical Analysis: witch takes the raw code and generates tokens by the **Tokeniszer**, Tokens are an array of objects that describe an isolated piece of the syntaxe.
    - Syntactic Analysic: takes the tokens and reformats them into a
    representation that describes each part of the syntax and their relation
    to one another. This is known as an intermediate representation or
    Abstract Syntax Tree.

 For the following syntax:

   `(add 2 (subtract 4 2))`

 Tokens might look something like this:

```   [
     { type: 'paren',  value: '('        },
     { type: 'name',   value: 'add'      },
     { type: 'number', value: '2'        },
     { type: 'paren',  value: '('        },
     { type: 'name',   value: 'subtract' },
     { type: 'number', value: '4'        },
     { type: 'number', value: '2'        },
     { type: 'paren',  value: ')'        },
     { type: 'paren',  value: ')'        },
   ]
```
 And an Abstract Syntax Tree (AST) might look like this:

```
   {
    type: 'Program',
    body: [{
      type: 'CallExpression',
      name: 'add',
      params: [{
        type: 'NumberLiteral',
        value: '2',
      }, {
        type: 'CallExpression',
        name: 'subtract',
        params: [{
          type: 'NumberLiteral',
          value: '4',
        }, {
          type: 'NumberLiteral',
          value: '2',
        }]
      }]
    }]
  } 
```
## 2. Transformation:
**traversal:** 
    
```
    var visitor = {
      NumberLiteral: {
        enter(node, parent) {},
        exit(node, parent) {},
      }
    };
```
## 3. Code Generation:
