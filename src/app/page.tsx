import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { Menu } from '@/components/Menu'
import { About } from '@/components/About'
import { HowToOrder } from '@/components/HowToOrder'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Menu />
        <About />
        <HowToOrder />
      </main>
      <Footer />
    </>
  )
}
