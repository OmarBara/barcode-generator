var count;
var barCode;
var barCodeFD;
var barCodeLD;

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
        if(barCodeFD > 0){
        console.log("inside empty");
        }
        console.log("inside full");
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
    console.log(count, "count");
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
      // var thecode = $(this).text();
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
    window.onafterprint = function(){  
      total = padZero(barCodeLD, 6);
      var setQuery = [ barCodeFD, total ];  
      setBarcode(setQuery);  
      console.log(total," :",barCodeLD , "Printing completed...");
    }
      // window.close();  
}