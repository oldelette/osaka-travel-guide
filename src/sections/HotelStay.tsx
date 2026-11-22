import { ExternalLink, MapPin } from 'lucide-react';
import HotelEntrancePhoto from '../components/HotelEntrancePhoto';

const hotelUrl = 'https://apt11.jp/en/stays/0c2842db-e0ed-4abd-8811-15882070ffd0';
const mapUrl = 'https://www.google.com/maps/search/?api=1&query=Apartment+Hotel+11+Dotonbori+8';

export default function HotelStay() {
  return (
    <section className="hotel-details" id="hotel" aria-labelledby="hotel-title">
      <div className="hotel-details-heading">
        <span className="section-label">STAY NOTES · 4 NIGHTS</span>
        <h2 id="hotel-title">住宿資訊與入住須知</h2>
        <p>Apartment Hotel 11 Dotonbori 8　／　2026.12.23 — 12.27</p>
      </div>
      <div className="hotel-details-layout grid grid-cols-[minmax(240px,.82fr)_minmax(0,1.55fr)] items-stretch gap-[22px] max-[860px]:grid-cols-1 max-[860px]:gap-[15px]">
        <div>
          <HotelEntrancePhoto />
          <a className="mt-3 inline-flex items-center gap-1 text-[9px] text-[#9d674d] no-underline hover:underline" href={mapUrl} target="_blank" rel="noreferrer"><MapPin size={13} />飯店地圖 <ExternalLink size={11} /></a>
        </div>
        <div className="hotel-details-copy">
          <div className="hotel-rule-grid grid grid-cols-2 gap-x-[19px] max-[860px]:grid-cols-1">
            <article><b>入住人數</b><p>每房最多 2 位住客；4 位旅人請核對訂房確認的房間數。</p></article>
            <article><b>入住與退房</b><p>入住時段為 12/23 16:00 至翌日 06:00；12/27 請於 10:00 前退房。住宿無接待櫃台。</p></article>
            <article><b>自助入住流程</b><p>住宿預計於抵達前三天寄送 Check-in Link。請先完成資料登錄；入住日 16:00 起可在連結查看房號與進房說明。</p></article>
            <article><b>護照資料</b><p>住宿要求所有登記住客提供護照資料影本並留存，請依入住連結指示辦理。</p></article>
            <article><b>年齡與清潔</b><p>入住旅客須年滿 18 歲；連住期間每 7 天常規清掃一次。</p></article>
          </div>
          <div className="hotel-tax-note">
            <b>大阪府住宿稅｜每人每晚</b>
            <p>未滿 ¥5,000：免稅　／　¥5,000–未滿 ¥15,000：¥200<br />¥15,000–未滿 ¥20,000：¥400　／　¥20,000 以上：¥500</p>
            <small>部分訂房方案未含住宿稅，可能於住宿另收。依官方及住宿提供資訊為準。</small>
            <a href="https://www.pref.osaka.lg.jp/o070070/toshimiryoku/syukuhakuzei/index.html" target="_blank" rel="noreferrer">大阪府住宿稅官方說明 <ExternalLink size={12} /></a>
          </div>
          <a className="inline-flex items-center gap-1 self-start text-[9px] text-[#9d674d] no-underline hover:underline" href={hotelUrl} target="_blank" rel="noreferrer">飯店官方交通與入住資訊 <ExternalLink size={11} /></a>
        </div>
      </div>
    </section>
  );
}
