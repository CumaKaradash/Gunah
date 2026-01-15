"use client"

import { useEffect, useRef } from "react"

export function StarsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setCanvasSize()
    window.addEventListener("resize", setCanvasSize)

    // Create stars
    const stars: Array<{
      x: number
      y: number
      size: number
      opacity: number
      speed: number
    }> = []

    const createStars = () => {
      const starCount = 200
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2,
          opacity: Math.random() * 0.5 + 0.2,
          speed: Math.random() * 0.05 + 0.01,
        })
      }
    }
    createStars()

    // Animation
    let animationFrameId: number
    const animate = () => {
      ctx.fillStyle = "#0a0f1e"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      stars.forEach((star) => {
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(148, 163, 184, ${star.opacity})`
        ctx.fill()

        // Twinkle effect
        star.opacity += star.speed
        if (star.opacity > 0.7 || star.opacity < 0.1) {
          star.speed = -star.speed
        }
      })

      animationFrameId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener("resize", setCanvasSize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full" style={{ zIndex: 0 }} />
}
