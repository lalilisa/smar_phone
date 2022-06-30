const p = 'smart phone';


// expected output: "The quick brown fox jumps over the lazy monkey. If the dog reacted, was it really lazy?"

const phrase = "how to learn javascript";
//(^\w|\s\w)
capitalStr = phrase.replace(/\b[a-z]/, c => c.toUpperCase());
let ss=phrase.replace(/\b[a-z]/g, m => m.toUpperCase());
console.log(ss)