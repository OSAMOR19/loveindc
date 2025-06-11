"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, MapPin, Heart, Gift, MessageCircle, Clock, Instagram, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

const TypewriterText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(
        () => {
          setDisplayText((prev) => prev + text[currentIndex])
          setCurrentIndex((prev) => prev + 1)

          if (currentIndex === text.length - 1) {
            setIsComplete(true)
          }
        },
        150 + Math.random() * 100,
      ) // Varying speed for more natural feel

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text])

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setCurrentIndex(0)
      setDisplayText("")
      setIsComplete(false)
    }, delay)

    return () => clearTimeout(startTimeout)
  }, [delay])

  return (
    <span className={`relative ${isComplete ? "animate-pulse" : ""}`}>
      {displayText}
      {currentIndex < text.length && (
        <motion.span
          className="inline-block w-1 h-12 md:h-16 bg-white ml-2"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
        />
      )}
      {isComplete && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 2, repeat: 3 }}
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              initial={{
                x: Math.random() * 100 - 50 + "%",
                y: Math.random() * 100 - 50 + "%",
                opacity: 0,
                scale: 0,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
                x: [Math.random() * 100 - 50 + "%", Math.random() * 200 - 100 + "%"],
                y: [Math.random() * 100 - 50 + "%", Math.random() * 200 - 100 + "%"],
              }}
              transition={{
                duration: 1.5 + Math.random() * 1,
                delay: Math.random() * 0.5,
                repeat: 1,
              }}
            />
          ))}
        </motion.div>
      )}
    </span>
  )
}

