import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();

async function decryptDescription(encryptedDescription) {
  return new Promise((resolve, reject) => {
    try {
      const decipher = crypto.createDecipher('aes-256-cbc', process.env.SECRET_KEY);
      let decrypted = decipher.update(encryptedDescription, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      resolve(decrypted);
    } catch (err) {
      reject(err);
    }
  });
}

export default decryptDescription;
