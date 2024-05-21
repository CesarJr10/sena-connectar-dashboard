import { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, IconButton, TextField, Button, Box, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch('https://api-proyecto-sena-connect-ar-production.up.railway.app/users/all-users');
    const data = await response.json();
    setUsers(data);
    console.log(data);
    console.log('si sirve');
  };

  const handleDelete = async (id) => {
    await fetch(`https://api-proyecto-sena-connect-ar-production.up.railway.app/users/delete/${id}`, {
      method: 'DELETE',
    });
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setNombre(user.nombre || "");
    setApellido(user.apellido || "");
    
    setEmail(user.email || "");
  };

  const handleUpdate = async (event) => {
    event.preventDefault(); // Evitar la recarga automática de la página
    try {
      const updatedUser = { ...editingUser, nombre, apellido, email };
      const response = await fetch(`https://api-proyecto-sena-connect-ar-production.up.railway.app/users/update/${updatedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });
      
      setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
      setEditingUser(null);
      setNombre("");
      setApellido("");
      setEmail("");
      const data = await response.json();
      console.log('respuesta del server:', data); // Imprimir la respuesta del servidor en la consola
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      // Manejar el error de forma adecuada, por ejemplo, mostrando un mensaje al usuario
    }
  };
  

  return (
    <div>
      <List dense sx={{ width: '100%' }}>
        {users.map((user) => (
          <ListItem key={user.id}>
            <ListItemText
              primary={user.nombre}
              secondary={user.email}
            />
            <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(user)}>
              <EditIcon />
            </IconButton>
            <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(user.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      {editingUser && (
        <Box component="form" onSubmit={handleUpdate} sx={{ mb: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="nombre"
                label="Nombre"
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
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            {/* Resto de los campos del formulario */}
          </Grid>
          <Button type="submit" variant="contained" color="primary">
            Guardar Cambios
          </Button>
         
        </Box>
      )}
    </div>
  );
};

export default UserList;
