import { useEffect, useRef } from 'react'

// Generated pebble texture, used until a real photo of the material is available.
function rng(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
const COLORS = ['#8c8277', '#a39887', '#6e675f', '#b5a993', '#5d5a55', '#9b8a73', '#c2b8a6']

export function PebbleTexture({ seed = 7 }: { seed?: number }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current!
    const draw = () => {
      const r = c.getBoundingClientRect()
      const dpr = Math.min(2, devicePixelRatio || 1)
      const w = (c.width = Math.round(r.width * dpr))
      const h = (c.height = Math.round(r.height * dpr))
      if (!w || !h) return
      const ctx = c.getContext('2d')!
      const R = rng(seed)
      ctx.fillStyle = '#2d2a27'
      ctx.fillRect(0, 0, w, h)
      const n = (w * h) / (260 * dpr * dpr)
      for (let i = 0; i < n; i++) {
        const x = R() * w, y = R() * h, rad = (7 + R() * 13) * dpr, e = 0.62 + R() * 0.33, rot = R() * 3.14
        ctx.fillStyle = 'rgba(0,0,0,.45)'
        ctx.beginPath(); ctx.ellipse(x + rad * 0.15, y + rad * 0.2, rad, rad * e, rot, 0, 7); ctx.fill()
        ctx.fillStyle = COLORS[(R() * COLORS.length) | 0]
        ctx.beginPath(); ctx.ellipse(x, y, rad, rad * e, rot, 0, 7); ctx.fill()
        const g = ctx.createRadialGradient(x - rad * 0.35, y - rad * 0.35, 0, x, y, rad * 1.1)
        g.addColorStop(0, 'rgba(255,255,255,.42)'); g.addColorStop(0.45, 'rgba(255,255,255,0)'); g.addColorStop(1, 'rgba(0,0,0,.35)')
        ctx.fillStyle = g; ctx.fill()
      }
    }
    draw()
    const ro = new ResizeObserver(draw)
    ro.observe(c)
    return () => ro.disconnect()
  }, [seed])
  return <canvas ref={ref} className="media" aria-hidden="true" />
}
