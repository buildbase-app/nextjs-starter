import type { Messages } from '../types';

const messages: Messages = {
  common: {
    nav: {
      home: 'Startseite',
      dashboard: 'Dashboard',
      documents: 'Dokumente',
      analytics: 'Analytik',
      team: 'Team',
      settings: 'Einstellungen',
    },
    buttons: {
      signIn: 'Anmelden',
      signOut: 'Abmelden',
      submit: 'Absenden',
      cancel: 'Abbrechen',
      save: 'Speichern',
      delete: 'Löschen',
      edit: 'Bearbeiten',
      create: 'Erstellen',
      loading: 'Laden...',
    },
    auth: {
      signInPrompt: 'Bitte melden Sie sich an, um fortzufahren',
      signOutConfirm: 'Sind Sie sicher, dass Sie sich abmelden möchten?',
    },
    footer: {
      rights: 'Alle Rechte vorbehalten',
    },
    language: {
      select: 'Sprache wählen',
      current: 'Aktuelle Sprache',
    },
  },
  home: {
    title: 'Meine App',
    hero: {
      heading: 'Willkommen bei Meine App',
      description:
        'Erstellt mit Next.js, TypeScript, Tailwind CSS, shadcn/ui, next-themes und BuildBase SDK.',
    },
    meta: {
      title: 'Meine App',
      description:
        'Meine Next.js Anwendung mit shadcn/ui und Theme-Unterstützung',
      tagline: 'Bauen Sie etwas Erstaunliches',
    },
  },
  dashboard: {
    title: 'Dashboard',
    welcome: 'Willkommen zurück, {name}!',
    cards: {
      workspace: {
        title: 'Aktueller Arbeitsbereich',
        empty: 'Kein Arbeitsbereich ausgewählt',
      },
      role: {
        title: 'Ihre Rolle',
        empty: 'N/A',
      },
      email: {
        title: 'E-Mail',
      },
      status: {
        title: 'Status',
        active: 'Aktiv',
        inactive: 'Inaktiv',
      },
    },
    quickActions: {
      title: 'Schnellaktionen',
      createProject: 'Projekt erstellen',
      viewReports: 'Berichte ansehen',
      inviteTeam: 'Teammitglied einladen',
    },
    pages: {
      documents: {
        title: 'Dokumente',
        description: 'Verwalten Sie Ihre Dokumente',
      },
      analytics: {
        title: 'Analytik',
        description: 'Ihre Analytik anzeigen',
      },
      team: {
        title: 'Team',
        description: 'Verwalten Sie Ihr Team',
      },
      settings: {
        title: 'Einstellungen',
        description: 'Verwalten Sie Ihre Einstellungen',
      },
    },
  },
};

export default messages;
