//Konstruktor
function Message(message, date) {

    this.getText = function () {
        return message;
    };

    this.setText = function (_text) {
        message = _text;
    };

    this.getDate = function () {
        return date;
    };

    this.setDate = function (_date) {
        date = _date;
    };

    //Metoder
    Message.prototype.toString = function () {
        return this.getText() + " (" + this.getDate() + ")";
    };

    Message.prototype.getText = function () {
        return this.getText();
    };

    Message.prototype.setText = function () {
        return this.setText();
    };

    Message.prototype.getDate = function () {
        return this.getDate();
    };

    Message.prototype.setDate = function () {
        return this.setDate();
    };

    Message.prototype.getHTMLText = function () {

        var message = this.getText();
        return message.replace(/[\n\r]/g, "<br />");
    };

    //Metod som skriver ut tiden för meddelandet (http://stackoverflow.com/questions/1643320/get-month-name-from-date-using-javascript)
    Message.prototype.getDateText = function () {

        var day = this.getDate().getDate();

        var monthArray = ["januari", "februari", "mars", "april", "maj", "juni", "juli", "augusti", "september", "oktober", "november", "december"];

        var month = monthArray[this.getDate().getMonth()];

        var year = this.getDate().getFullYear();

        return "Inlägget skapades den " + day + " " + month + " " + year + " " + " klockan " + this.getDate().toLocaleTimeString();
    };
};
