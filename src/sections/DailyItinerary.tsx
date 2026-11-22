import { ExternalLink, MapPin, TrainFront } from 'lucide-react';
import { days } from '../data/itinerary';
import Photo from '../components/Photo';

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
            </div>
            <span className="big-day" aria-hidden="true">0{day.day}</span>
          </div>
          <Photo label={day.image} className="day-photo" />
          <div className="day-note"><span>✳</span><p>{day.note}</p></div>

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
                  <div className="stop-title"><h3>{stop.title}</h3>{stop.optional && <small>OPTIONAL</small>}</div>
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
