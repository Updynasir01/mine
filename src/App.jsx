import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HeartIcon, CakeIcon, SparklesIcon, StarIcon, GiftIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'

// Import images
import img1 from './assets/images/yu.jpg'
import img2 from './assets/images/rt.jpg'
import img3 from './assets/images/jk.jpg'
import img4 from './assets/images/IMG-20250317-WA0014.jpg'
import img5 from './assets/images/IMG-20250317-WA0013.jpg'
import img6 from './assets/images/nm.jpg'

const PearFlower = () => (
  <div className="absolute w-6 h-6">
    <div className="absolute inset-0 animate-spin-slow">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-pink-200 rounded-full"
          style={{
            transform: `rotate(${i * 72}deg) translateY(-8px)`,
          }}
        />
      ))}
    </div>
    <div className="absolute inset-0 w-2 h-2 bg-pink-300 rounded-full m-auto" />
  </div>
)

const Butterfly = ({ color = "purple", size = "normal" }) => {
  const sizeClasses = {
    small: "w-6 h-4",
    normal: "w-8 h-6",
    large: "w-10 h-8"
  }

  const wingColors = {
    purple: "bg-purple-200",
    pink: "bg-pink-200",
    blue: "bg-blue-200",
    yellow: "bg-yellow-200"
  }

  return (
    <motion.div
      animate={{
        rotate: [0, 10, -10, 0],
        y: [0, -5, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`relative ${sizeClasses[size]}`}
    >
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className={`absolute w-3 h-4 ${wingColors[color]} rounded-t-full rounded-b-full left-0 transform -rotate-45 opacity-80`} />
        <div className={`absolute w-3 h-4 ${wingColors[color]} rounded-t-full rounded-b-full right-0 transform rotate-45 opacity-80`} />
        <div className="absolute w-4 h-1 bg-pink-300 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
      </motion.div>
    </motion.div>
  )
}

const PhotoBoard = ({ images = [] }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.8 }}
    className="my-8 p-6 bg-white/90 rounded-xl shadow-lg border-2 border-pink-100"
  >
    <h2 className="text-2xl font-bold text-pink-600 mb-4">Our Beautiful Memories 💝</h2>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {images.map((image, index) => (
        <motion.div
          key={index}
          initial={{ rotate: -5 + Math.random() * 10 }}
          whileHover={{ 
            scale: 1.05, 
            rotate: 0,
            transition: { duration: 0.2 } 
          }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-white rounded-lg shadow-lg transform rotate-3 group-hover:rotate-0 transition-transform"></div>
          <img
            src={image.url}
            alt={image.caption || 'Special moment'}
            className="relative w-full h-40 object-cover rounded-lg shadow-md"
          />
          {image.caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 rounded-b-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity">
              {image.caption}
            </div>
          )}
          <motion.div
            className="absolute -top-2 -right-2"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Butterfly color={["pink", "purple", "blue"][index % 3]} size="small" />
          </motion.div>
        </motion.div>
      ))}
    </div>
  </motion.div>
)

