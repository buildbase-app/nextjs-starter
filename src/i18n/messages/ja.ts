import type { Messages } from '../types';

const messages: Messages = {
  common: {
    nav: {
      home: 'ホーム',
      dashboard: 'ダッシュボード',
      documents: 'ドキュメント',
      analytics: '分析',
      team: 'チーム',
      settings: '設定',
    },
    buttons: {
      signIn: 'サインイン',
      signOut: 'サインアウト',
      submit: '送信',
      cancel: 'キャンセル',
      save: '保存',
      delete: '削除',
      edit: '編集',
      create: '作成',
      loading: '読み込み中...',
    },
    auth: {
      signInPrompt: '続行するにはサインインしてください',
      signOutConfirm: 'サインアウトしてもよろしいですか？',
    },
    footer: {
      rights: '全著作権所有',
    },
    language: {
      select: '言語を選択',
      current: '現在の言語',
    },
  },
  home: {
    title: 'マイアプリ',
    hero: {
      heading: 'マイアプリへようこそ',
      description:
        'Next.js、TypeScript、Tailwind CSS、shadcn/ui、next-themes、BuildBase SDKで構築されています。',
    },
    meta: {
      title: 'マイアプリ',
      description:
        'shadcn/uiとテーマサポートを備えた私のNext.jsアプリケーション',
      tagline: '素晴らしいものを作ろう',
    },
  },
  dashboard: {
    title: 'ダッシュボード',
    welcome: 'おかえりなさい、{name}さん！',
    cards: {
      workspace: {
        title: '現在のワークスペース',
        empty: 'ワークスペースが選択されていません',
      },
      role: {
        title: 'あなたの役割',
        empty: 'N/A',
      },
      email: {
        title: 'メール',
      },
      status: {
        title: 'ステータス',
        active: 'アクティブ',
        inactive: '非アクティブ',
      },
    },
    quickActions: {
      title: 'クイックアクション',
      createProject: 'プロジェクトを作成',
      viewReports: 'レポートを見る',
      inviteTeam: 'チームメンバーを招待',
    },
    pages: {
      documents: {
        title: 'ドキュメント',
        description: 'ドキュメントを管理する',
      },
      analytics: {
        title: '分析',
        description: '分析を表示する',
      },
      team: {
        title: 'チーム',
        description: 'チームを管理する',
      },
      settings: {
        title: '設定',
        description: '設定を管理する',
      },
    },
  },
};

export default messages;
