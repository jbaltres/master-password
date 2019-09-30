const { readSecrets, writeSecrets } = require("./models/secrets");

/*
commands:

set {key} {value}
unset {key}
get {key}
*/

const userArgv = process.argv.slice(2);
const [action, key, value] = userArgv;

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
  const secrets = readSecrets();
  const secret = secrets[key];
  console.log(secret);
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

/*
// solution 1:
switch (action) {
  case "get":
    get(key);
    break;
  case "set":
    set(key, value);
    break;
  case "unset":
    unset(key);
    break;
  default:
    throw new Error("unknown action");
}


// solution 3:
const commands = {
  set,
  get,
  unset
};

const command = commands[action];
if (!command) {
  throw new Error("unknown action");
}
command(key, value);
*/
