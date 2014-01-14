"use strict";

//Statiskt objekt imgViewer
var imgViewer = {

    init: function () {

        var winIcon = document.getElementById("winicon");

        //Funktion som öppnar ett fönster när man klickar på ikonen
        var windowOpener = function (e) {

            e.preventDefault();

            var content = document.getElementById("content");

            //Skapande av div-taggarna popup, header, imgdiv och statusdiv
            var popupDiv = document.createElement("div");
            popupDiv.setAttribute("id", "popup");

            var headerDiv = document.createElement("div");
            headerDiv.setAttribute("id", "header");
            var h1 = document.createElement("h1");
            var headerText = document.createTextNode("Image Viewer");
            h1.appendChild(headerText);
            headerDiv.appendChild(h1);
            var xATag = document.createElement("a");
            xATag.setAttribute("href", "#");
            var x = document.createElement("p");
            x.innerHTML = "X";
            xATag.appendChild(x);
            headerDiv.appendChild(xATag);

            var imgDiv = document.createElement("div");
            imgDiv.setAttribute("id", "imgdiv");

            var statusDiv = document.createElement("div");
            statusDiv.setAttribute("id", "statusdiv");
            var loadIMG = document.createElement("img");
            loadIMG.setAttribute("src", "../js/ajax-loader.gif");
            loadIMG.setAttribute("class", "hide");
            statusDiv.appendChild(loadIMG);

            //Visar laddnings-ikonen efter 1 sekund
            var timeOut = setTimeout(function () {
                loadIMG.removeAttribute("class", "hide");
            }, 1000);

            popupDiv.appendChild(headerDiv);
            popupDiv.appendChild(imgDiv);
            popupDiv.appendChild(statusDiv);
            content.appendChild(popupDiv);

            //Skapande av en ny AjaxCon-instans
            new AjaxCon("http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/", function (data) {

                //Tar bort laddnings-ikonen när datat har hämtats
                clearTimeout(timeOut);
                statusDiv.removeChild(loadIMG);

                //Initiering av variabler
                var i, j, k, maxWidth, maxHeight, images = JSON.parse(data);
                var widthArray = [];
                var heightArray = [];

                //Får fram bredden på den bredaste tumnagelbilden och höjden på den högsta
                for (i = 0; i < images.length; i += 1) {
                    widthArray.push(images[i].thumbWidth);
                }
                for (j = 0; j < images.length; j += 1) {
                    heightArray.push(images[j].thumbHeight);
                }
                maxWidth = Math.max.apply(Math, widthArray);
                maxHeight = Math.max.apply(Math, heightArray);

                //Funktion som byter skrivbordsbakgrund till den bild som man klickat på
                //(http://stackoverflow.com/questions/20055541/set-image-source-and-background-image-with-javascript)
                var changeDesktop = function (URL) {
                    var string = "url('" + URL + "')";
                    content.style.backgroundImage = string;
                }

                //Skapar och sätter egenskaper på bilder, a-taggar och bildboxar
                for (k = 0; k < images.length; k += 1) {

                    var img = document.createElement("img");
                    img.setAttribute("src", images[k].thumbURL);
                    img.setAttribute("height", images[k].thumbHeight);
                    img.setAttribute("width", images[k].thumbWidth);

                    var imgATag = document.createElement("a");
                    imgATag.setAttribute("href", images[k].URL);

                    var imgBox = document.createElement("div");
                    imgBox.setAttribute("id", "imgbox");

                    //Sätter bildboxarnas höjd och bredd till samma som på den bredaste respektive högsta tumnagelbilden
                    //(http://stackoverflow.com/questions/15496316/how-to-set-div-tag-height-and-width-using-javascript)
                    imgBox.style.height = maxHeight + "px";
                    imgBox.style.width = maxWidth + "px";

                    //(http://stackoverflow.com/questions/3443379/setting-the-float-value-from-javascript)
                    imgBox.style.styleFloat = "left";
                    imgBox.style.cssFloat = "left";

                    //Händelsehanterare som anropar changeDesktop-funktionen, kopplad till onclick på a-taggarna 
                    imgATag.onclick = function (e) {
                        e.preventDefault();
                        var URL = this.href;
                        changeDesktop(URL);
                    }

                    //Lägger till bilder, a-taggar och bildboxar i DOM:en
                    imgATag.appendChild(img);
                    imgBox.appendChild(imgATag);
                    imgDiv.appendChild(imgBox);
                }
            });

            //Funktion som stänger fönstret när man klickar på krysset
            var closeWindow = function (e) {
                content.removeChild(popupDiv);
                winIcon.addEventListener("click", windowOpener, false);
            }
            xATag.addEventListener("click", closeWindow, false);

            //Tar bort händelsehanterare kopplad till "click" för ikonen i footern
            winIcon.removeEventListener("click", windowOpener, false);
        }
        //Händelsehanterare kopplad till "click" för ikonen i footern
        winIcon.addEventListener("click", windowOpener, false);
    }
};

window.onload = imgViewer.init;
