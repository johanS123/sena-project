<?php

require_once __DIR__ . '/../api/utils/index.php';
require_once __DIR__ . '/../vendor/autoload.php';

class PDF extends FPDF{
    //Cabecera de pagina
    function header()
    {
        //logo
        $this->Image('../assets/img/logo.jpg',10, 8,33);
        $this->SetFont('Times','B',16);
        $this->cell(110);
        $this->cell(60,10,'Administrador de Instituciones Educativas',0,0,'C');
        $this->cell(60);
        $this->cell(60,10,'Fecha:'.date('d-m-Y'),0);
        $this->Ln(20);
    }
    //pie de pagina
    function Footer()
    {
        $this->SetY(-15);
        $this->SetFont('Times','I',8);
        $this->cell(0,10,'page'.$this->PageNo().'/{nb}',0,0,'C');
    }
}

$sthCurso = $db->prepare('SELECT start_date,name FROM courses WHERE id= :Id_course');
$sthCurso->execute([
    ':Id_course'=>$_GET['id_course']
]);
$course= $sthCurso->fetch(PDO::FETCH_OBJ);

$sthAsistencias = $db->prepare('SELECT first_name,last_name,arrival_time,attended FROM users,attendances WHERE attendances.id_user=users.id and attendances.id_course=:Id_course');
$sthAsistencias->execute([
    ':Id_course'=>$_GET['id_course']
]);
$attendances= $sthAsistencias->fetchALL(PDO::FETCH_OBJ);

$pdf = new PDF('p','mm','A3');
$pdf->AliasNbPages();
$pdf->AddPage();
$pdf->SetFont('Times','B',16);
$pdf->cell(100);
$pdf->cell(40,20,'Asistencia del Curso '.$course->name,0,'C');
$pdf->Ln();
$pdf->SetFont('Times','I',14);
$pdf->SetX(70);
$pdf->cell(50, 10, 'Fecha de inicio: '.$course->start_date,0,'C');
$pdf->Ln();
$pdf->SetFont('Times','B',12);
$pdf->SetFillColor(116,202,235);
$pdf->SetTextColor(255,255,255);
$pdf->SetX(70);
$pdf->cell(40,10,'Nombres',1,0,'C',1);
$pdf->cell(40,10,'Apellidos',1,0,'C',1);
$pdf->cell(50,10,'Hora de llegada',1,0,'C',1);
$pdf->cell(30,10,'Asistencia',1,0,'C',1);
$pdf->Ln();

foreach ($attendances as $observation) {
    $pdf->SetFont('Times','',12);
    $pdf->SetFillColor(248,255,253);
    $pdf->SetTextColor(1,1,1);
    $pdf->SetX(70);
    $pdf->cell(40, 10, $observation->first_name, 1,0,'C',1);
    $pdf->cell(40, 10, $observation->last_name, 1,0,'C',1);
    $pdf->cell(50, 10, $observation->arrival_time, 1,0,'C',1);
    if ($observation->attended==1) {
        $pdf->SetFillColor(57,203,142);
        $pdf->cell(30, 10, utf8_decode('Asistió'), 1,0,'C',1);
    }elseif($observation->attended==null){
        $pdf->SetFillColor(232,232,232);
        $pdf->cell(30, 10, 'Sin registrar', 1,0,'C',1);
    }else{
        $pdf->SetFillColor(250,99,99);
        $pdf->cell(30, 10, utf8_decode('Falló'), 1,0,'C',1);
    }
    $pdf->Ln();
}


$pdf->Output();
