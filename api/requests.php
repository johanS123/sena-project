<?php

require_once __DIR__ . '/utils/index.php';

$requests_entity = new Entity('requests');

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $requests_entity->select('*');

        if (isset($_GET['id_user'])) {
            $sth = $requests_entity->where([
                'id_user' => ':id_user'
            ])->execute([
                ':id_user' => $_GET['id_user']
            ]);
        } else {
           $sth = $requests_entity->execute();
        }

        $requests = $sth->fetchAll(PDO::FETCH_ASSOC);

        if ($requests) {
            end_json($requests, 200);
        }
    break;

    case 'POST':
        $sth = $requests_entity
            ->insert([
                'request' => ':request',
                'date_request' => ':date_request',
                'id_user' => ':id_user'
            ])
            ->execute([
                ':request' => $req->request,
                ':date_request' => date('Y-m-d H:i:s'),
                ':id_user' => $req->id_user
            ]);
    break;
}
