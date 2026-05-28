import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Speakers from '../components/Speakers'
import Agenda from '../components/Agenda'
import RegisterForm from '../components/RegisterForm'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Speakers />
        <Agenda />
        <RegisterForm />
      </main>
      <Footer />
    </>
  )
}
