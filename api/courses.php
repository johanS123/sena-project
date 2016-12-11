<?php

require_once __DIR__ . '/utils/index.php';

$courses_entity = new Entity('courses');

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $sth = $courses_entity->select('*')->execute();
        $user = $sth->fetchAll(PDO::FETCH_ASSOC);

        if ($user) {
            end_json($user, 200);
        }
    break;

    case 'POST':
        $courses_entity->insert([
            'name' => ':name',
            'start_date' => ':start_date'
        ])->execute([
            ':name' => $req->name,
            ':start_date' => date('Y-m-d H:i:s', strtotime($req->start_date))
        ]);
    break;
}
