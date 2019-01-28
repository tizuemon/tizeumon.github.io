//textboxの文字を取得する
function tbox1() {

  str1 = document.form.txtb.value;

  console.log(str1);

  var x = document.getElementById('textid').value;
  //numx = parseInt(x);
  //numx = numx + 1;

  var kanji = "";
  var hiragana = "";
  var katakana = "";
  var sonota = "";
  var count = 0;

  var hindo = Array(96);
  var saihin = "";
  var tmp = "";
  var max = 0;

  for (var i = 0; i < 96; i++){
    hindo[i] = 0;
  }

  for(var i = 0; i < x.length; i++){
    var unicode = x[i].charCodeAt(0);
    if ( (unicode>=0x4e00  && unicode<=0x9fcf)  || // CJK統合漢字
         (unicode>=0x3400  && unicode<=0x4dbf)  || // CJK統合漢字拡張A
         (unicode>=0x20000 && unicode<=0x2a6df) || // CJK統合漢字拡張B
         (unicode>=0xf900  && unicode<=0xfadf)  || // CJK互換漢字
         (unicode>=0x2f800 && unicode<=0x2fa1f) ){  // CJK互換漢字補助
    	kanji += x[i];
    	count++;
    }
    else if( unicode>=0x3040 && unicode<=0x309f ){ //ひらがな
      tmp = String(unicode);
      hindo[parseInt(tmp)-12352]++;
    	hiragana += x[i];
    	count++;
    }
    else if( unicode>=0x30a0 && unicode<=0x30ff ){ //カタカナ
    	katakana += x[i];
    	count++;
    }
    else if( unicode !=0x000D && unicode !=0x000A && //空白改行
    	   unicode !=0x0085 &&unicode !=0x0008 &&
    	   unicode !=0x000C &&unicode !=0x2028 &&
    	   unicode !=0x2029 &&unicode !=0x0020 &&
    	   unicode !=0x00A0 &&
    	   /*unicode<0x2000 && unicode>0x2009 &&*/
    	   unicode !=0x200A &&unicode !=0x200B &&
    	   unicode !=0x202F &&unicode !=0x205F &&
    	   unicode !=0x3000 &&unicode !=0xFEFF) {
    	sonota += x[i];
    	count++;
    }
  }
  //alert(kanji.length);
  document.getElementById('kanji').innerHTML = kanji;
  document.getElementById('hiragana').innerHTML = hiragana;
  document.getElementById('katakana').innerHTML = katakana;
  document.getElementById('sonota').innerHTML = sonota;

  var kanji_ratio = Math.floor(kanji.length/count*1000)/10;
  var hiragana_ratio = Math.floor(hiragana.length/count*1000)/10;
  var katakana_ratio = Math.floor(katakana.length/count*1000)/10;
  var sonota_ratio = Math.floor(sonota.length/count*1000)/10;

  var tmp_h = 0;

  for (var i = 0; i < 96; i++){
    for(var j = i;j < 96; j++){
      if(hindo[i]<hindo[j]){
        tmp_h = hindo[i];
        hindo[i] = hindo[j];
        hindo[j] = tmp_h;
      }
    }
  }

  for(var i = 0; i < 5; i++){
    hindo[i]+=12352;
  }

  //max += 12352;

  var bunseki =  "文字数 " + count + "字 <br>" +
  		 "漢字数 " + kanji.length + "字 比率 " + kanji_ratio + "%" + "<br>" +
  		 "ひらがな数 " + hiragana.length + "字 比率 " + hiragana_ratio + "%" + "<br>" +
  		 "カタカナ数 " + katakana.length + "字 比率 " + katakana_ratio + "%" + "<br>" +
       "その他数 " + sonota.length + "字 比率 " + sonota_ratio + "%" + "<br>" + 
       "最頻値(ひらがな)ランキング" + "<br>" +
       "1位「" + String.fromCharCode( "0x" + hindo[0].toString(16)) + "」" + (hindo[0] - 12352) + "<br>" +
       "2位「" + String.fromCharCode( "0x" + hindo[1].toString(16)) + "」" + (hindo[1] - 12352) + "<br>" + 
       "3位「" + String.fromCharCode( "0x" + hindo[2].toString(16)) + "」" + (hindo[2] - 12352) + "<br>" + 
       "4位「" + String.fromCharCode( "0x" + hindo[3].toString(16)) + "」" + (hindo[3] - 12352) + "<br>" + 
       "5位「" + String.fromCharCode( "0x" + hindo[4].toString(16)) + "」" + (hindo[4] - 12352) + "<br>" ;

  document.getElementById('analysis').innerHTML = bunseki;
};