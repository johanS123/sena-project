<?php

require_once __DIR__ . '/../api/utils/index.php';
require_once __DIR__ . '/../vendor/autoload.php';

class PDF extends FPDF{
    //Cabecera de pagina
    function header()
    {
        //logo
        $this->Image('../assets/img/logo.jpg',10, 8,33);
        $this->SetFont('Times','B',14);
        $this->cell(60);
        $this->cell(60,10,'Administrador de Instituciones Educativas',0,0,'C');
        $this->cell(30);
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

$observaciones = $db->query('SELECT o.id,o.type,o.description,o.date,o.tracing,u.first_name,u.last_name FROM users u,observations o WHERE o.id_user=u.id');
$observations = $observaciones->fetchALL(PDO::FETCH_OBJ);

$pdf = new PDF('P','mm','Letter');
$pdf->AliasNbPages();
$pdf->AddPage();
$pdf->SetFont('Times','B',16);
$pdf->cell(80);
$pdf->cell(40,20,'Observaciones',0,'C');
$pdf->Ln(20);



foreach ($observations as $observation) {
    $pdf->SetFont('Times','B',12);
    //$pdf->SetFillColor(248,255,253);
    //$pdf->SetTextColor(1,1,1);
    $pdf->SetX(20);
    $pdf->cell(10,0,'ID',0,'L');
    $pdf->SetX(20);
    $pdf->SetFont('Times','',12);
    $pdf->cell(10, 10, $observation->id, 0,0,'L');
    $pdf->SetFont('Times','B',12);
    $pdf->cell(30,0,'Tipo',0,0,'L');
    $pdf->SetX(30);
    $pdf->SetFont('Times','',12);
    $pdf->cell(30, 10, $observation->type, 0,0,'L');
    $pdf->SetFont('Times','B',12);
    $pdf->cell(30,0,'Fecha',0,0,'L');
    $pdf->SetFont('Times','',12);
    $pdf->Setx(60);
    $pdf->cell(30, 10, $observation->date, 0,'L');
    $pdf->SetFont('Times','B',12);
    $pdf->cell(80,0,'Estudiante',0,0,'L');
    $pdf->SetFont('Times','',12);
    $pdf->Setx(90);
    $pdf->cell(80, 10, $observation->first_name." ".$observation->last_name, 0,0,'L');
    $pdf->Ln();
    $pdf->SetX(20);
    $pdf->SetFont('Times','B',12);
    $pdf->cell(100,10,utf8_decode('Observación'),0,0,'L');
    $pdf->Ln();
    $pdf->SetFont('Times','',12);
    $pdf->SetX(20);
    $pdf->Multicell(100, 5,utf8_decode($observation->description),0,'L');
    $pdf->SetX(20);
    $pdf->SetFont('Times','B',12);
    $pdf->cell(70,10,'Seguimiento',0,0,'L');
    $pdf->Ln();
    $pdf->SetX(20);
    $pdf->SetFont('Times','',12);
    $pdf->Multicell(80, 10,utf8_decode($observation->tracing), 0,'L');

    $pdf->Ln();
}
$pdf->Output();
