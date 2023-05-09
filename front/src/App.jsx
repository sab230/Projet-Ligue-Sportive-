import Navbar from './components/navbar'
import AppComponent from './pages/_app'
import CartContextProvider from './contexts/cart-context'
import AuthContextProvider from './contexts/auth-context'
function App() {
  return (
    <AuthContextProvider>
      <CartContextProvider>
        <div className='mb-2'>
          <Navbar />
        </div>
        <div className='container mt-6'>
          <AppComponent />
        </div>
      </CartContextProvider>
    </AuthContextProvider>
  )
}

export default App
