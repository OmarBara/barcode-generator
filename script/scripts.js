var count;
var barCode;
var barCodeFD = "000";
var barCodeLD = "000000";

$(document).ready(function(){

    
    $("#userInputFirst").on('input',newBarcode);    
    $("#userInput").on('input',newBarcode);
    $("#barcodeType").change(function(){
        $("#userInput").val( defaultValues[$(this).val()] );

        newBarcode();
    });

    //review if it's effictive 
    $('#userInputFirst').on("input",function(){
        //chek database value
        barCodeFD = $(this).val();        
        console.log(barCodeFD.length ,"FD size:", barCodeFD);

        loadBarcode(barCodeFD);
    })


    $('#userInput').on("input",function(){
        barCodeLD = $(this).val(); 
        barCodeFD = $("#userInputFirst").val();
        //remove this
        if(!barCodeFD){
          $("#userInputFirst").val("000")
        }
        barCodeFD = $("#userInputFirst").val();
  
        // barCode = barCodeFD +" "+ barCodeLD;
  
        console.log(barCodeFD, "first digit");
        console.log(barCode, "full");
    })   
})


var newBarcode = function() {
    console.log(barCodeLD);
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



function replacePage(){
    count = $("#count").val();
    //validate form
    if(!formValidator()){

        console.log(count, "!Validator");
        return 
    }

    var newElement = "<div id='table'></div>";
    document.body.innerHTML = newElement;
    newBarcode();
  
    var content = "<table>"
    for(i = 0; i < count; i++){
        content += '<tr><td class="code" id=' + barCodeFD + barCodeLD++ +'>' + "" + '</td></tr>';
    }
    content += "</table>"  
    $('#table').append(content);

    //code generate in table
    $(".code").each(function() {
      var thecode = $(this).attr("id");
      console.log(thecode, "code list");
      var $bars = $('<div class="thebars"><svg class="barcodes"></svg></div>').appendTo(this);
      $bars.find('.barcodes').JsBarcode(thecode, {
        width:2,
        height:60,
        fontSize:10,
        displayValue: true
      });
    });
  
    window.print();
    //after Print change barcode DB
    if(window.onafterprint){
        console.log("after print");
    }
    window.onafterprint = function(){  
      total = padZero(barCodeLD, 6);
      var setQuery = [ barCodeFD, total ];  
      setBarcode(setQuery);  
      console.log(total," :",barCodeLD , "Printing completed...");
    }
      // window.close();  
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
function loadBarcode(query){
    $.ajax({
        url:"fetch.php",
        method:"POST",
        data: { query : query },
        success: function(data){
          $('#userInput').val(data);
          console.log(data);
        }
    });
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
