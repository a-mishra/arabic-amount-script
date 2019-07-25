var lang_suffix = '_EN';
var breakTwoDigitNumber = false;
//----------------------------------------------------------------------------------

function getResultFigure(amt, currencySystem) {

    var playCrore = "playCrore";
    var playLakh = "playLakh";
    var playMillion = "playMillion";
    var playBillion = "playBillion";
    var playThousand = "playThousand";
    var playHundred = "playHundred";
    var currency = "playCurrency";
    var subCurrency = "playSubCurrency";
    var and = "and";

    if (currencySystem == 'International') {
        lang_suffix = '_EN';
        breakTwoDigitNumber = false;
    } else if (currencySystem == 'Indian') {
        lang_suffix = '_HN';
        breakTwoDigitNumber = true;
    } else if (currencySystem == 'Arabic') {
        lang_suffix = '_AR';
        breakTwoDigitNumber = true;
    } else {
        lang_suffix = '';
    }


    var amt = amt.toString();
    var numb = amt.split(".");
    
    var integralAmount = parseInt(amt, 10);
    var decimalAmount = '0';
    if (numb[1] != null && numb[1] != "") {
        if (numb[1] != null)
            decimalAmount = numb[1];
    }

    var resultString = "";
    if (currencySystem == "Indian") {
        if (integralAmount > 0) {
            //resultString +=  ",";
            resultString += crorePart(integralAmount,lang_suffix);

            resultString += lakhPart(integralAmount, lang_suffix);

            resultString += thousandPart_indian(integralAmount,lang_suffix);

            resultString += hundredPart(integralAmount,lang_suffix);

            resultString += tensPart(integralAmount,lang_suffix);
        } else {
            resultString += "0" + " ";
        }
    } else if (currencySystem == "International") {
        if (integralAmount > 0) {
            //resultString +=  ",";
            resultString += billionPart(integralAmount,lang_suffix);

            resultString += millionPart(integralAmount,lang_suffix);

            resultString += thousandPart(integralAmount,lang_suffix);

            resultString += hundredPart(integralAmount,lang_suffix);

            resultString += tensPart(integralAmount,lang_suffix);
        } else {
            resultString += "0" + " ";
        }
    }
    //console.log("parsevalue:"+resultString);
    resultString += currency;

    if (decimalAmount > 0) {
        decimalAmount = decimalAmount.toString();
        var length = decimalAmount.length;
        if (length == '1') {
            decimalAmount = decimalAmount + '0';
        }
        resultString += " " + and + " " + tensPart(decimalAmount);
        resultString += subCurrency;
    }
    return resultString;
}


//----------------------------------------------------------------------------------


function billionPart(amt,lang_suffix) {
    var partString = "";
    if (amt.toString().length < 10) {
        return partString;
    }
    if (parseInt(parseInt(amt) % 10000000000 / 1000000000) > 0) {
        if (parseInt(parseInt(parseInt(amt) % 1000000000000) / 100000000000) > 0) {
            partString = parseInt((parseInt(amt) % 100000000000) / 1000000000) + "";
            partString = spscript(partString);
            partString = parseInt((parseInt(amt) % 1000000000000) / 100000000000) + ",playHundred"+lang_suffix+ "," + partString + "playBillion"+lang_suffix+" ";
        } else {
            partString = parseInt((parseInt(amt) % 100000000000) / 1000000000) + "";
            partString = spscript(partString);
            partString = partString + "playBillion"+lang_suffix+ " ";
        }
    }
    return partString;
}

function millionPart(amt,lang_suffix) {
    var partString = "";
    if (parseInt(parseInt(amt) % 10000000 / 1000000) > 0) {
        if (parseInt(parseInt(parseInt(amt) % 1000000000) / 100000000) > 0) {
            partString = parseInt((parseInt(amt) % 100000000) / 1000000) + "";
            partString = spscript(partString);
            partString = parseInt((parseInt(amt) % 1000000000) / 100000000) + ",playHundred"+lang_suffix+ "," + partString + "playMillion"+lang_suffix+" ";
        } else {
            partString = parseInt((parseInt(amt) % 100000000) / 1000000) + "";
            partString = spscript(partString);
            partString = partString + "playMillion"+lang_suffix+" ";
        }
    }
    return partString;
}

