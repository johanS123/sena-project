<?php

require_once __DIR__ . '/utils/index.php';

$observations_entity = new Entity('observations');

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $user = $users_entity
            ->select('id')
            ->where([
                'id' => ':id'
            ])
            ->execute([
                ':id' => $req->id_user
            ])
            ->fetch(PDO::FETCH_OBJ);

        $observations = $observations_entity
            ->select(''/* campos */)
            ->where([
                'id_user' => ':id_user'
            ])
            ->execute([
                ':id_user' => $req->id_user
            ])
            ->fetchAll(PDO::FETCH_OBJ);

        // La respuesta en json aquí

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
}
