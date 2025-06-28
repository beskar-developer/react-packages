import CryptoJS from "crypto-js";

const secretKey = getEnv("CRYPTO_SECRET_KEY");

const crypto = {
  encrypt(payload) {
    const data = JSON.stringify(payload);

    return CryptoJS.AES.encrypt(data, secretKey).toString();
  },

  decrypt(payload) {
    if (!payload) return null;

    const bytes = CryptoJS.AES.decrypt(payload, secretKey);

    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  },
};

export default crypto;
