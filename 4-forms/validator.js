"use strict";

//Statiskt objekt Validator
var Validator = {

    init: function () {
        //Initiering av variabler
        var myForm = document.getElementById("myForm"), fName = myForm.elements["firstname"], sName = myForm.elements["surname"],
       zipCode = myForm.elements["zipcode"], eMail = myForm.elements["email"], priceModel = myForm.elements["pricemodel"],
       buyButton = document.getElementById("buybutton"), errMsg = document.getElementById("errmsg"),
       errMsg2 = document.getElementById("errmsg2"), errMsgZip = document.getElementById("errmsgzip"),
       errMsgEmail = document.getElementById("errmsgemail");

        //Tömmer formuläret när sidan laddas om
        myForm.reset();

        //Ger fokus till första textrutan
        fName.focus();

        //Funktion som visar ett meddelande och sätter röd ram runt fältet om förnamns-fältet är blankt när det tappar fokus
        var fNameVal = function (e) {
            if (fName.value.length === 0) {
                errMsg.classList.remove("hide");
                fName.classList.add("red");
                return false;
            } else {
                errMsg.classList.add("hide");
                fName.classList.remove("red");
                return true;
            }
        }

        //Händelsehanterare kopplade till "blur" och "change" för förnamns-fältet
        fName.addEventListener("blur", fNameVal, false);
        fName.addEventListener("change", fNameVal, false);

        //Funktion som visar ett meddelande och sätter röd ram runt fältet om efternamns-fältet är blankt när det tappar fokus
        var sNameVal = function (e) {
            if (sName.value.length === 0) {
                errMsg2.classList.remove("hide");
                sName.classList.add("red");
                return false;
            } else {
                errMsg2.classList.add("hide");
                sName.classList.remove("red");
                return true;
            }
        }

        //Händelsehanterare kopplade till "blur" och "change" för efternamns-fältet
        sName.addEventListener("blur", sNameVal, false);
        sName.addEventListener("change", sNameVal, false);

        //Funktion som validerar postnummer-fältet
        var zipCodeVal = function (e) {

            //Tar bort alla mellanrum
            //(http://stackoverflow.com/questions/16830526/javascript-regex-to-remove-whitespace-fails-why)
            var trimmedZip = zipCode.value.replace(/ /g, '');

            //Reguljärt uttryck för att validera postnumret
            var valZipRegExp = /^(SE)?[0-9]{3}-?[0-9]{2}$/i;

            //Tar bort - och SE/se om postnumret matchar det reguljära uttrycket
            if (trimmedZip.match(valZipRegExp)) {
                errMsgZip.classList.add("hide");
                zipCode.classList.remove("red");
                var newZip = trimmedZip.replace(/SE|-/i, '');
                zipCode.value = newZip.toString();
                return true;
                //Visar felmeddelande och sätter röd ram runt fältet om postnumret inte matchar det reguljära uttrycket
            } else {
                errMsgZip.classList.remove("hide");
                zipCode.classList.add("red");
                return false;
            }
        }

        //Händelsehanterare kopplade till "blur" och "change" för postnummer-fältet
        zipCode.addEventListener("blur", zipCodeVal, false);
        zipCode.addEventListener("change", zipCodeVal, false);

        //Funktion som visar felmeddelande och sätter röd ram runt fältet om epost-adressen inte matchar det reguljära uttrycket
        var eMailVal = function (e) {
            var valEmailRegExp = /^[\w]+(\.[\w]+)*@([\w]+\.)+[a-z]{2,7}$/i;

            if (eMail.value.match(valEmailRegExp)) {
                errMsgEmail.classList.add("hide");
                eMail.classList.remove("red");
                return true;
            } else {
                errMsgEmail.classList.remove("hide");
                eMail.classList.add("red");
                return false;
            }
        }

        //Händelsehanterare kopplade till "blur" och "change" för epost-fältet
        eMail.addEventListener("blur", eMailVal, false);
        eMail.addEventListener("change", eMailVal, false);

        //Funktion som validerar hela formuläret och visar en modal popup om det är korrekt ifyllt
        var buyButtonVal = function (e) {
            e.preventDefault();

            //Anropar valideringsfunktionerna för att se om de returnerar true
            var test1 = fNameVal(), test2 = sNameVal(), test3 = zipCodeVal(), test4 = eMailVal();

            if (test1 && test2 && test3 && test4) {
                //Skapande av div-taggen popup och rubrik
                var div = document.createElement("div");
                div.setAttribute("id", "popup");
                var headerText = document.createTextNode("Vänligen bekräfta ditt köp");
                var h1 = document.createElement("h1");
                div.appendChild(h1);
                h1.appendChild(headerText);

                //Inläsning av labels och formulär-elementens värden till textnoder som läggs in i popupen
                var a, labels = document.getElementsByTagName("label");
                for (a = 0; a < 4; a += 1) {
                    var p = document.createElement("p");
                    p.setAttribute("class", "label");
                    div.appendChild(p);
                    var label = document.createTextNode(labels[a].textContent);
                    p.appendChild(label);
                    var p2 = document.createElement("p");
                    p2.setAttribute("class", "value");
                    div.appendChild(p2);
                    var value = document.createTextNode(myForm.elements[a].value);
                    p2.appendChild(value);
                }

                //Inläsning av label för prismodell och texten i det valda alternativet i select-boxen
                //(http://stackoverflow.com/questions/610336/javascript-retrieving-the-text-of-the-selected-option-in-select-element)
                var p3 = document.createElement("p");
                p3.setAttribute("class", "label");
                var priceLabel = document.createTextNode(labels[4].textContent);
                div.appendChild(p3);
                p3.appendChild(priceLabel);
                var p4 = document.createElement("p");
                p4.setAttribute("class", "value");
                div.appendChild(p4);
                var priceText = document.createTextNode(priceModel.options[priceModel.selectedIndex].text);
                p4.appendChild(priceText);

                //Skapande av knappar
                var cancelButton = document.createElement("input");
                cancelButton.type = "button";
                cancelButton.value = "Avbryt";
                div.appendChild(cancelButton);
                var submitButton = document.createElement("input");
                submitButton.type = "button";
                submitButton.value = "Bekräfta ditt köp";
                div.appendChild(submitButton);

                //Lägger till popupen i bodyn
                document.body.appendChild(div);

                //Gör div-taggen container transparent
                var container = document.getElementById("container");
                container.setAttribute("class", "transparent");

                //Avaktiverar alla formulär-element
                var i;
                for (i = 0; i < myForm.elements.length; i += 1) {
                    myForm.elements[i].disabled = true;
                }

                //Funktion som aktiverar alla formulär-element, tar bort popupen fån bodyn och klassen "transparent" från div-taggen container
                var popupButtons = function (e) {
                    var j;
                    for (j = 0; j < myForm.elements.length; j += 1) {
                        myForm.elements[j].disabled = false;
                    }

                    //Skickar formuläret om användaren har klickat på "Bekräfta ditt köp"-knappen
                    if (e.target === submitButton) {
                        myForm.submit();
                    }

                    document.body.removeChild(div);
                    container.removeAttribute("class", "transparent");
                }

                //Händelsehanterare kopplade till "click" för "Bekräfta ditt köp"-knappen och "Avbryt"-knappen
                submitButton.addEventListener("click", popupButtons, false);
                cancelButton.addEventListener("click", popupButtons, false);
            }
        }

        //Händelsehanterare kopplad till "click" för "Genomför köp"-knappen
        buyButton.addEventListener("click", buyButtonVal, false);
    }
};

window.onload = Validator.init;
