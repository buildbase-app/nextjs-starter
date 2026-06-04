import type { Messages } from '../types';

const messages: Messages = {
  common: {
    nav: {
      home: 'ホーム',
      dashboard: 'ダッシュボード',
      documents: 'ドキュメント',
      analytics: '分析',
      team: 'チーム',
      notifications: '通知',
      settings: '設定',
      menu: 'メニュー',
      selectWorkspace: 'ワークスペースを選択',
      profile: 'プロフィール',
      manageWorkspace: 'ワークスペース管理',
      generalSettings: '一般設定',
      userManagement: 'ユーザー管理',
      billingPayments: '請求と支払い',
      credits: 'Credits',
      creditUsage: 'Credit Usage',
      creditsAvailable: 'Available',
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
    accessibility: {
      skipToContent: 'コンテンツへスキップ',
    },
    theme: {
      toggle: 'テーマを切り替え',
      light: 'ライト',
      dark: 'ダーク',
      system: 'システム',
    },
    redirecting: 'リダイレクト中...',
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
        placeholder: 'ドキュメントのコンテンツはここに表示されます。',
      },
      analytics: {
        title: '分析',
        description: '分析を表示する',
        placeholder: '分析のコンテンツはここに表示されます。',
      },
      team: {
        title: 'チーム',
        description: 'チームを管理する',
        placeholder: 'チーム管理のコンテンツはここに表示されます。',
      },
      settings: {
        title: '設定',
        description: '設定を管理する',
        placeholder: '設定のコンテンツはここに表示されます。',
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
    title: '料金プラン',
    subtitle: 'ニーズに合ったプランをお選びください',
    billing: '請求',
    monthly: '月額',
    quarterly: '四半期',
    yearly: '年額',
    perMonth: '/月',
    perQuarter: '/四半期',
    perYear: '/年',
    currency: '通貨',
    quotas: 'クォータ',
    limits: '制限',
    credits: 'AI Credits',
    creditsPerPeriod: 'credits / period',
    features: '機能',
    included: '含まれる',
    perUnit: 'その後',
    loading: 'プランを読み込み中...',
    noPlans: '利用可能なプランはありません',
    error: '料金の読み込みに失敗しました',
    meta: {
      title: '料金プラン',
      description: 'プランと料金を見る',
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
  },
  errors: {
    generic: {
      title: '問題が発生しました',
      description:
        '予期しないエラーが発生しました。もう一度お試しいただくか、問題が解決しない場合はサポートにお問い合わせください。',
      tryAgain: 'もう一度試す',
      goHome: 'ホームに戻る',
    },
    notFound: {
      title: 'ページが見つかりません',
      description:
        '申し訳ありませんが、お探しのページが見つかりませんでした。移動または削除された可能性があります。',
      goBack: '戻る',
    },
  },
};

export default messages;
