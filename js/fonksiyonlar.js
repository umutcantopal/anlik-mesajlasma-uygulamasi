function sessionKontrol(callback){
    var xhttp = new XMLHttpRequest;
    var sessionDurumu = false;

    xhttp.onreadystatechange = function(){
        if(xhttp.readyState === 4 && xhttp.status === 200)
        {
            if(this.responseText === "true"){
                sessionDurumu = true;
            }
            callback(sessionDurumu);
        }
    }
    xhttp.open("GET", "session-kontrol.php");
    xhttp.send();
}

function sayfaDuzenle(sessionDurumu){
    uyeGirisYok.style.cssText = "display: none";
    girisYapForm.style.cssText = "display: none";
    uyeOlForm.style.cssText = "display: none";
    uyeOnayForm.style.cssText = "display: none";
    uyeListesi.style.cssText = "display: none";
    sohbetEkrani.style.cssText = "display: none";

    var uyeListe = document.querySelector("#middle > div.uye-listesi > ul");

    if(uyeListe.children.length != 0)
    {
        uyeListe.removeChild(uyeListe.children[0]);
    }

    if(sessionDurumu === false)//session yoksa 
    {
        uyeGirisYok.style.cssText = "display: flex";
        cikisButton.style.cssText = "visibility: hidden";
        topBaslik.innerText = "Hoş Geldin Ziyaretçi";
    }
    if(sessionDurumu === true)//session varsa
    {  
        cikisButton.style.cssText = "visibility: visible";
        var xhttp = new XMLHttpRequest;
        xhttp.onreadystatechange = function()
        {
            if(xhttp.status === 200 && xhttp.readyState === 4)
            {
                if(this.responseText === "aktif oturum yok")
                {
                    uyeGirisYok.style.cssText = "display: flex";
                    topBaslik.innerText = "Hoş Geldin Ziyaretçi";
                    cikisButton.style.cssText = "visibility: hidden";
                }
                if(this.responseText === "0" || this.responseText === "1")
                {
                    if(kullanici.kullaniciadi == "" || kullanici.kullaniciadi == undefined || kullanici.kullaniciadi == null)
                    {
                        var xhttp2 = new XMLHttpRequest;
                        xhttp2.onreadystatechange = function(){
                            // console.log(xhttp2.readyState+" > "+xhttp2.status);
                            if(xhttp2.status === 200 && xhttp.readyState === 4)
                            {
                                kullanici.kullaniciadi = this.responseText;
                                topBaslik.innerText = kullanici.kullaniciadi;
                            }
                        }
                        xhttp2.open("GET", "kullaniciadi-getir.php");
                        xhttp2.send();
                    }
                    topBaslik.innerText = kullanici.kullaniciadi;
                    if(this.responseText === "0")
                    {
                        uyeOnayForm.style.cssText = "display: flex";
                    }
                    if(this.responseText === "1")
                    {
                        uyeListesi.style.cssText = "display: block";
                        uyeleriListele();
                    }
                }
            }
        }
        xhttp.open("GET", "uye-onay-kontrol.php");
        xhttp.send();
    }
}

function hataMesajiYazdir(hataMesaji,mesajYazilacakAlan){
    const para = document.createElement("p");
    para.style.cssText = "color: #e61a37; padding: 0; margin: 0; text-align: center;";
    para.setAttribute("class", "hatamesaji");
    para.innerText = hataMesaji;
    mesajYazilacakAlan.appendChild(para);
    setTimeout(function(){
        hataMesajlariniTemizle();
    },4000);
}

function hataMesajlariniTemizle(){
    var hataMesajlari = document.getElementsByClassName("hatamesaji");
        
    if(hataMesajlari.length != 0)
    {
        for(var i=hataMesajlari.length-1; i>-1 ;i--)
        {
            hataMesajlari = document.getElementsByClassName("hatamesaji");
            hataMesajlari[0].remove();
        }
    }
}

function uyeleriListele(){
    list = document.querySelector("#middle > div.uye-listesi > ul");
    if(list.children.length != "0")
    {
        for(var i = list.children.length-1;i > -1 ;i--)
        {
            list.removeChild(list.children[i]);
        }
    }
    var xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function(){
        if(xhttp.status === 200 && xhttp.readyState === 4){
            var kullaniciListJSON =JSON.parse(this.responseText);
            document.getElementsByClassName("uyeler-list-baslik")[0].innerText = "Üyeler ("+kullaniciListJSON.length+")";
            for(var i = 0;i < kullaniciListJSON.length; i++)
            {
                const para1 = document.createElement("li");
                para1.setAttribute("name","list-kullanici");
                para1.setAttribute("kullaniciadi", kullaniciListJSON[i]["kullaniciadi"]);

                const para2 = document.createElement("span");
                para2.classList.add("fa-li");
                para2.style.cssText = "margin: 0";

                const para3 = document.createElement("i");
                para3.classList.add("fa-solid");
                para3.classList.add("fa-user");

                para2.appendChild(para3);

                const para4 = document.createElement("span");
                para4.setAttribute("name","list-uye-adi");
                para4.setAttribute("uyeid",kullaniciListJSON[i]["id"]);
                para4.innerText = kullaniciListJSON[i]["kullaniciadi"];//dinamik yap

                para1.appendChild(para2);
                para1.appendChild(para4);
                list.appendChild(para1);
            }
        }
    }
    xhttp.open("GET", "uyeleri-listele.php");
    xhttp.send();
}

