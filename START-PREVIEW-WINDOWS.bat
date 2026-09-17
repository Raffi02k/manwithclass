@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
 echo Node.js saknas. Installera Node.js och forsok igen.
 pause
 exit /b 1
)
echo Oppna http://127.0.0.1:4173 i webblasaren.
node frontend\scripts\serve.mjs
pause
