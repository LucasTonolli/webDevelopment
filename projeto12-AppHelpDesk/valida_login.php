<?php
    session_start();
    
    $autenticacao = false;
    $usuarios = [
        [
            'email' => 'adm@teste.com.br',
            'senha' => '123'
        ],
        [
            'email' => 'user@teste.com.br',
            'senha' => '567'
        ],
        
    ];

    foreach ($usuarios as $usuario):
        if ($usuario['email'] === $_POST['email'] && $usuario['senha'] === $_POST['senha']):
            $autenticacao = true;
        endif;
    endforeach;


    if ($autenticacao) :
        $_SESSION['autenticado'] = 'SIM';
    print_r($_SESSION);
        header('Location: home.php');

    else:
        $_SESSION['autenticado'] = 'NÃO';
        header('Location: index.php?login=erro');
    endif;

    