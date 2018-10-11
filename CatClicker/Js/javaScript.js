// Cat Clicker with vanilla JS (no jQuery)

// const catImg = document.getElementsByTagName('img'),

// code for initial requirement

// let catImg = document.querySelector("img"),
//   clickCountDisplay = document.querySelector('span'),
//    count = 0;;
// catImg.addEventListener('click', function(){
//   //if the element has been clicked... do stuff here
//   count+=1;
//   clickCountDisplay.innerText =count;
//   console.log('count');
// }, false);


// catImg.addEventListener('click', function(){
//   //if the element has been clicked... do stuff here
// console.log("kl")}, false);





//Code modified for second requirements implemented below

// to select individual cat
let catOne = document.querySelectorAll("img")[0],
	catTwo = document.querySelectorAll("img")[1],
	// to get the two cats
	catImg = document.getElementById('cats'),
	x = document.getElementById('catone'),
	y = document.getElementById('cattwo'),
  	clickCountDisplay = document.querySelector('span'),
  	catName,
   	count = 0;

catImg.addEventListener('click', function(e){
  //if the element has been clicked... do stuff here
  // preventdefaultevent
  // e.preventDefault();
  
  if(e.target == catOne){
  	count+=1;
  	catName ="First Cat"
  	clickCountDisplay.innerText =count;
  	x.innerText =catName;
  	setTimeout(() => {
                    x.innerText =null;
                }, 500);
  	console.log(count + catName );
}
else if (e.target == catTwo){
  	count+=1;
  	catName ="Second Cat"
  	clickCountDisplay.innerText =count;
  	y.innerText =catName;
  	setTimeout(() => {
                    y.innerText =null;
                }, 500);
  	console.log(count + catName );
}else{/*Do nothing*/}
}, false);