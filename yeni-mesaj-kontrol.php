<?php
    require_once("pdo.php");
    session_start();
    $yazdirilmisMesajSayisi = $_POST["yazdirilmisMesajSayisi"];
    $karsiTarafKullaniciAdi = $_POST["karsiTarafKullaniciAdi"];
    $kullaniciid = $_SESSION["oturum"]["uyeid"];

    try {
        $sorgu1 = $db->prepare("SELECT id FROM uyeler WHERE kullaniciadi = ?");
        $sorgu1->execute(array($karsiTarafKullaniciAdi));
        $sorgu1Fetch = $sorgu1->fetch(PDO::FETCH_ASSOC);
        $karsiTarafKullaniciId = $sorgu1Fetch["id"];
        if(!isset($karsiTarafKullaniciId))
        {
            die("hata");
        }
    } catch (Exception $e) {
        die("hata");
    }

    try{
        $sorgu2 = $db->prepare("SELECT count(*) FROM mesajlar WHERE (gonderenid = ? AND aliciid = ?) OR (gonderenid = ? AND aliciid = ?)");
        $sorgu2->execute(array($karsiTarafKullaniciId,$kullaniciid,$kullaniciid,$karsiTarafKullaniciId));
        $dbMesajSayisi = $sorgu2->fetchColumn();
    } catch (Exception $e) {
        die("hata");
    }

    if($dbMesajSayisi > $yazdirilmisMesajSayisi)
    {
        $val = $dbMesajSayisi - $yazdirilmisMesajSayisi;
        $db->setAttribute(PDO::ATTR_EMULATE_PREPARES, FALSE);
        $sorgu3 = $db->prepare("SELECT * FROM mesajlar WHERE (gonderenid = ? AND aliciid = ?) OR (gonderenid = ? AND aliciid = ?) LIMIT ?,?");
        $sorgu3->execute(array($karsiTarafKullaniciId,$kullaniciid,$kullaniciid,$karsiTarafKullaniciId,$yazdirilmisMesajSayisi,$val));
        $sorgu3Fetch = $sorgu3->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($sorgu3Fetch);
    }
    else
    {
        echo "yeni mesaj yok";
    }
?>