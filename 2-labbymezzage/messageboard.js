//Statiskt objekt MessageBoard
var MessageBoard = {

    messages: [],



    init: function (e) {

        e = e || event;

        //Initiering av variabler
        var submit = document.querySelector("#submitbutton input");
        var p = document.querySelector("#value");
        var input = document.querySelector("#textarea");
        var counter = 0;

        //Skapande av counter node
        var counterDiv = document.querySelector("#counter");
        var cP = document.createElement("p");
        counterDiv.appendChild(cP);
        var counterText1 = document.createTextNode("Antal meddelanden: " + counter);
        cP.appendChild(counterText1);

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
        var messages = MessageBoard.messages;
        var i;

        messageID.setDate(date);

        messages.push(messageID);

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

        var messages = MessageBoard.messages.splice(MessageBoard.messages[messageID2], 1);

        MessageBoard.renderMessages(messages);

    },

    //Funktion för att ta bort alla meddelanden och sedan skriva ut dem igen
    renderMessages: function (messages) {
    var i;

    document.getElementById("messagearea").innerHTML = "";

    for (i = 0; i < messages.length; i += 1) {
    MessageBoard.renderMessage(messages[i]);
    }
    }
};

window.onload = MessageBoard.init;
