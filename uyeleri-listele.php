<?php
    require_once("pdo.php");
    session_start();

    $sth = $db->prepare('SELECT id,kullaniciadi FROM uyeler
    WHERE kullaniciadi != :kullaniciadi');
    $sth->bindParam(':kullaniciadi', $_SESSION["oturum"]["kullaniciadi"]);
    $sth->execute();

    $sonuc = $sth->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($sonuc);
?>