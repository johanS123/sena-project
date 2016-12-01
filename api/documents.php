<?php

require_once __DIR__ . '/utils/index.php';

$documents_entity = new Entity('documents');

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $sth = $documents_entity
            ->select('*')
            ->where([
                'id_request' => ':id_request'
            ])
            ->execute([
                ':id_request' => $_GET['id_request']
            ]);

        $documents = $sth->fetchAll(PDO::FETCH_ASSOC);

        if ($documents) {
            end_json($documents, 200);
        }
    break;

    case 'POST':
        $documentName = basename($_FILES['document']['name']);
        $uploadDocument = '../documents/' . $documentName;

        if (move_uploaded_file($_FILES['document']['tmp_name'], $uploadDocument)) {
            $documents_entity->insert([
                'name' => ':name',
                'url' => ':url',
                'type' => ':type',
                'id_request' => ':id_request'
            ])->execute([
                ':name' => $_POST['name'],
                ':url' => 'documents/' . $documentName,
                ':type' => $_POST['type'],
                ':id_request' => $_POST['id_request']
            ]);
        }
    break;
}
