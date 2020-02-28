const guessInput = document.querySelector('#number-guess');
const numForm = document.querySelector('#number-guess-form');

const scoreBoard = document.querySelector('#scoreboard');
const clearScore = document.querySelector('#clear-scoreboard');
const setup = document.querySelector('#setup');



let PG = autoRule();
let PR = autoRule();

let hidden;
let set;
let guessNum;

let	PG1 = window.localStorage.getItem('tries');
let PR2 = window.localStorage.getItem('range');
	PG = JSON.parse(PG1);
	PR = JSON.parse(PR2);


	let secretNumber = randomGenerator();
	let wins = winScoreBoard();
	let loses = loseScoreBoard();
	
loadEventListeners();


function loadEventListeners() {
	
    numForm.addEventListener('submit', guessSubmit);
	scoreBoard.addEventListener('click', scorePrint);	
	clearScore.addEventListener('click', clearScoreBoard);	
    setup.addEventListener('click', setupOption);	
}	

window.onload = function() {
	
	
	
	//checking if hidden is already saved if it is not set it to the random generated number and upload.

	if (localStorage.getItem("hidden") === null)
		{
		   hidden = randomGenerator();
		   set = setHidden();   
		   //Set Guesses
		   guessNum = PG;
		}
	else
		{
			hidden = getHidden();
		   guessNum = PG;
		}
		
		let baseText = newtext();
		
	console.log(secretNumber);
	console.log("new page Number of Guesses: " + guessNum);
	console.log("The Uploaded number " + hidden);
	console.log("The number of guesses left " + guessNum);	
	
	
	
		let pickQ = document.createElement("input");
		pickQ.placeholder = "Number of Guesses";
		pickQ.className = 'form-control';
		pickQ.id = 'pick-number-guess';
		pickQ.type = 'number';	
	    pickQ.style='display:none';	
		pickQ.addEventListener('change', changeTry);		

		let element = document.getElementById("message-display");
		element.appendChild(pickQ);

		let pickR = document.createElement("input");
		pickR.placeholder = "Guess From 0 to ?";
		pickR.className = 'form-control';
		pickR.id = 'pick-range';
		pickR.type = 'number';	
	    pickR.style='display:none';	
		pickR.addEventListener('change', changeRange);			

		element = document.getElementById("message-display");
		element.appendChild(pickR);

		let changes = document.createElement("a");
        changes.setAttribute('href', '#');		
		changes.className = 'card-title btn btn-info';
		changes.innerHTML = 'Submit Changes';
		changes.id = 'subchange';
	    changes.style='display:none';
		changes.addEventListener('click', changecontent);
				
		element = document.getElementById("message-display");
		element.appendChild(changes);	

		let hide = hideChange();
		
}	
	
function guessSubmit(e) {
	 let orginalcount = PG;
	 let hideit = hideChange();		
     clearScore.disabled = true;
	 scoreBoard.disabled = false;
	 const guess = guessInput.value;
	
		
		  if (clearScore.style.display === "block") {
			clearScore.style.display = "none";
			scoreBoard.style.display = "block";
		  } 

		  
	//function for output text
	
		 if (guessInput.value == hidden)
			{
				
				let highString = "Congratulations, you win – the number of " + guess + " is correct.";
				document.getElementById("message-display-content").innerHTML = highString;	

				console.log(hidden);
				
				wins = parseInt(localStorage.getItem('wins')) + 1;
				window.localStorage.setItem('wins', JSON.stringify(wins));
	

				console.log("win old hidden: " + hidden);	
				secretNumber = randomGenerator();
				set = setHidden();
				hidden = getHidden();
				guessNum = PG;	
				
				
				console.log("win new hidden: " + hidden);	
				
				console.log("win guess count: " + guessNum);
				
			
			}
				
			else if (guessInput.value !== hidden)
				{
								
						let hotcold;
								
						if(guess > hidden)
						{
							hotcold = " is too high. ";
						}
						else if(guess < hidden)
						{
							hotcold = " is too low. ";
						} 	
					
					guessNum -= 1;
					let newNum = leftGuess();
				
				console.log(newNum);


				if(newNum > 0)
				{
					console.log("The number of guesses left " + newNum);					
					let lowString = "The guess of " + guess + " " + hotcold + " You have " + newNum + " guesses left.";
					document.getElementById("message-display-content").innerHTML = lowString;	
					
				}
				else 
				{
					
					loses = parseInt(localStorage.getItem('loses')) + 1;
				    window.localStorage.setItem('loses', JSON.stringify(loses));					
					document.getElementById("message-display-content").innerHTML = "Sorry you have run out of Guess. The Correct Number was " + hidden + ". You can Now adjust guess numbers and range for the next game or you can start a new game by entering a new guess";
	
					console.log("old hidden: " + hidden);	
					let clear = clearHidden();
					secretNumber = randomGenerator();
					set = setHidden();
					hidden = getHidden();
					guessNum = setGuess();	
					
					//setGuess();
					
					//console.log("loss Number of Guesses: " + guessNum);
					console.log("new hidden " + hidden);	
					
					console.log(newNum);
					
					
				}//end of newNum if else

				}
				
	//hides or shows setup 			
		  if (guessNum == 0 || guessNum == PG) {
				setup.style.display = "block";
		  } 
		  else
		  {
			 setup.style.display = "none";
		  }			

	
	e.preventDefault();
	}	
	
	function leftGuess() {
		window.localStorage.setItem('guess', JSON.stringify(guessNum));
		let num = window.localStorage.getItem('guess');	 	
		return num;
	}
	
	function setGuess() {
			
		        let num = window.localStorage.getItem('tries');
				let numm = JSON.parse(num);
				return numm;
	}	
	
	
	
