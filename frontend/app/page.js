import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Speakers from '../components/Speakers'
import Agenda from '../components/Agenda'
import RegisterForm from '../components/RegisterForm'
import Footer from '../components/Footer'
import FloatingScrollTop from '../components/FloatingScrollTop'

export default function Home() {
  return (
    <>
      <main>
        <Navbar />
        <Hero />
        <About />
        <Speakers />
        <Agenda />
        <RegisterForm />
        <Footer />
      </main>

      <FloatingScrollTop />
    </>
  )
}