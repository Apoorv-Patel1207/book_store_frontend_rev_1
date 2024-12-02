import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    // primary: {
    //   main: "#001F3F", // Blackish Blue
    //   light: "#EAD8B1", // Creme
    //   dark: "#3A6D8C", // Navy Blue
    //   contrastText: "#6A9AB0", // Light Blue
    // },
    // secondary: {
    //   main: "#24e087",
    //   light: "#6dffb7",
    //   dark: "#00ad59",
    //   contrastText: "#ffffff",
    // },
  },
  typography: {
    fontFamily: "Lato, Arial, sans-serif",
  },
  // components: {
  //   MuiButton: {
  //     defaultProps: {
  //       variant: "contained",
  //       color: "primary",
  //     },

  //     styleOverrides: {
  //       root: {
  //         textTransform: "none",
  //         fontWeight: "bold",
  //       },
  //       contained: {
  //         backgroundColor: "#001F3F",
  //         color: "#EAD8B1",
  //         // "&:hover": {
  //         //   backgroundColor: "#B45309",
  //         // },
  //       },
  //     },
  //   },

  //   MuiDrawer: {
  //     styleOverrides: {
  //       paper: {
  //         backgroundColor: "#F3F4F6",
  //       },
  //     },
  //   },
  //   MuiTypography: {
  //     styleOverrides: {
  //       h4: {
  //         fontWeight: 700,
  //         color: "#1F2937",
  //       },
  //     },
  //   },
  // },
});

export default theme;
