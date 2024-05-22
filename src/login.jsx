import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Alert } from "@mui/material";
function LoginForm() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://api-proyecto-sena-connect-ar-production.up.railway.app/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ correo, contrasena }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const responseData = await response.json();
      console.log("Respuesta del servidor:", responseData);
      console.log("Si sirve");
      navigate("/index");

      // Aquí podrías manejar la respuesta del servidor, por ejemplo, guardar el token de sesión en el localStorage
    } catch (error) {
      console.error(
        "Error al iniciar sesión:",
        error.message,
        correo,
        contrasena
      );
      setError("Credenciales incorrectas. Por favor, inténtalo de nuevo."); // Mensaje de error personalizado, podrías manejar diferentes tipos de errores aquí
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        justifyContent: "center", // Centrar horizontalmente
        alignItems: "center", // Centrar verticalmente
        height: "100vh", // Ajusta la altura al 100% del viewport
      }}
    >
      <Box>
        <Typography
          component="h1"
          variant="h5"
          sx={{
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Inicio de Sesión
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="Correo"
            label="Correo"
            name="correo"
            autoComplete="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="contrasena"
            label="Contraseña"
            type="password"
            id="contrasena"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button type="submit" fullWidth variant="contained">
            Iniciar Sesión
          </Button>
          <Grid container>
            <Grid item xs>
              {/* <Link to={"#"} >
                  Olvidaste contraseña?
                </Link> */}
            </Grid>
            <Grid item sx={{ mt: 2, mb:3}}>
              <Link to={"/registrar"}>
                No tienes una cuenta ¿Desea registrarse?
              </Link>
            </Grid>
          </Grid>
          {error && (
            <Alert severity="warning" onClose={() => setError(null)}>
              {error}
            </Alert>
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default LoginForm;
