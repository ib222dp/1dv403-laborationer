"use strict";

window.onload = function(){
	
	//Initiering av variabler, slumpar tal mellan 1 och 100
    	var count = 0;
    	var secret = Math.floor(Math.random() * 101);


    var guess = function (number) {
        //Räknar upp variabeln count med 1
        count = count += 1;

        console.log("Det hemliga talet: " + secret); // Du når den yttre variabeln secret inifrån funktionen.
        console.log("Du gissade: " + number); // Detta nummer är det som användaren gissade på.

        //If-satser som returnerar en array vars värden varierar beroende på hur det inmatade talet stämmer överens med det hemliga talet
        if (number === secret) {
            return [true, "Det hemliga talet var " + secret + " och du behövde " + count + "gissningar för att hitta det."];
        } if (number < 1 || number > 100) {
            return [false, "Talet är utanför intervallet 1 - 100."];
        } if(isNaN(number)){
            return [false, "Mata in ett tal med siffror."];
        }if (number < secret) {
            return [false, "Det hemliga talet är högre!"];
        } if (number > secret) {
            return [false, "Det hemliga talet är lägre!"];
        }
    };
	// ------------------------------------------------------------------------------
	// Kod för att hantera utskrift och inmatning. Denna ska du inte behöva förändra
	var p = document.querySelector("#value"); // Referens till DOM-noden med id="#value"
	var input = document.querySelector("#number");
	var submit = document.querySelector("#send");

	// Vi kopplar en eventhanterare till formulärets skickaknapp som kör en anonym funktion.
	submit.addEventListener("click", function(e){
		e.preventDefault(); // Hindra formuläret från att skickas till servern. Vi hanterar allt på klienten.

		var answer = guess(input.value) // Läser in talet från textrutan och skickar till funktionen "guess"
		p.innerHTML = answer[1];		// Skriver ut texten från arrayen som skapats i funktionen.	

		if(answer[0] === true){				// Om spelet är slut, avaktivera knappen.
			submit.disabled = true;
		}
	});
};
