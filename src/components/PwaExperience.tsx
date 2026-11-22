import { useEffect, useRef, useState } from 'react';
import { registerSW } from 'virtual:pwa-register';

interface InstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export default function PwaExperience() {
  const [online, setOnline] = useState(() => navigator.onLine);
  const [showOnline, setShowOnline] = useState(false);
  const [installed, setInstalled] = useState(() => window.matchMedia('(display-mode: standalone)').matches || Boolean((navigator as Navigator & { standalone?: boolean }).standalone));
  const [installPrompt, setInstallPrompt] = useState<InstallPromptEvent | null>(null);
  const [guideOpen, setGuideOpen] = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const updateApp = useRef<((reloadPage?: boolean) => Promise<void>) | null>(null);
  const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);

  useEffect(() => {
    const goOnline = () => {
      setOnline(true);
      setShowOnline(true);
      window.setTimeout(() => setShowOnline(false), 3500);
    };
    const goOffline = () => { setOnline(false); setShowOnline(false); };
    const onInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as InstallPromptEvent);
    };
    const onInstalled = () => { setInstalled(true); setInstallPrompt(null); };

    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);
    window.addEventListener('beforeinstallprompt', onInstallPrompt);
    window.addEventListener('appinstalled', onInstalled);
    updateApp.current = registerSW({
      immediate: true,
      onNeedRefresh() { setUpdateAvailable(true); },
    });
    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
      window.removeEventListener('beforeinstallprompt', onInstallPrompt);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  const startInstall = async () => {
    if (installPrompt) {
      await installPrompt.prompt();
      const result = await installPrompt.userChoice;
      if (result.outcome === 'accepted') setInstalled(true);
      setInstallPrompt(null);
    }
  };

  return <>
    {(!online || showOnline) && <div className={`network-indicator ${online ? 'network-online' : ''}`} role="status" aria-live="polite">
      {online ? '網路已恢復' : '目前離線中，部分功能可能無法使用；行程與已快取圖片仍可瀏覽。地圖等外部服務需要網路。'}
    </div>}
    {!installed && <button className="install-guide-trigger" type="button" onClick={() => setGuideOpen(true)}>安裝指南</button>}
    {guideOpen && <div className="pwa-modal-backdrop" onClick={() => setGuideOpen(false)}>
      <section className="pwa-modal" role="dialog" aria-modal="true" aria-labelledby="install-guide-title" onClick={(event) => event.stopPropagation()}>
        <button className="pwa-modal-close" type="button" onClick={() => setGuideOpen(false)} aria-label="關閉">×</button>
        <span className="section-label">TAKE OSAKA WITH YOU</span>
        <h2 id="install-guide-title">將旅遊指南加入主畫面</h2>
        {ios ? <p>在 Safari 開啟本頁，點選「分享」圖示，再選「加入主畫面」。</p> : installPrompt ? <p>安裝後可從主畫面或桌面開啟，已載入的行程和圖片也能離線瀏覽。</p> : <p>在 Chrome 網址列旁選擇安裝圖示，或開啟瀏覽器選單並點選「安裝 Osaka Guide」。已安裝後可直接從主畫面或應用程式開啟。</p>}
        {!ios && installPrompt && <button className="pwa-primary-action" type="button" onClick={() => void startInstall()}>安裝 Osaka Guide</button>}
        <small>首次使用時請先連線開啟一次，讓行程頁面與重要景點圖片完成快取。</small>
      </section>
    </div>}
    {updateAvailable && <div className="update-notice" role="status">
      <span>有新版本可用</span>
      <button type="button" onClick={() => void updateApp.current?.(true)}>更新並重新載入</button>
      <button type="button" className="update-dismiss" onClick={() => setUpdateAvailable(false)} aria-label="稍後更新">稍後</button>
    </div>}
  </>;
}
