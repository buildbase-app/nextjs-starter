import type { TourText } from './types';

/** The tour's text, Spanish. Mirrors `en.ts` id for id. */
export const es: TourText = {
  groups: {
    start: {
      title: 'Primeros pasos',
      summary: 'Regístrate, inicia sesión y descubre qué es una sesión.',
    },
    workspaces: {
      title: 'Espacios de trabajo',
      summary:
        'Cada cliente de tu app tiene un espacio de trabajo. Crear, cambiar, renombrar, eliminar.',
    },
    team: {
      title: 'Equipo',
      summary:
        'Invitaciones por email, roles, asientos y qué puede hacer cada rol.',
    },
    billing: {
      title: 'Planes y facturación',
      summary:
        'Pruebas, planes, pago, facturas y el portal de facturación, todo desde la consola.',
    },
    usage: {
      title: 'Uso y cuotas',
      summary: 'Mide lo que hace tu app y deja que el plan fije el límite.',
    },
    credits: {
      title: 'Créditos',
      summary:
        'Un saldo prepagado que tu app gasta, y paquetes que la gente compra.',
    },
    features: {
      title: 'Feature flags',
      summary:
        'Activa una función para un espacio de trabajo o un usuario sin desplegar.',
    },
    permissions: {
      title: 'Permisos',
      summary:
        'Roles por espacio de trabajo, comprobados por el SDK y por el servidor.',
    },
    notifications: {
      title: 'Notificaciones',
      summary:
        'Email, push y una bandeja de entrada a la que cada usuario puede volver.',
    },
    push: {
      title: 'Push',
      summary: 'Push del navegador, suscrito y entregado desde la plataforma.',
    },
    agents: {
      title: 'Agentes y MCP',
      summary:
        'Conecta Claude o cualquier cliente MCP a esta app con tu identidad.',
    },
    webhooks: {
      title: 'Webhooks',
      summary:
        'Eventos de la plataforma reflejados en la propia base de datos de esta app.',
    },
    platform: {
      title: 'Plataforma',
      summary: 'Idiomas, temas, tus datos y llevarte este repositorio a casa.',
    },
  },
  tasks: {
    'sign-up': {
      title: 'Crea tu cuenta',
      why: 'El registro, la verificación de email y la sesión son de la plataforma, alojados en sus páginas. Esta app no incluye código de autenticación.',
      steps: [
        'Haz clic en Sign in en la página de inicio.',
        'Regístrate con tu email y el código que recibes.',
        'Vuelves aquí con la sesión iniciada.',
      ],
    },
    'trust-device': {
      title: 'Confía en este dispositivo',
      why: 'Un dispositivo de confianza mantiene la sesión 90 días y se salta comprobaciones extra. Cada dispositivo y sesión aparece en la lista y se puede cerrar.',
      steps: [
        'Durante el inicio de sesión, elige Trust this device.',
        'Abre Profile → Devices and sessions para verlo en la lista.',
      ],
    },
    'add-passkey': {
      title: 'Añade una passkey',
      why: 'Inicio de sesión sin contraseña con huella, cara o PIN del dispositivo. Se activa por organización en la consola; nada que construir.',
      steps: [
        'Abre Profile → Security.',
        'Añade una passkey y sigue las indicaciones de tu navegador.',
        'Cierra sesión e inicia con ella.',
      ],
    },
    'see-session': {
      title: 'Mira cómo la sesión llega a tu servidor',
      why: 'El SDK guarda un id de sesión; esta app lo mantiene en una cookie httpOnly y sus rutas API llaman a BuildBase con él. Tu servidor nunca maneja una contraseña.',
      steps: [
        'Abre Profile.',
        'Lee el panel "How this works": la cookie, el cliente del servidor y qué llamada produjo el perfil.',
      ],
    },
    'sign-out-everywhere': {
      title: 'Cierra sesión en todas partes',
      why: 'Termina cada sesión en cada dispositivo de la plataforma, no solo en el navegador en el que estás.',
      steps: [
        'Abre Profile → Devices and sessions.',
        'Cierra otra sesión, o usa Sign out everywhere.',
      ],
    },
    'first-workspace': {
      title: 'Fíjate en tu primer espacio de trabajo',
      why: 'Un espacio de trabajo es el inquilino: cada plan, cuota, saldo de créditos y miembro pertenece a uno. La plataforma creó el primero al registrarte.',
      steps: [
        'Mira el nombre del espacio de trabajo en la barra lateral.',
        'Abre el selector para verlo en la lista.',
      ],
    },
    'create-workspace': {
      title: 'Crea un segundo espacio de trabajo',
      why: 'Una persona puede pertenecer a varios inquilinos. Cada uno tiene su propia facturación.',
      steps: [
        'Abre el selector de espacios de trabajo.',
        'Elige Create workspace y ponle nombre.',
      ],
    },
    'switch-workspace': {
      title: 'Cambia entre ellos',
      why: 'Cambiar intercambia todo el contexto a la vez: suscripción, uso, créditos, miembros, funciones.',
      steps: [
        'Abre el selector y elige el otro espacio de trabajo.',
        'Observa cómo cambian las tarjetas del panel.',
      ],
    },
    'rename-workspace': {
      title: 'Renombra un espacio de trabajo',
      why: 'La pantalla de ajustes integrada se encarga de los ajustes generales; tú decides qué secciones se muestran.',
      steps: ['Abre Settings → General.', 'Cambia el nombre y guarda.'],
    },
    'workspace-settings-screens': {
      title: 'Abre todas las pantallas de ajustes integradas',
      why: 'Account, Security, Devices, Connected agents, General, Members, Plan and billing, Usage, Credits, Features, Notifications, Danger zone: todas incluidas, todas desactivables.',
      steps: ['Abre Settings.', 'Recorre las secciones de la barra lateral.'],
    },
    'delete-workspace': {
      title: 'Elimina el segundo espacio de trabajo',
      why: 'La zona de peligro solo se ofrece cuando los ajustes permiten que una persona tenga más de uno.',
      steps: [
        'Cambia al segundo espacio de trabajo.',
        'Settings → Danger zone → Delete.',
      ],
    },
    'invite-member': {
      title: 'Invita a alguien por email',
      why: 'La dirección no necesita cuenta. Reciben un email, siguen el enlace, se registran o inician sesión y aceptan. Una invitación pendiente ocupa un asiento.',
      steps: [
        'Abre Team.',
        'Escribe una dirección de email que puedas leer y un rol, y envía.',
      ],
    },
    'pending-seat': {
      title: 'Mira cómo la invitación pendiente ocupa un asiento',
      why: 'Los asientos se facturan mientras una invitación está pendiente, así el recuento de asientos en Team y el plan coinciden.',
      steps: [
        'En Team, lee las tarjetas de asientos y la nota bajo el formulario de invitación: la fila pendiente cuenta.',
      ],
    },
    'accept-invitation': {
      title: 'Acepta una invitación',
      why: 'Desde el enlace del email, o desde la lista de pendientes dentro de la app. Llegar por el enlace demuestra la dirección, así que no hay verificación aparte.',
      steps: [
        'Abre el email de invitación en el otro buzón y sigue su enlace.',
        'Regístrate o inicia sesión. El banner de invitación en la parte superior de cada página del panel tiene Accept.',
      ],
    },
    'change-role': {
      title: 'Cambia el rol de un miembro',
      why: 'Los roles son por espacio de trabajo y se definen en la consola. Se avisa al miembro por email y en su bandeja de entrada.',
      steps: [
        'En Team, elige otro rol junto a un miembro que no sea el propietario.',
      ],
    },
    'viewer-limits': {
      title: 'Mira lo que un viewer no puede hacer',
      why: 'El SDK oculta lo que un rol no puede hacer, y el servidor lo rechaza de todos modos.',
      steps: [
        'Inicia sesión como el viewer.',
        'Abre Permissions y Documents: las acciones que le faltan al viewer no aparecen o están desactivadas.',
      ],
    },
    'revoke-invitation': {
      title: 'Revoca una invitación pendiente',
      why: 'El enlace deja de funcionar y el asiento se libera.',
      steps: [
        'Invita a otra dirección y revócala desde la lista de pendientes.',
      ],
    },
    'seat-limit': {
      title: 'Alcanza el límite de asientos',
      why: 'El plan fija los asientos. En el límite, el formulario de invitación da paso al mensaje de límite y el servidor responde 402.',
      steps: ['Invita hasta que el formulario diga que se alcanzó el límite.'],
    },
    'see-trial': {
      title: 'Mira tu periodo de prueba',
      why: 'Un espacio de trabajo nuevo empieza con la prueba que define el plan. El panel dice cuánto queda.',
      steps: ['Abre el panel y lee la tarjeta de prueba.'],
    },
    'compare-plans': {
      title: 'Compara los planes',
      why: 'La página de precios se genera a partir de los planes de la consola: nombres, precios por intervalo, cuotas, límites y funciones. Cambia un precio allí y cambia aquí.',
      steps: [
        'Abre Pricing.',
        'Cambia el intervalo de facturación y la moneda.',
      ],
    },
    subscribe: {
      title: 'Suscríbete con una tarjeta de prueba',
      why: 'El pago es de Stripe, creado por la plataforma para tu espacio de trabajo. Usa la tarjeta 4242 4242 4242 4242.',
      steps: [
        'En Pricing, elige un plan.',
        'Paga con la tarjeta de prueba.',
        'Vuelves al panel con el plan activo.',
      ],
    },
    'trial-banner-gone': {
      title: 'Observa cómo desaparece el banner de prueba',
      why: 'Las puertas se vuelven a renderizar desde el contexto de suscripción en cuanto cambia.',
      steps: [
        'De vuelta en el panel, la tarjeta de prueba desapareció y la tarjeta de plan muestra el plan.',
      ],
    },
    'view-invoice': {
      title: 'Consulta una factura',
      why: 'Las facturas vienen de Stripe a través de la plataforma, con un PDF alojado.',
      steps: ['Abre Invoices y abre la más reciente.'],
    },
    'billing-portal': {
      title: 'Abre el portal de facturación',
      why: 'Cambios de tarjeta, recibos y cancelación en el portal de Stripe, abierto para el espacio de trabajo.',
      steps: ['En la tarjeta de plan del panel, elige Manage billing.'],
    },
    upgrade: {
      title: 'Sube al siguiente plan',
      why: 'Prorrateado por Stripe; las cuotas y las funciones cambian con el plan.',
      steps: ['En Pricing, elige el plan superior.'],
    },
    'cancel-resume': {
      title: 'Cancela y luego reanuda',
      why: 'La cancelación corre hasta el final del periodo y se puede deshacer hasta entonces.',
      steps: [
        'Cancela desde la tarjeta de plan.',
        'Reanuda desde el mismo sitio.',
      ],
    },
    'seat-price': {
      title: 'Mira cómo cambia el precio por asiento cuando se une un miembro',
      why: 'Los planes por asiento facturan miembros e invitaciones pendientes. El SDK calcula el mismo número que factura la plataforma.',
      steps: [
        'En Team, invita a alguien; lee la línea de asientos y la tarjeta de plan.',
      ],
    },
    'record-usage': {
      title: 'Registra uso',
      why: 'Tu app mide lo que hace (un documento creado, un vídeo procesado); el plan dice cuánto está incluido.',
      steps: [
        'Abre Documents y crea uno.',
        'Lee la línea "What the platform recorded" bajo el formulario.',
        'Abre Usage: la cuota de documents se movió.',
      ],
    },
    'usage-threshold': {
      title: 'Cruza el umbral de aviso',
      why: 'Una puerta se muestra al 80% para que puedas avisar antes del límite.',
      steps: [
        'Crea documentos hasta que aparezca el aviso encima de la lista.',
      ],
    },
    'usage-limit': {
      title: 'Alcanza el límite',
      why: 'En la cantidad incluida el servidor responde 402 y el botón de crear se bloquea, salvo que el plan permita exceso. La interfaz y el servidor leen la misma cuota.',
      steps: [
        'Sigue creando hasta que el botón se bloquee y se rechace una creación.',
      ],
    },
    'usage-log': {
      title: 'Lee el registro de uso',
      why: 'Cada unidad registrada es una fila, por espacio de trabajo y por cuota.',
      steps: ['En Usage, abre el registro.'],
    },
    'see-balance': {
      title: 'Mira tu saldo de créditos',
      why: 'Un saldo prepagado por espacio de trabajo, otorgado por el plan o comprado en paquetes.',
      steps: ['Abre Credits.'],
    },
    'spend-credits': {
      title: 'Gasta créditos en una acción',
      why: 'Tu servidor consume; el saldo se actualiza en cada pestaña abierta.',
      steps: [
        'En Documents, crea uno: gasta un crédito.',
        'Observa cómo cambian el saldo de la barra lateral y la línea de medición.',
      ],
    },
    'credits-low': {
      title: 'Quédate con poco saldo',
      why: 'Una puerta en un umbral, para que puedas ofrecer una recarga antes de que se agote.',
      steps: [
        'Sigue creando documentos hasta que el aviso de saldo bajo aparezca encima de la lista.',
      ],
    },
    'buy-credits': {
      title: 'Compra un paquete',
      why: 'Los paquetes se definen en la consola; el pago es de Stripe.',
      steps: [
        'En Credits, compra el paquete de 100 créditos con la tarjeta de prueba.',
      ],
    },
    'credit-transactions': {
      title: 'Lee las transacciones',
      why: 'Cada concesión, compra y gasto es una fila, con el bloque del que salió.',
      steps: ['En Credits, baja hasta Transactions.'],
    },
    'feature-off': {
      title: 'Mira una función desactivada',
      why: 'Documents tiene tres secciones tras flags de espacio de trabajo: exports, sharing, e-signatures. Desactivada muestra un estado bloqueado, no un botón roto.',
      steps: [
        'Abre Documents y baja hasta Feature gates.',
        'Busca una sección marcada como Disabled.',
      ],
    },
    'feature-on': {
      title: 'Mírala activada',
      why: 'Los flags cambian desde la consola sin desplegar. Un plan puede concederlos, y un espacio de trabajo se puede sobrescribir a mano.',
      steps: [
        'Sube a un plan que incluya una función, o pídenos que activemos una para tu espacio de trabajo.',
        'Recarga Documents: la sección se desbloquea.',
      ],
    },
    'user-feature': {
      title: 'Un flag sobre una persona, no sobre un espacio de trabajo',
      why: 'Las funciones de usuario siguen a la persona entre espacios de trabajo; las de espacio de trabajo siguen al inquilino.',
      steps: [
        'Abre Profile: las funciones que aparecen ahí son tuyas, no del espacio de trabajo.',
      ],
    },
    'permission-matrix': {
      title: 'Lee tu matriz de permisos',
      why: 'Lo que permite tu rol en este espacio de trabajo, resuelto por la plataforma.',
      steps: ['Abre Permissions.'],
    },
    'forbidden-action': {
      title: 'Prueba una acción prohibida',
      why: 'Los botones están desactivados para un viewer; si llamas a la API de todos modos, el servidor responde 403. Ambos leen el rol que la plataforma guarda para ti en este espacio de trabajo.',
      steps: [
        'Como viewer, abre Documents: crear y eliminar están desactivados.',
        'Envía la petición de todos modos, desde una terminal o las herramientas MCP: 403.',
      ],
    },
    'custom-role': {
      title: 'Mira un rol personalizado',
      why: 'Los roles y sus permisos se definen por organización en la consola.',
      steps: [
        'Lee los roles en Permissions: esta demo define admin, editor y viewer.',
      ],
    },
    'inbox-first-item': {
      title: 'Encuentra tu primera notificación',
      why: 'Todo lo que la app te envía llega a una bandeja de entrada a la que puedes volver: un elemento por notificación, se haya entregado como se haya entregado.',
      steps: [
        'Haz clic en la campana de la cabecera, o abre Inbox en la barra lateral.',
        'Todo lo que la app te ha enviado está ahí; abrir el panel lo marca como visto, no como leído.',
      ],
    },
    'send-notification': {
      title: 'Envía una notificación desde la app',
      why: 'Una sola llamada envía por email y push; la puerta de la plataforma decide qué canales se disparan.',
      steps: [
        'Abre Notifications. El formulario viene relleno con el evento "Comment added".',
        'Envíatela a ti mismo y luego mira la campana.',
      ],
    },
    'inbox-live': {
      title: 'Mírala llegar en directo',
      why: 'A las bandejas abiertas se les avisa por socket y vuelven a cargar; sin recargar la página.',
      steps: ['Mantén la bandeja abierta en una pestaña y envía desde otra.'],
    },
    'open-from-email': {
      title: 'Ábrela desde el email',
      why: 'Hacer clic en el enlace del email marca el elemento como leído; abrir el email solamente no lo hace.',
      steps: [
        'Abre el email que recibiste y sigue su enlace.',
        'El elemento de la bandeja está leído, "by email click".',
      ],
    },
    'mark-all-read': {
      title: 'Marca todo como leído, archiva uno',
      why: 'Leído, visto y archivado son estados separados, guardados por persona.',
      steps: [
        'En la bandeja, archiva un elemento y marca el resto como leídos.',
      ],
    },
    'notification-preferences': {
      title: 'Desactiva un canal para ti',
      why: 'Cada miembro elige cómo se le interrumpe; el admin del espacio de trabajo fija los valores por defecto y puede marcar un evento como obligatorio.',
      steps: [
        'Settings → Notifications.',
        'Desactiva el email para "Comment added"; envía de nuevo y mira cómo llega solo a la bandeja.',
      ],
    },
    'required-event': {
      title: 'Mira un evento obligatorio',
      why: 'Un admin puede hacer obligatorio un evento; los miembros no pueden desactivarlo.',
      steps: ['Settings → Notifications: "Weekly report" está bloqueado.'],
    },
    'delivery-log': {
      title: 'Mira el registro de entregas de la consola',
      why: 'Cada notificación enviada a cada usuario, con lo que hicieron email y push, y si se leyó.',
      steps: [
        'Lee la captura de esta tarea; el registro está en la consola, no en la app.',
      ],
    },
    'push-subscribe': {
      title: 'Suscribe este navegador a push',
      why: 'Web push con las claves VAPID de la plataforma y un service worker que incluye el SDK.',
      steps: [
        'Abre Notifications y activa push.',
        'Permite la solicitud del navegador.',
      ],
    },
    'push-receive': {
      title: 'Recibe un push',
      why: 'Se envía por dispositivo y el navegador lo entrega incluso con la pestaña cerrada.',
      steps: ['Envíate el evento "Comment added" con push activado.'],
    },
    'push-click': {
      title: 'Haz clic en él',
      why: 'El clic pasa por la comprobación de enlaces de la plataforma y marca el elemento de la bandeja como leído.',
      steps: ['Haz clic en la notificación push.'],
    },
    'mcp-config': {
      title: 'Configura tu cliente MCP',
      why: 'Esta app es un servidor MCP. Cualquier cliente MCP inicia sesión con tu cuenta de BuildBase y actúa como tú.',
      steps: [
        'Abre Profile → Connected agents.',
        'Elige tu cliente en la guía y sigue sus pasos: la dirección del servidor es el /api/mcp de esta app.',
      ],
    },
    'mcp-connect': {
      title: 'Conecta un agente',
      why: 'El cliente descubre el servidor OAuth desde /.well-known, te hace iniciar sesión en las páginas alojadas y recibe un token que esta app emitió con su propio secreto.',
      steps: ['Reinicia el cliente y aprueba la conexión.'],
    },
    'mcp-call': {
      title: 'Pídele que liste tus documentos',
      why: 'Las herramientas integradas leen tu cuenta; las propias de la app leen y escriben sus datos, bajo tus permisos.',
      steps: [
        'Pregunta: "List my documents in BuildBase Demo".',
        'El agente llama a list_documents; el recorrido lo marca en cuanto una herramienta se ejecuta como tú.',
      ],
    },
    'mcp-write': {
      title: 'Pídele que cree uno',
      why: 'Una escritura a través de un agente se mide y se comprueba en permisos exactamente igual que un clic.',
      steps: [
        'Pregunta: "Create a document called Agent test".',
        'Eso necesita el scope documents:write que concediste en la pantalla de consentimiento.',
      ],
    },
    'agent-list': {
      title: 'Mira el agente conectado y desconéctalo',
      why: 'Cada concesión a un agente aparece con sus scopes y se puede revocar.',
      steps: ['Profile → Connected agents → Disconnect.'],
    },
    'llms-txt': {
      title: 'Lee lo que leen los agentes',
      why: 'llms.txt, el catálogo de la API y los documentos .well-known se generan desde una sola configuración.',
      steps: [
        'Abre /llms.txt, luego /.well-known/mcp/server-card.json y /openapi.json.',
      ],
    },
    'webhook-received': {
      title:
        'Mira un evento de la plataforma llegar a la base de datos de esta app',
      why: 'Suscripciones, espacios de trabajo y miembros cambian en la plataforma; los webhooks se lo cuentan a tu servidor, firmados.',
      steps: [
        'Haz algo que la plataforma note: invita a alguien, suscríbete, compra créditos.',
        'Abre Events: la tabla de webhooks lista lo que llegó, cada uno con la firma comprobada antes de guardarse.',
      ],
    },
    'sdk-events': {
      title: 'Mira también los eventos del navegador',
      why: 'El SDK emite eventos de ciclo de vida en el navegador; esta app los reenvía para mantener sus propias tablas al día.',
      steps: ['En Events, lee la tabla de eventos de la app.'],
    },
    'switch-language': {
      title: 'Cambia de idioma',
      why: 'Ocho idiomas en las pantallas propias del SDK y en esta app, con plurales ICU y numerales nativos.',
      steps: ['Usa el selector de idioma de la cabecera.'],
    },
    rtl: {
      title: 'Prueba el árabe',
      why: 'Diseño de derecha a izquierda en las pantallas del SDK, no solo cadenas traducidas.',
      steps: ['Cambia a العربية y abre Settings.'],
    },
    'dark-mode': {
      title: 'Activa el modo oscuro',
      why: 'Las pantallas del SDK siguen la clase .dark y las variables CSS de tu app.',
      steps: ['Usa el conmutador de tema.'],
    },
    'export-data': {
      title: 'Exporta tus datos',
      why: 'Artículo 15 del RGPD: los datos propios de esta app más tu perfil de la plataforma, en un solo archivo.',
      steps: ['Profile → Export my data.'],
    },
    'clone-it': {
      title: 'Llévatelo a casa',
      why: 'Todo lo que acabas de hacer está en este repositorio. Clónalo, apúntalo a tu organización y empieza desde aquí.',
      steps: [
        'git clone https://github.com/buildbase-app/nextjs-starter',
        'Copia .env.example a .env.local y rellena tu org y tu client.',
        'npm install && npm run dev',
      ],
    },
    'delete-account': {
      title: 'Elimina tu cuenta',
      why: 'Artículo 17 del RGPD: borrada aquí y en la plataforma.',
      steps: ['Profile → Delete my account. Esto termina el recorrido.'],
    },
  },
};
