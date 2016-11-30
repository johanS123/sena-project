<?php

require_once __DIR__ . '/../api/utils/Entity.php';

$users_entity = new Entity('users');

$admin_info = [
    ':first_name' => 'Johan Stiven',
    ':last_name' => 'Rodríguez Triana',
    ':email' => 'admin@admin.com',
    ':password' => password_hash('123456789', PASSWORD_DEFAULT),
    ':role' => 'administrador'
];

$users_entity
    ->insert([
        'first_name' => ':first_name',
        'last_name' => ':last_name',
        'email' => ':email',
        'password' => ':password',
        'role' => ':role'
    ])
    ->execute($admin_info);
