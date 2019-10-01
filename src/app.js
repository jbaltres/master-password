const readline = require("readline");
const { executeCommand } = require("./lib/commands");
const crypto = require("crypto");

const userArgv = process.argv.slice(2);
const [action, key, value] = userArgv;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const masterPasswordHash =
  "1fd807a39fdcb8ee139e296704d12efe$552912dd37e6138d8ff9933d5848266cc5c53558a60d3f50ccf2c8383ccdec3d";

rl.question("What is the master password? ", password => {
  rl.output.write("\n");
  if (verifyHash(password, masterPasswordHash)) {
    executeCommand(password, action, key, value);
  } else {
    console.log("Invalid master password!");
  }
  rl.close();
});

// Override default output to hide password
rl._writeToOutput = function _writeToOutput() {
  rl.output.write("*");
};

// Checking the password hash
function verifyHash(password, original) {
  const originalHash = original.split("$")[1];
  const salt = original.split("$")[0];
  const hash = crypto
    .pbkdf2Sync(password, salt, 2048, 32, "sha512")
    .toString("hex");

  return hash === originalHash;
}
