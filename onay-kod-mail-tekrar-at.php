<?php
    // require_once("pdo.php");
    $db = new PDO("mysql:host=localhost;dbname=mesajuygulamadb", "root", "");
    require_once("onay-kodunu-mail-at.php");
    session_start();
    if(isset($_SESSION["oturum"]))
    {
        $id = $_SESSION["oturum"]["uyeid"];
        $sorgu = $db->prepare("SELECT eposta FROM uyeler WHERE id = ?");
        $sorgu->execute(array($id));
        $sorguFetch = $sorgu->fetch(PDO::FETCH_ASSOC);
        $eposta = $sorguFetch["eposta"];

        onayKodMailYolla($id,$eposta);
        echo("mail yollandı");
    }
    else
    {
        echo "aktif oturum yok";
    }
?>