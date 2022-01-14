// Variables
const crypto = require('crypto');
const algorithm = 'aes-256-ctr';
const secretKey = 'x1QH8rEmpYWjRoInXc4rTws31ypEzFr9';
const iv = crypto.randomBytes(16);
// For use with password and storing encrypted password in mongoDB
const encrypt = (text) => {
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return {
        iv: iv.toString('hex'),
        content: encrypted.toString('hex')
    };
};
// For password decryption when changing password
const decrypt = (hash) => {

    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'));

    const decrypted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);

    return decrypted.toString();
};
// crypt export
module.exports = {
    encrypt,
    decrypt
};