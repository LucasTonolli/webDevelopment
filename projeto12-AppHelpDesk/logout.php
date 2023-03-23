<?php 
    require_once 'components/validador_acesso.php';

    session_destroy();

    header('Location:index.php');
