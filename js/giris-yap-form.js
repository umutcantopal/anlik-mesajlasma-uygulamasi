girisYapForm.addEventListener("click",function(){
    if(event.target.name === "giris-yap-button")
    {
        var kullaniciadi = document.querySelector("#middle > div.giris-yap-form > input[name='kullaniciadi']").value;
        var sifre = document.querySelector("#middle > div.giris-yap-form > input[name='sifre']").value;

        if(kullaniciadi.length < 1 || sifre.length < 1)
        {
            hataMesajiYazdir("Kullanıcı adı ve şifre boş bırakılmamalı", girisYapForm);
        }
        else
        {
            var veri = `kullaniciadi=${kullaniciadi}&sifre=${sifre}`; 
            var xhttp = new XMLHttpRequest;

            xhttp.onreadystatechange = function(){
                if(xhttp.status === 200 && xhttp.readyState === 4)
                {
                    document.querySelector("#middle > div.giris-yap-form > button[name='giris-yap-button']").innerText = "Giriş Yap";
                    if(this.responseText === "aktif oturum var")
                    {
                        kullanici.kullaniciadi = kullaniciadi;
                        sessionKontrol(sayfaDuzenle);
                        console.log(this.responseText);
                    }
                    else if(this.responseText === "üye bulunamadı")
                    {
                        hataMesajiYazdir("Bu kullanıcı adıyla kayıtlı bir üye bulunamadı", girisYapForm);
                    }
                    else if(this.responseText === "şifre yanlış")
                    {
                        hataMesajiYazdir("Yanlış şifre girildi", girisYapForm);
                    }
                    else if(this.responseText === "succes")
                    {
                        kullanici.kullaniciadi = kullaniciadi;
                        sessionKontrol(sayfaDuzenle);
                    }
                    else
                    {
                        hataMesajiYazdir("hata",uyeOlForm);
                    }
                }
                else
                {
                    document.querySelector("#middle > div.giris-yap-form > button[name='giris-yap-button']").innerText = "Lütfen Bekleyin";
                }
            }

            xhttp.open("POST","giris-yap.php");
            xhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");
            xhttp.send(veri);
        }
    }
});