// All business data lives here: edit prices, phones and zones in this file only.

export const COMPANY = {
  name: 'Экспресс БС',
  city: 'Астана',
  years: 13,
  hours: 'ежедневно 8:00–20:00',
  phones: [
    { display: '+7 (777) 149-76-27', tel: '+77771497627' },
    { display: '+7 (705) 364-65-47', tel: '+77053646547' },
  ],
  whatsapp: '77771497627',
}

export type Material = {
  id: string
  cat: 'Песок' | 'Щебень' | 'Галька'
  name: string
  spec: string
  use: string
  /** fraction, mm */
  fr: [number, number]
  /** bulk density, t/m³ */
  density: number
  /** ₸ per tonne */
  price: number
  /** photo in /public/photos; missing → generated texture */
  photo?: string
}

// TODO: prices are placeholders, replace with the real price list.
export const MATERIALS: Material[] = [
  { id: 'fine', cat: 'Песок', name: 'Песок мелкий', spec: 'Карьерный, Мк 1,5–2,0', use: 'Штукатурка, кладка, отсыпка', fr: [0.1, 1.25], density: 1.45, price: 3200, photo: 'sand-fine' },
  { id: 'frac', cat: 'Песок', name: 'Песок фракционный', spec: 'Мытый, 0–5 мм', use: 'Бетон, стяжка, ЖБИ', fr: [0, 5], density: 1.55, price: 4500, photo: 'sand-frac' },
  { id: 'washed', cat: 'Песок', name: 'Песок мытый', spec: 'Сеяный, 0–2,5 мм', use: 'Растворы, песочницы, газоны', fr: [0, 2.5], density: 1.5, price: 3900, photo: 'sand-hand2' },
  { id: 's520', cat: 'Щебень', name: 'Щебень 5–20', spec: 'Гравийный, М1000', use: 'Бетон, фундамент', fr: [5, 20], density: 1.4, price: 7500, photo: 'gravel-hand' },
  { id: 's2040', cat: 'Щебень', name: 'Щебень 20–40', spec: 'Гравийный, М1000', use: 'Дороги, дренаж, основания', fr: [20, 40], density: 1.42, price: 7000, photo: 'gravel' },
  { id: 'pebble', cat: 'Галька', name: 'Галька', spec: 'Окатанная, 20–40 мм', use: 'Дренаж, ландшафт, декор', fr: [20, 40], density: 1.65, price: 8500 },
]

export type Zone = { id: string; name: string; tripPrice: number; time: string }

// One trip = one 25 t dump truck. TODO: confirm real delivery prices.
export const ZONES: Zone[] = [
  { id: 'city', name: 'Астана, в черте города', tripPrice: 28000, time: '2–3 ч' },
  { id: 'sub', name: 'Пригород до 20 км', tripPrice: 36000, time: '3–4 ч' },
  { id: 'reg', name: 'Область до 60 км', tripPrice: 52000, time: 'в день заказа' },
  { id: 'self', name: 'Самовывоз с карьера', tripPrice: 0, time: 'от 30 мин' },
]

export const TRUCK_T = 25

export const fmt = (n: number) => Math.round(n).toLocaleString('ru-RU') + ' ₸'
export const fmtN = (n: number) => Math.round(n).toLocaleString('ru-RU')

export function quote(m: Material, qty: number, unit: 't' | 'm3', z: Zone) {
  const tons = unit === 't' ? qty : qty * m.density
  const trips = z.tripPrice ? Math.ceil(tons / TRUCK_T) : 0
  const material = tons * m.price
  const delivery = trips * z.tripPrice
  return { tons, trips, material, delivery, total: material + delivery }
}

export const waLink = (text: string) => `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(text)}`
