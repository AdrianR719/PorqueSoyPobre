<?php
class Conexion_DB{

	 public $host;
	 public $nameDB;
	 public $user;
	 public $pass;
	 public $conection;


	public function __construct(){
 	 $this->host = "us-cdbr-iron-east-05.cleardb.net";
	 $this->nameDB = "heroku_46ff7a27d07dfc1";
	 $this->user = "b5bf3a024a7a60";
	 $this->pass = "5854df3";
	}

	public function connect(){
		$this->conection = mysqli_connect($this->host, $this->user, $this->pass, $this->nameDB) or die($this->conection);

	} 

	public function query($query){
		$result = mysqli_query($this->conection,$query) or die($this->conection->error);
		$this->conection->store_result();
		return $result;
	}

	public function close(){
		mysqli_close($this->conection);
	}

	public function free(){
		do {
         if ($res = $this->conection->store_result()) {
           $res->free();
         }
        } while ($this->conection->more_results() && $this->conection->next_result()); 
	}
}

 ?>