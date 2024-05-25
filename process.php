<?php
// Datos de conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "registro_usuarios";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtener datos del formulario
$nombre = $_POST['name'];
$correo = $_POST['email'];
$sexo = $_POST['gender'];
$acepto_terminos = isset($_POST['terms']) ? 1 : 0;

// Preparar y ejecutar la consulta SQL
$sql = "INSERT INTO usuarios (nombre, correo, sexo, acepto_terminos)
        VALUES ('$nombre', '$correo', '$sexo', '$acepto_terminos')";

if ($conn->query($sql) === TRUE) {
    echo "Registro exitoso";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Cerrar conexión
$conn->close();
?>