function changeTry(e) {		
 
 console.log("button works");
 
 	const pickedGuess = document.querySelector('#pick-number-guess');
 
	window.localStorage.setItem('tries', JSON.stringify(pickedGuess.value));		

	PG1 = window.localStorage.getItem('tries');	
	PG = JSON.parse(PG1);	
	console.log(PG);

}

function changeRange(e) {		
 
 console.log("button works");
 
 	const pickedRange = document.querySelector('#pick-range');
 	
	window.localStorage.setItem('range', JSON.stringify(pickedRange.value));		 
	PR1 = window.localStorage.getItem('range');	
	PR = JSON.parse(PR1);
	console.log(PR);

}		
	function clearHidden() {
				
		return localStorage.removeItem('hidden');
			
	}	

	function randomGenerator() {
		
    	math = Math.floor((Math.random() * PR) + 1);
	
	   return math;	
	
	}	
	function setHidden() {
		
		return window.localStorage.setItem('hidden', JSON.stringify(secretNumber));	
			
	}	
	function getHidden() {
			
		return window.localStorage.getItem('hidden');
			
	}	
	function getGuess() {
		
		return window.localStorage.setItem('hidden', JSON.stringify(secretNumber));	
			
	}

	
//Everything here is for control of keep track of the score board
	function winScoreBoard() {
			

		if (localStorage.getItem("wins") === null)
			{
				window.localStorage.setItem('wins', JSON.stringify(0));	 
			}
				return window.localStorage.getItem('wins');
					
	}
	function loseScoreBoard() {
			

		if (localStorage.getItem("loses") === null)
			{
				window.localStorage.setItem('loses', JSON.stringify(0));	 
			}
				return window.localStorage.getItem('loses');
					
	}


 function setupOption(e){

	document.getElementById("message-display-content").innerHTML = "Peronalize your game here";	
	 hide = showChange();

	
		e.preventDefault();
 }
 
function changecontent(e) {		
    localStorage.removeItem('tries');
   localStorage.removeItem('range');
   localStorage.removeItem('guess');   

	hide = hideChange();
	console.log("new guesses" + PG);
	console.log ("new range" + PR);
	console.log("button works");
	
	let baseText = newtext();

}

function autoRule(){
	
	window.localStorage.setItem('tries', JSON.stringify(3));		
	window.localStorage.setItem('range', JSON.stringify(20));		 

}

function scorePrint(e){
		
		hide = hideChange();	
		
        clearScore.disabled = false;
	    scoreBoard.disabled = true;		
		let winlose = "WINS: " + wins + " LOSE: " + loses;
		document.getElementById("message-display-content").innerHTML = winlose;	
		
		e.preventDefault();
		
		  if (clearScore.style.display === "none") {
			clearScore.style.display = "block";
			scoreBoard.style.display = "none";
		  } 
 }
 
function clearScoreBoard(e){
		
		 if (clearScore.style.display === "block") {
			clearScore.style.display = "none";
			scoreBoard.style.display = "block";
		  } 
		
		
			window.localStorage.setItem('wins', JSON.stringify(0));	
			window.localStorage.setItem('loses', JSON.stringify(0));	
			wins = window.localStorage.getItem('wins');	 
			loses = window.localStorage.getItem('loses');	 
		
		let winlose = "WINS: " + wins + " LOSE: " + loses;
		document.getElementById("message-display-content").innerHTML = winlose;	
		
		e.preventDefault();
 }
 
 function showChange(e) {
	
		document.querySelector('#pick-number-guess').style.display = "block";
		document.querySelector('#pick-range').style.display = "block";
		document.querySelector('#subchange').style.display = "block";

}
		 
function hideChange(e) {		 
		 document.querySelector('#pick-number-guess').style.display = "none";
	     document.querySelector('#pick-range').style.display = "none";
	     document.querySelector('#subchange').style.display = "none";
}
function newtext(e){
		document.getElementById("opening").innerHTML = "Select a Number between 1- " + PR +  ". you have " + PG + " guesses.";
}


