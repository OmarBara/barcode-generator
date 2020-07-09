var count;
var barCode;
var barCodeFD = "000";   //first Digit
var barCodeLD = "000000";//last Digit

$(document).ready(function(){
    
    // $("#userInputFirst").on('input',newBarcode);    
    // $("#userInput").on('input',newBarcode);
    // $("#barcodeType").change(function(){
    //     $("#userInput").val( defaultValues[$(this).val()] );

    //     newBarcode();
    // });

    //review if it's effective 
    $('#userInputFirst').on("input",function(){
        //chek database value
        barCodeFD = $(this).val();        
        console.log("barcodeFD:", barCodeFD);

        loadBarcode(barCodeFD)
        .then();
        console.log("barcodeLD:", barCodeLD);

        newBarcode();
    })

    $('#userInput').on("input",function(){
        barCodeLD = $(this).val(); 
        barCodeFD = $("#userInputFirst").val();
        //check if need to remove this?
        if(!barCodeFD){
          $("#userInputFirst").val("000")
        }
        barCodeFD = $("#userInputFirst").val();
  
        console.log(barCodeFD, "first digit");
        console.log(barCode, "full");
    })   

    $("#count").on("input", function(){
        newBarcode();
    })

    $("#CheckBox").change(function() {
        if(this.checked) {
            var returnVal = confirm(" الادخال اليدوي قد يسبب في ازدواجية الارقام المصدرة ، هل انت متأكد؟");
            $(this).prop("checked", returnVal);
            $('#userInput').prop('readonly', false);
        }
        else  $('#userInput').prop('readonly', true);            
    })
})


var newBarcode = function() {
    console.log("newBarcode:",barCodeFD + barCodeLD);
    //Convert to boolean
    $("#barcode").JsBarcode(
        //make sure there is value in both of theme TODO:
        barCodeFD + barCodeLD,
        {
        "format":"" ,
        "background":"",
        "lineColor": "",
        "fontSize": 2,
        "height": 40,
        "width": 2,
        "margin": 3,
        "textMargin": 11,
        "displayValue":true,
        "font": "",
        "fontOptions": "",
        "textAlign":"",
        "valid":
            function(valid){
            if(valid){
                $("#barcode").show();
                $("#invalid").hide();
            }
            else{
                $("#barcode").hide();
                $("#invalid").show();
            }
            }
        });  
        
};



function replacePage(e){

    count = $("#count").val();
    //validate form
    if(!formValidator()){
        console.log(count, "!Validator");
        return 
    }
    e.preventDefault();
    // window.open();
    var newElement = "<div id='table'></div>";
    document.body.innerHTML = newElement;
    newBarcode();
    var padZeroLD;
    var tr = '<tr>';
    barCodeLD--;
    var content = "<table>"
    for (let j = 0; j < count; j++) {
        barCodeLD++;
        for(i = 0; i < 33; i++){
            padZeroLD = padZero(barCodeLD, 6);
            if(i % 3 === 0){ 
                //every 3 iteration            
                content += tr; 
            }
            content += '<td class="code" id=' + barCodeFD + padZeroLD +'>' + "" + '</td>';
        }
    }
    content += "</table>"  
    $('#table').append(content);

    //code generate in table
    $(".code").each(function() {
      var barCodeId = $(this).attr("id");
      console.log(barCodeId, "code list");
      var $bars = $('<div class="svgCell">GASIMP<svg class="barcodes"></svg></div>').appendTo(this);
      $bars.find('.barcodes').JsBarcode(barCodeId, {
        width:2,
        height:30,
        fontSize:15,
        font:"Arial",
        lineColor:"black",
        displayValue: true
      });
    });
  
    // window.print();
    // window.open();
    //after Print change barcode DB

    
    window.onafterprint = function(){  
      var total = padZero(barCodeLD, 6);
      console.log("before send",total,"LD:",barCodeLD,"FD:",barCodeFD );
      var setQuery = [ barCodeFD, total ];  
      setBarcode(setQuery);  
      console.log(total," :",barCodeLD , "Printing completed...");
    }
      // window.close();  
      return false;
}


// store barcode sequence changes to DB
function setBarcode(query){
    var jsonString = JSON.stringify(query);
    $.ajax({
        type: "POST",
        url: "fetch.php",
        data: { data : jsonString }, 
        cache: false,
        success: function(data){
          // alert("OK");
          console.log(data,":sql ok");
        }
    });
}
  
  //fitch barcode sequence from DB
async function loadBarcode(query){
    let result;
    try {
        result = await $.ajax({
            url:"fetch.php",
            method:"POST",
            data: { query : query },
            success: function(data){
                if(!data){
                    console.log("noo ajax");
                    $('#userInput').val("000000");
                    return;
                }
                $('#userInput').val(data);
                barCodeLD = padZero(data, 6);
                console.log("ajax response", data);
            }
        })
        return result;
    } catch (error) {
        console.error(error);
    }
}

// add leading zero to the number
function padZero(num, size) {
    var tmp = num + "";
    while (tmp.length < size) tmp = "0" + tmp;
    return tmp;
}

//validate input 3 fields and return true || false
function formValidator(){
    if (barCodeFD.length < 3 || undefined){
        $("#invalidUserInputFirst").show();
        return false;
    }
    else {
        $("#invalidUserInputFirst").hide();
    }
    if (count.length < 1 || undefined){
        $("#invalidCount").show();
        return false;
    }
    else {
        $("#invalidCount").hide();
    }
    return true;
}
