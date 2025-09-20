# 🌱 EcoDash Local

**Tableau de bord sobriété numérique** - Analyse de l'impact environnemental des sites web à partir de données CSV.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-14+-green.svg)](https://nodejs.org/)
[![Chart.js](https://img.shields.io/badge/Chart.js-4.5.0-blue.svg)](https://www.chartjs.org/)

## 📋 Description

EcoDash Local est une application web qui permet d'analyser l'empreinte carbone d'un site web en se basant sur des métriques clés comme la taille des pages, le nombre de requêtes HTTP, et les temps de chargement. L'objectif est de sensibiliser aux bonnes pratiques de sobriété numérique.

### ✨ Fonctionnalités

- 📊 **Import CSV flexible** avec détection automatique des colonnes
- 📈 **4 KPI calculés** : Poids, Requêtes, Temps, Empreinte carbone
- 📊 **3 graphiques interactifs** avec Chart.js
- 💡 **Recommandations automatiques** d'optimisation
- 📄 **Export PDF** des rapports
- 🚀 **Simulation d'optimisation** avant/après
- 📱 **Interface responsive** et moderne

## 🚀 Utilisation

1. **Cloner le projet** : `git clone https://github.com/hpaziaud/Eco-Dash-Local.git`
2. **Ouvrir dans VS Code** : `code .`
3. **Installer les dépendances** : `npm install`
4. **Lancer le projet** : Clic droit sur `index.html` → "Open with Live Server"

## 📊 Formats CSV Supportés

EcoDash Local accepte différents formats de CSV grâce à sa détection automatique :

### Format Standard
```csv
url,page_size_kb,requests,ttfb_ms,load_time_ms
/home,1200,45,180,900
/about,800,30,150,700
```

### Format avec Unités MB
```csv
Page URL,Size (MB),HTTP Requests,First Byte (ms)
"https://example.com/",1.2,45,180
"https://example.com/about",0.8,30,150
```

### Format Minimal
```csv
path,weight
/home,1200
/about,800
```

**📖 [Guide complet des formats CSV →](csv-formats.html)**

## 🧪 Fichiers de Test Inclus

- **`data.csv`** - 30 pages (format standard)
- **`data-complete.csv`** - 40 pages (données enrichies)
- **`data-alternative.csv`** - 10 pages (format avec MB)
- **`data-minimal.csv`** - 5 pages (format minimal)

## 📁 Structure du Projet

```
EcoDash-Local/
├── 📄 index.html              # Application principale
├── 🗺️ navigation.html         # Page de navigation
├── 🚀 demo.html               # Démonstration
├── 🧪 test.html               # Tests et diagnostic
├── 📊 csv-formats.html        # Guide des formats CSV
├── 🎨 style.css               # Styles CSS
├── ⚙️ script.js               # Logique JavaScript
├── 📦 package.json            # Configuration npm
├── 📚 README.md               # Cette documentation
├── 🚀 start.bat               # Script de démarrage Windows
├── 🐧 start.sh                # Script de démarrage Linux/Mac
└── 📊 data-*.csv              # Fichiers de test
```

## 🎮 Comment utiliser l'application

1. **Ouvrir l'application** : http://localhost:3000
2. **Importer des données** : Glisser-déposer ou sélectionner un fichier CSV
3. **Analyser les KPI** : Consulter les métriques calculées
4. **Explorer les graphiques** : Visualiser les données par page
5. **Consulter les recommandations** : Lire les suggestions d'optimisation
6. **Exporter le rapport** : Générer un PDF ou simuler une optimisation

## 🔧 Commandes Disponibles

```bash
# Démarrage du serveur de développement
npm start

# Démarrage avec rechargement automatique
npm run dev

# Tests
npm run test

# Build (préparation pour production)
npm run build
```

## 📱 Pages Disponibles

- **🏠 Application** : http://localhost:3000/index.html
- **🗺️ Navigation** : http://localhost:3000/navigation.html
- **🚀 Démonstration** : http://localhost:3000/demo.html
- **🧪 Tests** : http://localhost:3000/test.html
- **📊 Formats CSV** : http://localhost:3000/csv-formats.html

## 🧮 Méthode de Calcul

### Empreinte Carbone
**Formule** : `1g CO₂e ≈ 1 Mo de données transférées`

Cette estimation est basée sur :
- Consommation énergétique des data centers
- Infrastructure réseau
- Équipements utilisateurs

### KPI Calculés
- **Moyennes** : Somme des valeurs / nombre de pages
- **Empreinte** : (Taille totale en MB / nombre de pages) × facteur CO₂
- **Optimisation** : Réduction simulée de 20-40% selon le type

## 💡 Recommandations Générées

L'application génère automatiquement des recommandations basées sur des seuils :

- **Poids > 1MB** → Compression d'images
- **Requêtes > 50** → Optimisation des ressources
- **Temps > 2s** → Optimisation du rendu
- **TTFB > 500ms** → Optimisation serveur

## 🛠️ Technologies Utilisées

- **Frontend** : HTML5, CSS3, JavaScript Vanilla
- **Graphiques** : Chart.js 4.5.0
- **Design** : CSS Grid, Flexbox, animations CSS
- **Export** : CSS Print Media Queries
- **Parsing** : FileReader API pour CSV

## 📈 Performance

- **Bundle size** : < 500 KB
- **Lighthouse Performance** : ≥ 95
- **First Contentful Paint** : < 1.5s
- **Time to Interactive** : < 2s

## 🔍 Dépannage

### Problème: "Chart.js not defined"
```bash
# Vérifier que vous utilisez un serveur web (pas file://)
npm start
```

### Problème: "Cannot load CSV file"
```bash
# S'assurer d'être dans le bon dossier
cd Eco-Dash-Local
npm start
```

### Problème: "Module not found"
```bash
# Réinstaller les dépendances
rm -rf node_modules
npm install
```


## 📄 Utilisation

Ce projet est libre d'utilisation. Tout le monde peut l'utiliser, le modifier et le partager.

## 👥 Auteurs

- **Hassan PAZIAUD** - Dirigeant
- **Fatimetou ABDEL MOLA**
- **Benycna LIENOU**

## 📞 Support

Pour toute question ou problème :
1. Vérifier la documentation
2. Consulter les issues GitHub
3. Créer une nouvelle issue si nécessaire

## 🌍 Impact Environnemental

EcoDash Local sensibilise aux bonnes pratiques de sobriété numérique en montrant :
- L'impact de la taille des pages sur l'empreinte carbone
- L'importance d'optimiser le nombre de requêtes
- Les bénéfices d'une optimisation des temps de chargement
- Des recommandations concrètes pour réduire l'impact

---

**EcoDash Local** - Sensibilisation à la sobriété numérique 🌱

*Développé avec ❤️ pour sensibiliser à l'impact environnemental du web*