<?php

require_once __DIR__ . '/utils/index.php';

$history_entity = new Entity('history');

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $sth = $history_entity
            ->select('action, datetime, id_user')
            ->where(['id_user' => ':id_user'])
            ->execute([':id_user' => $_GET['id_user']]);

        $history = $sth->fetchAll(PDO::FETCH_ASSOC);

        if ($history) {
            end_json($history, 200);
        }
    break;

    case 'POST':
        $history_entity
            ->insert([
                'action' => ':action',
                'datetime' => ':datetime',
                'id_user' => ':id_user'
            ])
            ->execute([
                ':action' => $req->action,
                ':datetime' => date('Y-m-d H:i:s'),
                ':id_user' => $req->id_user
            ]);
    break;
}
