<?php

require_once __DIR__ . '/utils/index.php';

$observations_entity = new Entity('observations');

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $sth = $db->query('
            SELECT u.first_name, u.last_name, o.* 
            FROM users u, observations o
            WHERE o.id_user = u.id
        ');

        $observations = $sth->fetchAll(PDO::FETCH_ASSOC);

        if ($observations) {
            end_json($observations, 200);
        }
        break;
    case 'POST':
        $observations_entity->insert([
            'type' => ':type',
            'description' => ':description',
            'date' => ':date',
            'tracing' => ':tracing',
            'id_user' => ':id_user'
        ])->execute([
            ':type' => $req->type,
            ':description' => $req->description,
            ':date' => date('Y-m-d'),
            ':tracing' => $req->tracing,
            ':id_user' => $req->id_user
        ]);
    break;

    case 'DELETE':
        $observations_entity->delete([
            'id' => $req->id
        ]);

        http_response_code(204);
    break;
}
