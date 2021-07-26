
let tokeniser = (input) => {
let tokens = [];
let current = 0;
while (current < input.length) {
    // identifier
    let identReGex = /[a-z]/i;
    let identValue = '';
    let char = input[current];
    if (identReGex.test(char)) {
        while (identReGex.test(char) && current < input.length) {
            identValue += char;
            char = input[++current]; 
        }
        switch (identValue) {
            case 'let':
                tokens.push({
                    type: 'IDENT',
                    value: 'let'
                });
                break;

            case 'print':
                tokens.push({
                    type: 'IDENT',
                    value: 'print'
                });
                break;
            default:
                throw new TypeError("unkown identifier: " + identValue);
        }
        continue;
    }
    let numReGex = /[1-9]/;
    if (numReGex.test(char)) {
        let numValue = '';
        while (numReGex.test(char)) {
            numValue += char;
            char = input[++current];
        }
        tokens.push({
            type: 'NUMBER',
            value: numValue
        })
        continue;
    }

    // let stringReGex = /[a-z]/i;
    if (char === '"') {
        char = input[++current];
        let strValue = '';
        while (char !== '"') {
            strValue += char;
            char = input[++current];
        }
        tokens.push({
            type: 'STRING',
            value: strValue
        })
        current++;
        continue;
    }
    let WHITESPACE = /\s/;
    if (WHITESPACE.test(char)) {
        current++;
        continue;
    }
    if (char === '(') {
        tokens.push({
            type: 'openParen',
            value: '('
        });
        current++;
        continue;
    }
    if (char === ')') {
        tokens.push({
            type: 'closeParen',
            value: ')'
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
    throw new TypeError("unknown character: "+ char)

}
return tokens;
}
// tokeniser(`12 let \n 344`);
console.log(tokeniser(`12 let \n( "sdf" ) 344 "helloe"`));






function parser(tokens) {
    
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