cikisButton.addEventListener("click",function(){
    var xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function(){
        if(xhttp.status === 200 && xhttp.readyState === 4)
        {
            location.reload();
        }
    }
    xhttp.open("GET", "oturum-kapat.php");
    xhttp.send();
});

function sohbetBalonuOlustur(mesaj,mesajTarih,mesajTaraf){
    const para1 = document.createElement("div");
    para1.classList.add("sohbet-mesaj");
    para1.classList.add(mesajTaraf);//kullanici-taraf-mesaj , karsi-taraf-mesaj
    
    const para2 = document.createElement("span");
    para2.classList.add("sohbet-mesaj-span");
    para2.innerText = mesaj;
    
    const para3 = document.createElement("span");
    para3.classList.add("mesaj-tarih-span");
    para3.innerText = mesajTarih;

    para1.appendChild(para2);
    para1.appendChild(para3);
    mesajlarContainer.appendChild(para1);
}

function sohbetBalonlariTemizle(){
    var mesajlar = document.getElementsByClassName("sohbet-mesaj");
    if(mesajlar.length > 0)
    {
        for(var i=mesajlar.length-1; i>-1 ;i--)
        {
            mesajlar[i].remove();
        }
    }
}

function getDateTime(){
    var now     = new Date(); 
    var year    = now.getFullYear();
    var month   = now.getMonth()+1; 
    var day     = now.getDate();
    var hour    = now.getHours();
    var minute  = now.getMinutes();
    var second  = now.getSeconds(); 
    if(month.toString().length == 1) {
         month = '0'+month;
    }
    if(day.toString().length == 1) {
         day = '0'+day;
    }   
    if(hour.toString().length == 1) {
         hour = '0'+hour;
    }
    if(minute.toString().length == 1) {
         minute = '0'+minute;
    }
    if(second.toString().length == 1) {
         second = '0'+second;
    }   
    var dateTime = year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;   
     return dateTime;
}

function mesajGonderSunucu(){
    var mesajInput = document.getElementsByName("mesaj-input")[0];
    var mesaj = mesajInput.value;
    if(mesaj.trim().length > 0)
    {
        var xhttp = new XMLHttpRequest;
        var veri = `mesaj=${mesaj}&alici=${karsiTarafKullaniciAdi}`;
        xhttp.onreadystatechange = function(){
            if(xhttp.readyState === 4 && xhttp.status === 200)
            {
                console.log(this.responseText);
                if(this.responseText === "succes")
                {
                    sohbetBalonuOlustur(mesaj,getDateTime(),"kullanici-taraf-mesaj");
                    mesajInput.value = "";
                    scrollbarAyarla(true);
                }
                if(this.responseText === "hata")
                {
                    alert("hata");
                }
            }
        }
        xhttp.open("POST","mesaj-yolla.php");
        xhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");
        xhttp.send(veri);
    }
}

var interval;
function yeniMesajVarmiKontrol(karsiTarafKullaniciAdi){
    interval = setInterval(function(){
        var yazdirilmisMesajSayisi = document.getElementsByClassName("sohbet-mesaj").length;
        var xhttp = new XMLHttpRequest;
        xhttp.onreadystatechange = function(){
            if(xhttp.status === 200 && xhttp.readyState === 4)
            {
                if(this.responseText != "yeni mesaj yok")
                {
                    try {
                        var yeniMesajlarJSON = JSON.parse(this.responseText);
                        var param = scrollbarKonumu();
                        for(var i=0;i<yeniMesajlarJSON.length;i++)
                        {
                            sohbetBalonuOlustur(yeniMesajlarJSON[i]["mesaj"],yeniMesajlarJSON[i]["tarih"],"karsi-taraf-mesaj");
                        }
                        scrollbarAyarla(param);
                        yeniMesajlarJSON = null;
                    } catch (error) {
                        return null;
                    }
                }
            }  
        }  
        xhttp.open("POST","yeni-mesaj-kontrol.php");
        xhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");
        var data = `karsiTarafKullaniciAdi=${karsiTarafKullaniciAdi}&yazdirilmisMesajSayisi=${yazdirilmisMesajSayisi}`;
        xhttp.send(data);
    }, 1000);
}

function scrollbarAyarla(param){
    if(param === true)
    {
        var scrollbarUzunluk = Math.trunc(mesajlarContainer.scrollHeight-mesajlarContainer.clientHeight);
        mesajlarContainer.scrollTo(0,scrollbarUzunluk);
    }
    else
    {
        document.getElementsByClassName("yeni-mesaj-uyari")[0].style.cssText = "display: inline";
    }
}

function scrollbarKonumu(){
    var scrollbarKonum = mesajlarContainer.scrollTop;
    var scrollbarUzunluk = mesajlarContainer.scrollHeight-mesajlarContainer.clientHeight;
    if(scrollbarUzunluk - scrollbarKonum < 10)
    {
        return true;
    }
    else
    {
        return false;
    }
}