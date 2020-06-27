<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap-theme.min.css">    
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap-theme.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css">


    <link rel="stylesheet" type='text/css' href="style/rangeslider.css">
    <link rel="stylesheet" type='text/css' href="style/style.css">

    <script type="text/javascript" src="https://code.jquery.com/jquery-2.1.3.min.js"></script>
    <script type="text/javascript" src="script/JsBarcode.all.min.js"></script>
    <script type="text/javascript" src="script/rangeslider.min.js"></script>
    <script type="text/javascript" src="script/jqColorPicker.min.js"></script>
    <script type="text/javascript" src="script/script.js"></script>
<?php 
    require_once 'config/connect.php';

    $sql = "SELECT * FROM `sequence` where id = 1";

    $result = mysqli_fetch_assoc(mysqli_query($con,$sql));
    echo $result["id"];
    echo $result["value"];
    echo "+++\n";

    foreach($result as $val){
        echo $val . "-- \n";
    }

        
 ?>
</head>
</head>
  <body>
    <div id="main">
      <div class="container">
        <div class="row">
          <div class="col-md-10 col-md-offset-1">
            <div id="title">
              <h1>Barcode Generator</h1>
            </div>
          </div>
        </div>
      </div>
      <div class="barcode-container">
        <svg id="barcode"></svg>
        <span id="invalid">Not valid data for this barcode type!</span>
      </div>
      
      <div class="container">
        <div class="row search-bar">
          <div class="col-md-8 col-md-offset-1">
            <div class="input-group margin-bottom-sm">
              <span class="input-group-addon"><i class="fa fa-barcode fa-fw"></i></span>
              <input class="form-control" id="userInputFirst" type="text" value="000" placeholder="123" maxlength="3" minlength="3" autofocus>
              <input class="form-control" id="userInput" type="text" value="<?php echo $result["value"];?>"  maxlength="9" minlength="6" autofocus>
              <span class="input-group-btn">
                <select class="btn barcode-select" id="barcodeType" title="CODE128">
                  <option value="CODE128">CODE128 auto</option>
                  <option value="CODE128A">CODE128 A</option>
                  <option value="CODE128B">CODE128 B</option>
                  <option value="CODE128C">CODE128 C</option>
                  <option value="EAN13">EAN13</option>
                  <option value="EAN8">EAN8</option>
                  <option value="UPC">UPC</option>
                  <option value="CODE39">CODE39</option>
                  <option value="ITF14">ITF14</option>
                  <option value="ITF">ITF</option>
                  <option value="MSI">MSI</option>
                  <option value="MSI10">MSI10</option>
                  <option value="MSI11">MSI11</option>
                  <option value="MSI1010">MSI1010</option>
                  <option value="MSI1110">MSI1110</option>
                  <option value="pharmacode">Pharmacode</option>
                </select>
              </span>
            </div>
          </div>
        </div>
           <br>
        <div>
          <input class="form-control" id="count" type="number"  placeholder="10" maxlength="6" autofocus>
        </div>
        
        <div>
          <button class="button" name="myButton" onclick="replacePage()">Print</button>
        </div>
        <div>
            <input type="button" value="Home" class="homebutton" id="btnHome" 
                onClick="document.location.href='index.html'" />
        </div>

        

        <!-- Bar width -->
        <div class="row">
          <div class="col-md-2 col-xs-12 col-md-offset-1 description-text"><p>Bar Width</p></div>
          <div class="col-md-7 col-xs-11 slider-container"><input id="bar-width" type="range" min="1" max="4" step="1" value="2"/></div>
          <div class="col-md-1 col-xs-1 value-text"><p><span id="bar-width-display"></span></p></div>
        </div>
        <!-- Height -->
        <div class="row">
          <div class="col-md-2 col-xs-12 col-md-offset-1 description-text"><p>Height</p></div>
          <div class="col-md-7 col-xs-11 slider-container"><input id="bar-height" type="range" min="10" max="150" step="5" value="100"/></div>
          <div class="col-md-1 col-xs-1 value-text"><p><span id="bar-height-display"></span></p></div>
        </div>
        <!-- Margin -->
        <div class="row">
          <div class="col-md-2 col-xs-12 col-md-offset-1 description-text"><p>Margin</p></div>
          <div class="col-md-7 col-xs-11 slider-container"><input id="bar-margin" type="range" min="0" max="25" step="1" value="10"/></div>
          <div class="col-md-1 col-xs-1 value-text"><p><span id="bar-margin-display"></span></p></div>
        </div>
        <!-- Background (color) -->
        <div class="row">
          <div class="col-md-2 col-xs-12 col-md-offset-1 description-text"><p>Background</p></div>
          <div class="col-md-7 col-xs-11 input-container"><input id="background-color" class="form-control color" value="#FFFFFF"/></div>
          <div class="col-md-1 col-xs-1 value-text"></div>
        </div>
        <!-- Line color -->
        <div class="row">
          <div class="col-md-2 col-xs-12 col-md-offset-1 description-text"><p>Line Color</p></div>
          <div class="col-md-7 col-xs-11 input-container"><input id="line-color" class="form-control color" value="#000000"/></div>
          <div class="col-md-1 col-xs-1 value-text"></div>
        </div>
        <!-- Show text -->
        <div class="row checkbox-options">
          <div class="col-md-2 col-md-offset-1 col-xs-12 col-xs-offset-0 description-text"><p>Show text</p></div>
          <div class="col-md-7 col-xs-12 center-text">
            <div class="btn-group btn-group-md" role="toolbar">
              <button type="button" class="btn btn-default btn-primary display-text" value="true">Show</button>
              <button type="button" class="btn btn-default display-text" value="false">Hide</button>
            </div>
          </div>
          <div class="col-md-1 col-xs-0"></div>
        </div>
        <div id="font-options">
          <!-- Text align -->
          <div class="row checkbox-options">
            <div class="col-md-2 col-md-offset-1 col-xs-12 col-xs-offset-0 description-text"><p>Text Align</p></div>
            <div class="col-md-7 center-text">
              <div class="btn-group btn-group-md" role="toolbar">
                <button type="button" class="btn btn-default text-align" value="left">Left</button>
                <button type="button" class="btn btn-default btn-primary text-align" value="center">Center</button>
                <button type="button" class="btn btn-default text-align" value="right">Right</button>
              </div>
            </div>
            <div class="col-md-1"></div>
          </div>
          <!-- Font -->
          <div class="row">
            <div class="col-md-2 col-md-offset-1 col-xs-12 col-xs-offset-0 description-text"><p>Font</p></div>
            <div class="col-md-7 center-text">
              <select class="form-control" id="font" style="font-family: monospace">
                <option value="monospace" style="font-family: monospace" selected="selected">Monospace</option>
                <option value="sans-serif" style="font-family: sans-serif">Sans-serif</option>
                <option value="serif" style="font-family: serif">Serif</option>
                <option value="fantasy" style="font-family: fantasy">Fantasy</option>
                <option value="cursive" style="font-family: cursive">Cursive</option>
              </select>
            </div>
            <div class="col-md-1"></div>
          </div>
          <!-- Font options -->
          <div class="row checkbox-options">
            <div class="col-md-2 col-md-offset-1 col-xs-12 col-xs-offset-0 description-text"><p>Font Options</p></div>
            <div class="col-md-7 center-text">
              <div class="btn-group btn-group-md" role="toolbar">
                <button type="button" class="btn btn-default font-option" value="bold" style="font-weight: bold">Bold</button>
                <button type="button" class="btn btn-default font-option" value="italic" style="font-style: italic">Italic</button>
              </div>
            </div>
            <div class="col-md-1"></div>
          </div>
          <!-- Font size -->
          <div class="row">
            <div class="col-md-2 col-md-offset-1 col-xs-12 col-xs-offset-0 description-text"><p>Font Size</p></div>
            <div class="col-md-7 col-xs-11 slider-container"><input id="bar-fontSize" type="range" min="8" max="36" step="1" value="20"/></div>
            <div class="col-md-1 col-xs-1 value-text"><p><span id="bar-fontSize-display"></span></p></div>
          </div>
          <!-- Text margin -->
          <div class="row">
            <div class="col-md-2 col-md-offset-1 col-xs-12 col-xs-offset-0 description-text"><p>Text Margin</p></div>
            <div class="col-md-7 col-xs-11 slider-container"><input id="bar-text-margin" type="range" min="-15" max="40" step="1" value="0"/></div>
            <div class="col-md-1 col-xs-1 col-xs-11 value-text"><p><span id="bar-text-margin-display"></span></p></div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div>
    <table>
      <tr>
        <th>barcode list</th>        
      </tr>
      <tr>
        <td class="code"><a>38HY7</a></td>
        
      </tr>
      <tr>
        <td class="code"><a>ABC123</a></td>
        
      </tr>
    </table>
    <button id="barcodes">shwo barcodes</button>
    </div> -->

  </body>
    <script>	 
      $("#barcodes").click(function() {
        $(".code > a").each(function() {
          var thecode = $(this).text();
          console.log(thecode);
          var $bars = $('<div class="thebars"><br /><svg class="barcodes"></div></svg>').appendTo(this);
          $bars.find('.barcodes').JsBarcode(thecode, {
            displayValue: false,
            height: 20
          });
        });
        readFiles();
      });
      

		</script>
</html>
