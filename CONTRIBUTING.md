# 🤝 Guide de Contribution - EcoDash Local

Merci de votre intérêt pour contribuer à EcoDash Local ! Ce guide vous aidera à contribuer efficacement au projet.

## 📋 Comment Contribuer

### 1. Fork et Clone

```bash
# Fork le repository sur GitHub, puis clonez votre fork
git clone https://github.com/VOTRE-USERNAME/Eco-Dash-Local.git
cd Eco-Dash-Local

# Ajoutez le repository original comme remote
git remote add upstream https://github.com/hpaziaud/Eco-Dash-Local.git
```

### 2. Créer une Branche

```bash
# Créez une nouvelle branche pour votre feature
git checkout -b feature/nom-de-votre-feature

# Ou pour un bugfix
git checkout -b fix/description-du-bug
```

### 3. Installer les Dépendances

```bash
npm install
```

### 4. Développer

- Modifiez le code selon vos besoins
- Testez vos changements avec `npm start`
- Assurez-vous que tous les tests passent

### 5. Commiter

```bash
# Ajoutez vos fichiers
git add .

# Commitez avec un message descriptif
git commit -m "feat: ajouter nouvelle fonctionnalité X"
```

### 6. Pousser et Créer une PR

```bash
# Poussez vers votre fork
git push origin feature/nom-de-votre-feature

# Créez une Pull Request sur GitHub
```

## 📝 Standards de Code

### Messages de Commit

Utilisez le format conventional commits :

- `feat:` nouvelle fonctionnalité
- `fix:` correction de bug
- `docs:` documentation
- `style:` formatage, point-virgules manquants, etc.
- `refactor:` refactoring du code
- `test:` ajout de tests
- `chore:` maintenance

### Structure du Code

- **HTML** : Sémantique et accessible
- **CSS** : Mobile-first, responsive
- **JavaScript** : ES6+, commentaires en français
- **Fichiers** : Noms en anglais, contenu en français

## 🧪 Tests

### Tests Manuels

1. Ouvrez `test.html` dans le navigateur
2. Vérifiez que tous les tests passent
3. Testez avec différents fichiers CSV
4. Vérifiez la responsivité sur mobile

### Tests de Performance

```bash
# Vérifiez la taille du bundle
npm run build

# Testez avec Lighthouse
# Ouvrez http://localhost:3000 et lancez Lighthouse
```

## 🐛 Signaler un Bug

### Avant de Signaler

1. Vérifiez que le bug n'existe pas déjà dans les issues
2. Testez avec la dernière version
3. Vérifiez la console du navigateur (F12)

### Template de Bug Report

```markdown
**Description du bug**
Une description claire du problème.

**Étapes pour reproduire**
1. Aller à '...'
2. Cliquer sur '...'
3. Voir l'erreur

**Comportement attendu**
Ce qui devrait se passer.

**Screenshots**
Si applicable, ajoutez des captures d'écran.

**Environnement**
- OS: [ex. Windows 10]
- Navigateur: [ex. Chrome 91]
- Version: [ex. 1.0.0]

**Console**
Copiez les erreurs de la console (F12).
```

## ✨ Proposer une Feature

### Avant de Proposer

1. Vérifiez que la feature n'existe pas déjà
2. Assurez-vous qu'elle s'aligne avec les objectifs du projet
3. Considérez l'impact sur les performances

### Template de Feature Request

```markdown
**Description de la feature**
Une description claire de la fonctionnalité souhaitée.

**Problème résolu**
Quel problème cette feature résout-elle ?

**Solution proposée**
Comment cette feature devrait fonctionner ?

**Alternatives considérées**
Autres solutions que vous avez envisagées.

**Contexte supplémentaire**
Toute autre information pertinente.
```

## 📚 Documentation

### Mise à Jour de la Documentation

- **README.md** : Mettez à jour si vous ajoutez des fonctionnalités
- **csv-formats.html** : Ajoutez de nouveaux formats supportés
- **Commentaires** : Documentez le code complexe

### Traduction

Le projet est principalement en français, mais nous acceptons :
- Corrections de grammaire/orthographe
- Améliorations de clarté
- Ajout d'exemples

## 🎨 Design

### Principes

- **Sobriété** : Interface épurée et efficace
- **Accessibilité** : Respect des standards WCAG
- **Responsive** : Fonctionne sur tous les appareils
- **Performance** : Chargement rapide

### Couleurs

- **Primaire** : #3498db (bleu)
- **Succès** : #27ae60 (vert)
- **Attention** : #f39c12 (orange)
- **Erreur** : #e74c3c (rouge)

## 🔧 Développement Local

### Structure Recommandée

```
EcoDash-Local/
├── src/                    # Code source (si refactoring)
├── docs/                   # Documentation
├── tests/                  # Tests automatisés
├── assets/                 # Images, icônes
└── dist/                   # Build de production
```

### Outils Recommandés

- **VS Code** avec extensions :
  - Live Server
  - Prettier
  - ESLint
  - Auto Rename Tag

## 📋 Checklist avant PR

- [ ] Code testé localement
- [ ] Tests passent
- [ ] Documentation mise à jour
- [ ] Pas de console.error
- [ ] Responsive testé
- [ ] Performance vérifiée
- [ ] Message de commit descriptif

## 🏷️ Labels des Issues

- `bug` : Bug à corriger
- `enhancement` : Amélioration
- `documentation` : Documentation
- `good first issue` : Bon pour débuter
- `help wanted` : Aide recherchée
- `question` : Question

## 📞 Communication

- **Issues GitHub** : Pour bugs et features
- **Discussions** : Pour questions générales
- **Pull Requests** : Pour contributions

## 🙏 Reconnaissance

Tous les contributeurs seront mentionnés dans le README et les releases.

---

Merci de contribuer à EcoDash Local ! 🌱
