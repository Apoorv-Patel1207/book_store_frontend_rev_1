import { Container, Typography, Button } from "@mui/material"

import Layout from "../components/layout/layout"

const Home = () => (
  <Layout>
    <Container maxWidth='sm' sx={{ textAlign: "center", marginTop: 4 }}>
      <Typography component='h1' gutterBottom variant='h4'>
        Welcome to the Online Bookstore!
      </Typography>
      <Typography variant='body1'>
        Browse through a wide variety of books and find your next great read.
      </Typography>
      <Button
        color='primary'
        href='/'
        sx={{ marginTop: 2, bgcolor: "#001F3F" }}
        variant='contained'
      >
        Browse Books
      </Button>
    </Container>
  </Layout>
)

export default Home
