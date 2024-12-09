'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, useAnimation, useInView } from 'framer-motion'
import Script from 'next/script'
import { Github, Linkedin, Mail } from 'lucide-react'

// Extend the Window interface to include VANTA
declare global {
  interface Window {
    VANTA: {
      HALO: (options: object) => { destroy: () => void };
    };
  }
}

// Custom hook for Vanta.js
function useVanta() {
  const myRef = useRef(null)
  const [vantaEffect, setVantaEffect] = useState<{ destroy: () => void } | null>(null)
  const [vantaLoaded, setVantaLoaded] = useState(false)

  useEffect(() => {
    if (!vantaEffect && myRef.current && vantaLoaded) {
      setVantaEffect(
        window.VANTA.HALO({
          el: myRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 400.00,
          minWidth: 800.00,
          baseColor: 0x22b945,
          backgroundColor: 0x0,
          yOffset: 0.20
        })
      )
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [vantaEffect, vantaLoaded])

  return { ref: myRef, setVantaLoaded }
}

function AboutCard() {
  return (
    <motion.div
      className="max-w-6xl mx-auto bg-black  bg-opacity-70 rounded-lg shadow-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex flex-col items-center">
        <Image
          src="https://github.com/cyrixninja.png"
          alt="Profile"
          width={96}
          height={96}
          className="rounded-full mb-4 border-4 border-white shadow-md"
        />
        <h2 className="text-3xl font-bold mb-4 text-center text-white">About Me</h2>
        <p className="text-gray-100 text-center mb-4">
          I am a Full Stack Developer, Cloud Engineer, and Cybersecurity enthusiast with a strong focus on building secure and scalable backend solutions. Specializing in Python, AWS, and Azure, I design, develop, and deploy web applications that meet modern security and performance standards.
          With a deep understanding of both front-end and back-end technologies, I create full-stack applications that integrate seamlessly with cloud services. My expertise in cloud platforms like AWS and Azure enables me to architect, automate, and optimize cloud infrastructures for reliable and scalable deployments. Additionally, my passion for cybersecurity drives me to incorporate best practices in securing applications, data, and cloud environments.
          I am constantly expanding my knowledge in cloud computing and cybersecurity, ensuring that the solutions I provide are cutting-edge and secure. Whether it&apos;s creating a dynamic web app, deploying microservices, or safeguarding systems, I thrive on delivering high-quality results that drive innovation and trust.
        </p>
        <div className="flex space-x-4">
          <a href="https://github.com/cyrixninja" target="_blank" rel="noopener noreferrer">
            <Github className="w-6 h-6 text-white hover:text-gray-300 transition-colors duration-300" />
          </a>
          <a href="https://linkedin.com/in/cyrixninja" target="_blank" rel="noopener noreferrer">
            <Linkedin className="w-6 h-6 text-white hover:text-gray-300 transition-colors duration-300" />
          </a>
          <a href="mailto:cyrixninja@gmail.com">
            <Mail className="w-6 h-6 text-white hover:text-gray-300 transition-colors duration-300" />
          </a>
        </div>
      </div>
    </motion.div>
  )
}

function About() {
  const ref = useRef(null)
  const isInView = useInView(ref)
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [controls, isInView])

  return (
    <section className="py-20" ref={ref}>
      <AboutCard />
    </section>
  )
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home')
  const { ref: vantaRef, setVantaLoaded } = useVanta()

  const handleScroll = (section: string) => {
    setActiveSection(section)
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js" />
      <Script 
        src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.halo.min.js" 
        onLoad={() => setVantaLoaded(true)}
      />
      
      <div ref={vantaRef} className="min-h-screen bg-black text-white overflow-hidden">
        <nav className="fixed top-0 left-0 right-0 z-10 bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg">
          <ul className="flex justify-center space-x-4 p-4">
            {['home', 'about', 'skills', 'projects', 'contact'].map((section) => (
              <li key={section}>
                <motion.button
                  onClick={() => handleScroll(section)}
                  className={`text-sm uppercase tracking-wider ${
                    activeSection === section ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {section}
                </motion.button>
              </li>
            ))}
          </ul>
        </nav>

        <main className="container mx-auto px-4 py-20">
          <section id="home">
            <Hero />
          </section>
          <section id="about">
            <About />
          </section>
          <section id="skills">
            <Skills />
          </section>
          <section id="projects">
            <Projects />
          </section>
          <section id="contact">
            <Contact />
          </section>
        </main>

        <footer className="bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg py-4">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <p>&copy; 2024 cyrixninja. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}

function Hero() {
  
  const [text, setText] = useState("")
  const fullText = "Cloud Engineer & Full Stack Developer"

  useEffect(() => {
    let i = 0
    const typingEffect = setInterval(() => {
      if (i < fullText.length) {
        setText(prev => prev + fullText[i])
        i++
      } else {
        clearInterval(typingEffect)
      }
    }, 100)

    return () => clearInterval(typingEffect)
  }, [])
  console.log(text)

  return (
    <section className="min-h-screen flex items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1 
          className="text-5xl font-bold mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          Harsh Kumar
        </motion.h1>
        <h2 className="text-2xl text-gray-300 mb-8 h-8">{fullText}</h2>
        <motion.a
          href="#contact"
          className="bg-white text-black px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-200 transition-colors duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get in touch
        </motion.a>
      </motion.div>
    </section>
  )
}

function Skills() {
  const skills = [
    'HTML', 'CSS', 'JavaScript','Python','C', 'Rust' , 'Next.js', 'Node.js', 'Express', 'MongoDB', 'Git', 'AWS','Azure','Linux'
  ]

  const ref = useRef(null)
  const isInView = useInView(ref)
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [controls, isInView])

  return (
    <section className="py-20" ref={ref}>
      <motion.div
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.8 } },
        }}
      >
        <h2 className="text-3xl font-bold mb-8 text-center">Skills</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {skills.map((skill, index) => (
            <motion.span
              key={skill}
              className="bg-gray-800 bg-opacity-50 px-4 py-2 rounded-full text-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.1 } },
              }}
              whileHover={{ scale: 1.1, rotate: Math.random() * 10 - 5 }}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

function Projects() {
  const projects = [
    { 
      title: 'Lingua.BOT', 
      description: 'LinguaBOT is a web application meticulously crafted to enhance language learning through dynamic chat sessions and quizzes.',
      imageUrl: 'https://raw.githubusercontent.com/cyrixninja/Lingua.BOT/refs/heads/main/screenshots/main.png', // Replace with your project image URL
      link: 'https://github.com/cyrixninja/Lingua.BOT' // Replace with your project link
    },
    { 
      title: 'Windows 98 Javascript', 
      description: 'Windows 98 lookalike made using HTML and Javascript',
      imageUrl: 'https://socialify.git.ci/cyrixninja/Windows-98-Javascript/image?description=1&font=Inter&language=1&name=1&owner=1&pattern=Circuit%20Board&stargazers=1&theme=Light', // Replace with your project image URL
      link: 'https://cyrixninja.github.io/Windows-98-Javascript/' // Replace with your project link
    },
    { 
      title: 'Snack It Up', 
      description: 'Find a Recipe and Food Chatbot Website',
      imageUrl: 'https://socialify.git.ci/cyrixninja/Snack-It-Up/image?description=1&font=Inter&language=1&name=1&owner=1&pattern=Circuit%20Board&stargazers=1&theme=Light', // Replace with your project image URL
      link: 'https://github.com/cyrixninja/Snack-It-Up' // Replace with your project link
    },
    { 
      title: 'Dragon Slayer Game', 
      description: 'Test your wits and bravery in a quest to defeat the mighty dragon!',
      imageUrl: 'https://github.com/cyrixninja/DragonSlayerGame/raw/main/Screenshots/1.png', // Replace with your project image URL
      link: 'https://github.com/cyrixninja/DragonSlayerGame' // Replace with your project link
    },
    { 
      title: 'Repurpose.It', 
      description: 'AI-powered Sustainable Repurposing Platform',
      imageUrl: 'https://github.com/cyrixninja/Repurpose.It/raw/main/screenshots/banner.png', // Replace with your project image URL
      link: 'https://github.com/cyrixninja/Repurpose.It' // Replace with your project link
    },
    { 
      title: 'CarbonCalc', 
      description: 'Carbon Footprint Tracker built using ASP.NET',
      imageUrl: 'https://github.com/cyrixninja/CarbonCalc/raw/main/wwwroot/images/carboncalc.gif', // Replace with your project image URL
      link: 'https://github.com/cyrixninja/CarbonCalc' // Replace with your project link
    },
  ]

  return (
    <section className="py-20">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.8 } },
        }}
      >
        <h2 className="text-3xl font-bold mb-8 text-center">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 p-6 rounded-lg cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0px 0px 8px rgb(255,255,255)",
                transition: { duration: 0.2 }
              }}
            >
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                <div className="relative h-48 w-full mb-4">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{project.title}</h3>
                <p className="text-gray-400">{project.description}</p>
              </a>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref)
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [controls, isInView])

  return (
    <section className="py-20" ref={ref}>
      <motion.div
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
        }}
      >
        <h2 className="text-3xl font-bold mb-8 text-center">Contact Me</h2>
        <form className="max-w-md mx-auto">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              Name
            </label>
            <motion.input
              type="text"
              id="name"
              name="name"
              className="w-full px-3 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              whileFocus={{ scale: 1.02 }}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <motion.input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              whileFocus={{ scale: 1.02 }}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
              Message
            </label>
            <motion.textarea
              id="message"
              name="message"
              rows={4}
              className="w-full px-3 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              whileFocus={{ scale: 1.02 }}
            ></motion.textarea>
          </div>
          <motion.button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Send Message
          </motion.button>
        </form>
      </motion.div>
    </section>
  )
}