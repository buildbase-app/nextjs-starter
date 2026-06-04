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
      selectWorkspace: "Sélectionner l'espace de travail",
      profile: 'Profil',
      manageWorkspace: "Gérer l'espace de travail",
      generalSettings: 'Paramètres généraux',
      userManagement: 'Gestion des utilisateurs',
      billingPayments: 'Facturation et paiements',
      credits: 'Credits',
      creditUsage: 'Credit Usage',
      creditsAvailable: 'Available',
    },
    buttons: {
      signIn: 'Se connecter',
      signOut: 'Se déconnecter',
      submit: 'Soumettre',
      cancel: 'Annuler',
      save: 'Sauvegarder',
      delete: 'Supprimer',
      edit: 'Modifier',
      create: 'Créer',
      loading: 'Chargement...',
    },
    auth: {
      signInPrompt: 'Veuillez vous connecter pour continuer',
      signOutConfirm: 'Êtes-vous sûr de vouloir vous déconnecter?',
    },
    footer: {
      rights: 'Tous droits réservés',
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
    title: 'Mon App',
    hero: {
      heading: 'Bienvenue sur Mon App',
      description:
        'Construit avec Next.js, TypeScript, Tailwind CSS, shadcn/ui, next-themes et BuildBase SDK.',
    },
    meta: {
      title: 'Mon App',
      description:
        'Mon application Next.js avec shadcn/ui et support de thèmes',
      tagline: "Construisez quelque chose d'incroyable",
    },
  },
  dashboard: {
    title: 'Tableau de bord',
    welcome: 'Bon retour, {name}!',
    cards: {
      workspace: {
        title: 'Espace de travail actuel',
        empty: 'Aucun espace de travail sélectionné',
      },
      role: {
        title: 'Votre rôle',
        empty: 'N/A',
      },
      email: {
        title: 'E-mail',
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
        placeholder: "Le contenu d'analytiques va ici.",
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
  creditStore: {
    title: 'Credit Packages',
    subtitle:
      'Purchase credits to unlock premium features like AI generation, exports, and more.',
    buy: 'Buy Credits',
    validFor: 'Valid for {days} days',
    noExpiry: 'Never expires',
    noPackages: 'No credit packages available at this time.',
    error: 'Failed to load credit packages',
  },
  pricing: {
    title: 'Tarifs',
    subtitle: 'Choisissez le plan adapté à vos besoins',
    billing: 'Facturation',
    monthly: 'Mensuel',
    quarterly: 'Trimestriel',
    yearly: 'Annuel',
    perMonth: '/mois',
    perQuarter: '/trim',
    perYear: '/an',
    currency: 'Devise',
    quotas: 'Quotas',
    limits: 'Limites',
    credits: 'AI Credits',
    creditsPerPeriod: 'credits / period',
    features: 'Fonctionnalités',
    included: 'Inclus',
    perUnit: 'ensuite',
    loading: 'Chargement des plans...',
    noPlans: 'Aucun plan disponible',
    error: 'Échec du chargement des tarifs',
    meta: {
      title: 'Tarifs',
      description: 'Voir nos plans et tarifs',
    },
  },
  credits: {
    title: 'Credits',
    description:
      'Use credits for premium actions. Manage packages in workspace settings.',
    balance: 'Credit Balance',
    creditsAvailable: 'credits available',
    manageCredits: 'Manage Credits',
    buyCredits: 'Buy Credits',
    choosePlan: 'Choose Plan',
    noCredits:
      'You have no credits remaining. Purchase more to continue using premium features.',
    buyMore: 'Buy Credits',
    testConsume: {
      title: 'Test Credit Consumption',
      description:
        'Use these buttons to test consuming credits from your balance.',
      use: 'Use {amount}',
      apiDescription: 'Test: consume {amount} credits',
      success: 'Consumed {amount} credits. Balance: {balance}',
      insufficient:
        'Not enough credits. Available: {available}, Requested: {requested}',
    },
  },
  errors: {
    generic: {
      title: 'Une erreur est survenue',
      description:
        "Une erreur inattendue s'est produite. Veuillez réessayer ou contacter le support si le problème persiste.",
      tryAgain: 'Réessayer',
      goHome: "Retour à l'accueil",
    },
    notFound: {
      title: 'Page non trouvée',
      description:
        "Désolé, nous n'avons pas pu trouver la page que vous recherchez. Elle a peut-être été déplacée ou supprimée.",
      goBack: 'Retour',
    },
  },
};

export default messages;
