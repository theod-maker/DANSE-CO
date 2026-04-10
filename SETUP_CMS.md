# Configuration du CMS Sanity

## 1. Créer un compte Sanity

Rendez-vous sur [sanity.io](https://www.sanity.io/) et créez un compte gratuit.

## 2. Créer un projet Sanity

Dans le dashboard Sanity, créez un nouveau projet :
- Choisissez un nom (ex: `danse-et-co`)
- Notez votre **Project ID** (visible dans les paramètres du projet)

## 3. Configurer le projet

Copiez le fichier `.env.example` en `.env` :

```bash
cp .env.example .env
```

Remplissez les variables dans `.env` :

```env
VITE_SANITY_PROJECT_ID=votre-project-id
VITE_SANITY_DATASET=production
```

## 4. Lancer le studio CMS

```bash
npx sanity dev
```

Le studio s'ouvre sur [http://localhost:3333](http://localhost:3333).

## 5. Première connexion

Lors de la première ouverture du studio, Sanity vous demandera de vous connecter avec le compte créé à l'étape 1.

---

## Ce que vous pouvez modifier dans le CMS

### Page d'accueil
Tous les textes de la page d'accueil : accroche, description, section philosophie, descriptions des cartes services.

### Professeurs
Ajout, modification et suppression de fiches professeurs (nom, spécialité, bio, expérience).

### Planning des cours
Gestion des créneaux : nom du cours, jour, horaire, salle, niveau.

### Tarifs
Saison, tableau des tarifs, informations complémentaires.

---

## Déploiement

Après avoir rempli le contenu dans le studio, relancez le build du site :

```bash
npm run build
```

Les données Sanity sont chargées en temps réel côté client — pas besoin de rebuilder à chaque modification de contenu.

> **Note** : Si `VITE_SANITY_PROJECT_ID` n'est pas configuré, le site affiche le contenu de démonstration local sans erreur.
