import { Header } from './components/Header.jsx'
import { Main } from './components/Main.jsx'
import { Footer } from './components/Footer.jsx'

export function App() {

  const nombre = "Bauti"
  const edad = 19

  return (
    <>
      <Header name={nombre} age={edad} />
      <Main />
      <Footer />
    </>
  )
}
