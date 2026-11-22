import { ExternalLink, MapPin, TrainFront } from 'lucide-react';
import { restaurants } from '../data/restaurants';
import AirportRouteGuide from '../components/AirportRouteGuide';
import Photo from '../components/Photo';

const mapLink = (query: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

function RestaurantList() {
  return (
    <aside className="guide-panel food-panel" id="food" aria-labelledby="food-title">
      <span className="section-label">TASTE OF KANSAI · OSAKA FAVORITES</span>
      <h2 id="food-title">這趟想吃的店。</h2>
      <div className="food-photo-wrap"><Photo label="大阪街頭章魚燒" className="food-photo" /></div>
      <div className="restaurant-list border-t border-[var(--line)]">
        {restaurants.map((restaurant, index) => (
          <article className="restaurant-item grid grid-cols-[25px_minmax(0,1fr)_auto] items-start gap-[10px] py-3 max-[860px]:grid-cols-[22px_minmax(0,1fr)] max-[860px]:gap-2" key={restaurant.japaneseName}>
            <span className="restaurant-index">{String(index + 1).padStart(2, '0')}</span>
            <div className="restaurant-main">
              <div className="restaurant-heading"><b>{restaurant.name}</b><span>{restaurant.category} · {restaurant.area}</span></div>
              <small>{restaurant.japaneseName}</small>
              <p>{restaurant.hours}</p>
              {restaurant.note && <em>{restaurant.note}</em>}
            </div>
            <div className="restaurant-links">
              <a href={mapLink(`${restaurant.name} ${restaurant.area}`)} target="_blank" rel="noreferrer">地圖 <MapPin size={12} /></a>
              {restaurant.sourceUrl && <a href={restaurant.sourceUrl} target="_blank" rel="noreferrer">店舖資訊 <ExternalLink size={12} /></a>}
            </div>
          </article>
        ))}
      </div>
      <small className="food-caveat">營業資訊可能變動；2026 年 12 月節慶營業與臨時休息，請出發前再次確認。</small>
    </aside>
  );
}

export default function TravelNotes() {
  return (
    <section className="guide-grid grid grid-cols-2 gap-11 py-[15px] pb-[67px] max-[860px]:grid-cols-1 max-[860px]:gap-7 max-[860px]:pb-[45px]" aria-label="交通筆記與美食">
      <article className="guide-panel" id="transit-guide" aria-labelledby="transit-title">
        <span className="section-label">ARRIVAL & TRANSIT NOTES</span>
        <h2 id="transit-title">關西移動筆記</h2>
        <div className="guide-row"><b>機場 → 飯店</b><p>南海電鐵至難波，轉千日前線一站到日本橋，再由 7 號出口步行約 6–8 分鐘。</p></div>
        <div className="guide-row"><b>大阪市區</b><p>大阪 Metro 與 JR 可涵蓋多數行程；跨區移動時預留轉乘與步行時間。</p></div>
        <div className="guide-row"><b>大型行李</b><p>南海難波站轉乘通道較長，建議預留時間並找電梯；Rapi:t 為指定席，適合想先確保座位的旅人。</p></div>
        <AirportRouteGuide />
        <div className="mt-5 flex items-start gap-2 border-t border-[var(--line)] pt-4 text-[9px] leading-6 text-[#737c77]">
          <TrainFront className="mt-1 shrink-0 text-[var(--orange)]" size={15} />
          <p className="m-0">12/27 返台抵達桃園後，搭機場捷運至 A18，再轉台灣高鐵至新竹站；班次與票價出發前確認。</p>
        </div>
      </article>
      <RestaurantList />
    </section>
  );
}
