import type { Messages } from '../types';

const messages: Messages = {
  common: {
    nav: {
      home: 'Inicio',
      dashboard: 'Panel',
      documents: 'Documentos',
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
      credits: 'Créditos',
      creditUsage: 'Uso de créditos',
      creditsAvailable: 'Disponibles',
      usage: 'Uso',
      permissions: 'Permisos',
      events: 'Eventos',
      invoices: 'Facturas',
      workspace: 'Espacio de trabajo',
      tour: 'Recorrido',
      inbox: 'Bandeja',
      modules: 'Módulos',
      forms: 'Formularios',
      collections: 'Colecciones',
      assets: 'Archivos',
      links: 'Enlaces cortos',
      audience: 'Audiencia',
      tracking: 'Seguimiento',
      automations: 'Automatizaciones',
      reports: 'Informes',
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
      tagline:
        'Una app de demostración en vivo que muestra el BuildBase SDK en acción. Inicia sesión para explorar autenticación, workspaces, créditos, notificaciones push e i18n.',
      sections: {
        product: 'Producto',
        resources: 'Recursos',
        legal: 'Legal',
      },
      links: {
        features: 'Características',
        pricing: 'Precios',
        dashboard: 'Panel',
        credits: 'Créditos',
        blog: 'Blog',
        changelog: 'Historial de cambios',
        tour: 'Recorrido',
        github: 'Código en GitHub',
        privacy: 'Política de privacidad',
        terms: 'Términos de servicio',
      },
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
    pages: {
      lastUpdated: 'Última actualización:',
    },
    redirecting: 'Redirigiendo...',
  },
  home: {
    title: 'BuildBase Demo',
    hero: {
      badge: 'Demo en vivo · 67 tareas',
      heading:
        'Cada capacidad de BuildBase, <highlight>una tarea a la vez</highlight>',
      description:
        'Una app real sobre el SDK de BuildBase, con un recorrido guiado: inicia sesión y prueba registro, espacios de trabajo, facturación, uso, créditos, notificaciones, agentes y webhooks, cada uno mostrando de dónde viene.',
      signInToExplore: 'Iniciar sesión para explorar',
      openDashboard: 'Abrir panel',
      viewSource: 'Ver código',
      builtWith: 'Construido con',
    },
    stats: {
      languages: {
        label: 'Idiomas en esta demo',
        sublabel: 'cambia con el selector del encabezado',
      },
      tasks: {
        label: 'Tareas del recorrido',
        sublabel: 'cada una una capacidad que probar',
      },
      groups: {
        label: 'Grupos',
        sublabel: 'del inicio de sesión a los webhooks',
      },
      authCode: {
        label: 'Líneas de código de auth',
        sublabel: 'el SDK lo maneja todo',
      },
    },
    cta: {
      heading: '¿Listo para verlo todo en acción?',
      description:
        'Inicia sesión para abrir el panel completo — prueba cambiar espacios de trabajo, consumir créditos, enviar una notificación push y cambiar entre los 8 idiomas.',
      signIn: 'Iniciar sesión y explorar',
      openDashboard: 'Abrir panel',
      howBuilt: 'Cómo está construido',
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
    trial: {
      endingSoon: 'Prueba por terminar',
      endingSoonMsg:
        'Tu prueba termina en {days} día{s}. Actualiza ahora para mantener el acceso.',
      upgrade: 'Actualizar',
      freeTrial: 'Estás en período de prueba',
      daysRemaining: '{days} días restantes',
      endsOn: 'Prueba termina el {date}',
      active: 'Prueba activa',
      viewPlans: 'Ver planes',
      trialBadge: 'Prueba',
    },
    noSubscription: {
      title: 'Sin suscripción activa',
      hint: 'Suscríbete para desbloquear funciones de pago',
      choosePlan: 'Elegir plan',
    },
    subscription: {
      title: 'Suscripción',
      description: 'Tu plan actual',
      loading: 'Cargando...',
      status: 'Estado: {status}',
      activeSubscription: 'Suscripción activa',
      changePlan: 'Cambiar plan',
      noPlan: 'Sin plan activo',
      choosePlan: 'Elegir plan',
    },
    subscriptionGates: {
      whenSubscription: {
        title: 'Gate de suscripción',
        description: 'Solo visible con suscripción activa',
        fallback: 'Sin suscripción activa — actualiza para ver este contenido.',
        content: 'Tienes una suscripción activa — esta tarjeta es visible.',
      },
      whenSubscriptionToPlans: {
        title: 'Gate de plan',
        description: 'Solo visible con un plan específico',
        fallback: 'No estás en el plan Pro / Enterprise / Growth.',
        content:
          'Estás en Pro, Enterprise o Growth — contenido premium desbloqueado.',
      },
    },
    seatStatus: {
      title: 'Estado de asientos',
      description: 'Miembros vs límites del plan',
      members: 'Miembros',
      includedSeats: 'Asientos incluidos',
      maxUsers: 'Usuarios máx.',
      canInvite: 'Puede invitar',
      yes: 'Sí',
      no: 'No',
      limitReached:
        'Límite de asientos alcanzado — actualiza tu plan para invitar más miembros.',
    },
    quickActionButtons: {
      inviteTeam: 'Invitar equipo',
      manageSubscription: 'Gestionar suscripción',
      workspaceSettings: 'Configuración del espacio',
    },
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
  team: {
    title: 'Equipo',
    description: 'Miembros del espacio de trabajo',
    inviteMember: 'Invitar miembro',
    seatLimitReached:
      'Límite de asientos alcanzado — actualiza tu plan para invitar más miembros.',
    cards: {
      members: 'Miembros',
      includedSeats: 'Asientos incluidos',
      maxUsers: 'Usuarios máx.',
      availableSeats: 'Asientos disponibles',
    },
    memberList: {
      title: 'Miembros',
      count: '{count} miembro(s) en este espacio de trabajo',
      empty: 'No se cargaron miembros. Asegúrate de estar autenticado.',
      roleFallback: 'miembro',
      changeRole: 'Cambiar rol',
    },
    invite: {
      title: 'Invitar por correo',
      description:
        'La dirección no necesita cuenta. Recibe un correo, sigue el enlace, se registra o inicia sesión y acepta.',
      noPermission: 'Tu rol no puede invitar miembros.',
      emailPlaceholder: 'nombre@empresa.com',
      role: 'Rol',
      send: 'Enviar invitación',
      sent: 'Invitación enviada a {email}',
      failed: 'Algo salió mal',
      resent: 'Invitación reenviada',
      revoked: 'Invitación revocada',
      seatNote:
        '{count} invitación(es) pendiente(s) ocupan un asiento hasta responderse.',
      pendingTitle: 'Pendientes',
      loading: 'Cargando…',
      none: 'Nada pendiente.',
      invitedBy: 'Invitado por {name}',
      pendingLabel: 'Pendiente',
      expires: 'caduca {date}',
      cooldown: 'Reenvío disponible en {seconds}s',
      resend: 'Reenviar',
      revoke: 'Revocar',
    },
    roleChanged: 'Rol cambiado a {role}',
    manage: {
      title: 'Gestionar miembros',
      description:
        'Abre el panel de configuración para gestionar roles e invitaciones',
      openSettings: 'Abrir configuración de miembros',
      permissions: 'Permisos',
    },
  },
  settings: {
    title: 'Configuración',
    description: 'Configuración del espacio de trabajo',
    card: {
      title: 'Configuración del espacio de trabajo',
      description:
        'Haz clic en cualquier sección para abrir el panel de configuración',
    },
    danger: {
      openButton: 'Abrir zona de peligro',
    },
    sections: {
      profile: {
        label: 'Perfil',
        description: 'Tu nombre, avatar y datos personales',
      },
      general: {
        label: 'General',
        description:
          'Nombre del espacio de trabajo, slug y configuración básica',
      },
      users: {
        label: 'Miembros e invitaciones',
        description:
          'Gestionar miembros del equipo, roles e invitaciones pendientes',
      },
      subscription: {
        label: 'Suscripción',
        description: 'Ver y cambiar tu plan actual',
      },
      usage: {
        label: 'Uso',
        description: 'Consumo de cuotas e historial de uso',
      },
      credits: {
        label: 'Créditos',
        description: 'Saldo de créditos y opciones de recarga',
      },
      features: {
        label: 'Indicadores de características',
        description:
          'Activar/desactivar características del espacio de trabajo',
      },
      notifications: {
        label: 'Notificaciones',
        description: 'Preferencias de notificaciones por correo y push',
      },
      permissions: {
        label: 'Permisos',
        description: 'Configuración de control de acceso basado en roles',
      },
      danger: {
        label: 'Zona de peligro',
        description: 'Eliminar espacio de trabajo o transferir propiedad',
      },
    },
  },
  documents: {
    featureGates: {
      title: 'Puertas de funciones',
      description:
        'Partes de este producto que activa un flag de función del espacio o del usuario.',
    },
    workbench: {
      title: 'Tus documentos',
      description:
        'Los documentos viven en la base de datos de esta app; la plataforma los mide.',
      search: 'Buscar documentos',
      allStatuses: 'Todos los estados',
      allTags: 'Todas las etiquetas',
      newDocument: 'Nuevo documento',
      newDocumentHint:
        'Crear uno registra uso en la cuota documents y gasta un crédito.',
      titleLabel: 'Título',
      contentLabel: 'Contenido (Markdown)',
      statusLabel: 'Estado',
      tagsLabel: 'Etiquetas, separadas por comas',
      create: 'Crear',
      creating: 'Creando…',
      created: 'Documento creado',
      deleted: 'Documento eliminado',
      delete: 'Eliminar',
      loadSamples: 'Cargar documentos de ejemplo',
      clearSamples: 'Quitar ejemplos',
      samplesLoaded: '{count} documentos de ejemplo cargados',
      samplesAlready: 'Los ejemplos ya estaban cargados',
      samplesCleared: '{count} documentos de ejemplo eliminados',
      sample: 'Ejemplo',
      empty: 'Aún no hay documentos.',
      total: '{count} en total',
      words: '{count} palabras',
      loadFailed: 'No se pudieron cargar los documentos',
      viewerNotice:
        'Tu rol aquí es {role}: puedes leer, no escribir. Los botones están desactivados y el servidor lo rechaza igualmente.',
      quotaExhausted:
        'La cuota documents de este plan está agotada y no tiene excedente. Mejora el plan para crear más.',
      quotaExhaustedShort: 'Cuota agotada',
      quotaWarning: 'Has usado más del 80% de la cuota documents de este plan.',
      creditsLow: 'Quedan pocos créditos. Cada documento gasta uno.',
      creditsExhausted:
        'No quedan créditos. Los documentos se crean igual; la línea de medición muestra que se omitió el gasto.',
      refusedQuota:
        'Rechazado: {consumed} de {included} documentos usados y el plan tiene tope fijo.',
      refusedRole: 'Rechazado: el rol {role} no puede escribir.',
      meteringTitle: 'Lo que registró la plataforma',
      meteringUsage: 'Uso: {used} de {included} documentos',
      meteringUsageSkipped:
        'Uso: no registrado (este plan no tiene cuota documents)',
      meteringCredits: 'Créditos: {amount} gastados, quedan {balance}',
      meteringCreditsSkipped: 'Créditos: no gastados (sin saldo)',
      statuses: {
        draft: 'Borrador',
        in_review: 'En revisión',
        published: 'Publicado',
        archived: 'Archivado',
      },
    },
    title: 'Documentos',
    description:
      'Los documentos de tu espacio: creados aquí o por un agente, medidos por la plataforma.',
    stats: {
      featureSections: 'Secciones de características',
      featureSectionsSubtitle: 'características de documentos',
      enabled: 'Habilitadas para el espacio',
      enabledSubtitle: 'características activas',
      locked: 'Bloqueadas',
      lockedSubtitle: 'características inactivas',
    },
    features: {
      enabled: 'Habilitado',
      disabled: 'Deshabilitado',
    },
    allFeatures: {
      title: 'Todas las características del espacio',
      description: 'Estado de todos los indicadores',
      empty:
        'No hay indicadores de características configurados para este espacio de trabajo.',
    },
    featureSections: {
      advancedExports: {
        label: 'Exportaciones avanzadas',
        description: 'Exportar documentos como PDF, DOCX o CSV',
        content: 'Exportación a PDF, Word y CSV disponible en tu plan.',
        lockedMessage:
          'Activa la característica de exportaciones avanzadas para desbloquear exportaciones.',
      },
      documentSharing: {
        label: 'Compartir documentos',
        description: 'Comparte documentos con colaboradores externos',
        content:
          'Los enlaces para compartir y el acceso de colaboradores externos están habilitados.',
        lockedMessage:
          'Activa compartir documentos para permitir el acceso externo.',
      },
      eSignatures: {
        label: 'Firmas electrónicas',
        description: 'Recolectar firmas legalmente vinculantes',
        content: 'La recolección de firmas electrónicas está activa.',
        lockedMessage:
          'Activa las firmas electrónicas para recolectar firmas en documentos.',
      },
    },
  },
  events: {
    webhooks: {
      title: 'Webhooks recibidos',
      description:
        'Entregas firmadas de servidor a servidor desde la plataforma, guardadas por /api/webhooks/buildbase para este espacio de trabajo.',
      empty:
        'Aún no hay webhooks. Suscríbete, invita a alguien o compra créditos y la plataforma llamará a esta app.',
      refresh: 'Actualizar',
      event: 'Evento',
      received: 'Recibido',
      signature: 'Firma',
      verified: 'Verificada',
      payload: 'Contenido',
      when: 'Hora de la plataforma',
    },
    title: 'Registro de eventos SDK',
    description: 'Eventos SDK en tiempo real',
    clearButton: 'Limpiar',
    listenCard: {
      title: 'Escuchando eventos',
      description:
        'Estos eventos se activan automáticamente al usar el SDK — cambia de espacio, inicia sesión o invita a un miembro para verlos.',
    },
    liveCard: {
      title: 'Flujo en vivo',
      captured: '{count} eventos capturados',
      empty:
        'Sin eventos aún. Intenta cambiar de espacio de trabajo o recargar la página.',
    },
    eventLabels: {
      userCreated: 'Usuario creado',
      userUpdated: 'Usuario actualizado',
      workspaceChanged: 'Espacio cambiado',
      workspaceUpdated: 'Espacio actualizado',
      memberAdded: 'Miembro agregado',
      memberRemoved: 'Miembro eliminado',
      roleChanged: 'Rol cambiado',
      workspaceCreated: 'Espacio creado',
      workspaceDeleted: 'Espacio eliminado',
    },
  },
  invoices: {
    title: 'Facturas',
    description: 'Historial de facturación',
    refresh: 'Actualizar',
    billingPortal: 'Portal de facturación',
    billingPortalOpening: 'Abriendo…',
    error: 'Error al cargar facturas.',
    card: {
      title: 'Historial de facturas',
      found: '{count} factura(s) encontradas',
      empty:
        'Sin facturas aún. Las facturas aparecen aquí después de suscribirte a un plan de pago.',
    },
    table: {
      date: 'Fecha',
      amount: 'Monto',
      status: 'Estado',
      description: 'Descripción',
      links: 'Enlaces',
      view: 'Ver',
      pdf: 'PDF',
      loadMore: 'Cargar más',
    },
  },
  notifications: {
    title: 'Notificaciones',
    description: 'Envía una notificación desde esta app y mira dónde llega',
    pushCard: {
      title: 'Notificaciones push del navegador',
      description:
        'Habilitar notificaciones push del navegador para este dispositivo',
      subscribed: 'Suscrito',
      notSubscribed: 'No suscrito',
      subscribe: 'Suscribirse',
      unsubscribe: 'Cancelar suscripción',
    },
    sendCard: {
      title: 'Enviar notificación de prueba',
      description:
        'Completa los campos y envía una notificación. Las etiquetas {{name}}, {{workspaceName}}, {{url}} se resuelven automáticamente.',
    },
    fields: {
      eventSlug: 'Slug del evento',
      eventSlugHint:
        'El evento de demo es "{slug}", registrado en la consola con correo y push. Para solo push vale cualquier slug; el correo necesita un evento registrado.',
      title: 'Título',
      message: 'Mensaje',
      url: 'URL',
      target: 'Destinatario',
      channel: 'Canal',
    },
    placeholders: {
      eventSlug: 'ej. comment_added, deployment_success',
      title: 'Título de la notificación',
      message: 'Cuerpo push + mensaje email',
      url: 'Abre al hacer clic en push',
    },
    buttons: {
      meOnly: 'Solo yo',
      allMembers: 'Todos los miembros del espacio',
      both: 'Ambos',
      emailOnly: 'Solo email',
      pushOnly: 'Solo push',
      showAdvanced: 'Mostrar opciones avanzadas de push',
      hideAdvanced: 'Ocultar opciones avanzadas de push',
      send: 'Enviar notificación',
      sending: 'Enviando...',
      silent: 'Silencioso',
      requireInteraction: 'Requiere interacción',
      renotify: 'Renotificar',
      default: 'Por defecto',
    },
    advanced: {
      media: 'Medios',
      behavior: 'Comportamiento push',
      delivery: 'Entrega',
      actions: 'Botones de acción (máx. 2)',
      iconUrl: 'URL del icono',
      imageUrl: 'URL de la imagen',
      badgeUrl: 'URL del badge',
      tag: 'Etiqueta',
      tagHint:
        'Reemplaza la notificación con la misma etiqueta en lugar de apilar',
      behaviorHint:
        'Silencioso = sin sonido. Requiere interacción = permanece hasta que el usuario interactúa. Renotificar = sonido al reemplazar.',
      urgency: 'Urgencia',
      ttl: 'TTL (segundos)',
      schedule: 'Programar (ISO 8601)',
      action1: 'Acción 1',
      action2: 'Acción 2',
      actionTitlePlaceholder: 'Etiqueta del botón (ej. Responder)',
      actionKeyPlaceholder: 'Clave de acción (ej. reply)',
      iconUrlPlaceholder: 'Push icon (falls back to org icon)',
      imageUrlPlaceholder: 'Large image in push body',
      badgeUrlPlaceholder: 'Status bar icon (Android)',
      ttlPlaceholder: '86400 (24h default)',
    },
    context: {
      workspace: 'Espacio de trabajo:',
      user: 'Usuario:',
      none: 'Ninguno seleccionado',
    },
    resultCard: {
      title: 'Respuesta',
      description: 'Qué hizo la plataforma con el envío.',
      openInbox: 'Abrir bandeja',
    },
    toast: {
      workspaceRequired: 'Por favor selecciona un espacio de trabajo primero',
      sent: 'Notificación enviada a {count} usuario(s)',
      notSent: 'Notificación no enviada: {reason}',
      inboxHint: 'Mira la campana y tu bandeja.',
      pushEnabled: 'Notificaciones push habilitadas',
      pushDisabled: 'Notificaciones push deshabilitadas',
      pushFailed: 'Error al cambiar notificaciones push',
      networkError: 'Error de red — no se pudo conectar al servidor',
    },
  },
  permissions: {
    title: 'Permisos',
    description: 'Resolución de permisos en tiempo real',
    cards: {
      role: 'Tu rol',
      owner: 'Propietario',
      ownerYes: 'Sí',
      ownerNo: 'No',
      granted: 'Permisos concedidos',
    },
    ownerAdmin: {
      title: 'Solo propietario / administrador',
      notVisible: 'No visible para tu rol ({role}).',
      visible: 'Puedes ver esto porque eres propietario o administrador.',
    },
    allMembers: {
      title: 'Todos los miembros',
      notMember: 'No eres miembro de este espacio de trabajo.',
      visible: 'Puedes ver esto porque eres miembro del espacio de trabajo.',
    },
    matrix: {
      title: 'Matriz de permisos',
      description: 'Todos los permisos verificados contra tu rol actual',
      denied: 'Denegado',
      grantedStatus: 'Concedido',
    },
  },
  profile: {
    agents: {
      title: 'Agentes conectados',
      description:
        'Clientes de IA que has autorizado a actuar como tú por MCP. Desconectar revoca su acceso.',
      guideTitle: 'Conectar un agente',
      guideDescription:
        'Esta app es un servidor MCP. Añádela a Claude, Cursor o ChatGPT e inicia sesión con tu cuenta de BuildBase; el agente leerá tus espacios de trabajo y los documentos de esta app con tus permisos.',
    },
    title: 'Perfil de usuario',
    description: 'Atributos de usuario e indicadores de características',
    identity: {
      title: 'Identidad',
      subtitle: 'Desde useSaaSAuth()',
      name: 'Nombre',
      email: 'Correo electrónico',
      role: 'Rol',
      id: 'ID',
    },
    workspaceFeatures: {
      title: 'Indicadores de características del espacio',
      enabled: 'Habilitado',
      disabled: 'Deshabilitado',
    },
    attributes: {
      title: 'Atributos del usuario',
      description: 'Pares clave-valor personalizados por usuario',
      empty: 'Sin atributos configurados aún.',
      setTitle: 'Establecer un atributo (demo)',
      keyPlaceholder: 'clave (ej. theme)',
      valuePlaceholder: 'valor',
      saving: 'Guardando…',
      save: 'Guardar',
      saved: '¡Guardado!',
      failed: 'Error al guardar.',
    },
    userFeatures: {
      title: 'Indicadores de características del usuario',
      description: 'Indicadores de características a nivel de usuario',
      empty: 'Sin indicadores configurados para este usuario.',
      loading: 'Cargando...',
      enabled: 'Habilitado',
      disabled: 'Deshabilitado',
    },
  },
  usage: {
    title: 'Uso de cuotas',
    description: 'Consumo de cuotas en tiempo real',
    loading: 'Cargando cuotas...',
    error: 'Error al cargar datos de cuotas.',
    empty: 'No hay cuotas configuradas para este espacio de trabajo.',
    quotaCard: {
      remaining: '{count} restantes',
      unlimited: 'Ilimitado',
      exhausted: 'Agotado',
      overage: 'Exceso',
      threshold: 'Más del 80% usado ({pct}%) — cerca del límite',
      overageMsg: 'En exceso por {count} unidades',
      exhaustedMsg:
        'Cuota agotada — las acciones que usan esta cuota están bloqueadas',
      used: 'usado',
      overageAllowed: '(permitido)',
    },
    record: {
      title: 'Registrar uso',
      description: 'Registrar uso de cuota manualmente',
      slugPlaceholder: 'slug de cuota (ej. api_calls)',
      qtyPlaceholder: 'cantidad',
      recording: 'Registrando…',
      record: 'Registrar',
      success: 'Registradas {qty} unidad(es) para "{slug}".',
      failed: 'Error al registrar uso.',
    },
    logs: {
      title: 'Registro de uso',
      description: 'Entradas de uso recientes',
      loading: 'Cargando registros…',
      empty: 'Sin registros de uso aún. Registra uso abajo para ver entradas.',
      table: {
        quota: 'Cuota',
        quantity: 'Cantidad',
        source: 'Fuente',
        date: 'Fecha',
      },
    },
  },
  creditStore: {
    title: 'Paquetes de créditos',
    subtitle:
      'Compra créditos para desbloquear funciones premium como generación de IA, exportaciones y más.',
    buy: 'Comprar créditos',
    validFor: 'Válido por {days} días',
    noExpiry: 'Sin vencimiento',
    noPackages: 'No hay paquetes de créditos disponibles en este momento.',
    error: 'Error al cargar paquetes de créditos',
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
    credits: 'Créditos IA',
    creditsPerPeriod: 'créditos / período',
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
    title: 'Créditos',
    description:
      'Usa créditos para acciones premium. Gestiona paquetes en la configuración del espacio.',
    balance: 'Saldo de créditos',
    creditsAvailable: 'créditos disponibles',
    manageCredits: 'Gestionar créditos',
    buyCredits: 'Comprar créditos',
    choosePlan: 'Elegir plan',
    noCredits:
      'No tienes créditos restantes. Compra más para continuar usando funciones premium.',
    buyMore: 'Comprar créditos',
    packages: {
      title: 'Paquetes de créditos',
      loading: 'Cargando paquetes…',
      error: 'Error al cargar paquetes.',
      empty: 'No hay paquetes de créditos configurados aún.',
      credits: 'créditos',
      validFor: 'Válido por {days} días',
      buyNow: 'Comprar ahora',
    },
    testConsume: {
      title: 'Probar consumo de créditos',
      description:
        'Usa estos botones para probar el consumo de créditos de tu saldo.',
      use: 'Usar {amount}',
      apiDescription: 'Prueba: consumir {amount} créditos',
      success: 'Consumidos {amount} créditos. Saldo: {balance}',
      insufficient:
        'Créditos insuficientes. Disponibles: {available}, Solicitados: {requested}',
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
      loading: 'Cargando...',
    },
    transactions: {
      title: 'Historial de transacciones',
      description: 'Adiciones y deducciones recientes de créditos',
      empty: 'No hay transacciones aún',
      loading: 'Cargando...',
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
    blogNotFound: {
      title: 'Entrada no encontrada',
      description:
        'La entrada del blog que buscas no existe, puede haber sido eliminada o no está disponible en tu idioma.',
      browseAll: 'Ver todas las entradas',
    },
  },
  blog: {
    label: 'Blog',
    heading: 'Últimas entradas',
    description:
      'Actualizaciones, tutoriales y perspectivas de nuestro equipo.',
    noPosts: 'Aún no hay publicaciones. ¡Vuelve pronto!',
    noPostsTag: 'Aún no hay publicaciones con esta etiqueta.',
    noPostsCategory: 'Aún no hay publicaciones en esta categoría.',
    noPostsAuthor: 'Aún no hay publicaciones de este autor.',
    postsByAuthor: 'Publicaciones de {name}',
    postsTaggedCount:
      '{count, plural, one {# publicación etiquetada con "{tag}"} other {# publicaciones etiquetadas con "{tag}"}}',
    postsInCategoryCount:
      '{count, plural, one {# publicación en esta categoría} other {# publicaciones en esta categoría}}',
    readMore: 'Leer más',
    read: 'Leer',
    allPosts: '← Todas las publicaciones',
    previous: 'Anterior',
    next: 'Siguiente',
    pageOf: 'Página {page} de {total}',
    relatedPosts: 'Publicaciones relacionadas',
    share: 'Compartir',
    rssLabel: 'Feed RSS',
    shareAriaX: 'Compartir en X / Twitter',
    shareAriaLinkedin: 'Compartir en LinkedIn',
    shareAriaFacebook: 'Compartir en Facebook',
    shareAriaCopy: 'Copiar enlace',
    shareAriaCopied: '¡Enlace copiado!',
    search: {
      trigger: 'Buscar publicaciones...',
      placeholder: 'Buscar en el blog...',
      searching: 'Buscando...',
      noResults: 'Sin resultados para "{query}"',
      startTyping: 'Empieza a escribir para buscar...',
    },
    meta: {
      title: 'Blog',
      titlePage: 'Blog — Página {page}',
      description:
        'Últimas publicaciones, tutoriales y actualizaciones de nuestro equipo.',
      tagTitle: 'Publicaciones etiquetadas "{tag}"',
      tagDescription:
        'Todas las publicaciones del blog etiquetadas con "{tag}".',
      categoryTitle: '{category} — Blog',
      categoryDescription:
        'Publicaciones del blog en la categoría "{category}".',
    },
  },
  changelog: {
    label: 'Registro de cambios',
    heading: 'Novedades',
    description: 'Todas las últimas actualizaciones, mejoras y correcciones.',
    rssLabel: 'Feed RSS',
    permalink: 'Enlace permanente',
    meta: {
      title: 'Registro de cambios',
      description: 'Todas las últimas actualizaciones, mejoras y correcciones.',
    },
  },
  cookieConsent: {
    title: 'Usamos cookies',
    descriptionBefore:
      'Usamos cookies para mejorar tu experiencia, analizar el tráfico y personalizar el contenido. Puedes elegir qué cookies permitir. Lee nuestra',
    policyLinkPrivacy: 'política de privacidad',
    policyLinkCookie: 'política de cookies',
    dismissAriaLabel: 'Descartar por ahora',
    necessary: {
      title: 'Necesarias',
      description:
        'Requeridas para el funcionamiento del sitio. No se pueden deshabilitar.',
    },
    analytics: {
      title: 'Analíticas',
      description:
        'Nos ayudan a entender cómo los visitantes usan nuestro sitio.',
    },
    marketing: {
      title: 'Marketing',
      description:
        'Se usan para mostrar anuncios relevantes y rastrear campañas.',
    },
    acceptAll: 'Aceptar todo',
    rejectAll: 'Rechazar todo',
    savePreferences: 'Guardar preferencias',
    customize: 'Personalizar',
  },
  inbox: {
    title: 'Bandeja de entrada',
    description:
      'Todo lo que esta app te ha enviado, un elemento por notificación, se entregara como se entregara.',
    rules: {
      live: 'Los nuevos elementos llegan en vivo por socket; sin recargar.',
      read: 'Un elemento se marca como leído al abrirlo aquí o al pulsar su enlace. Abrir solo el correo no lo lee.',
      email:
        'Cada elemento muestra qué hicieron el correo y el push, para ver por qué un canal quedó en silencio.',
    },
  },
  tour: {
    title: 'El recorrido',
    subtitle:
      '{total} cosas que probar, cada una una capacidad de BuildBase y de dónde viene.',
    progress: '{done} de {total} hechas',
    markDone: 'Marcar hecha',
    undo: 'Deshacer',
    open: 'Abrir',
    detected: 'Se detecta automáticamente',
    manual: 'Confírmalo tú',
    why: 'Por qué importa',
    steps: 'Qué hacer',
    fromSdk: 'Del SDK',
    fromConsole: 'Configurado en la consola',
    fromApp: 'En esta app',
    requires: 'Antes haz',
    allDone: 'Lo has hecho todo. Llévatelo a casa.',
    homeTitle: 'Prueba todo, una tarea a la vez',
    homeSubtitle:
      'Inicia sesión y completa {total} tareas en {groups} grupos. Cada una muestra una capacidad de BuildBase, cómo se ve en una app y dónde se configura.',
    homeCta: 'Empezar el recorrido',
    dashboardCard: 'Tu recorrido',
    next: 'Siguiente',
    cloneTitle: 'Clona esta app',
    cloneBody:
      'Cada página y cada tarea de aquí están en un repositorio abierto. Mira cómo funciona cualquier parte, o clónalo y empieza tu propia app.',
    browseCode: 'Ver el código',
    copy: 'Copiar',
    copied: 'Copiado',
    dashboardCta: 'Continuar',
  },
  help: {
    title: 'Centro de ayuda',
    description:
      'Todo en esta página se escribió en la consola: una política, docs, preguntas frecuentes y testimonios. Cámbialo allí, recarga aquí.',
    notConfigured: {
      title: 'Aún no hay contenido',
      token:
        'Esta app no tiene token de API de la organización, así que no puede leer contenido de la consola. Define BUILDBASE_API_TOKEN.',
      empty:
        'La organización aún no tiene el contenido de demo. Siémbralo con:',
    },
    from: {
      richContent: 'contenido enriquecido',
      docs: 'docs',
      faqs: 'colección de FAQ',
      testimonials: 'testimonios',
    },
    docs: {
      title: 'Documentación',
      empty: 'Aún no hay docs publicados.',
    },
    faq: {
      title: 'Preguntas frecuentes',
    },
    testimonials: {
      title: 'Lo que dicen los clientes',
    },
  },
  forms: {
    title: 'Formularios',
    description:
      'Un formulario creado en la consola, renderizado desde su esquema en vivo y enviado a través de esta app.',
    loading: 'Cargando el formulario…',
    fromConsole: 'Los campos vienen de la consola; añade uno allí y recarga.',
    submit: 'Enviar',
    sending: 'Enviando…',
    sent: 'Enviado',
    hint: 'Los envíos se guardan como registros de una colección y disparan el evento form.submitted.',
    errors: {
      title: 'La plataforma rechazó este envío',
      generic: 'Algo no fue aceptado.',
    },
    missing: {
      title: 'Aún no hay formulario de contacto',
      token:
        'Esta app no tiene token de API de la organización. Define BUILDBASE_API_TOKEN.',
      form: 'La organización no tiene un formulario llamado Contact. Siémbralo con:',
    },
    toast: {
      sent: 'Enviado. Ya es un registro en la plataforma.',
    },
    submissions: {
      title: 'Últimos envíos',
      description: 'Leídos desde la colección del formulario.',
      refresh: 'Actualizar',
      empty: 'Nada enviado todavía.',
    },
  },
  collections: {
    title: 'Colecciones',
    description:
      'Datos personalizados en la plataforma: un esquema versionado y registros sobre la versión en vivo.',
    loading: 'Cargando registros…',
    liveVersion: 'Versión en vivo {version} ({name}), {fields} campos',
    noLiveVersion: 'Sin versión en vivo. Publica una en la consola.',
    refresh: 'Actualizar',
    empty: 'Sin registros. Siembra algunos o añade uno en la consola.',
    actions: 'Acciones',
    delete: 'Eliminar registro',
    hint: 'Publica una nueva versión con un campo extra en la consola; la columna aparece aquí al recargar.',
    missing: {
      title: 'Aún no hay colección release-notes',
      token:
        'Esta app no tiene token de API de la organización. Define BUILDBASE_API_TOKEN.',
      collection:
        'La organización no tiene una colección con slug release-notes. Siémbrala con:',
    },
    toast: {
      deleted: 'Registro eliminado en la plataforma.',
      deleteFailed: 'No se pudo eliminar el registro.',
    },
  },
  tracking: {
    title: 'Seguimiento',
    description:
      'Etiquetas de analítica y anuncios desde la consola, cargadas tras el consentimiento, con tus propios eventos y atribución.',
    loading: 'Cargando…',
    consent: {
      title: 'Consentimiento',
      description:
        'Construido a partir de las etiquetas asignadas a esta app, nunca de toda la biblioteca.',
      noTags:
        'Ninguna etiqueta está asignada a esta app. Añade una en la consola en Ajustes → Seguimiento y asígnala al cliente.',
      privacy: 'Privacidad',
      analytics: 'analítica',
      marketing: 'marketing',
      acceptAll: 'Aceptar todo',
      analyticsOnly: 'Solo analítica',
      denyAll: 'Rechazar todo',
      state: 'Estado actual',
      unset: 'aún no preguntado',
    },
    installed: {
      title: 'Proveedores instalados',
      description:
        'Lo que realmente se cargó en este navegador tras el consentimiento.',
      none: 'No se cargó nada. Da tu consentimiento o asigna una etiqueta en la consola.',
    },
    custom: {
      title: 'Registrar un evento propio',
      description:
        'Tus eventos van a la capa de datos y a cada proveedor instalado.',
      button: 'Registrar report_exported',
      fired: 'Enviado {count} vez/veces',
    },
    attribution: {
      title: 'Atribución',
      description:
        'De dónde vino este visitante: ids de clic y parámetros de campaña, capturados en la primera página.',
      empty: 'Nada capturado. Recarga con',
    },
    log: {
      title: 'Registro de eventos en vivo',
      description:
        'Cada evento que el SDK envió en esta pestaña, incluidos los que envía por sí mismo.',
      empty: 'Sin eventos aún. Navega, o registra uno arriba.',
    },
  },
  automations: {
    title: 'Automatizaciones',
    description:
      'Los flujos se construyen en la consola; esta app provoca los eventos que escuchan y lee lo que se ejecutó para ti.',
    refresh: 'Actualizar',
    loading: 'Cargando…',
    notConfigured:
      'BUILDBASE_API_TOKEN no está configurado, así que esta app no puede leer las ejecuciones.',
    error: 'No se pudieron cargar las ejecuciones',
    runs: {
      title: 'Tus ejecuciones',
      description:
        'Instancias de flujo que la plataforma inició para tu cuenta.',
      empty:
        'Sin ejecuciones aún. Envía el formulario de contacto o registra un usuario nuevo, y actualiza.',
      workflow: 'Flujo',
      event: 'Evento',
      status: 'Estado',
      nodes: 'Nodos hechos',
      started: 'Inicio',
    },
    calls: {
      title: 'Llamadas a esta app',
      description:
        'Lo que la acción HTTP Webhook de un flujo envió a /api/buildbase/provision, verificado con secreto compartido.',
      empty: 'Aún no se recibieron llamadas de aprovisionamiento.',
    },
  },
  reports: {
    title: 'Informes',
    description:
      'Cada módulo informa por los mismos endpoints de gráficos y recuentos; tres de ellos, para los últimos treinta días.',
    notConfigured:
      'BUILDBASE_API_TOKEN no está configurado, así que esta app no puede leer informes.',
    loading: 'Cargando…',
    refresh: 'Actualizar',
    window: '{from} a {to}',
    unavailable: 'No disponible',
    series: {
      users: {
        title: 'Registros',
        description: 'Usuarios nuevos por día.',
      },
      forms: {
        title: 'Envíos de formulario',
        description: 'Envíos del formulario de contacto por día.',
      },
      links: {
        title: 'Clics en enlaces',
        description: 'Clics en enlaces cortos por día.',
      },
    },
  },
  assets: {
    title: 'Archivos',
    description:
      'Archivos subidos desde esta app, almacenados y servidos por la plataforma.',
    upload: 'Subir un archivo',
    uploading: 'Subiendo…',
    limit: 'Hasta 5 MB. Las imágenes muestran vista previa.',
    uploaded: 'Subido',
    gallery: 'Archivos',
    empty: 'Aún no hay archivos. Sube uno arriba.',
    public: 'Público',
    private: 'Privado',
    makePrivate: 'Hacer privado',
    makePublic: 'Hacer público',
    nowPublic: 'Ahora es público: la URL vuelve a funcionar.',
    nowPrivate: 'Ahora es privado: la URL pública deja de funcionar.',
    openUrl: 'Abrir',
    tooLarge: 'Ese archivo supera 5 MB.',
    loadFailed: 'No se pudo contactar con la plataforma.',
    notConfigured:
      'Esta página lee la organización con un token de API. Define BUILDBASE_API_TOKEN (consola → Settings → Tokens) y reinicia.',
  },
  links: {
    title: 'Enlaces cortos',
    description:
      'Enlaces para compartir que la plataforma redirige y cuenta, clic a clic.',
    create: 'Crear un enlace corto',
    createHint:
      'Cualquier URL. La plataforma asigna un id de 12 caracteres y registra cada clic con su país y dispositivo.',
    name: 'Nombre',
    url: 'URL de destino',
    createButton: 'Crear',
    created: 'Enlace creado',
    yourLinks: 'Tus enlaces',
    clicksHint:
      'Sigue un enlace y luego actualiza: el recuento viene de la plataforma, no de esta página.',
    refresh: 'Actualizar',
    empty: 'Aún no hay enlaces.',
    clicks: 'clics',
    copy: 'Copiar la URL corta',
    copied: 'Copiado',
    follow: 'Seguir',
    changeDestination: 'Cambiar destino',
    save: 'Guardar',
    cancel: 'Cancelar',
    updated: 'Destino cambiado. La URL corta es la misma.',
    chart: 'Clics, últimos 14 días',
    chartHint: 'Todos los enlaces juntos, por día.',
    chartEmpty: 'Aún no hay clics.',
    loadFailed: 'No se pudo contactar con la plataforma.',
    notConfigured:
      'Esta página lee la organización con un token de API. Define BUILDBASE_API_TOKEN (consola → Settings → Tokens) y reinicia.',
  },
  audience: {
    title: 'Audiencia y atributos',
    description:
      'Lo que la plataforma guarda de una persona más allá de la cuenta: atributos personalizados, un contacto de marketing y una lista de espera.',
    failed: 'No se pudo guardar.',
    notConfigured: 'El boletín necesita BUILDBASE_API_TOKEN en el servidor.',
    onboarding: {
      title: 'Lista de bienvenida',
      description:
        'Marca las tres y guarda: el SDK escribe onboarded=true y tu cargo como atributos de usuario, en tu navegador, como tú.',
      items: {
        profile: 'Completé mi perfil',
        workspace: 'Creé un espacio de trabajo',
        invite: 'Invité a alguien',
      },
      role: 'Tu cargo (opcional)',
      save: 'Terminar la bienvenida',
      saved: 'Guardado. Abre tu registro en la consola para verlo.',
      already: 'Ya completaste la bienvenida, según tus atributos.',
    },
    attributes: {
      title: 'Tus atributos',
      description:
        'Las claves se definen en la consola (Users → Attributes); los valores viven en tu usuario.',
      empty: 'Aún no hay atributos.',
    },
    locale: {
      title: 'País, zona horaria, moneda',
      description:
        'Las listas vienen con el SDK (@buildbase/sdk/data), sin descargas.',
      country: 'País',
      timezone: 'Zona horaria',
      currency: 'Moneda',
      save: 'Guardar preferencias',
      saved: 'Preferencias guardadas como atributos.',
    },
    newsletter: {
      title: 'Boletín',
      description:
        'Un contacto de marketing es independiente de tu cuenta: puede existir sin ella. El servidor lo crea con el token de la organización y lo añade a la lista del boletín.',
      email: 'Correo',
      subscribe: 'Suscribirse',
      subscribed: 'Suscrito',
      listed: 'Añadido a la lista {list}.',
      noList:
        'Contacto creado; esta organización aún no tiene lista de boletín.',
      waitlistHint:
        'Los visitantes sin sesión pueden unirse a la lista de espera beta en',
    },
  },
  waitlist: {
    title: 'Únete a la lista de espera',
    description:
      'El formulario beta de la plataforma: deja tu nombre y correo, un administrador te aprueba en la consola.',
    success:
      'Estás en la lista. Un administrador te aprobará desde la consola.',
    note: 'El formulario y sus textos vienen de la configuración beta de la organización (consola → Users → Beta).',
  },
};

export default messages;
