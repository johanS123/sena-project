<?php

require_once __DIR__ . '/utils/index.php';

$users_entity = new Entity('users');

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $users_entity->select('*');

        if (property_exists($req, 'id')) {
            $sth = $users_entity
                ->where(['id' => ':id'])
                ->execute([':id' => $req->id]);

            $user = $sth->fetch(PDO::FETCH_OBJ);

            if ($user) {
                end_json($user, 200);
            }
        } else {
            $sth = $users_entity->execute();
            $users = $sth->fetchAll(PDO::FETCH_OBJ);

            if ($users) {
                end_json($users, 200);
            }
        }

        http_response_code(404);
    break;

    case 'POST':
        $schema = [
            'first_name' => ':first_name',
            'last_name' => ':last_name',
            'email' => ':email',
            'password' => ':password',
            'role' => ':role',
            'last_login' => ':last_login'
        ];

        if (property_exists($req, 'id')) {
            $users_entity->update($schema)->where(['id' => $req->id]);
        } else {
            $users_entity->insert($schema);
        }

        $users_entity->execute([
            ':first_name' => $req->first_name,
            ':last_name' =>$req->last_name,
            ':email' => $req->email,
            ':password' => password_hash($req->password, PASSWORD_DEFAULT),
            ':role' => $req->role,
            ':last_login' => date('Y-m-d H:i:s')
        ]);

        http_response_code(201);
    break;

    case 'DELETE':
        $users_entity->delete(['id' => $req->id]);
        http_response_code(204);
    break;
}

