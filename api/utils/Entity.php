<?php

class Entity {
    private $_db;
    private $_table;
    private $_sql;

    public function __construct ($table) {
        $options = parse_ini_file(__DIR__ . '/../../db_config.ini');

        try {
            $this->_db = new PDO(
                $options['driver'] .
                ":host={$options['host']}" .
                ";port={$options['port']}" .
                ";dbname={$options['name']}",
                $options['user'],
                $options['password']
            );

            $this->_db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo "Error de conexión: {$e->getMessage()}";
            exit;
        }

        $this->_table = $table;
    }

    /**
     * Une los campos dados
     *
     * @param array $fields
     * @param string $delimiter
     *
     * @return string
     *
     * @example
     * $this->joinFields([
     *      'example1' => 'example2',
     *      'example3' => 'example4',
     *      'example5' => 'example6'
     * ], ' AND ')
     *
     * Retorna
     * example1 = example2 AND example3 = example4 AND example5 = example6
     */
    private function joinFields ($fields, $delimiter = ',') {
        $fields_pair = [];

        foreach ($fields as $key => $value) {
            array_push($fields_pair, "{$key} = {$value}");
        }

        return implode($delimiter, $fields_pair);
    }

    // http://php.net/manual/es/pdo.quote.php
    public function quote ($string) {
        return $this->_db->quote($string);
    }

    public function select ($fields) {
        $str_fields = is_string($fields) ? $fields : implode(',', $fields);
        $this->_sql = "SELECT {$str_fields} FROM {$this->_table}";
        return $this;
    }

    public function update ($fields) {
        $this->_sql = "UPDATE {$this->_table} SET {$this->joinFields($fields)}";
        return $this;
    }

    public function insert ($fields) {
        $keys = implode(',', array_keys($fields));
        $values = implode(',', array_values($fields));

        $this->_sql = "INSERT INTO {$this->_table}({$keys}) VALUES ({$values})";
        return $this;
    }

    public function where ($conditions) {
        $this->_sql .= " WHERE {$this->joinFields($conditions, ' AND ')}";
        return $this;
    }

    public function delete ($conditions) {
        $this->_sql = "DELETE FROM {$this->_table}";
        $this->where($conditions)->execute();
        return $this;
    }

    public function execute ($fields = []) {
        $sth = $this->_db->prepare($this->_sql);
        $sth->execute($fields);
        return $sth;
    }
}
