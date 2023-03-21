<?php 
    require_once 'components/validador_acesso.php';
    var_dump($_SESSION);

    session_destroy();

    header('Location:index.php');
