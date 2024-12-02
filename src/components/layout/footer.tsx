import { Box, Link, Typography, Stack } from "@mui/material";

const Footer = () => (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#1F2937",
        color: "white",
        paddingY: 3,
        marginTop: 4,
        paddingX: { xs: 1, sm: 4, md: 8, lg: 10, xl: 12 },
      }}
    >
      <Stack alignItems="center" direction="column" spacing={1}>
        <Typography align="center" variant="body2">
          &copy; 2024 Online Bookstore. All rights reserved.
        </Typography>

        <Typography align="center" sx={{ color: "grey.400" }} variant="body2">
          <Link
            href="/learning"
            sx={{
              color: "white",
              textDecoration: "none",
              "&:hover": { color: "grey.400" },
            }}
          >
            Explore Apoorv&apos;s journey and challenges in building this
            bookstore
          </Link>
        </Typography>
      </Stack>
    </Box>
  );

export default Footer;
