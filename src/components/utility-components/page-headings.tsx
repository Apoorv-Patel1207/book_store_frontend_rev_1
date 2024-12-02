import { SxProps, Theme, Typography } from "@mui/material"

interface PageHeadingProps {
  children: React.ReactNode
  sx?: SxProps<Theme>
}

const PageHeading = (props: PageHeadingProps) => {
  const { children, sx } = props
  return (
    <Typography
      color='#1F2937'
      fontWeight='bold'
      sx={{ mb: { xs: 2, md: 4 }, fontSize: { xs: 20, md: 26 }, ...sx }}
      textAlign='center'
    >
      {children}
    </Typography>
  )
}

export default PageHeading
