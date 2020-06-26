var defaultValues = {
    CODE128 : "Example 1234",
    CODE128A : "EXAMPLE",
    CODE128B : "Example text",
    CODE128C : "12345678",
    EAN13 : "1234567890128",
    EAN8 : "12345670",
    UPC : "123456789999",
    CODE39 : "EXAMPLE TEXT",
    ITF14 : "10012345000017",
    ITF : "123456",
    MSI : "123456",
    MSI10 : "123456",
    MSI11 : "123456",
    MSI1010 : "123456",
    MSI1110 : "123456",
    pharmacode : "1234"
};
var count;
var barCode;
var storeOption = {
  "format" : "",
  "background": "",
  "lineColor": "",
  "fontSize": 0,
  "height": 0,
  "width":"",
  "margin": 0,
  "textMargin": 0,
  "displayValue": true,
  "font": "",
  "fontOptions": "",
  "textAlign": ""
};

$(document).ready(function(){
    //read the userInputFirst and add to user input

    
    $("#userInput").on('input',newBarcode);
    $("#barcodeType").change(function(){
        $("#userInput").val( defaultValues[$(this).val()] );

        newBarcode();
    });

    //counter
    

    $(".text-align").click(function(){
      $(".text-align").removeClass("btn-primary");
      $(this).addClass("btn-primary");

      newBarcode();
    });

    $(".font-option").click(function(){
      if($(this).hasClass("btn-primary")){
        $(this).removeClass("btn-primary");
      }
      else{
        $(this).addClass("btn-primary");
      }

      newBarcode();
    });

    $(".display-text").click(function(){
      $(".display-text").removeClass("btn-primary");
      $(this).addClass("btn-primary");

      if($(this).val() == "true"){
        $("#font-options").slideDown("fast");
      }
      else{
        $("#font-options").slideUp("fast");
      }

      newBarcode();
    });

    $("#font").change(function(){
      $(this).css({"font-family": $(this).val()});
      newBarcode();
    });

    $('input[type="range"]').rangeslider({
        polyfill: false,
        rangeClass: 'rangeslider',
        fillClass: 'rangeslider__fill',
        handleClass: 'rangeslider__handle',
        onSlide: newBarcode,
        onSlideEnd: newBarcode
    });

    $('.color').colorPicker({renderCallback: newBarcode});

    newBarcode();


    $('#userInput').on("input",function(){
      barCode = $(this).val(); 
      // $("#userInputFirst").val(value);      
      
      storeOption = {
        "format" : $("#barcodeType").val(),
        "background": $("#background-color").val(),
        "lineColor": $("#line-color").val(),
        "fontSize": parseInt($("#bar-fontSize").val()),
        "height": parseInt($("#bar-height").val()),
        "width": $("#bar-width").val(),
        "margin": parseInt($("#bar-margin").val()),
        "textMargin": parseInt($("#bar-text-margin").val()),
        "displayValue": $(".display-text.btn-primary").val() == "true",
        "font": $("#font").val(),
        "fontOptions": $(".font-option.btn-primary").map(function(){return this.value;}).get().join(" "),
        "textAlign": $(".text-align.btn-primary").val()
      };


    });
    
});




// $("#userInputFirst").val(userInput);


var newBarcode = function() {
  console.log(barCode);
    //Convert to boolean
    $("#barcode").JsBarcode(
        $("#userInput").val(),
        {
          "format": $("#barcodeType").val(),
          "background": $("#background-color").val(),
          "lineColor": $("#line-color").val(),
          "fontSize": parseInt($("#bar-fontSize").val()),
          "height": parseInt($("#bar-height").val()),
          "width": $("#bar-width").val(),
          "margin": parseInt($("#bar-margin").val()),
          "textMargin": parseInt($("#bar-text-margin").val()),
          "displayValue": $(".display-text.btn-primary").val() == "true",
          "font": $("#font").val(),
          "fontOptions": $(".font-option.btn-primary").map(function(){return this.value;}).get().join(" "),
          "textAlign": $(".text-align.btn-primary").val(),
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

    $("#bar-width-display").text($("#bar-width").val());
    $("#bar-height-display").text($("#bar-height").val());
    $("#bar-fontSize-display").text($("#bar-fontSize").val());
    $("#bar-margin-display").text($("#bar-margin").val());
    $("#bar-text-margin-display").text($("#bar-text-margin").val());
};


function replacePage(){
  count = $("#count").val();
  console.log(count, "count");

  var newElement = "<div id='here_table'></div>";  //"<svg id='barcode'></svg>";
  document.body.innerHTML = newElement;
  newBarcode();

  var content = "<table>"
    for(i = 0; i < count; i++){
        content += '<tr><td class="code">' + "" + barCode++ + '</td></tr>';
    }
    content += "</table>"

    $('#here_table').append(content);

    //code generate in table
    $(".code").each(function() {
      var thecode = $(this).text();
      console.log(thecode, "code list");
      var $bars = $('<div class="thebars"><svg class="barcodes"></svg></div>').appendTo(this);
      $bars.find('.barcodes').JsBarcode(thecode, {
        displayValue: false,
        height: 35
      });
    });

}

//function to store to file
function readFiles()
{
    $.get('file.txt', function(data) {
        alert(data);
    }, "text");
}

// function replacePage(){
//   var newElement= "<input type='textbox' name='myTextbox'>ddd";
//   document.body.innerHTML=newElement;
//   }