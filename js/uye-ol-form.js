uyeOlForm.addEventListener("click",function(){
    if(event.target.name == "uye-ol-button")
    {
        var kullaniciadi = uyeOlForm.children.kullaniciadi.value;
        var sifre = uyeOlForm.children.sifre.value;
        var eposta = uyeOlForm.children.eposta.value;
        var kontrol;

        if(kullaniciadi.length < 4)
        {
            kontrol = false;
            hataMesajiYazdir("Kullanıcı adı en az 4 karakter olmalı",uyeOlForm)
        }
        if(sifre.length < 8)
        {
            kontrol = false;
            hataMesajiYazdir("Şifre minimum 8 karakter olmalı",uyeOlForm)
        }
        if(eposta.length < 1)
        {
            kontrol = false;
            hataMesajiYazdir("e posta boş olmamalı",uyeOlForm);
        }


        if(kontrol != false)
        {
            var veri = `kullaniciadi=${kullaniciadi}&sifre=${sifre}&eposta=${eposta}`; 
            var xhttp = new XMLHttpRequest;
            
            xhttp.onreadystatechange = function(){
                if(xhttp.readyState === 4 && xhttp.status === 200)
                {
                    document.getElementsByName("uye-ol-button")[0].innerText = "Üye Ol";
                    if(this.responseText === "succes")
                    {
                        sessionKontrol(sayfaDuzenle);
                        kullanici.kullaniciadi = kullaniciadi;
                    }
                    else
                    {
                        hataMesajiYazdir(this.responseText,uyeOlForm);
                    }
                }
                else
                {
                    console.log(xhttp.status);
                    console.log(xhttp.statusText);
                    document.getElementsByName("uye-ol-button")[0].innerText = "Lütfen Bekleyin";
                }
            };

            xhttp.open("POST", "uye-ol.php");
            xhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");
            xhttp.send(veri);
        }
    }
});
