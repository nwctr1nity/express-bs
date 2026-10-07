import { useState, type FormEvent } from 'react'
import { Calculator } from './Calculator'
import { COMPANY, MATERIALS, fmtN, waLink } from './data'
import { PebbleTexture } from './Texture'

const [P1] = COMPANY.phones
const P = import.meta.env.BASE_URL

function Logo() {
  return (
    <span className="logo" aria-label={COMPANY.name}>
      <b>Экспресс</b>
      <i>БС</i>
    </span>
  )
}

function Phones({ big = false }: { big?: boolean }) {
  return (
    <div className={big ? 'phones big' : 'phones'}>
      {COMPANY.phones.map((p) => (
        <a key={p.tel} href={`tel:${p.tel}`}>{p.display}</a>
      ))}
    </div>
  )
}

function ContactForm() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const submit = (e: FormEvent) => {
    e.preventDefault()
    const text = `Здравствуйте! Меня зовут ${name || '—'}, телефон ${phone || '—'}. Перезвоните, пожалуйста, хочу заказать материал.`
    window.open(waLink(text), '_blank', 'noopener')
  }
  return (
    <form className="form" onSubmit={submit}>
      <input className="field" id="f-name" placeholder="Имя" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
      <input className="field" id="f-phone" placeholder="Телефон" type="tel" autoComplete="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} />
      <button className="btn btn-acc" type="submit">Перезвоните мне</button>
      <p className="note">Заявка откроется в WhatsApp. Нажимая кнопку, вы соглашаетесь на обработку персональных данных.</p>
    </form>
  )
}

export default function App() {
  const [materialId, setMaterialId] = useState(MATERIALS[1].id)
  const pick = (id: string) => {
    setMaterialId(id)
    document.getElementById('calc')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <div className="page">
      <div className="grid-bg" aria-hidden="true" />
      <div className="wrap">
        <header className="nav">
          <a href="#top" aria-label="На главную"><Logo /></a>
          <nav className="links" aria-label="Разделы">
            <a href="#materials">Материалы</a>
            <a href="#how">Как заказать</a>
            <a href="#contacts">Контакты</a>
          </nav>
          <div className="right">
            <a className="hide-s" href={`tel:${P1.tel}`}>{P1.display}</a>
            <a className="btn btn-small btn-acc" href={waLink('Здравствуйте! Хочу заказать материал.')} target="_blank" rel="noopener">WhatsApp</a>
          </div>
        </header>

        <main id="top">
          <section className="bento" aria-label="Главное">
            <div className="glass tile s2x2 t-hero">
              <img className="hero-img" src={P + "photos/hero.webp"} alt="Песок на карьере" fetchPriority="high" />
              <div className="hero-shade" />
              <span className="eyebrow">Нерудные материалы · {COMPANY.city}</span>
              <h1>Узнайте цену заказа до звонка менеджеру</h1>
              <p>Песок, щебень и галька самосвалами от 10 до 25 тонн. Выберите материал, объём и адрес: калькулятор сразу посчитает материал, рейсы и доставку.</p>
              <div className="acts">
                <a className="btn btn-acc" href="#materials">Материалы</a>
                <a className="btn btn-ghost" href={`tel:${P1.tel}`}>Позвонить</a>
              </div>
            </div>
            <div className="glass tile s2x2">
              <Calculator materialId={materialId} onMaterial={setMaterialId} />
            </div>
            <div className="glass tile t-num"><b>{COMPANY.years} лет</b><span>на рынке нерудных материалов</span></div>
            <div className="glass tile t-num"><b>от 30 мин</b><span>отгрузка с карьера после оплаты</span></div>
            <div className="glass tile t-photo">
              <img className="media" src={P + "photos/tile-sand-sm.webp"} alt="Мытый фракционный песок крупным планом" loading="lazy" />
              <span className="lbl">Песок мытый 0–5 мм</span>
            </div>
            <div className="glass tile t-num"><b>Kaspi · НДС</b><span>наличные, Kaspi, безнал для юрлиц</span></div>
          </section>

          <section className="sec" id="materials">
            <div className="head">
              <h2>Материалы</h2>
              <span className="mono mut">цена за тонну, с НДС</span>
            </div>
            <div className="strip">
              {MATERIALS.map((m, i) => (
                <button type="button" className="glass card" key={m.id} onClick={() => pick(m.id)} aria-label={`${m.name}: рассчитать стоимость`}>
                  <div className="tx">
                    {m.photo ? <img className="media" src={`${P}photos/${m.photo}-sm.webp`} alt="" loading="lazy" /> : <PebbleTexture seed={50 + i} />}
                  </div>
                  <div className="bd">
                    <span className="mono acc">{m.cat} · {String(m.fr[0]).replace('.', ',')}–{String(m.fr[1]).replace('.', ',')} мм</span>
                    <h3>{m.name}</h3>
                    <span className="mut small">{m.spec}. {m.use}.</span>
                    <span className="pr">от {fmtN(m.price)} ₸<small>/т</small></span>
                    <span className="more">Рассчитать →</span>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <section className="sec" id="how">
            <div className="head"><h2>Как сделать заказ</h2></div>
            <ol className="steps">
              <li className="glass"><h3>Заявка</h3><p>Звонок, WhatsApp или форма на сайте. Уточним задачу и подберём фракцию.</p></li>
              <li className="glass"><h3>Расчёт</h3><p>Фиксируем цену материала и доставки, выставляем счёт или ссылку Kaspi.</p></li>
              <li className="glass"><h3>Отгрузка</h3><p>Грузим на карьере и взвешиваем машину на автовесах.</p></li>
              <li className="glass"><h3>Доставка</h3><p>Самосвал выгружает на объекте, вы получаете накладную и талон взвешивания.</p></li>
            </ol>
          </section>

          <section className="sec" id="contacts">
            <div className="contact">
              <div className="glass tile t-call">
                <img className="media" src={P + "photos/pile-sm.webp"} alt="" loading="lazy" />
                <div className="call-shade" />
                <span className="eyebrow">Отдел продаж · {COMPANY.hours}</span>
                <Phones big />
                <p className="mut">{COMPANY.city} и область</p>
              </div>
              <div className="glass tile">
                <h2 className="form-h">Перезвоним за 10 минут</h2>
                <ContactForm />
              </div>
            </div>
          </section>
        </main>

        <footer className="foot">
          <Logo />
          <span className="mut">© {new Date().getFullYear()} {COMPANY.name}. Песок, щебень, галька с доставкой.</span>
          <Phones />
        </footer>
      </div>
    </div>
  )
}
