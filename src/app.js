const { readSecrets, writeSecrets } = require("./models/secrets");
const readline = require("readline");
const masterPassword = "1234";
/*
commands:

set {key} {value}
unset {key}
get {key}
*/

const userArgv = process.argv.slice(2);
const [action, key, value] = userArgv;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//  It is enough to call the correct function and log the required parameters.

function set(key, value) {
  const secrets = readSecrets();
  secrets[key] = value;
  writeSecrets(secrets);
}

function unset(key) {
  const secrets = readSecrets();
  delete secrets[key];
  writeSecrets(secrets);
}

function get(key) {
  rl.question("Tell me ur PIN 🔫! ", answer => {
    if (answer === masterPassword) {
      console.log(`Your Pin is WRONG!!! Just kiddin 😛 : ${answer}`);
      const secrets = readSecrets();
      const secret = secrets[key];
      console.log(secret);
    } else {
      console.log("Password Fälschlich");
    }
    rl.close();
  });
}

// call the correct function based on action

function perform() {
  if (action === "set") {
    set(key, value);
  } else if (action === "unset") {
    unset(key);
  } else if (action === "get") {
    get(key);
  } else {
    throw new Error("unknown action");
  }
}

perform();
