import type { Messages } from '../types';

const messages: Messages = {
  common: {
    nav: {
      home: 'Inicio',
      dashboard: 'Panel',
      documents: 'Documentos',
      analytics: 'Analíticas',
      team: 'Equipo',
      notifications: 'Notificaciones',
      settings: 'Configuración',
      menu: 'Menú',
      selectWorkspace: 'Seleccionar espacio de trabajo',
      profile: 'Perfil',
      manageWorkspace: 'Gestionar espacio de trabajo',
      generalSettings: 'Configuración general',
      userManagement: 'Gestión de usuarios',
      billingPayments: 'Facturación y pagos',
      credits: 'Credits',
      creditUsage: 'Credit Usage',
      creditsAvailable: 'Available',
      usage: 'Usage',
      permissions: 'Permissions',
    },
    buttons: {
      signIn: 'Iniciar sesión',
      signOut: 'Cerrar sesión',
      submit: 'Enviar',
      cancel: 'Cancelar',
      save: 'Guardar',
      delete: 'Eliminar',
      edit: 'Editar',
      create: 'Crear',
      loading: 'Cargando...',
    },
    auth: {
      signInPrompt: 'Por favor, inicia sesión para continuar',
      signOutConfirm: '¿Estás seguro de que quieres cerrar sesión?',
    },
    footer: {
      rights: 'Todos los derechos reservados',
    },
    language: {
      select: 'Seleccionar idioma',
      current: 'Idioma actual',
    },
    accessibility: {
      skipToContent: 'Saltar al contenido',
    },
    theme: {
      toggle: 'Cambiar tema',
      light: 'Claro',
      dark: 'Oscuro',
      system: 'Sistema',
    },
    redirecting: 'Redirigiendo...',
  },
  home: {
    title: 'Mi App',
    hero: {
      heading: 'Bienvenido a Mi App',
      description:
        'Construido con Next.js, TypeScript, Tailwind CSS, shadcn/ui, next-themes y BuildBase SDK.',
    },
    meta: {
      title: 'Mi App',
      description: 'Mi aplicación Next.js con shadcn/ui y soporte de temas',
      tagline: 'Construye algo increíble',
    },
  },
  dashboard: {
    title: 'Panel',
    welcome: '¡Bienvenido de nuevo, {name}!',
    cards: {
      workspace: {
        title: 'Espacio de trabajo actual',
        empty: 'No hay espacio de trabajo seleccionado',
      },
      role: {
        title: 'Tu rol',
        empty: 'N/A',
      },
      email: {
        title: 'Correo electrónico',
      },
      status: {
        title: 'Estado',
        active: 'Activo',
        inactive: 'Inactivo',
      },
    },
    quickActions: {
      title: 'Acciones rápidas',
      createProject: 'Crear proyecto',
      viewReports: 'Ver informes',
      inviteTeam: 'Invitar miembro del equipo',
    },
    pages: {
      documents: {
        title: 'Documentos',
        description: 'Gestiona tus documentos',
        placeholder: 'El contenido de documentos va aquí.',
      },
      analytics: {
        title: 'Analíticas',
        description: 'Ver tus analíticas',
        placeholder: 'El contenido de analíticas va aquí.',
      },
      team: {
        title: 'Equipo',
        description: 'Gestiona tu equipo',
        placeholder: 'El contenido de gestión de equipo va aquí.',
      },
      settings: {
        title: 'Configuración',
        description: 'Gestiona tu configuración',
        placeholder: 'El contenido de configuración va aquí.',
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
    title: 'Precios',
    subtitle: 'Elige el plan que se adapte a tus necesidades',
    billing: 'Facturación',
    monthly: 'Mensual',
    quarterly: 'Trimestral',
    yearly: 'Anual',
    perMonth: '/mes',
    perQuarter: '/trim',
    perYear: '/año',
    currency: 'Moneda',
    quotas: 'Cuotas',
    limits: 'Límites',
    credits: 'AI Credits',
    creditsPerPeriod: 'credits / period',
    features: 'Características',
    included: 'Incluido',
    perUnit: 'después de eso',
    loading: 'Cargando planes...',
    noPlans: 'No hay planes disponibles',
    error: 'Error al cargar precios',
    meta: {
      title: 'Precios',
      description: 'Ver nuestros planes y precios',
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
    lowCredits: {
      title: 'Pocos créditos',
      description:
        'Tu saldo de créditos es bajo. Recárgalo ahora para evitar interrupciones.',
    },
    expiring: {
      title: 'Créditos por vencer',
      description: 'Créditos que vencen en los próximos 30 días',
      expiresIn: 'Vence el {date}',
      noExpiring: 'No hay créditos próximos a vencer',
      days: '{count} créditos',
    },
    transactions: {
      title: 'Historial de transacciones',
      description: 'Adiciones y deducciones recientes de créditos',
      empty: 'No hay transacciones aún',
      columns: {
        type: 'Tipo',
        amount: 'Monto',
        balance: 'Saldo después',
        description: 'Descripción',
      },
      types: {
        credit: 'Crédito',
        debit: 'Débito',
      },
    },
  },
  errors: {
    generic: {
      title: 'Algo salió mal',
      description:
        'Ocurrió un error inesperado. Por favor, inténtalo de nuevo o contacta con soporte si el problema persiste.',
      tryAgain: 'Intentar de nuevo',
      goHome: 'Ir al inicio',
    },
    notFound: {
      title: 'Página no encontrada',
      description:
        'Lo sentimos, no pudimos encontrar la página que buscas. Puede haber sido movida o eliminada.',
      goBack: 'Volver atrás',
    },
  },
};

export default messages;
