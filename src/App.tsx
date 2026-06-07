import bgImage from './assets/bg.png'

function App() {
  return (
    <main
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }}
    />
  )
}

export default App
