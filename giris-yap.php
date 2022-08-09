<?php
    $kullaniciadi = $_POST["kullaniciadi"];
    $sifre = hash('sha256', $_POST["sifre"]);
    session_start();
    require_once("pdo.php");
    
    if(isset($_SESSION["oturum"]))
    {
        echo "aktif oturum var";
        die();
    }
    else
    {
        $sorgu1 = $db->prepare("SELECT * FROM uyeler WHERE kullaniciadi = ?");
        $sorgu1->execute(array($kullaniciadi));
        if($sorgu1->rowCount() === 0)
        {
            echo "üye bulunamadı";
        }
        else
        {
            $sorgu1Fetch = $sorgu1->fetch(PDO::FETCH_ASSOC);
            if($sifre === $sorgu1Fetch["sifre"])
            {
                $_SESSION["oturum"] = array("uyeid" => $sorgu1Fetch["id"], "kullaniciadi" => $kullaniciadi);
                echo "succes";
            }
            else
            {
                echo "şifre yanlış";
            }
        }
    }
?>