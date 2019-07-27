
function convertAmountToWords(amount,currencyType='Arabic') {
    // -----Number To Words SPEECH SYSTEM------------------------------------------------
    // Accepted Values for Currency Codes : Arabic, Internatioanl, Indian --- currently only arabic is supported  
    //-----------------------------------------------------------------------------
    // Input Amount = '15806306.84' 
    // Break the amount in groups of 3's and name them as and place them in an array 
    // such that G[0]='84' (decimalPart), G[1]='306', G[2]='806', G[3]=15
    //-----------------------------------------------------------------------------

        amount = amount.split('.')
        let integralPart = amount[0];
        let decimalPart = amount[1];
        
            if(decimalPart != undefined) {
                if(decimalPart.length > 2){
                    decimalPart = decimalPart.substr(0,2);
                } else if(decimalPart.length==1){
                    decimalPart = decimalPart+'0';
                }
            }
        
        G = [];
        G[0] = decimalPart;

            //-------------------------------------
            //if the length of the integralPart is not in multiples of 3 then make it,
            //input - integralPart = '15205789',G[0] = 84
            //-------------------------------------
                
                let lengthOfIntegralPart = integralPart.length;
                for(let i = 0 ; i < (3- (lengthOfIntegralPart%3) )  && ( (lengthOfIntegralPart%3)!=0) ; i++ ){
                    integralPart= '0'+integralPart;
                }
                lengthOfIntegralPart = integralPart.length;

        
                for(let i = 0 ; i < lengthOfIntegralPart/3; i++) {
                    G[i+1] = integralPart.substr( (lengthOfIntegralPart-(i+1)*3) , 3);
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
    for(let i = 0 ; i < G.length ; i++) {
        console.log("KEY: "+i+" : G :"+G[i]);
        if(G[i] != undefined && G[i] != '' && parseInt(G[i]) != 0) {
            groupWord[i] = convert3digitNumberToWord_Arabic(G[i]);
        } else {
            groupWord[i] = '';
        }
    }

    console.log(groupWord);

        //---------------------------------------
        // convert3digitNumberToWord_Arabic : it will provide word Wquivalent of 3 digit number 
        //--------------------------------------
        
        let returnString ='';
    
        for(let i = groupWord.length-1; i > -1; i--) {
            if(i ==  0 ) {
                if(groupWord[i] != '' && groupWord[i] != undefined && groupWord[i]!= 'undefined') {
                    returnString += groupWord[i]+","+groupPlace[i];
                } 
            } else {
                returnString += groupWord[i]+","+groupPlace[i];
                if(groupWord[i]!='' && groupWord[i+1]!='')
                    returnString += ',and,'
            }

            if(groupWord[i]!='' && groupWord[i-1]!='' && groupWord[i]!=undefined && groupWord[i-1]!=undefined && groupWord[i]!='undefined' && groupWord[i-1]!='undefined' )
            returnString += ',and,';

        }
        
        console.log(returnString);
    
    return amount;

}

function convert3digitNumberToWord_Arabic(subAmount) {
            
    let returnAmount = []
    subAmount = parseInt(subAmount); 
    
        if(parseInt(subAmount/100) > 1) {
            returnAmount[0] = parseInt(subAmount/100)+","+"Hundred";
        } else if( parseInt(subAmount/100) == 1) {
            returnAmount[0] = 'Hundred';
        } else {
            returnAmount[0] = '';
        }

        subAmount = subAmount%100;
        if(parseInt(subAmount/10) > 10) {
            returnAmount[1] = parseInt(subAmount/10)*10;
        } else {
            returnAmount[1] = '';
        }

        subAmount = subAmount%10;
        if(parseInt(subAmount) > 0) {
            returnAmount[2] = parseInt(subAmount);
        } else {
            returnAmount[2] = '';
        }

        arabicReturnAmount = [];
        arabicReturnAmount[0] = returnAmount[0];
        arabicReturnAmount[1] = returnAmount[1];
        arabicReturnAmount[2] = returnAmount[2];

        returnString = '';
        // if(arabicReturnAmount[0]!='') {
        //     returnString += arabicReturnAmount[0];
        //     if(arabicReturnAmount[0]!='' && arabicReturnAmount[1]!='')
        //         returnString += ',and,'
        // }

        // if(arabicReturnAmount[1]!='') {
        //     returnString += arabicReturnAmount[1];
        //     if(arabicReturnAmount[1]!='' && arabicReturnAmount[2]!='')
        //         returnString += ',and,'
        // }

        // if(arabicReturnAmount[2]!='') {
        //     returnString += arabicReturnAmount[2];
        // }

        for(let i = 0; i < arabicReturnAmount.length; i++) {
            if(i ==  arabicReturnAmount.length-1 ) {
                returnString += arabicReturnAmount[i];
            } else {
            returnString += arabicReturnAmount[i];
            if(arabicReturnAmount[i]!='' && arabicReturnAmount[i+1]!='')
                returnString += ',and,'
            }
        }

        // console.log(returnString);
        // console.log("---------END OF Data from convert3digitNumbrerTo word------------------");
    return returnString;
}

console.log(convertAmountToWords('165265789.87') );

// TODO : when there is a 0 or '' in two array element addition of 'and' fails;
// TODO : decimal part needs a differnt handling than integralPart : current 80 is interpreted as 8 --- DONE