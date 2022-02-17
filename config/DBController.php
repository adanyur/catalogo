<?php
define('DB_HOST', 'localhost');
define('DB_NAME', 'dbs2162417');//Base de datos
define('DB_USER', 'root');// Usuario de base de datos
define('DB_PASS', ''); // Peruano1.   Contraseña de usuario MySQL

/*define('DB_HOST','db5002714617.hosting-data.io'); 
define('DB_NAME', 'dbs2162417');//Base de datos  
define('DB_USER', 'dbu1684193');// Usuario de base de datos
define('DB_PASS', 'Peruano1.'); // Peruano1.   Contraseña de usuario MySQL*/

try {
	$db = new PDO("mysql:host=".DB_HOST.";dbname=".DB_NAME.";charset=utf8", DB_USER, DB_PASS);
	$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $exception){
	die("Connection error: " . $exception->getMessage());
}

class DBController
{
    private $host = DB_HOST;
    private $user = DB_USER;
    private $password = DB_PASS;
    private $database = DB_NAME;
    private static $conn;


    function __construct(){
        $this->conn = mysqli_connect($this->host, $this->user, $this->password, $this->database);
    }


    public static function getConnection()
    {
        if (empty($this->conn)) {
            new Database();
        }
    }



    function getDBResult($query, $params = array())
    {

        $sql_statement = $this->conn->prepare($query);

        if (!empty($params)) {
            $this->bindParams($sql_statement, $params);
        }

        $sql_statement->execute();
        $result = $sql_statement->get_result(); 


        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $resultset[] = $row;
            }
        }

        if (! empty($resultset)) {
            return $resultset;
        }

    }


    function insertDB($query, $params = array())
    {
        
        $sql_statement = $this->conn->prepare($query);
        if (! empty($params)) {
            $this->bindParams($sql_statement, $params);
        }
        $sql_statement->execute();
        $id = mysqli_insert_id ( $this->conn );
        return $id;
    }

    function insertDB2($query)
    {
        
        $sql_statement = $this->conn->prepare($query);
        $sql_statement->execute();
        return mysqli_insert_id ( $this->conn );
    }

    function updateDB($query, $params = array())
    {
        $sql_statement = $this->conn->prepare($query);
        if (! empty($params)) {
            $this->bindParams($sql_statement, $params);
        }
        $sql_statement->execute();
    }

    
    function deleteDB($query,$params){
        $sql_statement = $this->conn->prepare($query);
        if (! empty($params)) {
            $this->bindParams($sql_statement, $params);
        }
        $sql_statement->execute();
    }


    function bindParams($sql_statement, $params){
        
        $param_type = "";
        foreach ($params as $query_param) {
            $param_type .= $query_param["param_type"];
        }       

        
        $bind_params[] = & $param_type;
        foreach ($params as $k => $query_param) {
            $bind_params[] = & $params[$k]["param_value"];
        }
        
        call_user_func_array(array($sql_statement,'bind_param'), $bind_params);
    }

}

