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
        className="absolute right-43 top-12 cursor-pointer opacity-0"
        onClick={() => setIsCartOpen(true)}
      >
        <FiShoppingBag size={20} />
      </button>

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </main>
  )
}

export default App
