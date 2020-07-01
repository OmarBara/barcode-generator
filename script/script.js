var defaultValues = {
    CODE128 : "000 1234",
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
var barCodeFD;
var barCodeLD;
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

    $("#userInputFirst").on('input',newBarcode);    
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


var newBarcode = function() {
  console.log(barCodeLD);
    //Convert to boolean
    $("#barcode").JsBarcode(
      barCodeFD + barCodeLD,
        // $("#userInput").val(),
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
  //redirect to another page
  // document.location.href='new.html'
  var newElement = "<div id='table'></div>";  //"<svg id='barcode'></svg>";
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
    var $bars = $('<div class="svgCell"><svg class="barcodes"></svg></div>').appendTo(this);
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
    //count 2 string barCodeLD + count  TODO:
    // var total = Number(barCodeLD) + Number(count);
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

// $('#userInputFirst').keyup(function(){
//  var search = $(this).val();
//  if(search != '')
//  {
//   load_data(search);
//  }
//  else
//  {
//   load_data();
//  }
// });


// function replacePage(){
//   var newElement= "<input type='textbox' name='myTextbox'>ddd";
//   document.body.innerHTML=newElement;
//   }

//create 3 X x table
function tableCreate() {
  var body = document.getElementsByTagName('body')[0];
  var tbl = document.createElement('table');
  tbl.style.width = '100%';
  tbl.setAttribute('border', '1');
var x =0;
  var tbdy = document.createElement('tbody');
  for (var i = 0; i < 3; i++) {
    var tr = document.createElement('tr');
    for (var j = 0; j < 3; j++) {
      if (i == 2 && j == 1) {
        break
      } else {
        var td = document.createElement('td');
        td.appendChild(document.createTextNode(x++))
        i == 1 && j == 1 ? td.setAttribute('rowSpan', '1') : null;
        tr.appendChild(td)
      }
    }
    tbdy.appendChild(tr);
  }
  tbl.appendChild(tbdy);
  body.appendChild(tbl)
}
// tableCreate();