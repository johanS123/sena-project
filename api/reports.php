<?php

require_once __DIR__ . '/utils/index.php';

$reports_entity = new Entity('reports_academics');

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $sth = $reports_entity->select('*')->execute();
        $reports = $sth->fetchAll(PDO::FETCH_ASSOC);

        if ($reports) {
            end_json($reports, 200);
        }
    break;

    case 'POST':
        $reports_entity->insert([
            'achievements' => ':achievements',
            'id_user' => ':id_user'
        ])->execute([
            ':achievements' => $req->achivements,
            ':id_user' => $req->id_user
        ]);
    break;
}
