<?php

$options = parse_ini_file(__DIR__ . '/../../db_config.ini');

$db = new PDO(
    $options['driver'] .
    ":host={$options['host']}" .
    ";port={$options['port']}" .
    ";dbname={$options['name']}",
    $options['user'],
    $options['password']
);

$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
