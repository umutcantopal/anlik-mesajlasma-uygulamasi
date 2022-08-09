<?php
    session_start();
    $currentDate = date("Y-m-d H:i:s");

    $mesaj = $_POST["mesaj"];
    $alici = $_POST["alici"];
    require_once("pdo.php");

    try {
        $sorgu1 = $db->prepare("SELECT id FROM uyeler WHERE kullaniciadi = ?");
        $sorgu1->execute(array($alici));
        $sorgu1Fetch = $sorgu1->fetch(PDO::FETCH_ASSOC);
        $karsiTarafId = $sorgu1Fetch["id"];
    } catch (Exception $e) {
        die("hata");
    }

    try {
        $sorgu2 = $db->prepare("INSERT INTO mesajlar (gonderenid,aliciid,mesaj,tarih) VALUES (?,?,?,?)");
        $sorgu2->execute(array($_SESSION["oturum"]["uyeid"], $karsiTarafId, $mesaj, $currentDate));
    } catch (Exception $e) {
        die("hata");
    }

    if($sorgu2)
    {
        echo "succes";
    }
    else
    {
        echo "hata";
    }
?>