const fs = require("fs");
const crypto = require("crypto");

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 2048, 32, "sha512")
    .toString("hex");
  return [salt, hash].join("$");
}

console.log(hashPassword(process.argv[2]));

function writeSecrets(secrets) {
  fs.writeFileSync("pula.md", JSON.stringify(secrets));
}
exports.writeSecrets = writeSecrets;
