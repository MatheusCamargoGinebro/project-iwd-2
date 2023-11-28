# project-iwd-2

## A Simple Crud system with html, css, js and php.
> The project-iwd-2 is a CRUD project involving HTML, CSS, Javascript, PHP and MySQL. It works with a login system, which has simple validation of data by Javascript, and database verification with PHP and MySQL.

Would you like to see the demo of the project?
[Click here to see it :)](https://projeto-iwd-2.vercel.app/),

 + [Primary Repository (GitHub)](https://github.com/MatheusCamargoGinebro/project-iwd-2)
 + [Secunday Repository (GitLab)](https://gitlab.com/MatheusCamargoGinebro/project-iwd-2)


### Connecction with database:

> [!IMPORTANT]
> The following file needs to be created/modified for the system to work `./php/connection.php`.

```php
<?php
ini_set("display_errors", 1);
error_reporting(E_ALL);

header('Content-type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$hostname = 'localhost';
$user = 'root';
$password = 'ifsp'; // Senha local :)
$database = 'myDatabase';

$conn = mysqli_connect($hostname, $user, $password, $database);

if (!$conn) {
    die("Conexão falhou: " . mysqli_connect_error());
}
?>

```
