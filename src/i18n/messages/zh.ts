import type { Messages } from '../types';

const messages: Messages = {
  common: {
    nav: {
      home: '首页',
      dashboard: '仪表板',
      documents: '文档',
      analytics: '分析',
      team: '团队',
      settings: '设置',
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
      },
      analytics: {
        title: '分析',
        description: '查看您的分析',
      },
      team: {
        title: '团队',
        description: '管理您的团队',
      },
      settings: {
        title: '设置',
        description: '管理您的设置',
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
