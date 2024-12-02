import { Box, Typography } from "@mui/material"

interface NoDataFoundProps {
  message?: string
  description?: string
}

const NoDataFound = (props: NoDataFoundProps) => {
  const { message = "No Data Found", description } = props
  return (
    <Box
      alignItems='center'
      display='flex'
      flexDirection='column'
      justifyContent='center'
      p={4}
      textAlign='center'
    >
      <Box
        alt='No Data found'
        component='img'
        src='/images/no-data.png'
        sx={{ width: "150px", height: "150px", mb: 2 }}
      />
      <Typography color='text.secondary' variant='h6'>
        {message}
      </Typography>
      <Typography color='text.secondary' sx={{ mb: 2 }}>
        {description}
      </Typography>
    </Box>
  )
}

export default NoDataFound
