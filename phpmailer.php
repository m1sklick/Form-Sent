<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('az','phpmailer/language/')
$mail->IsHTML(true);

//Who is going to sent the mail
$mail->setFrom('info@site.com', 'başlığın adı');
//Who is going to reseave the mail
$mail->addAddress('admin@site.com');
//Subject of the email 
$mail->Subject = 'New applicant';

//Body of the mail 
$body = '<h1>Application data</h1>';

$body.='<p><strong>Name: </strong> '.$_POST['name'].'</p>';
$body.='<p><strong>Email: </strong> '.$_POST['email'].'</p>';
$body.='<p><strong>Message: </strong> '.$_POST['message'].'</p>';

$filePath = __DIR__ . "/files/" . $_FILES['image']['name'];

if (copy($_FILES['image']['tmp_name'], $filePath)){
    $fileAttach = $filePath;
    $body.='<p><strong>Attached file: </strong></p>';
    $mail->addAttachment($fileAttach);
}

$mail->Body = $body;

if(!$mail->send()) {
    $message = 'Error occured';
} else {
    $message = 'Message sent';
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);
?>