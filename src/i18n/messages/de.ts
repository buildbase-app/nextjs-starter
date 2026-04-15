import type { Messages } from '../types';

const messages: Messages = {
  common: {
    nav: {
      home: 'Startseite',
      dashboard: 'Dashboard',
      documents: 'Dokumente',
      analytics: 'Analytik',
      team: 'Team',
      notifications: 'Benachrichtigungen',
      settings: 'Einstellungen',
      menu: 'Menü',
      selectWorkspace: 'Arbeitsbereich auswählen',
      profile: 'Profil',
      manageWorkspace: 'Arbeitsbereich verwalten',
      generalSettings: 'Allgemeine Einstellungen',
      userManagement: 'Benutzerverwaltung',
      billingPayments: 'Abrechnung und Zahlungen',
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
    accessibility: {
      skipToContent: 'Zum Inhalt springen',
    },
    theme: {
      toggle: 'Thema wechseln',
      light: 'Hell',
      dark: 'Dunkel',
      system: 'System',
    },
    redirecting: 'Weiterleitung...',
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
        placeholder: 'Dokumenteninhalt kommt hier hin.',
      },
      analytics: {
        title: 'Analytik',
        description: 'Ihre Analytik anzeigen',
        placeholder: 'Analytik-Inhalt kommt hier hin.',
      },
      team: {
        title: 'Team',
        description: 'Verwalten Sie Ihr Team',
        placeholder: 'Teamverwaltungs-Inhalt kommt hier hin.',
      },
      settings: {
        title: 'Einstellungen',
        description: 'Verwalten Sie Ihre Einstellungen',
        placeholder: 'Einstellungs-Inhalt kommt hier hin.',
      },
    },
  },
  pricing: {
    title: 'Preise',
    subtitle: 'Wählen Sie den Plan, der zu Ihnen passt',
    billing: 'Abrechnung',
    monthly: 'Monatlich',
    quarterly: 'Vierteljährlich',
    yearly: 'Jährlich',
    perMonth: '/Mon',
    perQuarter: '/Qrt',
    perYear: '/Jahr',
    currency: 'Währung',
    quotas: 'Kontingente',
    limits: 'Limits',
    features: 'Funktionen',
    included: 'Inklusive',
    perUnit: 'danach',
    loading: 'Pläne werden geladen...',
    noPlans: 'Keine Pläne verfügbar',
    error: 'Preise konnten nicht geladen werden',
    meta: {
      title: 'Preise',
      description: 'Unsere Pläne und Preise ansehen',
    },
  },
  errors: {
    generic: {
      title: 'Etwas ist schiefgelaufen',
      description:
        'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut oder kontaktieren Sie den Support, wenn das Problem weiterhin besteht.',
      tryAgain: 'Erneut versuchen',
      goHome: 'Zur Startseite',
    },
    notFound: {
      title: 'Seite nicht gefunden',
      description:
        'Entschuldigung, wir konnten die gesuchte Seite nicht finden. Sie wurde möglicherweise verschoben oder gelöscht.',
      goBack: 'Zurück',
    },
  },
};

export default messages;
