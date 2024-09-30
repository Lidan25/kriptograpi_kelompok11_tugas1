// Kelompok 11 VIGENERE STANDART
var readlineSync = require("readline-sync");


function generateKey(str, key) {
  key = key.split("");
  if (str.length == key.length) return key.join("");
  else {
    let temp = key.length;
    for (let i = 0; i < str.length - temp; i++) {
      key.push(key[i % key.length]);
    }
  }
  return key.join("");
}


function cipherText(str, key) {
  let cipher_text = "";

  for (let i = 0; i < str.length; i++) {
    
    let x = (str[i].charCodeAt(0) + key[i].charCodeAt(0)) % 26;

    
    x += "A".charCodeAt(0);

    cipher_text += String.fromCharCode(x);
  }
  return cipher_text;
}


function originalText(cipher_text, key) {
  let orig_text = "";

  for (let i = 0; i < cipher_text.length; i++) {
   
    let x = (cipher_text[i].charCodeAt(0) - key[i].charCodeAt(0) + 26) % 26;

   
    x += "A".charCodeAt(0);
    orig_text += String.fromCharCode(x);
  }
  return orig_text;
}


function LowerToUpper(s) {
  let str = s.split("");
  for (let i = 0; i < s.length; i++) {
    if (s[i] == s[i].toLowerCase()) {
      str[i] = s[i].toUpperCase();
    }
  }
  s = str.toString();
  return s;
}


let str = readlineSync.question("Masukkan PlainText: ");
let keyword = readlineSync.question("Masukkan Keyword: ");

str = str.toUpperCase();
keyword = keyword.toUpperCase();

let key = generateKey(str, keyword);

let cipher_text = cipherText(str, key);

console.log("Ciphertext : " + cipher_text);

console.log("Original/Decrypted Text : " + originalText(cipher_text, key));
