# Guide d'Installation - Formulaire de Contact Fonctionnel

## 📋 Sommaire

1. [Option 1: EmailJS (Recommandée)](#option-1--emailjs-recommandée)
2. [Option 2: PHP Backend](#option-2--php-backend)
3. [Test de la Solution](#test-de-la-solution)
4. [Dépannage](#dépannage)

---

## Option 1: EmailJS (Recommandée) ⭐

**Avantages:**
- ✅ Aucun serveur backend nécessaire
- ✅ Configuration gratuite et rapide
- ✅ Fiable et professionnel
- ✅ Support pour les attachements

### Étape 1: Créer un compte EmailJS

1. Allez sur [https://www.emailjs.com/](https://www.emailjs.com/)
2. Cliquez sur **Sign Up** (en haut à droite)
3. Remplissez le formulaire avec:
   - Email: `congominingcorporationsolution@gmail.com`
   - Password: Créer un mot de passe fort
4. Confirmez votre email

### Étape 2: Configurer le service Gmail

1. Connectez-vous à EmailJS
2. Allez dans **Email Services** (menu de gauche)
3. Cliquez sur **Add Service**
4. Sélectionnez **Gmail**
5. Cliquez sur **Connect with Gmail**
6. Autorisez EmailJS à accéder à votre compte Gmail
7. Donnez un nom au service: `Gmail Service`
8. Cliquez sur **Save**

> **Note:** Gardez le Service ID visible (ex: `service_abc123xyz`)

### Étape 3: Créer un Email Template

1. Allez dans **Email Templates** (menu de gauche)
2. Cliquez sur **Create New Template**
3. Remplissez le template avec:

**Template Name:** `Contact Form Template`

**Subject:** `Nouveau message de Congo Mining`

**Body:**
```
Bonjour,

Vous avez reçu un nouveau message de contact:

========================================
Nom: {{from_name}}
Email: {{from_email}}
Téléphone: {{phone}}
========================================

Message:
{{message}}

========================================
Date: {{date}}
========================================

Répondre à: {{from_email}}
```

4. Cliquez sur **Save**
5. Gardez le Template ID visible (ex: `template_abc123xyz`)

### Étape 4: Obtenir la Clé Publique

1. Allez dans **Account** (menu de gauche)
2. Cherchez **Public Key**
3. Copiez-la (ex: `abc123xyz_public_key`)

### Étape 5: Configurer le script.js

1. Ouvrez le fichier `script.js`
2. Cherchez la section "CONFIGURATION"
3. Modifiez ces lignes:

```javascript
const USE_EMAILJS = true; // Mettre à true
const EMAILJS_PUBLIC_KEY = 'VOTRE_PUBLIC_KEY'; // Collez votre clé
const EMAILJS_SERVICE_ID = 'service_abc123xyz'; // Collez votre Service ID
const EMAILJS_TEMPLATE_ID = 'template_abc123xyz'; // Collez votre Template ID
```

### Étape 6: Ajouter la librairie EmailJS à index.html

Dans le `<head>` du fichier `index.html`, ajoutez cette ligne:

```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/index.min.js"></script>
```

**Placez-la AVANT** la balise `<script src="script.js"></script>`

Exemple complet:
```html
<head>
    ...
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- EmailJS Library -->
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/index.min.js"></script>
    
    <script>
        tailwind.config = {
            ...
        }
    </script>
</head>
```

### Étape 7: Tester

1. Rafraîchissez la page
2. Remplissez le formulaire
3. Cliquez sur **Envoyer le message**
4. Vérifiez que l'email arrive à `congominingcorporationsolution@gmail.com`

---

## Option 2: PHP Backend

**Avantages:**
- ✅ Contrôle total du serveur
- ✅ Enregistrement des messages en base de données possible
- ✅ Pas de dépendances externes

### Prérequis

- Un serveur web avec **PHP 7.0+**
- Fonction `mail()` activée sur le serveur

### Configuration

1. Le fichier `send-email.php` est déjà à la racine du projet
2. Assurez-vous que la fonction `mail()` est activée chez votre hébergeur
3. Dans `script.js`, mettez:

```javascript
const USE_EMAILJS = false;
const USE_PHP_BACKEND = true; // Mettre à true
```

4. Testez le formulaire

### Dépannage PHP

Si les emails ne sont pas envoyés:

1. Vérifiez auprès de votre hébergeur que `mail()` est activé
2. Vérifiez les logs d'erreurs PHP dans `contact-log.txt`
3. Testez avec un email de test d'abord
4. Vérifiez que `send-email.php` n'a pas d'erreurs de syntaxe

---

## Test de la Solution

### Checklist de test

- [ ] Essai avec tous les champs remplis → doit envoyer
- [ ] Essai sans nom → message d'erreur "Veuillez entrer votre nom"
- [ ] Essai sans email → message d'erreur "Veuillez entrer votre email"
- [ ] Essai avec email invalide (abc@) → message d'erreur "adresse email valide"
- [ ] Essai sans message → message d'erreur "Veuillez entrer votre message"
- [ ] Essai avec message < 10 caractères → message d'erreur approprié
- [ ] Après envoi réussi → formulaire vide et message de succès
- [ ] Email reçu à `congominingcorporationsolution@gmail.com` ✓

### Vérifier les emails envoyés

**EmailJS:**
- Vérifiez la boîte de réception de `congominingcorporationsolution@gmail.com`
- Regardez les logs dans le tableau de bord EmailJS

**PHP:**
- Vérifiez la boîte de réception de `congominingcorporationsolution@gmail.com`
- Consultez `contact-log.txt` pour les tentatives d'envoi

---

## Dépannage

### Le formulaire ne s'envoie pas

**Vérifications:**
1. Avez-vous activé l'une des deux options (`USE_EMAILJS` ou `USE_PHP_BACKEND`)?
2. Avez-vous la bonne clé/ID pour EmailJS?
3. La librairie EmailJS est-elle chargée dans `<head>`?
4. Y a-t-il des erreurs dans la console du navigateur? (F12)

### Email n'arrive pas

**Pour EmailJS:**
1. Allez dans le Dashboard EmailJS
2. Vérifiez les "Email Logs"
3. Vérifiez que Gmail n'a pas bloqué EmailJS
4. Essayez une adresse email différente

**Pour PHP:**
1. Demandez à votre hébergeur si `mail()` est activé
2. Vérifiez les logs d'erreur PHP
3. Testez avec une adresse email simple d'abord
4. Vérifiez les paramètres SPF/DKIM de votre domaine

### Erreur "Méthode non autorisée" avec PHP

- Votre serveur refuse les requêtes POST
- Contactez votre hébergeur pour autoriser POST sur `send-email.php`

### Emails vont en spam

**Solutions:**
1. Configurez les records SPF et DKIM de votre domaine
2. Utilisez EmailJS (plus fiable pour la délivrabilité)
3. Ajoutez une signature à vos emails

---

## Support

Pour toute question:
- 📞 Téléphone: +243 904 313 362
- 📱 WhatsApp: +243 971 501 629
- 📧 Email: congominingcorporationsolution@gmail.com

---

**Version:** 1.0  
**Mise à jour:** 5 janvier 2026  
**Développeur:** Congo Mining Corporation Solution SARLU
