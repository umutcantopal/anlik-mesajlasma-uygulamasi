<?php
    session_start();
    if(isset($_SESSION["oturum"])){
        echo "true";
    }
    else{
        echo "false";
    }
?>