// Kelompok 11 Super Cipher
const readlineSync = require('readline-sync');

//
function vigenereEncrypt(plainText, key) {
  let encryptedText = "";
  plainText = plainText.toUpperCase().replace(/[^A-Z]/g, ""); 
  key = key.toUpperCase();
  let keyIndex = 0;

  for (let i = 0; i < plainText.length; i++) {
    let plainChar = plainText.charCodeAt(i) - 65;
    let keyChar = key.charCodeAt(keyIndex % key.length) - 65;
    let encryptedChar = ((plainChar + keyChar) % 26) + 65; 
    encryptedText += String.fromCharCode(encryptedChar);
    keyIndex++;
  }

  return encryptedText;
}


function columnarTranspositionEncrypt(msg) {
  let cipher = "";

  
  let k_indx = 0;

  const msg_len = msg.length;
  const msg_lst = Array.from(msg);
  const key_lst = Array.from(transpositionKey).sort();

  
  const col = transpositionKey.length;

  
  const row = Math.ceil(msg_len / col);

  
  const fill_null = row * col - msg_len;
  for (let i = 0; i < fill_null; i++) {
    msg_lst.push("");
  }

  
  const matrix = [];
  for (let i = 0; i < msg_lst.length; i += col) {
    matrix.push(msg_lst.slice(i, i + col));
  }

  
  for (let _ = 0; _ < col; _++) {
    const curr_idx = transpositionKey.indexOf(key_lst[k_indx]);
    for (const row of matrix) {
      cipher += row[curr_idx];
    }
    k_indx++;
  }

  return cipher;
}


function superEncrypt(plainText, vigenereKey, transpositionKey) {
  
  let vigenereEncrypted = vigenereEncrypt(plainText, vigenereKey);
  console.log(`Hasil Vigenere Cipher: ${vigenereEncrypted}`);

  
  let finalEncryptedText = columnarTranspositionEncrypt(vigenereEncrypted);
  return finalEncryptedText;
}

function transpositionKeyValidation() {
  let isValid = false;
  let input ='';

  while(!isValid) {
    input = readlineSync.question("Enter your position key (must number): ");
    if (parseInt(input)) {
      isValid = true;
    }
    else {
      console.log("Error input must number!!");
    }
  }
  
  return input.toString();
}



let plainText = readlineSync.question("Masukkan plain Text: ").toUpperCase();
let vigenereKey = readlineSync.question("Masukkan vigenere key: ").toUpperCase();
let transpositionKey = transpositionKeyValidation(); 

let encryptedText = superEncrypt(plainText, vigenereKey, transpositionKey);
console.log(`Teks akhir yang terenkripsi: ${encryptedText}`);
