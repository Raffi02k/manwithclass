# Man With Class | MediaMagnet

## Status: första testversionen

Det här paketet innehåller en fungerande webbversion och återskapade projektfiler.
Den ursprungliga projektmappen från det förra bygget fanns inte kvar i arbetsmiljön.
React-moduler, innehåll, CSS och bilder har därför återskapats från den sparade
ManWithClass-Preview.html. Det är INTE en identisk kopia av den ursprungliga
TypeScript-källkoden. Den återskapade appkoden är JavaScript/JSX med React.

Layout, texter, priser, språkversioner och animationer kommer från förhandsversionen.
Bilderna är delvis tillfälliga. Roy behöver godkänna innehållet före lansering.
Sidan har noindex och är inte publicerad av denna leverans.

## Snabbast: se förhandsversionen

Öppna `preview/ManWithClass-Preview.html` i en webbläsare på datorn.
Det är den tidigare, fristående förhandsversionen med inbyggda bilder och hash-länkar.
Google Fonts kräver internet; annars används reservtypsnitt.

## Se den återskapade versionen utan npm-installation

Du behöver Node.js (projektets engines-krav: >=22.12.0).
Öppna en terminal i projektets huvudmapp och kör:

```sh
node frontend/scripts/serve.mjs
```

Öppna http://127.0.0.1:4173 i webbläsaren. Avsluta med Ctrl+C.
Servern visar redan byggda filer i `frontend/dist`. Prisändringar i källkoden
kräver ett nytt bygge för att synas här.

På Windows kan du också dubbelklicka på `START-PREVIEW-WINDOWS.bat`.
På Mac/Linux kan du köra `sh start-preview.sh`.

## Utveckla med React och Vite

```sh
cd frontend
npm ci
npm run dev
```

Öppna http://127.0.0.1:5173. Installationen kräver internet för npm-paketen.
Låsfil medföljer. node_modules medföljer inte.

### Bygg med Vite

```sh
npm run build
```

### Portabelt alternativ som har körts i leveranskontrollen

```sh
npm run build:portable
npm run preview:portable
```

Det portabla bygget använder TypeScript-kompilatorn för att bearbeta JavaScript/JSX
utan plattformsspecifika esbuild-/Rollup-binärer. React och React Router är låsta
till versionerna i den uppladdade Buffalo-referensen. Det är samma komponenter
som Vite-projektet, inte en separat omdesign.

## Här ändrar du innehållet

- `frontend/src/content/services.json`: 19 behandlingar, pris, tid, svenska/engelska och bildkoppling.
- `frontend/src/content/site.js`: kontakt, adress, bokningslänk och öppettider.
- `frontend/src/content/reviews.json`: tidigare publicerade omdömen; ingen livekoppling till Google.
- `frontend/src/content/data.js`: galleri och kategorier.
- `frontend/src/content/seo.js`: sidtitlar, beskrivningar och strukturerad information.
- `frontend/src/styles/global.css`: färger, typografi, mellanrum, animationer och mobilregler.
- `frontend/src/components/CinematicHero.js`: hero med scrollkapitel.
- `frontend/public/images/`: logga, salongsbilder och inspirationsbilder.

Appmodulerna är funktionella men bevarar delar av den kompilerade React-syntaxen
från förhandsversionen. Priser och längre behandlingstexter ligger separat i JSON
för att vara enkla att redigera. Någon separat backend ingår inte; bokningar
skickas vidare till Bokadirekt. Inga formulär, sms eller e-postutskick aktiveras av webbappen.

## Innan publicering

Läs `docs/LAUNCH-CHECKLIST.md` och `docs/TESTSTATUS.md`.
Spara `.env.example` som `.env.local` i frontend om du behöver konfigurera domänen.
Lämna VITE_ENABLE_INDEXING och VITE_CONTENT_APPROVED som false under förhandsvisning.
När ALLT är godkänt och rätt domän används kan båda sättas till true
före ett nytt bygge. Sökplaceringar eller snabbhetsvinster är inte garanterade.

`frontend/dist` innehåller 54 förrenderade sidor + 404, sitemap och robots.txt.
En Vercel-konfiguration finns i roten, men ingen driftsättning har gjorts i denna leverans.
