# Leveranskontroll

## Genomfört

Det portabla bygget har körts från de återskapade projektfilerna.
54 sidor + 404 har förrenderats. Det automatiska statiska testet kontrollerar
unik sidtitel, en H1 per sida, metabeskrivning, svenska/engelska språklänkar,
JSON-LD, bildfiler och noindex. Testet passerade.
De 54 rena adresserna svarade med HTTP 200 i den lokala Node-servern.
ZIP-kontroll och fillista finns i leveransens kontrollrapport.

## Begränsningar

Ett nytt interaktivt Chromium-test kunde inte genomföras eftersom webbläsarens
administratörspolicy blockerade navigering till den lokala testservern
(ERR_BLOCKED_BY_ADMINISTRATOR). Detta är inte ett godkänt webbläsartest.
Det tidigare svaret beskriver tester av den sparade originalförhandsversionen;
de ska inte förväxlas med en ny granskning av detta återskapade paket.

Vites vanliga bygge kunde inte köras här: arbetsmiljön saknade nätåtkomst
till npm och referensarkivets native-verktyg var för macOS. Det portabla bygget
användes i stället. `npm ci` installerar plattformsrätta beroenden hos utvecklaren.

Ingen kontroll av aktuella externa priser, betyg, länkar eller bokningstransaktioner
har gjorts vid paketeringen. Inget PageSpeed-/Lighthouse-resultat påstås.
