@echo off
echo 🌱 EcoDash Local - Démarrage...
echo.

REM Vérifier si Node.js est installé
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js n'est pas installé !
    echo Veuillez installer Node.js depuis https://nodejs.org/
    pause
    exit /b 1
)

REM Vérifier si npm est installé
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm n'est pas installé !
    pause
    exit /b 1
)

echo ✅ Node.js et npm sont installés
echo.

REM Installer les dépendances si nécessaire
if not exist "node_modules" (
    echo 📦 Installation des dépendances...
    npm install
    if %errorlevel% neq 0 (
        echo ❌ Erreur lors de l'installation des dépendances
        pause
        exit /b 1
    )
)

echo 🚀 Lancement du serveur...
echo.
echo 📱 Ouvrez votre navigateur et allez à : http://localhost:3000
echo 🧪 Pour tester : http://localhost:3000/test.html
echo.
echo Appuyez sur Ctrl+C pour arrêter le serveur
echo.

REM Lancer le serveur
npm start
