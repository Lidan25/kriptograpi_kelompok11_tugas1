// Kelompok 11 Play Fair Cipher
const readlineSync = require('readline-sync');

function generateKeyTable(key, ks, keyT) {
  let i,
    j,
    k,
    flag = 0;


  let dicty = new Array(26).fill(0);
  for (i = 0; i < ks; i++) {
    let r = key[i].charCodeAt(0) - 97;

    if (key[i] != "j") {
      dicty[r] = 2;
    }
  }

  dicty["j".charCodeAt(0) - 97] = 1;
  i = 0;
  j = 0;

  for (k = 0; k < ks; k++) {
    let r = key[k].charCodeAt(0) - 97;
    if (dicty[r] == 2) {
      dicty[r] -= 1;
      keyT[i][j] = key[k];
      j++;
      if (j == 5) {
        i++;
        j = 0;
      }
    }
  }

  for (k = 0; k < 26; k++) {
    if (dicty[k] == 0) {
      keyT[i][j] = String.fromCharCode(k + 97);
      j++;
      if (j == 5) {
        i++;
        j = 0;
      }
    }
  }
  return keyT;
}


function search(keyT, a, b, arr) {
  let i, j;

  if (a == "j") a = "i";
  else if (b == "j") b = "i";

  for (i = 0; i < 5; i++) {
    for (j = 0; j < 5; j++) {
      if (keyT[i][j] == a) {
        arr[0] = i;
        arr[1] = j;
      } else if (keyT[i][j] == b) {
        arr[2] = i;
        arr[3] = j;
      }
    }
  }
  return arr;
}


function mod5(a) {
  return a % 5;
}


function prepare(str, ptrs) {
  if (ptrs % 2 != 0) {
    str += "z";
  }

  return [str, ptrs];
}


function encrypt(str, keyT, ps) {
  let i;
  let a = new Array(4).fill(0);
  let newstr = new Array(ps);

  for (i = 0; i < ps; i += 2) {
    let brr = search(keyT, str[i], str[i + 1], a);
    let k1 = brr[0];
    let k2 = brr[1];
    let k3 = brr[2];
    let k4 = brr[3];
    if (k1 == k3) {
      newstr[i] = keyT[k1][(k2 + 1) % 5];
      newstr[i + 1] = keyT[k1][(k4 + 1) % 5];
    } else if (k2 == k4) {
      newstr[i] = keyT[(k1 + 1) % 5][k2];
      newstr[i + 1] = keyT[(k3 + 1) % 5][k2];
    } else {
      newstr[i] = keyT[k1][k4];
      newstr[i + 1] = keyT[k3][k2];
    }
  }
  let res = "";

  for (let i = 0; i < newstr.length; i++) {
    res += newstr[i];
  }
  return res;
}


function encryptByPlayfairCipher(str, key) {
  let ps, ks;
  let keyT = new Array(5);

  for (let i = 0; i < 5; i++) {
    keyT[i] = new Array(5);
  }
  str = str.trim();
  key = key.trim();
  str = str.toLowerCase();

  key = key.toLowerCase();
  ps = str.length;
  ks = key.length;
  [str, ps] = prepare(str, ps);

  let kt = generateKeyTable(key, ks, keyT);
  return encrypt(str, kt, ps);
}


let str = readlineSync.question("Masukkan Plain Text: ").toUpperCase();
let key = readlineSync.question("Masukkan Key: ").toUpperCase();



console.log("Plain text: " + str);
console.log("Key text: " + key );



console.log("Cipher text: " + encryptByPlayfairCipher(str, key));

