# Pomodoro Timer（集中タイマー）

A full-screen countdown timer for focused study and work sessions, built as a single-page web app.
It runs in the browser and can be added to the home screen of iPhone, iPad and Android to work like a regular app — including offline.

勉強や作業に集中するための、全画面のカウントダウンタイマーです。1ページだけのウェブアプリで、ブラウザで動くほか、iPhone・iPad・Android のホーム画面に追加すれば通常のアプリのように（オフラインでも）使えます。

**Live / 公開ページ:** https://szm23269.github.io/pomodoro-timer/

---

## Features / 主な機能

| English | 日本語 |
|---|---|
| Add time with **10 min / 5 min / 1 min / 30 sec / 10 sec** buttons. | **10分・5分・1分・30秒・10秒** のボタンで時間を加算。 |
| **Swipe each digit** up or down to set the time. Digits carry over (e.g. 00:59 → 01:00). | **数字の各桁を上下にスワイプ**して時間を設定。上の桁へ繰り上がります（例：00:59 → 01:00）。 |
| A **20-segment meter** under the digits drains from right to left, shrinking and fading linearly. | 数字の下の **20本のメーター**が右から左へ、縮みながら透明になって一定速度で減っていきます。 |
| White screen while setting, **dark screen while running**, bright flash when finished. | 設定中は白、**計測中は黒**、終了時は明るく光ります。 |
| A **bell** rings at 00:00, then the same duration is loaded again so you can repeat it. | 00:00 で**ベル**が鳴り、同じ時間が再セットされるのでそのまま繰り返せます。 |
| **History** of the last 20 durations, scrollable sideways. Tap one to load it. | 直近20回分の**履歴**を横スクロールで表示。タップでその時間をセット。 |
| The screen stays awake while the timer runs. | 計測中は画面がスリープしません。 |
| Help panel (**?** button) shown in Japanese or English depending on the device language. | **?** ボタンの使い方パネルは、端末の言語設定に合わせて日本語／英語を自動で切り替え。 |

Maximum time is **99:59**. / 設定できる最大時間は **99:59** です。

---

## Add to Home Screen / ホーム画面に追加

### iPhone / iPad
1. Open the page in **Safari**. / **Safari** でページを開く。
2. Tap the **Share** button. / **共有**ボタンをタップ。
3. Choose **Add to Home Screen**. / **ホーム画面に追加** を選ぶ。
4. Tap **Add**. / **追加** をタップ。

> Sound does not play while the silent switch is on.
> 消音スイッチがオンだと音は鳴りません。

### Android
1. Open the page in **Chrome**. / **Chrome** でページを開く。
2. Tap the **⋮ menu** at the top right. / 右上の **︙メニュー** をタップ。
3. Choose **Add to Home screen** or **Install app**. / **ホーム画面に追加** または **アプリをインストール** を選ぶ。
4. Confirm with **Install** (or **Add**). / **インストール**（または **追加**）で確定。

---

## Known limitations / 制限事項

- **The timer only runs while the app is open on screen.** Browsers pause web pages in the background, so the bell cannot ring if you switch apps or lock the device.
  **画面に表示している間だけ動きます。** バックグラウンドのページはブラウザに止められるため、別のアプリに切り替えたり画面をロックしたりするとベルは鳴りません。
- Notifications are not supported. / 通知には対応していません。
- History is stored only on that device and browser (`localStorage`). / 履歴はその端末・そのブラウザの中だけに保存されます（`localStorage`）。

---

## Files / ファイル構成

| File | English | 日本語 |
|---|---|---|
| `index.html` | The whole app: layout, styles and logic in one file. | アプリ本体。レイアウト・デザイン・動作をすべて1ファイルに収めています。 |
| `sw.js` | Service worker. Caches the app so it starts offline. | Service Worker。アプリをキャッシュしてオフラインでも起動できるようにします。 |
| `manifest.json` | App name, icons and full-screen settings for home-screen install. | ホーム画面に追加したときのアプリ名・アイコン・全画面表示の設定。 |
| `icon-192.png`, `icon-512.png` | Home-screen icons. | ホーム画面用のアイコン。 |

---

## Releasing an update / 更新のリリース手順

GitHub Pages publishes whatever is on the `main` branch, so replacing the files **is** the release.
GitHub Pages は `main` ブランチの内容をそのまま公開するので、ファイルを差し替えることがリリースになります。

1. **Bump the version in two places — they must match.**
   **バージョン番号を2か所で上げる（必ず同じ番号にする）。**
   - `sw.js` line 1: `const CACHE = 'study-timer-vNN';`
   - `index.html`: `const APP_VERSION = 'vNN';` (shown next to the **?** button / **?** ボタンの左に表示されます)

   If the cache name is not changed, devices keep showing the old version.
   キャッシュ名を変えないと、端末には古いバージョンが表示され続けます。

2. Upload the changed files to `main` (**Add file › Upload files**, or `git push`).
   変更したファイルを `main` にアップロード（**Add file › Upload files** または `git push`）。

3. Wait for the green check in the **Actions** tab (about 1–2 minutes).
   **Actions** タブで緑のチェックが付くまで待つ（1〜2分）。

4. On each device, reload the page twice, or fully close and reopen the home-screen app. Check that the version label shows the new number.
   各端末でページを2回再読み込み、またはホーム画面のアプリを完全に終了して開き直す。バージョン表示が新しい番号になっていれば反映済みです。

---

## Customising / カスタマイズの目安

All values are in `index.html`. / すべて `index.html` 内で変更できます。

| What / 内容 | Where / 場所 |
|---|---|
| Number of meter segments / メーターの本数 | `const SEGMENTS = 20;` and `repeat(20,1fr)` in `.bar` |
| Meter colours / メーターの色 | `.seg:nth-child(...)` rules (`--seg`) |
| Swipe sensitivity / スワイプの感度 | `const STEP_PX = 22;` (pixels per step / 1目盛りあたりのピクセル数) |
| Maximum time / 最大時間 | `const MAX = 99*60 + 59;` |
| Bell sound / ベルの音 | `function bell()` — frequencies and decay / 周波数と減衰時間 |
| Add-time buttons / 加算ボタン | `data-add="…"` (seconds / 秒) in `.adders` |
| History size / 履歴の件数 | `.slice(0,20)` in `pushHistory()` |