function App() {
  const [showMessage, setShowMessage] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(0)

  const slides = [
    {
      title: "My Dearest Habibti",
      content: "From the moment I met you, my world became brighter and more beautiful. Your presence in my life is the greatest gift I could ever ask for. You're my everything! 💝",
      emoji: "👑"
    },
    {
      title: "My Sweet Habibti",
      content: "Your smile is like sunshine, your laugh is my favorite melody, and your love is the most precious treasure. Every day with you is like a beautiful dream! ✨",
      emoji: "🌟"
    },
    {
      title: "My Beautiful Princess",
      content: "Habibti, you're not just amazing, you're extraordinary! Your kindness, your grace, and your loving heart make you the most special person in my world. 💖",
      emoji: "👸"
    },
    {
      title: "Light of My Life",
      content: "Ya Habibti, the way you care, the way you love, and the way you make everything better just by being you - you're truly a gift from heaven! 🎀",
      emoji: "😇"
    },
    {
      title: "My Beloved Habibti",
      content: "Every moment with you is pure magic. Your love fills my heart with endless joy, and your presence makes my life complete. You're my dream come true! 💫",
      emoji: "💑"
    }
  ]

  const nextSlide = () => {
    setDirection(1)
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setDirection(-1)
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (showMessage) {
      const interval = setInterval(() => {
        nextSlide()
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [showMessage])

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  // Update images state with local images
  const [images] = useState([
    {
      url: img1,
      caption: "Every moment with you is precious 💖"
    },
    {
      url: img2,
      caption: "Your smile lights up my world ✨"
    },
    {
      url: img3,
      caption: "Together forever, my Habibti 💑"
    },
    {
      url: img4,
      caption: "You make every day special 🌸"
    },
    {
      url: img5,
      caption: "My heart belongs to you 💝"
    },
    {
      url: img6,
      caption: "Forever and always 🌟"
    }
  ])

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-pink-100 via-white to-pink-100 relative overflow-hidden">
      {/* Floating Elements */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{ x: Math.random() * window.innerWidth, y: -20 }}
          animate={{
            y: window.innerHeight + 20,
            x: `calc(${Math.random() * 100}vw)`,
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {i % 3 === 0 ? (
            <PearFlower />
          ) : (
            <Butterfly 
              color={["purple", "pink", "blue", "yellow"][Math.floor(Math.random() * 4)]}
              size={["small", "normal", "large"][i % 3]}
            />
          )}
        </motion.div>
      ))}

      <div className="max-w-3xl w-full"> {/* Increased max-width to accommodate photos */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 text-center relative overflow-hidden border-2 border-pink-200"
        >
          {/* Decorative Corner Elements */}
          <div className="absolute top-4 left-4"><Butterfly color="pink" /></div>
          <div className="absolute top-4 right-4"><Butterfly color="purple" /></div>
          <div className="absolute bottom-4 left-4"><Butterfly color="blue" /></div>
          <div className="absolute bottom-4 right-4"><Butterfly color="yellow" /></div>

          {/* Additional Decorative Butterflies */}
          <motion.div
            animate={{ y: [-20, 0, -20], x: [-10, 0, -10] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-8"
          >
            <Butterfly color="pink" size="small" />
          </motion.div>
          <motion.div
            animate={{ y: [-15, 5, -15], x: [10, 0, 10] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/3 right-8"
          >
            <Butterfly color="blue" size="small" />
          </motion.div>

          {/* Birthday Cake */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mb-8 relative"
          >
            <div className="relative">
              <CakeIcon className="h-24 w-24 mx-auto text-pink-500" />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute -top-4 left-1/2 transform -translate-x-1/2"
              >
                <SparklesIcon className="h-8 w-8 text-yellow-400" />
              </motion.div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute -right-4 top-0"
              >
                <StarIcon className="h-6 w-6 text-yellow-300" />
              </motion.div>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute -left-4 top-0"
              >
                <StarIcon className="h-6 w-6 text-yellow-300" />
              </motion.div>
            </div>
          </motion.div>

          {/* Main Birthday Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="relative mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold cursive text-pink-600">
              Happy Birthday Habibti!
            </h1>
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -right-4 -top-4"
            >
              <GiftIcon className="h-8 w-8 text-pink-500" />
            </motion.div>
          </motion.div>

          {/* Photo Board */}
          <PhotoBoard images={images} />

          {/* Sliding Messages */}
          <div className="relative h-64 mb-8">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentSlide}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="absolute w-full"
              >
                <div className="px-4 py-6 rounded-xl bg-gradient-to-r from-pink-50/80 via-purple-50/80 to-pink-50/80 border-2 border-pink-100">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl mb-4"
                  >
                    {slides[currentSlide].emoji}
                  </motion.div>
                  <h2 className="text-2xl font-bold cursive text-pink-600 mb-4">
                    {slides[currentSlide].title}
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {slides[currentSlide].content}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/80 rounded-full p-2 shadow-lg hover:bg-pink-100 transition-colors"
            >
              <ChevronLeftIcon className="h-6 w-6 text-pink-600" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/80 rounded-full p-2 shadow-lg hover:bg-pink-100 transition-colors"
            >
              <ChevronRightIcon className="h-6 w-6 text-pink-600" />
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentSlide ? 1 : -1)
                    setCurrentSlide(index)
                  }}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-pink-500' : 'bg-pink-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Final Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-8 p-6 bg-gradient-to-r from-pink-50/80 via-purple-50/80 to-pink-50/80 rounded-lg border-2 border-pink-100"
          >
            <p className="text-lg text-pink-700 cursive leading-relaxed">
              My beloved Habibti, you're the most precious gift in my life. 
              Your sweet smile, gentle heart, and beautiful soul make every moment magical. 
              You deserve all the happiness in the world, my princess! 
              Thank you for being the most amazing person in my life. 
              Here's to celebrating you, today and always! 🎀💖✨
            </p>
          </motion.div>

          {/* Floating Hearts */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{ scale: 0, x: '50%', y: '50%' }}
                animate={{
                  scale: [1, 1.2, 1],
                  x: `${35 + Math.random() * 30}%`,
                  y: `${35 + Math.random() * 30}%`,
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: i * 0.2,
                }}
              >
                <HeartIcon className={`h-4 w-4 ${i % 2 === 0 ? 'text-pink-400/40' : 'text-purple-400/40'}`} />
              </motion.div>
            ))}
          </div>

          {/* Bottom Decorative Elements */}
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-pink-200 via-purple-200 to-pink-200" />
        </motion.div>
      </div>
    </div>
  )
}

export default App
