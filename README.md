# 📚 FasoSuku - La Bibliothèque Numérique des Chercheurs du Mali

![Version](https://img.shields.io/badge/version-1.0-blue)
![Status](https://img.shields.io/badge/status-In%20Development-yellow)
![License](https://img.shields.io/badge/license-MIT-green)
![Mali](https://img.shields.io/badge/Mali-🇲🇱-orange)

## 🎯 Vue d'ensemble

FasoSuku est une **Progressive Web App (PWA)** fonctionnant comme une marketplace et une liseuse sécurisée dédiée aux supports académiques maliens. Elle permet aux enseignants-chercheurs de monétiser leurs contenus pédagogiques via le micro-paiement mobile (Orange Money, Moov Money, Wave) tout en protégeant les contenus contre le piratage.

### ✨ Caractéristiques Principales

- ✅ **Marketplace académique** : Catalogue de livres et chapitres écrits par des enseignants maliens
- ✅ **Micro-paiement sécurisé** : Paiement à l'unité (chapitre) via Mobile Money
- ✅ **Liseuse sécurisée** : Rendu Canvas + Watermarking dynamique anti-piratage
- ✅ **Mode hors-ligne** : Lecture sans connexion internet via PWA
- ✅ **Dashboard enseignant** : Gestion des œuvres, statistiques, revenus
- ✅ **Authentification OTP/SMS** : Accès par numéro de téléphone local
- ✅ **Plateforme admin** : Modération, gestion des utilisateurs
- ✅ **Performance optimale** : < 3s sur 3G, lazy loading, compression d'images

---

## 🏗️ Architecture Technique

```
FasoSuku/
├── frontend/                 # PWA Frontend (Vue.js + Vite)
│   ├── public/
│   │   ├── index.html
│   │   ├── manifest.json    # PWA Manifest
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/      # Composants réutilisables
│   │   ├── pages/           # Pages principales
│   │   ├── services/        # API calls, paiements
│   │   ├── store/           # State management (Pinia)
│   │   ├── utils/           # Utilitaires, crypto
│   │   ├── worker/          # Service Worker
│   │   └── styles/          # CSS (Tailwind)
│   ├── sw.js                # Service Worker
│   └── package.json
│
├── backend/                  # Node.js + Express Backend
│   ├── src/
│   │   ├── config/          # Configuration DB, JWT, Paiement
│   │   ├── controllers/     # Logique métier
│   │   ├── models/          # Schémas MongoDB
│   │   ├── routes/          # Endpoints API
│   │   ├── middleware/      # Auth, validation
│   │   ├── services/        # Services (Paiement, Email)
│   │   └── utils/           # Utilitaires
│   ├── scripts/             # Scripts BD, seed
│   ├── tests/               # Tests unitaires
│   ├── .env.example
│   ├── server.js            # Point d'entrée
│   └── package.json
│
├── docs/                     # Documentation
│   ├── API_SWAGGER.yaml     # Spécification OpenAPI
│   ├── DEPLOYMENT.md        # Guide de déploiement
│   ├── USER_MANUAL_FR.md    # Manuel utilisateur
│   ├── ARCHITECTURE.md      # Détails techniques
│   └── DATABASE.md          # Schémas MongoDB
│
├── .gitignore
├── docker-compose.yml       # Stack de développement
├── package.json             # Root dependencies
└── README.md
```

---

## 🚀 Démarrage Rapide

### Prérequis

- **Node.js** >= 18.x
- **MongoDB** >= 5.0
- **npm** ou **yarn**
- **Docker & Docker Compose** (recommandé)
- **Git**

### Installation Locale

```bash
# 1. Cloner le repository
git clone https://github.com/dialllogit/FasoSuku.git
cd FasoSuku

# 2. Installation des dépendances
npm install

# 3. Configuration environnement
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# 4. Éditer les fichiers .env avec vos clés API
vim backend/.env
vim frontend/.env

# 5. Démarrer avec Docker (recommandé)
docker-compose up -d

# 6. Initialiser la BD
npm run db:seed

# 7. Lancer l'application en dev
npm run dev
```

**Accès :**
- 🌐 Frontend: http://localhost:3000
- 🔌 Backend API: http://localhost:5000
- 📚 API Docs: http://localhost:5000/api/docs
- 🗄️ MongoDB: localhost:27017
- 📦 Redis: localhost:6379

### Installation sans Docker

```bash
# Backend
cd backend
npm install
cp .env.example .env
# Modifier .env avec vos paramètres
npm run dev

# Frontend (nouveau terminal)
cd frontend
npm install
cp .env.example .env
npm run dev
```

---

## 📖 Documentation Complète

| Document | Description |
|----------|-------------|
| [API Swagger](./docs/API_SWAGGER.yaml) | Spécification OpenAPI complète |
| [Architecture](./docs/ARCHITECTURE.md) | Diagrammes et flux techniques |
| [Base de Données](./docs/DATABASE.md) | Schémas MongoDB détaillés |
| [Guide Déploiement](./docs/DEPLOYMENT.md) | Production AWS/DigitalOcean |
| [Manuel Utilisateur](./docs/USER_MANUAL_FR.md) | Guide pour étudiants/enseignants |

---

## 🔐 Sécurité

- ✅ **JWT Authentication** : Tokens sécurisés avec refresh
- ✅ **Bcrypt** : Chiffrement des mots de passe (10 rounds)
- ✅ **HTTPS/TLS** : Chiffrement obligatoire en production
- ✅ **HMAC Webhook** : Validation des paiements (CinetPay, Wave, etc.)
- ✅ **Watermarking Dynamique** : Filigrane avec données utilisateur (nom + tel + email)
- ✅ **CORS & CSP** : Protection contre attaques cross-site
- ✅ **Rate Limiting** : 100 requêtes/15min par IP
- ✅ **Input Validation** : Validation stricte avec Joi/Yup
- ✅ **OWASP Top 10** : Protections contre SQL Injection, XSS, CSRF

---

## 📱 Fonctionnalités Clés

### Pour les Étudiants

```
1. Inscription via SMS (OTP)
2. Catalogue avec moteur de recherche
3. Filtrage par matière/institution
4. Achat micro-paiement (0-5000 FCFA par chapitre)
5. Paiement via Orange Money/Moov/Wave
6. Liseuse sécurisée (Canvas + filigrane)
7. Bibliothèque personnelle
8. Lecture hors-ligne (PWA)
9. Notifications push
10. Historique d'achat
```

### Pour les Enseignants

```
1. Onboarding avec vérification (selfie + pièce ID)
2. Upload de PDF/ePub
3. Interface de découpage par chapitre
4. Attribution de prix à chaque chapitre
5. Dashboard avec statistiques en temps réel
6. Graphiques : ventes, revenus, tendances
7. Portefeuille interne
8. Retrait vers Mobile Money
9. Gestion des droits d'auteur
10. Support utilisateurs
```

### Pour les Administrateurs

```
1. CRUD complet des utilisateurs
2. Validation des comptes enseignants
3. Monitoring plateforme (logs, erreurs)
4. Analytics détaillées
5. Gestion des contenus signalés
6. Outils financiers (retraits, commissions)
7. Support ticketing
8. Configuration plateforme
9. Blacklist/Whitelist d'utilisateurs
10. Export de rapports
```

---

## 💰 Modèle Économique

```
Étudiant paie : 500 FCFA (exemple)
        ↓
Décomposition automatique :
├─ Plateforme (20%)  : 100 FCFA
└─ Enseignant (80%)  : 400 FCFA
        ↓
Crédité au portefeuille enseignant
        ↓
Retrait possible vers Mobile Money (sans frais)
```

**Opérateurs Supportés :**
- 🏢 Orange Money Mali
- 🏢 Moov Money
- 🏢 Wave
- 🏢 Intégration future : BiP, AirtelMoney

**Commission Plateforme :** 20% (configurable dans .env)

---

## 🧪 Tests

```bash
# Tests unitaires backend
npm run test:backend

# Tests E2E (frontend)
npm run test:e2e

# Tests de charge
npm run test:load

# Couverture de code
npm run test:coverage

# Linting & Formatage
npm run lint
npm run format
```

---

## 📊 Roadmap (3 Sprints)

### Sprint 1 : Fondations (Semaines 1-3)
- [x] Setup infrastructure (Node.js, MongoDB, Docker)
- [x] Authentification JWT + OTP/SMS
- [x] Modèles de données (User, Book, Chapter, Order)
- [x] API REST complète
- [x] Frontend basique (Catalogue, Auth)
- [x] Intégration Orange Money (v1)

### Sprint 2 : Marketplace (Semaines 4-6)
- [ ] Micro-paiement par chapitre
- [ ] Dashboard enseignant complet
- [ ] Système de portefeuille
- [ ] Intégration Wave + Moov Money
- [ ] Upload/Découpage fichiers PDF
- [ ] Statistiques en temps réel
- [ ] Admin panel v1

### Sprint 3 : Sécurité & Production (Semaines 7-9)
- [ ] Liseuse Canvas + Watermarking dynamique
- [ ] Service Worker (offline mode)
- [ ] Tests de sécurité OWASP
- [ ] Tests de charge (1000 concurrent users)
- [ ] Optimisation performance (< 3s sur 3G)
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Déploiement production

---

## 🛠️ Stack Technologique

### Frontend
- **Vue.js 3** : Framework réactif
- **Vite** : Bundler ultra-rapide
- **Tailwind CSS** : Styling utility-first
- **Pinia** : State management
- **Axios** : HTTP client
- **PDF.js** : Rendu PDF (liseuse)
- **Service Worker** : Offline capability
- **IndexedDB** : Stockage local

### Backend
- **Node.js 18+** : Runtime JavaScript
- **Express.js** : Framework web
- **MongoDB** : Base de données NoSQL
- **Mongoose** : ODM pour MongoDB
- **JWT** : Authentication
- **Bcrypt** : Password hashing
- **Redis** : Cache & sessions
- **Joi** : Input validation
- **Winston** : Logging
- **Jest** : Testing framework

### DevOps
- **Docker** : Containerization
- **Docker Compose** : Orchestration locale
- **GitHub Actions** : CI/CD
- **AWS/DigitalOcean** : Production hosting
- **Nginx** : Reverse proxy
- **PM2** : Process management

---

## 📞 Support & Contact

- 📧 **Email** : support@fasosuku.ml
- 💬 **Discord** : [Rejoindre le serveur](https://discord.gg/fasosuku)
- 🐛 **Issues** : [GitHub Issues](https://github.com/dialllogit/FasoSuku/issues)
- 📱 **WhatsApp** : +223 76 XX XX XX (Mali)
- 🌐 **Website** : https://fasosuku.ml (coming soon)

---

## 🤝 Contribution

Vous pouvez contribuer en :

1. Forking le projet
2. Créant une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commitant vos changements (`git commit -m 'Add AmazingFeature'`)
4. Pushant vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrant une Pull Request

**Lire** [CONTRIBUTING.md](./CONTRIBUTING.md) pour plus de détails.

---

## 📄 Licence

Ce projet est sous licence **MIT**. Voir [LICENSE](./LICENSE) pour plus de détails.

---

## 👨‍💻 Auteurs & Remerciements

- **Diallo Logit** - Lead Developer & Founder
- **Communauté académique malienne** - Inspiration & Support

Merci aux institutions :
- **ISA** (Institut Supérieur d'Agronomie)
- **FST** (Faculté des Sciences et Techniques)
- **USSGB** (Université des Sciences Sociales et de Gestion de Bamako)

---

**Made with ❤️ for Mali's Academic Community**

*🇲🇱 "Suku" signifie "Partage" en bambara - Partager le savoir académique sans frontières.*
