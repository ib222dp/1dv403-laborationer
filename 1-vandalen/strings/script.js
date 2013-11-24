"use strict";

window.onload = function(){

 	// I denna funktion ska du skriva koden för att hantera "spelet"
    	var convertString = function (str) {

        //Kastar undantag om sträng är tom (http://stackoverflow.com/questions/2381456/javascript-how-to-check-if-a-string-is-empty)
        if (str === "") {
            throw new Error("Du måste skriva in något i rutan.");
        }

        //Deklaration av variabler
        var i;
        var strArray = [];

        //Ändrar karaktärer till versaler eller gemener och lägger till dem i arrayen strArray 
        //(http://stackoverflow.com/questions/1027224/how-can-i-test-if-a-letter-in-a-string-is-uppercase-or-lowercase-using-javascrip)

        for (i = 0; i < str.length; i++) {
            var character = str[i];
            if (character === character.toLowerCase()) {
                strArray.push(character.toUpperCase());
                continue;
            } if (character === character.toUpperCase()) {
                strArray.push(character.toLowerCase());
                continue;
            }
        }

        //Gör om arrayen strArray till strängen newStr
        var newStr = strArray.join('');

        //Byter ut alla A och a till #
        //(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace?redirectlocale=en-US&redirectslug=JavaScript%2FReference%2FGlobal_Objects%2FString%2Freplace)
        var re = /a/gi;
        var repStr = newStr.replace(re, "#");

        return repStr;
    };
	// ------------------------------------------------------------------------------
	// Kod för att hantera utskrift och inmatning. Denna ska du inte behöva förändra
	var p = document.querySelector("#value"); // Referens till DOM-noden med id="#value"
	var input = document.querySelector("#string");
	var submit = document.querySelector("#send");

	// Vi kopplar en eventhanterare till formulärets skickaknapp som kör en anonym funktion.
	submit.addEventListener("click", function(e){
		e.preventDefault(); // Hindra formuläret från att skickas till servern. Vi hanterar allt på klienten.

		p.classList.remove( "error");

		try {
			var answer = convertString(input.value) // Läser in texten från textrutan och skickar till funktionen "convertString"
			p.innerHTML = answer;		// Skriver ut texten från arrayen som skapats i funktionen.	
		} catch (error){
			p.classList.add( "error"); // Växla CSS-klass, IE10+
			p.innerHTML = error.message;
		}
	});
};
