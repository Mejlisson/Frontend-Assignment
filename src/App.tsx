import { useState } from 'react'
import bgImage from './assets/bg.png'
import { FiShoppingBag } from 'react-icons/fi'
import CartModal from './components/CartModal'

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false)

  return (
    <main
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <button
        type="button"
        aria-label="Open shopping bag"
        title="Öppna varukorg"
        className="absolute right-54 top-15 cursor-pointer opacity-100 "
        onClick={() => setIsCartOpen(true)}
      >
        <FiShoppingBag size={22} className="text-white" />
      </button>

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </main>
  )
}

export default App
