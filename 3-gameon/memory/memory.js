//Statiskt objekt Memory
var Memory = {

    game: [],

    //Läser in antal rader och kolumner från användaren och anropar getPictureArray för att få en utslumpad array
    init: function (e) {
        Memory.game = RandomGenerator.getPictureArray(x, y);
        Memory.renderGame();
    },

    renderGame: function () {

        var i, j, k, l, m, n, o, p;

        //Skapar Image-objekt
        var img1 = new Image(24, 24);
        img1.src = "../pics/1.png";
        var img2 = new Image(24, 24);
        img2.src = "../pics/2.png";
        var img3 = new Image(24, 24);
        img3.src = "../pics/3.png";
        var img4 = new Image(24, 24);
        img4.src = "../pics/4.png";
        var img5 = new Image(24, 24);
        img5.src = "../pics/5.png";
        var img6 = new Image(24, 24);
        img6.src = "../pics/6.png";
        var img7 = new Image(24, 24);
        img7.src = "../pics/7.png";
        var img8 = new Image(24, 24);
        img8.src = "../pics/8.png";

        var img12 = new Image(24, 24);
        img12.src = "../pics/1.png";
        var img22 = new Image(24, 24);
        img22.src = "../pics/2.png";
        var img32 = new Image(24, 24);
        img32.src = "../pics/3.png";
        var img42 = new Image(24, 24);
        img42.src = "../pics/4.png";
        var img52 = new Image(24, 24);
        img52.src = "../pics/5.png";
        var img62 = new Image(24, 24);
        img62.src = "../pics/6.png";
        var img72 = new Image(24, 24);
        img72.src = "../pics/7.png";
        var img82 = new Image(24, 24);
        img82.src = "../pics/8.png";

        //Byter ut första förekommande etta, tvåa osv i arrayen mot motsvarande bild
        //(http://stackoverflow.com/questions/5915789/replace-item-in-array-with-javascript)
        i = Memory.game.indexOf(1);
        Memory.game[i] = img1;
        i = Memory.game.indexOf(2);
        Memory.game[i] = img2;
        i = Memory.game.indexOf(3);
        Memory.game[i] = img3;
        i = Memory.game.indexOf(4);
        Memory.game[i] = img4;
        i = Memory.game.indexOf(5);
        Memory.game[i] = img5;
        i = Memory.game.indexOf(6);
        Memory.game[i] = img6;
        i = Memory.game.indexOf(7);
        Memory.game[i] = img7;
        i = Memory.game.indexOf(8);
        Memory.game[i] = img8;

        //Byter ut sista förekommande etta, tvåa osv i arrayen mot motsvarande bild
        i = Memory.game.lastIndexOf(1);
        Memory.game[i] = img12;
        i = Memory.game.lastIndexOf(2);
        Memory.game[i] = img22;
        i = Memory.game.lastIndexOf(3);
        Memory.game[i] = img32;
        i = Memory.game.lastIndexOf(4);
        Memory.game[i] = img42;
        i = Memory.game.lastIndexOf(5);
        Memory.game[i] = img52;
        i = Memory.game.lastIndexOf(6);
        Memory.game[i] = img62;
        i = Memory.game.lastIndexOf(7);
        Memory.game[i] = img72;
        i = Memory.game.lastIndexOf(8);
        Memory.game[i] = img82;

        //Skapar och lägger till tabell i HTML-dokumentet
        var table = document.createElement("table");
        document.getElementById("tableDiv").appendChild(table);
        var tBody = document.createElement("tbody");
        table.appendChild(tBody);

        //Skriver ut tabell med x antal rader och y antal kolumner
        // (http://stackoverflow.com/questions/6473111/add-delete-table-rows-dynamically-javascript)
        // (http://stackoverflow.com/questions/11223643/creating-dynamic-tables-using-javascript-given-rows-and-column-in-textboxes)
        for (j = 0; j < x; j++) {
            var row = document.createElement("tr");
            for (k = 0; k < y; k++) {
                row.insertCell(k);
            }
            tBody.appendChild(row);
        }

        //Kapslar in varje bild i arrayen i en a-tagg och lägger till den i en tabell-cell
        for (l = 0; l < x; l += 1) {
            for (m = 0; m < y; m += 1) {
                var a = document.createElement("a");
                a.href = "#";
                tBody.rows[l].cells[m].appendChild(a);
                a.appendChild(Memory.game.shift());

            }
        }

        //Hämtar ut varje a-element och döljer det
        var aTags = document.getElementsByTagName("a");

        for (n = 0; n < aTags.length; n++) {
            aTags[n].classList.add("hide");
        }

        //Fyller en array med så många frågetecken-bilder som det finns tabellceller
        var imgArray = new Array(x * y);

        for (o = 0; o < imgArray.length; o += 1) {
            var img0 = new Image(24, 24);
            img0.src = "../pics/0.png";
            imgArray[o] = img0;
        }

        //Kapslar in varje frågetecken-bild i arrayen i en a-tagg och lägger till den i en tabellcell
        var td = document.getElementsByTagName("td");

        for (p = 0; p < td.length; p++) {
            var a2 = document.createElement("a");
            a2.href = "#";
            td[p].appendChild(a2);
            a2.appendChild(imgArray.shift());

            //Kopplar en händelse-hanterare till a-taggarna och anropar funktionen turnTiles
            var qMarkHandler = function (e) {
                var q;

                if (Memory.game.length < 2) {
                    var qTile = e.target;
                    var picture = Memory.turnTiles(qTile);
                    Memory.game.push(picture);

                    if (Memory.game.length === 2) {
                        var pic1 = Memory.game[0];
                        var pic2 = Memory.game[1];

                        var timeOut = setTimeout(function () {
                            
                            if (pic1.src === pic2.src) {
                                countCorrect += 1;

                            } else {
                                pic1.classList.add("hide");
                                pic2.classList.add("hide");
                                /*var pic1A = pic1.parentNode;
                                var pic2A = pic2.parentNode;
                                var qATag1 = pic1A.nextElementSibling;
                                var qATag2 = pic2A.nextElementSibling;
                                qATag1.classList.toggle("hide");*/
                                qTile.classList.remove("hide");
                            }
                        }, 1000);
                       
                        for (q = 0; q < Memory.game.length; q += 1) {
                            Memory.game.shift();
                        }
                    }
                }
            }
            a2.addEventListener("click", qMarkHandler, false);
        }
    },

    //Funktion som vänder brickan och returnerar referens till den uppvända bilden
    turnTiles: function (qTile) {
        var aTag = qTile.parentNode;
        aTag.classList.add("hide");
        var pictureATag = aTag.previousElementSibling;
        pictureATag.classList.toggle("hide");
        var picture = pictureATag.firstChild;
        return picture;
    }
};

var countCorrect = 0;
var x = 4;
var y = 4;

window.onload = Memory.init;
