import type { Messages } from '../types';

const messages: Messages = {
  common: {
    nav: {
      home: 'Accueil',
      dashboard: 'Tableau de bord',
      documents: 'Documents',
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
      tour: 'Visite',
      inbox: 'Boîte de réception',
      modules: 'Modules',
      forms: 'Formulaires',
      collections: 'Collections',
      assets: 'Fichiers',
      links: 'Liens courts',
      audience: 'Audience',
      tracking: 'Suivi',
      automations: 'Automatisations',
      reports: 'Rapports',
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
        "Une application de démonstration en direct montrant le BuildBase SDK en action. Connectez-vous pour explorer l'authentification, les espaces de travail, les crédits, les notifications push et i18n.",
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
        tour: 'Visite',
        github: 'Code sur GitHub',
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
    pages: {
      lastUpdated: 'Dernière mise à jour :',
    },
    redirecting: 'Redirection...',
  },
  home: {
    title: 'BuildBase Demo',
    hero: {
      badge: 'Démo en direct · 67 tâches',
      heading:
        'Chaque capacité de BuildBase, <highlight>une tâche à la fois</highlight>',
      description:
        "Connectez-vous pour voir l'authentification, les espaces de travail multi-tenant, la facturation de crédits, les notifications push et l'i18n en 8 langues — propulsé par le BuildBase SDK.",
      signInToExplore: 'Se connecter pour explorer',
      openDashboard: 'Ouvrir le tableau de bord',
      viewSource: 'Voir le code source',
      builtWith: 'Construit avec',
    },
    stats: {
      languages: {
        label: 'Langues dans cette démo',
        sublabel: "changez avec le sélecteur dans l'en-tête",
      },
      tasks: {
        label: 'Tâches de la visite',
        sublabel: 'chacune une capacité à essayer',
      },
      groups: {
        label: 'Groupes',
        sublabel: 'de la connexion aux webhooks',
      },
      authCode: {
        label: "Lignes de code d'auth",
        sublabel: 'le SDK gère tout',
      },
    },
    cta: {
      heading: 'Prêt à voir tout fonctionner ?',
      description:
        "Connectez-vous pour ouvrir le tableau de bord complet — essayez de changer d'espace de travail, de consommer des crédits, d'envoyer une notification push et de basculer entre les 8 langues.",
      signIn: 'Se connecter et explorer',
      openDashboard: 'Ouvrir le tableau de bord',
      howBuilt: "Comment c'est construit",
    },
    meta: {
      title: 'Mon Application',
      description:
        'Une vraie app sur le SDK BuildBase, avec une visite guidée : connectez-vous et parcourez inscription, espaces de travail, facturation, usage, crédits, notifications, agents et webhooks, chacun montrant d’où il vient.',
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
      changeRole: 'Changer le rôle',
    },
    invite: {
      title: 'Inviter par e-mail',
      description:
        'L’adresse n’a pas besoin de compte. La personne reçoit un e-mail, suit le lien, s’inscrit ou se connecte, puis accepte.',
      noPermission: 'Votre rôle ne peut pas inviter de membres.',
      emailPlaceholder: 'nom@entreprise.com',
      role: 'Rôle',
      send: 'Envoyer l’invitation',
      sent: 'Invitation envoyée à {email}',
      failed: 'Une erreur est survenue',
      resent: 'Invitation renvoyée',
      revoked: 'Invitation révoquée',
      seatNote:
        '{count} invitation(s) en attente occupe(nt) un siège jusqu’à réponse.',
      pendingTitle: 'En attente',
      loading: 'Chargement…',
      none: 'Rien en attente.',
      invitedBy: 'Invité par {name}',
      pendingLabel: 'En attente',
      expires: 'expire le {date}',
      cooldown: 'Renvoi possible dans {seconds}s',
      resend: 'Renvoyer',
      revoke: 'Révoquer',
    },
    roleChanged: 'Rôle changé en {role}',
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
    featureGates: {
      title: 'Portes de fonctionnalités',
      description:
        'Les parties de ce produit qu’un flag d’espace ou d’utilisateur active.',
    },
    workbench: {
      title: 'Vos documents',
      description:
        'Les documents vivent dans la base de cette app ; la plateforme les mesure.',
      search: 'Rechercher des documents',
      allStatuses: 'Tous les statuts',
      allTags: 'Toutes les étiquettes',
      newDocument: 'Nouveau document',
      newDocumentHint:
        'En créer un enregistre un usage sur le quota documents et dépense un crédit.',
      titleLabel: 'Titre',
      contentLabel: 'Contenu (Markdown)',
      statusLabel: 'Statut',
      tagsLabel: 'Étiquettes, séparées par des virgules',
      create: 'Créer',
      creating: 'Création…',
      created: 'Document créé',
      deleted: 'Document supprimé',
      delete: 'Supprimer',
      loadSamples: 'Charger des documents d’exemple',
      clearSamples: 'Retirer les exemples',
      samplesLoaded: '{count} documents d’exemple chargés',
      samplesAlready: 'Exemples déjà chargés',
      samplesCleared: '{count} documents d’exemple retirés',
      sample: 'Exemple',
      empty: 'Aucun document pour l’instant.',
      total: '{count} au total',
      words: '{count} mots',
      loadFailed: 'Impossible de charger les documents',
      viewerNotice:
        'Votre rôle ici est {role} : lecture seule. Les boutons sont désactivés et le serveur refuse de toute façon.',
      quotaExhausted:
        'Le quota documents de ce plan est épuisé et sans dépassement. Passez au plan supérieur pour en créer plus.',
      quotaExhaustedShort: 'Quota épuisé',
      quotaWarning:
        'Vous avez utilisé plus de 80 % du quota documents de ce plan.',
      creditsLow: 'Les crédits s’épuisent. Chaque document en dépense un.',
      creditsExhausted:
        'Plus de crédits. Les documents sont quand même créés ; la ligne de mesure montre que la dépense a été ignorée.',
      refusedQuota:
        'Refusé : {consumed} documents sur {included} utilisés et le plan est plafonné.',
      refusedRole: 'Refusé : le rôle {role} ne peut pas écrire.',
      meteringTitle: 'Ce que la plateforme a enregistré',
      meteringUsage: 'Usage : {used} documents sur {included}',
      meteringUsageSkipped:
        'Usage : non enregistré (ce plan n’a pas de quota documents)',
      meteringCredits: 'Crédits : {amount} dépensés, {balance} restants',
      meteringCreditsSkipped: 'Crédits : non dépensés (pas de solde)',
      statuses: {
        draft: 'Brouillon',
        in_review: 'En relecture',
        published: 'Publié',
        archived: 'Archivé',
      },
    },
    title: 'Documents',
    description:
      'Les documents de votre espace : créés ici ou par un agent, mesurés par la plateforme.',
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
    webhooks: {
      title: 'Webhooks reçus',
      description:
        'Livraisons signées de serveur à serveur depuis la plateforme, enregistrées par /api/webhooks/buildbase pour cet espace de travail.',
      empty:
        'Aucun webhook pour l’instant. Abonnez-vous, invitez quelqu’un ou achetez des crédits et la plateforme appellera cette app.',
      refresh: 'Actualiser',
      event: 'Événement',
      received: 'Reçu',
      signature: 'Signature',
      verified: 'Vérifiée',
      payload: 'Contenu',
      when: 'Heure plateforme',
    },
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
    title: 'Notifications',
    description:
      'Envoyez une notification depuis cette app et regardez où elle arrive',
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
        'L’événement de démo est « {slug} », enregistré dans la console avec e-mail et push. N’importe quel slug marche pour le push seul ; l’e-mail exige un événement enregistré.',
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
      description: 'Ce que la plateforme a fait de l’envoi.',
      openInbox: 'Ouvrir la boîte',
    },
    toast: {
      workspaceRequired: "Veuillez d'abord sélectionner un espace de travail",
      sent: 'Notification envoyée à {count} utilisateur(s)',
      notSent: 'Notification non envoyée : {reason}',
      inboxHint: 'Regardez la cloche et votre boîte de réception.',
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
    agents: {
      title: 'Agents connectés',
      description:
        'Clients IA que vous avez autorisés à agir en votre nom via MCP. Déconnecter révoque leur accès.',
      guideTitle: 'Connecter un agent',
      guideDescription:
        'Cette app est un serveur MCP. Ajoutez-la à Claude, Cursor ou ChatGPT et connectez-vous avec votre compte BuildBase ; l’agent lit alors vos espaces de travail et les documents de cette app avec vos permissions.',
    },
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
      loading: 'Chargement...',
    },
    transactions: {
      title: 'Historique des transactions',
      description: 'Ajouts et déductions de crédits récents',
      empty: 'Aucune transaction pour le moment',
      loading: 'Chargement...',
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
    blogNotFound: {
      title: 'Article introuvable',
      description:
        "L'article de blog que vous recherchez n'existe pas, a peut-être été supprimé ou n'est pas disponible dans votre langue.",
      browseAll: 'Parcourir tous les articles',
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
    shareAriaX: 'Partager sur X / Twitter',
    shareAriaLinkedin: 'Partager sur LinkedIn',
    shareAriaFacebook: 'Partager sur Facebook',
    shareAriaCopy: 'Copier le lien',
    shareAriaCopied: 'Lien copié !',
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
  inbox: {
    title: 'Boîte de réception',
    description:
      'Tout ce que cette app vous a envoyé, un élément par notification, quel que soit le canal.',
    rules: {
      live: 'Les nouveaux éléments arrivent en direct par socket, sans recharger.',
      read: 'Un élément est lu quand vous l’ouvrez ici ou cliquez son lien. Ouvrir l’e-mail seul ne le lit pas.',
      email:
        'Chaque élément montre ce qu’ont fait l’e-mail et le push, pour voir pourquoi un canal est resté muet.',
    },
  },
  tour: {
    title: 'La visite',
    subtitle:
      '{total} choses à essayer, chacune une capacité de BuildBase et d’où elle vient.',
    progress: '{done} sur {total} faites',
    markDone: 'Marquer comme faite',
    undo: 'Annuler',
    open: 'Ouvrir',
    detected: 'Détecté automatiquement',
    manual: 'À confirmer vous-même',
    why: 'Pourquoi c’est important',
    steps: 'Que faire',
    fromSdk: 'Depuis le SDK',
    fromConsole: 'Configuré dans la console',
    fromApp: 'Dans cette app',
    requires: 'À faire d’abord',
    allDone: 'Vous avez tout fait. Emportez-le chez vous.',
    homeTitle: 'Essayez tout, une tâche à la fois',
    homeSubtitle:
      'Connectez-vous et parcourez {total} tâches en {groups} groupes. Chacune montre une capacité de BuildBase, son rendu dans une app et où elle se configure.',
    homeCta: 'Commencer la visite',
    dashboardCard: 'Votre visite',
    next: 'Suivant',
    cloneTitle: 'Clonez cette app',
    cloneBody:
      'Chaque page et chaque tâche ici sont dans un seul dépôt ouvert. Voyez comment tout fonctionne, ou clonez-le pour démarrer votre propre app.',
    browseCode: 'Parcourir le code',
    copy: 'Copier',
    copied: 'Copié',
    dashboardCta: 'Continuer',
  },
  help: {
    title: "Centre d'aide",
    description:
      'Tout sur cette page a été écrit dans la console : une politique, des docs, une FAQ et des témoignages. Modifiez-le là-bas, rechargez ici.',
    notConfigured: {
      title: 'Pas encore de contenu',
      token:
        "Cette app n'a pas de jeton d'API d'organisation, elle ne peut donc pas lire le contenu de la console. Définissez BUILDBASE_API_TOKEN.",
      empty:
        "L'organisation n'a pas encore le contenu de démo. Initialisez-le avec :",
    },
    from: {
      richContent: 'contenu riche',
      docs: 'docs',
      faqs: 'collection FAQ',
      testimonials: 'témoignages',
    },
    docs: {
      title: 'Documentation',
      empty: "Aucun doc publié pour l'instant.",
    },
    faq: {
      title: 'Questions fréquentes',
    },
    testimonials: {
      title: 'Ce que disent les clients',
    },
  },
  forms: {
    title: 'Formulaires',
    description:
      'Un formulaire créé dans la console, rendu depuis son schéma en ligne et envoyé via cette app.',
    loading: 'Chargement du formulaire…',
    fromConsole:
      'Les champs viennent de la console ; ajoutez-en un là-bas et rechargez.',
    submit: 'Envoyer',
    sending: 'Envoi…',
    sent: 'Envoyé',
    hint: "Les envois sont stockés comme enregistrements d'une collection et déclenchent l'événement form.submitted.",
    errors: {
      title: 'La plateforme a refusé cet envoi',
      generic: "Quelque chose n'a pas été accepté.",
    },
    missing: {
      title: 'Pas encore de formulaire de contact',
      token:
        "Cette app n'a pas de jeton d'API d'organisation. Définissez BUILDBASE_API_TOKEN.",
      form: "L'organisation n'a pas de formulaire nommé Contact. Initialisez-le avec :",
    },
    toast: {
      sent: "Envoyé. C'est maintenant un enregistrement sur la plateforme.",
    },
    submissions: {
      title: 'Derniers envois',
      description: 'Relus depuis la collection du formulaire.',
      refresh: 'Actualiser',
      empty: "Rien d'envoyé pour l'instant.",
    },
  },
  collections: {
    title: 'Collections',
    description:
      'Données personnalisées sur la plateforme : un schéma versionné, des enregistrements sur la version en ligne.',
    loading: 'Chargement des enregistrements…',
    liveVersion: 'Version en ligne {version} ({name}), {fields} champs',
    noLiveVersion: 'Aucune version en ligne. Publiez-en une dans la console.',
    refresh: 'Actualiser',
    empty:
      'Aucun enregistrement. Initialisez-en ou ajoutez-en un dans la console.',
    actions: 'Actions',
    delete: "Supprimer l'enregistrement",
    hint: 'Publiez une nouvelle version avec un champ supplémentaire dans la console ; la colonne apparaît ici au rechargement.',
    missing: {
      title: 'Pas encore de collection release-notes',
      token:
        "Cette app n'a pas de jeton d'API d'organisation. Définissez BUILDBASE_API_TOKEN.",
      collection:
        "L'organisation n'a pas de collection avec le slug release-notes. Initialisez-la avec :",
    },
    toast: {
      deleted: 'Enregistrement supprimé sur la plateforme.',
      deleteFailed: "Impossible de supprimer l'enregistrement.",
    },
  },
  tracking: {
    title: 'Suivi',
    description:
      'Tags d’analyse et de publicité définis dans la console, chargés après consentement, avec vos propres événements et l’attribution.',
    loading: 'Chargement…',
    consent: {
      title: 'Consentement',
      description:
        'Construit à partir des tags rattachés à cette app, jamais de toute la bibliothèque.',
      noTags:
        'Aucun tag n’est rattaché à cette app. Ajoutez-en un dans la console sous Paramètres → Suivi et rattachez-le au client.',
      privacy: 'Confidentialité',
      analytics: 'analyse',
      marketing: 'marketing',
      acceptAll: 'Tout accepter',
      analyticsOnly: 'Analyse seulement',
      denyAll: 'Tout refuser',
      state: 'État actuel',
      unset: 'pas encore demandé',
    },
    installed: {
      title: 'Fournisseurs installés',
      description:
        'Ce qui s’est réellement chargé dans ce navigateur après consentement.',
      none: 'Rien n’est chargé. Donnez votre consentement, ou rattachez un tag dans la console.',
    },
    custom: {
      title: 'Suivre un événement personnalisé',
      description:
        'Vos propres événements vont à la couche de données et à chaque fournisseur installé.',
      button: 'Suivre report_exported',
      fired: 'Envoyé {count} fois',
    },
    attribution: {
      title: 'Attribution',
      description:
        'D’où vient ce visiteur : identifiants de clic et paramètres de campagne, capturés sur la première page.',
      empty: 'Rien de capturé. Rechargez avec',
    },
    log: {
      title: 'Journal des événements en direct',
      description:
        'Chaque événement envoyé par le SDK dans cet onglet, y compris ceux qu’il envoie de lui-même.',
      empty: 'Pas encore d’événement. Naviguez, ou suivez-en un ci-dessus.',
    },
  },
  automations: {
    title: 'Automatisations',
    description:
      'Les workflows se construisent dans la console ; cette app provoque les événements qu’ils écoutent et lit ce qui a tourné pour vous.',
    refresh: 'Actualiser',
    loading: 'Chargement…',
    notConfigured:
      'BUILDBASE_API_TOKEN n’est pas configuré, cette app ne peut donc pas lire les exécutions.',
    error: 'Impossible de charger les exécutions',
    runs: {
      title: 'Vos exécutions',
      description:
        'Instances de workflow lancées par la plateforme pour votre compte.',
      empty:
        'Pas encore d’exécution. Envoyez le formulaire de contact ou inscrivez un nouvel utilisateur, puis actualisez.',
      workflow: 'Workflow',
      event: 'Événement',
      status: 'Statut',
      nodes: 'Nœuds terminés',
      started: 'Début',
    },
    calls: {
      title: 'Appels vers cette app',
      description:
        'Ce que l’action HTTP Webhook d’un workflow a envoyé à /api/buildbase/provision, vérifié par secret partagé.',
      empty: 'Aucun appel de provisionnement reçu pour l’instant.',
    },
  },
  reports: {
    title: 'Rapports',
    description:
      'Chaque module rapporte via les mêmes endpoints de graphiques et de comptages ; trois d’entre eux, sur les trente derniers jours.',
    notConfigured:
      'BUILDBASE_API_TOKEN n’est pas configuré, cette app ne peut donc pas lire les rapports.',
    loading: 'Chargement…',
    refresh: 'Actualiser',
    window: 'Du {from} au {to}',
    unavailable: 'Indisponible',
    series: {
      users: {
        title: 'Inscriptions',
        description: 'Nouveaux utilisateurs par jour.',
      },
      forms: {
        title: 'Envois de formulaire',
        description: 'Envois du formulaire de contact par jour.',
      },
      links: {
        title: 'Clics sur liens',
        description: 'Clics sur liens courts par jour.',
      },
    },
  },
  assets: {
    title: 'Fichiers',
    description:
      'Fichiers envoyés depuis cette app, stockés et servis par la plateforme.',
    upload: 'Envoyer un fichier',
    uploading: 'Envoi…',
    limit: 'Jusqu’à 5 Mo. Les images ont un aperçu.',
    uploaded: 'Envoyé',
    gallery: 'Fichiers',
    empty: 'Aucun fichier pour l’instant. Envoyez-en un ci-dessus.',
    public: 'Public',
    private: 'Privé',
    makePrivate: 'Rendre privé',
    makePublic: 'Rendre public',
    nowPublic: 'Désormais public : l’URL fonctionne à nouveau.',
    nowPrivate: 'Désormais privé : l’URL publique ne fonctionne plus.',
    openUrl: 'Ouvrir',
    tooLarge: 'Ce fichier dépasse 5 Mo.',
    loadFailed: 'Impossible de joindre la plateforme.',
    notConfigured:
      'Cette page lit l’organisation via un jeton d’API. Définissez BUILDBASE_API_TOKEN (console → Settings → Tokens) et redémarrez.',
  },
  links: {
    title: 'Liens courts',
    description:
      'Des liens de partage que la plateforme redirige et compte, clic après clic.',
    create: 'Créer un lien court',
    createHint:
      'N’importe quelle URL. La plateforme attribue un id de 12 caractères et enregistre chaque clic avec son pays et son appareil.',
    name: 'Nom',
    url: 'URL de destination',
    createButton: 'Créer',
    created: 'Lien créé',
    yourLinks: 'Vos liens',
    clicksHint:
      'Suivez un lien puis actualisez : le compte vient de la plateforme, pas de cette page.',
    refresh: 'Actualiser',
    empty: 'Aucun lien pour l’instant.',
    clicks: 'clics',
    copy: 'Copier l’URL courte',
    copied: 'Copié',
    follow: 'Suivre',
    changeDestination: 'Changer la destination',
    save: 'Enregistrer',
    cancel: 'Annuler',
    updated: 'Destination changée. L’URL courte reste la même.',
    chart: 'Clics, 14 derniers jours',
    chartHint: 'Tous les liens ensemble, par jour.',
    chartEmpty: 'Aucun clic pour l’instant.',
    loadFailed: 'Impossible de joindre la plateforme.',
    notConfigured:
      'Cette page lit l’organisation via un jeton d’API. Définissez BUILDBASE_API_TOKEN (console → Settings → Tokens) et redémarrez.',
  },
  audience: {
    title: 'Audience et attributs',
    description:
      'Ce que la plateforme garde d’une personne au-delà du compte : attributs personnalisés, contact marketing et liste d’attente.',
    failed: 'Enregistrement impossible.',
    notConfigured:
      'La newsletter a besoin de BUILDBASE_API_TOKEN côté serveur.',
    onboarding: {
      title: 'Liste d’intégration',
      description:
        'Cochez les trois et enregistrez : le SDK écrit onboarded=true et votre fonction comme attributs utilisateur, dans votre navigateur, en votre nom.',
      items: {
        profile: 'J’ai rempli mon profil',
        workspace: 'J’ai créé un espace de travail',
        invite: 'J’ai invité quelqu’un',
      },
      role: 'Votre fonction (facultatif)',
      save: 'Terminer l’intégration',
      saved: 'Enregistré. Ouvrez votre fiche dans la console pour le voir.',
      already: 'Déjà intégré, d’après vos attributs.',
    },
    attributes: {
      title: 'Vos attributs',
      description:
        'Les clés sont définies dans la console (Users → Attributes) ; les valeurs vivent sur votre utilisateur.',
      empty: 'Aucun attribut pour l’instant.',
    },
    locale: {
      title: 'Pays, fuseau horaire, devise',
      description:
        'Les listes sont fournies avec le SDK (@buildbase/sdk/data), sans téléchargement.',
      country: 'Pays',
      timezone: 'Fuseau horaire',
      currency: 'Devise',
      save: 'Enregistrer les préférences',
      saved: 'Préférences enregistrées comme attributs.',
    },
    newsletter: {
      title: 'Newsletter',
      description:
        'Un contact marketing est distinct de votre compte : il peut exister sans lui. Le serveur le crée avec le jeton de l’organisation et l’ajoute à la liste newsletter.',
      email: 'E-mail',
      subscribe: 'S’abonner',
      subscribed: 'Abonné',
      listed: 'Ajouté à la liste {list}.',
      noList:
        'Contact créé ; cette organisation n’a pas encore de liste newsletter.',
      waitlistHint:
        'Les visiteurs non connectés peuvent rejoindre la liste d’attente bêta sur',
    },
  },
  waitlist: {
    title: 'Rejoindre la liste d’attente',
    description:
      'Le formulaire bêta de la plateforme : laissez votre nom et votre e-mail, un administrateur vous approuve dans la console.',
    success:
      'Vous êtes sur la liste. Un administrateur vous approuvera depuis la console.',
    note: 'Le formulaire et ses textes viennent de la configuration bêta de l’organisation (console → Users → Beta).',
  },
};

export default messages;
