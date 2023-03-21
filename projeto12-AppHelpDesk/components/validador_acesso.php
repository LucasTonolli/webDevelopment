<?php
  session_start();
  if (!isset($_SESSION['autenticado']) || $_SESSION['autenticado'] === 'NÃO'):
    header('Location: index.php?login=erro2');
  endif; 

?>