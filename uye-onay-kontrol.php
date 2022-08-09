<?php
    require_once("pdo.php");
    session_start();
    if(!isset($_SESSION["oturum"]))
    {
        echo "aktif oturum yok";
    }
    else
    {
        $kullaniciadi = $_SESSION["oturum"];
        $sorgu = $db->prepare("SELECT uyelikdurumu FROM uyeler WHERE id = ?");
        $sorgu->execute(array($_SESSION["oturum"]["uyeid"]));

        $sorguFetch = $sorgu->fetch(PDO::FETCH_ASSOC);
        echo $sorguFetch["uyelikdurumu"];
    }
    // $db = null;
?>