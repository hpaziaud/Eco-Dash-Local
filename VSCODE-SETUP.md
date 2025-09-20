# 🎯 Installation avec Visual Studio Code

Guide complet pour installer et lancer EcoDash Local avec Visual Studio Code.

## 📋 Prérequis

### 1. Node.js
- **Télécharger** : [https://nodejs.org/](https://nodejs.org/)
- **Version recommandée** : 18.x LTS ou supérieure
- **Vérifier l'installation** :
```bash
node --version
npm --version
```

### 2. Visual Studio Code
- **Télécharger** : [https://code.visualstudio.com/](https://code.visualstudio.com/)
- **Extensions recommandées** :
  - Live Server (Ritwick Dey)
  - Prettier - Code formatter
  - Auto Rename Tag
  - Bracket Pair Colorizer

## 🚀 Installation Rapide

### 1. Cloner le Projet
```bash
git clone https://github.com/hpaziaud/Eco-Dash-Local.git
cd Eco-Dash-Local
```

### 2. Ouvrir dans VS Code
```bash
code .
```

### 3. Installer les Extensions
1. Ouvrez VS Code
2. Allez dans Extensions (Ctrl+Shift+X)
3. Recherchez et installez :
   - **Live Server** par Ritwick Dey
   - **Prettier** par Prettier
   - **Auto Rename Tag** par Jun Han

### 4. Installer les Dépendances
```bash
npm install
```

## 🎮 Lancement du Projet

### Méthode 1 : Live Server (Recommandée)

1. **Ouvrir le fichier** : `index.html`
2. **Clic droit** sur le fichier
3. **Sélectionner** : "Open with Live Server"
4. **Le navigateur s'ouvre automatiquement** sur `http://127.0.0.1:5500`

### Méthode 2 : Terminal Intégré

1. **Ouvrir le terminal** : Ctrl+` (ou Terminal > New Terminal)
2. **Lancer le serveur** :
```bash
npm start
```
3. **Ouvrir le navigateur** : http://localhost:3000

### Méthode 3 : Script de Démarrage

1. **Double-cliquer** sur `start.bat` (Windows)
2. **Ou exécuter** : `./start.sh` (Linux/Mac)

## 🔧 Configuration VS Code

### Settings Recommandés

Créez un fichier `.vscode/settings.json` :

```json
{
  "liveServer.settings.port": 5500,
  "liveServer.settings.root": "/",
  "liveServer.settings.CustomBrowser": "chrome",
  "liveServer.settings.AdvanceCustomBrowserCmdLine": "--incognito",
  "liveServer.settings.NoBrowser": false,
  "liveServer.settings.ignoreFiles": [
    ".vscode/**",
    "**/*.scss",
    "**/*.sass",
    "**/*.ts"
  ],
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  }
}
```

### Extensions Utiles

```json
{
  "recommendations": [
    "ritwickdey.liveserver",
    "esbenp.prettier-vscode",
    "formulahendry.auto-rename-tag",
    "ms-vscode.vscode-json",
    "bradlc.vscode-tailwindcss"
  ]
}
```

## 📁 Structure du Projet dans VS Code

```
EcoDash-Local/
├── 📁 .vscode/              # Configuration VS Code
│   ├── settings.json        # Paramètres du projet
│   └── extensions.json      # Extensions recommandées
├── 📄 index.html            # Application principale
├── 🗺️ navigation.html       # Page de navigation
├── 🚀 demo.html             # Démonstration
├── 🧪 test.html             # Tests et diagnostic
├── 📊 csv-formats.html      # Guide des formats CSV
├── 🎨 style.css             # Styles CSS
├── ⚙️ script.js             # Logique JavaScript
├── 📦 package.json          # Configuration npm
├── 📚 README.md             # Documentation
├── 🔧 INSTALL.md            # Guide d'installation
├── 🚀 start.bat             # Script Windows
├── 🐧 start.sh              # Script Linux/Mac
└── 📊 data-*.csv            # Fichiers de test
```

## 🧪 Tests et Développement

### Tests Manuels
1. **Ouvrir** : `test.html` avec Live Server
2. **Vérifier** que tous les tests passent
3. **Tester** avec différents fichiers CSV

### Debugging
1. **Ouvrir** les DevTools : F12
2. **Console** : Vérifier les erreurs
3. **Network** : Vérifier le chargement des ressources

### Hot Reload
- **Live Server** : Rechargement automatique
- **Modifications CSS/JS** : Mise à jour instantanée
- **Modifications HTML** : Rechargement de la page

## 🎯 Workflow de Développement

### 1. Modifier le Code
- **HTML** : Structure et contenu
- **CSS** : Styles et responsive
- **JavaScript** : Logique et interactions

### 2. Tester en Temps Réel
- **Live Server** : Mise à jour automatique
- **Console** : Vérifier les erreurs
- **Responsive** : Tester sur différentes tailles

### 3. Valider les Changements
- **Tests** : `test.html`
- **Performance** : Lighthouse
- **Cross-browser** : Chrome, Firefox, Safari

## 🔍 Dépannage VS Code

### Problème: Live Server ne démarre pas
```bash
# Vérifier que l'extension est installée
# Redémarrer VS Code
# Vérifier le port 5500
```

### Problème: npm install échoue
```bash
# Vérifier Node.js
node --version

# Nettoyer le cache
npm cache clean --force

# Réinstaller
rm -rf node_modules
npm install
```

### Problème: Port déjà utilisé
```bash
# Changer le port dans les settings
"liveServer.settings.port": 5501
```

## 📱 Test sur Mobile

### Avec Live Server
1. **Démarrer** Live Server
2. **Noter l'IP** affichée dans le terminal
3. **Accéder** depuis mobile : `http://IP:5500`

### Avec npm start
```bash
# Démarrer sur toutes les interfaces
npx serve . -l 0.0.0.0:3000
```

## 🚀 Déploiement

### Build de Production
```bash
# Optimiser les fichiers
npm run build

# Tester la version de production
npm start
```

### GitHub Pages
1. **Pousser** le code sur GitHub
2. **Activer** GitHub Pages dans les settings
3. **Sélectionner** la branche main

## 📚 Ressources

- **Documentation VS Code** : [https://code.visualstudio.com/docs](https://code.visualstudio.com/docs)
- **Live Server** : [https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
- **Prettier** : [https://prettier.io/](https://prettier.io/)

---

**EcoDash Local** - Développement avec VS Code 🌱
