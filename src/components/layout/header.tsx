import { useState } from "react"

import MenuIcon from "@mui/icons-material/Menu"
import {
  AppBar,
  Box,
  Typography,
  Button,
  Drawer,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material"
import { Link, useLocation } from "react-router-dom"

import MobileSearch from "./mobileSearch"
import Search from "./search"
import Login from "../auth/login"
import { useUser } from "../context/user-context"

const navLinks = [
  { label: "Orders", path: "/order-history" },
  { label: "Cart", path: "/cart" },
  { label: "Admin", path: "/add-book" },
  { label: "Sales", path: "/sales-panel" },
]

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)

  const toggleDrawer = (open: boolean) => () => setDrawerOpen(open)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const location = useLocation()
  const { userData } = useUser()

  const shouldRenderLink = (
    label: string,
    role: string | undefined,
  ): boolean => {
    if (!role) {
      return label === "Catalog"
    }
    if (role === "salesman" && label === "Admin") {
      return false
    }
    if (role === "customer" && (label === "Admin" || label === "Sales")) {
      return false
    }
    return true
  }

  return (
    <AppBar
      position='fixed'
      sx={{
        backgroundColor: "#1F2937",
        paddingX: { xs: 2, sm: 4, md: 8, lg: 10, xl: 12 },
        height: "70px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          component={Link}
          sx={{
            color: "white",
            textDecoration: "none",
            fontSize: { xs: "20px", md: "24px" },
          }}
          to='/'
        >
          Readify
        </Typography>

        {isMobile ? (
          <Box display='flex' justifyContent='end'>
            <MobileSearch />
          </Box>
        ) : (
          <Search isMobile={false} />
        )}

        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          {navLinks
            .filter((link) => shouldRenderLink(link.label, userData?.role))
            .map((link) => (
              <Button
                component={Link}
                key={link.path}
                sx={{
                  color: "white",
                  textTransform: "none",
                  "&:hover": { color: "grey.400" },
                }}
                to={link.path}
              >
                {link.label}
              </Button>
            ))}
        </Box>

        <Login />

        <IconButton
          color='inherit'
          edge='end'
          onClick={toggleDrawer(true)}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        <Drawer anchor='left' onClose={toggleDrawer(false)} open={drawerOpen}>
          <Box
            display='flex'
            flexDirection='column'
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
            pt={7}
            sx={{
              width: 200,
              height: "100vh",
              backgroundColor: "#1F2937",
            }}
          >
            {navLinks.map((link) => {
              if (userData?.role === "salesman" && link.label === "Admin") {
                return null
              }

              if (
                userData?.role === "customer" &&
                (link.label === "Admin" || link.label === "Sales")
              ) {
                return null
              }
              return (
                <Button
                  component={Link}
                  key={link.path}
                  sx={{
                    fontWeight: "semibold",
                    color: location.pathname === link.path ? "black" : "white",

                    bgcolor: location.pathname === link.path ? "white" : "none",
                    textTransform: "none",
                    mb: 1,
                    borderRadius: 0,
                  }}
                  to={link.path}
                >
                  {link.label}
                </Button>
              )
            })}
          </Box>
        </Drawer>
      </Box>
    </AppBar>
  )
}

export default Header
