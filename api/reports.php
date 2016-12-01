<?php

require_once __DIR__ . '/utils/index.php';

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $sth = $db->prepare('
            SELECT r.id, r.achievements, u.first_name, u.last_name
            FROM reports r, users u
            WHERE r.id_user = u.id
        ');

        $sth->execute();
        $reports = $sth->fetchAll(PDO::FETCH_ASSOC);

        if ($reports) {
            end_json($reports, 200);
        }
    break;

    case 'POST':
        $reports_entity = new Entity('reports');

        $reports_entity->insert([
            'achievements' => ':achievements',
            'id_user' => ':id_user'
        ])->execute([
            ':achievements' => $req->achievements,
            ':id_user' => $req->id_user
        ]);
    break;
}
