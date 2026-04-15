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
