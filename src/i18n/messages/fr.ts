import type { Messages } from '../types';

const messages: Messages = {
  common: {
    nav: {
      home: 'Accueil',
      dashboard: 'Tableau de bord',
      documents: 'Documents',
      analytics: 'Analytiques',
      team: 'Équipe',
      notifications: 'Notifications',
      settings: 'Paramètres',
      menu: 'Menu',
      selectWorkspace: "Sélectionner l'espace",
      profile: 'Profil',
      manageWorkspace: "Gérer l'espace",
      generalSettings: 'Paramètres généraux',
      userManagement: 'Gestion des utilisateurs',
      billingPayments: 'Facturation et paiements',
      credits: 'Crédits',
      creditUsage: 'Utilisation des crédits',
      creditsAvailable: 'Disponibles',
      usage: 'Utilisation',
      permissions: 'Permissions',
      events: 'Événements',
      invoices: 'Factures',
      workspace: 'Espace de travail',
    },
    buttons: {
      signIn: 'Se connecter',
      signOut: 'Se déconnecter',
      submit: 'Soumettre',
      cancel: 'Annuler',
      save: 'Enregistrer',
      delete: 'Supprimer',
      edit: 'Modifier',
      create: 'Créer',
      loading: 'Chargement...',
    },
    auth: {
      signInPrompt: 'Veuillez vous connecter pour continuer',
      signOutConfirm: 'Êtes-vous sûr de vouloir vous déconnecter ?',
    },
    footer: {
      rights: 'Tous droits réservés',
      tagline:
        'A live demo app showing the BuildBase SDK in action. Sign in to explore auth, workspaces, credits, push notifications, and i18n.',
      sections: {
        product: 'Produit',
        resources: 'Ressources',
        legal: 'Légal',
      },
      links: {
        features: 'Fonctionnalités',
        pricing: 'Tarifs',
        dashboard: 'Tableau de bord',
        credits: 'Crédits',
        blog: 'Blog',
        changelog: 'Journal des modifications',
        about: 'À propos',
        privacy: 'Politique de confidentialité',
        terms: "Conditions d'utilisation",
      },
    },
    language: {
      select: 'Choisir la langue',
      current: 'Langue actuelle',
    },
    accessibility: {
      skipToContent: 'Aller au contenu',
    },
    theme: {
      toggle: 'Changer le thème',
      light: 'Clair',
      dark: 'Sombre',
      system: 'Système',
    },
    redirecting: 'Redirection...',
  },
  home: {
    title: 'Mon Application',
    hero: {
      heading: 'Bienvenue sur Mon Application',
      description:
        'Construit avec Next.js, TypeScript, Tailwind CSS, shadcn/ui, next-themes et BuildBase SDK.',
    },
    meta: {
      title: 'Mon Application',
      description:
        'Mon application Next.js avec shadcn/ui et support des thèmes',
      tagline: 'Construisez quelque chose de remarquable',
    },
  },
  dashboard: {
    title: 'Tableau de bord',
    welcome: 'Bon retour, {name} !',
    trial: {
      endingSoon: 'Essai bientôt terminé',
      endingSoonMsg:
        "Votre essai se termine dans {days} jour{s}. Passez à la version supérieure maintenant pour conserver l'accès.",
      upgrade: 'Mettre à niveau',
      freeTrial: "Vous êtes en période d'essai",
      daysRemaining: '{days} jours restants',
      endsOn: "L'essai se termine le {date}",
      active: 'Essai actif',
      viewPlans: 'Voir les plans',
      trialBadge: 'Essai',
    },
    noSubscription: {
      title: 'Aucun abonnement actif',
      hint: 'Abonnez-vous pour débloquer les fonctionnalités payantes',
      choosePlan: 'Choisir un plan',
    },
    subscription: {
      title: 'Abonnement',
      description: 'Votre plan actuel',
      loading: 'Chargement...',
      status: 'Statut : {status}',
      activeSubscription: 'Abonnement actif',
      changePlan: 'Changer de plan',
      noPlan: 'Aucun plan actif',
      choosePlan: 'Choisir un plan',
    },
    subscriptionGates: {
      whenSubscription: {
        title: "Portail d'abonnement",
        description: 'Visible uniquement avec un abonnement actif',
        fallback:
          'Aucun abonnement actif — passez à la version supérieure pour voir ce contenu.',
        content: 'Vous avez un abonnement actif — cette carte est visible.',
      },
      whenSubscriptionToPlans: {
        title: 'Portail de plan',
        description: 'Visible uniquement avec un plan spécifique',
        fallback: "Vous n'êtes pas sur le plan Pro / Entreprise / Croissance.",
        content:
          'Vous êtes sur Pro, Entreprise ou Croissance — contenu premium débloqué.',
      },
    },
    seatStatus: {
      title: 'État des sièges',
      description: 'Membres vs limites du plan',
      members: 'Membres',
      includedSeats: 'Sièges inclus',
      maxUsers: 'Utilisateurs max.',
      canInvite: 'Peut inviter',
      yes: 'Oui',
      no: 'Non',
      limitReached:
        'Limite de sièges atteinte — mettez à niveau votre plan pour inviter plus de membres.',
    },
    quickActionButtons: {
      inviteTeam: "Inviter l'équipe",
      manageSubscription: "Gérer l'abonnement",
      workspaceSettings: "Paramètres de l'espace",
    },
    cards: {
      workspace: {
        title: 'Espace de travail actuel',
        empty: 'Aucun espace sélectionné',
      },
      role: {
        title: 'Votre rôle',
        empty: 'N/A',
      },
      email: {
        title: 'Adresse e-mail',
      },
      status: {
        title: 'Statut',
        active: 'Actif',
        inactive: 'Inactif',
      },
    },
    quickActions: {
      title: 'Actions rapides',
      createProject: 'Créer un projet',
      viewReports: 'Voir les rapports',
      inviteTeam: 'Inviter un membre',
    },
    pages: {
      documents: {
        title: 'Documents',
        description: 'Gérez vos documents',
        placeholder: 'Le contenu des documents va ici.',
      },
      analytics: {
        title: 'Analytiques',
        description: 'Voir vos analytiques',
        placeholder: 'Le contenu des analytiques va ici.',
      },
      team: {
        title: 'Équipe',
        description: 'Gérez votre équipe',
        placeholder: "Le contenu de gestion d'équipe va ici.",
      },
      settings: {
        title: 'Paramètres',
        description: 'Gérez vos paramètres',
        placeholder: 'Le contenu des paramètres va ici.',
      },
    },
  },
  analytics: {
    title: 'Analytiques',
    description: "Métriques de l'espace de travail en temps réel",
    cards: {
      plan: 'Plan',
      teamMembers: "Membres de l'équipe",
      quotasTracked: 'Quotas suivis',
      creditDebits: 'Débits de crédits',
      noSubscription: 'sans abonnement',
      unlimitedSeats: 'sièges illimités',
      maxSeats: '{n} sièges max.',
      totalConsumed: '{n} unités consommées au total',
      consumptionEvents: 'événements de consommation enregistrés',
    },
    quotaConsumption: {
      title: 'Consommation des quotas',
      empty: 'Aucun quota configuré pour cet espace de travail.',
    },
    featureFlags: {
      title: 'Indicateurs de fonctionnalités',
      empty: 'Aucun indicateur configuré.',
    },
    planLimits: {
      title: 'Limites du plan',
      empty: 'Aucune limite de plan configurée.',
      unlimited: 'illimité',
    },
    loading: 'Chargement…',
  },
  team: {
    title: 'Équipe',
    description: "Membres de l'espace de travail",
    inviteMember: 'Inviter un membre',
    seatLimitReached:
      'Limite de sièges atteinte — mettez à niveau votre plan pour inviter plus de membres.',
    cards: {
      members: 'Membres',
      includedSeats: 'Sièges inclus',
      maxUsers: 'Utilisateurs max.',
      availableSeats: 'Sièges disponibles',
    },
    memberList: {
      title: 'Membres',
      count: '{count} membre(s) dans cet espace',
      empty: "Aucun membre chargé. Assurez-vous d'être authentifié.",
      roleFallback: 'membre',
    },
    manage: {
      title: 'Gérer les membres',
      description:
        'Ouvrez le panneau de paramètres pour gérer les rôles et les invitations',
      openSettings: 'Ouvrir les paramètres des membres',
      permissions: 'Permissions',
    },
  },
  settings: {
    title: 'Paramètres',
    description: "Configuration de l'espace de travail",
    card: {
      title: "Paramètres de l'espace de travail",
      description:
        'Cliquez sur une section pour ouvrir le panneau de paramètres',
    },
    danger: {
      openButton: 'Ouvrir la zone de danger',
    },
    sections: {
      profile: {
        label: 'Profil',
        description: 'Votre nom, avatar et données personnelles',
      },
      general: {
        label: 'Général',
        description: "Nom de l'espace, identifiant et configuration de base",
      },
      users: {
        label: 'Membres et invitations',
        description: 'Gérer les membres, rôles et invitations en attente',
      },
      subscription: {
        label: 'Abonnement',
        description: 'Voir et changer votre plan actuel',
      },
      usage: {
        label: 'Utilisation',
        description: "Consommation des quotas et historique d'utilisation",
      },
      credits: {
        label: 'Crédits',
        description: 'Solde de crédits et options de recharge',
      },
      features: {
        label: 'Indicateurs de fonctionnalités',
        description: "Activer/désactiver les fonctionnalités de l'espace",
      },
      notifications: {
        label: 'Notifications',
        description: 'Préférences de notifications par e-mail et push',
      },
      permissions: {
        label: 'Permissions',
        description: "Configuration du contrôle d'accès basé sur les rôles",
      },
      danger: {
        label: 'Zone de danger',
        description: "Supprimer l'espace ou transférer la propriété",
      },
    },
  },
  documents: {
    title: 'Documents',
    description: 'Sections de documents avec contrôle des fonctionnalités',
    stats: {
      featureSections: 'Sections de fonctionnalités',
      featureSectionsSubtitle: 'fonctionnalités de documents',
      enabled: "Activées pour l'espace",
      enabledSubtitle: 'fonctionnalités actives',
      locked: 'Verrouillées',
      lockedSubtitle: 'fonctionnalités inactives',
    },
    features: {
      enabled: 'Activé',
      disabled: 'Désactivé',
    },
    allFeatures: {
      title: "Toutes les fonctionnalités de l'espace",
      description: 'État de tous les indicateurs',
      empty: 'Aucun indicateur de fonctionnalité configuré pour cet espace.',
    },
    featureSections: {
      advancedExports: {
        label: 'Exportations avancées',
        description: 'Exporter des documents en PDF, DOCX ou CSV',
        content: 'Export PDF, Word et CSV disponible dans votre plan.',
        lockedMessage:
          "Activez la fonctionnalité d'exportations avancées pour débloquer les exportations.",
      },
      documentSharing: {
        label: 'Partage de documents',
        description: 'Partagez des documents avec des collaborateurs externes',
        content:
          "Les liens de partage et l'accès externe aux collaborateurs sont activés.",
        lockedMessage:
          "Activez le partage de documents pour permettre l'accès externe.",
      },
      eSignatures: {
        label: 'Signatures électroniques',
        description: 'Collecter des signatures légalement contraignantes',
        content: 'La collecte de signatures électroniques est active.',
        lockedMessage:
          'Activez les signatures électroniques pour collecter des signatures sur les documents.',
      },
    },
  },
  events: {
    title: "Journal d'événements SDK",
    description: 'Événements SDK en temps réel',
    clearButton: 'Effacer',
    listenCard: {
      title: 'Écoute des événements',
      description:
        "Ces événements se déclenchent automatiquement lors de l'utilisation du SDK — changez d'espace, connectez-vous ou invitez un membre pour les voir.",
    },
    liveCard: {
      title: 'Flux en direct',
      captured: '{count} événements capturés',
      empty:
        "Aucun événement pour l'instant. Essayez de changer d'espace de travail ou de recharger la page.",
    },
    eventLabels: {
      userCreated: 'Utilisateur créé',
      userUpdated: 'Utilisateur mis à jour',
      workspaceChanged: 'Espace changé',
      workspaceUpdated: 'Espace mis à jour',
      memberAdded: 'Membre ajouté',
      memberRemoved: 'Membre supprimé',
      roleChanged: 'Rôle modifié',
      workspaceCreated: 'Espace créé',
      workspaceDeleted: 'Espace supprimé',
    },
  },
  invoices: {
    title: 'Factures',
    description: 'Historique de facturation',
    refresh: 'Actualiser',
    billingPortal: 'Portail de facturation',
    billingPortalOpening: 'Ouverture…',
    error: 'Erreur lors du chargement des factures.',
    card: {
      title: 'Historique des factures',
      found: '{count} facture(s) trouvée(s)',
      empty:
        "Aucune facture pour l'instant. Les factures apparaissent ici après votre abonnement à un plan payant.",
    },
    table: {
      date: 'Date',
      amount: 'Montant',
      status: 'Statut',
      description: 'Description',
      links: 'Liens',
      view: 'Voir',
      pdf: 'PDF',
      loadMore: 'Charger plus',
    },
  },
  notifications: {
    title: 'Test de notifications',
    description: 'Envoyer des notifications de test via BuildBase SDK',
    pushCard: {
      title: 'Notifications push du navigateur',
      description:
        'Activer les notifications push du navigateur pour cet appareil',
      subscribed: 'Abonné',
      notSubscribed: 'Non abonné',
      subscribe: "S'abonner",
      unsubscribe: 'Se désabonner',
    },
    sendCard: {
      title: 'Envoyer une notification de test',
      description:
        'Remplissez les champs et envoyez une notification. Les étiquettes {{name}}, {{workspaceName}}, {{url}} sont résolues automatiquement.',
    },
    fields: {
      eventSlug: "Identifiant de l'événement",
      eventSlugHint:
        'Push uniquement : tout identifiant fonctionne. Pour e-mail : doit correspondre à un événement enregistré.',
      title: 'Titre',
      message: 'Message',
      url: 'URL',
      target: 'Destinataire',
      channel: 'Canal',
    },
    placeholders: {
      eventSlug: 'ex. comment_added, deployment_success',
      title: 'Titre de la notification',
      message: 'Corps push + message e-mail',
      url: 'Ouvre au clic sur push',
    },
    buttons: {
      meOnly: 'Moi seulement',
      allMembers: 'Tous les membres',
      both: 'Les deux',
      emailOnly: 'E-mail uniquement',
      pushOnly: 'Push uniquement',
      showAdvanced: 'Afficher les options avancées de push',
      hideAdvanced: 'Masquer les options avancées de push',
      send: 'Envoyer la notification',
      sending: 'Envoi...',
      silent: 'Silencieux',
      requireInteraction: 'Requiert une interaction',
      renotify: 'Renotifier',
      default: 'Par défaut',
    },
    advanced: {
      media: 'Médias',
      behavior: 'Comportement push',
      delivery: 'Livraison',
      actions: "Boutons d'action (max. 2)",
      iconUrl: "URL de l'icône",
      imageUrl: "URL de l'image",
      badgeUrl: 'URL du badge',
      tag: 'Étiquette',
      tagHint: "Remplace la notification avec le même tag plutôt que d'empiler",
      behaviorHint:
        "Silencieux = sans son. Requiert interaction = reste jusqu'à action utilisateur. Renotifier = son lors du remplacement.",
      urgency: 'Urgence',
      ttl: 'TTL (secondes)',
      schedule: 'Planifier (ISO 8601)',
      action1: 'Action 1',
      action2: 'Action 2',
      actionTitlePlaceholder: 'Étiquette du bouton (ex. Répondre)',
      actionKeyPlaceholder: "Clé d'action (ex. reply)",
      iconUrlPlaceholder: 'Push icon (falls back to org icon)',
      imageUrlPlaceholder: 'Large image in push body',
      badgeUrlPlaceholder: 'Status bar icon (Android)',
      ttlPlaceholder: '86400 (24h default)',
    },
    context: {
      workspace: 'Espace de travail :',
      user: 'Utilisateur :',
      none: 'Aucun sélectionné',
    },
    resultCard: {
      title: 'Réponse',
    },
    toast: {
      workspaceRequired: "Veuillez d'abord sélectionner un espace de travail",
      sent: 'Notification envoyée à {count} utilisateur(s)',
      notSent: 'Notification non envoyée : {reason}',
      pushEnabled: 'Notifications push activées',
      pushDisabled: 'Notifications push désactivées',
      pushFailed: 'Erreur lors du changement des notifications push',
      networkError: 'Erreur réseau — impossible de se connecter au serveur',
    },
  },
  permissions: {
    title: 'Permissions',
    description: 'Résolution des permissions en temps réel',
    cards: {
      role: 'Votre rôle',
      owner: 'Propriétaire',
      ownerYes: 'Oui',
      ownerNo: 'Non',
      granted: 'Permissions accordées',
    },
    ownerAdmin: {
      title: 'Propriétaire / Administrateur uniquement',
      notVisible: 'Non visible pour votre rôle ({role}).',
      visible:
        'Vous pouvez voir cela car vous êtes propriétaire ou administrateur.',
    },
    allMembers: {
      title: 'Tous les membres',
      notMember: "Vous n'êtes pas membre de cet espace de travail.",
      visible: "Vous pouvez voir cela car vous êtes membre de l'espace.",
    },
    matrix: {
      title: 'Matrice des permissions',
      description:
        'Toutes les permissions vérifiées par rapport à votre rôle actuel',
      denied: 'Refusé',
      grantedStatus: 'Accordé',
    },
  },
  profile: {
    title: 'Profil utilisateur',
    description: 'Attributs utilisateur et indicateurs de fonctionnalités',
    identity: {
      title: 'Identité',
      subtitle: 'Depuis useSaaSAuth()',
      name: 'Nom',
      email: 'Adresse e-mail',
      role: 'Rôle',
      id: 'ID',
    },
    workspaceFeatures: {
      title: "Indicateurs de fonctionnalités de l'espace",
      enabled: 'Activé',
      disabled: 'Désactivé',
    },
    attributes: {
      title: 'Attributs utilisateur',
      description: 'Paires clé-valeur personnalisées par utilisateur',
      empty: "Aucun attribut configuré pour l'instant.",
      setTitle: 'Définir un attribut (démo)',
      keyPlaceholder: 'clé (ex. theme)',
      valuePlaceholder: 'valeur',
      saving: 'Enregistrement…',
      save: 'Enregistrer',
      saved: 'Enregistré !',
      failed: "Échec de l'enregistrement.",
    },
    userFeatures: {
      title: 'Indicateurs de fonctionnalités utilisateur',
      description: 'Indicateurs de fonctionnalités au niveau utilisateur',
      empty: 'Aucun indicateur configuré pour cet utilisateur.',
      loading: 'Chargement...',
      enabled: 'Activé',
      disabled: 'Désactivé',
    },
  },
  usage: {
    title: 'Utilisation des quotas',
    description: 'Consommation des quotas en temps réel',
    loading: 'Chargement des quotas...',
    error: 'Erreur lors du chargement des données de quota.',
    empty: 'Aucun quota configuré pour cet espace de travail.',
    quotaCard: {
      remaining: '{count} restants',
      unlimited: 'Illimité',
      exhausted: 'Épuisé',
      overage: 'Dépassement',
      threshold: 'Plus de 80% utilisé ({pct}%) — proche de la limite',
      overageMsg: 'Dépassement de {count} unités',
      exhaustedMsg:
        'Quota épuisé — les actions utilisant ce quota sont bloquées',
      used: 'utilisé',
      overageAllowed: '(autorisé)',
    },
    record: {
      title: "Enregistrer l'utilisation",
      description: "Enregistrer manuellement l'utilisation du quota",
      slugPlaceholder: 'identifiant du quota (ex. api_calls)',
      qtyPlaceholder: 'quantité',
      recording: 'Enregistrement…',
      record: 'Enregistrer',
      success: '{qty} unité(s) enregistrée(s) pour « {slug} ».',
      failed: "Échec de l'enregistrement de l'utilisation.",
    },
    logs: {
      title: "Journal d'utilisation",
      description: "Entrées d'utilisation récentes",
      loading: 'Chargement des journaux…',
      empty:
        "Aucune entrée d'utilisation. Enregistrez une utilisation ci-dessous pour voir les entrées.",
      table: {
        quota: 'Quota',
        quantity: 'Quantité',
        source: 'Source',
        date: 'Date',
      },
    },
  },
  creditStore: {
    title: 'Packs de crédits',
    subtitle:
      'Achetez des crédits pour débloquer des fonctionnalités premium comme la génération IA, les exportations et plus encore.',
    buy: 'Acheter des crédits',
    validFor: 'Valable {days} jours',
    noExpiry: 'Sans expiration',
    noPackages: 'Aucun pack de crédits disponible pour le moment.',
    error: 'Erreur lors du chargement des packs de crédits',
  },
  pricing: {
    title: 'Tarifs',
    subtitle: 'Choisissez le plan adapté à vos besoins',
    billing: 'Facturation',
    monthly: 'Mensuel',
    quarterly: 'Trimestriel',
    yearly: 'Annuel',
    perMonth: '/mois',
    perQuarter: '/trim.',
    perYear: '/an',
    currency: 'Devise',
    quotas: 'Quotas',
    limits: 'Limites',
    credits: 'Crédits IA',
    creditsPerPeriod: 'crédits / période',
    features: 'Fonctionnalités',
    included: 'Inclus',
    perUnit: 'ensuite',
    loading: 'Chargement des plans...',
    noPlans: 'Aucun plan disponible',
    error: 'Erreur lors du chargement des tarifs',
    meta: {
      title: 'Tarifs',
      description: 'Voir nos plans et tarifs',
    },
  },
  credits: {
    title: 'Crédits',
    description:
      "Utilisez des crédits pour des actions premium. Gérez les packs dans les paramètres de l'espace.",
    balance: 'Solde de crédits',
    creditsAvailable: 'crédits disponibles',
    manageCredits: 'Gérer les crédits',
    buyCredits: 'Acheter des crédits',
    choosePlan: 'Choisir un plan',
    noCredits:
      "Vous n'avez plus de crédits. Achetez-en davantage pour continuer à utiliser les fonctionnalités premium.",
    buyMore: 'Acheter des crédits',
    packages: {
      title: 'Packs de crédits',
      loading: 'Chargement des packs…',
      error: 'Erreur lors du chargement des packs.',
      empty: "Aucun pack de crédits configuré pour l'instant.",
      credits: 'crédits',
      validFor: 'Valable {days} jours',
      buyNow: 'Acheter maintenant',
    },
    testConsume: {
      title: 'Tester la consommation de crédits',
      description:
        'Utilisez ces boutons pour tester la consommation de crédits depuis votre solde.',
      use: 'Utiliser {amount}',
      apiDescription: 'Test : consommer {amount} crédits',
      success: '{amount} crédits consommés. Solde : {balance}',
      insufficient:
        'Crédits insuffisants. Disponibles : {available}, Demandés : {requested}',
    },
    lowCredits: {
      title: 'Peu de crédits',
      description:
        'Votre solde de crédits est faible. Rechargez maintenant pour éviter les interruptions.',
    },
    expiring: {
      title: 'Crédits expirant bientôt',
      description: 'Crédits expirant dans les 30 prochains jours',
      expiresIn: 'Expire le {date}',
      noExpiring: "Aucun crédit n'expire bientôt",
      days: '{count} crédits',
      loading: 'Loading...',
    },
    transactions: {
      title: 'Historique des transactions',
      description: 'Ajouts et déductions de crédits récents',
      empty: 'Aucune transaction pour le moment',
      loading: 'Loading...',
      columns: {
        type: 'Type',
        amount: 'Montant',
        balance: 'Solde après',
        description: 'Description',
      },
      types: {
        credit: 'Crédit',
        debit: 'Débit',
      },
    },
  },
  errors: {
    generic: {
      title: "Une erreur s'est produite",
      description:
        "Une erreur inattendue s'est produite. Veuillez réessayer ou contacter le support si le problème persiste.",
      tryAgain: 'Réessayer',
      goHome: "Aller à l'accueil",
    },
    notFound: {
      title: 'Page introuvable',
      description:
        "Désolé, nous n'avons pas pu trouver la page que vous recherchez. Elle a peut-être été déplacée ou supprimée.",
      goBack: 'Retour',
    },
  },
  blog: {
    label: 'Blog',
    heading: 'Derniers articles',
    description: 'Mises à jour, tutoriels et perspectives de notre équipe.',
    noPosts: 'Aucun article pour le moment. Revenez bientôt !',
    noPostsTag: 'Aucun article avec ce tag pour le moment.',
    noPostsCategory: 'Aucun article dans cette catégorie pour le moment.',
    noPostsAuthor: 'Aucun article de cet auteur pour le moment.',
    postsByAuthor: 'Articles de {name}',
    postsTaggedCount:
      '{count, plural, one {# article tagué "{tag}"} other {# articles tagués "{tag}"}}',
    postsInCategoryCount:
      '{count, plural, one {# article dans cette catégorie} other {# articles dans cette catégorie}}',
    readMore: 'Lire plus',
    read: 'Lire',
    allPosts: '← Tous les articles',
    previous: 'Précédent',
    next: 'Suivant',
    pageOf: 'Page {page} sur {total}',
    relatedPosts: 'Articles connexes',
    share: 'Partager',
    rssLabel: 'Flux RSS',
    search: {
      trigger: 'Rechercher des articles...',
      placeholder: 'Rechercher dans le blog...',
      searching: 'Recherche en cours...',
      noResults: 'Aucun résultat pour « {query} »',
      startTyping: 'Commencez à taper pour rechercher...',
    },
    meta: {
      title: 'Blog',
      titlePage: 'Blog — Page {page}',
      description:
        'Derniers articles, tutoriels et mises à jour de notre équipe.',
      tagTitle: 'Articles tagués « {tag} »',
      tagDescription: 'Tous les articles du blog tagués avec « {tag} ».',
      categoryTitle: '{category} — Blog',
      categoryDescription: 'Articles du blog dans la catégorie « {category} ».',
    },
  },
  changelog: {
    label: 'Journal des modifications',
    heading: 'Quoi de neuf',
    description:
      'Toutes les dernières mises à jour, améliorations et corrections.',
    rssLabel: 'Flux RSS',
    permalink: 'Lien permanent',
    meta: {
      title: 'Journal des modifications',
      description:
        'Toutes les dernières mises à jour, améliorations et corrections.',
    },
  },
  cookieConsent: {
    title: 'Nous utilisons des cookies',
    descriptionBefore:
      'Nous utilisons des cookies pour améliorer votre expérience, analyser le trafic et personnaliser le contenu. Vous pouvez choisir quels cookies autoriser. Lisez notre',
    policyLinkPrivacy: 'politique de confidentialité',
    policyLinkCookie: 'politique en matière de cookies',
    dismissAriaLabel: 'Ignorer pour le moment',
    necessary: {
      title: 'Nécessaires',
      description:
        'Requis pour le fonctionnement du site. Ne peut pas être désactivé.',
    },
    analytics: {
      title: 'Analytiques',
      description:
        'Nous aident à comprendre comment les visiteurs utilisent notre site.',
    },
    marketing: {
      title: 'Marketing',
      description:
        'Utilisés pour diffuser des publicités pertinentes et suivre les campagnes.',
    },
    acceptAll: 'Tout accepter',
    rejectAll: 'Tout refuser',
    savePreferences: 'Enregistrer les préférences',
    customize: 'Personnaliser',
  },
};

export default messages;
