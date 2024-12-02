import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import ProtectedRoutes from "./components/auth/protected-routes"
import { UserProvider } from "./components/context/user-context"
import AdminPanel from "./pages/add-book"
import BookDetails from "./pages/book-details"
import Cart from "./pages/cart"
import Catalog from "./pages/catalog"
import Checkout from "./pages/checkout"
import Learning from "./pages/learning"
import NotLoggedIn from "./pages/not-logged-in"
import OrderHistoryPage from "./pages/order-history"
import Profile from "./pages/profile"
import SalesPanel from "./pages/sales-panel"

const App = () => (
  <Router>
    <UserProvider>
      <Routes>
        {/* <Route element={<Home />} path='/' /> */}
        <Route element={<Catalog />} path='/' />
        <Route element={<NotLoggedIn />} path='/not-logged-in' />
        <Route element={<BookDetails />} path='/book-details/:id' />
        <Route element={<Learning />} path='/learning' />

        <Route element={<ProtectedRoutes />}>
          <Route element={<OrderHistoryPage />} path='/order-history' />
          <Route element={<Cart />} path='/cart' />
          <Route element={<AdminPanel />} path='/add-book' />
          <Route element={<SalesPanel />} path='/sales-panel' />
          <Route element={<Profile />} path='/profile' />
          <Route element={<Checkout />} path='/checkout/:id' />
        </Route>
      </Routes>
    </UserProvider>
  </Router>
)

export default App
