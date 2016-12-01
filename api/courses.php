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
            'date_due' => ':date_due'
        ])->execute([
            ':name' => $req->name,
            ':date_due' => date('Y-m-d H:i:s', strtotime($req->date_due))
        ]);
    break;
}
