import { useState } from "react";

import {
  Box,
  Button,
  Typography,
  Drawer,
  Paper,
  Container,
  Divider,
} from "@mui/material";

const ThemeDemo = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <Container sx={{ padding: 4 }}>
      <Typography gutterBottom textAlign="center" variant="h4">
        Themed Bookstore Elements
      </Typography>

      <Typography variant="body1">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus dicta
        iusto aspernatur architecto odio doloremque quod vel, dolor, provident
        aliquam blanditiis asperiores quos, quia exercitationem ad nihil?
        Aliquam, veritatis blanditiis?
      </Typography>

      <Divider sx={{ marginY: 2 }} />

      {/* Primary Button */}
      <Box display="flex" justifyContent="center" marginBottom={2}>
        <Button
          sx={{
            color: "primary.contrastText",
          }}

        >
          Primary Button
        </Button>
      </Box>

      {/* Secondary Button */}
      <Box display="flex" justifyContent="center" marginBottom={2}>
        <Button color="secondary" variant="contained">
          Secondary Button
        </Button>
      </Box>

      {/* Drawer Toggle Button */}
      <Box display="flex" justifyContent="center" marginBottom={2}>
        <Button onClick={toggleDrawer(true)} variant="contained">
          Open Themed Drawer
        </Button>
      </Box>

      {/* Themed Drawer */}
      <Drawer anchor="right" onClose={toggleDrawer(false)} open={drawerOpen}>
        <Box
          sx={{
            width: 250,
            padding: 2,
          }}
        >
          <Typography color="primary" gutterBottom variant="h4">
            Filter Options
          </Typography>
          <Typography color="text.secondary" paragraph variant="body1">
            Customize your book search with the options below.
          </Typography>
          <Divider sx={{ marginBottom: 2 }} />
          <Button color="primary" fullWidth variant="contained">
            Apply Filters
          </Button>
        </Box>
      </Drawer>

      {/* Example Card or Paper */}
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          backgroundColor: "background.paper",
          marginTop: 2,
        }}
      >
        <Typography color="primary" gutterBottom variant="h6">
          Themed Card
        </Typography>
        <Typography color="text.secondary" variant="body1">
          This is an example of a card or Paper component styled according to
          the theme. It has a white background and uses custom typography and
          text colors.
        </Typography>
      </Paper>
    </Container>
  );
};

export default ThemeDemo;
