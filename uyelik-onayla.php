<?php
    session_start();
    require_once("pdo.php");
    $id = $_SESSION["oturum"]["uyeid"];
    $onayKoduGirilen = $_GET["kod"];

    $sorgu1 = $db->prepare("SELECT onaykod FROM onaykodlari WHERE uyeid = ?");
    $sorgu1->execute(array($id));
    $sorgu1Fetch = $sorgu1->fetch(PDO::FETCH_ASSOC);
    $onayKod = $sorgu1Fetch["onaykod"];

    if($onayKod === $onayKoduGirilen)
    {
        $sorgu2 = $db->query("UPDATE uyeler SET uyelikdurumu = '1' WHERE id =".$id);
        if($sorgu2)
        {
            $sorgu3 = $db->query("DELETE FROM onaykodlari WHERE uyeid =".$id);
            echo "succes";
        }
        else
        {
            die("hata");
        }
    }
    else
    {
        echo "Yanlış girdiniz. Tekrar deneyin.";
    }
?>