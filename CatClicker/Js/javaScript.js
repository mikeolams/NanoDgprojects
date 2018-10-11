// Cat Clicker with vanilla JS (no jQuery)

// const catImg = document.getElementsByTagName('img'),
let catImg = document.querySelector("img"),
  clickCountDisplay = document.querySelector('span'),
   count = 0;;
catImg.addEventListener('click', function(){
  //if the element has been clicked... do stuff here
  count+=1;
  clickCountDisplay.innerText =count;
  console.log('count');
}, false);


// catImg.addEventListener('click', function(){
//   //if the element has been clicked... do stuff here
// console.log("kl")}, false);