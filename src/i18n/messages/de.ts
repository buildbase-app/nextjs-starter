import type { Messages } from '../types';

const messages: Messages = {
  common: {
    nav: {
      home: 'Startseite',
      dashboard: 'Dashboard',
      documents: 'Dokumente',
      team: 'Team',
      notifications: 'Benachrichtigungen',
      settings: 'Einstellungen',
      menu: 'Menü',
      selectWorkspace: 'Arbeitsbereich wählen',
      profile: 'Profil',
      manageWorkspace: 'Arbeitsbereich verwalten',
      generalSettings: 'Allgemeine Einstellungen',
      userManagement: 'Benutzerverwaltung',
      billingPayments: 'Abrechnung & Zahlungen',
      credits: 'Credits',
      creditUsage: 'Credit-Nutzung',
      creditsAvailable: 'Verfügbar',
      usage: 'Nutzung',
      permissions: 'Berechtigungen',
      events: 'Ereignisse',
      invoices: 'Rechnungen',
      workspace: 'Arbeitsbereich',
      tour: 'Tour',
      inbox: 'Posteingang',
      modules: 'Module',
      forms: 'Formulare',
      collections: 'Sammlungen',
      assets: 'Dateien',
      links: 'Kurzlinks',
      audience: 'Zielgruppe',
      tracking: 'Tracking',
      automations: 'Automatisierungen',
      reports: 'Berichte',
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
      loading: 'Wird geladen...',
    },
    auth: {
      signInPrompt: 'Bitte melden Sie sich an, um fortzufahren',
      signOutConfirm: 'Möchten Sie sich wirklich abmelden?',
    },
    footer: {
      rights: 'Alle Rechte vorbehalten',
      tagline:
        'Eine Live-Demo-App, die das BuildBase SDK in Aktion zeigt. Melde dich an, um Authentifizierung, Workspaces, Credits, Push-Benachrichtigungen und i18n zu erkunden.',
      sections: {
        product: 'Produkt',
        resources: 'Ressourcen',
        legal: 'Rechtliches',
      },
      links: {
        features: 'Funktionen',
        pricing: 'Preise',
        dashboard: 'Dashboard',
        credits: 'Credits',
        blog: 'Blog',
        changelog: 'Änderungsprotokoll',
        tour: 'Tour',
        privacy: 'Datenschutzrichtlinie',
        terms: 'Nutzungsbedingungen',
      },
    },
    language: {
      select: 'Sprache wählen',
      current: 'Aktuelle Sprache',
    },
    accessibility: {
      skipToContent: 'Zum Inhalt springen',
    },
    theme: {
      toggle: 'Design wechseln',
      light: 'Hell',
      dark: 'Dunkel',
      system: 'System',
    },
    pages: {
      lastUpdated: 'Zuletzt aktualisiert:',
    },
    redirecting: 'Weiterleitung...',
  },
  home: {
    title: 'BuildBase Demo',
    hero: {
      badge: 'Live-Demo · 67 Aufgaben',
      heading:
        'Jede BuildBase-Fähigkeit, <highlight>eine Aufgabe nach der anderen</highlight>',
      description:
        'Eine echte App auf dem BuildBase SDK, mit geführter Tour: anmelden und Registrierung, Workspaces, Abrechnung, Nutzung, Credits, Benachrichtigungen, Agenten und Webhooks durchgehen, jeweils mit Herkunft.',
      signInToExplore: 'Anmelden und erkunden',
      openDashboard: 'Dashboard öffnen',
      viewSource: 'Quellcode ansehen',
      builtWith: 'Erstellt mit',
    },
    stats: {
      languages: {
        label: 'Sprachen in dieser Demo',
        sublabel: 'mit dem Header-Schalter wechseln',
      },
      tasks: {
        label: 'Aufgaben der Tour',
        sublabel: 'jede eine Fähigkeit zum Ausprobieren',
      },
      groups: {
        label: 'Gruppen',
        sublabel: 'von der Anmeldung bis zu Webhooks',
      },
      authCode: {
        label: 'Zeilen Auth-Code',
        sublabel: 'das SDK erledigt alles',
      },
    },
    cta: {
      heading: 'Bereit, alles in Aktion zu sehen?',
      description:
        'Melde dich an, um das vollständige Dashboard zu öffnen — wechsle Arbeitsbereiche, verbrauche Guthaben, sende eine Push-Benachrichtigung und schalte zwischen allen 8 Sprachen.',
      signIn: 'Anmelden und erkunden',
      openDashboard: 'Dashboard öffnen',
      howBuilt: 'Wie es gebaut wurde',
    },
    meta: {
      title: 'Meine App',
      description: 'Meine Next.js-App mit shadcn/ui und Theme-Unterstützung',
      tagline: 'Baue etwas Großartiges',
    },
  },
  dashboard: {
    title: 'Dashboard',
    welcome: 'Willkommen zurück, {name}!',
    trial: {
      endingSoon: 'Testphase endet bald',
      endingSoonMsg:
        'Ihre Testphase endet in {days} Tag{s}. Führen Sie jetzt ein Upgrade durch, um den Zugang zu behalten.',
      upgrade: 'Upgrade',
      freeTrial: 'Sie befinden sich in der Testphase',
      daysRemaining: '{days} Tage verbleibend',
      endsOn: 'Testphase endet am {date}',
      active: 'Testphase aktiv',
      viewPlans: 'Pläne ansehen',
      trialBadge: 'Test',
    },
    noSubscription: {
      title: 'Kein aktives Abonnement',
      hint: 'Abonnieren Sie, um kostenpflichtige Funktionen freizuschalten',
      choosePlan: 'Plan wählen',
    },
    subscription: {
      title: 'Abonnement',
      description: 'Ihr aktueller Plan',
      loading: 'Wird geladen...',
      status: 'Status: {status}',
      activeSubscription: 'Aktives Abonnement',
      changePlan: 'Plan wechseln',
      noPlan: 'Kein aktiver Plan',
      choosePlan: 'Plan wählen',
    },
    subscriptionGates: {
      whenSubscription: {
        title: 'Abonnement-Gate',
        description: 'Nur mit aktivem Abonnement sichtbar',
        fallback:
          'Kein aktives Abonnement — führen Sie ein Upgrade durch, um diesen Inhalt zu sehen.',
        content: 'Sie haben ein aktives Abonnement — diese Karte ist sichtbar.',
      },
      whenSubscriptionToPlans: {
        title: 'Plan-Gate',
        description: 'Nur mit einem bestimmten Plan sichtbar',
        fallback: 'Sie befinden sich nicht im Pro / Enterprise / Growth-Plan.',
        content:
          'Sie sind bei Pro, Enterprise oder Growth — Premium-Inhalt freigeschaltet.',
      },
    },
    seatStatus: {
      title: 'Sitzstatus',
      description: 'Mitglieder vs. Planlimits',
      members: 'Mitglieder',
      includedSeats: 'Enthaltene Sitze',
      maxUsers: 'Max. Benutzer',
      canInvite: 'Kann einladen',
      yes: 'Ja',
      no: 'Nein',
      limitReached:
        'Sitzlimit erreicht — führen Sie ein Upgrade durch, um mehr Mitglieder einzuladen.',
    },
    quickActionButtons: {
      inviteTeam: 'Team einladen',
      manageSubscription: 'Abonnement verwalten',
      workspaceSettings: 'Arbeitsbereich-Einstellungen',
    },
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
        title: 'E-Mail-Adresse',
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
        description: 'Ihre Dokumente verwalten',
        placeholder: 'Dokumenteninhalt kommt hier.',
      },
      analytics: {
        title: 'Analysen',
        description: 'Ihre Analysen ansehen',
        placeholder: 'Analyseninhalt kommt hier.',
      },
      team: {
        title: 'Team',
        description: 'Ihr Team verwalten',
        placeholder: 'Teamverwaltungsinhalt kommt hier.',
      },
      settings: {
        title: 'Einstellungen',
        description: 'Ihre Einstellungen verwalten',
        placeholder: 'Einstellungsinhalt kommt hier.',
      },
    },
  },
  team: {
    title: 'Team',
    description: 'Mitglieder des Arbeitsbereichs',
    inviteMember: 'Mitglied einladen',
    seatLimitReached:
      'Sitzlimit erreicht — führen Sie ein Upgrade durch, um mehr Mitglieder einzuladen.',
    cards: {
      members: 'Mitglieder',
      includedSeats: 'Enthaltene Sitze',
      maxUsers: 'Max. Benutzer',
      availableSeats: 'Verfügbare Sitze',
    },
    memberList: {
      title: 'Mitglieder',
      count: '{count} Mitglied(er) in diesem Arbeitsbereich',
      empty:
        'Keine Mitglieder geladen. Stellen Sie sicher, dass Sie authentifiziert sind.',
      roleFallback: 'Mitglied',
      changeRole: 'Rolle ändern',
    },
    invite: {
      title: 'Per E-Mail einladen',
      description:
        'Die Adresse braucht noch kein Konto. Die Person erhält eine E-Mail, folgt dem Link, registriert sich oder meldet sich an und nimmt an.',
      noPermission: 'Ihre Rolle darf keine Mitglieder einladen.',
      emailPlaceholder: 'name@firma.de',
      role: 'Rolle',
      send: 'Einladung senden',
      sent: 'Einladung an {email} gesendet',
      failed: 'Etwas ist schiefgelaufen',
      resent: 'Einladung erneut gesendet',
      revoked: 'Einladung zurückgezogen',
      seatNote:
        '{count} offene Einladung(en) belegen einen Platz, bis sie beantwortet sind.',
      pendingTitle: 'Offen',
      loading: 'Wird geladen…',
      none: 'Nichts offen.',
      invitedBy: 'Eingeladen von {name}',
      pendingLabel: 'Offen',
      expires: 'läuft ab am {date}',
      cooldown: 'Erneut senden in {seconds}s',
      resend: 'Erneut senden',
      revoke: 'Zurückziehen',
    },
    roleChanged: 'Rolle geändert zu {role}',
    manage: {
      title: 'Mitglieder verwalten',
      description:
        'Öffnen Sie das Einstellungspanel, um Rollen und Einladungen zu verwalten',
      openSettings: 'Mitgliedereinstellungen öffnen',
      permissions: 'Berechtigungen',
    },
  },
  settings: {
    title: 'Einstellungen',
    description: 'Konfiguration des Arbeitsbereichs',
    card: {
      title: 'Arbeitsbereich-Einstellungen',
      description:
        'Klicken Sie auf einen Abschnitt, um das Einstellungspanel zu öffnen',
    },
    danger: {
      openButton: 'Gefahrenzone öffnen',
    },
    sections: {
      profile: {
        label: 'Profil',
        description: 'Ihr Name, Avatar und persönliche Daten',
      },
      general: {
        label: 'Allgemein',
        description: 'Arbeitsbereichsname, Slug und grundlegende Konfiguration',
      },
      users: {
        label: 'Mitglieder & Einladungen',
        description:
          'Teammitglieder, Rollen und ausstehende Einladungen verwalten',
      },
      subscription: {
        label: 'Abonnement',
        description: 'Ihren aktuellen Plan anzeigen und ändern',
      },
      usage: {
        label: 'Nutzung',
        description: 'Kontingentverbrauch und Nutzungsverlauf',
      },
      credits: {
        label: 'Credits',
        description: 'Credit-Guthaben und Aufladoptionen',
      },
      features: {
        label: 'Feature-Flags',
        description: 'Arbeitsbereichsfunktionen aktivieren/deaktivieren',
      },
      notifications: {
        label: 'Benachrichtigungen',
        description: 'E-Mail- und Push-Benachrichtigungseinstellungen',
      },
      permissions: {
        label: 'Berechtigungen',
        description: 'Rollenbasierte Zugriffskontrolle konfigurieren',
      },
      danger: {
        label: 'Gefahrenzone',
        description: 'Arbeitsbereich löschen oder Eigentumsübertragung',
      },
    },
  },
  documents: {
    featureGates: {
      title: 'Feature-Gates',
      description:
        'Teile dieses Produkts, die ein Workspace- oder Nutzer-Feature-Flag freischaltet.',
    },
    workbench: {
      title: 'Ihre Dokumente',
      description:
        'Dokumente liegen in der Datenbank dieser App; die Plattform misst sie.',
      search: 'Dokumente suchen',
      allStatuses: 'Alle Status',
      allTags: 'Alle Tags',
      newDocument: 'Neues Dokument',
      newDocumentHint:
        'Ein Dokument anzulegen bucht Nutzung auf die documents-Quote und kostet einen Credit.',
      titleLabel: 'Titel',
      contentLabel: 'Inhalt (Markdown)',
      statusLabel: 'Status',
      tagsLabel: 'Tags, durch Komma getrennt',
      create: 'Anlegen',
      creating: 'Wird angelegt…',
      created: 'Dokument angelegt',
      deleted: 'Dokument gelöscht',
      delete: 'Löschen',
      loadSamples: 'Beispieldokumente laden',
      clearSamples: 'Beispiele entfernen',
      samplesLoaded: '{count} Beispieldokumente geladen',
      samplesAlready: 'Beispiele bereits geladen',
      samplesCleared: '{count} Beispieldokumente entfernt',
      sample: 'Beispiel',
      empty: 'Noch keine Dokumente.',
      total: '{count} gesamt',
      words: '{count} Wörter',
      loadFailed: 'Dokumente konnten nicht geladen werden',
      viewerNotice:
        'Ihre Rolle hier ist {role}: lesen ja, schreiben nein. Die Buttons sind deaktiviert und der Server lehnt ohnehin ab.',
      quotaExhausted:
        'Die documents-Quote dieses Plans ist aufgebraucht und erlaubt keine Überschreitung. Für mehr upgraden.',
      quotaExhaustedShort: 'Quote aufgebraucht',
      quotaWarning:
        'Sie haben über 80 % der documents-Quote dieses Plans verbraucht.',
      creditsLow: 'Die Credits werden knapp. Jedes Dokument kostet einen.',
      creditsExhausted:
        'Keine Credits mehr. Dokumente werden trotzdem angelegt; die Messzeile zeigt, dass die Abbuchung übersprungen wurde.',
      refusedQuota:
        'Abgelehnt: {consumed} von {included} Dokumenten verbraucht, der Plan hat ein hartes Limit.',
      refusedRole: 'Abgelehnt: die Rolle {role} darf nicht schreiben.',
      meteringTitle: 'Was die Plattform erfasst hat',
      meteringUsage: 'Nutzung: {used} von {included} Dokumenten',
      meteringUsageSkipped:
        'Nutzung: nicht erfasst (dieser Plan hat keine documents-Quote)',
      meteringCredits: 'Credits: {amount} abgebucht, {balance} übrig',
      meteringCreditsSkipped: 'Credits: nicht abgebucht (kein Guthaben)',
      statuses: {
        draft: 'Entwurf',
        in_review: 'In Prüfung',
        published: 'Veröffentlicht',
        archived: 'Archiviert',
      },
    },
    title: 'Dokumente',
    description:
      'Die Dokumente Ihres Workspace: hier oder von einem Agenten angelegt, von der Plattform gemessen.',
    stats: {
      featureSections: 'Feature-Abschnitte',
      featureSectionsSubtitle: 'Dokumentfunktionen',
      enabled: 'Für Arbeitsbereich aktiviert',
      enabledSubtitle: 'aktive Funktionen',
      locked: 'Gesperrt',
      lockedSubtitle: 'inaktive Funktionen',
    },
    features: {
      enabled: 'Aktiviert',
      disabled: 'Deaktiviert',
    },
    allFeatures: {
      title: 'Alle Arbeitsbereichsfunktionen',
      description: 'Status aller Flags',
      empty: 'Keine Feature-Flags für diesen Arbeitsbereich konfiguriert.',
    },
    featureSections: {
      advancedExports: {
        label: 'Erweiterte Exporte',
        description: 'Dokumente als PDF, DOCX oder CSV exportieren',
        content: 'PDF-, Word- und CSV-Export in Ihrem Plan verfügbar.',
        lockedMessage:
          'Aktivieren Sie die Funktion "Erweiterte Exporte", um Exporte freizuschalten.',
      },
      documentSharing: {
        label: 'Dokumentfreigabe',
        description: 'Dokumente mit externen Mitarbeitern teilen',
        content: 'Freigabelinks und externer Mitarbeiterzugang sind aktiviert.',
        lockedMessage:
          'Aktivieren Sie die Dokumentfreigabe, um externen Zugang zu ermöglichen.',
      },
      eSignatures: {
        label: 'Elektronische Signaturen',
        description: 'Rechtlich bindende Unterschriften sammeln',
        content: 'Die Sammlung elektronischer Signaturen ist aktiv.',
        lockedMessage:
          'Aktivieren Sie elektronische Signaturen, um Unterschriften auf Dokumenten zu sammeln.',
      },
    },
  },
  events: {
    webhooks: {
      title: 'Empfangene Webhooks',
      description:
        'Signierte Server-zu-Server-Zustellungen der Plattform, von /api/webhooks/buildbase für diesen Arbeitsbereich gespeichert.',
      empty:
        'Noch keine Webhooks. Abonnieren, jemanden einladen oder Credits kaufen, dann ruft die Plattform diese App auf.',
      refresh: 'Aktualisieren',
      event: 'Ereignis',
      received: 'Empfangen',
      signature: 'Signatur',
      verified: 'Geprüft',
      payload: 'Inhalt',
      when: 'Plattformzeit',
    },
    title: 'SDK-Ereignisprotokoll',
    description: 'Echtzeit-SDK-Ereignisse',
    clearButton: 'Leeren',
    listenCard: {
      title: 'Ereignisse werden abgehört',
      description:
        'Diese Ereignisse werden automatisch bei der SDK-Nutzung ausgelöst — wechseln Sie den Arbeitsbereich, melden Sie sich an oder laden Sie ein Mitglied ein, um sie zu sehen.',
    },
    liveCard: {
      title: 'Live-Stream',
      captured: '{count} Ereignisse erfasst',
      empty:
        'Noch keine Ereignisse. Versuchen Sie, den Arbeitsbereich zu wechseln oder die Seite neu zu laden.',
    },
    eventLabels: {
      userCreated: 'Benutzer erstellt',
      userUpdated: 'Benutzer aktualisiert',
      workspaceChanged: 'Arbeitsbereich gewechselt',
      workspaceUpdated: 'Arbeitsbereich aktualisiert',
      memberAdded: 'Mitglied hinzugefügt',
      memberRemoved: 'Mitglied entfernt',
      roleChanged: 'Rolle geändert',
      workspaceCreated: 'Arbeitsbereich erstellt',
      workspaceDeleted: 'Arbeitsbereich gelöscht',
    },
  },
  invoices: {
    title: 'Rechnungen',
    description: 'Abrechnungsverlauf',
    refresh: 'Aktualisieren',
    billingPortal: 'Abrechnungsportal',
    billingPortalOpening: 'Wird geöffnet…',
    error: 'Fehler beim Laden der Rechnungen.',
    card: {
      title: 'Rechnungsverlauf',
      found: '{count} Rechnung(en) gefunden',
      empty:
        'Noch keine Rechnungen. Rechnungen erscheinen hier nach dem Abonnieren eines kostenpflichtigen Plans.',
    },
    table: {
      date: 'Datum',
      amount: 'Betrag',
      status: 'Status',
      description: 'Beschreibung',
      links: 'Links',
      view: 'Ansehen',
      pdf: 'PDF',
      loadMore: 'Mehr laden',
    },
  },
  notifications: {
    title: 'Benachrichtigungen',
    description:
      'Senden Sie eine Benachrichtigung aus dieser App und sehen Sie, wo sie ankommt',
    pushCard: {
      title: 'Browser-Push-Benachrichtigungen',
      description:
        'Push-Benachrichtigungen des Browsers für dieses Gerät aktivieren',
      subscribed: 'Abonniert',
      notSubscribed: 'Nicht abonniert',
      subscribe: 'Abonnieren',
      unsubscribe: 'Abbestellen',
    },
    sendCard: {
      title: 'Testbenachrichtigung senden',
      description:
        'Füllen Sie die Felder aus und senden Sie eine Benachrichtigung. Die Labels {{name}}, {{workspaceName}}, {{url}} werden automatisch aufgelöst.',
    },
    fields: {
      eventSlug: 'Ereignis-Slug',
      eventSlugHint:
        'Das Demo-Ereignis ist „{slug}“, in der Konsole mit E-Mail und Push registriert. Nur für Push geht jeder Slug; E-Mail braucht ein registriertes Ereignis.',
      title: 'Titel',
      message: 'Nachricht',
      url: 'URL',
      target: 'Empfänger',
      channel: 'Kanal',
    },
    placeholders: {
      eventSlug: 'z.B. comment_added, deployment_success',
      title: 'Benachrichtigungstitel',
      message: 'Push-Inhalt + E-Mail-Nachricht',
      url: 'Öffnet beim Klicken auf Push',
    },
    buttons: {
      meOnly: 'Nur ich',
      allMembers: 'Alle Workspace-Mitglieder',
      both: 'Beide',
      emailOnly: 'Nur E-Mail',
      pushOnly: 'Nur Push',
      showAdvanced: 'Erweiterte Push-Optionen anzeigen',
      hideAdvanced: 'Erweiterte Push-Optionen ausblenden',
      send: 'Benachrichtigung senden',
      sending: 'Wird gesendet...',
      silent: 'Lautlos',
      requireInteraction: 'Interaktion erforderlich',
      renotify: 'Erneut benachrichtigen',
      default: 'Standard',
    },
    advanced: {
      media: 'Medien',
      behavior: 'Push-Verhalten',
      delivery: 'Zustellung',
      actions: 'Aktionsschaltflächen (max. 2)',
      iconUrl: 'Symbol-URL',
      imageUrl: 'Bild-URL',
      badgeUrl: 'Badge-URL',
      tag: 'Tag',
      tagHint:
        'Ersetzt die Benachrichtigung mit demselben Tag anstatt zu stapeln',
      behaviorHint:
        'Lautlos = kein Ton. Interaktion erforderlich = bleibt bis Benutzeraktion. Erneut benachrichtigen = Ton beim Ersetzen.',
      urgency: 'Dringlichkeit',
      ttl: 'TTL (Sekunden)',
      schedule: 'Planen (ISO 8601)',
      action1: 'Aktion 1',
      action2: 'Aktion 2',
      actionTitlePlaceholder: 'Schaltflächenbeschriftung (z.B. Antworten)',
      actionKeyPlaceholder: 'Aktionsschlüssel (z.B. reply)',
      iconUrlPlaceholder: 'Push icon (falls back to org icon)',
      imageUrlPlaceholder: 'Large image in push body',
      badgeUrlPlaceholder: 'Status bar icon (Android)',
      ttlPlaceholder: '86400 (24h default)',
    },
    context: {
      workspace: 'Arbeitsbereich:',
      user: 'Benutzer:',
      none: 'Keine Auswahl',
    },
    resultCard: {
      title: 'Antwort',
      description: 'Was die Plattform mit dem Versand gemacht hat.',
      openInbox: 'Posteingang öffnen',
    },
    toast: {
      workspaceRequired: 'Bitte wählen Sie zuerst einen Arbeitsbereich aus',
      sent: 'Benachrichtigung an {count} Benutzer gesendet',
      notSent: 'Benachrichtigung nicht gesendet: {reason}',
      inboxHint: 'Sehen Sie auf die Glocke und in Ihren Posteingang.',
      pushEnabled: 'Push-Benachrichtigungen aktiviert',
      pushDisabled: 'Push-Benachrichtigungen deaktiviert',
      pushFailed: 'Fehler beim Ändern der Push-Benachrichtigungen',
      networkError: 'Netzwerkfehler — Verbindung zum Server nicht möglich',
    },
  },
  permissions: {
    title: 'Berechtigungen',
    description: 'Echtzeit-Berechtigungsauflösung',
    cards: {
      role: 'Ihre Rolle',
      owner: 'Eigentümer',
      ownerYes: 'Ja',
      ownerNo: 'Nein',
      granted: 'Erteilte Berechtigungen',
    },
    ownerAdmin: {
      title: 'Nur Eigentümer / Administrator',
      notVisible: 'Für Ihre Rolle ({role}) nicht sichtbar.',
      visible:
        'Sie können dies sehen, weil Sie Eigentümer oder Administrator sind.',
    },
    allMembers: {
      title: 'Alle Mitglieder',
      notMember: 'Sie sind kein Mitglied dieses Arbeitsbereichs.',
      visible:
        'Sie können dies sehen, weil Sie Mitglied des Arbeitsbereichs sind.',
    },
    matrix: {
      title: 'Berechtigungsmatrix',
      description:
        'Alle Berechtigungen werden gegen Ihre aktuelle Rolle geprüft',
      denied: 'Verweigert',
      grantedStatus: 'Erteilt',
    },
  },
  profile: {
    agents: {
      title: 'Verbundene Agenten',
      description:
        'KI-Clients, die Sie berechtigt haben, über MCP in Ihrem Namen zu handeln. Trennen entzieht den Zugriff.',
      guideTitle: 'Agent verbinden',
      guideDescription:
        'Diese App ist ein MCP-Server. Fügen Sie sie in Claude, Cursor oder ChatGPT hinzu und melden Sie sich mit Ihrem BuildBase-Konto an; der Agent liest dann Ihre Arbeitsbereiche und die Dokumente dieser App mit Ihren Berechtigungen.',
    },
    title: 'Benutzerprofil',
    description: 'Benutzerattribute und Feature-Flags',
    identity: {
      title: 'Identität',
      subtitle: 'Von useSaaSAuth()',
      name: 'Name',
      email: 'E-Mail-Adresse',
      role: 'Rolle',
      id: 'ID',
    },
    workspaceFeatures: {
      title: 'Arbeitsbereich-Feature-Flags',
      enabled: 'Aktiviert',
      disabled: 'Deaktiviert',
    },
    attributes: {
      title: 'Benutzerattribute',
      description: 'Benutzerdefinierte Schlüssel-Wert-Paare pro Benutzer',
      empty: 'Noch keine Attribute konfiguriert.',
      setTitle: 'Attribut setzen (Demo)',
      keyPlaceholder: 'Schlüssel (z.B. theme)',
      valuePlaceholder: 'Wert',
      saving: 'Wird gespeichert…',
      save: 'Speichern',
      saved: 'Gespeichert!',
      failed: 'Speichern fehlgeschlagen.',
    },
    userFeatures: {
      title: 'Benutzer-Feature-Flags',
      description: 'Feature-Flags auf Benutzerebene',
      empty: 'Keine Flags für diesen Benutzer konfiguriert.',
      loading: 'Wird geladen...',
      enabled: 'Aktiviert',
      disabled: 'Deaktiviert',
    },
  },
  usage: {
    title: 'Kontingentnutzung',
    description: 'Echtzeit-Kontingentverbrauch',
    loading: 'Kontingente werden geladen...',
    error: 'Fehler beim Laden der Kontingentdaten.',
    empty: 'Keine Kontingente für diesen Arbeitsbereich konfiguriert.',
    quotaCard: {
      remaining: '{count} verbleibend',
      unlimited: 'Unbegrenzt',
      exhausted: 'Erschöpft',
      overage: 'Überschreitung',
      threshold: 'Über 80% genutzt ({pct}%) — nahe am Limit',
      overageMsg: 'Überschreitung um {count} Einheiten',
      exhaustedMsg:
        'Kontingent erschöpft — Aktionen, die dieses Kontingent nutzen, sind blockiert',
      used: 'verwendet',
      overageAllowed: '(erlaubt)',
    },
    record: {
      title: 'Nutzung erfassen',
      description: 'Kontingentnutzung manuell erfassen',
      slugPlaceholder: 'Kontingent-Slug (z.B. api_calls)',
      qtyPlaceholder: 'Menge',
      recording: 'Wird erfasst…',
      record: 'Erfassen',
      success: '{qty} Einheit(en) für „{slug}" erfasst.',
      failed: 'Nutzung konnte nicht erfasst werden.',
    },
    logs: {
      title: 'Nutzungsprotokoll',
      description: 'Aktuelle Nutzungseinträge',
      loading: 'Protokolle werden geladen…',
      empty:
        'Noch keine Nutzungseinträge. Erfassen Sie unten Nutzung, um Einträge zu sehen.',
      table: {
        quota: 'Kontingent',
        quantity: 'Menge',
        source: 'Quelle',
        date: 'Datum',
      },
    },
  },
  creditStore: {
    title: 'Credit-Pakete',
    subtitle:
      'Kaufen Sie Credits, um Premium-Funktionen wie KI-Generierung, Exporte und mehr freizuschalten.',
    buy: 'Credits kaufen',
    validFor: 'Gültig für {days} Tage',
    noExpiry: 'Kein Ablaufdatum',
    noPackages: 'Derzeit keine Credit-Pakete verfügbar.',
    error: 'Fehler beim Laden der Credit-Pakete',
  },
  pricing: {
    title: 'Preise',
    subtitle: 'Wählen Sie den Plan, der zu Ihren Bedürfnissen passt',
    billing: 'Abrechnung',
    monthly: 'Monatlich',
    quarterly: 'Vierteljährlich',
    yearly: 'Jährlich',
    perMonth: '/Monat',
    perQuarter: '/Quartal',
    perYear: '/Jahr',
    currency: 'Währung',
    quotas: 'Kontingente',
    limits: 'Limits',
    credits: 'KI-Credits',
    creditsPerPeriod: 'Credits / Zeitraum',
    features: 'Funktionen',
    included: 'Enthalten',
    perUnit: 'danach',
    loading: 'Pläne werden geladen...',
    noPlans: 'Keine Pläne verfügbar',
    error: 'Fehler beim Laden der Preise',
    meta: {
      title: 'Preise',
      description: 'Unsere Pläne und Preise ansehen',
    },
  },
  credits: {
    title: 'Credits',
    description:
      'Verwenden Sie Credits für Premium-Aktionen. Verwalten Sie Pakete in den Arbeitsbereich-Einstellungen.',
    balance: 'Credit-Guthaben',
    creditsAvailable: 'Credits verfügbar',
    manageCredits: 'Credits verwalten',
    buyCredits: 'Credits kaufen',
    choosePlan: 'Plan wählen',
    noCredits:
      'Sie haben keine Credits mehr. Kaufen Sie weitere, um weiterhin Premium-Funktionen zu nutzen.',
    buyMore: 'Credits kaufen',
    packages: {
      title: 'Credit-Pakete',
      loading: 'Pakete werden geladen…',
      error: 'Fehler beim Laden der Pakete.',
      empty: 'Noch keine Credit-Pakete konfiguriert.',
      credits: 'Credits',
      validFor: 'Gültig für {days} Tage',
      buyNow: 'Jetzt kaufen',
    },
    testConsume: {
      title: 'Credit-Verbrauch testen',
      description:
        'Verwenden Sie diese Schaltflächen, um den Credit-Verbrauch aus Ihrem Guthaben zu testen.',
      use: '{amount} verwenden',
      apiDescription: 'Test: {amount} Credits verbrauchen',
      success: '{amount} Credits verbraucht. Guthaben: {balance}',
      insufficient:
        'Nicht genügend Credits. Verfügbar: {available}, Angefordert: {requested}',
    },
    lowCredits: {
      title: 'Wenige Credits',
      description:
        'Ihr Credit-Guthaben ist niedrig. Laden Sie es jetzt auf, um Unterbrechungen zu vermeiden.',
    },
    expiring: {
      title: 'Bald ablaufende Credits',
      description: 'Credits, die in den nächsten 30 Tagen ablaufen',
      expiresIn: 'Läuft ab am {date}',
      noExpiring: 'Keine Credits laufen bald ab',
      days: '{count} Credits',
      loading: 'Wird geladen...',
    },
    transactions: {
      title: 'Transaktionsverlauf',
      description: 'Aktuelle Credit-Hinzufügungen und -Abzüge',
      empty: 'Noch keine Transaktionen',
      loading: 'Wird geladen...',
      columns: {
        type: 'Typ',
        amount: 'Betrag',
        balance: 'Guthaben danach',
        description: 'Beschreibung',
      },
      types: {
        credit: 'Gutschrift',
        debit: 'Abbuchung',
      },
    },
  },
  errors: {
    generic: {
      title: 'Etwas ist schiefgelaufen',
      description:
        'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut oder kontaktieren Sie den Support, wenn das Problem anhält.',
      tryAgain: 'Erneut versuchen',
      goHome: 'Zur Startseite',
    },
    notFound: {
      title: 'Seite nicht gefunden',
      description:
        'Leider konnten wir die gesuchte Seite nicht finden. Sie wurde möglicherweise verschoben oder gelöscht.',
      goBack: 'Zurück',
    },
    blogNotFound: {
      title: 'Beitrag nicht gefunden',
      description:
        'Der gesuchte Blogbeitrag existiert nicht, wurde möglicherweise entfernt oder ist in Ihrer Sprache nicht verfügbar.',
      browseAll: 'Alle Beiträge anzeigen',
    },
  },
  blog: {
    label: 'Blog',
    heading: 'Neueste Beiträge',
    description: 'Updates, Tutorials und Einblicke von unserem Team.',
    noPosts: 'Noch keine Beiträge. Schauen Sie bald wieder vorbei!',
    noPostsTag: 'Noch keine Beiträge mit diesem Tag.',
    noPostsCategory: 'Noch keine Beiträge in dieser Kategorie.',
    noPostsAuthor: 'Noch keine Beiträge von diesem Autor.',
    postsByAuthor: 'Beiträge von {name}',
    postsTaggedCount:
      '{count, plural, one {# Beitrag mit dem Tag „{tag}"} other {# Beiträge mit dem Tag „{tag}"}}',
    postsInCategoryCount:
      '{count, plural, one {# Beitrag in dieser Kategorie} other {# Beiträge in dieser Kategorie}}',
    readMore: 'Mehr lesen',
    read: 'Lesen',
    allPosts: '← Alle Beiträge',
    previous: 'Zurück',
    next: 'Weiter',
    pageOf: 'Seite {page} von {total}',
    relatedPosts: 'Ähnliche Beiträge',
    share: 'Teilen',
    rssLabel: 'RSS-Feed',
    shareAriaX: 'Auf X / Twitter teilen',
    shareAriaLinkedin: 'Auf LinkedIn teilen',
    shareAriaFacebook: 'Auf Facebook teilen',
    shareAriaCopy: 'Link kopieren',
    shareAriaCopied: 'Link kopiert!',
    search: {
      trigger: 'Beiträge suchen...',
      placeholder: 'Blog durchsuchen...',
      searching: 'Suche läuft...',
      noResults: 'Keine Ergebnisse für „{query}"',
      startTyping: 'Tippen Sie, um zu suchen...',
    },
    meta: {
      title: 'Blog',
      titlePage: 'Blog — Seite {page}',
      description: 'Neueste Beiträge, Tutorials und Updates von unserem Team.',
      tagTitle: 'Beiträge mit Tag „{tag}"',
      tagDescription: 'Alle Blog-Beiträge mit dem Tag „{tag}".',
      categoryTitle: '{category} — Blog',
      categoryDescription: 'Blog-Beiträge in der Kategorie „{category}".',
    },
  },
  changelog: {
    label: 'Änderungsprotokoll',
    heading: 'Was ist neu',
    description: 'Alle neuesten Updates, Verbesserungen und Korrekturen.',
    rssLabel: 'RSS-Feed',
    permalink: 'Permalink',
    meta: {
      title: 'Änderungsprotokoll',
      description: 'Alle neuesten Updates, Verbesserungen und Korrekturen.',
    },
  },
  cookieConsent: {
    title: 'Wir verwenden Cookies',
    descriptionBefore:
      'Wir verwenden Cookies, um Ihre Erfahrung zu verbessern, den Datenverkehr zu analysieren und Inhalte zu personalisieren. Sie können wählen, welche Cookies Sie zulassen möchten. Lesen Sie unsere',
    policyLinkPrivacy: 'Datenschutzrichtlinie',
    policyLinkCookie: 'Cookie-Richtlinie',
    dismissAriaLabel: 'Für jetzt schließen',
    necessary: {
      title: 'Notwendig',
      description:
        'Erforderlich für das Funktionieren der Website. Kann nicht deaktiviert werden.',
    },
    analytics: {
      title: 'Analytik',
      description:
        'Hilft uns zu verstehen, wie Besucher unsere Website nutzen.',
    },
    marketing: {
      title: 'Marketing',
      description:
        'Wird verwendet, um relevante Anzeigen zu schalten und Kampagnen zu verfolgen.',
    },
    acceptAll: 'Alle akzeptieren',
    rejectAll: 'Alle ablehnen',
    savePreferences: 'Einstellungen speichern',
    customize: 'Anpassen',
  },
  inbox: {
    title: 'Posteingang',
    description:
      'Alles, was diese App Ihnen geschickt hat, ein Eintrag pro Benachrichtigung, egal auf welchem Weg.',
    rules: {
      live: 'Neue Einträge kommen live über einen Socket, ohne Neuladen.',
      read: 'Ein Eintrag gilt als gelesen, wenn Sie ihn hier öffnen oder seinen Link anklicken. Nur die E-Mail zu öffnen reicht nicht.',
      email:
        'Jeder Eintrag zeigt, was E-Mail und Push getan haben, damit klar ist, warum ein Kanal still blieb.',
    },
  },
  tour: {
    title: 'Die Tour',
    subtitle:
      '{total} Dinge zum Ausprobieren, jedes eine BuildBase-Fähigkeit und woher sie kommt.',
    progress: '{done} von {total} erledigt',
    markDone: 'Als erledigt markieren',
    undo: 'Rückgängig',
    open: 'Öffnen',
    detected: 'Wird automatisch erkannt',
    manual: 'Selbst bestätigen',
    why: 'Warum es zählt',
    steps: 'Was zu tun ist',
    fromSdk: 'Aus dem SDK',
    fromConsole: 'In der Konsole konfiguriert',
    fromApp: 'In dieser App',
    requires: 'Zuerst erledigen',
    allDone: 'Sie haben alles erledigt. Nehmen Sie es mit.',
    homeTitle: 'Alles ausprobieren, eine Aufgabe nach der anderen',
    homeSubtitle:
      'Melden Sie sich an und arbeiten Sie {total} Aufgaben in {groups} Gruppen durch. Jede zeigt eine BuildBase-Fähigkeit, wie sie in einer App aussieht und wo sie konfiguriert wird.',
    homeCta: 'Tour starten',
    dashboardCard: 'Ihre Tour',
    next: 'Als Nächstes',
    dashboardCta: 'Weiter',
  },
  help: {
    title: 'Hilfe-Center',
    description:
      'Alles auf dieser Seite wurde in der Konsole geschrieben: eine Richtlinie, Docs, FAQs und Referenzen. Dort ändern, hier neu laden.',
    notConfigured: {
      title: 'Noch kein Inhalt',
      token:
        'Diese App hat kein Organisations-API-Token und kann daher keine Konsoleninhalte lesen. BUILDBASE_API_TOKEN setzen.',
      empty: 'Die Organisation hat noch keinen Demo-Inhalt. Anlegen mit:',
    },
    from: {
      richContent: 'Rich Content',
      docs: 'Docs',
      faqs: 'FAQ-Sammlung',
      testimonials: 'Referenzen',
    },
    docs: {
      title: 'Dokumentation',
      empty: 'Noch keine veröffentlichten Docs.',
    },
    faq: {
      title: 'Häufige Fragen',
    },
    testimonials: {
      title: 'Was Kunden sagen',
    },
  },
  forms: {
    title: 'Formulare',
    description:
      'Ein in der Konsole gebautes Formular, aus seinem Live-Schema gerendert und über diese App abgeschickt.',
    loading: 'Formular wird geladen…',
    fromConsole:
      'Die Felder kommen aus der Konsole; dort eines hinzufügen und neu laden.',
    submit: 'Senden',
    sending: 'Wird gesendet…',
    sent: 'Gesendet',
    hint: 'Einsendungen werden als Sammlungs-Datensätze gespeichert und lösen das Ereignis form.submitted aus.',
    errors: {
      title: 'Die Plattform hat diese Einsendung abgelehnt',
      generic: 'Etwas wurde nicht akzeptiert.',
    },
    missing: {
      title: 'Noch kein Kontaktformular',
      token:
        'Diese App hat kein Organisations-API-Token. BUILDBASE_API_TOKEN setzen.',
      form: 'Die Organisation hat kein Formular namens Contact. Anlegen mit:',
    },
    toast: {
      sent: 'Abgeschickt. Jetzt ein Datensatz auf der Plattform.',
    },
    submissions: {
      title: 'Letzte Einsendungen',
      description: 'Aus der Sammlung des Formulars gelesen.',
      refresh: 'Aktualisieren',
      empty: 'Noch nichts eingesendet.',
    },
  },
  collections: {
    title: 'Sammlungen',
    description:
      'Eigene Daten auf der Plattform: ein versioniertes Schema, Datensätze gegen die Live-Version.',
    loading: 'Datensätze werden geladen…',
    liveVersion: 'Live-Version {version} ({name}), {fields} Felder',
    noLiveVersion: 'Keine Live-Version. In der Konsole eine veröffentlichen.',
    refresh: 'Aktualisieren',
    empty: 'Keine Datensätze. Anlegen oder in der Konsole hinzufügen.',
    actions: 'Aktionen',
    delete: 'Datensatz löschen',
    hint: 'In der Konsole eine neue Version mit einem zusätzlichen Feld veröffentlichen; die Spalte erscheint hier beim Neuladen.',
    missing: {
      title: 'Noch keine release-notes-Sammlung',
      token:
        'Diese App hat kein Organisations-API-Token. BUILDBASE_API_TOKEN setzen.',
      collection:
        'Die Organisation hat keine Sammlung mit dem Slug release-notes. Anlegen mit:',
    },
    toast: {
      deleted: 'Datensatz auf der Plattform gelöscht.',
      deleteFailed: 'Datensatz konnte nicht gelöscht werden.',
    },
  },
  tracking: {
    title: 'Tracking',
    description:
      'Analyse- und Werbe-Tags aus der Konsole, geladen nach Einwilligung, mit eigenen Ereignissen und Attribution.',
    loading: 'Lädt…',
    consent: {
      title: 'Einwilligung',
      description:
        'Aus den Tags dieser App gebildet, nie aus der gesamten Bibliothek.',
      noTags:
        'Dieser App ist noch kein Tag zugeordnet. Legen Sie in der Konsole unter Einstellungen → Tracking eines an und ordnen Sie es dem Client zu.',
      privacy: 'Datenschutz',
      analytics: 'Analyse',
      marketing: 'Marketing',
      acceptAll: 'Alle akzeptieren',
      analyticsOnly: 'Nur Analyse',
      denyAll: 'Alle ablehnen',
      state: 'Aktueller Stand',
      unset: 'noch nicht gefragt',
    },
    installed: {
      title: 'Installierte Anbieter',
      description:
        'Was in diesem Browser nach der Einwilligung tatsächlich geladen wurde.',
      none: 'Nichts geladen. Willigen Sie ein oder ordnen Sie in der Konsole ein Tag zu.',
    },
    custom: {
      title: 'Eigenes Ereignis senden',
      description:
        'Eigene Ereignisse gehen an den Data Layer und jeden installierten Anbieter.',
      button: 'report_exported senden',
      fired: '{count} Mal gesendet',
    },
    attribution: {
      title: 'Attribution',
      description:
        'Woher dieser Besucher kam: Klick-IDs und Kampagnenparameter, auf der ersten Seite erfasst.',
      empty: 'Nichts erfasst. Neu laden mit',
    },
    log: {
      title: 'Live-Ereignisprotokoll',
      description:
        'Jedes Ereignis, das das SDK in diesem Tab gesendet hat, auch die eigenen.',
      empty:
        'Noch keine Ereignisse. Navigieren Sie, oder senden Sie oben eines.',
    },
  },
  automations: {
    title: 'Automatisierungen',
    description:
      'Workflows werden in der Konsole gebaut; diese App löst die Ereignisse aus, auf die sie hören, und liest, was für Sie gelaufen ist.',
    refresh: 'Aktualisieren',
    loading: 'Lädt…',
    notConfigured:
      'BUILDBASE_API_TOKEN ist nicht gesetzt, daher kann diese App keine Workflow-Läufe lesen.',
    error: 'Läufe konnten nicht geladen werden',
    runs: {
      title: 'Ihre Läufe',
      description:
        'Workflow-Instanzen, die die Plattform für Ihr Konto gestartet hat.',
      empty:
        'Noch keine Läufe. Senden Sie das Kontaktformular oder registrieren Sie einen neuen Nutzer, dann aktualisieren.',
      workflow: 'Workflow',
      event: 'Ereignis',
      status: 'Status',
      nodes: 'Knoten fertig',
      started: 'Gestartet',
    },
    calls: {
      title: 'Aufrufe in diese App',
      description:
        'Was die HTTP-Webhook-Aktion eines Workflows an /api/buildbase/provision gesendet hat, per gemeinsamem Geheimnis geprüft.',
      empty: 'Noch keine Provisionierungsaufrufe empfangen.',
    },
  },
  reports: {
    title: 'Berichte',
    description:
      'Jedes Modul berichtet über dieselben Chart- und Zähl-Endpunkte; drei davon, für die letzten dreißig Tage.',
    notConfigured:
      'BUILDBASE_API_TOKEN ist nicht gesetzt, daher kann diese App keine Berichte lesen.',
    loading: 'Lädt…',
    refresh: 'Aktualisieren',
    window: '{from} bis {to}',
    unavailable: 'Nicht verfügbar',
    series: {
      users: {
        title: 'Registrierungen',
        description: 'Neue Nutzer pro Tag.',
      },
      forms: {
        title: 'Formulareingänge',
        description: 'Eingänge des Kontaktformulars pro Tag.',
      },
      links: {
        title: 'Link-Klicks',
        description: 'Klicks auf Kurzlinks pro Tag.',
      },
    },
  },
  assets: {
    title: 'Dateien',
    description:
      'Über diese App hochgeladene Dateien, gespeichert und ausgeliefert von der Plattform.',
    upload: 'Datei hochladen',
    uploading: 'Wird hochgeladen…',
    limit: 'Bis 5 MB. Bilder zeigen eine Vorschau.',
    uploaded: 'Hochgeladen',
    gallery: 'Dateien',
    empty: 'Noch keine Dateien. Laden Sie oben eine hoch.',
    public: 'Öffentlich',
    private: 'Privat',
    makePrivate: 'Privat machen',
    makePublic: 'Öffentlich machen',
    nowPublic: 'Jetzt öffentlich: Die URL funktioniert wieder.',
    nowPrivate: 'Jetzt privat: Die öffentliche URL funktioniert nicht mehr.',
    openUrl: 'Öffnen',
    tooLarge: 'Diese Datei ist größer als 5 MB.',
    loadFailed: 'Die Plattform war nicht erreichbar.',
    notConfigured:
      'Diese Seite liest die Organisation über ein API-Token. Setzen Sie BUILDBASE_API_TOKEN (Konsole → Settings → Tokens) und starten Sie neu.',
  },
  links: {
    title: 'Kurzlinks',
    description:
      'Teil-Links, die die Plattform weiterleitet und zählt, Klick für Klick.',
    create: 'Kurzlink erstellen',
    createHint:
      'Beliebige URL. Die Plattform vergibt eine 12-stellige ID und protokolliert jeden Klick mit Land und Gerät.',
    name: 'Name',
    url: 'Ziel-URL',
    createButton: 'Erstellen',
    created: 'Link erstellt',
    yourLinks: 'Ihre Links',
    clicksHint:
      'Folgen Sie einem Link und aktualisieren Sie: Die Zahl kommt von der Plattform, nicht von dieser Seite.',
    refresh: 'Aktualisieren',
    empty: 'Noch keine Links.',
    clicks: 'Klicks',
    copy: 'Kurz-URL kopieren',
    copied: 'Kopiert',
    follow: 'Folgen',
    changeDestination: 'Ziel ändern',
    save: 'Speichern',
    cancel: 'Abbrechen',
    updated: 'Ziel geändert. Die Kurz-URL bleibt gleich.',
    chart: 'Klicks, letzte 14 Tage',
    chartHint: 'Alle Links zusammen, pro Tag.',
    chartEmpty: 'Noch keine Klicks.',
    loadFailed: 'Die Plattform war nicht erreichbar.',
    notConfigured:
      'Diese Seite liest die Organisation über ein API-Token. Setzen Sie BUILDBASE_API_TOKEN (Konsole → Settings → Tokens) und starten Sie neu.',
  },
  audience: {
    title: 'Zielgruppe und Attribute',
    description:
      'Was die Plattform über eine Person jenseits des Kontos führt: eigene Attribute, ein Marketingkontakt und eine Warteliste.',
    failed: 'Speichern fehlgeschlagen.',
    notConfigured: 'Der Newsletter braucht BUILDBASE_API_TOKEN auf dem Server.',
    onboarding: {
      title: 'Onboarding-Checkliste',
      description:
        'Alle drei abhaken und speichern: Das SDK schreibt onboarded=true und Ihre Funktion als Nutzerattribute, in Ihrem Browser, als Sie.',
      items: {
        profile: 'Ich habe mein Profil ausgefüllt',
        workspace: 'Ich habe einen Workspace erstellt',
        invite: 'Ich habe jemanden eingeladen',
      },
      role: 'Ihre Funktion (optional)',
      save: 'Onboarding abschließen',
      saved: 'Gespeichert. Öffnen Sie Ihren Datensatz in der Konsole.',
      already: 'Laut Ihren Attributen bereits abgeschlossen.',
    },
    attributes: {
      title: 'Ihre Attribute',
      description:
        'Schlüssel werden in der Konsole definiert (Users → Attributes); Werte liegen an Ihrem Nutzer.',
      empty: 'Noch keine Attribute.',
    },
    locale: {
      title: 'Land, Zeitzone, Währung',
      description:
        'Die Listen kommen mit dem SDK (@buildbase/sdk/data), ohne Download.',
      country: 'Land',
      timezone: 'Zeitzone',
      currency: 'Währung',
      save: 'Einstellungen speichern',
      saved: 'Einstellungen als Attribute gespeichert.',
    },
    newsletter: {
      title: 'Newsletter',
      description:
        'Ein Marketingkontakt ist vom Konto getrennt: Er kann auch ohne eines existieren. Der Server legt ihn mit dem Org-Token an und fügt ihn der Newsletter-Liste hinzu.',
      email: 'E-Mail',
      subscribe: 'Abonnieren',
      subscribed: 'Abonniert',
      listed: 'Zur Liste {list} hinzugefügt.',
      noList:
        'Kontakt angelegt; diese Organisation hat noch keine Newsletter-Liste.',
      waitlistHint:
        'Nicht angemeldete Besucher können der Beta-Warteliste beitreten unter',
    },
  },
  waitlist: {
    title: 'Auf die Warteliste',
    description:
      'Das Beta-Formular der Plattform: Name und E-Mail hinterlassen, ein Admin schaltet Sie in der Konsole frei.',
    success:
      'Sie stehen auf der Liste. Ein Admin schaltet Sie aus der Konsole frei.',
    note: 'Formular und Texte kommen aus der Beta-Konfiguration der Organisation (Konsole → Users → Beta).',
  },
};

export default messages;