//----------------------------------------------------------------------------------

function crorePart(amt,lang_suffix) {
    var partString = "";
    var partString = "";
    if (amt.toString().length < 9) {
        return partString;
    }
    if (parseInt(parseInt(amt) % 1000000000 / 10000000) > 0) {
        partString = parseInt(parseInt(amt) % 1000000000 / 10000000) + "";
        partString = spscript(partString);
        partString = partString + playCrore+lang_suffix +" ";
    }
    return partString;
}

//----------------------------------------------------------------------------------

//----------------------------------------------------------------------------------


function lakhPart(amt,lang_suffix) {
    var partString = "";

    if (parseInt(parseInt(amt) % 10000000 / 100000) > 0) {
        partString = parseInt(parseInt(amt) % 10000000 / 100000) + "";
        partString = spscript(partString);
        partString = partString + playLakh+lang_suffix+" ";
    }
    return partString;
}

//----------------------------------------------------------------------------------

//----------------------------------------------------------------------------------


function thousandPart(amt,lang_suffix) {
    var partString = "";
    if (parseInt(parseInt(parseInt(amt) % 1000000) / 1000) > 0) {
        if (parseInt(parseInt(parseInt(amt) % 1000000) / 100000) > 0) {
            partString = parseInt((parseInt(amt) % 100000) / 1000) + "";
            partString = spscript(partString);
            partString = parseInt((parseInt(amt) % 1000000) / 100000) + ",playHundred"+lang_suffix+"," + partString + "playThousand"+lang_suffix+" ";
        } else {
            partString = parseInt((parseInt(amt) % 100000) / 1000) + "";
            partString = spscript(partString);
            partString = partString + "playThousand"+lang_suffix+ " ";
        }
    }

    return partString;
}


//---------------------------------------------------------------------------------

function thousandPart_indian(amt,lang_suffix) {
    var partString = "";

    if (parseInt(parseInt(parseInt(amt) % 100000) / 1000) > 0) {
        partString = parseInt((parseInt(amt) % 100000) / 1000) + "";
        partString = spscript(partString);
        partString = partString + playThousand+lang_suffix+" ";
    }

    return partString;
}


//----------------------------------------------------------------------------------


function hundredPart(amt,lang_suffix) {
    var partString = "";
    if (parseInt(parseInt(parseInt(amt) % 1000) / 100) > 0) {
        partString = parseInt((parseInt(amt) % 1000) / 100);
        partString = spscript(partString);
        partString = partString + playHundred+lang_suffix+" ";

    }
    return partString;
}


//----------------------------------------------------------------------------------


function tensPart(amt) {
    var partString = "";
    if (parseInt(parseInt(amt) % 100) > 0) {
        partString = parseInt(parseInt(amt) % 100);
        partString = spscript(partString);
    }
    //console.log("partString_tens:"+partString);
    return partString;
}


//----------------------------------------------------------------------------------

function spscript(amt) {
    amt = amt.toString();
    var breakTwoDigitNumber = true;
    var parseval = amt;
    if (amt.length >= 2) {
        var xx = amt.substr(1, 1);
        var yy = amt.substr(0, 1);
        if (xx != '0' && yy != '0' && yy != '1') {
            parseval = amt.substr(0, 1) + amt.substr(1, 1) + "";
            if (breakTwoDigitNumber == true)
                parseval = amt.substr(0, 1) + "0" + " " + amt.substr(1, 1) + "";
        }
    }
    return parseval + lang_suffix + " ";
    //return parseval+" ";
}

//----------------------------------------------------------------------------------
//-----BEGIN------------------------------------------------------------------------


//----------------------------------------------------------------------------------
var amount = 3198265789.87;
//----------------------------------------------------------------------------------

console.log("Amount to Play :" + amount);

var currencySystem = "International";

var returnamount = getResultFigure(amount);
var xyz = returnamount.toString();
var stringifiedBreakedAmount = xyz.replace(/ /g, ",");


//var PlayAnnouncement = "playStaticPrompt1,"+ stringifiedBreakedAmount;

console.log("ThisIsValueOf : StringifiedAmount = " + stringifiedBreakedAmount);