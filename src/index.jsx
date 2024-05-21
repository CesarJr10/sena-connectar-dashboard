import Container from "@mui/material/Container";
import UserList from "./components/UserList";

function Home() {
  return (
    
      
      <Container
        component="main"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <UserList />
      </Container>
      
      
    
  );
}

export default Home;
