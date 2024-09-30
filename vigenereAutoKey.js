// Kelompok 11 Vigenere Auto Key
const readlineSync = require("readline-sync");

function encrypt(plainText, key) {
  let encryptedText = "";
  let autoKey = key + plainText; 
  autoKey = autoKey.slice(0, plainText.length); 

  for (let i = 0; i < plainText.length; i++) {
    let char = plainText[i];
    if (/[A-Za-z]/.test(char)) {
      
      let keyChar = autoKey[i]; 
      let shift = keyChar.toUpperCase().charCodeAt(0) - 65; 
      let base = char === char.toUpperCase() ? 65 : 97; 
      encryptedText += String.fromCharCode(((char.charCodeAt(0) - base + shift) % 26) + base);
    } else {
      encryptedText += char; 
    }
  }

  return encryptedText;
}

function decrypt(encryptedText, key) {
  let decryptedText = "";
  let autoKey = key;

  for (let i = 0; i < encryptedText.length; i++) {
    let char = encryptedText[i];
    if (/[A-Za-z]/.test(char)) {
      
      let keyChar = autoKey[i];
      let shift = keyChar.toUpperCase().charCodeAt(0) - 65; 
      let base = char === char.toUpperCase() ? 65 : 97; 
      let decryptedChar = String.fromCharCode(((char.charCodeAt(0) - base - shift + 26) % 26) + base);
      decryptedText += decryptedChar;
      autoKey += decryptedChar; 
    } else {
      decryptedText += char; 
    }
  }

  return decryptedText;
}


let plainText = readlineSync.question("Masukkan PlainText: ").toUpperCase();
let key = readlineSync.question("Masukkan Key: ").toUpperCase();

let encrypted = encrypt(plainText, key);
console.log(`Ciphertext: ${encrypted}`);

let decrypted = decrypt(encrypted, key);
console.log(`Original/Decrypted Text: ${decrypted}`);
