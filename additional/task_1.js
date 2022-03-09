function greeting(name) {
    console.log('Hello ' + name);
}

async function processUserInput() {
    return prompt('Please enter your name.');
}

processUserInput().then(greeting);
