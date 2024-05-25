<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "registro_usuarios";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$nombre = $_POST['name'];
$correo = $_POST['email'];
$sexo = $_POST['gender'];
$acepto_terminos = isset($_POST['terms']) ? 1 : 0;

$sql = "INSERT INTO usuarios (nombre, correo, sexo, acepto_terminos)
        VALUES ('$nombre', '$correo', '$sexo', '$acepto_terminos')";

if ($conn->query($sql) === TRUE) {
    echo "Registro exitoso";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
