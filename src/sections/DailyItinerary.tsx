import { ExternalLink, MapPin, TrainFront } from '../icons';
import { days } from '../data/itinerary';
import { directionsUrl } from '../data/dayRoutes';
import Photo from '../components/Photo';
import StatusBadge from '../components/StatusBadge';

export default function DailyItinerary() {
  return (
    <div aria-label="每日行程">
      {days.map((day) => (
        <section className={`day-section day-${day.day}`} id={`day-${day.day}`} key={day.day} aria-labelledby={`day-title-${day.day}`}>
          <div className="day-heading">
            <div>
              <span className="section-label">DAY 0{day.day} <i>·</i> {day.date} {day.weekday}</span>
              <h2 id={`day-title-${day.day}`}>{day.theme}</h2>
              <p>{day.location} <span>／</span> OSAKA TRAVEL NOTES</p>
              <div className="day-quick-facts">
                <span><b>當日重點</b>{day.day === 1 ? '落地、寄放行李與大阪市區；依體力彈性取捨' : day.day === 2 ? '09:00 清水寺和服拍攝，12:00 與攝影師會合' : day.day === 3 ? 'USJ 全日，園區內依票券安排' : day.day === 4 ? '勝尾寺優先，市場與梅田行程視體力選擇' : '退房前往 KIX，當日不安排觀光'}</span>
                <span><b>主要移動</b>{day.day === 2 ? '大阪往返京都；市區景點分散，留意轉乘與移動緩衝' : day.day === 3 ? 'JR／園區步行' : day.day === 4 ? '公車與市區電車；分區安排' : day.day === 5 ? '南海電鐵／機場交通' : '大阪市區電車與步行'}</span>
                <a className="touch-link day-route-link" href={directionsUrl(day.day)} target="_blank" rel="noreferrer"><MapPin size={15}/>查看今日路線（Google Maps）<ExternalLink size={13}/></a>
              </div>
            </div>
            <span className="big-day" aria-hidden="true">0{day.day}</span>
          </div>
          <Photo label={day.image} className="day-photo" />
          <div className="day-note"><span>✳</span>{day.day === 1 && <StatusBadge status="important" />}<p>{day.note}</p></div>

          {day.day === 3 && (
            <aside className="usj-map-card" aria-label="日本環球影城官方地圖">
              <div className="usj-map-icon"><MapPin size={19} /></div>
              <div className="usj-map-copy">
                <span className="section-label">OFFICIAL PARK MAP</span>
                <h3>先看園區，再安排動線。</h3>
                <p>使用日本環球影城官方互動地圖，放大或移動查看園區、設施與餐飲位置。</p>
              </div>
              <a href="https://www.usj.co.jp/web/zh/tw/service-guide/parkmap" target="_blank" rel="noreferrer"><span>開啟官方互動地圖</span><ExternalLink size={15} /></a>
            </aside>
          )}

          <div className="timeline">
            {day.stops.map((stop, index) => (
              <article className={`stop ${stop.optional ? 'optional' : ''}`} key={`${day.day}-${stop.title}`}>
                <div className="stop-time">{stop.time}</div>
                <div className="stop-pin"><span /></div>
                <div className="stop-content">
                  <div className="stop-title"><h3>{stop.title}</h3>{stop.optional && <StatusBadge status="flexible" />}{day.day === 2 && (stop.time.startsWith('09:00') || stop.time.includes('12:00')) && <StatusBadge status="confirmed" />}</div>
                  <p>{stop.description}</p>
                  {stop.transit && <div className="transit"><TrainFront size={15} /><span>{stop.transit}</span></div>}
                  {stop.map && <a className="map-link" href={stop.map} target="_blank" rel="noreferrer"><MapPin size={14} />Google 地圖 <ExternalLink size={12} /></a>}
                </div>
                {index < day.stops.length - 1 && <div className="timeline-line" />}
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
