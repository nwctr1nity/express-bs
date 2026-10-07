import { useMemo, useState } from 'react'
import { MATERIALS, ZONES, fmt, fmtN, quote, waLink } from './data'

export function Calculator({ materialId, onMaterial }: { materialId: string; onMaterial: (id: string) => void }) {
  const [qty, setQty] = useState(20)
  const [unit, setUnit] = useState<'t' | 'm3'>('t')
  const [zoneId, setZoneId] = useState(ZONES[0].id)
  const m = MATERIALS.find((x) => x.id === materialId) ?? MATERIALS[0]
  const z = ZONES.find((x) => x.id === zoneId)!
  const q = useMemo(() => quote(m, Math.max(0, qty || 0), unit, z), [m, qty, unit, z])

  const order = waLink(
    `Здравствуйте! Хочу заказать: ${m.name} (${m.spec}), ${fmtN(qty)} ${unit === 't' ? 'т' : 'м³'}.\n` +
      `Доставка: ${z.name}.\nРасчёт на сайте: ${fmt(q.total)}.`,
  )

  return (
    <div className="calc" id="calc">
      <div className="calc-head">
        <b>Калькулятор заказа</b>
        <span className="mono mut">цены с НДС</span>
      </div>
      <div>
        <label htmlFor="c-mat">Материал</label>
        <select className="field" id="c-mat" value={m.id} onChange={(e) => onMaterial(e.target.value)}>
          {MATERIALS.map((x) => (
            <option key={x.id} value={x.id}>
              {x.name}, {x.spec}
            </option>
          ))}
        </select>
      </div>
      <div className="row2">
        <div>
          <label htmlFor="c-qty">Объём</label>
          <input className="field" id="c-qty" type="number" min={1} inputMode="decimal" value={qty}
            onChange={(e) => setQty(Number(e.target.value))} />
        </div>
        <div>
          <span className="label" aria-hidden="true">&nbsp;</span>
          <div className="seg" role="group" aria-label="Единицы">
            <button type="button" aria-pressed={unit === 't'} onClick={() => setUnit('t')}>т</button>
            <button type="button" aria-pressed={unit === 'm3'} onClick={() => setUnit('m3')}>м³</button>
          </div>
        </div>
      </div>
      <div>
        <label htmlFor="c-zone">Куда везти</label>
        <select className="field" id="c-zone" value={zoneId} onChange={(e) => setZoneId(e.target.value)}>
          {ZONES.map((x) => (
            <option key={x.id} value={x.id}>{x.name}</option>
          ))}
        </select>
      </div>
      <div className="calc-sum">
        <div><span className="mut">Материал{unit === 'm3' ? `, ${fmtN(q.tons)} т` : ''}</span><span>{fmt(q.material)}</span></div>
        <div>
          <span className="mut">Доставка{z.tripPrice ? `, ${q.trips} рейс.` : ''}</span>
          <span>{z.tripPrice ? fmt(q.delivery) : 'самовывоз'}</span>
        </div>
      </div>
      <div className="calc-total" aria-live="polite">
        <span>Итого</span>
        <b>{fmt(q.total)}</b>
      </div>
      <a className="btn btn-acc" href={order} target="_blank" rel="noopener">Заказать в WhatsApp</a>
    </div>
  )
}
