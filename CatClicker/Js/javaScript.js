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
// let catOne = document.querySelectorAll("img")[0],
// 	catTwo = document.querySelectorAll("img")[1],
// 	// to get the two cats
// 	catImg = document.getElementById('cats'),
// 	x = document.getElementById('catone'),
// 	y = document.getElementById('cattwo'),
//   	clickCountDisplay = document.querySelector('span'),
//   	catName,
//    	count = 0;

// catImg.addEventListener('click', function(e){
//   //if the element has been clicked... do stuff here
//   // preventdefaultevent
//   // e.preventDefault();
  
//   if(e.target == catOne){
//   	count+=1;
//   	catName ="First Cat"
//   	clickCountDisplay.innerText =count;
//   	x.innerText =catName;
//   	setTimeout(() => {
//                     x.innerText =null;
//                 }, 500);
//   	console.log(count + catName );
// }
// else if (e.target == catTwo){
//   	count+=1;
//   	catName ="Second Cat"
//   	clickCountDisplay.innerText =count;
//   	y.innerText =catName;
//   	setTimeout(() => {
//                     y.innerText =null;
//                 }, 500);
//   	console.log(count + catName );
// }else{/*Do nothing*/}
// }, false);



// Code modeified the 3rd time

//to select individual cat
// document.getElementById('catList').innerHTML= "<li></li>"
// "<li></li>"
let check =0,
catCliked = document.getElementById('cat'),
catOne ="catOne", catTwo ="catTwo", catThree="catThree", catFour="catFour", catFive="catFive",
catArray = [ catOne, catTwo, catThree, catFour, catFive];


for(cat of catArray){
	check+=1;
elem = document.createElement("li"),
elem.innerHTML = cat,
image = document.createElement("img");
if(check%2===0){
	// console.log("even "+check);
	image.src ="img/Cattwo.jpg";
}else{
image.src ="img/CatClicker.jpg";
// console.log("old "+check);
}

elem.append(image);
// document.getElementById('catList').append(elem);
let count=0,
clickCountDisplay = document.querySelector('span'),
catImg = document.getElementById('catList');
let currentElement = elem

catImg.addEventListener('click', (function(currentCat, currentItem){
  //if the element has been clicked... do stuff here
  // preventdefaultevent
  // e.preventDefault();
  return function(){
  // if(currentCat == check ){
  	let currentCatHere = [],
  	newElement;
  	 currentCatHere.push(elem);
  	console.log(cat + " "+ currentCat +elem+ " "+check + " "+currentCatHere );
  	count+=1;
  	clickCountDisplay.innerText =count;
  	newElement = currentItem.cloneNode(true);
  	catCliked.append(newElement)
  	console.log(count + " "+ newElement + " "+ catCliked);
  	// e =document.createElement("li");
  	// e.append(currentCat);+ " "+ newElement + " "
  	// catCliked.append(newElement);
  	// x.innerText =catName;
  	// console.log(count + catCliked.innerHTML );
  	setTimeout(() => {
                    // catCliked.remove(newElement);
                    catCliked.style.visibility = "hidden";
                    catCliked.children[currentCat].style.visibility = "visible";
                }, 4000);

//   	function myFunction() {
//     var itm = document.getElementById("myList2").lastChild;
//     var cln = itm.cloneNode(true);
//     var catCliked = document.getElementById("myList1").appendChild(cln);
//     setTimeout(() => {
//                      catCliked.remove();
//                     //catCliked.style.visibility = "hidden";
//                 }, 400);
// }
  	// console.log(count + catCliked.innerHTML );
  // }
}
})(check, elem));

// elem.append(image);
document.getElementById('catList').append(elem);

}

function test(){
	if (true){
	setTimeout(() => {
                    // catCliked.remove(newElement);
                    catCliked.style.visibility = "hidden";
                }, 4000);

catCliked.children[1].style.visibility = "visible";
}
}




// document.getElementById('catList').append(document.createElement("li"))

// document.getElementById('catList').outerHTML= "<li></li>"
// "<li></li>"

// // <li><img src="img/CatClicker.jpg" alt="Cat Image"></li>
// let catOne = document.querySelectorAll("img")[0],
// 	catTwo = document.querySelectorAll("img")[1],
// 	// to get the two cats
// 	catImg = document.getElementById('cats'),
// 	x = document.getElementById('catone'),
// 	y = document.getElementById('cattwo'),
//   	clickCountDisplay = document.querySelector('span'),
//   	catName,
//    	count = 0;clickCount



// catImg.addEventListener('click', function(e){
//   //if the element has been clicked... do stuff here
//   // preventdefaultevent
//   // e.preventDefault();
  
//   if(e.target == catOne){
//   	count+=1;
//   	catName ="First Cat"
//   	clickCountDisplay.innerText =count;
//   	x.innerText =catName;
//   	setTimeout(() => {
//                     x.innerText =null;
//                 }, 500);
//   	console.log(count + catName );
// }
// else if (e.target == catTwo){
//   	count+=1;
//   	catName ="Second Cat"
//   	clickCountDisplay.innerText =count;
//   	y.innerText =catName;
//   	setTimeout(() => {
//                     y.innerText =null;
//                 }, 500);
//   	console.log(count + catName );
// }else{/*Do nothing*/}
// }, false);


