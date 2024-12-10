import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import { Box, Typography, Button, Container, Stack } from "@mui/material"
import { useNavigate } from "react-router-dom"
import Layout from "src/components/layout/layout"

const NotLoggedIn = () => {
  const navigate = useNavigate()

  return (
    <Layout>
      <Container
        maxWidth='sm'
        sx={{
          textAlign: "center",
          py: 6,
          backgroundColor: "#F9FAFB",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Stack alignItems='center' direction='column' spacing={3}>
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              backgroundColor: "#FFEDED",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LockOutlinedIcon sx={{ fontSize: 40, color: "#F44336" }} />
          </Box>
          <Typography color='text.primary' fontWeight='bold' variant='h4'>
            Access Denied
          </Typography>
          <Typography color='text.secondary' variant='body1'>
            You need to log in to access this page. Please log in or return to
            the catalog.
          </Typography>
          <Button
            color='primary'
            onClick={() => navigate("/")}
            size='large'
            sx={{
              backgroundColor: "#1F2937",
              "&:hover": {
                backgroundColor: "#374151",
              },
            }}
            variant='contained'
          >
            Go Back to Browse Books
          </Button>
        </Stack>
      </Container>
    </Layout>
  )
}

export default NotLoggedIn
