import CryptoJS from "crypto-js";

const secretKey = getEnv("CRYPTO_SECRET_KEY");

class Crypto {
  static encrypt(payload: unknown) {
    const data = JSON.stringify(payload);

    return CryptoJS.AES.encrypt(data, secretKey).toString();
  }

  static decrypt(payload: unknown) {
    if (!payload) return null;

    const bytes = CryptoJS.AES.decrypt(payload, secretKey);

    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }
}

export default Crypto;
