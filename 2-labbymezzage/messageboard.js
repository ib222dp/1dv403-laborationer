//Statiskt objekt MessageBoard
var MessageBoard = {

    messages: [],

    init: function (e) {

        e = e || event;

        var submit = document.querySelector("#submitbutton a");
        var p = document.querySelector("#value");
        var input = document.querySelector("#textarea");

        //Skapande av counter node
        var counterP = document.querySelector("#counter p");
        var counterText1 = document.createTextNode("Antal meddelanden: " + MessageBoard.messages.length);
        counterP.appendChild(counterText1);

        //Händelse-hanterare kopplad till Skicka-knappen
        submit.addEventListener("click", function () {
            var message = MessageBoard.addMessage(input.value);
        }, false);

        //Händelsehanterare kopplad till Enter-knappen
        input.onkeypress = function (e) {
            if (e.keyCode === 13 && !e.shiftKey) {
                var message = MessageBoard.addMessage(input.value);
            } 
        };
    },

    //Funktion som lägger till meddelandeobjektet till MessageBoard-objektets meddelandelista
    addMessage: function (message) {

        var messageID = new Message(message);
        var date = new Date();
        var i;

        messageID.setDate(date);
        MessageBoard.messages.push(messageID);

        //Borttagande och återskapande av counter node
        var counterDiv = document.querySelector("#counter");
        var counterP = document.querySelector("#counter p");
        counterDiv.removeChild(counterP);
        var newP = document.createElement("p");
        var counterText2 = document.createTextNode("Antal meddelanden: " + MessageBoard.messages.length);
        counterDiv.appendChild(newP);
        newP.appendChild(counterText2);

        MessageBoard.renderMessage(messageID);
    },

    //Funktion för att skriva ut meddelande
    renderMessage: function (messageID) {

        var messageArea = document.getElementById("messagearea");

        //Skapande av message-div
        var messageDiv = document.createElement("div");
        messageDiv.id = "message";
        messageArea.appendChild(messageDiv);

        //Skapande av messagetext-div
        var messageTextDiv = document.createElement("div");
        messageTextDiv.id = "messagetext";
        messageDiv.appendChild(messageTextDiv);

        //Skapande av message node
        var p = document.createElement("p");
        p.innerHTML = messageID.getHTMLText();
        messageTextDiv.appendChild(p);

        //Skapande av timeandlinks-div
        var timeAndLinksDiv = document.createElement("div");
        timeAndLinksDiv.id = "timeandlinks";
        messageDiv.appendChild(timeAndLinksDiv);

        //Skapande av länk och bild för att se tid för meddelandet
        var timeLink = document.createElement("a");
        timeLink.href = "#";
        timeAndLinksDiv.appendChild(timeLink);

        var clockIMG = document.createElement("img");
        clockIMG.src = "../pics/clock.png";
        timeLink.appendChild(clockIMG);

        //Funktion för att visa tid för meddelandet, kopplad till bilden på klockan
        timeLink.onclick = function () {
            alert(messageID.getDateText());
        };

        //Skapande av länk och bild för att ta bort meddelandet
        var deleteLink = document.createElement("a");
        deleteLink.href = "#";
        timeAndLinksDiv.appendChild(deleteLink);

        var deleteIMG = document.createElement("img");
        deleteIMG.src = "../pics/delete.png";
        deleteLink.appendChild(deleteIMG);

        //Funktion för att ta bort meddelande, kopplad till bilden på soptunnan
        deleteLink.onclick = function () {
            if (window.confirm("Vill du verkligen radera meddelandet?")) {
                var messageID2 = MessageBoard.messages.indexOf(messageID);
                MessageBoard.removeMessage(messageID2);
            }
        };

        //Skapande av timestamp node
        var newP = document.createElement("p");
        timeAndLinksDiv.appendChild(newP);
        var timeStamp = document.createTextNode(messageID.getDate().toLocaleTimeString());
        newP.appendChild(timeStamp);
    },

    //Funktion för att ta bort meddelande
    removeMessage: function (messageID2) {
        MessageBoard.messages.splice(messageID2, 1);
        MessageBoard.renderMessages();
    },

    //Funktion för att ta bort alla meddelanden och sedan skriva ut dem igen
    renderMessages: function () {
        var i;

        document.getElementById("messagearea").innerHTML = "";

        //Borttagande och återskapande av counter node
        var counterDiv = document.querySelector("#counter");
        var counterP = document.querySelector("#counter p");
        counterDiv.removeChild(counterP);
        var newP2 = document.createElement("p");
        var counterText3 = document.createTextNode("Antal meddelanden: " + MessageBoard.messages.length);
        counterDiv.appendChild(newP2);
        newP2.appendChild(counterText3);

        for (i = 0; i < MessageBoard.messages.length; i += 1) {
            MessageBoard.renderMessage(MessageBoard.messages[i]);
        }
    }
};

window.onload = MessageBoard.init;
