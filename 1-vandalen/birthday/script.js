"use strict";

window.onload = function(){

	 var birthday = function (date) {

        //Kastar undantag om datum-formatet inte är ÅÅÅÅ-MM-DD
        if (isNaN(date.substring(0, 3)) || isNaN(date.substring(5, 6)) || isNaN(date.substring(8, 9)) || date.charAt(4) != '-' || date.charAt(7) != '-'
        || date.length > 10 || date.length < 10) {
            throw new Error("Fel! Mata in ett datum i formatet ÅÅÅÅ-MM-DD.");
        }

        //Skapande av födelsedatumsobjekt och dagensdatum-objekt
        var birthDay = new Date(date + "T23:59:59");
        var now = new Date();
        birthDay.setFullYear(now.getFullYear());

        //Uträkning av skillnaden mellan nu och nästa födelsedag i millisekunder
        var time = (birthDay.getTime() - now.getTime());

        //Omvandling av millisekunder till dagar
        var answer = (time / (1000 * 60 * 60 * 24));

        //Avrundning av dagar
        var roAnswer = Math.round(answer);

        //If-satser som returnerar värden beroende på antalet dagar och ökar nuvarande år med 1 om födelsedagen redan inträffat detta år
        if (roAnswer === 0) {
            return 0;
        } if (roAnswer === 1) {
            return 1;
        } if (roAnswer > 0) {
            return roAnswer;
        } if (roAnswer < 0) {
            var birthDay2 = new Date(now.getFullYear() + 1, birthDay.getMonth(), birthDay.getDate());
            var time2 = (birthDay2.getTime() - now.getTime());
            var answer2 = (time2 / (1000 * 60 * 60 * 24));
            var roAnswer2 = Math.round(answer2);
            return roAnswer2;
        }
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
			var answer = birthday(input.value) // Läser in texten från textrutan och skickar till funktionen "convertString"
			var message;
			switch (answer){
				case 0: message = "Grattis på födelsedagen!";
					break;
				case 1: message = "Du fyller år imorgon!";
					break;
				default: message = "Du fyller år om " + answer + " dagar";
					break;
			}

			p.innerHTML = message;
		} catch (error){
			p.classList.add( "error"); // Växla CSS-klass, IE10+
			p.innerHTML = error.message;
		}
	});
};
