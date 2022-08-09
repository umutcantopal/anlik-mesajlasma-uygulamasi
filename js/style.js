function mesajContainerDivYukseklikAyarla(){
    var topClienHeight = document.querySelector("#top").clientHeight;
    var mesajFormClientHeight = document.querySelector("#middle > div.sohbet-ekrani > div.mesaj-form").clientHeight;
    var mainDivClientHeight = document.querySelector("#main").clientHeight;
    var yukseklikDeger = mainDivClientHeight - (topClienHeight+ mesajFormClientHeight);

    document.getElementsByClassName("mesajlar-container")[0].style.cssText = "height:"+yukseklikDeger+"px";
}