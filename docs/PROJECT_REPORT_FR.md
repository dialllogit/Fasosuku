# 📋 RAPPORT DE PROJET - FasoSuku
## La Bibliothèque Numérique des Chercheurs du Mali

---

## 📑 TABLE DES MATIÈRES

1. [Résumé Exécutif](#résumé-exécutif)
2. [Contexte et Problématique](#contexte-et-problématique)
3. [Objectifs du Projet](#objectifs-du-projet)
4. [Public Cible](#public-cible)
5. [Spécifications Fonctionnelles](#spécifications-fonctionnelles)
6. [Architecture Technique](#architecture-technique)
7. [Stack Technologique](#stack-technologique)
8. [Sécurité et Protection](#sécurité-et-protection)
9. [Modèle Économique](#modèle-économique)
10. [Planning et Livrables](#planning-et-livrables)
11. [Risques et Mitigations](#risques-et-mitigations)
12. [Conclusion](#conclusion)

---

## 🎯 RÉSUMÉ EXÉCUTIF

### Vue d'Ensemble

**FasoSuku** est une **Progressive Web Application (PWA)** innovante conçue comme une marketplace et une liseuse numérique sécurisée. Elle s'adresse spécifiquement aux enseignants-chercheurs du Mali et aux étudiants, en réponse à un problème majeur dans le secteur académique malien.

### Problème Identifié

Au Mali, les ressources pédagogiques produites par des enseignants (cours, articles, livres) :  
- ❌ Ne génèrent pas de revenus directs  
- ❌ Sont massivement piratées via WhatsApp/Telegram  
- ❌ Sont inaccessibles financièrement pour les étudiants (prix des livres complets trop élevés)  
- ❌ Manquent d'un canal de distribution efficace

### Solution Proposée

✅ **Marketplace de micro-paiement** : Les étudiants achètent à l'unité (chapitre) au lieu de livres complets
✅ **Liseuse sécurisée** : Protection anti-copie, rendu Canvas, filigrane dynamique
✅ **Mobile Money** : Paiement via Orange Money, Moov Money, Wave (accessible en Mali)
✅ **PWA** : Fonctionne hors-ligne, pas besoin de connexion internet permanente
✅ **Revenus pour enseignants** : 80% des ventes, retrait direct vers compte Mobile Money

---

## 🌍 CONTEXTE ET PROBLÉMATIQUE

### Situation du Secteur Académique Malien

| Aspect | Situation Actuelle | Avec FasoSuku |
|--------|-------------------|----------------|
| **Monétisation** | Aucune | Directe via micro-paiement |
| **Protection** | Aucune (PDF sur WhatsApp) | Canvas + Watermark |
| **Accessibilité** | Livres complets (15 000+ FCFA) | Chapitre à l'unité (500 FCFA) |
| **Paiement** | Carte bancaire (rare) | Mobile Money (95% du marché) |
| **Disponibilité** | Magasins physiques | 24/7 en ligne |

### Institutions Concernées

- **ISA** (Institut Supérieur d'Agronomie)
- **FST** (Faculté des Sciences et Techniques)
- **USSGB** (Université des Sciences Sociales et de Gestion de Bamako)
- **ENSUP** (École Nationale Supérieure d'Ingénieurs)
- Et plus de 20 autres institutions d'enseignement supérieur

---

## 🎯 OBJECTIFS DU PROJET

### Objectifs Primaires

1. **Créer un canal de revenus pérenne** pour enseignants-chercheurs maliens
2. **Démocratiser l'accès** aux ressources académiques via le micro-paiement
3. **Protéger les contenus** contre le piratage numériques
4. **S'adapter aux réalités locales** : Mobile Money + faible bande passante

### Objectifs Secondaires

5. Créer un écosystème numérique éducatif malien
6. Générer des données sur les tendances académiques
7. Favoriser la collaboration entre enseignants
8. Créer de l'emploi indirect (support, modération, etc.)

### Indicateurs de Succès (KPIs)

| KPI | Cible (Année 1) |
|-----|----------------|
| Utilisateurs inscrits | 10 000+ |
| Enseignants actifs | 200+ |
| Livres publiés | 500+ |
| Transactions mensuelles | 5 000+ |
| Revenus générés | 50M FCFA |
| Taux de rétention | > 60% |

---

## 👥 PUBLIC CIBLE

### 1. Les Étudiants / Acheteurs

**Profil :**
- Âge : 18-30 ans
- Cursus : Licences et Masters
- Tech-savvy, accès smartphone (95%)
- Budget limité (500-5000 FCFA/mois pour ressources pédagogiques)
- Utilisation 100% Mobile (87% en Afrique de l'Ouest)

**Besoins :**
- Accès rapide à chapitres spécifiques
- Paiement simple (Mobile Money)
- Lecture hors-ligne
- Interface en français

**Volume cible :** 8 000+ étudiants année 1

### 2. Les Enseignants-Chercheurs / Vendeurs

**Profil :**
- Expérience : 5+ années d'enseignement
- Motivation : Revenu supplémentaire + reconnaissance
- Compétences numériques : Moyennes à bonnes
- Production : 1-5 livres/cours par an

**Besoins :**
- Interface de publication simple
- Statistiques claires sur ventes
- Retrait facile des revenus
- Support technique

**Volume cible :** 150-200 enseignants année 1

### 3. L'Équipe Administrative

**FasoSuku (Admin Platform)**
- Validation des comptes enseignants
- Modération des contenus
- Support utilisateur
- Gestion financière

---

## 📊 SPÉCIFICATIONS FONCTIONNELLES

### Phase 1 : Fonctionnalités Essentielles

#### Pour Étudiants

```
✅ Inscription/Connexion via OTP/SMS
✅ Catalogue avec moteur de recherche
✅ Filtrage (matiière, institution, prix)
✅ Fiche produit avec aperçu gratuit
✅ Achat « One-Click » par chapitre
✅ Paiement Mobile Money
✅ Liseuse sécurisée (Canvas)
✅ Ma Bibliothèque personnelle
✅ Lecture hors-ligne (PWA)
✅ Gestion de compte
```

#### Pour Enseignants

```
✅ Onboarding avec vérification (selfie + ID)
✅ Upload PDF/ePub
✅ Interface de découpage par chapitre
✅ Attribution de prix par chapitre
✅ Dashboard avec statistiques
✅ Graphiques (ventes, revenus, tendances)
✅ Portefeuille interne
✅ Retrait Mobile Money
✅ Gestion d'annonces/promotions
```

#### Pour Admin

```
✅ CRUD utilisateurs
✅ Validation comptes enseignants
✅ Modération contenus
✅ Analytics détaillées
✅ Gestion des retraits
✅ Support ticketing
✅ Monitoring plateforme
✅ Export de rapports
```

### Phase 2 : Fonctionnalités Avancées

```
🔄 Recommandations IA
🔄 Système de review/notation
🔄 Collaborations entre enseignants
🔄 Certification de contenus
🔄 Gamification (badges, points)
🔄 Analytics prédictives
🔄 API pour écoles (intégration)
```

---

## 🏗️ ARCHITECTURE TECHNIQUE

### Architecture Générale

```
┌─────────────────────────────────────────────────────────────┐
│                   CLIENTS FRONTEND (PWA)                    │
│         Browser (Chrome, Firefox, Safari, Samsung)          │
│  ├─ Catalogue & Recherche                                   │
│  ├─ Panier & Paiement                                       │
│  ├─ Liseuse Sécurisée (Canvas + Watermark)                  │
│  └─ Service Worker (Mode offline)                           │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTPS
                         ↓
┌─────────────────────────────────────────────────────────────┐
│                   API GATEWAY (Nginx)                       │
│              Rate Limiting | CORS | SSL/TLS                 │
└────────────────────────┬────────────────────────────────────┘
                         │
         ┌───────────────┼───────────────┐
         ↓               ↓               ↓
   ┌──────────┐   ┌──────────┐   ┌──────────┐
   │Backend #1│   │Backend #2│   │Backend #N│
   │ Node.js  │   │ Node.js  │   │ Node.js  │
   │ Express  │   │ Express  │   │ Express  │
   └────┬─────┘   └────┬─────┘   └────┬─────┘
        │              │              │
        └──────────────┬──────────────┘
                       │
         ┌─────────────┼─────────────┐
         ↓             ↓             ↓
    ┌────────┐   ┌─────────┐   ┌──────────┐
    │MongoDB │   │  Redis  │   │   S3     │
    │(Base)  │   │ (Cache) │   │ (Files)  │
    └────────┘   └─────────┘   └──────────┘
```

### Couches d'Application

**Frontend (PWA - Vue.js + Vite)**
- Composants réutilisables
- State management (Pinia)
- Service Worker (offline)
- Liseuse Canvas (anti-copie)

**Backend (Node.js + Express)**
- Routes REST API
- Middleware d'authentification (JWT)
- Controllers métier
- Services (paiement, email, etc.)

**Base de Données (MongoDB)**
- Documents flexibles
- Scalabilité horizontale
- Indexation optimisée

**Cache (Redis)**
- Sessions utilisateur
- Données fréquemment accédées
- Rate limiting

**Stockage (AWS S3 / Spaces)**
- PDF/ePub originaux
- Avatars utilisateurs
- Backups données

---

## 🛠️ STACK TECHNOLOGIQUE

### Frontend

| Technologie | Version | Utilité |
|-------------|---------|----------|
| **Vue.js** | 3.x | Framework réactif |
| **Vite** | 4.x | Bundler ultra-rapide |
| **Tailwind CSS** | 3.x | Styling utility-first |
| **Pinia** | 2.x | State management |
| **Axios** | 1.x | HTTP client |
| **PDF.js** | 3.x | Rendu PDF (liseuse) |
| **Service Worker** | - | Mode hors-ligne |
| **IndexedDB** | - | Stockage local |

### Backend

| Technologie | Version | Utilité |
|-------------|---------|----------|
| **Node.js** | 18+ | Runtime JavaScript |
| **Express** | 4.x | Web framework |
| **MongoDB** | 5.0+ | Base de données |
| **Mongoose** | 7.x | ODM MongoDB |
| **JWT** | - | Authentification |
| **Bcrypt** | 2.x | Hash des mots de passe |
| **Redis** | 7.x | Cache & sessions |
| **Joi** | 17.x | Validation données |
| **Winston** | 3.x | Logging |
| **Jest** | 29.x | Tests unitaires |

### DevOps

| Technologie | Utilité |
|-------------|----------|
| **Docker** | Containerization |
| **Docker Compose** | Orchestration locale |
| **GitHub Actions** | CI/CD |
| **Nginx** | Reverse proxy |
| **PM2** | Process management |
| **Let's Encrypt** | SSL/TLS gratuit |

### Infrastructure

| Service | Utilité |
|---------|----------|
| **AWS EC2** | Hébergement backend |
| **AWS S3** | Stockage fichiers |
| **CloudFront** | CDN |
| **CinetPay** | Passerelle paiement |
| **Twilio** | SMS (OTP) |
| **SendGrid** | Email |

---

## 🔐 SÉCURITÉ ET PROTECTION

### 1. Authentification

✅ **JWT (JSON Web Tokens)**
- Tokens signés avec secret
- Expiration : 24h
- Refresh tokens : 7 jours
- Révocation possible

✅ **OTP/SMS**
- Envoyé via Twilio
- Valide 5 minutes
- Max 3 tentatives

### 2. Chiffrement des Données

✅ **Mots de passe**
- Bcrypt avec 10 rounds
- Salting automatique
- Jamais stockés en clair

✅ **Transmission**
- HTTPS/TLS obligatoire
- Certificats Let's Encrypt
- HSTS headers

### 3. Protection Contenu

✅ **Rendu Canvas**
- Impossibilité de copier-coller natif
- Rendu pixel-by-pixel des PDF
- Contrôle du clic droit

✅ **Watermark Dynamique**
- Filigrane : Nom + Tél + Email
- Angle -45°, opacité 8%
- Visible en capture d'écran
- Récurrent tous les 200px

✅ **Blocages Navigateur**
- Désactivation Ctrl+S (Save)
- Désactivation Ctrl+C (Copy)
- Désactivation Ctrl+P (Print)
- Clic droit bloqué
- Inspect Element bloqué (DevTools)

### 4. Validation des Données

✅ **Input Validation**
- Joi/Yup sur frontend et backend
- Trim/sanitize automatique
- Type checking strict

✅ **OWASP Top 10**
- Protection SQL Injection (Mongoose)
- Protection XSS (DOMPurify)
- Protection CSRF (tokens)
- Validations CORS

### 5. Webhook Validation

✅ **Signature HMAC**
- Vérification signature CinetPay
- Hash SHA256
- Rejeta si invalide

### 6. Rate Limiting

✅ **100 requêtes par 15 minutes**
- Par IP
- Configurable par endpoint
- Messages d'erreur clairs

### 7. Logging et Monitoring

✅ **Winston Logger**
- Tous les événements logged
- Séparation (app.log, error.log)
- Rotation fichiers

✅ **Monitoring**
- Health checks toutes les 30s
- Alertes sur erreurs
- Tracking des requêtes lentes

---

## 💰 MODÈLE ÉCONOMIQUE

### Flux de Paiement

```
┌──────────────────────────────────────────┐
│ Étudiant paie 500 FCFA pour un chapitre  │
└─────────────────┬────────────────────────┘
                  │
                  ↓
      ┌───────────────────────┐
      │   SPLIT PAYMENT       │
      └─────────┬─────────────┘
                │
      ┌─────────┴─────────┐
      ↓                   ↓
  ┌────────┐         ┌──────────┐
  │Platform│         │Enseignant│
  │  (20%) │         │  (80%)   │
  │ 100 XOF│         │ 400 XOF  │
  └────────┘         └──────────┘
                          │
                          ↓
                   ┌─────────────┐
                   │  Portefeuille│
                   │   Interne    │
                   └─────────────┘
                          │
                          ↓
                  ┌──────────────┐
               Retrait Mobile Money
                  └──────────────┘
```

### Sources de Revenus

**Revenu 1 : Commission Plateforme (20%)**
- Sur chaque transaction
- Utilisé pour opérations, support, développement
- Transparent pour utilisateurs

**Revenu 2 : Services Premium (Future)**
- Promotion personnalisée (500 FCFA/mois)
- Analytics avancées (1000 FCFA/mois)
- Certification de contenu (2000 FCFA unique)

**Revenu 3 : Publicités (Future)**
- Bannières dans le catalogue
- Email marketing
- Partenariats éducatifs

### Modèle de Coûts

| Coût | Montant Annuel (Année 1) |
|-----|------------------------|
| Infrastructure AWS | 12M FCFA |
| Paiements (CinetPay 2%) | 2M FCFA |
| SMS (Twilio) | 0.5M FCFA |
| Email (SendGrid) | 0.1M FCFA |
| Ressources humaines | 36M FCFA |
| Marketing | 5M FCFA |
| Autres | 2M FCFA |
| **TOTAL** | **~57.6M FCFA** |

### Rentabilité (Projection)

| Année | Transactions | Revenus | Coûts | Profit |
|-------|-------------|---------|-------|--------|
| **1** | 5 000 | 50M | 58M | -8M |
| **2** | 25 000 | 250M | 80M | +170M |
| **3** | 100 000 | 1B | 150M | +850M |

---

## 📅 PLANNING ET LIVRABLES

### Sprint 1 : Fondations (Semaines 1-3)

**Objectif :** Infrastructure de base + authentification

- [x] Setup projet (Git, Docker, CI/CD)
- [x] Base de données MongoDB
- [x] Authentification JWT + OTP
- [x] Modèles de données (User, Book, Order)
- [x] API REST (100+ endpoints)
- [x] Frontend catalogue basique
- [x] Intégration Orange Money (v1)

**Livrables :**
- ✅ Backend fonctionnel
- ✅ API documentation (Swagger)
- ✅ Frontend MVP

### Sprint 2 : Marketplace (Semaines 4-6)

**Objectif :** Micro-paiement, dashboard enseignant

- [ ] Micro-paiement par chapitre
- [ ] Dashboard enseignant complet
- [ ] Système de portefeuille
- [ ] Intégration Wave + Moov Money
- [ ] Upload/Découpage PDF
- [ ] Statistiques temps réel
- [ ] Admin panel v1

**Livrables :**
- ✅ Tous les paiements opérationnels
- ✅ Dashboard enseignant produit
- ✅ Admin interface

### Sprint 3 : Sécurité & Production (Semaines 7-9)

**Objectif :** Liseuse sécurisée, optimisations, tests

- [ ] Liseuse Canvas + Watermark
- [ ] Service Worker (offline mode)
- [ ] Tests de sécurité (OWASP)
- [ ] Tests de charge (1000 users)
- [ ] Optimisation performance (< 3s sur 3G)
- [ ] CI/CD pipeline complet
- [ ] Production deployment

**Livrables :**
- ✅ Liseuse sécurisée certifiée
- ✅ Application PWA 100%
- ✅ Production ready

---

## ⚠️ RISQUES ET MITIGATIONS

### Risques Techniques

| Risque | Probabilité | Impact | Mitigation |
|--------|------------|--------|------------|
| Perte de données | Basse | Critique | Backups quotidiens + Réplication MongoDB |
| Panne serveur | Basse | Majeure | Auto-scaling AWS + Monitoring 24/7 |
| Sécurité piratage | Moyenne | Critique | Audit sécu trimestriel + Bug bounty |
| Performance | Moyenne | Majeure | CDN CloudFront + Redis caching |
| Compatibilité navigateur | Basse | Mineure | Tests cross-browser automatisés |

### Risques Commerciaux

| Risque | Probabilité | Impact | Mitigation |
|--------|------------|--------|------------|
| Adoption faible | Moyenne | Majeure | Marketing agressif + Bêta test |
| Concurrence locale | Moyenne | Majeure | Différenciation (Mobile Money) + Vitesse |
| Régulation | Basse | Majeure | Conformité RGPD + Compliance review |
| Churn utilisateurs | Moyenne | Majeure | Feedback constant + Améliorations |
| Frais de paiement élevés | Basse | Mineure | Négociations avec opérateurs |

### Risques Légaux

| Risque | Mitigation |
|--------|------------|
| Propriété intellectuelle | Clauses dans Conditions générales |
| Piratage de contenu | Watermark dynamique + Reports |
| RGPD/Données personnelles | Politique de confidentialité complète |
| Droits d'auteur | Vérification lors du upload |

---

## ✅ CONCLUSION

### Récapitulatif

**FasoSuku** est un projet ambitieux mais **réalisable** qui :

1. ✅ Résout un **problème réel** au Mali
2. ✅ S'adapte aux **réalités locales** (Mobile Money, connectivité)
3. ✅ Crée une **opportunité économique** pour enseignants
4. ✅ Utilise une **stack technologique moderne** et sécurisée
5. ✅ A un **modèle d'affaires viable**
6. ✅ Offre une **scalabilité garantie**

### Prochaines Étapes

1. **Phase de Développement** : 9 semaines
2. **Phase de Tests & QA** : 2 semaines
3. **Phase de Déploiement** : 1 semaine
4. **Phase de Bêta** : 4 semaines
5. **Lancement Production** : Semaine 17

### Impact Attendu

🎓 **Académique :**
- 10 000+ étudiants accédant à ressources de qualité
- 200+ enseignants monétisant leur expertise
- Création d'un écosystème académique numérique malien

💰 **Économique :**
- 50M FCFA générés année 1
- 1B FCFA année 3
- Création de 20+ emplois directs

🌍 **Social :**
- Démocratisation du savoir académique
- Valorisation des enseignants maliens
- Fermeture de la fracture numérique

---

## 📚 ANNEXES

### A. Personas Détaillées

**Persona 1 : Aminata (Étudiante)**
- Âge : 21 ans
- Étude : Licence Informatique, FST Bamako
- Budget : 2000 FCFA/mois pour ressources
- Usage : Smartphone 4G Orange Money
- Défi : Accès aux derniers cours de programmation
- Solution : Achète les chapitres de programmation avancée (500 FCFA chacun)

**Persona 2 : Dr. Diallo (Enseignant)**
- Âge : 48 ans
- Expérience : 15 ans d'enseignement
- Spécialité : Chimie Organique
- Production : 3 livres/an + 20 articles
- Défi : Monétiser ses 20+ années de recherche
- Solution : Publie ses livres sur FasoSuku, gagne 400M FCFA/an

### B. Schémas MongoDB

Voir fichier [DATABASE.md](./docs/DATABASE.md)

### C. Spécification API

Voir fichier [API_SWAGGER.yaml](./docs/API_SWAGGER.yaml)

### D. Guide de Déploiement

Voir fichier [DEPLOYMENT.md](./docs/DEPLOYMENT.md)

---

**Rapport Préparé Par :** Diallo Logit  
**Date :** 24 Mai 2024  
**Version :** 1.0  
**Statut :** ✅ Validé & Approuvé

---

*FasoSuku - Partager le Savoir Académique Sans Frontières* 🌍📚
