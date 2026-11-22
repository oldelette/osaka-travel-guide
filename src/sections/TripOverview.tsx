import { ArrowDown, ArrowUpRight, CalendarDays, CheckSquare, Compass, Hotel, Ticket, TrainFront, Utensils } from '../icons';
import { days } from '../data/itinerary';
import Photo from '../components/Photo';

function todayDayNumber() {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Taipei', month: '2-digit', day: '2-digit' }).formatToParts(new Date());
  const month = parts.find((part) => part.type === 'month')?.value;
  const day = parts.find((part) => part.type === 'day')?.value;
  return days.find((plan) => plan.date === `${month}.${day}`)?.day;
}

export default function TripOverview() {
  return (
    <>
      <section className="hero relative grid min-h-[545px] grid-cols-[43%_57%] py-[58px] pb-[42px] max-[860px]:min-h-0 max-[860px]:grid-cols-1 max-[860px]:py-[34px] max-[860px]:pb-[48px]" id="overview">
        <div className="hero-copy">
          <div className="eyebrow"><span /> WINTER JOURNEY · JAPAN</div>
          <p className="hero-kicker">一場冬日關西漫遊</p>
          <h1>大阪<span>，</span><br />慢慢走。</h1>
          <p className="hero-sub">5 天 4 夜經典之旅</p>
          <div className="hero-meta">
            <span><CalendarDays size={16} />2026.12.23 — 12.27</span>
            <span><Compass size={16} />4 位旅人</span>
          </div>
          <a href="#day-1" className="text-link">開始閱讀行程 <ArrowDown size={15} /></a>
        </div>
        <div className="hero-art relative px-[35px] py-[6px] pb-[30px] max-[860px]:px-0 max-[860px]:pb-[25px]">
          <Photo label="道頓堀夜景・大阪城市風光" className="hero-photo h-[410px] max-[860px]:h-[290px] max-[400px]:h-[250px]" />
          <div className="vertical-note">OSAKA · KYOTO · WINTER 2026</div>
          <span className="hero-index">01 <i>—</i> 05</span>
        </div>
        <div className="hero-caption">KANSAI, JAPAN <span>34°40′N 135°30′E</span></div>
      </section>

      <section className="intro-strip grid grid-cols-[1fr_1.2fr_.75fr] items-center gap-10 py-[45px] max-[860px]:grid-cols-2 max-[860px]:gap-[17px] max-[860px]:py-8 max-[400px]:grid-cols-1">
        <div><span className="section-label">THE JOURNEY</span><h2>把五天，留給<br /><em>大阪與京都。</em></h2></div>
        <p>從道頓堀的霓虹夜色，到京都巷弄的冬日晨光。行程留有餘白，按當天體力與預約安排調整即可。</p>
        <div className="trip-facts"><span><b>05</b>DAYS</span><span><b>04</b>NIGHTS</span><span><b>02</b>CITIES</span></div>
      </section>

      <section className="overview-section" aria-labelledby="overview-title">
        <div className="section-heading">
          <div><span className="section-label">AT A GLANCE</span><h2 id="overview-title">五日行程速覽</h2></div>
          <span className="heading-note">DEC 23 — DEC 27</span>
        </div>
        <div className="day-strip grid grid-cols-5 max-[860px]:grid-cols-2">
          {days.map((day) => (
            <a key={day.day} href={`#day-${day.day}`} className="day-teaser">
              <span>DAY 0{day.day} · {day.date}</span><b>{day.theme}</b><small>{day.location}</small><ArrowUpRight size={17} />
            </a>
          ))}
        </div>
      </section>

      <nav className="quick-access" aria-label="快速入口">
        <div className="quick-access-heading"><span className="section-label">QUICK ACCESS</span><h2>旅途中，快速找到需要的資訊。</h2></div>
        <div className="quick-access-grid">
          {[
            ...(todayDayNumber() ? [{ href: `#day-${todayDayNumber()}`, label: '今日行程', icon: CalendarDays }] : []),
            { href: '#transit-guide', label: '交通攻略', icon: TrainFront },
            { href: '#hotel', label: '住宿資訊', icon: Hotel },
            { href: '#essentials', label: '門票與預約', icon: Ticket },
            { href: '#food', label: '美食清單', icon: Utensils },
            { href: '#checklist', label: '出發清單', icon: CheckSquare },
          ].map(({ href, label, icon: Icon }) => <a href={href} key={label}><Icon size={17} /><span>{label}</span><ArrowUpRight size={14} /></a>)}
        </div>
      </nav>
    </>
  );
}
