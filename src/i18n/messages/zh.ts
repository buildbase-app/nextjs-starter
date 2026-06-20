import type { Messages } from '../types';

const messages: Messages = {
  common: {
    nav: {
      home: '首页',
      dashboard: '仪表板',
      documents: '文档',
      analytics: '分析',
      team: '团队',
      notifications: '通知',
      settings: '设置',
      menu: '菜单',
      selectWorkspace: '选择工作区',
      profile: '个人资料',
      manageWorkspace: '管理工作区',
      generalSettings: '常规设置',
      userManagement: '用户管理',
      billingPayments: '账单与支付',
      credits: 'Credits',
      creditUsage: 'Credit Usage',
      creditsAvailable: 'Available',
      usage: 'Usage',
      permissions: 'Permissions',
      events: 'Events',
      invoices: 'Invoices',
    },
    buttons: {
      signIn: '登录',
      signOut: '退出',
      submit: '提交',
      cancel: '取消',
      save: '保存',
      delete: '删除',
      edit: '编辑',
      create: '创建',
      loading: '加载中...',
    },
    auth: {
      signInPrompt: '请登录以继续',
      signOutConfirm: '您确定要退出吗？',
    },
    footer: {
      rights: '版权所有',
    },
    language: {
      select: '选择语言',
      current: '当前语言',
    },
    accessibility: {
      skipToContent: '跳转到内容',
    },
    theme: {
      toggle: '切换主题',
      light: '浅色',
      dark: '深色',
      system: '系统',
    },
    redirecting: '重定向中...',
  },
  home: {
    title: '我的应用',
    hero: {
      heading: '欢迎使用我的应用',
      description:
        '使用 Next.js、TypeScript、Tailwind CSS、shadcn/ui、next-themes 和 BuildBase SDK 构建。',
    },
    meta: {
      title: '我的应用',
      description: '我的 Next.js 应用程序，支持 shadcn/ui 和主题',
      tagline: '构建令人惊叹的东西',
    },
  },
  dashboard: {
    title: '仪表板',
    welcome: '欢迎回来，{name}！',
    cards: {
      workspace: {
        title: '当前工作区',
        empty: '未选择工作区',
      },
      role: {
        title: '您的角色',
        empty: '不适用',
      },
      email: {
        title: '邮箱',
      },
      status: {
        title: '状态',
        active: '活跃',
        inactive: '不活跃',
      },
    },
    quickActions: {
      title: '快速操作',
      createProject: '创建项目',
      viewReports: '查看报告',
      inviteTeam: '邀请团队成员',
    },
    pages: {
      documents: {
        title: '文档',
        description: '管理您的文档',
        placeholder: '文档内容将在此处显示。',
      },
      analytics: {
        title: '分析',
        description: '查看您的分析',
        placeholder: '分析内容将在此处显示。',
      },
      team: {
        title: '团队',
        description: '管理您的团队',
        placeholder: '团队管理内容将在此处显示。',
      },
      settings: {
        title: '设置',
        description: '管理您的设置',
        placeholder: '设置内容将在此处显示。',
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
    title: '定价',
    subtitle: '选择适合您需求的方案',
    billing: '计费',
    monthly: '月付',
    quarterly: '季付',
    yearly: '年付',
    perMonth: '/月',
    perQuarter: '/季',
    perYear: '/年',
    currency: '货币',
    quotas: '配额',
    limits: '限制',
    credits: 'AI Credits',
    creditsPerPeriod: 'credits / period',
    features: '功能',
    included: '包含',
    perUnit: '之后',
    loading: '正在加载方案...',
    noPlans: '暂无可用方案',
    error: '加载定价失败',
    meta: {
      title: '定价',
      description: '查看我们的方案和价格',
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
      title: '积分不足',
      description: '您的积分余额较低。请立即充值以避免中断。',
    },
    expiring: {
      title: '即将到期的积分',
      description: '未来30天内到期的积分',
      expiresIn: '{date}到期',
      noExpiring: '近期没有即将到期的积分',
      days: '{count}积分',
    },
    transactions: {
      title: '交易记录',
      description: '最近的积分添加和扣除',
      empty: '暂无交易记录',
      columns: {
        type: '类型',
        amount: '金额',
        balance: '交易后余额',
        description: '描述',
      },
      types: {
        credit: '充值',
        debit: '扣除',
      },
    },
  },
  errors: {
    generic: {
      title: '出了点问题',
      description: '发生了意外错误。请重试，如果问题仍然存在，请联系支持。',
      tryAgain: '重试',
      goHome: '返回首页',
    },
    notFound: {
      title: '页面未找到',
      description: '抱歉，我们找不到您要查找的页面。它可能已被移动或删除。',
      goBack: '返回',
    },
  },
};

export default messages;
