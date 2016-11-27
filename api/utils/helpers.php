<?php

function end_json($content, $status_code) {
    header('Content-Type: application/json');
    http_response_code($status_code);
    echo json_encode($content);
    exit;
}

function get_input () {
    $data = file_get_contents('php://input');
    return json_decode(empty($data) ? '{}' : $data);
}

$req = get_input();
