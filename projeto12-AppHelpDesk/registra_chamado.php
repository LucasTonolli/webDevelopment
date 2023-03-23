<?php
    session_start();

    $file = fopen('chamados.txt', 'a');

    $text = $_SESSION['userId']  . '#' . implode('#', $_POST);
    $text .= PHP_EOL;

    fwrite($file, $text);

    fclose($file);

    header('Location: abrir_chamado.php');
