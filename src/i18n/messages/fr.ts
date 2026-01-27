import type { Messages } from '../types';

const messages: Messages = {
  common: {
    nav: {
      home: 'Accueil',
      dashboard: 'Tableau de bord',
      documents: 'Documents',
      analytics: 'Analytiques',
      team: 'Équipe',
      settings: 'Paramètres',
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
      },
      analytics: {
        title: 'Analytiques',
        description: 'Voir vos analytiques',
      },
      team: {
        title: 'Équipe',
        description: 'Gérez votre équipe',
      },
      settings: {
        title: 'Paramètres',
        description: 'Gérez vos paramètres',
      },
    },
  },
};

export default messages;
