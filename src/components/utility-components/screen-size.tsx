import { useMediaQuery, useTheme } from "@mui/material"

export const useIsMobile = () => {
  const theme = useTheme()
  return useMediaQuery(theme.breakpoints.down("sm"), { noSsr: true })
}

export const useIsTab = () => {
  const theme = useTheme()
  return useMediaQuery(theme.breakpoints.between("sm", "md"), { noSsr: true })
}

export const useIsLaptop = () => {
  const theme = useTheme()
  return useMediaQuery(theme.breakpoints.between("md", "lg"), { noSsr: true })
}

export const useIsDesktop = () => {
  const theme = useTheme()
  return useMediaQuery(theme.breakpoints.up("lg"), { noSsr: true })
}
