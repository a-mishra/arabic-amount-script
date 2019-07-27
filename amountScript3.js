function convertAmountToWords(amount, currencyType = 'Arabic') {
    // -----Number To Words SPEECH SYSTEM------------------------------------------------
    // Accepted Values for Currency Codes : Arabic, Internatioanl, Indian --- currently only arabic is supported  
    //-----------------------------------------------------------------------------
    // Input Amount = '15806306.84' 
    // Break the amount in groups of 3's and name them as and place them in an array 
    // such that G[0]='84' (decimalPart), G[1]='306', G[2]='806', G[3]=15
    //-----------------------------------------------------------------------------

    amount = amount.split('.')
    let integralPart = amount[0];

    var regex = /,/gi
    integralPart = integralPart.replace(regex, '');

    let decimalPart = amount[1];

    if (decimalPart != undefined) {
        if (decimalPart.length > 2) {
            decimalPart = decimalPart.substr(0, 2);
        } else if (decimalPart.length == 1) {
            decimalPart = decimalPart + '0';
        }
    }

    G = [];
    G[0] = decimalPart;

    //-------------------------------------
    //if the length of the integralPart is not in multiples of 3 then make it,
    //input - integralPart = '15205789',G[0] = 84
    //-------------------------------------

    let lengthOfIntegralPart = integralPart.length;
    for (let i = 0; i < (3 - (lengthOfIntegralPart % 3)) && ((lengthOfIntegralPart % 3) != 0); i++) {
        integralPart = '0' + integralPart;
    }
    lengthOfIntegralPart = integralPart.length;


    for (let i = 0; i < lengthOfIntegralPart / 3; i++) {
        G[i + 1] = integralPart.substr((lengthOfIntegralPart - (i + 1) * 3), 3);
    }

    //------------------------------------
    // integralPart = '015205789'
    // output - G = [ '84', '789', '205', '015' ]
    //------------------------------------

    console.log(G);

    //-----------------------------------------------------------------------------
    // for each group find the equivalent Word 
    // at the beginning of each group add 'and', 
    //-----------------------------------------------------------------------------

    groupPlace = ['Halala', 'Riyal', 'Thousand', 'Million', 'Billion', 'Trillion', 'Zillion'];
    groupWord = [];
    for (let i = 0; i < G.length; i++) {
        console.log("KEY: " + i + " : G :" + G[i]);
        if (G[i] != undefined && G[i] != '' && parseInt(G[i]) != 0) {
            groupWord[i] = convert3digitNumberToWord_Arabic(G[i]);
        } else {
            groupWord[i] = '';
        }
    }

    console.log(groupWord);

    //---------------------------------------
    // convert3digitNumberToWord_Arabic : it will provide word Wquivalent of 3 digit number 
    //--------------------------------------

    let returnString = '';

    for (let i = groupWord.length - 1; i > 0; i--) {
        if (i == 0) {
            if (groupWord[i] != '' && groupWord[i] != undefined && groupWord[i] != 'undefined') {
                returnString += groupWord[i] + "," + groupPlace[i];
            }
        } else {
            //console.log(groupWord[i]);
            let temp_brokenGroupWord = groupWord[i].split(',');
            let temp_brokenGroupWord_lastNumber = parseInt(temp_brokenGroupWord[temp_brokenGroupWord.length - 1]);

            if (i == 1 && G[i] == 0) {
                if (G[0] == 0 || G[0] == undefined)
                    returnString += "," + groupPlace[1];
                else
                    returnString += "," + groupPlace[1] + ",and," + groupWord[0] + "," + groupPlace[0];
            } else if ((G[i] % 100) < 100 && (G[i] % 100) > 10) {
                returnString += groupWord[i] + "," + groupPlace[i];
            } else if ((G[i] % 100) <= 10 && G[i] > 0) {
                returnString += groupWord[i] + groupPlace[i];
            } else {
                returnString += ",";
            }

            if (i > 1 && groupWord[i] != '' && groupWord[i - 1] != '' && groupWord[i] != undefined && groupWord[i - 1] != undefined && groupWord[i] != 'undefined' && groupWord[i - 1] != 'undefined') {
                returnString += ',and,';
            }

        }
    }

    returnString = removeRepeatedCommas(returnString);

    console.log(returnString);
    return returnString;

}

function convert3digitNumberToWord_Arabic(subAmount) {

    let returnAmount = []
    subAmount = parseInt(subAmount);

    if (parseInt(subAmount / 100) > 1) {
        returnAmount[0] = parseInt(subAmount / 100) + "Hundred";
    } else if (parseInt(subAmount / 100) == 1) {
        returnAmount[0] = 'Hundred';
    } else {
        returnAmount[0] = '';
    }

    subAmount = subAmount % 100;
    subAmount = parseInt(subAmount);
    returnAmount[1] = subAmount;

    if (returnAmount[1] == 0)
        returnAmount[1] = String('');


    returnString = '';

    for (let i = 0; i < returnAmount.length; i++) {
        if (i == returnAmount.length - 1) {
            returnString += returnAmount[i];
        } else {
            returnString += returnAmount[i];

            // if you want to place an 'and' inside group words too then uncommet below line and comment the next;
            // if(returnAmount[i]!='' && returnAmount[i+1]!='')
            //     returnString += ',and,';

            if (returnAmount[i] != '' && returnAmount[i + 1] != '')
                returnString += ',';

        }
    }

    // console.log(returnString);
    // console.log("---------END OF Data from convert3digitNumbrerTo word------------------");
    return returnString;
}


function removeRepeatedCommas(inputString) {
    outputString = inputString;
    var regex = /,,/g;
    while(outputString.match(regex)!=null) {
        outputString = outputString.replace(regex, ',');
    }
    return outputString;
}

console.log(convertAmountToWords('1,000,000,000'));