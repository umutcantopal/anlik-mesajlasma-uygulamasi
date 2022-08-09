var uyeler = document.querySelectorAll(".uye-listesi > ul > li");
var uyeListesineGeriButton = document.getElementsByName("geri-git-button")[0];
var mesajForm = document.getElementsByClassName("mesaj-form")[0];
var karsiTarafKullaniciAdi;

uyeListesi.addEventListener("click", function(){
    if(event.target.getAttribute("name") == "list-kullanici" || event.target.parentElement.getAttribute("name") == "list-kullanici" || event.target.parentElement.parentElement.getAttribute("name") == "list-kullanici"){
        sohbetEkrani.style.cssText = "display: block";
        uyeListesi.style.cssText = "display: none";
        uyeListesineGeriButton.style.cssText = "visibility: visible;";
        mesajContainerDivYukseklikAyarla();
        // var karsiTarafKullaniciAdi;
        if(event.target.getAttribute("kullaniciadi") != null)
        {
            karsiTarafKullaniciAdi = event.target.getAttribute("kullaniciadi");
        }
        else if(event.target.parentElement.getAttribute("kullaniciadi") != null)
        {
            karsiTarafKullaniciAdi = event.target.parentElement.getAttribute("kullaniciadi");
        }
        else if(event.target.parentElement.parentElement.getAttribute("kullaniciadi") != null)
        {
            karsiTarafKullaniciAdi = event.target.parentElement.parentElement.getAttribute("kullaniciadi");
        }
        topBaslik.innerText = karsiTarafKullaniciAdi;
        var veri = `value=${karsiTarafKullaniciAdi}`;
        var xhttp = new XMLHttpRequest;
        xhttp.onreadystatechange = function(){
            if(xhttp.status === 200 && xhttp.readyState === 4)
            {
                if(this.responseText != "hata")
                {
                    var mesajListJson =JSON.parse(this.responseText);

                    var xhttp2 = new XMLHttpRequest;
                    xhttp2.onreadystatechange = function(){
                        if(xhttp2.status === 200 && xhttp2.readyState === 4)
                        {
                            var uyeid = this.responseText;
                            for(var i=0;i<mesajListJson.length;i++)
                            {
                                if(mesajListJson[i]["gonderenid"] === uyeid)
                                {
                                    sohbetBalonuOlustur(mesajListJson[i]["mesaj"],mesajListJson[i]["tarih"],"kullanici-taraf-mesaj");
                                }
                                else
                                {
                                    sohbetBalonuOlustur(mesajListJson[i]["mesaj"],mesajListJson[i]["tarih"],"karsi-taraf-mesaj");
                                }
                            }
                            yeniMesajVarmiKontrol(karsiTarafKullaniciAdi);
                        }
                    }
                    xhttp2.open("GET","uye-id-getir.php");
                    xhttp2.send();
                }
            }
        }
        // xhttp.open("GET",`mesajlari-getir.php?karsiUye=${karsiTarafKullaniciAdi}`);
        // xhttp.send();

        xhttp.open("POST","mesajlari-getir.php");
        xhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");
        xhttp.send(veri);
    }
});

uyeListesineGeriButton.addEventListener("click", function(){
    uyeListesineGeriButton.style.cssText = "visibility: hidden;";
    sohbetBalonlariTemizle();
    clearInterval(interval);
    sessionKontrol(sayfaDuzenle);
});

mesajForm.addEventListener("click", function(){
    if(event.target.getAttribute("name") === "mesaj-yolla-button")
    {
        mesajGonderSunucu();
    }
});

mesajForm.addEventListener("keydown",function(){
    if(event.key === "Enter")
    {
        mesajGonderSunucu();
    }
});