import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Agenda from '../components/Agenda'
import Speakers from '../components/Speakers'
import EventGallery from '../components/EventGallery'
import RegisterForm from '../components/RegisterForm'
import Footer from '../components/Footer'
import FloatingScrollTop from '../components/FloatingScrollTop'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Agenda />
      <EventGallery />
      <Speakers />
      <RegisterForm />
      <Footer />
      <FloatingScrollTop />
    </main>
  )
}