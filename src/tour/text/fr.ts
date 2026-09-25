import type { TourText } from './types';

/** Le texte de la visite, en français. */
export const fr: TourText = {
  groups: {
    start: {
      title: 'Premiers pas',
      summary:
        'Créez un compte, connectez-vous et voyez ce qu’est une session.',
    },
    workspaces: {
      title: 'Espaces de travail',
      summary:
        'Chaque client de votre app reçoit un espace de travail. Créer, changer, renommer, supprimer.',
    },
    team: {
      title: 'Équipe',
      summary:
        'Invitation par e-mail, rôles, sièges, et ce que chaque rôle peut faire.',
    },
    billing: {
      title: 'Plans et facturation',
      summary:
        'Essais, plans, paiement, factures et portail de facturation, tout depuis la console.',
    },
    usage: {
      title: 'Usage et quotas',
      summary:
        'Mesurez ce que fait votre app et laissez le plan fixer la limite.',
    },
    credits: {
      title: 'Crédits',
      summary:
        'Un solde prépayé que votre app dépense, et des packs que les gens achètent.',
    },
    features: {
      title: 'Feature flags',
      summary:
        'Activez une fonctionnalité pour un espace de travail ou un utilisateur sans déployer.',
    },
    permissions: {
      title: 'Permissions',
      summary:
        'Des rôles par espace de travail, vérifiés par le SDK et par le serveur.',
    },
    notifications: {
      title: 'Notifications',
      summary:
        'E-mail, push et une boîte de réception où chaque utilisateur peut revenir.',
    },
    push: {
      title: 'Push',
      summary: 'Push navigateur, abonnement et livraison depuis la plateforme.',
    },
    agents: {
      title: 'Agents et MCP',
      summary:
        'Connectez Claude ou n’importe quel client MCP à cette app en votre nom.',
    },
    webhooks: {
      title: 'Webhooks',
      summary:
        'Les événements de la plateforme reflétés dans la base de données de cette app.',
    },
    platform: {
      title: 'Plateforme',
      summary:
        'Langues, thèmes, vos données, et comment emporter ce dépôt chez vous.',
    },
    content: {
      title: 'Contenu',
      summary:
        'Docs, FAQ et textes rédigés dans la console, lus par cette app.',
    },
    forms: {
      title: 'Formulaires',
      summary:
        'Un formulaire créé dans la console, affiché et envoyé depuis ici.',
    },
    collections: {
      title: 'Collections',
      summary:
        'Des données sur mesure avec des schémas versionnés, stockées sur la plateforme.',
    },
    assets: {
      title: 'Fichiers',
      summary:
        'Des fichiers envoyés par l’app, stockés et servis par la plateforme.',
    },
    links: {
      title: 'Liens courts',
      summary: 'Des liens de partage qui comptent chaque clic.',
    },
    audience: {
      title: 'Audience et attributs',
      summary:
        'Des attributs sur mesure pour un utilisateur, une liste d’attente et une audience marketing.',
    },
    tracking: {
      title: 'Suivi',
      summary:
        'Des balises d’analyse avec consentement, événements personnalisés et attribution.',
    },
    workflows: {
      title: 'Workflows',
      summary:
        'Des automatisations créées dans la console, lancées par ce que vous faites ici.',
    },
    reports: {
      title: 'Rapports',
      summary:
        'Chaque module produit des rapports ; cette app en affiche quelques-uns.',
    },
  },
  tasks: {
    'sign-up': {
      title: 'Créez votre compte',
      why: 'L’inscription, la vérification de l’e-mail et la session appartiennent à la plateforme, hébergées sur ses pages. Cette app ne contient aucun code d’authentification.',
      steps: [
        'Cliquez sur Se connecter sur la page d’accueil.',
        'Inscrivez-vous avec votre e-mail et le code que vous recevez.',
        'Vous revenez ici, connecté.',
      ],
    },
    'trust-device': {
      title: 'Faire confiance à cet appareil',
      why: 'Un appareil de confiance reste connecté 90 jours et évite les vérifications supplémentaires. Chaque appareil et chaque session sont listés et peuvent être déconnectés.',
      steps: [
        'Pendant la connexion, choisissez Faire confiance à cet appareil.',
        'Ouvrez Profil → Appareils et sessions pour le voir listé.',
      ],
    },
    'add-passkey': {
      title: 'Ajouter une passkey',
      why: 'Connexion sans mot de passe par empreinte, visage ou code de l’appareil. Activée par organisation dans la console ; rien à construire.',
      steps: [
        'Ouvrez Profil → Sécurité.',
        'Ajoutez une passkey et suivez l’invite de votre navigateur.',
        'Déconnectez-vous puis reconnectez-vous avec elle.',
      ],
    },
    'see-session': {
      title: 'Voir comment la session atteint votre serveur',
      why: 'Le SDK détient un identifiant de session ; cette app le garde dans un cookie httpOnly et ses routes API appellent BuildBase avec lui. Votre serveur ne manipule jamais de mot de passe.',
      steps: [
        'Ouvrez Profil.',
        'Lisez le panneau « Comment ça marche » : le cookie, le client serveur, et quel appel a produit le profil.',
      ],
    },
    'sign-out-everywhere': {
      title: 'Se déconnecter partout',
      why: 'Met fin à chaque session sur chaque appareil de la plateforme, pas seulement au navigateur où vous êtes.',
      steps: [
        'Ouvrez Profil → Appareils et sessions.',
        'Déconnectez une autre session, ou utilisez Se déconnecter partout.',
      ],
    },
    'first-workspace': {
      title: 'Repérez votre premier espace de travail',
      why: 'Un espace de travail est le tenant : chaque plan, quota, solde de crédits et membre lui appartient. La plateforme a créé le vôtre à l’inscription.',
      steps: [
        'Regardez le nom de l’espace de travail dans la barre latérale.',
        'Ouvrez le sélecteur pour le voir listé.',
      ],
    },
    'create-workspace': {
      title: 'Créer un second espace de travail',
      why: 'Une personne peut appartenir à plusieurs tenants. Chacun a sa propre facturation.',
      steps: [
        'Ouvrez le sélecteur d’espace de travail.',
        'Choisissez Créer un espace de travail et nommez-le.',
      ],
    },
    'switch-workspace': {
      title: 'Passer de l’un à l’autre',
      why: 'Changer d’espace remplace tous les contextes d’un coup : abonnement, usage, crédits, membres, fonctionnalités.',
      steps: [
        'Ouvrez le sélecteur et choisissez l’autre espace de travail.',
        'Regardez les cartes du tableau de bord changer.',
      ],
    },
    'rename-workspace': {
      title: 'Renommer un espace de travail',
      why: 'L’écran de paramètres intégré gère les réglages généraux ; vous décidez quelles sections s’affichent.',
      steps: ['Ouvrez Paramètres → Général.', 'Changez le nom et enregistrez.'],
    },
    'workspace-settings-screens': {
      title: 'Ouvrir chaque écran de paramètres intégré',
      why: 'Compte, Sécurité, Appareils, Agents connectés, Général, Membres, Plan et facturation, Usage, Crédits, Fonctionnalités, Notifications, Zone de danger : tout est fourni, tout peut être désactivé.',
      steps: [
        'Ouvrez Paramètres.',
        'Parcourez les sections de la barre latérale.',
      ],
    },
    'delete-workspace': {
      title: 'Supprimer le second espace de travail',
      why: 'La zone de danger n’est proposée que si les paramètres autorisent une personne à en posséder plusieurs.',
      steps: [
        'Passez au second espace de travail.',
        'Paramètres → Zone de danger → Supprimer.',
      ],
    },
    'invite-member': {
      title: 'Inviter quelqu’un par e-mail',
      why: 'L’adresse n’a pas besoin de compte. La personne reçoit un e-mail, suit le lien, s’inscrit ou se connecte, et accepte. Une invitation en attente occupe un siège.',
      steps: [
        'Ouvrez Équipe.',
        'Saisissez une adresse e-mail que vous pouvez consulter et un rôle, puis envoyez.',
      ],
    },
    'pending-seat': {
      title: 'Voir l’invitation en attente occuper un siège',
      why: 'Les sièges sont facturés tant qu’une invitation est en attente, pour que le nombre de sièges sur Équipe et sur le plan concordent.',
      steps: [
        'Sur Équipe, lisez les cartes de sièges et la note sous le formulaire d’invitation : la ligne en attente est comptée.',
      ],
    },
    'accept-invitation': {
      title: 'Accepter une invitation',
      why: 'Depuis le lien de l’e-mail, ou depuis la liste des invitations dans l’app. Arriver par le lien prouve l’adresse, donc pas de vérification séparée.',
      steps: [
        'Ouvrez l’e-mail d’invitation dans l’autre boîte et suivez son lien.',
        'Inscrivez-vous ou connectez-vous. Le bandeau d’invitation en haut de chaque page du tableau de bord propose Accepter.',
      ],
    },
    'change-role': {
      title: 'Changer le rôle d’un membre',
      why: 'Les rôles sont par espace de travail et définis dans la console. Le membre est prévenu par e-mail et dans sa boîte de réception.',
      steps: [
        'Sur Équipe, choisissez un autre rôle à côté d’un membre qui n’est pas le propriétaire.',
      ],
    },
    'viewer-limits': {
      title: 'Voir ce qu’un lecteur ne peut pas faire',
      why: 'Le SDK masque ce qu’un rôle ne peut pas faire, et le serveur le refuse de toute façon.',
      steps: [
        'Connectez-vous en tant que lecteur.',
        'Ouvrez Permissions et Documents : les actions que le lecteur n’a pas sont absentes ou désactivées.',
      ],
    },
    'revoke-invitation': {
      title: 'Révoquer une invitation en attente',
      why: 'Le lien cesse de fonctionner et le siège est libéré.',
      steps: [
        'Invitez une autre adresse et révoquez-la depuis la liste des invitations en attente.',
      ],
    },
    'seat-limit': {
      title: 'Atteindre la limite de sièges',
      why: 'Le plan fixe les sièges. À la limite, le formulaire d’invitation laisse place au message de limite, et le serveur répond 402.',
      steps: [
        'Invitez jusqu’à ce que le formulaire indique que la limite est atteinte.',
      ],
    },
    'see-trial': {
      title: 'Voir votre période d’essai',
      why: 'Un nouvel espace de travail démarre sur l’essai que le plan définit. Le tableau de bord indique le temps restant.',
      steps: ['Ouvrez le tableau de bord et lisez la carte d’essai.'],
    },
    'compare-plans': {
      title: 'Comparer les plans',
      why: 'La page de tarifs est générée à partir des plans de la console : noms, prix par période, quotas, limites et fonctionnalités. Changez un prix là-bas et il change ici.',
      steps: [
        'Ouvrez Tarifs.',
        'Changez la période de facturation et la devise.',
      ],
    },
    subscribe: {
      title: 'S’abonner avec une carte de test',
      why: 'Le paiement est celui de Stripe, créé par la plateforme pour votre espace de travail. Utilisez la carte 4242 4242 4242 4242.',
      steps: [
        'Sur Tarifs, choisissez un plan.',
        'Payez avec la carte de test.',
        'Vous revenez au tableau de bord, sur le plan.',
      ],
    },
    'trial-banner-gone': {
      title: 'Voir le bandeau d’essai disparaître',
      why: 'Les gates se réaffichent depuis le contexte d’abonnement dès qu’il change.',
      steps: [
        'De retour sur le tableau de bord, la carte d’essai a disparu et la carte du plan affiche le plan.',
      ],
    },
    'view-invoice': {
      title: 'Voir une facture',
      why: 'Les factures viennent de Stripe via la plateforme, avec un PDF hébergé.',
      steps: ['Ouvrez Factures et ouvrez la plus récente.'],
    },
    'billing-portal': {
      title: 'Ouvrir le portail de facturation',
      why: 'Changement de carte, reçus et résiliation sur le portail Stripe, ouvert pour l’espace de travail.',
      steps: [
        'Sur la carte du plan du tableau de bord, choisissez Gérer la facturation.',
      ],
    },
    upgrade: {
      title: 'Passer au plan supérieur',
      why: 'Au prorata par Stripe ; les quotas et fonctionnalités changent avec le plan.',
      steps: ['Sur Tarifs, choisissez le plan supérieur.'],
    },
    'cancel-resume': {
      title: 'Résilier, puis reprendre',
      why: 'La résiliation court jusqu’à la fin de la période et peut être annulée jusque-là.',
      steps: [
        'Résiliez depuis la carte du plan.',
        'Reprenez depuis le même endroit.',
      ],
    },
    'seat-price': {
      title: 'Voir le prix des sièges changer quand un membre rejoint',
      why: 'Les plans par siège facturent les membres et les invitations en attente. Le SDK calcule le même montant que celui facturé par la plateforme.',
      steps: [
        'Sur Équipe, invitez quelqu’un ; lisez la ligne des sièges et la carte du plan.',
      ],
    },
    'record-usage': {
      title: 'Enregistrer de l’usage',
      why: 'Votre app mesure ce qu’elle fait (un document créé, une vidéo traitée) ; le plan dit ce qui est inclus.',
      steps: [
        'Ouvrez Documents et créez-en un.',
        'Lisez la ligne « Ce que la plateforme a enregistré » sous le formulaire.',
        'Ouvrez Usage : le quota de documents a bougé.',
      ],
    },
    'usage-threshold': {
      title: 'Franchir le seuil d’alerte',
      why: 'Un gate s’affiche à 80 % pour que vous puissiez prévenir avant la limite.',
      steps: [
        'Créez des documents jusqu’à ce que l’avis apparaisse au-dessus de la liste.',
      ],
    },
    'usage-limit': {
      title: 'Atteindre la limite',
      why: 'Au volume inclus, le serveur répond 402 et le bouton de création se verrouille, sauf si le plan autorise le dépassement. L’interface et le serveur lisent le même quota.',
      steps: [
        'Continuez de créer jusqu’à ce que le bouton se verrouille et qu’une création soit refusée.',
      ],
    },
    'usage-log': {
      title: 'Lire le journal d’usage',
      why: 'Chaque unité enregistrée est une ligne, par espace de travail et par quota.',
      steps: ['Sur Usage, ouvrez le journal.'],
    },
    'see-balance': {
      title: 'Voir votre solde de crédits',
      why: 'Un solde prépayé par espace de travail, accordé par le plan ou acheté en packs.',
      steps: ['Ouvrez Crédits.'],
    },
    'spend-credits': {
      title: 'Dépenser des crédits sur une action',
      why: 'Votre serveur consomme ; le solde se met à jour dans chaque onglet ouvert.',
      steps: [
        'Sur Documents, créez-en un : cela dépense un crédit.',
        'Regardez le solde de la barre latérale et la ligne de mesure changer.',
      ],
    },
    'credits-low': {
      title: 'Arriver à court',
      why: 'Un gate à un seuil, pour proposer une recharge avant que le solde soit épuisé.',
      steps: [
        'Continuez de créer des documents jusqu’à ce que l’avis de solde faible s’affiche au-dessus de la liste.',
      ],
    },
    'buy-credits': {
      title: 'Acheter un pack',
      why: 'Les packs sont définis dans la console ; le paiement est celui de Stripe.',
      steps: [
        'Sur Crédits, achetez le pack de 100 crédits avec la carte de test.',
      ],
    },
    'credit-transactions': {
      title: 'Lire les transactions',
      why: 'Chaque attribution, achat et dépense est une ligne, avec le lot dont elle provient.',
      steps: ['Sur Crédits, descendez jusqu’à Transactions.'],
    },
    'feature-off': {
      title: 'Voir une fonctionnalité désactivée',
      why: 'Documents a trois sections derrière des flags d’espace de travail : exports, partage, signatures électroniques. Désactivée, elle montre un état verrouillé, pas un bouton cassé.',
      steps: [
        'Ouvrez Documents et descendez jusqu’à Feature gates.',
        'Trouvez une section marquée Désactivée.',
      ],
    },
    'feature-on': {
      title: 'La voir activée',
      why: 'Les flags changent depuis la console, sans déploiement. Un plan peut les accorder, et un espace de travail peut être surchargé à la main.',
      steps: [
        'Passez à un plan qui inclut une fonctionnalité, ou demandez-nous d’en activer une pour votre espace de travail.',
        'Rechargez Documents : la section se déverrouille.',
      ],
    },
    'user-feature': {
      title: 'Un flag sur une personne, pas sur un espace de travail',
      why: 'Les fonctionnalités utilisateur suivent la personne d’un espace à l’autre ; les fonctionnalités d’espace de travail suivent le tenant.',
      steps: [
        'Ouvrez Profil : les fonctionnalités listées là sont les vôtres, pas celles de l’espace de travail.',
      ],
    },
    'permission-matrix': {
      title: 'Lire votre matrice de permissions',
      why: 'Ce que votre rôle dans cet espace de travail autorise, résolu par la plateforme.',
      steps: ['Ouvrez Permissions.'],
    },
    'forbidden-action': {
      title: 'Tenter une action interdite',
      why: 'Les boutons sont désactivés pour un lecteur ; si vous appelez quand même l’API, le serveur répond 403. Les deux lisent le rôle que la plateforme vous attribue dans cet espace de travail.',
      steps: [
        'En tant que lecteur, ouvrez Documents : créer et supprimer sont désactivés.',
        'Envoyez quand même la requête, depuis un terminal ou les outils MCP : 403.',
      ],
    },
    'custom-role': {
      title: 'Voir un rôle personnalisé',
      why: 'Les rôles et leurs permissions sont définis par organisation dans la console.',
      steps: [
        'Lisez les rôles sur Permissions : cette démo définit admin, editor et viewer.',
      ],
    },
    'inbox-first-item': {
      title: 'Trouver votre première notification',
      why: 'Tout ce que l’app vous envoie arrive dans une boîte de réception où vous pouvez revenir : un élément par notification, quel que soit le canal de livraison.',
      steps: [
        'Cliquez sur la cloche dans l’en-tête, ou ouvrez Boîte de réception dans la barre latérale.',
        'Tout ce que l’app vous a envoyé est là ; ouvrir le panneau marque comme vu, pas comme lu.',
      ],
    },
    'send-notification': {
      title: 'Envoyer une notification depuis l’app',
      why: 'Un seul appel envoie par e-mail et push ; le gate de la plateforme décide quels canaux se déclenchent.',
      steps: [
        'Ouvrez Notifications. Le formulaire est prérempli avec l’événement « Comment added ».',
        'Envoyez-le à vous-même, puis regardez la cloche.',
      ],
    },
    'inbox-live': {
      title: 'La voir arriver en direct',
      why: 'Les boîtes de réception ouvertes sont prévenues par socket et se rafraîchissent ; pas de rechargement.',
      steps: [
        'Gardez la boîte de réception ouverte dans un onglet et envoyez depuis un autre.',
      ],
    },
    'open-from-email': {
      title: 'L’ouvrir depuis l’e-mail',
      why: 'Cliquer sur le lien de l’e-mail marque l’élément comme lu ; ouvrir seulement l’e-mail ne le fait pas.',
      steps: [
        'Ouvrez l’e-mail reçu et suivez son lien.',
        'L’élément de la boîte de réception est lu, « par clic e-mail ».',
      ],
    },
    'mark-all-read': {
      title: 'Tout marquer comme lu, en archiver un',
      why: 'Lu, vu et archivé sont des états distincts, conservés par personne.',
      steps: [
        'Dans la boîte de réception, archivez un élément et marquez le reste comme lu.',
      ],
    },
    'notification-preferences': {
      title: 'Désactiver un canal pour vous-même',
      why: 'Chaque membre choisit comment il est interrompu ; l’administrateur de l’espace de travail fixe les valeurs par défaut et peut rendre un événement obligatoire.',
      steps: [
        'Paramètres → Notifications.',
        'Désactivez l’e-mail pour « Comment added » ; renvoyez et voyez-le arriver seulement dans la boîte de réception.',
      ],
    },
    'required-event': {
      title: 'Voir un événement obligatoire',
      why: 'Un administrateur peut rendre un événement obligatoire ; les membres ne peuvent pas le désactiver.',
      steps: ['Paramètres → Notifications : « Weekly report » est verrouillé.'],
    },
    'delivery-log': {
      title: 'Voir le journal de livraison de la console',
      why: 'Chaque notification envoyée à chaque utilisateur, avec ce qu’ont fait l’e-mail et le push, et si elle a été lue.',
      steps: [
        'Regardez la capture d’écran de cette tâche ; le journal est dans la console, pas dans l’app.',
      ],
    },
    'push-subscribe': {
      title: 'Abonner ce navigateur au push',
      why: 'Web push avec les clés VAPID de la plateforme et un service worker fourni par le SDK.',
      steps: [
        'Ouvrez Notifications et activez le push.',
        'Autorisez l’invite du navigateur.',
      ],
    },
    'push-receive': {
      title: 'Recevoir un push',
      why: 'Envoyé par appareil, livré par le navigateur même quand l’onglet est fermé.',
      steps: [
        'Envoyez-vous l’événement « Comment added » avec le push activé.',
      ],
    },
    'push-click': {
      title: 'Cliquer dessus',
      why: 'Le clic passe par la vérification de lien de la plateforme et marque l’élément comme lu.',
      steps: ['Cliquez sur la notification push.'],
    },
    'mcp-config': {
      title: 'Configurer votre client MCP',
      why: 'Cette app est un serveur MCP. Tout client MCP se connecte avec votre compte BuildBase et agit en votre nom.',
      steps: [
        'Ouvrez Profil → Agents connectés.',
        'Choisissez votre client dans le guide et suivez ses étapes : l’adresse du serveur est le /api/mcp de cette app.',
      ],
    },
    'mcp-connect': {
      title: 'Connecter un agent',
      why: 'Le client découvre le serveur OAuth via /.well-known, vous connecte sur les pages hébergées, et reçoit un jeton que cette app a émis avec son propre secret.',
      steps: ['Redémarrez le client et approuvez la connexion.'],
    },
    'mcp-call': {
      title: 'Lui demander de lister vos documents',
      why: 'Les outils intégrés lisent votre compte ; les outils propres à l’app lisent et écrivent ses données, selon vos permissions.',
      steps: [
        'Demandez : « List my documents in BuildBase Demo ».',
        'L’agent appelle list_documents ; la visite coche la tâche dès qu’un outil s’exécute en votre nom.',
      ],
    },
    'mcp-write': {
      title: 'Lui demander d’en créer un',
      why: 'Une écriture via un agent est mesurée et vérifiée en permissions exactement comme un clic.',
      steps: [
        'Demandez : « Create a document called Agent test ».',
        'Cela exige le scope documents:write que vous avez accordé sur l’écran de consentement.',
      ],
    },
    'agent-list': {
      title: 'Voir l’agent connecté, et le déconnecter',
      why: 'Chaque autorisation d’agent est listée avec ses scopes et peut être révoquée.',
      steps: ['Profil → Agents connectés → Déconnecter.'],
    },
    'llms-txt': {
      title: 'Lire ce que lisent les agents',
      why: 'llms.txt, le catalogue d’API et les documents .well-known sont générés depuis une seule configuration.',
      steps: [
        'Ouvrez /llms.txt, puis /.well-known/mcp/server-card.json et /openapi.json.',
      ],
    },
    'webhook-received': {
      title:
        'Voir un événement de la plateforme arriver dans la base de cette app',
      why: 'Abonnements, espaces de travail et membres changent sur la plateforme ; les webhooks préviennent votre serveur, signés.',
      steps: [
        'Faites quelque chose que la plateforme remarque : invitez quelqu’un, abonnez-vous, achetez des crédits.',
        'Ouvrez Événements : le tableau des webhooks liste ce qui est arrivé, chacun vérifié par signature avant d’être stocké.',
      ],
    },
    'sdk-events': {
      title: 'Voir aussi les événements du navigateur',
      why: 'Le SDK émet des événements de cycle de vie dans le navigateur ; cette app les transmet pour garder ses propres tables à jour.',
      steps: ['Sur Événements, lisez le tableau des événements de l’app.'],
    },
    'switch-language': {
      title: 'Changer de langue',
      why: 'Huit langues dans les écrans du SDK et dans cette app, avec pluriels ICU et chiffres natifs.',
      steps: ['Utilisez le sélecteur de langue dans l’en-tête.'],
    },
    rtl: {
      title: 'Essayer l’arabe',
      why: 'Mise en page de droite à gauche dans les écrans du SDK, pas seulement des chaînes traduites.',
      steps: ['Passez à العربية et ouvrez Paramètres.'],
    },
    'dark-mode': {
      title: 'Basculer en mode sombre',
      why: 'Les écrans du SDK suivent la classe .dark et les variables CSS de votre app.',
      steps: ['Utilisez le bouton de thème.'],
    },
    'export-data': {
      title: 'Exporter vos données',
      why: 'RGPD article 15 : les données propres à cette app plus votre profil de la plateforme, dans un seul fichier.',
      steps: ['Profil → Exporter mes données.'],
    },
    'clone-it': {
      title: 'L’emporter chez vous',
      why: 'Tout ce que vous venez de faire est dans ce dépôt. Clonez-le, pointez-le vers votre organisation, et partez de là.',
      steps: [
        'git clone https://github.com/buildbase-app/nextjs-starter',
        'Copiez .env.example vers .env.local et renseignez votre organisation et votre client.',
        'npm install && npm run dev',
      ],
    },
    'delete-account': {
      title: 'Supprimer votre compte',
      why: 'RGPD article 17 : effacé ici et sur la plateforme.',
      steps: ['Profil → Supprimer mon compte. Cela met fin à la visite.'],
    },
    'help-policy': {
      title: 'Lisez le centre d’aide',
      why: 'Le contenu éditorial vit dans la console, pas dans ce dépôt : un bloc de politique, des docs, des FAQ, des témoignages. L’app le lit via l’API de l’organisation avec un jeton côté serveur uniquement.',
      steps: [
        'Ouvrez le centre d’aide.',
        'Lisez le bloc de politique de remboursement.',
        'Modifiez son texte dans la console et rechargez.',
      ],
    },
    'help-doc': {
      title: 'Ouvrez une doc',
      why: 'Les docs ont des dossiers et un indicateur de publication ; l’app liste les dossiers depuis l’arborescence et n’affiche que ce qui est publié.',
      steps: [
        'Dans le centre d’aide, choisissez une doc dans la colonne de gauche.',
      ],
    },
    'help-faq': {
      title: 'Dépliez une FAQ',
      why: 'Une collection de FAQ est une liste de questions choisies ; une même question peut figurer dans plusieurs collections.',
      steps: [
        'Dans le centre d’aide, ouvrez une question sous Questions fréquentes.',
        'Ajoutez-en une dans la console et rechargez.',
      ],
    },
    'help-testimonials': {
      title: 'Consultez les témoignages',
      why: 'Les témoignages restent des brouillons jusqu’à ce que quelqu’un les publie dans la console.',
      steps: [
        'Faites défiler jusqu’à Ce que disent nos clients dans le centre d’aide.',
      ],
    },
    'form-submit': {
      title: 'Envoyez le formulaire de contact',
      why: 'Le schéma du formulaire est créé dans la console et servi publiquement ; chaque envoi devient un enregistrement de collection et déclenche form.submitted. Cette app fait transiter l’envoi par son propre serveur pour ajouter ses vérifications.',
      steps: [
        'Ouvrez Formulaires.',
        'Remplissez le formulaire de contact et envoyez-le.',
        'Il apparaît sous Derniers envois.',
      ],
    },
    'form-invalid': {
      title: 'Envoyez quelque chose que le formulaire refuse',
      why: 'La plateforme valide selon le schéma en ligne et renvoie toutes les erreurs d’un coup ; l’app les affiche telles quelles.',
      steps: [
        'Laissez un champ obligatoire vide ou saisissez un e-mail invalide.',
        'Envoyez, et lisez les erreurs.',
      ],
    },
    'form-console': {
      title: 'Retrouvez l’envoi dans la console',
      why: 'Chaque envoi est un enregistrement dans la collection du formulaire, avec un graphique des envois dans le temps.',
      steps: [
        'Ouvrez l’écran Formulaires dans la console et trouvez le formulaire Contact.',
      ],
    },
    'form-workflow': {
      title: 'Reliez un workflow au formulaire',
      why: 'form.submitted est un déclencheur de workflow : envoyer un e-mail de confirmation, publier sur Slack, appeler votre serveur. Créé dans la console, rien à déployer ici.',
      steps: [
        'Dans la console, créez un workflow sur le déclencheur form.submitted.',
        'Renvoyez le formulaire et regardez l’instance s’exécuter.',
      ],
    },
    'collection-read': {
      title: 'Lisez les notes de version',
      why: 'Une collection, ce sont des données sur mesure avec un schéma versionné. L’app lit les enregistrements de la version en ligne : changer le schéma est une publication, pas un déploiement.',
      steps: [
        'Ouvrez Collections.',
        'Les colonnes du tableau sont les champs de la version en ligne.',
      ],
    },
    'collection-delete': {
      title: 'Supprimez un enregistrement',
      why: 'Les écritures passent par l’API de l’organisation avec le jeton de l’app ; la console affiche le changement immédiatement.',
      steps: [
        'Supprimez une note de version du tableau.',
        'Vérifiez l’écran des enregistrements dans la console.',
      ],
    },
    'collection-version': {
      title: 'Publiez une nouvelle version',
      why: 'Les versions en ligne sont immuables. Une nouvelle version copie les champs, vous en ajoutez un, vous la mettez en ligne, et le tableau gagne une colonne.',
      steps: [
        'Dans la console, ajoutez à release-notes une version avec un champ supplémentaire et mettez-la en ligne.',
        'Rechargez Collections.',
      ],
    },
    'upload-asset': {
      title: 'Envoyez un fichier',
      why: 'Les fichiers sont stockés et servis par la plateforme, 5 Mo chacun, publics ou privés. Le navigateur ne voit jamais le jeton de l’organisation : le serveur transmet l’envoi.',
      steps: [
        'Ouvrez Fichiers.',
        'Choisissez une image et attendez qu’elle apparaisse dans la galerie, avec sa largeur et sa hauteur.',
      ],
    },
    'asset-in-console': {
      title: 'Retrouvez-le dans la console',
      why: 'Le même fichier, dans la liste des fichiers de l’organisation, avec tout ce que la plateforme en sait.',
      steps: [
        'Ouvrez l’écran Assets de la console.',
        'Trouvez le fichier que vous venez d’envoyer.',
      ],
    },
    'asset-private': {
      title: 'Rendez-le privé',
      why: 'La visibilité est un interrupteur sur la plateforme ; l’URL publique d’un fichier privé cesse aussitôt de fonctionner.',
      steps: [
        'Sur la carte du fichier, choisissez Rendre privé.',
        'Ouvrez son URL : elle ne sert plus rien.',
        'Rendez-le de nouveau public.',
      ],
    },
    'create-link': {
      title: 'Créez un lien court',
      why: 'La plateforme attribue un identifiant de 12 caractères et gère la redirection ; vous gardez la destination.',
      steps: [
        'Ouvrez Liens courts.',
        'Nommez-le et créez-le pour l’URL de cette app.',
      ],
    },
    'click-link': {
      title: 'Cliquez et voyez le compteur',
      why: 'Chaque clic est enregistré avec son pays, son appareil et son heure ; le compteur affiché ici est relu depuis la plateforme.',
      steps: [
        'Choisissez Suivre : l’URL courte s’ouvre dans un nouvel onglet et mène à la destination.',
        'Revenez et actualisez : le compteur a augmenté.',
      ],
    },
    'change-link-destination': {
      title: 'Changez la destination',
      why: 'L’URL courte reste la même, donc les liens déjà partagés continuent de fonctionner.',
      steps: [
        'Choisissez Changer la destination, saisissez une autre URL, enregistrez.',
        'Suivez de nouveau le lien : il mène au nouvel endroit.',
      ],
    },
    'link-analytics-console': {
      title: 'Consultez l’écran d’analyse',
      why: 'La console trace les clics dans le temps et les liste un par un.',
      steps: [
        'Ouvrez l’écran Links → Analytics de la console.',
        'Trouvez vos clics.',
      ],
    },
    'finish-onboarding': {
      title: 'Terminez la liste d’intégration',
      why: 'Les attributs sur mesure sont des paires clé/valeur sur l’utilisateur, écrites par le SDK depuis le navigateur, en votre nom. Les clés sont définies dans la console pour pouvoir filtrer dessus ensuite.',
      steps: [
        'Ouvrez Audience.',
        'Cochez les trois cases, ajoutez un intitulé de poste et terminez.',
        'La carte des attributs affiche onboarded=true.',
      ],
    },
    'attributes-in-console': {
      title: 'Retrouvez les attributs sur votre fiche',
      why: 'Ce que l’app a écrit figure sur votre utilisateur dans la console, où un administrateur peut filtrer ou segmenter dessus.',
      steps: [
        'Ouvrez l’écran Users de la console et votre propre fiche.',
        'Trouvez onboarded et role-title.',
      ],
    },
    'set-country': {
      title: 'Choisissez un pays, un fuseau horaire et une devise',
      why: 'Le SDK fournit les listes (pays, fuseaux horaires, devises), donc un sélecteur n’a rien à télécharger ; le choix est enregistré comme attributs.',
      steps: [
        'Sur Audience, choisissez un pays, un fuseau horaire et une devise.',
        'Enregistrez les préférences.',
      ],
    },
    'subscribe-newsletter': {
      title: 'Abonnez-vous à la newsletter',
      why: 'Un contact d’audience est une fiche marketing, distincte du compte : il peut exister sans compte, et c’est à lui que les campagnes s’adressent.',
      steps: [
        'Sur Audience, abonnez-vous avec votre e-mail.',
        'Le serveur crée le contact et l’ajoute à la liste newsletter.',
      ],
    },
    'join-waitlist': {
      title: 'Rejoignez la liste d’attente, déconnecté',
      why: 'La liste d’attente bêta de la plateforme : le formulaire et ses textes viennent de la console, les inscriptions y sont approuvées.',
      steps: [
        'Ouvrez /waitlist dans une fenêtre privée.',
        'Laissez un nom et un e-mail.',
        'Dans la console, Users → Beta, approuvez l’inscription.',
      ],
    },
    'tracking-consent': {
      title: 'Donnez votre consentement et regardez les balises se charger',
      why: 'Les balises d’analyse et publicitaires sont configurées dans la console, pas dans ce code. Le SDK ne les charge qu’après consentement, et le bandeau liste ce qui est réellement installé, jamais un fournisseur qui ne s’est pas chargé.',
      steps: [
        'Ouvrez Suivi.',
        'Lisez la liste de consentement : elle est construite à partir des balises rattachées à cette app.',
        'Acceptez tout, ou l’analyse seulement, et voyez quels fournisseurs s’installent.',
      ],
    },
    'tracking-custom-event': {
      title: 'Déclenchez un événement personnalisé',
      why: 'Les inscriptions et les achats se déclenchent tout seuls ; vos propres événements passent par track() vers la couche de données et chaque fournisseur installé.',
      steps: [
        'Sur Suivi, cliquez sur "Track a custom event".',
        'Regardez-le apparaître dans le journal en direct avec ses paramètres.',
      ],
    },
    'tracking-attribution': {
      title: 'Voyez d’où vous venez',
      why: 'Les identifiants de clic et les paramètres de campagne sont captés sur la première page où arrive un visiteur et accompagnent chaque événement suivant, entre sous-domaines.',
      steps: [
        'Rechargez la page Suivi avec ?utm_source=demo&utm_campaign=tour.',
        'Lisez la carte d’attribution.',
      ],
    },
    'tracking-console-tag': {
      title: 'Retrouvez la balise dans la console',
      why: 'GA4, Meta, PostHog, Clarity et onze autres, chacun avec une catégorie de consentement et un texte de confidentialité que la console génère pour votre politique.',
      steps: [
        'Ouvrez Settings → Tracking dans la console.',
        'Ouvrez Auth → Clients et voyez la balise rattachée à cette app.',
      ],
    },
    'workflow-runs': {
      title: 'Consultez vos exécutions de workflow',
      why: 'Les workflows sont créés dans la console : déclencheurs, actions et conditions. L’app n’en appelle jamais un ; elle provoque les événements qu’ils écoutent, et peut lire ce qui s’est exécuté pour chaque personne.',
      steps: [
        'Ouvrez Automatisations.',
        'Lisez les exécutions que la plateforme a lancées pour vous, avec leur statut et leur nombre de nœuds.',
      ],
    },
    'workflow-cause': {
      title: 'Déclenchez l’exécution d’un workflow',
      why: 'Une inscription, un envoi de formulaire, un paiement ou un solde bas lance une exécution. Rien dans l’app ne nomme le workflow.',
      steps: [
        'Envoyez le formulaire de contact sur Formulaires.',
        'Revenez sur Automatisations et actualisez : une exécution de "Provision on form" apparaît.',
      ],
    },
    'workflow-provision-call': {
      title: 'Recevez un appel d’un workflow',
      why: 'Une action HTTP Webhook peut appeler votre propre serveur. L’appel n’est pas signé et l’en-tête authorization est retiré ; il transporte donc un secret partagé dans x-webhook-secret, et la route est idempotente, car la plateforme réessaie.',
      steps: [
        'Déclenchez le workflow "Provision on form".',
        'Sur Automatisations, lisez l’appel de provisionnement que l’app a reçu et enregistré.',
      ],
    },
    'workflow-console-run': {
      title: 'Ouvrez l’exécution dans la console',
      why: 'Résultats par nœud, journaux, nouvelles tentatives et file des messages en échec, sans rien de tout cela dans votre code.',
      steps: [
        'Ouvrez Workflows → Instances dans la console.',
        'Ouvrez votre exécution et lisez la sortie de chaque nœud.',
      ],
    },
    'reports-view': {
      title: 'Consultez un rapport de la plateforme',
      why: 'Chaque module a des points d’accès de graphiques et de comptes, les mêmes que ceux des tableaux de bord de la console. Cette app trace les inscriptions, les envois de formulaire et les clics sur les liens des trente derniers jours.',
      steps: [
        'Ouvrez Rapports.',
        'Lisez les trois graphiques et les chiffres clés.',
      ],
    },
    'reports-console': {
      title: 'Comparez avec le tableau de bord de la console',
      why: 'Les chiffres concordent parce qu’ils viennent des mêmes points d’accès ; certains sont des agrégats actualisés toutes les dix minutes.',
      steps: [
        'Ouvrez le tableau de bord de la console et retrouvez la même courbe d’inscriptions.',
      ],
    },
    'see-badge': {
      title: 'Voyez le badge',
      why: 'Une image et un lien "Built with BuildBase", rendus côté serveur sans script ni appel réseau, avec un code de parrainage facultatif.',
      steps: ['Faites défiler jusqu’au pied de page de la page d’accueil.'],
    },
    'slack-alert': {
      title: 'Recevez une alerte Slack quand quelqu’un s’inscrit',
      why: 'Les alertes d’équipe pour jusqu’à 55 événements système partent vers une seule URL de webhook entrant Slack. Console uniquement : l’app se contente de provoquer les événements.',
      steps: [
        'Dans la console, Settings → Slack : collez une URL de webhook entrant et choisissez "user.registered".',
        'Inscrivez un utilisateur de test et surveillez le canal Slack.',
      ],
    },
    'receive-campaign': {
      title: 'Recevez une campagne e-mail',
      why: 'Les e-mails à l’échelle d’une audience sont rédigés et envoyés depuis la console : modèle, domaine d’envoi vérifié, liste d’audience, brouillons par destinataire, suivi des ouvertures et des clics.',
      steps: [
        'Rejoignez la newsletter sur Audience.',
        'Dans la console, Emails → Campaigns : créez-en une vers cette liste et envoyez-la.',
        'Lisez-la dans votre boîte de réception.',
      ],
    },
    'unsubscribe-campaign': {
      title: 'Désabonnez-vous',
      why: 'La balise de fusion {{unsubscribe}} mène à une page hébergée ; le contact est marqué désabonné et ignoré dès lors.',
      steps: [
        'Cliquez sur se désabonner dans l’e-mail de la campagne.',
        'Dans la console, trouvez le contact sous Audience : désabonné.',
      ],
    },
  },
};
