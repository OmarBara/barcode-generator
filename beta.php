<!DOCTYPE html>
<html  lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=3.0">
    <title>Document</title>

    <link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap-theme.min.css">    
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap-theme.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css">
    <link rel="stylesheet" type='text/css' href="style/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Tajawal&display=swap" rel="stylesheet">
    
    <script type="text/javascript" src="https://code.jquery.com/jquery-2.1.3.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
    <script type="text/javascript" src="script/JsBarcode.all.min.js"></script>
    <script type="text/javascript" src="script/scripts.js"></script>
</head>
</head>
  <body>
    <div id="main">
      <div class="container">
        <div class="row">
          <div class="col-md-7 col-md-offset-1">
            <div id="title">
              <h4> الهئية العامة للبحث و التعرف على المفقودين </h4>
              <h4>منظومة إصدار الرقم المشفر للجثامين مجهولة الهوية</h4>

            </div>
          </div>
          <div class="col-md-3 col-md-offset-1">
              <img src="icon2.jpeg" alt="icon" width="120" height="120">
          </div>
        </div>
      </div>
      <div class="barcode-container">
        <svg id="barcode"></svg>
        <span id="invalid">تسلسل غير صالح للباركود</span>
      </div>
      
      <div class="container">
        <form dir="rtl">
        <div class="form-row">
          <div class="form-group col-md-3">
            <label for="input" style="float: right;">كود المنطقة</label>
            <input  type="text" class="form-control" id="userInputFirst" placeholder="123" maxlength="3" minlength="3" autofocus required>
            <span id="invalidUserInputFirst" hidden> كود غير صحصح</span>
          </div>
          <div class="form-group col-md-6">
            <label for="input" style="float: right;">كود التسلسل</label>
            <input type="text" class="form-control" id="userInput" placeholder="123456" style="margin-left: 500px;" maxlength="6" minlength="6" readonly>
            <span id="invalidUserInput" hidden>تسلسل غير صالح للباركود</span>
          </div>
          <br>
          <div class="form-group col-md-6" >
            <input class="form-check-input" type="checkbox" id="CheckBox">
            <label class="form-check-label" for="CheckBox">ادخال تسلسل يدوي</label>
          </div>
          <div class="form-group col-md-12">            
          <span class="input-group-addon"><i class="fa fa-barcode fa-fw"></i></span>
          </div>
        </div>
                     
          <div class="form-row">
            <div class="form-group col-md-12">
              <label for="input">العدد</label>
              <input class="form-control" id="count" type="number"  placeholder="10" maxlength="6" autofocus required>
            <span id="invalidCount" hidden>الرجاء ادخال عدد صحيح</span>
            </div>
          </div>
          <br>
          <div>
            <button class="btn btn-primary" name="myButton" onclick="return replacePage(event)" style="float: right;">طباعة</button>
          </div>
                
        </form>
      </div>
    </div>
