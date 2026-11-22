# Osaka Travel Guide 2026

繁體中文的大阪、京都 5 天 4 夜數位旅遊手冊，使用 React、Vite、TypeScript、Tailwind CSS 與 Lucide React。

## 本機開發

```bash
npm install
npm run dev
```

正式建置與預覽：

```bash
npm run build
npm run preview
```

Vite 的部署 base 已設為 `/osaka-travel-guide/`。

## GitHub Pages 部署

將程式推送到 `main` 分支後，`.github/workflows/deploy.yml` 會建置並部署 `dist`。首次設定請至 GitHub 專案 **Settings → Pages → Build and deployment → Source** 選擇 **GitHub Actions**。預期網址為 `https://<github-username>.github.io/osaka-travel-guide/`。

GitHub Actions 使用 `npm ci`，請將專案附帶的 `package-lock.json` 一併提交，讓 CI 使用鎖定的依賴版本。

## 圖片素材

首頁、五日行程與美食區已加入 Wikimedia Commons 開放授權照片，網站直接使用本地素材，不依賴外部圖片伺服器。作者、授權與來源頁列在 `public/images/ATTRIBUTION.md`，網站照片旁也可查看署名。若要替換或追加照片，請放入對應目錄並同步更新 `src/data/photos.ts`；圖片應提供描述性替代文字與授權來源。

```text
public/images/
  cover/
  day1/
  day2/
  day3/
  day4/
  day5/
  food/
    hotel/entrance.jpg.png
```

建議每個行程頁使用橫式、相近比例照片。不要將有授權限制的書籍封面或他人照片直接放進網站。

## PDF / 列印

網站右上方按鈕會開啟瀏覽器列印對話框。選擇目的地 **另存為 PDF / Save as PDF**，紙張選 A4；若要保留底色與照片，可在列印設定開啟背景圖形。頁面另有 A4 列印樣式，會隱藏導覽與互動控制。

## 行程資料

行程資料獨立放在 `src/data/itinerary.ts`，型別定義在 `src/types.ts`。季節活動、票價、營業時間、交通班次等可能變動的資訊以待確認方式呈現，出發前請查詢官方公告。

頁面依用途拆分在 `src/sections/`，共用導覽、照片與機場交通元件位於 `src/components/`。主要版面使用 Tailwind utility classes；雜誌風格的細節與列印樣式保留在 `src/styles.css`。美食店家資料放在 `src/data/restaurants.ts`。

行前清單會保存在目前瀏覽器的 local storage，重新整理頁面後仍會保留勾選狀態。
