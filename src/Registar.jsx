import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

function RegisterForm() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [direccion, setDireccion] = useState("");
  const [barrio, setBarrio] = useState("");
  const [genero, setGenero] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const rol = null;
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://api-proyecto-sena-connect-ar-production.up.railway.app/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre,
            apellido,
            correo,
            telefono,
            contrasena,
            direccion,
            ciudad,
            departamento,
            barrio,
            genero,
            rol,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const responseData = await response.json();
      console.log("Respuesta del servidor:", responseData);
      console.log("Si sirve");
      setSuccess("Usuario registrado exitosamente.");
      
      setTimeout(() => {
        navigate("/login");
      }, 3000);

      // Aquí podrías manejar la respuesta del servidor, por ejemplo, guardar el token de sesión en el localStorage
    } catch (error) {
      console.error("Error al registrar", error.message);
      setError("Hubo un problema al registrar. Por favor, inténtalo de nuevo."); // Mensaje de error personalizado, podrías manejar diferentes tipos de errores aquí
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
        }}
      >
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Typography component="h1" variant="h5"
            sx={{
              textAlign: 'center',
              marginBottom: '20px',

            }}
          >
            Registro de Usuarios
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="nombre"
                required
                fullWidth
                id="nombre"
                label="Nombre"
                autoFocus
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="apellido"
                label="Apellido"
                name="apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="correo"
                label="Correo Electronico"
                name="correo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="telefono"
                label="Telefono"
                name="telefono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="departamento"
                label="Departamento"
                name="departamento"
                value={departamento}
                onChange={(e) => setDepartamento(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="ciudad"
                label="Ciudad"
                name="ciudad"
                value={ciudad}
                onChange={(e) => setCiudad(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="barrio"
                label="Barrio"
                name="barrio"
                value={barrio}
                onChange={(e) => setBarrio(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="direccion"
                label="Direccion"
                name="direccion"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="genero"
                label="Genero"
                name="genero"
                value={genero}
                onChange={(e) => setGenero(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="contrasena"
                label="Contraseña"
                type="password"
                id="contrasena"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Registrarme
          </Button>
          {error && (
            <Alert severity="warning" onClose={() => setError(null)}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" onClose={() => setSuccess(null)}>
            {success}
          </Alert>
          )}
          <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
            <Grid item>
              <Link to={"/login"}>¿Ya tienes una cuenta? Iniciar Sesion</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default RegisterForm;
