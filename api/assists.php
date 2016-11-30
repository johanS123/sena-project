<?php

require_once __DIR__ . '/utils/index.php';

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $sth = $db->prepare('
            SELECT u.first_name, u.last_name, a.* 
            FROM users u, attendances a
            WHERE a.id_user = u.id AND a.id_course = :id_course
        ');

        $sth->execute([
            ':id_course' => $_GET['id_course']
        ]);

        $attendances = $sth->fetchAll(PDO::FETCH_ASSOC);

        if ($attendances) {
            end_json($attendances, 200);
        }
    break;

    case 'POST':
        if (property_exists($req, 'id')) {
            $sth = $db->prepare('
                UPDATE attendances SET attended = :attended, date_arrived = :date_arrived
                WHERE id = :id
            ');

            $sth->execute([
                ':attended' => $req->attended,
                ':id' => $req->id,
                ':date_arrived' => $req->attended === 1 ? date('Y-m-d H:i:s') : null
            ]);
        } else {
            $sth = $db->prepare('
                INSERT INTO attendances(attended, id_user, id_course)
                VALUES (NULL, :id_user, :id_course)
            ');

            $sth->execute([
                ':id_user' => $req->id_user,
                ':id_course' => $req->id_course
            ]);
        }
    break;
}
