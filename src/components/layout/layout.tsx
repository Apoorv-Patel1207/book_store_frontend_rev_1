import { ReactNode } from "react"

import { Box } from "@mui/material"

import Footer from "./footer"
import Header from "./header"

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Header />
      <Box
        sx={{
          flex: 1,
          marginTop: 12,
          paddingX: { xs: 2, sm: 4, md: 8, lg: 10, xl: 12 },
        }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  )
}

export default Layout
