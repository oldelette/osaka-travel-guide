import { ExternalLink, MapPin, TrainFront } from '../icons';
import { restaurants } from '../data/restaurants';
import AirportRouteGuide from '../components/AirportRouteGuide';
import Photo from '../components/Photo';
import { directionsUrl } from '../data/dayRoutes';

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
        <div className="guide-row"><b>京都行程</b><p>清水寺和服拍攝與中午會合時間已固定；景點分散，金閣寺依拍攝結束時間及當日交通彈性取捨。</p></div>
        <div className="guide-row"><b>大型行李</b><p>四人帶大型行李時，可選 Rapi:t 指定席預留座位；若轉乘 Metro 不便，也可從南海難波直接搭計程車到住宿。</p></div>
        <AirportRouteGuide />
        <div className="other-routes">
          <h3>其他每日移動</h3>
          <a href={directionsUrl(2)} target="_blank" rel="noreferrer"><span><b>DAY 02 · 大阪往返京都</b><small>清水寺 → 拍攝會合點 → 金閣寺；京都市內需轉乘，依時間彈性取捨</small></span><MapPin size={17}/></a>
          <a href={directionsUrl(3)} target="_blank" rel="noreferrer"><span><b>DAY 03 · 住宿 → USJ</b><small>依 Google Maps 當日列車建議前往 Universal City，回程同路線返回</small></span><MapPin size={17}/></a>
          <a href={directionsUrl(4)} target="_blank" rel="noreferrer"><span><b>DAY 04 · 勝尾寺與市區</b><small>先去勝尾寺；市場擇一，梅田與中之島依體力安排</small></span><MapPin size={17}/></a>
          <a href={directionsUrl(5)} target="_blank" rel="noreferrer"><span><b>DAY 05 · 住宿 → 關西機場</b><small>預計 08:00–08:15 離開住宿，目標 09:00–09:30 抵達航廈</small></span><MapPin size={17}/></a>
        </div>
        <div className="mt-5 flex items-start gap-2 border-t border-[var(--line)] pt-4 text-[9px] leading-6 text-[#737c77]">
          <TrainFront className="mt-1 shrink-0 text-[var(--orange)]" size={15} />
          <p className="m-0">12/27 返台抵達桃園後，搭機場捷運至 A18，再轉台灣高鐵至新竹站；班次與票價出發前確認。</p>
        </div>
      </article>
      <RestaurantList />
    </section>
  );
}
