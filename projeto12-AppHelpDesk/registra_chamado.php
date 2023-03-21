<?php

    $file = fopen('chamados.txt', 'a');

    $text = implode(' ', $_POST);
    $text .= PHP_EOL;

    fwrite($file, $text);

    fclose($file);

    header('Location: abrir_chamado.php');
?>




