<?php
    session_start();
    
    $autenticacao = false;
    $userId = null;
    $userRoleId = null;
    $role = [
        1 => 'admin',
        2 => 'user'
    ];

    $usuarios = [
        [
            'email' => 'adm@teste.com.br',
            'senha' => '123',
            'id'    => 1,
            'role'  => 1
        ],
        [
            'email' => 'user@teste.com.br',
            'senha' => '567',
            'id'    =>  2,
            'role'  => 1
        ],
        [
            'email' => 'jose@teste.com.br',
            'senha' => '567',
            'id'    =>  3,
            'role'  => 2
        ],
        [
            'email' => 'maria@teste.com.br',
            'senha' => '567',
            'id'    => 4,
            'role'  => 2
        ]
        
    ];

    foreach ($usuarios as $usuario):
        if ($usuario['email'] === $_POST['email'] && $usuario['senha'] === $_POST['senha']):
            $autenticacao = true;
            $userId = $usuario['id'];
            $userRoleId = $usuario['role'];
            break;
        endif;
    endforeach;


    if ($autenticacao) :
        $_SESSION['autenticado'] = 'SIM';
        $_SESSION['userId'] = $userId;
        $_SESSION['role'] = $userRoleId;
        header('Location: home.php');

    else:
        $_SESSION['autenticado'] = 'NÃO';
        header('Location: index.php?login=erro');
    endif;

    