<?php 

require_once 'Email.php';
require_once 'lib/PHPMailer/PHPMailer.php';
require_once 'lib/PHPMailer/Exception.php';
require_once 'lib/PHPMailer/POP3.php';
require_once 'lib/PHPMailer/SMTP.php';

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;

$data = $_POST;

$response = null;

$recipient = isset($data['recipient']) ? filter_var($data['recipient'],  ) : null;
$subject = isset($data['subject']) ? filter_var($data['subject'], FILTER_SANITIZE_STRING) : null;
$message = isset($data['message']) ? filter_var($data['message'], FILTER_SANITIZE_STRING) : null;

$email = new Email();

$email->__set('to', $recipient);
$email->__set('subject', $subject);
$email->__set('message', $message);

if (!$email->isValid()):
    echo 'Mensagem inválida';
    header('Location:index.php');
endif;

$mail = new PHPMailer(true);

try {
    //Server settings
    // $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
    $mail->isSMTP();                                            //Send using SMTP
    $mail->Host       = ' smtp.gmail.com';                     //Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
    $mail->Username   = 'teste@teste.com';                     //SMTP username
    $mail->Password   = 'password';                               //SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;         //Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
    $mail->Port       = 465;                                    //TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above

    //Recipients
    $mail->setFrom('teste@teste.com', 'Teste');
    $mail->addAddress($email->__get('to'));     //Add a recipient

    //Attachments
    // $mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
    // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name

    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = $email->__get('subject');
    $mail->Body    = $email->__get('message');
    
    $mail->send();
    $response = Email::getStatus('success');

} catch (Exception $e) {
    $response = Email::getStatus('fail');
}


?>


<html>
	<head>
		<meta charset="utf-8" />
    	<title>App Mail Send</title>

    	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

	</head>

	<body>

		<div class="container">  
            <div class="py-3 text-center">
				<img class="d-block mx-auto mb-2" src="logo.png" alt="" width="72" height="72">
				<h2>Send Mail</h2>
				<p class="lead">Seu app de envio de e-mails particular!</p>
			</div>
            <div class="row">
                <div class="col-md-12">
                    <?php if ($response['cod'] === 1):?>
                        <div class="container">
                            <h4 class="display-4 text-success">Sucesso</h4>
                            <p><?= $response['description']?></p>
                            <a href="index.php" class="btn btn-success btn-lg mt-4 text-white"> Voltar</a>
                        </div>
                    <?php elseif($response['cod'] === 2):?>
                        <div class="container">
                            <h4 class="display-4 text-danger">Opss</h4>
                            <p><?= $response['description']?></p>
                            <a href="index.php" class="btn btn-danger btn-lg mt-4 text-white"> Voltar</a>
                        </div>
                    <?php endif;?> 
                </div>
            </div>
		</div>

	</body>
</html>