#!/bin/bash

echo "🌱 EcoDash Local - Démarrage..."
echo

# Vérifier si Node.js est installé
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé !"
    echo "Veuillez installer Node.js depuis https://nodejs.org/"
    exit 1
fi

# Vérifier si npm est installé
if ! command -v npm &> /dev/null; then
    echo "❌ npm n'est pas installé !"
    exit 1
fi

echo "✅ Node.js et npm sont installés"
echo

# Installer les dépendances si nécessaire
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Erreur lors de l'installation des dépendances"
        exit 1
    fi
fi

echo "🚀 Lancement du serveur..."
echo
echo "📱 Ouvrez votre navigateur et allez à : http://localhost:3000"
echo "🧪 Pour tester : http://localhost:3000/test.html"
echo
echo "Appuyez sur Ctrl+C pour arrêter le serveur"
echo

# Lancer le serveur
npm start
