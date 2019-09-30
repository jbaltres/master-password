exports.readSecrets = function readSecrets() {
  return {
    pin: 1234,
    wlan: "pw1234"
  };
};

exports.writeSecretes = function writeSecrets(secrets) {
  console.log("Write secrets", secrets);
};
