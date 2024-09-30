// Kelompok 11 Hill Cipher
const readlineSync = require('readline-sync');

function getKeyMatrix(key, keyMatrix) {
  let k = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      keyMatrix[i][j] = key[k].charCodeAt(0) % 65;
      k++;
    }
  }
}


function encrypt(cipherMatrix, keyMatrix, messageVector) {
  let x, i, j;
  for (i = 0; i < 3; i++) {
    for (j = 0; j < 1; j++) {
      cipherMatrix[i][j] = 0;

      for (x = 0; x < 3; x++) {
        cipherMatrix[i][j] += keyMatrix[i][x] * messageVector[x][j];
      }

      cipherMatrix[i][j] = cipherMatrix[i][j] % 26;
    }
  }
}


function HillCipher(message, key) {
  
  let keyMatrix = new Array(3);
  for (let i = 0; i < 3; i++) {
    keyMatrix[i] = new Array(3);
    for (let j = 0; j < 3; j++) keyMatrix[i][j] = 0;
  }
  getKeyMatrix(key, keyMatrix);

  let messageVector = new Array(3);
  for (let i = 0; i < 3; i++) {
    messageVector[i] = new Array(1);
    messageVector[i][0] = 0;
  }

  
  for (let i = 0; i < 3; i++) messageVector[i][0] = message[i].charCodeAt(0) % 65;

  let cipherMatrix = new Array(3);
  for (let i = 0; i < 3; i++) {
    cipherMatrix[i] = new Array(1);
    cipherMatrix[i][0] = 0;
  }

  
  encrypt(cipherMatrix, keyMatrix, messageVector);

  let CipherText = "";

 
  for (let i = 0; i < 3; i++) CipherText += String.fromCharCode(cipherMatrix[i][0] + 65);

  
  console.log(" Ciphertext: " + CipherText);
}


function messageValidation () {
  let isValid = false;
  let input = '';

  while (!isValid) {
    input = readlineSync.question('Masukkan Plain Text: ');
    if(input.length === 3) {
      isValid = true;
    }
    else {
      console.log("Error your Plain Text less or more than 3 characters!!")
    }
  }
  return input
}


function keyValidation () {
  let isValid = false;
  let input ='';

  while(!isValid) {
    input = readlineSync.question('Masukkan Key: ');
    if(input.length === 9 ) {
      isValid = true;
    }
    else {
      console.log("Error your key less or more than 9 characters!!")
    }
  }
  return input;
}

let message = messageValidation().toUpperCase();

let key = keyValidation().toUpperCase();


HillCipher(message, key);
