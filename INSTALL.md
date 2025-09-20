# 🚀 Installation et Lancement d'EcoDash Local

## 📋 Prérequis

- **Node.js** (version 14 ou supérieure)
- **npm** (généralement inclus avec Node.js)
- **Navigateur web moderne** (Chrome, Firefox, Safari, Edge)

## 🔧 Installation

### Option 1: Installation rapide (recommandée)

```bash
# 1. Installer les dépendances de développement
npm install

# 2. Lancer le serveur de développement
npm start
```

### Option 2: Installation manuelle

```bash
# 1. Installer serve globalement
npm install -g serve

# 2. Lancer le serveur dans le dossier du projet
serve .
```

### Option 3: Avec live-server (rechargement automatique)

```bash
# 1. Installer live-server globalement
npm install -g live-server

# 2. Lancer avec rechargement automatique
live-server .
```

### Option 4: Avec http-server

```bash
# 1. Installer http-server globalement
npm install -g http-server

# 2. Lancer le serveur
http-server . -p 8080
```

## 🌐 Accès à l'application

Après avoir lancé le serveur, ouvrez votre navigateur et allez à :

- **http://localhost:3000** (avec `serve`)
- **http://localhost:8080** (avec `http-server`)
- **http://127.0.0.1:3000** (alternative)

## 🧪 Test de l'installation

1. **Ouvrir** `http://localhost:3000/test.html` pour vérifier que tout fonctionne
2. **Ouvrir** `http://localhost:3000/index.html` pour l'application principale
3. **Cliquer** sur "🧪 Charger le fichier de test" pour tester avec les données

## 📁 Structure des fichiers

```
EcoDash/
├── index.html          # Application principale
├── test.html           # Page de test et diagnostic
├── demo.html           # Page de démonstration
├── style.css           # Styles CSS
├── script.js           # Logique JavaScript
├── data.csv            # Données de test
├── package.json        # Configuration npm
├── README.md           # Documentation
└── INSTALL.md          # Ce fichier
```

## 🔍 Dépannage

### Problème: "Chart.js not defined"

**Solution:**
```bash
# Vérifier que vous utilisez un serveur web (pas file://)
npm start
```

### Problème: "Cannot load CSV file"

**Solution:**
```bash
# S'assurer d'être dans le bon dossier
cd /chemin/vers/EcoDash
npm start
```

### Problème: "Module not found"

**Solution:**
```bash
# Réinstaller les dépendances
rm -rf node_modules
npm install
```

## 🚀 Commandes utiles

```bash
# Démarrer en mode développement
npm run dev

# Démarrer en mode test
npm run test

# Vérifier l'installation
npm list

# Mettre à jour les dépendances
npm update
```

## 📱 Test sur mobile

Pour tester sur mobile dans le même réseau :

```bash
# Lancer avec accès réseau
serve . -l 0.0.0.0:3000
```

Puis accéder via l'IP de votre machine : `http://192.168.x.x:3000`

## ✅ Vérification finale

L'installation est réussie si :

1. ✅ Le serveur démarre sans erreur
2. ✅ `test.html` affiche tous les tests en vert
3. ✅ `index.html` charge correctement
4. ✅ Le bouton "Charger le fichier de test" fonctionne
5. ✅ Les graphiques s'affichent

## 🆘 Support

Si vous rencontrez des problèmes :

1. Vérifiez la console du navigateur (F12)
2. Consultez `test.html` pour le diagnostic
3. Vérifiez que Node.js est installé : `node --version`
4. Vérifiez que npm fonctionne : `npm --version`

---

**EcoDash Local** - Installation réussie ! 🌱
