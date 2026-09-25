import type { TourText } from './types';

/** Der Text der Tour, Deutsch. */
export const de: TourText = {
  groups: {
    start: {
      title: 'Erste Schritte',
      summary: 'Registrieren, anmelden und sehen, was eine Sitzung ist.',
    },
    workspaces: {
      title: 'Workspaces',
      summary:
        'Jeder Kunde Ihrer App bekommt einen Workspace. Anlegen, wechseln, umbenennen, löschen.',
    },
    team: {
      title: 'Team',
      summary: 'Einladung per E-Mail, Rollen, Sitze, und was jede Rolle darf.',
    },
    billing: {
      title: 'Pläne und Abrechnung',
      summary:
        'Testphasen, Pläne, Checkout, Rechnungen und das Abrechnungsportal, alles aus der Konsole.',
    },
    usage: {
      title: 'Nutzung und Kontingente',
      summary:
        'Messen Sie, was Ihre App tut, und lassen Sie den Plan die Grenze setzen.',
    },
    credits: {
      title: 'Credits',
      summary:
        'Ein vorausbezahltes Guthaben, das Ihre App ausgibt, und Pakete, die Leute kaufen.',
    },
    features: {
      title: 'Feature-Flags',
      summary:
        'Eine Funktion für einen Workspace oder einen Nutzer einschalten, ohne Deployment.',
    },
    permissions: {
      title: 'Berechtigungen',
      summary: 'Rollen pro Workspace, geprüft vom SDK und vom Server.',
    },
    notifications: {
      title: 'Benachrichtigungen',
      summary:
        'E-Mail, Push und ein Posteingang, zu dem jeder Nutzer zurückkehren kann.',
    },
    push: {
      title: 'Push',
      summary: 'Browser-Push, abonniert und zugestellt von der Plattform.',
    },
    agents: {
      title: 'Agenten und MCP',
      summary:
        'Verbinden Sie Claude oder einen beliebigen MCP-Client als Sie selbst mit dieser App.',
    },
    webhooks: {
      title: 'Webhooks',
      summary:
        'Plattform-Ereignisse, gespiegelt in die eigene Datenbank dieser App.',
    },
    platform: {
      title: 'Plattform',
      summary:
        'Sprachen, Themes, Ihre Daten, und wie Sie dieses Repository mitnehmen.',
    },
    content: {
      title: 'Inhalte',
      summary:
        'Docs, FAQs und Texte, in der Konsole geschrieben und von dieser App gelesen.',
    },
    forms: {
      title: 'Formulare',
      summary:
        'Ein in der Konsole gebautes Formular, hier angezeigt und abgeschickt.',
    },
    collections: {
      title: 'Sammlungen',
      summary:
        'Eigene Daten mit versionierten Schemas, auf der Plattform gespeichert.',
    },
    assets: {
      title: 'Dateien',
      summary:
        'Über die App hochgeladene Dateien, von der Plattform gespeichert und ausgeliefert.',
    },
    links: {
      title: 'Kurzlinks',
      summary: 'Links zum Teilen, die jeden Klick zählen.',
    },
    audience: {
      title: 'Zielgruppe und Attribute',
      summary:
        'Eigene Attribute an einem Nutzer, eine Warteliste und eine Marketing-Zielgruppe.',
    },
    tracking: {
      title: 'Tracking',
      summary: 'Analyse-Tags mit Einwilligung, eigenen Events und Attribution.',
    },
    workflows: {
      title: 'Workflows',
      summary:
        'In der Konsole gebaute Automatisierungen, gestartet durch das, was Sie hier tun.',
    },
    reports: {
      title: 'Berichte',
      summary:
        'Jedes Modul liefert Berichte; diese App zeigt einige davon als Diagramm.',
    },
  },
  tasks: {
    'sign-up': {
      title: 'Konto anlegen',
      why: 'Registrierung, E-Mail-Bestätigung und Sitzung gehören der Plattform und laufen auf ihren Seiten. Diese App enthält keinen Auth-Code.',
      steps: [
        'Klicken Sie auf der Startseite auf Anmelden.',
        'Registrieren Sie sich mit Ihrer E-Mail und dem Code, den Sie erhalten.',
        'Sie landen wieder hier, angemeldet.',
      ],
    },
    'trust-device': {
      title: 'Diesem Gerät vertrauen',
      why: 'Ein vertrauenswürdiges Gerät bleibt 90 Tage angemeldet und überspringt zusätzliche Prüfungen. Jedes Gerät und jede Sitzung wird aufgelistet und kann abgemeldet werden.',
      steps: [
        'Wählen Sie bei der Anmeldung Diesem Gerät vertrauen.',
        'Öffnen Sie Profil → Geräte und Sitzungen, um es in der Liste zu sehen.',
      ],
    },
    'add-passkey': {
      title: 'Passkey hinzufügen',
      why: 'Passwortlose Anmeldung per Fingerabdruck, Gesicht oder Geräte-PIN. Pro Organisation in der Konsole aktiviert; nichts zu bauen.',
      steps: [
        'Öffnen Sie Profil → Sicherheit.',
        'Fügen Sie einen Passkey hinzu und folgen Sie der Aufforderung Ihres Browsers.',
        'Melden Sie sich ab und damit wieder an.',
      ],
    },
    'see-session': {
      title: 'Sehen, wie die Sitzung Ihren Server erreicht',
      why: 'Das SDK hält eine Sitzungs-ID; diese App bewahrt sie in einem httpOnly-Cookie auf, und ihre API-Routen rufen BuildBase damit auf. Ihr Server verarbeitet nie ein Passwort.',
      steps: [
        'Öffnen Sie Profil.',
        'Lesen Sie das Panel „So funktioniert es“: das Cookie, der Server-Client, und welcher Aufruf das Profil geliefert hat.',
      ],
    },
    'sign-out-everywhere': {
      title: 'Überall abmelden',
      why: 'Beendet jede Sitzung auf jedem Gerät auf der Plattform, nicht nur im Browser, in dem Sie gerade sind.',
      steps: [
        'Öffnen Sie Profil → Geräte und Sitzungen.',
        'Melden Sie eine andere Sitzung ab, oder nutzen Sie Überall abmelden.',
      ],
    },
    'first-workspace': {
      title: 'Ihren ersten Workspace bemerken',
      why: 'Ein Workspace ist der Tenant: jeder Plan, jedes Kontingent, jedes Credit-Guthaben und jedes Mitglied gehört zu einem. Die Plattform hat Ihren ersten bei der Registrierung angelegt.',
      steps: [
        'Sehen Sie sich den Workspace-Namen in der Seitenleiste an.',
        'Öffnen Sie den Umschalter, um ihn in der Liste zu sehen.',
      ],
    },
    'create-workspace': {
      title: 'Einen zweiten Workspace anlegen',
      why: 'Eine Person kann zu mehreren Tenants gehören. Jeder hat seine eigene Abrechnung.',
      steps: [
        'Öffnen Sie den Workspace-Umschalter.',
        'Wählen Sie Workspace anlegen und geben Sie ihm einen Namen.',
      ],
    },
    'switch-workspace': {
      title: 'Zwischen ihnen wechseln',
      why: 'Der Wechsel tauscht jeden Kontext auf einmal: Abonnement, Nutzung, Credits, Mitglieder, Funktionen.',
      steps: [
        'Öffnen Sie den Umschalter und wählen Sie den anderen Workspace.',
        'Beobachten Sie, wie sich die Karten im Dashboard ändern.',
      ],
    },
    'rename-workspace': {
      title: 'Einen Workspace umbenennen',
      why: 'Der eingebaute Einstellungsbildschirm übernimmt die allgemeinen Einstellungen; Sie entscheiden, welche Abschnitte erscheinen.',
      steps: [
        'Öffnen Sie Einstellungen → Allgemein.',
        'Ändern Sie den Namen und speichern Sie.',
      ],
    },
    'workspace-settings-screens': {
      title: 'Jeden eingebauten Einstellungsbildschirm öffnen',
      why: 'Konto, Sicherheit, Geräte, Verbundene Agenten, Allgemein, Mitglieder, Plan und Abrechnung, Nutzung, Credits, Funktionen, Benachrichtigungen, Gefahrenzone: alles mitgeliefert, alles abschaltbar.',
      steps: [
        'Öffnen Sie Einstellungen.',
        'Klicken Sie sich durch die Abschnitte der Seitenleiste.',
      ],
    },
    'delete-workspace': {
      title: 'Den zweiten Workspace löschen',
      why: 'Die Gefahrenzone wird nur angeboten, wenn die Einstellungen einer Person erlauben, mehr als einen zu besitzen.',
      steps: [
        'Wechseln Sie zum zweiten Workspace.',
        'Einstellungen → Gefahrenzone → Löschen.',
      ],
    },
    'invite-member': {
      title: 'Jemanden per E-Mail einladen',
      why: 'Die Adresse braucht kein Konto. Die Person bekommt eine E-Mail, folgt dem Link, registriert sich oder meldet sich an und nimmt an. Eine ausstehende Einladung belegt einen Sitz.',
      steps: [
        'Öffnen Sie Team.',
        'Geben Sie eine E-Mail-Adresse ein, die Sie lesen können, und eine Rolle, und senden Sie.',
      ],
    },
    'pending-seat': {
      title: 'Sehen, wie die ausstehende Einladung einen Sitz belegt',
      why: 'Sitze werden abgerechnet, solange eine Einladung aussteht, damit die Sitzzahl unter Team und im Plan übereinstimmen.',
      steps: [
        'Lesen Sie unter Team die Sitzkarten und den Hinweis unter dem Einladungsformular: die ausstehende Zeile wird mitgezählt.',
      ],
    },
    'accept-invitation': {
      title: 'Eine Einladung annehmen',
      why: 'Über den Link in der E-Mail, oder über die Liste der ausstehenden Einladungen in der App. Wer über den Link kommt, beweist die Adresse, also keine separate Bestätigung.',
      steps: [
        'Öffnen Sie die Einladungs-E-Mail im anderen Postfach und folgen Sie dem Link.',
        'Registrieren Sie sich oder melden Sie sich an. Das Einladungsbanner oben auf jeder Dashboard-Seite hat Annehmen.',
      ],
    },
    'change-role': {
      title: 'Die Rolle eines Mitglieds ändern',
      why: 'Rollen gelten pro Workspace und werden in der Konsole definiert. Das Mitglied erfährt es per E-Mail und im Posteingang.',
      steps: [
        'Wählen Sie unter Team neben einem Mitglied, das nicht der Eigentümer ist, eine andere Rolle.',
      ],
    },
    'viewer-limits': {
      title: 'Sehen, was ein Betrachter nicht darf',
      why: 'Das SDK blendet aus, was eine Rolle nicht darf, und der Server lehnt es ohnehin ab.',
      steps: [
        'Melden Sie sich als Betrachter an.',
        'Öffnen Sie Berechtigungen und Dokumente: die Aktionen, die dem Betrachter fehlen, sind nicht da oder deaktiviert.',
      ],
    },
    'revoke-invitation': {
      title: 'Eine ausstehende Einladung zurückziehen',
      why: 'Der Link funktioniert nicht mehr und der Sitz wird frei.',
      steps: [
        'Laden Sie eine weitere Adresse ein und ziehen Sie die Einladung aus der Liste der ausstehenden zurück.',
      ],
    },
    'seat-limit': {
      title: 'Das Sitzlimit erreichen',
      why: 'Der Plan legt die Sitze fest. Am Limit weicht das Einladungsformular der Limit-Meldung, und der Server antwortet mit 402.',
      steps: [
        'Laden Sie ein, bis das Formular meldet, dass das Limit erreicht ist.',
      ],
    },
    'see-trial': {
      title: 'Ihre Testphase sehen',
      why: 'Ein neuer Workspace beginnt mit der Testphase, die der Plan definiert. Das Dashboard zeigt, wie lange sie noch läuft.',
      steps: ['Öffnen Sie das Dashboard und lesen Sie die Testphasen-Karte.'],
    },
    'compare-plans': {
      title: 'Die Pläne vergleichen',
      why: 'Die Preisseite wird aus den Plänen in der Konsole erzeugt: Namen, Preise pro Intervall, Kontingente, Limits und Funktionen. Ändern Sie dort einen Preis, ändert er sich hier.',
      steps: [
        'Öffnen Sie Preise.',
        'Wechseln Sie Abrechnungsintervall und Währung.',
      ],
    },
    subscribe: {
      title: 'Mit einer Testkarte abonnieren',
      why: 'Der Checkout ist der von Stripe, von der Plattform für Ihren Workspace erstellt. Verwenden Sie die Karte 4242 4242 4242 4242.',
      steps: [
        'Wählen Sie unter Preise einen Plan.',
        'Zahlen Sie mit der Testkarte.',
        'Sie kehren zum Dashboard zurück, auf dem Plan.',
      ],
    },
    'trial-banner-gone': {
      title: 'Zusehen, wie das Testphasen-Banner verschwindet',
      why: 'Gates rendern aus dem Abonnement-Kontext neu, sobald er sich ändert.',
      steps: [
        'Zurück im Dashboard ist die Testphasen-Karte weg und die Plan-Karte zeigt den Plan.',
      ],
    },
    'view-invoice': {
      title: 'Eine Rechnung ansehen',
      why: 'Rechnungen kommen von Stripe über die Plattform, mit gehostetem PDF.',
      steps: ['Öffnen Sie Rechnungen und dann die neueste.'],
    },
    'billing-portal': {
      title: 'Das Abrechnungsportal öffnen',
      why: 'Kartenwechsel, Belege und Kündigung im Stripe-Portal, geöffnet für den Workspace.',
      steps: [
        'Wählen Sie auf der Plan-Karte im Dashboard Abrechnung verwalten.',
      ],
    },
    upgrade: {
      title: 'Auf den nächsten Plan upgraden',
      why: 'Anteilig verrechnet durch Stripe; Kontingente und Funktionen ändern sich mit dem Plan.',
      steps: ['Wählen Sie unter Preise den höheren Plan.'],
    },
    'cancel-resume': {
      title: 'Kündigen, dann fortsetzen',
      why: 'Die Kündigung läuft bis zum Periodenende und kann bis dahin rückgängig gemacht werden.',
      steps: [
        'Kündigen Sie über die Plan-Karte.',
        'Setzen Sie an derselben Stelle fort.',
      ],
    },
    'seat-price': {
      title: 'Sehen, wie sich der Sitzpreis ändert, wenn ein Mitglied beitritt',
      why: 'Pläne pro Sitz berechnen Mitglieder und ausstehende Einladungen. Das SDK berechnet dieselbe Zahl, die die Plattform abrechnet.',
      steps: [
        'Laden Sie unter Team jemanden ein; lesen Sie die Sitzzeile und die Plan-Karte.',
      ],
    },
    'record-usage': {
      title: 'Nutzung erfassen',
      why: 'Ihre App misst, was sie tut (ein erstelltes Dokument, ein verarbeitetes Video); der Plan sagt, wie viel enthalten ist.',
      steps: [
        'Öffnen Sie Dokumente und erstellen Sie eines.',
        'Lesen Sie die Zeile „Was die Plattform erfasst hat“ unter dem Formular.',
        'Öffnen Sie Nutzung: das Dokumente-Kontingent hat sich bewegt.',
      ],
    },
    'usage-threshold': {
      title: 'Die Warnschwelle überschreiten',
      why: 'Ein Gate erscheint bei 80 %, damit Sie vor dem Limit einen Hinweis geben können.',
      steps: [
        'Erstellen Sie Dokumente, bis der Hinweis über der Liste erscheint.',
      ],
    },
    'usage-limit': {
      title: 'Das Limit erreichen',
      why: 'Bei der enthaltenen Menge antwortet der Server mit 402 und der Erstellen-Button sperrt sich, außer der Plan erlaubt Mehrverbrauch. Oberfläche und Server lesen dasselbe Kontingent.',
      steps: [
        'Erstellen Sie weiter, bis der Button sperrt und ein Erstellen abgelehnt wird.',
      ],
    },
    'usage-log': {
      title: 'Das Nutzungsprotokoll lesen',
      why: 'Jede erfasste Einheit ist eine Zeile, pro Workspace und pro Kontingent.',
      steps: ['Öffnen Sie unter Nutzung das Protokoll.'],
    },
    'see-balance': {
      title: 'Ihr Credit-Guthaben sehen',
      why: 'Ein vorausbezahltes Guthaben pro Workspace, vom Plan gewährt oder in Paketen gekauft.',
      steps: ['Öffnen Sie Credits.'],
    },
    'spend-credits': {
      title: 'Credits für eine Aktion ausgeben',
      why: 'Ihr Server verbraucht; das Guthaben aktualisiert sich in jedem offenen Tab.',
      steps: [
        'Erstellen Sie unter Dokumente eines: das kostet einen Credit.',
        'Beobachten Sie, wie sich das Guthaben in der Seitenleiste und die Messzeile ändern.',
      ],
    },
    'credits-low': {
      title: 'Knapp werden',
      why: 'Ein Gate an einer Schwelle, damit Sie ein Aufladen anbieten können, bevor es aufgebraucht ist.',
      steps: [
        'Erstellen Sie weiter Dokumente, bis der Hinweis auf niedriges Guthaben über der Liste erscheint.',
      ],
    },
    'buy-credits': {
      title: 'Ein Paket kaufen',
      why: 'Pakete werden in der Konsole definiert; der Checkout ist der von Stripe.',
      steps: [
        'Kaufen Sie unter Credits das 100-Credit-Paket mit der Testkarte.',
      ],
    },
    'credit-transactions': {
      title: 'Die Transaktionen lesen',
      why: 'Jede Gutschrift, jeder Kauf und jede Ausgabe ist eine Zeile, mit dem Topf, aus dem sie stammt.',
      steps: ['Scrollen Sie unter Credits zu Transaktionen.'],
    },
    'feature-off': {
      title: 'Eine ausgeschaltete Funktion sehen',
      why: 'Dokumente hat drei Abschnitte hinter Workspace-Flags: Exporte, Freigabe, E-Signaturen. Ausgeschaltet zeigt sich ein gesperrter Zustand, kein kaputter Button.',
      steps: [
        'Öffnen Sie Dokumente und scrollen Sie zu Feature-Gates.',
        'Finden Sie einen Abschnitt, der als Deaktiviert markiert ist.',
      ],
    },
    'feature-on': {
      title: 'Sie eingeschaltet sehen',
      why: 'Flags ändern sich aus der Konsole, ohne Deployment. Ein Plan kann sie gewähren, und ein Workspace kann von Hand überschrieben werden.',
      steps: [
        'Upgraden Sie auf einen Plan, der eine Funktion enthält, oder bitten Sie uns, eine für Ihren Workspace einzuschalten.',
        'Laden Sie Dokumente neu: der Abschnitt wird freigeschaltet.',
      ],
    },
    'user-feature': {
      title: 'Ein Flag an einer Person, nicht an einem Workspace',
      why: 'Nutzer-Funktionen folgen der Person über Workspaces hinweg; Workspace-Funktionen folgen dem Tenant.',
      steps: [
        'Öffnen Sie Profil: die dort gelisteten Funktionen sind Ihre, nicht die des Workspace.',
      ],
    },
    'permission-matrix': {
      title: 'Ihre Berechtigungsmatrix lesen',
      why: 'Was Ihre Rolle in diesem Workspace erlaubt, aufgelöst von der Plattform.',
      steps: ['Öffnen Sie Berechtigungen.'],
    },
    'forbidden-action': {
      title: 'Eine verbotene Aktion versuchen',
      why: 'Die Buttons sind für einen Betrachter deaktiviert; rufen Sie die API trotzdem auf, antwortet der Server mit 403. Beide lesen die Rolle, die die Plattform für Sie in diesem Workspace hält.',
      steps: [
        'Öffnen Sie als Betrachter Dokumente: Erstellen und Löschen sind deaktiviert.',
        'Senden Sie die Anfrage trotzdem, aus einem Terminal oder über die MCP-Tools: 403.',
      ],
    },
    'custom-role': {
      title: 'Eine eigene Rolle sehen',
      why: 'Rollen und ihre Berechtigungen werden pro Organisation in der Konsole definiert.',
      steps: [
        'Lesen Sie die Rollen unter Berechtigungen: diese Demo definiert admin, editor und viewer.',
      ],
    },
    'inbox-first-item': {
      title: 'Ihre erste Benachrichtigung finden',
      why: 'Alles, was die App Ihnen schickt, landet in einem Posteingang, zu dem Sie zurückkehren können: ein Eintrag pro Benachrichtigung, egal wie sie zugestellt wurde.',
      steps: [
        'Klicken Sie auf die Glocke im Kopfbereich, oder öffnen Sie Posteingang in der Seitenleiste.',
        'Alles, was die App Ihnen geschickt hat, ist dort; das Öffnen des Panels markiert als gesehen, nicht als gelesen.',
      ],
    },
    'send-notification': {
      title: 'Eine Benachrichtigung aus der App senden',
      why: 'Ein Aufruf sendet per E-Mail und Push; das Gate der Plattform entscheidet, welche Kanäle auslösen.',
      steps: [
        'Öffnen Sie Benachrichtigungen. Das Formular ist mit dem Ereignis „Comment added“ vorausgefüllt.',
        'Senden Sie es an sich selbst und sehen Sie dann auf die Glocke.',
      ],
    },
    'inbox-live': {
      title: 'Zusehen, wie sie live ankommt',
      why: 'Offene Posteingänge werden über einen Socket informiert und laden nach; kein Neuladen.',
      steps: [
        'Halten Sie den Posteingang in einem Tab offen und senden Sie aus einem anderen.',
      ],
    },
    'open-from-email': {
      title: 'Sie aus der E-Mail öffnen',
      why: 'Ein Klick auf den E-Mail-Link markiert den Eintrag im Posteingang als gelesen; das bloße Öffnen der E-Mail nicht.',
      steps: [
        'Öffnen Sie die erhaltene E-Mail und folgen Sie ihrem Link.',
        'Der Eintrag im Posteingang ist gelesen, „per E-Mail-Klick“.',
      ],
    },
    'mark-all-read': {
      title: 'Alle als gelesen markieren, einen archivieren',
      why: 'Gelesen, gesehen und archiviert sind getrennte Zustände, pro Person gespeichert.',
      steps: [
        'Archivieren Sie im Posteingang einen Eintrag und markieren Sie den Rest als gelesen.',
      ],
    },
    'notification-preferences': {
      title: 'Einen Kanal für sich selbst abschalten',
      why: 'Jedes Mitglied wählt, wie es unterbrochen wird; der Workspace-Admin setzt die Standardwerte und kann ein Ereignis als erforderlich markieren.',
      steps: [
        'Einstellungen → Benachrichtigungen.',
        'Schalten Sie E-Mail für „Comment added“ ab; senden Sie erneut und sehen Sie es nur im Posteingang ankommen.',
      ],
    },
    'required-event': {
      title: 'Ein erforderliches Ereignis sehen',
      why: 'Ein Admin kann ein Ereignis erforderlich machen; Mitglieder können es nicht abschalten.',
      steps: [
        'Einstellungen → Benachrichtigungen: „Weekly report“ ist gesperrt.',
      ],
    },
    'delivery-log': {
      title: 'Das Zustellprotokoll der Konsole sehen',
      why: 'Jede Benachrichtigung, die jeder Nutzer bekommen hat, mit dem, was E-Mail und Push getan haben, und ob sie gelesen wurde.',
      steps: [
        'Sehen Sie sich den Screenshot zu dieser Aufgabe an; das Protokoll ist in der Konsole, nicht in der App.',
      ],
    },
    'push-subscribe': {
      title: 'Diesen Browser für Push anmelden',
      why: 'Web-Push mit den VAPID-Schlüsseln der Plattform und einem Service Worker, den das SDK mitliefert.',
      steps: [
        'Öffnen Sie Benachrichtigungen und aktivieren Sie Push.',
        'Erlauben Sie die Browser-Anfrage.',
      ],
    },
    'push-receive': {
      title: 'Einen Push empfangen',
      why: 'Pro Gerät gesendet, vom Browser zugestellt, auch wenn der Tab geschlossen ist.',
      steps: [
        'Senden Sie sich das Ereignis „Comment added“ mit eingeschaltetem Push.',
      ],
    },
    'push-click': {
      title: 'Darauf klicken',
      why: 'Der Klick läuft durch die Link-Prüfung der Plattform und markiert den Eintrag im Posteingang als gelesen.',
      steps: ['Klicken Sie auf die Push-Benachrichtigung.'],
    },
    'mcp-config': {
      title: 'Ihren MCP-Client einrichten',
      why: 'Diese App ist ein MCP-Server. Jeder MCP-Client meldet sich mit Ihrem BuildBase-Konto an und handelt als Sie.',
      steps: [
        'Öffnen Sie Profil → Verbundene Agenten.',
        'Wählen Sie Ihren Client in der Anleitung und folgen Sie den Schritten: die Serveradresse ist das /api/mcp dieser App.',
      ],
    },
    'mcp-connect': {
      title: 'Einen Agenten verbinden',
      why: 'Der Client findet den OAuth-Server über /.well-known, meldet Sie auf den gehosteten Seiten an und erhält ein Token, das diese App mit ihrem eigenen Geheimnis ausgestellt hat.',
      steps: ['Starten Sie den Client neu und genehmigen Sie die Verbindung.'],
    },
    'mcp-call': {
      title: 'Ihn bitten, Ihre Dokumente aufzulisten',
      why: 'Eingebaute Tools lesen Ihr Konto; die eigenen Tools der App lesen und schreiben ihre Daten, unter Ihren Berechtigungen.',
      steps: [
        'Fragen Sie: „List my documents in BuildBase Demo“.',
        'Der Agent ruft list_documents auf; die Tour hakt ab, sobald ein Tool als Sie läuft.',
      ],
    },
    'mcp-write': {
      title: 'Ihn bitten, eines zu erstellen',
      why: 'Ein Schreibvorgang über einen Agenten wird gemessen und auf Berechtigungen geprüft, genau wie ein Klick.',
      steps: [
        'Fragen Sie: „Create a document called Agent test“.',
        'Das braucht den Scope documents:write, den Sie auf dem Zustimmungsbildschirm gewährt haben.',
      ],
    },
    'agent-list': {
      title: 'Den verbundenen Agenten sehen und trennen',
      why: 'Jede Agenten-Freigabe wird mit ihren Scopes aufgelistet und kann widerrufen werden.',
      steps: ['Profil → Verbundene Agenten → Trennen.'],
    },
    'llms-txt': {
      title: 'Lesen, was Agenten lesen',
      why: 'llms.txt, der API-Katalog und die .well-known-Dokumente werden aus einer Konfiguration erzeugt.',
      steps: [
        'Öffnen Sie /llms.txt, dann /.well-known/mcp/server-card.json und /openapi.json.',
      ],
    },
    'webhook-received': {
      title: 'Ein Plattform-Ereignis in der Datenbank dieser App landen sehen',
      why: 'Abonnements, Workspaces und Mitglieder ändern sich auf der Plattform; Webhooks sagen es Ihrem Server, signiert.',
      steps: [
        'Tun Sie irgendetwas, das die Plattform bemerkt: jemanden einladen, abonnieren, Credits kaufen.',
        'Öffnen Sie Ereignisse: die Webhook-Tabelle listet, was angekommen ist, jedes vor dem Speichern signaturgeprüft.',
      ],
    },
    'sdk-events': {
      title: 'Auch die Browser-Ereignisse sehen',
      why: 'Das SDK sendet Lebenszyklus-Ereignisse im Browser; diese App leitet sie weiter, um ihre eigenen Tabellen aktuell zu halten.',
      steps: ['Lesen Sie unter Ereignisse die Tabelle der App-Ereignisse.'],
    },
    'switch-language': {
      title: 'Sprache wechseln',
      why: 'Acht Sprachen in den eigenen Bildschirmen des SDK und in dieser App, mit ICU-Pluralen und nativen Ziffern.',
      steps: ['Nutzen Sie den Sprachumschalter im Kopfbereich.'],
    },
    rtl: {
      title: 'Arabisch ausprobieren',
      why: 'Layout von rechts nach links in den SDK-Bildschirmen, nicht nur übersetzte Texte.',
      steps: ['Wechseln Sie zu العربية und öffnen Sie Einstellungen.'],
    },
    'dark-mode': {
      title: 'Dunkelmodus umschalten',
      why: 'Die Bildschirme des SDK folgen der .dark-Klasse und den CSS-Variablen Ihrer App.',
      steps: ['Nutzen Sie den Theme-Umschalter.'],
    },
    'export-data': {
      title: 'Ihre Daten exportieren',
      why: 'DSGVO Artikel 15: die eigenen Daten dieser App plus Ihr Profil von der Plattform, in einer Datei.',
      steps: ['Profil → Meine Daten exportieren.'],
    },
    'clone-it': {
      title: 'Mitnehmen',
      why: 'Alles, was Sie gerade getan haben, steckt in diesem Repository. Klonen Sie es, richten Sie es auf Ihre Organisation aus und starten Sie von hier.',
      steps: [
        'git clone https://github.com/buildbase-app/nextjs-starter',
        'Kopieren Sie .env.example nach .env.local und tragen Sie Ihre Organisation und Ihren Client ein.',
        'npm install && npm run dev',
      ],
    },
    'delete-account': {
      title: 'Ihr Konto löschen',
      why: 'DSGVO Artikel 17: gelöscht hier und auf der Plattform.',
      steps: ['Profil → Mein Konto löschen. Damit endet die Tour.'],
    },
    'help-policy': {
      title: 'Das Hilfe-Center lesen',
      why: 'Redaktionelle Inhalte leben in der Konsole, nicht in diesem Repository: ein Richtlinienblock, Docs, FAQs, Testimonials. Die App liest sie über die Organisations-API mit einem Token, das nur der Server kennt.',
      steps: [
        'Öffnen Sie das Hilfe-Center.',
        'Lesen Sie den Block zur Rückerstattungsrichtlinie.',
        'Ändern Sie seinen Text in der Konsole und laden Sie neu.',
      ],
    },
    'help-doc': {
      title: 'Ein Doc öffnen',
      why: 'Docs haben Ordner und ein Veröffentlicht-Kennzeichen; die App listet die Ordner aus dem Baum und zeigt nur Veröffentlichtes.',
      steps: ['Wählen Sie im Hilfe-Center ein Doc in der linken Spalte.'],
    },
    'help-faq': {
      title: 'Eine FAQ aufklappen',
      why: 'Eine FAQ-Sammlung ist eine kuratierte Liste von Fragen; dieselbe Frage kann in mehreren Sammlungen stehen.',
      steps: [
        'Öffnen Sie im Hilfe-Center eine Frage unter Häufige Fragen.',
        'Fügen Sie in der Konsole eine hinzu und laden Sie neu.',
      ],
    },
    'help-testimonials': {
      title: 'Die Testimonials ansehen',
      why: 'Testimonials sind Entwürfe, bis jemand sie in der Konsole veröffentlicht.',
      steps: ['Scrollen Sie im Hilfe-Center zu Was Kunden sagen.'],
    },
    'form-submit': {
      title: 'Das Kontaktformular abschicken',
      why: 'Das Formularschema wird in der Konsole gebaut und öffentlich ausgeliefert; jede Einsendung wird zu einem Sammlungseintrag und löst form.submitted aus. Diese App leitet das Absenden über ihren eigenen Server, um eigene Prüfungen zu ergänzen.',
      steps: [
        'Öffnen Sie Formulare.',
        'Füllen Sie das Kontaktformular aus und schicken Sie es ab.',
        'Es erscheint unter Neueste Einsendungen.',
      ],
    },
    'form-invalid': {
      title: 'Etwas senden, das das Formular ablehnt',
      why: 'Die Plattform prüft gegen das Live-Schema und liefert alle Fehler auf einmal zurück; die App zeigt sie so an, wie sie kommen.',
      steps: [
        'Lassen Sie ein Pflichtfeld leer oder geben Sie eine ungültige E-Mail ein.',
        'Senden Sie ab und lesen Sie die Fehler.',
      ],
    },
    'form-console': {
      title: 'Die Einsendung in der Konsole sehen',
      why: 'Jede Einsendung ist ein Eintrag in der Sammlung des Formulars, mit einem Diagramm der Einsendungen über die Zeit.',
      steps: [
        'Öffnen Sie in der Konsole den Bereich Formulare und suchen Sie das Formular Contact.',
      ],
    },
    'form-workflow': {
      title: 'Einen Workflow an das Formular hängen',
      why: 'form.submitted ist ein Workflow-Auslöser: eine Bestätigungs-E-Mail senden, in Slack posten, Ihren Server aufrufen. In der Konsole gebaut, hier nichts zu deployen.',
      steps: [
        'Legen Sie in der Konsole einen Workflow mit dem Auslöser form.submitted an.',
        'Schicken Sie das Formular erneut ab und sehen Sie der Instanz beim Laufen zu.',
      ],
    },
    'collection-read': {
      title: 'Die Release Notes lesen',
      why: 'Eine Sammlung sind eigene Daten mit versioniertem Schema. Die App liest Einträge der Live-Version, eine Schemaänderung ist also eine Veröffentlichung, kein Deployment.',
      steps: [
        'Öffnen Sie Sammlungen.',
        'Die Tabellenspalten sind die Felder der Live-Version.',
      ],
    },
    'collection-delete': {
      title: 'Einen Eintrag löschen',
      why: 'Schreibzugriffe laufen über die Organisations-API mit dem Token der App; die Konsole zeigt die Änderung sofort.',
      steps: [
        'Löschen Sie eine Release Note aus der Tabelle.',
        'Prüfen Sie den Eintragsbereich in der Konsole.',
      ],
    },
    'collection-version': {
      title: 'Eine neue Version veröffentlichen',
      why: 'Live-Versionen sind unveränderlich. Eine neue Version kopiert die Felder, Sie fügen eines hinzu, setzen sie live, und die Tabelle bekommt eine Spalte mehr.',
      steps: [
        'Legen Sie in der Konsole für release-notes eine Version mit einem zusätzlichen Feld an und setzen Sie sie live.',
        'Laden Sie Sammlungen neu.',
      ],
    },
    'upload-asset': {
      title: 'Eine Datei hochladen',
      why: 'Dateien werden von der Plattform gespeichert und ausgeliefert, je 5 MB, öffentlich oder privat. Der Browser sieht das Organisations-Token nie: Der Server leitet den Upload weiter.',
      steps: [
        'Öffnen Sie Dateien.',
        'Wählen Sie ein Bild und warten Sie, bis es mit Breite und Höhe in der Galerie erscheint.',
      ],
    },
    'asset-in-console': {
      title: 'Die Datei in der Konsole sehen',
      why: 'Dieselbe Datei in der Dateiliste der Organisation, mit allem, was die Plattform über sie weiß.',
      steps: [
        'Öffnen Sie den Bereich Assets in der Konsole.',
        'Suchen Sie die Datei, die Sie gerade hochgeladen haben.',
      ],
    },
    'asset-private': {
      title: 'Die Datei privat machen',
      why: 'Sichtbarkeit ist ein Schalter auf der Plattform; die öffentliche URL einer privaten Datei funktioniert sofort nicht mehr.',
      steps: [
        'Wählen Sie auf der Dateikarte Privat machen.',
        'Öffnen Sie ihre URL: Sie liefert nichts mehr aus.',
        'Machen Sie sie wieder öffentlich.',
      ],
    },
    'create-link': {
      title: 'Einen Kurzlink erstellen',
      why: 'Die Plattform vergibt eine 12-stellige ID und leitet dafür weiter; das Ziel bestimmen Sie.',
      steps: [
        'Öffnen Sie Kurzlinks.',
        'Geben Sie ihm einen Namen und erstellen Sie ihn für die URL dieser App.',
      ],
    },
    'click-link': {
      title: 'Klicken und den Zähler sehen',
      why: 'Jeder Klick wird mit Land, Gerät und Uhrzeit erfasst; der Zähler hier wird von der Plattform zurückgelesen.',
      steps: [
        'Wählen Sie Folgen: Die Kurz-URL öffnet sich in einem neuen Tab und landet am Ziel.',
        'Kommen Sie zurück und aktualisieren Sie: Der Zähler ist gestiegen.',
      ],
    },
    'change-link-destination': {
      title: 'Das Ziel ändern',
      why: 'Die Kurz-URL bleibt gleich, bereits geteilte Links funktionieren also weiter.',
      steps: [
        'Wählen Sie Ziel ändern, geben Sie eine andere URL ein und speichern Sie.',
        'Folgen Sie dem Link erneut: Er landet am neuen Ziel.',
      ],
    },
    'link-analytics-console': {
      title: 'Den Analysebereich ansehen',
      why: 'Die Konsole zeigt die Klicks im Zeitverlauf und listet jeden einzeln auf.',
      steps: [
        'Öffnen Sie in der Konsole Links → Analytics.',
        'Suchen Sie Ihre Klicks.',
      ],
    },
    'finish-onboarding': {
      title: 'Die Onboarding-Checkliste abschließen',
      why: 'Eigene Attribute sind Schlüssel-Wert-Paare am Nutzer, vom SDK im Browser in Ihrem Namen geschrieben. Die Schlüssel werden in der Konsole definiert, damit man später danach filtern kann.',
      steps: [
        'Öffnen Sie Zielgruppe.',
        'Haken Sie alle drei Kästchen ab, ergänzen Sie eine Rollenbezeichnung und schließen Sie ab.',
        'Die Attributkarte zeigt onboarded=true.',
      ],
    },
    'attributes-in-console': {
      title: 'Die Attribute an Ihrem Datensatz sehen',
      why: 'Was die App geschrieben hat, steht an Ihrem Nutzer in der Konsole, wo Admins danach filtern oder segmentieren können.',
      steps: [
        'Öffnen Sie in der Konsole den Bereich Users und Ihren eigenen Datensatz.',
        'Suchen Sie onboarded und role-title.',
      ],
    },
    'set-country': {
      title: 'Land, Zeitzone und Währung wählen',
      why: 'Das SDK liefert die Listen (Länder, Zeitzonen, Währungen) mit, eine Auswahl braucht also keinen Download; die Wahl wird als Attribute gespeichert.',
      steps: [
        'Wählen Sie unter Zielgruppe ein Land, eine Zeitzone und eine Währung.',
        'Speichern Sie die Einstellungen.',
      ],
    },
    'subscribe-newsletter': {
      title: 'Den Newsletter abonnieren',
      why: 'Ein Zielgruppenkontakt ist ein Marketing-Datensatz, getrennt vom Konto: Er kann ohne Konto existieren, und an ihn gehen die Kampagnen.',
      steps: [
        'Abonnieren Sie unter Zielgruppe mit Ihrer E-Mail.',
        'Der Server legt den Kontakt an und fügt ihn der Liste newsletter hinzu.',
      ],
    },
    'join-waitlist': {
      title: 'Abgemeldet der Warteliste beitreten',
      why: 'Die Beta-Warteliste der Plattform: Formular und Texte kommen aus der Konsole, Anmeldungen werden dort freigegeben.',
      steps: [
        'Öffnen Sie /waitlist in einem privaten Fenster.',
        'Hinterlassen Sie einen Namen und eine E-Mail.',
        'Geben Sie die Anmeldung in der Konsole unter Users → Beta frei.',
      ],
    },
    'tracking-consent': {
      title: 'Einwilligen und Tags laden sehen',
      why: 'Analyse- und Werbe-Tags werden in der Konsole eingerichtet, nicht in diesem Code. Das SDK lädt sie erst nach der Einwilligung, und das Banner listet, was tatsächlich installiert ist, nie einen Anbieter, der nicht geladen wurde.',
      steps: [
        'Öffnen Sie Tracking.',
        'Lesen Sie die Einwilligungsliste: Sie entsteht aus den Tags, die dieser App zugeordnet sind.',
        'Akzeptieren Sie alles oder nur Analyse und sehen Sie, welche Anbieter geladen werden.',
      ],
    },
    'tracking-custom-event': {
      title: 'Ein eigenes Event auslösen',
      why: 'Registrierungen und Käufe werden von selbst ausgelöst; Ihre eigenen Events gehen über track() an den Data Layer und an jeden installierten Anbieter.',
      steps: [
        'Klicken Sie unter Tracking auf "Track a custom event".',
        'Sehen Sie es mit seinen Parametern im Live-Protokoll erscheinen.',
      ],
    },
    'tracking-attribution': {
      title: 'Sehen, woher Sie kamen',
      why: 'Klick-IDs und Kampagnenparameter werden auf der ersten Seite erfasst, auf der jemand landet, und begleiten jedes spätere Event, auch über Subdomains hinweg.',
      steps: [
        'Laden Sie die Tracking-Seite mit ?utm_source=demo&utm_campaign=tour neu.',
        'Lesen Sie die Attributionskarte.',
      ],
    },
    'tracking-console-tag': {
      title: 'Das Tag in der Konsole sehen',
      why: 'GA4, Meta, PostHog, Clarity und elf weitere, jeweils mit einer Einwilligungskategorie und einem Datenschutztext, den die Konsole für Ihre Richtlinie erzeugt.',
      steps: [
        'Öffnen Sie in der Konsole Settings → Tracking.',
        'Öffnen Sie Auth → Clients und sehen Sie das dieser App zugeordnete Tag.',
      ],
    },
    'workflow-runs': {
      title: 'Ihre Workflow-Läufe ansehen',
      why: 'Workflows werden in der Konsole gebaut: Auslöser, Aktionen und Bedingungen. Die App ruft nie einen auf; sie verursacht die Events, auf die sie hören, und kann lesen, was für jede Person gelaufen ist.',
      steps: [
        'Öffnen Sie Automatisierungen.',
        'Lesen Sie die Läufe, die die Plattform für Sie gestartet hat, mit Status und Anzahl der Knoten.',
      ],
    },
    'workflow-cause': {
      title: 'Einen Workflow-Lauf auslösen',
      why: 'Eine Registrierung, eine Formulareinsendung, eine Zahlung oder ein niedriges Guthaben startet einen Lauf. Nichts in der App nennt den Workflow beim Namen.',
      steps: [
        'Schicken Sie unter Formulare das Kontaktformular ab.',
        'Gehen Sie zurück zu Automatisierungen und aktualisieren Sie: Ein Lauf von "Provision on form" erscheint.',
      ],
    },
    'workflow-provision-call': {
      title: 'Einen Aufruf von einem Workflow empfangen',
      why: 'Eine HTTP-Webhook-Aktion kann Ihren eigenen Server aufrufen. Der Aufruf ist nicht signiert und der Authorization-Header wird entfernt; deshalb trägt er ein gemeinsames Secret in x-webhook-secret, und die Route ist idempotent, weil die Plattform wiederholt.',
      steps: [
        'Lösen Sie den Workflow "Provision on form" aus.',
        'Lesen Sie unter Automatisierungen den Bereitstellungsaufruf, den die App empfangen und gespeichert hat.',
      ],
    },
    'workflow-console-run': {
      title: 'Den Lauf in der Konsole öffnen',
      why: 'Ergebnisse je Knoten, Logs, Wiederholungen und eine Dead-Letter-Queue, ohne dass davon etwas in Ihrem Code steht.',
      steps: [
        'Öffnen Sie in der Konsole Workflows → Instances.',
        'Öffnen Sie Ihren Lauf und lesen Sie die Ausgabe jedes Knotens.',
      ],
    },
    'reports-view': {
      title: 'Einen Bericht der Plattform ansehen',
      why: 'Jedes Modul hat Endpunkte für Diagramme und Zählwerte, dieselben, aus denen die Dashboards der Konsole zeichnen. Diese App zeigt Registrierungen, Formulareinsendungen und Linkklicks der letzten dreißig Tage.',
      steps: [
        'Öffnen Sie Berichte.',
        'Lesen Sie die drei Diagramme und die Kennzahlen.',
      ],
    },
    'reports-console': {
      title: 'Mit dem Konsolen-Dashboard vergleichen',
      why: 'Die Zahlen stimmen überein, weil sie von denselben Endpunkten kommen; manche sind Aggregate, die alle zehn Minuten aktualisiert werden.',
      steps: [
        'Öffnen Sie das Dashboard der Konsole und suchen Sie dieselbe Registrierungskurve.',
      ],
    },
    'see-badge': {
      title: 'Das Badge ansehen',
      why: 'Ein Bild und Link "Built with BuildBase", auf dem Server gerendert, ohne Script und ohne Netzwerkaufruf, mit optionalem Empfehlungscode.',
      steps: ['Scrollen Sie auf der Startseite zur Fußzeile.'],
    },
    'slack-alert': {
      title: 'Einen Slack-Alarm bei einer Registrierung bekommen',
      why: 'Team-Alarme für bis zu 55 Systemevents gehen an eine einzige Slack-Incoming-Webhook-URL. Nur in der Konsole: Die App verursacht lediglich die Events.',
      steps: [
        'Fügen Sie in der Konsole unter Settings → Slack eine Incoming-Webhook-URL ein und wählen Sie "user.registered".',
        'Registrieren Sie einen Testnutzer und beobachten Sie den Slack-Kanal.',
      ],
    },
    'receive-campaign': {
      title: 'Eine E-Mail-Kampagne empfangen',
      why: 'E-Mails an eine ganze Zielgruppe werden in der Konsole geschrieben und versendet: Vorlage, verifizierte Versanddomain, Zielgruppenliste, Entwürfe je Empfänger, Öffnungs- und Klick-Tracking.',
      steps: [
        'Treten Sie unter Zielgruppe dem Newsletter bei.',
        'Erstellen Sie in der Konsole unter Emails → Campaigns eine Kampagne an diese Liste und senden Sie sie.',
        'Lesen Sie sie in Ihrem Posteingang.',
      ],
    },
    'unsubscribe-campaign': {
      title: 'Sich davon abmelden',
      why: 'Das Merge-Tag {{unsubscribe}} führt zu einer gehosteten Seite; der Kontakt wird als abgemeldet markiert und ab dann übersprungen.',
      steps: [
        'Klicken Sie in der Kampagnen-E-Mail auf Abmelden.',
        'Suchen Sie den Kontakt in der Konsole unter Audience: abgemeldet.',
      ],
    },
  },
};
