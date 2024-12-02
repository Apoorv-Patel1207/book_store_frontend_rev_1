import { Box, Typography, List, ListItem, ListItemText } from "@mui/material"

import Layout from "../components/layout/layout"
import ThemeDemo from "../components/theme-demo"

function Learning() {
  const challenges = [
    {
      title: "React & TypeScript Integration",
      description:
        "Integrating TypeScript into a React project required careful type definitions for props, states, and API calls. This helped improve the overall code quality and reduced runtime errors.",
    },
    {
      title: "Using ShadCN UI with Tailwind CSS",
      description:
        "Customizing UI components with ShadCN UI and Tailwind CSS for a responsive and modern design was challenging but allowed for a highly scalable design system.",
    },
    {
      title: "Price Slider and Search Feature Implementation",
      description:
        "Implementing a price slider (0 - 9999) and a custom search feature required managing state effectively with React hooks and improving performance with debounce techniques.",
    },
    {
      title: "User Authentication with Auth0",
      description:
        "Implementing secure authentication using Auth0, including login, sign-up, and token-based access, was a significant challenge but crucial for secure user sessions.",
    },
    {
      title: "Backend with Node.js and PostgreSQL",
      description:
        "Setting up the backend with Node.js and PostgreSQL, designing database schemas, and integrating the frontend with the API for book data and orders provided valuable experience in full-stack development.",
    },
  ]

  // ---------- To Do ---------
  // Remove nodemodules in backend github
  // Database connectivity,
  // Debouncing, Skelton UI,
  //  Icons on drawer links, user data on drawer nav,
  // add book api, dropbox for image
  // Fix the input field at the cart,
  // Handle the out of stock situation

  // Features : Price Slider, Responsive, Search, filters,
  // Concepts:  Infinite scroll,  lazy loading, use memo, callback,
  // Tech and libraries : react router DOM, react intersection observer, react hook form,
  // Handle the hover effect in mobile
  // integrated auth 0 authentication
  // use context for catching of user profile data

  // ----------Doubts--------
  // Search Functionality backend?
  // Role base authentication?
  // Checkout process, cart local storage

  // -------Issues faced--------
  // having issue with the yup validation import
  // while deleting and reinstalling node modulus need to remove all direct elements like div
  // Promises eslint and typescript errors
  // recreate the project using the MUI and remove the shad cn and tailwind
  // Issue while handling the search, filter functionality with the pagination
  // Its was difficult to find out the bug caused by the routing order for creation of the header search functionality
  // Profile API calling multiple times
  // Cart page rerendering infinite Loop
  // Text field quantity Validation
  //  changing all the api variables from the camel case to lower snake case
  // the decimal value by default turns to string value while receiveing from the backend in the json

  // ---------Bugs----------
  // showing up 2 cards of the same book when searched
  // calling 2 pages at the very fast call
  // mobile view header search bar height to be fixed or separate search to be made
  // Fix the data base id to string and accordingly match in the getBookbyID
  // Admin panel should not be visible without login and should only be visible to admin same for sales
  // Cart option should not be visible without login
  // Handle the available stock and should show up the valid purchase quantity before making an order
  // At the time ordering make the phone number validation
  // Admin should have all the order details within its Panel
  // Fix the issue with accessing the tabs with the direct providing the URL

  return (
    <Layout>
      <Box sx={{ padding: 4 }}>
        <Typography gutterBottom variant='h4'>
          Challenges and Learning from Bookstore App Development
        </Typography>
        <Typography gutterBottom variant='body1'>
          During the development of the online bookstore application, I faced
          several challenges that helped me develop key skills in frontend and
          full-stack development. Below are the main challenges and the skills I
          acquired:
        </Typography>
        <List>
          {challenges.map((challenge) => (
            <ListItem key={challenge.title} sx={{ paddingBottom: 2 }}>
              <ListItemText
                primary={
                  <Typography variant='h6'>{challenge.title}</Typography>
                }
                secondary={challenge.description}
              />
            </ListItem>
          ))}
        </List>

        <ThemeDemo />
      </Box>
    </Layout>
  )
}

export default Learning
