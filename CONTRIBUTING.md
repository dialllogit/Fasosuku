# Guide de Contribution - FasoSuku

## 🎯 Bienvenue sur FasoSuku !

Merci d'être intéressé par la contribution à FasoSuku ! Ce document vous guidera à travers le processus de contribution.

## 📋 Code de Conduite

Ce projet est engagé à offrir un environnement accueillant et inclusif. Nous demandons à tous les contributeurs de :

- Respecter les opinions et expériences des autres
- Être constructif et bienveillant dans les retours
- Se concentrer sur ce qui est meilleur pour la communauté
- Respecter les décisions des mainteneurs

## 🐛 Signaler des Bugs

### Avant de signaler un bug

1. **Cherchez dans les issues existantes** - le bug peut déjà être connu
2. **Vérifiez votre version** - testez avec la dernière version
3. **Reproduisez le problème** - fournissez des étapes claires

### Comment signaler un bug

Ouvrez une issue avec :

```markdown
**Description du bug**
Une description claire et concise.

**Étapes pour reproduire**
1. Aller à '...'
2. Cliquer sur '...'
3. Voir l'erreur '...'

**Comportement attendu**
Que devrait-il se passer ?

**Captures d'écran**
Si applicable, ajoutez des screenshots.

**Environnement**
- OS: [ex. macOS 12.1]
- Navigateur: [ex. Chrome 96]
- Version Node: [ex. 16.13.0]

**Logs/Erreurs**
Collez les erreurs de console si disponibles.
```

## ✨ Proposer une Nouvelle Fonctionnalité

### Avant de proposer

1. **Vérifiez si elle existe déjà** - cherchez dans les issues
2. **Assurez-vous qu'elle s'aligne** avec la vision du projet
3. **Pensez à la portée** - est-ce possible à implémenter ?

### Comment proposer

Ouvrez une issue avec le label `enhancement` :

```markdown
**Description**
Quelle est la fonctionnalité ? Pourquoi en avons-nous besoin ?

**Cas d'usage**
Comment cela sera-t-il utilisé ?

**Alternatives**
Y a-t-il d'autres solutions ?

**Bénéfices**
Comment cela améliore le projet ?
```

## 🔧 Processus de Contribution

### 1. Fork le Repository

```bash
git clone https://github.com/votre-username/FasoSuku.git
cd FasoSuku
```

### 2. Créer une Branche

```bash
# Créez une branche basée sur main
git checkout -b feature/votre-feature-name

# Convention de nommage :
# feature/description-courte
# bugfix/description-courte
# docs/description-courte
# refactor/description-courte
```

### 3. Faire vos Changements

- Écrivez du code **lisible** et **bien commenté**
- Suivez le **style de code** du projet
- Testez vos changements localement
- Commitez avec des **messages clairs**

```bash
# Bons messages de commit
git commit -m "Add student registration feature"
git commit -m "Fix payment webhook validation"
git commit -m "Refactor service worker caching strategy"

# Mauvais messages
git commit -m "Update stuff"
git commit -m "Fix bug lol"
```

### 4. Tests

```bash
# Lancez les tests avant de pusher
npm run test
npm run test:coverage

# Vérifiez le linting
npm run lint
npm run format
```

### 5. Push vers votre Fork

```bash
git push origin feature/votre-feature-name
```

### 6. Ouvrir une Pull Request

1. Allez sur https://github.com/dialllogit/FasoSuku
2. Cliquez sur "New Pull Request"
3. Remplissez le template PR :

```markdown
## Description
Que change cette PR ?

## Type de changement
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation
- [ ] Refactoring

## Liés aux Issues
Closes #123

## Changes
- Change 1
- Change 2

## Tests
Comment avez-vous testé cela ?

## Checklist
- [ ] J'ai lu le guide de contribution
- [ ] Mon code suit le style du projet
- [ ] J'ai testé localement
- [ ] Tests passent
- [ ] Pas de warning/erreur linting
- [ ] Documentation mise à jour (si nécessaire)
- [ ] Les commits sont atomiques et bien nommés
```

## 📝 Guide de Style

### JavaScript/Node.js

```javascript
// ✅ BON
const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    logger.error(`Error fetching user: ${error.message}`);
    throw new ApiError(404, 'User not found');
  }
};

// ❌ MAUVAIS
const getUser = async (id) => {
  const u = await User.findById(id);
  return u;
};
```

### Vue.js/Frontend

```vue
<template>
  <div class="student-card">
    <h2>{{ student.name }}</h2>
    <p>{{ student.email }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  student: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
.student-card {
  padding: 1rem;
  border: 1px solid #e5e7eb;
}
</style>
```

### Naming Conventions

- **Classes** : PascalCase (`UserController`, `PaymentService`)
- **Functions** : camelCase (`getUserById`, `processPayment`)
- **Constants** : UPPER_CASE (`JWT_SECRET`, `MAX_FILE_SIZE`)
- **Files/Folders** : kebab-case (`user-controller.js`, `payment-service/`)

## 📚 Documentation

Si votre contribution change la fonctionnalité :

1. Mettez à jour le [README.md](./README.md)
2. Mettez à jour [API_SWAGGER.yaml](./docs/API_SWAGGER.yaml) si vous changez l'API
3. Mettez à jour [USER_MANUAL_FR.md](./docs/USER_MANUAL_FR.md) si c'est user-facing
4. Ajoutez des commentaires de code pour la logique complexe

## ✅ Process de Review

1. **Les mainteneurs** vont examiner votre PR
2. **Demandes de changements** peuvent être faites
3. **Discussions** pour clarifier les choix
4. **Approbation** quand tout est bon
5. **Merge** dans la branche principale

## 🚀 Recommandations pour une Bonne PR

✅ **Faire**
- Une PR = Une fonctionnalité
- Petites PRs sont plus faciles à reviewer
- Tester avant de soumettre
- Fournir un contexte clair
- Être réactif aux questions

❌ **Éviter**
- Grandes PRs avec plusieurs changements
- Commits non-atomiques
- Pas de tests
- Messages de commit vagues
- Discussions hors-sujet

## 📞 Questions ?

- 💬 Utilisez les **Discussions** pour les questions générales
- 🐛 Les **Issues** pour les bugs et features
- 📧 Contactez-nous : support@fasosuku.ml

---

**Merci pour votre contribution ! 🎉**
