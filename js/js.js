var kullanici = {
    kullaniciadi : ""
}

//session yokken gösterilecekler
var uyeGirisYok = document.getElementsByClassName("uye-giris-yok")[0];
var girisYapForm = document.getElementsByClassName("giris-yap-form")[0];
var uyeOlForm =  document.getElementsByClassName("uye-ol-form")[0];

//aktif sessionda gösterilecekler
var uyeOnayForm = document.getElementsByClassName("uye-onay-form")[0];
var uyeListesi = document.getElementsByClassName("uye-listesi")[0];
var sohbetEkrani = document.getElementsByClassName("sohbet-ekrani")[0];
var cikisButton = document.getElementsByName("cikis-yap-button")[0];
var topBaslik = document.getElementsByClassName("top-baslik")[0];
var mesajlarContainer = document.getElementsByClassName("mesajlar-container")[0];

window.addEventListener("load",function(){
    sessionKontrol(sayfaDuzenle);
    document.getElementsByName("geri-git-button")[0].style.cssText = "visibility: hidden";
});


uyeGirisYok.addEventListener("click", function(){
    uyeGirisYok.style.cssText = "display:none";
    if(event.target.name == "giris-form-yonlendir-button")
    {
        girisYapForm.style.cssText = "display: flex";
        console.log(event.target.name);
    }
    else if(event.target.name == "uye-ol-form-yonlendir-button")
    {
        uyeOlForm.style.cssText = "display: flex";
        console.log(event.target.name);
    }
    else
    {
        girisYapForm.style.cssText = "display: none";
        uyeOlForm.style.cssText = "display: none";
        uyeGirisYok.style.cssText = "display: flex";
        console.log(event.target.name);
    }
});

var geriDonLinkler = document.getElementsByClassName("geri-don-link");
for(var i=0;i<geriDonLinkler.length;i++)
{
    geriDonLinkler[i].addEventListener("click",function(){
        girisYapForm.style.cssText = "display: none";
        uyeOlForm.style.cssText = "display: none";
        uyeGirisYok.style.cssText = "display: flex";
    });
}

mesajlarContainer.addEventListener("scroll",function(){
    var param = document.getElementsByClassName("yeni-mesaj-uyari")[0];
    var paramCss = window.getComputedStyle(param);
    var paramCssValue = paramCss.getPropertyValue("display");
    var scrollbarKonum = scrollbarKonumu();

    if(scrollbarKonum == true && paramCssValue != "none")
    {
        param.style.cssText = "display: none";
    }
})