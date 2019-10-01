const crypto = require("crypto");
const { readSecrets, writeSecrets } = require("./secrets");

function set(password, key, value) {
  const mykey = crypto.createCipher("aes-128-cbc", password);
  let encryptedValue = mykey.update(value, "utf8", "hex");
  encryptedValue += mykey.final("hex");

  const secrets = readSecrets();
  secrets[key] = encryptedValue;
  writeSecrets(secrets);
}

function unset(password, key) {
  const secrets = readSecrets();
  delete secrets[key];
  writeSecrets(secrets);
}

function get(password, key) {
  const secrets = readSecrets();
  const secret = secrets[key];

  const mykey = crypto.createDecipher("aes-128-cbc", password);
  let decrypted = mykey.update(secret, "hex", "utf8");
  decrypted += mykey.final("utf8");

  console.log(decrypted);
  return decrypted;
}

const commands = {
  set,
  get,
  unset
};

exports.executeCommand = function executeCommand(password, action, key, value) {
  const command = commands[action];
  if (!command) {
    throw new Error("unknown action");
  }
  return command(password, key, value);
};
