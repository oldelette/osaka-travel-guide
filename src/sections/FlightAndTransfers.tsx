import { ExternalLink, MapPin, Plane } from '../icons';

const mapLink = (query: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

export default function FlightAndTransfers() {
  return (
    <>
      <section className="flight-band grid grid-cols-[auto_1fr_auto_1fr] items-center gap-7 max-[860px]:grid-cols-2 max-[860px]:gap-[18px]" aria-labelledby="flight-title">
        <div className="band-title" id="flight-title"><Plane size={18} /><span>FLIGHT DETAILS</span></div>
        <article className="flight-item">
          <span>去程 · 12.23（三）</span>
          <strong>TPE T1 <i>→</i> KIX T1</strong>
          <small>泰國越捷航空 VZ566 · 經濟艙 · 波音 737<br />起飛 06:05　抵達 09:30</small>
        </article>
        <div className="flight-route" aria-hidden="true">✦</div>
        <article className="flight-item">
          <span>回程 · 12.27（日）</span>
          <strong>KIX T1 <i>→</i> TPE T1</strong>
          <small>泰國越捷航空 VZ 567<br />起飛 12:00　抵達 14:15<br />表定飛行時間約 3 小時 15 分</small>
        </article>
        <div className="flight-foot">時間為當地時間；航班資訊以航空公司最新通知為準。</div>
      </section>

      <section className="airport-transfer-grid grid grid-cols-2 gap-4 max-[860px]:grid-cols-1" aria-label="台灣機場接送安排">
        <article className="transfer-card">
          <span className="section-label">12.23 · 出發接送</span>
          <h3>竹北 → 桃園機場</h3>
          <p><b>03:00 預約接送出發</b><br />從竹北住處搭乘已預約機場接送。<br />預約登記航班：VZ566<br />車型：Toyota Sienna（黑色）</p>
          <div className="transfer-meta"><span>車資 NT$1,600<br />夜間加成 NT$300</span><strong>合計 NT$1,900</strong></div>
        </article>
        <article className="transfer-card return-transfer">
          <span className="section-label">12.27 · 返台接駁</span>
          <h3>桃園機場 → 新竹高鐵站</h3>
          <p><b>預計 14:15 抵達桃園機場 T1</b><br />搭機場捷運至 A18，再轉台灣高鐵至新竹站。<br />302 新竹縣竹北市高鐵七路 6 號</p>
          <div className="transfer-meta"><span>機捷 A18 → 台灣高鐵新竹站</span><strong>班次、票價待確認</strong></div>
          <a href={mapLink('302新竹縣竹北市高鐵七路6號')} target="_blank" rel="noreferrer"><MapPin size={13} />查看新竹高鐵站 <ExternalLink size={12} /></a>
        </article>
      </section>
    </>
  );
}
