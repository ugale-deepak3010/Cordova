
var hle;
var ids;
var le;



//alert("stred highest level"+hle);
var url_string =window.location.href
var url = new URL(url_string);
var customLevel = url.searchParams.get("customLevel");
//alert("customLevel=="+customLevel);

buttonCol();
function buttonCol() {
  console.log("buttonCol");
  try{
  hle = localStorage.getItem("le");
  //hle=parseInt(hle);
}catch(err){
console.log("err ="+err);
}
  console.log("buttonCol"+hle);

  for(var i=1;i<=16;i++){  
    ids=document.getElementById(i);

    if (hle>=i) {
      ids.classList.remove("btn-light");
      ids.classList.add("btn-danger");
    }
  }
}

function redirect(){
  window.location.href="ab/about.html";
}

function mlev(id){
  if (id<=hle) {
    window.location="index.html?customLevel="+id;
  }else{
    //alert("highest");
  }
}

(function(){
console.log("A")
   
  try{
    console.log("A-1");

    try{
      le = localStorage.getItem("le");
      if (le==0) {
        le=1;
      }
    }catch(err){
      if (le==0) {
        le=1;
      }
      console.log("err = "+err);
    }
    
    //le=parseInt(le);
    console.log("A-1.1 = le"+le);

    if (le == null) {
      le=1;
      console.log("A-2"+le);
      localStorage.setItem("le",0);
      
      console.log("A-2.0"+le);
    }else{
      console.log("A-2.1 le == null detect failed");
      //localStorage.setItem("le","1");
      //alert("filled");
    }
}catch(err){
  //console.log("Nott found"+err);
}

console.log("customLevel"+customLevel)
if (customLevel==null) {
  leTemp=le;
  console.log("customLevel 1- "+le);
}else{
  leTemp=customLevel;
}

 console.log("leTemp"+leTemp);
  var stage = leTemp,//level starting
      active = leTemp,//level Starting
      levelCount = $('div[class^=level]').length,
      createLevelState = 0;
  setTheme();
  console.log("B");
  createLevels();
  console.log("C");
  showLevels();
  console.log("D");
  
  $('body').on('click','.block',function(){
    console.log("E");
    var x = $(this).attr('class').replace(/\D+/g,'');
    if(active && x){
      $(this).removeClass('r' + x);
      x++;
      if($(this).hasClass('straight')){
        if(x == 3) x = 1;
      }else if(x == 5){
        x = 1;
      }
      $(this).addClass('r' + x);
      if(!createLevelState){
        combination();
      }else{
        levelStats();
      }
    }
  });
  
  //d
  
  $('#theme').click(function(){
    console.log("F");
    $('body').toggleClass('light');
    if($('body').attr('class') == 'light') {
      $('#theme').text('Lights Off');
    }else{
      $('#theme').text('Lights On');
    }
    localStorage.setItem('theme', $('body').attr('class'));
  });
  
  function combination() {
    console.log("G");
    var x = $('.level' + stage).find('.block'), h = '';
    $.each(x, function(i, el) {
      h += $(this).attr('class').replace(/\D+/g,'');
    });
    console.info(h);
    if($('.level' + stage).data('code') == h){
      stage++;
      active = 0;
      setTimeout(function(){
        showLevels();
      },500);
    }
  }
  
  function showLevels() {
    console.log("H");
    var remove = stage - 1;
    //alert("remove=="+remove);

    if (remove==0) {

    }else{
                if (customLevel==null){
                  customLevel=-255;//fake setting
                }else{}

      //x = localStorage.getItem("le");
      //alert("stre time customLevel"+customLevel);
      //alert(" store time hle x"+x);
      //alert(" store time le"+stage);
        
                  if (remove>=hle) {
                    add=remove+1;
                    //alert("this is highest Stage"+add);
                    //alert(typeof remove);
                    localStorage.setItem("le",add);//setting winnning level.
                    xq = localStorage.getItem("le");
                    //alert("xq"+xq);
                    customLevel=null;
                  }
    }
    
    $('#win .text span').text(remove);
    if(stage > levelCount){
      $('#finished').fadeIn();
    }else if(stage > 1){
      $('#win').fadeIn();
      setTimeout(function(){
        $('.level' + remove).remove();
        $('div.level' + stage).show();
        $('#win').fadeOut();
        active = 1;
      },2000);
    }else{
      $('div.level' + stage).fadeIn();
    }
  }
  
  function createLevels() {
    console.log("I");
    $.each($('div[data-set]'), function(i,el){
      var levelHtml = '';
      var set = $(this).data('set').split('.');
      $.each(set, function(i, el) {
        var style = 'curve';
        if(set[i][0] == 's') style = 'straight';
        if(set[i][0] == 'e') style = 'end';
        if(set[i][0] == 'b') style = '';
        var rotate = ''
        if(set[i][1]) var rotate = 'r' + set[i][1];
        var double = ''
        if(set[i][2]) var double = 'double';
        levelHtml += '<div class="block ' + style + ' ' + double + ' ' + rotate + '"></div>';
      });
      var text = $(this).data('text');
      if(text) levelHtml += '<div class="text">'+text+'</span></div>';
      $(this).append(levelHtml);
    });
  }
  
  function setTheme() {
    try{
    if(localStorage.theme == 'light') {
      $('body').addClass('light');
      $('#theme').text('Lights Off');
    }
  }catch(err){
    console.log("err = "+err);
  }
  }
  
  function levelStats() {
    console.log("K");
    var code = '', set = '';
    $.each($('.newLevel .block'),function(i, el){
      var s = $(this).attr('class').split(' ')[1][0];
      if(s != 'b') code += $(this).attr('class').replace(/\D+/g,'');
      var r = Math.floor(Math.random() * 2) + 1;
      if(s != 's') Math.floor(Math.random() * 4) + 1;
      if(s == 'b') r = '';
      set +=  s + r + '.';
    });
    set = set.slice(0, -1);
    $('.stats').html('code: ' + code + ' - Set: ' + set);
  }
  
  $('.toggleCreateLevel').click(function(){
    console.log("L");
    $('#createLevel .newLevel').empty();
    $('#createLevel').fadeToggle();
    if(!createLevelState){
      createLevelState = 1;
    }else{
      createLevelState = 0;
    }
  });
  
  $('.tools img').click(function(){
    console.log("M");
    var x = $(this).attr('class');
    $('.newLevel').append('<div class="block ' + x + ' r1"></div>');
  });
})();