<?php
    session_start();

    require_once "pdo.php";
    $db->exec("SET NAMES 'utf8'; SET CHARSET 'utf8'");
    $aktifSessionUyeId = $_SESSION["oturum"]["uyeid"];
    
    try {
        $sorgu1 = $db->prepare("SELECT id FROM uyeler WHERE kullaniciadi = ?");
        $sorgu1->execute(array($_POST["value"]));
        $sorgu1Fetch = $sorgu1->fetch(PDO::FETCH_ASSOC);
        $karsiTarafId = $sorgu1Fetch["id"];
    } catch (Exception $e) {
        die("hata");
    }

    $sorgu2 = $db->prepare("SELECT * FROM mesajlar WHERE (gonderenid = ? AND aliciid = ?) OR (gonderenid = ? AND aliciid = ?)");
    $sorgu2->execute(array($aktifSessionUyeId,$karsiTarafId,$karsiTarafId,$aktifSessionUyeId));
    $sorgu2Fetch = $sorgu2->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($sorgu2Fetch);
?>