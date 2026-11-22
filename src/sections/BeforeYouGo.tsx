import { ArrowUpRight, CalendarDays, MapPin, TrainFront } from '../icons';
import StatusBadge from '../components/StatusBadge';

export default function BeforeYouGo() {
  return (
    <section className="essentials" id="essentials" aria-labelledby="essentials-title">
      <div className="section-heading">
        <div><span className="section-label">BEFORE YOU GO</span><h2 id="essentials-title">出發前，確認這幾件事。</h2></div>
        <span className="heading-note">CHECK OFFICIAL UPDATES</span>
      </div>
      <div className="essential-grid grid grid-cols-3 gap-3 max-[860px]:grid-cols-2 max-[400px]:grid-cols-1">
        <article className="essential-card transit-card">
          <TrainFront aria-hidden="true" /><span>ARRIVAL ROUTE</span><h3>機場到飯店 <StatusBadge status="confirmed" /></h3>
          <p>南海電鐵至難波，轉千日前線到日本橋，再步行至住宿。</p>
          <a href="#transit-guide">查看逐步交通指南 <ArrowUpRight size={14} /></a>
        </article>
        <article className="essential-card">
          <MapPin aria-hidden="true" /><span>USJ · DEC 25</span><h3>先確認入園安排 <StatusBadge status="pending" /></h3>
          <p>門票、Express Pass、任天堂世界入場方式與優先設施，依官方公告及持有票種確認。</p>
          <a href="https://www.usj.co.jp/web/zh/tw" target="_blank" rel="noreferrer">日本環球影城官方網站 <ArrowUpRight size={14} /></a>
        </article>
        <article className="essential-card">
          <CalendarDays aria-hidden="true" /><span>SEASONAL · DEC 26</span><h3>冬季活動仍待公告 <StatusBadge status="pending" /></h3>
          <p>中之島燈飾與中央公會堂投影映射是不同活動，出發前分別確認日期與舉辦時間。</p>
          <small>市場休市日、店家營業時間也請另行確認。</small>
        </article>
      </div>
      <div className="stations flex flex-wrap items-center gap-5 max-[860px]:gap-3">
        <b>住宿周邊車站</b><span>日本橋 Nipponbashi</span><span>難波 Namba</span><span>長堀橋 Nagahoribashi</span>
        <small>實際出口與步行路線以飯店地址及地圖導航為準。</small>
      </div>
    </section>
  );
}
