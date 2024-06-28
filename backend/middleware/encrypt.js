import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();


async function encryptDescription(description) {
  return new Promise((resolve, reject) => {
    try {
      const cipher = crypto.createCipher('aes-256-cbc', process.env.SECRET_KEY);
      let encrypted = cipher.update(description, 'utf8', 'hex');
      encrypted += cipher.final('hex');
      resolve(encrypted);
    } catch (err) {
      reject(err);
    }
  });
}

export default encryptDescription;



// import crypto from 'crypto';

// // const hashDescription = (description) => {
// //   return new Promise((resolve, reject) => {
// //     try {
// //       const hash = crypto.createHash('md5').update(description, 'utf8').digest('hex');
// //       resolve(hash);
// //     } catch (err) {
// //       reject(err);
// //     }
// //   });
// // };

// async function hashDescription(description) {
//   return new Promise((resolve, reject) => {
//     const hash = crypto.createHash('sha256'); // Use SHA-256 hashing algorithm
//     hash.update(description);
//     const hashedDescription = hash.digest('hex'); // Get the hashed output in hexadecimal format
//     resolve(hashedDescription);
//   });
// }

// export default hashDescription;