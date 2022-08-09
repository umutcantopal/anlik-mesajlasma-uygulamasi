<?php
    // sleep(1);
    $kullaniciadi = strtolower($_POST["kullaniciadi"]);
    $sifre = hash('sha256', $_POST["sifre"]);
    $eposta = $_POST["eposta"];

    require_once("pdo.php");
    $sorgu1 = $db->prepare("SELECT * FROM uyeler WHERE kullaniciadi = ?");//kullanıcı adı kontrolü
    $sorgu1->execute(array($kullaniciadi));

    if($sorgu1->rowCount() === 0)
    {
        $sorgu2 = $db->prepare("SELECT * FROM uyeler WHERE eposta = ?");//eposta kontrolü
        $sorgu2->execute(array($eposta));
        if($sorgu2->rowCount() === 0)
        {
            $sorgu3 = $db->prepare("INSERT INTO uyeler(kullaniciadi, sifre, eposta, uyelikdurumu) VALUES (?, ?, ?, 0)");
            $sorgu3->execute(array($kullaniciadi,$sifre,$eposta));

            if($sorgu3->rowCount())
            {
                $sonEklenenId = $db->lastInsertId();
                $onayKod = rand(10000,99999);
                $sorgu4 = $db->prepare("INSERT INTO onaykodlari(uyeid,onaykod) VALUES(?, ?)");
                $sorgu4->execute(array($sonEklenenId,$onayKod));

                require_once("onay-kodunu-mail-at.php");
                onayKodMailYolla($sonEklenenId,$eposta);

                session_start();
                $_SESSION["oturum"] = array("uyeid" => $sonEklenenId, "kullaniciadi" => $kullaniciadi);
                echo "succes";
            }
            else
            {
                echo "Üyelik oluştururken hata oldu. Tekrar deneyin.";
            }
        }
        else
        {
            echo "Bu  eposta adresi daha önceden kullanılmış";
        }
    }
    else
    {
        echo "Kullanıcı adı daha önceden alınmış";
    }

    // $db = null;
?>