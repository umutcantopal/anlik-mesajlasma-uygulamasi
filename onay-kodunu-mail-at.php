<?php
// require "pdo.php";
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';
    function onayKodMailYolla($id,$uyeMail){
        $mail = new PHPMailer();

        $mail->isSMTP();
        $mail->SMTPKeepAlive = true;
        $mail->SMTPAuth = true;
        $mail->SMTPSecure = 'tls'; //ssl

        $mail->Port = 587; //25 , 465 , 587
        $mail->Host = "";//DÜZENLE

        $mail->Username = "";//DÜZENLE
        $mail->Password = "";//DÜZENLE


        $mail->setFrom("");//DÜZENLE
        $mail->addAddress($uyeMail);

        $db = new PDO("mysql:host=localhost;dbname=mesajuygulamadb;charset=utf8", "root", "");//!!!!require pdo.php ile çalışmıyor bunu ekledim
        $query = "SELECT onaykod FROM onaykodlari WHERE uyeid = ".$id;
        $sorgu1 = $db->query($query)->fetch(PDO::FETCH_ASSOC);

        $mail->isHTML(true);
        $mail->Subject = "Onay Mesajı";
        $mail->Body = "<h1>Anlık Mesajlaşma Uygulaması Üyelik Onaylama Kodu</h1>
        <p>".$sorgu1["onaykod"]."</p>";
        $mail->send();
    }
    // $db = null;
?>