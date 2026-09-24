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
  },
};
