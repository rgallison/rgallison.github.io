var aText = new Array(
	"Welcome."
);
var bText = new Array(
	"My name is Renee Gallison.",
	"I am a Full Stack Web Developer.",
	"Thank you for taking an interest in me.",
	"Please feel free to take a look at my CV and check out my latest projects."
);

 
function typewriter(el, text)
{
	var speed;
	var iIndex = 0; // start printing array at this posision
	var iArrLength = text[0].length; // the length of the text array
	var iScrollAt = 20; // start scrolling up at this many lines
	 
	var iTextPos = 0; // initialise text position
	var sContents = ''; // initialise contents variable
	var iRow; // initialise current row
	var destination = document.getElementsByClassName(el)[0];
	if( typeof destination === "undefined" )
		return; 

	var reTypewriter = function(el, text) {
		sContents =  ' ';
		iRow = Math.max(0, iIndex-iScrollAt);

		while ( iRow < iIndex ) {
			//Check for spans. If found, add them to the content
			var startOfSpan = text[iRow].indexOf("<span>");
			if( startOfSpan >= 0 ){
				var firstSplit = text[iRow++].split("<span>")
				sContents += firstSplit[0] + "<span>" + firstSplit[1].split("</span>")[0] + "</span>" + firstSplit[1].split("</span>")[1] + "<br/>";
			} else {
				sContents += text[iRow++] + '<br />';
			}
		}

		//if a span is found, skip ahead - we don't actually want to type them.
		// otherwise, update the "typed" text with the next letter
		if( text[iIndex][iTextPos] === "<" )
			iTextPos += 6;
		if( text[iIndex][iTextPos] === ">" )
			iTextPos++;
		destination.innerHTML = sContents + text[iIndex].substring(0, iTextPos);

		// determine if there is more text to type
		// if not, move onto the next text in array
		var callAgain = false;
	 	if ( iTextPos++ >= iArrLength ) {
	  		iTextPos = 0;
	  		iIndex++;
	  		if ( iIndex != text.length ) {
	   			iArrLength = text[iIndex].length;
	   			speed = 500;
	   			callAgain = true;
	  		}
	 	} else {
	 		speed = Math.floor(Math.random() * 80) + 5;
	 		callAgain = true;
	 	}

	 	if( callAgain ){
		 	setTimeout(function(){
				reTypewriter(el, text);
			}, speed);
		}
	}
	reTypewriter(el,text);
}

setTimeout(function(){
	typewriter("welcome", aText);
	setTimeout(function(){
		typewriter("greeting", bText);
		setTimeout(function(){
			Array.from(document.getElementsByClassName("fade-in")).forEach(function(e){
				e.classList.remove("hidden");
			});
		}, 10000);
	}, 1200);
}, 500);