export default function WeddingWebsite() {
  const [currentSection, setCurrentSection] = useState("forever-begins")
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Countdown timer
  useEffect(() => {
    const weddingDate = new Date("2026-05-22T14:00:00")

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = weddingDate.getTime() - now

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Original White Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <motion.div
              className="text-xl sm:text-2xl font-serif italic text-slate-800"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              C & O
            </motion.div>

            {/* Navigation Items - Hidden on mobile, shown on larger screens */}
            <div className="hidden lg:flex space-x-6 xl:space-x-8">
              {[
                { key: "forever-begins", label: "Forever Begins" },
                { key: "love-chronicles", label: "Love Chronicles" },
                { key: "captured-moments", label: "Captured Moments" },
                { key: "sacred-details", label: "Sacred Details" },
                { key: "join-celebration", label: "Join Celebration" },
                { key: "hearts-whispers", label: "Hearts' Whispers" },
              ].map((section) => (
                <button
                  key={section.key}
                  onClick={() => setCurrentSection(section.key)}
                  className={`text-xs xl:text-sm font-medium transition-colors ${
                    currentSection === section.key
                      ? "text-slate-800 border-b-2 border-slate-400"
                      : "text-slate-700 hover:text-slate-800 hover:border-b-2 hover:border-slate-300"
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </div>

            {/* Mobile Navigation - Enhanced animated menu */}
            <div className="lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="relative w-8 h-8 flex flex-col justify-center items-center space-y-1 focus:outline-none"
                aria-label="Toggle mobile menu"
              >
                <motion.span
                  className={`w-6 h-0.5 bg-slate-800 transition-all duration-300 ${
                    mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
                  }`}
                />
                <motion.span
                  className={`w-6 h-0.5 bg-slate-800 transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`}
                />
                <motion.span
                  className={`w-6 h-0.5 bg-slate-800 transition-all duration-300 ${
                    mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                  }`}
                />
              </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <>
                  {/* Backdrop */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                  />

                  {/* Mobile Menu Panel */}
                  <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="fixed top-20 left-4 right-4 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 lg:hidden overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="space-y-4">
                        {[
                          { key: "forever-begins", label: "Forever Begins", icon: "💕" },
                          { key: "love-chronicles", label: "Love Chronicles", icon: "📖" },
                          { key: "captured-moments", label: "Captured Moments", icon: "📸" },
                          { key: "sacred-details", label: "Sacred Details", icon: "💒" },
                          { key: "join-celebration", label: "Join Celebration", icon: "🎉" },
                          { key: "hearts-whispers", label: "Hearts' Whispers", icon: "💌" },
                        ].map((section, index) => (
                          <motion.button
                            key={section.key}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.3 }}
                            onClick={() => {
                              setCurrentSection(section.key)
                              setMobileMenuOpen(false)
                            }}
                            className={`w-full flex items-center space-x-4 p-4 rounded-xl transition-all duration-200 ${
                              currentSection === section.key
                                ? "bg-slate-100 text-slate-800 shadow-sm"
                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                            }`}
                          >
                            <span className="text-xl">{section.icon}</span>
                            <span className="font-medium text-left">{section.label}</span>
                            {currentSection === section.key && (
                              <motion.div
                                layoutId="activeIndicator"
                                className="ml-auto w-2 h-2 bg-slate-400 rounded-full"
                              />
                            )}
                          </motion.button>
                        ))}
                      </div>

                      {/* Decorative element */}
                      <div className="mt-6 pt-4 border-t border-slate-100">
                        <div className="text-center">
                          <span className="text-2xl">💍</span>
                          <p className="text-xs text-slate-500 mt-1">May 22nd, 2026</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <AnimatePresence mode="wait">
        {currentSection === "forever-begins" && (
          <motion.section
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative h-screen flex items-center justify-center overflow-hidden"
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: "url(/images/hero-bg.png)",
                backgroundPosition: "center 30%", // Adjusted to show more of the top of the image
                backgroundSize: "cover",
              }}
            >
              <div className="absolute inset-0 bg-black/30"></div>
            </div>

            {/* Enhanced floating elements */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Floating hearts */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`heart-${i}`}
                  className="absolute"
                  initial={{
                    x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
                    y: (typeof window !== "undefined" ? window.innerHeight : 800) + 20,
                    opacity: 0,
                  }}
                  animate={{
                    y: -20,
                    opacity: [0, 0.6, 0],
                    x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: Math.random() * 4 + 6,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: Math.random() * 8,
                  }}
                >
                  <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-white/30" fill="white" />
                </motion.div>
              ))}

              {/* Floating petals */}
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={`petal-${i}`}
                  className="absolute w-2 h-2 sm:w-3 sm:h-3 bg-white/20 rounded-full"
                  initial={{
                    x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
                    y: -10,
                    opacity: 0,
                  }}
                  animate={{
                    y: (typeof window !== "undefined" ? window.innerHeight : 800) + 10,
                    opacity: [0, 0.8, 0],
                    x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
                    scale: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: Math.random() * 5 + 8,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: Math.random() * 10,
                  }}
                />
              ))}

              {/* Sparkle effects */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={`sparkle-${i}`}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  initial={{
                    x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
                    y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
                    opacity: 0,
                    scale: 0,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                  }}
                  transition={{
                    duration: Math.random() * 2 + 1,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: Math.random() * 5,
                  }}
                />
              ))}
            </div>

            <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <div className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif italic mb-8 sm:mb-12 tracking-wide leading-tight space-y-2 sm:space-y-4">
                  <div className="block">
                    <TypewriterText text="Candice" delay={1000} />
                  </div>
                  <div className="block text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
                    <TypewriterText text="&" delay={3000} />
                  </div>
                  <div className="block">
                    <TypewriterText text="Oluwadamilare" delay={4500} />
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 8000 }}
                >
                  <p className="text-lg sm:text-2xl md:text-3xl font-light mb-3 sm:mb-4">May 22nd, 2026 at 2PM</p>
                  <p className="text-sm sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto px-4">
                    Marcellinas Place, 36 Isaac John Street, Ikeja GRA, Lagos
                  </p>
                </motion.div>
              </motion.div>
            </div>

            <motion.div
              className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/50 rounded-full flex justify-center">
                <div className="w-1 h-2 sm:h-3 bg-white/50 rounded-full mt-2"></div>
              </div>
            </motion.div>
          </motion.section>
        )}

        {/* Our Story Section */}
        {currentSection === "love-chronicles" && (
          <motion.section
            key="story"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white"
          >
            <div className="max-w-6xl mx-auto">
              <motion.div className="text-center mb-12 sm:mb-16" {...fadeInUp}>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic text-slate-800 mb-4 sm:mb-6">
                  Our Love Story
                </h2>
                <div className="w-16 sm:w-24 h-px bg-slate-400 mx-auto"></div>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center mb-12 sm:mb-16">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <img
                    src="/images/couple-casual.png"
                    alt="Candice and Oluwadamilare"
                    className="rounded-lg shadow-2xl w-full"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="space-y-4 sm:space-y-6"
                >
                  <h3 className="text-2xl sm:text-3xl font-serif text-slate-800">How We Met</h3>
                  <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                    Our love story began in the most unexpected way. What started as a chance encounter blossomed into
                    something beautiful and eternal. From our first conversation, we knew there was something special
                    between us.
                  </p>
                  <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                    Through laughter, adventures, and quiet moments together, we discovered that we were meant to be.
                    Our journey has been filled with joy, growth, and an ever-deepening love that we're excited to
                    celebrate with all of you.
                  </p>
                </motion.div>
              </div>

              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <blockquote className="text-lg sm:text-xl lg:text-2xl font-serif italic text-slate-700 max-w-3xl mx-auto px-4">
                  "Two hearts, one love, forever intertwined in God's perfect plan"
                </blockquote>
              </motion.div>
            </div>
          </motion.section>
        )}

        {/* Photo Gallery Section */}
        {currentSection === "captured-moments" && (
          <motion.section
            key="gallery"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white"
          >
            <div className="max-w-6xl mx-auto">
              <motion.div className="text-center mb-12 sm:mb-16" {...fadeInUp}>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic text-slate-800 mb-4 sm:mb-6">
                  Our Moments
                </h2>
                <div className="w-16 sm:w-24 h-px bg-slate-400 mx-auto"></div>
              </motion.div>

              <motion.div
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
                variants={staggerChildren}
                initial="initial"
                animate="animate"
              >
                {[
                  { src: "/images/couple-formal.png", alt: "Formal portrait" },
                  { src: "/images/couple-doors.png", alt: "Elegant doorway" },
                  { src: "/images/couple-car.png", alt: "Fun with vintage car" },
                  { src: "/images/couple-casual.png", alt: "Casual moment" },
                  { src: "/images/hero-bg.png", alt: "Romantic portrait" },
                  { src: "/images/couple-formal.png", alt: "Another beautiful moment" },
                ].map((image, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
                  >
                    <img
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      className="w-full h-48 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.section>
        )}

        {/* Event Details Section */}
        {currentSection === "sacred-details" && (
          <motion.section
            key="details"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white"
          >
            <div className="max-w-6xl mx-auto">
              <motion.div className="text-center mb-12 sm:mb-16" {...fadeInUp}>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic text-slate-800 mb-4 sm:mb-6">
                  Wedding Details
                </h2>
                <div className="w-16 sm:w-24 h-px bg-slate-400 mx-auto"></div>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <Card className="p-6 sm:p-8 shadow-lg border-0 bg-white">
                    <CardContent className="space-y-4 sm:space-y-6">
                      <div className="flex items-center space-x-4">
                        <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-slate-600 flex-shrink-0" />
                        <div>
                          <h3 className="text-xl sm:text-2xl font-serif text-slate-800">Date & Time</h3>
                          <p className="text-base sm:text-lg text-slate-600">May 22nd, 2026 at 2:00 PM</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-slate-600 flex-shrink-0" />
                        <div>
                          <h3 className="text-xl sm:text-2xl font-serif text-slate-800">Venue</h3>
                          <p className="text-base sm:text-lg text-slate-600">
                            Marcellinas Place
                            <br />
                            36 Isaac John Street
                            <br />
                            Ikeja GRA, Lagos
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-slate-600 flex-shrink-0" />
                        <div>
                          <h3 className="text-xl sm:text-2xl font-serif text-slate-800">Dress Code</h3>
                          <p className="text-base sm:text-lg text-slate-600">Formal Attire</p>
                          <p className="text-sm text-slate-500">Dusty blue, white, and silver encouraged</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <Card className="p-6 sm:p-8 shadow-lg border-0 bg-slate-800 text-white">
                    <CardContent className="text-center space-y-4 sm:space-y-6">
                      <Clock className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-white" />
                      <h3 className="text-2xl sm:text-3xl font-serif">Countdown to Forever</h3>
                      <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        <div className="text-center">
                          <div className="text-2xl sm:text-3xl font-bold">{timeLeft.days}</div>
                          <div className="text-xs sm:text-sm text-slate-300">Days</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl sm:text-3xl font-bold">{timeLeft.hours}</div>
                          <div className="text-xs sm:text-sm text-slate-300">Hours</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl sm:text-3xl font-bold">{timeLeft.minutes}</div>
                          <div className="text-xs sm:text-sm text-slate-300">Minutes</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl sm:text-3xl font-bold">{timeLeft.seconds}</div>
                          <div className="text-xs sm:text-sm text-slate-300">Seconds</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              <motion.div
                className="mt-8 sm:mt-12 text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Badge
                  variant="outline"
                  className="text-base sm:text-lg px-4 sm:px-6 py-2 border-slate-400 text-slate-700"
                >
                  #loveinDC26
                </Badge>
                <p className="mt-4 text-sm sm:text-base text-slate-600">Share your photos with our wedding hashtag!</p>
              </motion.div>
            </div>
          </motion.section>
        )}

        {/* RSVP Section */}
        {currentSection === "join-celebration" && (
          <motion.section
            key="rsvp"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white"
          >
            <div className="max-w-4xl mx-auto">
              <motion.div className="text-center mb-12 sm:mb-16" {...fadeInUp}>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic text-slate-800 mb-4 sm:mb-6">RSVP</h2>
                <div className="w-16 sm:w-24 h-px bg-slate-400 mx-auto mb-4 sm:mb-6"></div>
                <p className="text-base sm:text-lg text-slate-600 px-4">
                  We can't wait to celebrate with you! Please let us know if you'll be joining us.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Card className="p-6 sm:p-8 shadow-lg border-0">
                  <CardContent className="space-y-4 sm:space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                        <Input placeholder="Your full name" className="border-slate-300" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                        <Input type="email" placeholder="your.email@example.com" className="border-slate-300" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Will you be attending?</label>
                      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                        <Button variant="outline" className="flex-1">
                          Yes, I'll be there!
                        </Button>
                        <Button variant="outline" className="flex-1">
                          Sorry, can't make it
                        </Button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Number of Guests</label>
                      <Input type="number" placeholder="1" min="1" className="border-slate-300" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Special Message (Optional)
                      </label>
                      <Textarea
                        placeholder="Share your excitement or any special notes..."
                        className="border-slate-300 min-h-[100px]"
                      />
                    </div>

                    <Button className="w-full bg-slate-800 hover:bg-slate-700 text-white py-3">Send RSVP</Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.section>
        )}

        {/* Guestbook Section */}
        {currentSection === "hearts-whispers" && (
          <motion.section
            key="guestbook"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white"
          >
            <div className="max-w-4xl mx-auto">
              <motion.div className="text-center mb-12 sm:mb-16" {...fadeInUp}>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic text-slate-800 mb-4 sm:mb-6">
                  Guestbook
                </h2>
                <div className="w-16 sm:w-24 h-px bg-slate-400 mx-auto mb-4 sm:mb-6"></div>
                <p className="text-base sm:text-lg text-slate-600 px-4">Leave us a sweet message to treasure forever</p>
              </motion.div>

              <motion.div
                className="space-y-6 sm:space-y-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Card className="p-4 sm:p-6 shadow-lg border-0">
                  <CardContent className="space-y-4">
                    <Input placeholder="Your name" className="border-slate-300" />
                    <Textarea
                      placeholder="Write your message for the happy couple..."
                      className="border-slate-300 min-h-[100px] sm:min-h-[120px]"
                    />
                    <Button className="bg-slate-800 hover:bg-slate-700 text-white w-full sm:w-auto">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Leave Message
                    </Button>
                  </CardContent>
                </Card>

                {/* Sample messages */}
                <div className="space-y-4">
                  <Card className="p-4 sm:p-6 border-slate-200">
                    <CardContent>
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-200 rounded-full flex items-center justify-center flex-shrink-0">
                          <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-slate-800">Sarah & Michael</h4>
                          <p className="text-sm sm:text-base text-slate-600 mt-1">
                            Wishing you both a lifetime of love, laughter, and endless happiness! Can't wait to
                            celebrate with you! 💕
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="p-4 sm:p-6 border-slate-200">
                    <CardContent>
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-200 rounded-full flex items-center justify-center flex-shrink-0">
                          <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-slate-800">The Johnson Family</h4>
                          <p className="text-sm sm:text-base text-slate-600 mt-1">
                            Your love story is an inspiration to us all. May your marriage be blessed with joy, peace,
                            and endless adventures together!
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-8 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6 sm:mb-8">
            <h3 className="text-2xl sm:text-3xl font-serif italic mb-4">Candice & Oluwadamilare</h3>
            <p className="text-slate-300 mb-4 sm:mb-6">May 22nd, 2026</p>
            <Badge variant="outline" className="border-white text-white">
              #loveinDC26
            </Badge>
          </div>

          <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-6 mb-6 sm:mb-8">
            <Button variant="ghost" size="sm" className="text-white hover:text-slate-300">
              <Instagram className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Instagram
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:text-slate-300">
              <Twitter className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Twitter
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:text-slate-300">
              <Gift className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Gift Registry
            </Button>
          </div>

          <div className="border-t border-slate-700 pt-6 sm:pt-8">
            <p className="text-slate-400 text-xs sm:text-sm">Made with ❤️ for our special day</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
