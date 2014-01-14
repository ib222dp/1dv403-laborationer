"use strict";
//Statiskt objekt Memory
var Memory = {
    game: [],
    x: 4,
    y: 4,
    images: [],
    counter: 0,
    tries: 0,

    init: function () {
        //Anropar getPictureArray med argumenten antal rader (x) och antal kolumner (y) för att få en utslumpad array
        var array = RandomGenerator.getPictureArray(Memory.x, Memory.y);

        //Gör om arrayen till en tvådimensionell array
        //(http://stackoverflow.com/questions/4492385/how-to-convert-simple-array-into-two-dimensional-arraymatrix-in-javascript-or)
        function arrayToMatrix(y) {
            var matrix = [], i, k;
            for (i = 0, k = -1; i < array.length; i++) {
                if (i % y === 0) {
                    k++;
                    matrix[k] = [];
                }
                matrix[k].push(array[i]);
            }
            return matrix;
        }
        //Sätter den tvådimensionella arrayen till egenskapen game på Memory-objektet
        Memory.game = arrayToMatrix(Memory.y);
        Memory.renderGame();
    },

    renderGame: function () {
        //Skapar och lägger till tabell i HTML-dokumentet
        var counter, rows, cols, tr, table = document.createElement("table"),
        tableDiv = document.getElementById("tableDiv").appendChild(table);


        var turn = function (aTagImg) {
            //Lägger till bilden som klickats på i arrayen/egenskapen Memory.images
            Memory.images.push(aTagImg);

            var imgsrc = aTagImg.getAttribute("src");

            //Kontrollerar att bilden man klickat på har src-attribut 0.png (frågetecknet)
            if (Memory.images.length === 1 && imgsrc == "../pics/0.png" || Memory.images.length === 2 && imgsrc == "../pics/0.png") {

                var className = aTagImg.parentNode.getAttribute("className")

                //Vänder på brickan genom att byta till den bild-url som klassen på den inkapslande länken motsvarar
                aTagImg.setAttribute("src", "../pics/" + className + ".png");

                if (Memory.images.length === 2) {
                    var pic1 = Memory.images[0];
                    var pic2 = Memory.images[1];

                    //Räknar upp antalet försök med 1
                    Memory.tries += 1;

                    //Vänder på brickorna efter 1 sekund genom att byta tillbaka till bild-url:en till frågetecknet
                    var timeOut = setTimeout(function () {
                        pic1.setAttribute("src", "../pics/0.png");
                        pic2.setAttribute("src", "../pics/0.png");
                    }, 1000);

                    //Räknar upp antalet matchade brickor med 1, stoppar timeout:en och tar bort href-attributet på de matchade brickorna
                    if (pic1.src === pic2.src) {
                        Memory.counter += 1;
                        clearTimeout(timeOut);
                        pic1.parentNode.removeAttribute("href");
                        pic2.parentNode.removeAttribute("href");
                        pic1.parentNode.onclick = null;
                        pic2.parentNode.onclick = null;

                        //Alert-ruta som kommer upp när spelet är slut
                        if (Memory.counter === (Memory.x * Memory.y / 2)) {
                            alert("Grattis, du har vunnit!\n\nAntal försök: " + Memory.tries);
                        }
                    }
                    //Tar bort de två elementen i images-arrayen
                    Memory.images.splice(0, 2);
                }
            } else {
                //Tar bort det första elementet i images-arrayen om man har klickat två gånger på samma bild
                Memory.images.splice(0, 1);
            }
        }

        //Skapar och lägger till tabellceller, a-taggar och bilder
        var createCell = function (rows, cols) {
            var td = document.createElement("td"), aTag = document.createElement("a");
            aTag.href = "#";

            //Sätter klassen på ataggen till det värde som elementet på motsvarande plats i den tvådimensionella arrayen har
            var className = Memory.game[rows][cols];
            aTag.setAttribute("className", className);

            //Anropar funktionen turn med den länk och bild som klickats på
            aTag.onclick = function (e) {
                turn(e.target)
            };

            var tdImg = document.createElement("img");
            tdImg.setAttribute("src", "../pics/0.png");
            aTag.appendChild(tdImg);
            td.appendChild(aTag);
            tr.appendChild(td);
        }

        //Skriver ut raderna i tabellen
        for (rows = 0; rows < Memory.x; rows += 1) {
            tr = document.createElement("tr");

            //Anropar createCell för att skriva ut tabellcellerna
            for (cols = 0; cols < Memory.y; cols += 1) {
                createCell(rows, cols);
            }
            table.appendChild(tr);
        }
    }
};

window.onload = Memory.init;
