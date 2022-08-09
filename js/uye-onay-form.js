uyeOnayForm.addEventListener("click",function(){
    var xhttp = new XMLHttpRequest;
    if(event.target.name === "onay-kodu-onay-button")
    {
        var onaykodu = document.querySelector("#middle > div.uye-onay-form > input[name=onaykodu]").value;
        if(onaykodu === null || onaykodu === undefined || onaykodu === "")
        {
            hataMesajiYazdir("Onay Kodunu Girmediniz", uyeOnayForm);
        }
        else
        {
            xhttp.onreadystatechange = function(){
                if(xhttp.status === 200 && xhttp.readyState === 4)
                {
                    document.querySelector("#middle > div.uye-onay-form > button[name = onay-kodu-onay-button]").innerText = "Onayla";
                    console.log(this.responseText);
                    if(this.responseText === "succes")
                    {
                        sessionKontrol(sayfaDuzenle);
                    }
                    else if(this.responseText === "Yanlış girdiniz. Tekrar deneyin.")
                    {
                        hataMesajiYazdir("Yanlış girdiniz. Tekrar deneyin.",uyeOnayForm)
                    }
                    else
                    {
                        hataMesajiYazdir("hata",uyeOnayForm);
                    }
                }
                else
                {
                    document.querySelector("#middle > div.uye-onay-form > button[name = onay-kodu-onay-button]").innerText = "Lütfen Bekleyin";
                }
            }
            xhttp.open("GET",`uyelik-onayla.php?kod=${onaykodu}`);
            xhttp.send();
        }
    }
    if(event.target.className === "kod-tekrar-gonder-link")
    {
        xhttp.onreadystatechange = function()
        {
            if(xhttp.status === 200 && xhttp.readyState === 4)
            {
                console.log(this.responseText);
                document.getElementsByClassName("kod-tekrar-gonder-link")[0].innerText = "Onay Kodunu Tekrar Gönder";
                if(this.responseText === "aktif oturum yok")
                {
                    sessionKontrol(sayfaDuzenle);
                }
                else if(this.responseText === "mail yollandı")
                {
                    hataMesajiYazdir("E-posta gönderildi. E-posta adresinizi kontrol edin.",uyeOnayForm)
                }
                else
                {
                    hataMesajiYazdir("Hata oldu, tekrar dene. ",uyeOnayForm)
                }
            }
            else
            {
                document.getElementsByClassName("kod-tekrar-gonder-link")[0].innerText = "Lütfen Bekleyin";
            }
        }
        xhttp.open("GET", "onay-kod-mail-tekrar-at.php");
        xhttp.send();
    }
});