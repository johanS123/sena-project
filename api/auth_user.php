<?php

require_once __DIR__ . '/utils/index.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $users_entity = new Entity('users');
    $sth = $users_entity
        ->select('*')
        ->where(['email' => $users_entity->quote($req->email)])
        ->execute();

    $user = $sth->fetch(PDO::FETCH_OBJ);

    $res = ['authenticated' => false];

    if ($user && password_verify($req->password, $user->password)) {
        unset($user->password);
        $res['authenticated'] = true;
        $res['user'] = $user;
    }

    end_json($res, 200);
}
