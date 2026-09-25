import type { Messages } from '../types';

const messages: Messages = {
  common: {
    nav: {
      home: 'ホーム',
      dashboard: 'ダッシュボード',
      documents: 'ドキュメント',
      team: 'チーム',
      notifications: '通知',
      settings: '設定',
      menu: 'メニュー',
      selectWorkspace: 'ワークスペースを選択',
      profile: 'プロフィール',
      manageWorkspace: 'ワークスペースを管理',
      generalSettings: '一般設定',
      userManagement: 'ユーザー管理',
      billingPayments: '請求・支払い',
      credits: 'クレジット',
      creditUsage: 'クレジット使用状況',
      creditsAvailable: '利用可能',
      usage: '使用状況',
      permissions: '権限',
      events: 'イベント',
      invoices: '請求書',
      workspace: 'ワークスペース',
      tour: 'ツアー',
      inbox: '受信箱',
      modules: 'モジュール',
      sections: {
        start: 'はじめに',
        product: 'プロダクト',
        billing: '請求',
        platform: 'プラットフォーム',
      },
      forms: 'フォーム',
      collections: 'コレクション',
      assets: 'アセット',
      links: '短縮リンク',
      audience: 'オーディエンス',
      tracking: 'トラッキング',
      automations: '自動化',
      reports: 'レポート',
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
      signOutConfirm: '本当にサインアウトしますか？',
    },
    footer: {
      rights: '全著作権所有',
      tagline:
        'BuildBase SDKの実際の動作を示すライブデモアプリです。サインインして、認証、ワークスペース、クレジット、プッシュ通知、i18nを探索してください。',
      sections: {
        product: '製品',
        resources: 'リソース',
        legal: '法律',
      },
      links: {
        features: '機能',
        pricing: '料金',
        dashboard: 'ダッシュボード',
        credits: 'クレジット',
        blog: 'ブログ',
        changelog: '変更履歴',
        tour: 'ツアー',
        github: 'GitHubのソース',
        privacy: 'プライバシーポリシー',
        terms: '利用規約',
      },
    },
    language: {
      select: '言語を選択',
      current: '現在の言語',
    },
    accessibility: {
      skipToContent: 'コンテンツにスキップ',
    },
    theme: {
      toggle: 'テーマを切り替え',
      light: 'ライト',
      dark: 'ダーク',
      system: 'システム',
    },
    pages: {
      lastUpdated: '最終更新:',
    },
    redirecting: 'リダイレクト中...',
  },
  home: {
    title: 'BuildBase Demo',
    hero: {
      badge: 'ライブデモ · {count}タスク',
      heading: 'BuildBaseのすべての機能を、<highlight>ひとつずつ</highlight>',
      description:
        'BuildBase SDKで作られた実際のアプリとガイド付きツアー。サインインして、登録、ワークスペース、請求、使用量、クレジット、通知、エージェント、Webhookを順に試し、それぞれの出どころを確認できます。',
      signInToExplore: 'サインインして探索',
      openDashboard: 'ダッシュボードを開く',
      viewSource: 'ソースを見る',
      builtWith: '使用技術',
    },
    stats: {
      languages: {
        label: 'このデモの言語数',
        sublabel: 'ヘッダーのトグルで切り替え',
      },
      tasks: {
        label: 'ツアーのタスク',
        sublabel: 'それぞれが試せる機能',
      },
      groups: {
        label: 'グループ',
        sublabel: 'サインインからWebhookまで',
      },
      authCode: {
        label: '認証コードの行数',
        sublabel: 'SDKがすべて処理',
      },
    },
    cta: {
      heading: 'すべての動作を確認する準備ができましたか？',
      description:
        'サインインしてフルダッシュボードを開き、ワークスペースの切り替え、クレジット消費、プッシュ通知の送信、8言語の切り替えを試してみてください。',
      signIn: 'サインインして探索',
      openDashboard: 'ダッシュボードを開く',
      howBuilt: '構築方法',
    },
    meta: {
      title: 'マイアプリ',
      description: 'shadcn/uiとテーマサポートを備えたNext.jsアプリ',
      tagline: '素晴らしいものを作ろう',
    },
  },
  dashboard: {
    title: 'ダッシュボード',
    welcome: 'おかえりなさい、{name}！',
    trial: {
      endingSoon: 'トライアル終了間近',
      endingSoonMsg:
        'トライアルはあと{days}日{s}で終了します。アクセスを維持するために今すぐアップグレードしてください。',
      upgrade: 'アップグレード',
      freeTrial: 'トライアル期間中です',
      daysRemaining: '残り{days}日',
      endsOn: 'トライアル終了日：{date}',
      active: 'トライアル有効',
      viewPlans: 'プランを見る',
      trialBadge: 'トライアル',
    },
    noSubscription: {
      title: '有効なサブスクリプションなし',
      hint: '有料機能をアンロックするにはサブスクリプションが必要です',
      choosePlan: 'プランを選択',
    },
    subscription: {
      title: 'サブスクリプション',
      description: '現在のプラン',
      loading: '読み込み中...',
      status: 'ステータス：{status}',
      activeSubscription: '有効なサブスクリプション',
      changePlan: 'プランを変更',
      noPlan: '有効なプランなし',
      choosePlan: 'プランを選択',
    },
    subscriptionGates: {
      whenSubscription: {
        title: 'サブスクリプションゲート',
        description: '有効なサブスクリプションでのみ表示',
        fallback:
          '有効なサブスクリプションがありません — このコンテンツを表示するにはアップグレードしてください。',
        content:
          '有効なサブスクリプションがあります — このカードが表示されています。',
      },
      whenSubscriptionToPlans: {
        title: 'プランゲート',
        description: '特定のプランでのみ表示',
        fallback: 'Pro / Enterprise / Growthプランに加入していません。',
        content:
          'Pro、Enterprise、またはGrowthに加入中 — プレミアムコンテンツがアンロックされました。',
      },
    },
    seatStatus: {
      title: 'シートステータス',
      description: 'メンバー数 vs プラン制限',
      members: 'メンバー',
      includedSeats: '含まれるシート',
      maxUsers: '最大ユーザー数',
      canInvite: '招待可能',
      yes: 'はい',
      no: 'いいえ',
      limitReached:
        'シート制限に達しました — 追加メンバーを招待するにはプランをアップグレードしてください。',
    },
    quickActionButtons: {
      inviteTeam: 'チームを招待',
      manageSubscription: 'サブスクリプションを管理',
      workspaceSettings: 'ワークスペース設定',
    },
    cards: {
      workspace: {
        title: '現在のワークスペース',
        empty: 'ワークスペース未選択',
      },
      role: {
        title: 'あなたの役割',
        empty: 'N/A',
        owner: 'オーナー',
      },
      email: {
        title: 'メールアドレス',
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
        description: 'ドキュメントを管理',
        placeholder: 'ドキュメントコンテンツがここに入ります。',
      },
      analytics: {
        title: '分析',
        description: '分析を表示',
        placeholder: '分析コンテンツがここに入ります。',
      },
      team: {
        title: 'チーム',
        description: 'チームを管理',
        placeholder: 'チーム管理コンテンツがここに入ります。',
      },
      settings: {
        title: '設定',
        description: '設定を管理',
        placeholder: '設定コンテンツがここに入ります。',
      },
    },
  },
  team: {
    title: 'チーム',
    description: 'ワークスペースメンバー',
    inviteMember: 'メンバーを招待',
    seatLimitReached:
      'シート制限に達しました — 追加メンバーを招待するにはプランをアップグレードしてください。',
    cards: {
      members: 'メンバー',
      includedSeats: '含まれるシート',
      maxUsers: '最大ユーザー数',
      availableSeats: '利用可能なシート',
    },
    memberList: {
      title: 'メンバー',
      count: 'このワークスペースに{count}名のメンバー',
      empty:
        'メンバーが読み込まれていません。認証されていることを確認してください。',
      roleFallback: 'メンバー',
      changeRole: 'ロールを変更',
    },
    invite: {
      title: 'メールで招待',
      description:
        'アドレスにアカウントは不要です。メールが届き、リンクを開いて登録またはサインインし、承諾します。',
      noPermission: 'あなたのロールではメンバーを招待できません。',
      emailPlaceholder: 'name@company.com',
      role: 'ロール',
      send: '招待を送信',
      sent: '{email} に招待を送信しました',
      failed: '問題が発生しました',
      resent: '招待を再送しました',
      revoked: '招待を取り消しました',
      seatNote: '保留中の招待 {count} 件は、回答があるまで席を確保します。',
      pendingTitle: '保留中',
      loading: '読み込み中…',
      none: '保留中はありません。',
      invitedBy: '{name} が招待',
      pendingLabel: '保留中',
      expires: '{date} に期限切れ',
      cooldown: '{seconds}秒後に再送できます',
      resend: '再送',
      revoke: '取り消し',
    },
    roleChanged: 'ロールを {role} に変更しました',
    manage: {
      title: 'メンバーを管理',
      description: '役割と招待を管理するには設定パネルを開いてください',
      openSettings: 'メンバー設定を開く',
      permissions: '権限',
    },
  },
  settings: {
    title: '設定',
    description: 'ワークスペース設定',
    card: {
      title: 'ワークスペース設定',
      description: 'セクションをクリックして設定パネルを開きます',
    },
    danger: {
      openButton: '危険ゾーンを開く',
    },
    sections: {
      profile: {
        label: 'プロフィール',
        description: '名前、アバター、個人データ',
      },
      general: {
        label: '一般',
        description: 'ワークスペース名、スラッグ、基本設定',
      },
      users: {
        label: 'メンバーと招待',
        description: 'チームメンバー、役割、保留中の招待を管理',
      },
      subscription: {
        label: 'サブスクリプション',
        description: '現在のプランを確認・変更',
      },
      usage: {
        label: '使用状況',
        description: 'クォータ消費と使用履歴',
      },
      credits: {
        label: 'クレジット',
        description: 'クレジット残高とチャージオプション',
      },
      features: {
        label: 'フィーチャーフラグ',
        description: 'ワークスペース機能の有効/無効',
      },
      notifications: {
        label: '通知',
        description: 'メールおよびプッシュ通知の設定',
      },
      permissions: {
        label: '権限',
        description: 'ロールベースアクセス制御の設定',
      },
      danger: {
        label: '危険ゾーン',
        description: 'ワークスペースの削除または所有権の移転',
      },
    },
  },
  documents: {
    featureGates: {
      title: '機能ゲート',
      description:
        'ワークスペースまたはユーザーの機能フラグで有効になる、この製品の部分。',
    },
    workbench: {
      title: 'あなたのドキュメント',
      description:
        'ドキュメントはこのアプリ自身のデータベースにあり、プラットフォームが計測します。',
      search: 'ドキュメントを検索',
      allStatuses: 'すべてのステータス',
      allTags: 'すべてのタグ',
      newDocument: '新しいドキュメント',
      newDocumentHint:
        '作成すると documents クォータに使用量が記録され、クレジットを1つ消費します。',
      titleLabel: 'タイトル',
      contentLabel: '内容（Markdown）',
      statusLabel: 'ステータス',
      tagsLabel: 'タグ（カンマ区切り）',
      create: '作成',
      creating: '作成中…',
      created: 'ドキュメントを作成しました',
      deleted: 'ドキュメントを削除しました',
      delete: '削除',
      loadSamples: 'サンプルを読み込む',
      clearSamples: 'サンプルを削除',
      samplesLoaded: 'サンプル{count}件を読み込みました',
      samplesAlready: 'サンプルは読み込み済みです',
      samplesCleared: 'サンプル{count}件を削除しました',
      sample: 'サンプル',
      empty: 'まだドキュメントはありません。',
      total: '合計{count}件',
      words: '{count}語',
      loadFailed: 'ドキュメントを読み込めませんでした',
      viewerNotice:
        'ここでのあなたの役割は{role}です。閲覧はできますが編集はできません。ボタンは無効で、サーバーも拒否します。',
      quotaExhausted:
        'このプランの documents クォータは使い切られ、超過は許可されていません。さらに作成するにはアップグレードしてください。',
      quotaExhaustedShort: 'クォータ上限',
      quotaWarning: 'このプランの documents クォータの80%以上を使用しました。',
      creditsLow:
        'クレジットが残り少なくなっています。ドキュメントごとに1つ消費します。',
      creditsExhausted:
        'クレジットがありません。ドキュメントは作成されますが、計測行に消費が省略されたことが表示されます。',
      refusedQuota:
        '拒否: {included}件中{consumed}件使用済みで、プランには上限があります。',
      refusedRole: '拒否: {role} ロールは書き込めません。',
      meteringTitle: 'プラットフォームが記録した内容',
      meteringUsage: '使用量: {included}件中{used}件',
      meteringUsageSkipped:
        '使用量: 未記録（このプランに documents クォータはありません）',
      meteringCredits: 'クレジット: {amount}消費、残り{balance}',
      meteringCreditsSkipped: 'クレジット: 未消費（残高なし）',
      statuses: {
        draft: '下書き',
        in_review: 'レビュー中',
        published: '公開済み',
        archived: 'アーカイブ',
      },
    },
    title: 'ドキュメント',
    description:
      'ワークスペースのドキュメント。ここで、またはエージェントが作成し、プラットフォームが計測します。',
    stats: {
      featureSections: 'フィーチャーセクション',
      featureSectionsSubtitle: 'ドキュメント機能',
      enabled: 'ワークスペースで有効',
      enabledSubtitle: 'アクティブな機能',
      locked: 'ロック済み',
      lockedSubtitle: '非アクティブな機能',
    },
    features: {
      enabled: '有効',
      disabled: '無効',
    },
    allFeatures: {
      title: 'すべてのワークスペース機能',
      description: 'すべてのフラグのステータス',
      empty: 'このワークスペースにはフィーチャーフラグが設定されていません。',
    },
    featureSections: {
      advancedExports: {
        label: '高度なエクスポート',
        description: 'ドキュメントをPDF、DOCX、CSVとしてエクスポート',
        content: 'PDF、Word、CSVエクスポートがプランで利用可能です。',
        lockedMessage:
          'エクスポートをアンロックするには高度なエクスポート機能を有効にしてください。',
      },
      documentSharing: {
        label: 'ドキュメント共有',
        description: '外部の共同作業者とドキュメントを共有',
        content: '共有リンクと外部コラボレーターアクセスが有効です。',
        lockedMessage:
          '外部アクセスを許可するにはドキュメント共有を有効にしてください。',
      },
      eSignatures: {
        label: '電子署名',
        description: '法的拘束力のある署名を収集',
        content: '電子署名の収集がアクティブです。',
        lockedMessage:
          'ドキュメントで署名を収集するには電子署名を有効にしてください。',
      },
    },
  },
  events: {
    webhooks: {
      title: '受信したWebhook',
      description:
        'プラットフォームからの署名付きサーバー間配信。このワークスペース向けに /api/webhooks/buildbase が保存します。',
      empty:
        'まだWebhookはありません。購読、招待、クレジット購入を行うとプラットフォームがこのアプリを呼び出します。',
      refresh: '更新',
      event: 'イベント',
      received: '受信',
      signature: '署名',
      verified: '検証済み',
      payload: 'ペイロード',
      when: 'プラットフォーム時刻',
    },
    title: 'SDKイベントログ',
    description: 'リアルタイムSDKイベント',
    clearButton: 'クリア',
    listenCard: {
      title: 'イベントをリッスン中',
      description:
        'これらのイベントはSDK使用時に自動的にトリガーされます — ワークスペースを変更、サインイン、またはメンバーを招待して確認してください。',
    },
    liveCard: {
      title: 'ライブストリーム',
      captured: '{count}件のイベントをキャプチャ',
      empty:
        'まだイベントがありません。ワークスペースを切り替えるかページをリロードしてみてください。',
    },
    eventLabels: {
      userCreated: 'ユーザーが作成されました',
      userUpdated: 'ユーザーが更新されました',
      workspaceChanged: 'ワークスペースが変更されました',
      workspaceUpdated: 'ワークスペースが更新されました',
      memberAdded: 'メンバーが追加されました',
      memberRemoved: 'メンバーが削除されました',
      roleChanged: '役割が変更されました',
      workspaceCreated: 'ワークスペースが作成されました',
      workspaceDeleted: 'ワークスペースが削除されました',
    },
  },
  invoices: {
    title: '請求書',
    description: '請求履歴',
    refresh: '更新',
    billingPortal: '請求ポータル',
    billingPortalOpening: '開いています…',
    error: '請求書の読み込みエラー。',
    card: {
      title: '請求書履歴',
      found: '{count}件の請求書が見つかりました',
      empty:
        'まだ請求書がありません。有料プランに登録後、請求書がここに表示されます。',
    },
    table: {
      date: '日付',
      amount: '金額',
      status: 'ステータス',
      description: '説明',
      links: 'リンク',
      view: '表示',
      pdf: 'PDF',
      loadMore: 'もっと読み込む',
    },
  },
  notifications: {
    title: '通知',
    description: 'このアプリから通知を送り、どこに届くか確かめます',
    pushCard: {
      title: 'ブラウザプッシュ通知',
      description: 'このデバイスのブラウザプッシュ通知を有効にする',
      subscribed: '登録済み',
      notSubscribed: '未登録',
      subscribe: '登録する',
      unsubscribe: '登録解除',
    },
    sendCard: {
      title: 'テスト通知を送信',
      description:
        'フィールドに入力して通知を送信します。{{name}}、{{workspaceName}}、{{url}}のラベルは自動的に解決されます。',
    },
    fields: {
      eventSlug: 'イベントスラッグ',
      eventSlugHint:
        'デモイベントは「{slug}」で、コンソールにメールとプッシュ付きで登録済みです。プッシュのみなら任意のスラッグで動きます。メールには登録済みイベントが必要です。',
      title: 'タイトル',
      message: 'メッセージ',
      url: 'URL',
      target: '送信先',
      channel: 'チャンネル',
    },
    placeholders: {
      eventSlug: '例：comment_added、deployment_success',
      title: '通知タイトル',
      message: 'Push本文＋メールメッセージ',
      url: 'Pushクリック時に開く',
    },
    buttons: {
      meOnly: '自分のみ',
      allMembers: 'すべてのメンバー',
      both: '両方',
      emailOnly: 'メールのみ',
      pushOnly: 'Pushのみ',
      showAdvanced: '高度なPushオプションを表示',
      hideAdvanced: '高度なPushオプションを非表示',
      send: '通知を送信',
      sending: '送信中...',
      silent: 'サイレント',
      requireInteraction: 'インタラクション必須',
      renotify: '再通知',
      default: 'デフォルト',
    },
    advanced: {
      media: 'メディア',
      behavior: 'Push動作',
      delivery: 'デリバリー',
      actions: 'アクションボタン（最大2つ）',
      iconUrl: 'アイコンURL',
      imageUrl: '画像URL',
      badgeUrl: 'バッジURL',
      tag: 'タグ',
      tagHint: '同じタグの通知をスタックせずに置き換える',
      behaviorHint:
        'サイレント＝音なし。インタラクション必須＝ユーザー操作まで残る。再通知＝置き換え時に音を出す。',
      urgency: '緊急度',
      ttl: 'TTL（秒）',
      schedule: 'スケジュール（ISO 8601）',
      action1: 'アクション1',
      action2: 'アクション2',
      actionTitlePlaceholder: 'ボタンラベル（例：返信）',
      actionKeyPlaceholder: 'アクションキー（例：reply）',
      iconUrlPlaceholder: 'Pushアイコン（組織アイコンにフォールバック）',
      imageUrlPlaceholder: 'Push本文の大きな画像',
      badgeUrlPlaceholder: 'ステータスバーアイコン（Android）',
      ttlPlaceholder: '86400（デフォルト24時間）',
    },
    context: {
      workspace: 'ワークスペース：',
      user: 'ユーザー：',
      none: '未選択',
    },
    resultCard: {
      title: 'レスポンス',
      description: 'プラットフォームがこの送信をどう処理したか。',
      openInbox: '受信箱を開く',
    },
    toast: {
      workspaceRequired: '最初にワークスペースを選択してください',
      sent: '{count}名のユーザーに通知を送信しました',
      notSent: '通知が送信されませんでした：{reason}',
      inboxHint: 'ベルと受信箱を確認してください。',
      pushEnabled: 'プッシュ通知が有効になりました',
      pushDisabled: 'プッシュ通知が無効になりました',
      pushFailed: 'プッシュ通知の変更に失敗しました',
      networkError: 'ネットワークエラー — サーバーに接続できませんでした',
    },
  },
  permissions: {
    title: '権限',
    description: 'リアルタイム権限解決',
    cards: {
      role: 'あなたの役割',
      owner: 'オーナー',
      ownerYes: 'はい',
      ownerNo: 'いいえ',
      granted: '付与された権限',
    },
    ownerAdmin: {
      title: 'オーナー / 管理者のみ',
      notVisible: 'あなたの役割（{role}）では表示されません。',
      visible: 'あなたはオーナーまたは管理者のためこれが表示されています。',
    },
    allMembers: {
      title: 'すべてのメンバー',
      notMember: 'あなたはこのワークスペースのメンバーではありません。',
      visible: 'あなたはワークスペースのメンバーのためこれが表示されています。',
    },
    matrix: {
      title: '権限マトリックス',
      description: '現在の役割に対してすべての権限を確認',
      denied: '拒否',
      grantedStatus: '付与済み',
    },
  },
  profile: {
    agents: {
      title: '接続済みエージェント',
      description:
        'MCP経由であなたとして動作することを許可したAIクライアント。切断するとアクセスが取り消されます。',
      guideTitle: 'エージェントを接続',
      guideDescription:
        'このアプリはMCPサーバーです。Claude、Cursor、ChatGPTに追加してBuildBaseアカウントでサインインすると、エージェントがあなたの権限でワークスペースとこのアプリのドキュメントを読み取ります。',
    },
    title: 'ユーザープロフィール',
    description: 'ユーザー属性とフィーチャーフラグ',
    identity: {
      title: 'アイデンティティ',
      subtitle: 'useSaaSAuth()より',
      name: '名前',
      email: 'メールアドレス',
      role: '役割',
      id: 'ID',
    },
    workspaceFeatures: {
      title: 'ワークスペースフィーチャーフラグ',
      enabled: '有効',
      disabled: '無効',
    },
    attributes: {
      title: 'ユーザー属性',
      description: 'ユーザーごとのカスタムキーバリューペア',
      empty: 'まだ属性が設定されていません。',
      setTitle: '属性を設定（デモ）',
      keyPlaceholder: 'キー（例：theme）',
      valuePlaceholder: '値',
      saving: '保存中…',
      save: '保存',
      saved: '保存しました！',
      failed: '保存に失敗しました。',
    },
    userFeatures: {
      title: 'ユーザーフィーチャーフラグ',
      description: 'ユーザーレベルのフィーチャーフラグ',
      empty: 'このユーザーにはフラグが設定されていません。',
      loading: '読み込み中...',
      enabled: '有効',
      disabled: '無効',
    },
  },
  usage: {
    title: 'クォータ使用状況',
    description: 'リアルタイムクォータ消費',
    loading: 'クォータを読み込み中...',
    error: 'クォータデータの読み込みエラー。',
    empty: 'このワークスペースにはクォータが設定されていません。',
    quotaCard: {
      remaining: '{count}残り',
      unlimited: '無制限',
      exhausted: '使い切り',
      overage: '超過',
      threshold: '80%以上使用済み（{pct}%）— 制限に近づいています',
      overageMsg: '{count}ユニット超過',
      exhaustedMsg:
        'クォータを使い切りました — このクォータを使用するアクションはブロックされています',
      used: '使用済み',
      overageAllowed: '（許可）',
    },
    record: {
      title: '使用状況を記録',
      description: 'クォータ使用状況を手動で記録',
      slugPlaceholder: 'クォータスラッグ（例：api_calls）',
      qtyPlaceholder: '数量',
      recording: '記録中…',
      record: '記録',
      success: '「{slug}」に{qty}ユニットを記録しました。',
      failed: '使用状況の記録に失敗しました。',
    },
    logs: {
      title: '使用状況ログ',
      description: '最近の使用状況エントリ',
      loading: 'ログを読み込み中…',
      empty:
        'まだ使用状況エントリがありません。エントリを表示するには以下で使用状況を記録してください。',
      table: {
        quota: 'クォータ',
        quantity: '数量',
        source: 'ソース',
        date: '日付',
      },
    },
  },
  creditStore: {
    title: 'クレジットパッケージ',
    subtitle:
      'AI生成、エクスポートなどのプレミアム機能をアンロックするためにクレジットを購入してください。',
    buy: 'クレジットを購入',
    validFor: '{days}日間有効',
    noExpiry: '有効期限なし',
    noPackages: '現在クレジットパッケージがありません。',
    error: 'クレジットパッケージの読み込みエラー',
  },
  pricing: {
    title: '料金',
    subtitle: 'ニーズに合ったプランを選択してください',
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
    credits: 'AIクレジット',
    creditsPerPeriod: 'クレジット / 期間',
    features: '機能',
    included: '含まれる',
    perUnit: 'それ以降',
    loading: 'プランを読み込み中...',
    noPlans: 'プランがありません',
    error: '料金の読み込みエラー',
    meta: {
      title: '料金',
      description: 'プランと料金を確認',
    },
  },
  credits: {
    title: 'クレジット',
    description:
      'プレミアムアクションにクレジットを使用してください。ワークスペース設定でパッケージを管理できます。',
    balance: 'クレジット残高',
    creditsAvailable: 'クレジット利用可能',
    manageCredits: 'クレジットを管理',
    buyCredits: 'クレジットを購入',
    choosePlan: 'プランを選択',
    noCredits:
      'クレジットが残っていません。プレミアム機能を引き続き使用するには追加購入してください。',
    buyMore: 'クレジットを購入',
    packages: {
      title: 'クレジットパッケージ',
      loading: 'パッケージを読み込み中…',
      error: 'パッケージの読み込みエラー。',
      empty: 'まだクレジットパッケージが設定されていません。',
      credits: 'クレジット',
      validFor: '{days}日間有効',
      buyNow: '今すぐ購入',
    },
    testConsume: {
      title: 'クレジット消費テスト',
      description:
        'これらのボタンを使用して残高からのクレジット消費をテストしてください。',
      use: '{amount}を使用',
      apiDescription: 'テスト：{amount}クレジットを消費',
      success: '{amount}クレジットを消費しました。残高：{balance}',
      insufficient:
        'クレジットが不足しています。利用可能：{available}、要求：{requested}',
    },
    lowCredits: {
      title: 'クレジット残高が少ない',
      description:
        'クレジット残高が少なくなっています。中断を避けるために今すぐチャージしてください。',
    },
    expiring: {
      title: 'まもなく期限切れのクレジット',
      description: '今後30日以内に期限切れになるクレジット',
      expiresIn: '{date}に期限切れ',
      noExpiring: 'まもなく期限切れになるクレジットはありません',
      days: '{count}クレジット',
      loading: '読み込み中...',
    },
    transactions: {
      title: '取引履歴',
      description: '最近のクレジット追加・差引',
      empty: 'まだ取引がありません',
      loading: '読み込み中...',
      columns: {
        type: '種類',
        amount: '金額',
        balance: '取引後残高',
        description: '説明',
      },
      types: {
        credit: 'クレジット',
        debit: 'デビット',
      },
    },
  },
  errors: {
    generic: {
      title: 'エラーが発生しました',
      description:
        '予期しないエラーが発生しました。もう一度試すか、問題が続く場合はサポートにお問い合わせください。',
      tryAgain: '再試行',
      goHome: 'ホームへ',
    },
    notFound: {
      title: 'ページが見つかりません',
      description:
        '申し訳ありませんが、お探しのページが見つかりませんでした。移動または削除された可能性があります。',
      goBack: '戻る',
    },
    blogNotFound: {
      title: '投稿が見つかりません',
      description:
        'お探しのブログ投稿は存在しないか、削除されたか、お使いの言語では利用できない可能性があります。',
      browseAll: 'すべての投稿を見る',
    },
  },
  blog: {
    label: 'ブログ',
    heading: '最新の投稿',
    description: 'チームからのアップデート、チュートリアル、インサイト。',
    noPosts: 'まだ投稿がありません。またご確認ください！',
    noPostsTag: 'このタグの投稿はまだありません。',
    noPostsCategory: 'このカテゴリの投稿はまだありません。',
    noPostsAuthor: 'この著者の投稿はまだありません。',
    postsByAuthor: '{name}の投稿',
    postsTaggedCount: '"{tag}"のタグが付いた投稿が{count}件',
    postsInCategoryCount: 'このカテゴリに{count}件の投稿',
    readMore: '続きを読む',
    read: '読む',
    allPosts: '← すべての投稿',
    previous: '前へ',
    next: '次へ',
    pageOf: '{page} / {total} ページ',
    relatedPosts: '関連投稿',
    share: 'シェア',
    rssLabel: 'RSSフィード',
    shareAriaX: 'X / Twitterでシェア',
    shareAriaLinkedin: 'LinkedInでシェア',
    shareAriaFacebook: 'Facebookでシェア',
    shareAriaCopy: 'リンクをコピー',
    shareAriaCopied: 'リンクをコピーしました！',
    search: {
      trigger: '投稿を検索...',
      placeholder: 'ブログを検索...',
      searching: '検索中...',
      noResults: '「{query}」の結果が見つかりません',
      startTyping: '検索するには入力してください...',
    },
    meta: {
      title: 'ブログ',
      titlePage: 'ブログ — {page}ページ目',
      description: 'チームからの最新の投稿、チュートリアル、アップデート。',
      tagTitle: '「{tag}」タグの投稿',
      tagDescription: '「{tag}」タグの付いたすべてのブログ投稿。',
      categoryTitle: '{category} — ブログ',
      categoryDescription: '「{category}」カテゴリのブログ投稿。',
    },
  },
  changelog: {
    label: '変更履歴',
    heading: '新着情報',
    description: '最新のアップデート、改善、修正をすべてご覧ください。',
    rssLabel: 'RSSフィード',
    permalink: 'パーマリンク',
    meta: {
      title: '変更履歴',
      description: '最新のアップデート、改善、修正をすべてご覧ください。',
    },
  },
  cookieConsent: {
    title: 'Cookieを使用しています',
    descriptionBefore:
      '当サイトでは、ユーザー体験の向上、トラフィックの分析、コンテンツのパーソナライズのためにCookieを使用しています。許可するCookieを選択できます。',
    policyLinkPrivacy: 'プライバシーポリシー',
    policyLinkCookie: 'Cookieポリシー',
    dismissAriaLabel: '今は閉じる',
    necessary: {
      title: '必要',
      description: 'サイトの機能に必要です。無効にできません。',
    },
    analytics: {
      title: 'アナリティクス',
      description:
        '訪問者がサイトをどのように使用しているかを把握するのに役立ちます。',
    },
    marketing: {
      title: 'マーケティング',
      description: '関連広告の配信とキャンペーンの追跡に使用されます。',
    },
    acceptAll: 'すべて承諾',
    rejectAll: 'すべて拒否',
    savePreferences: '設定を保存',
    loads: '読み込み: {names}',
    customize: 'カスタマイズ',
  },
  inbox: {
    title: '受信箱',
    description:
      'このアプリがあなたに送ったすべて。配信方法にかかわらず、通知ごとに1件です。',
    rules: {
      live: '新しい項目はソケットでリアルタイムに届きます。再読み込みは不要です。',
      read: 'ここで開くか、リンクをクリックすると既読になります。メールを開くだけでは既読になりません。',
      email:
        '各項目にメールとプッシュの結果が表示されるので、チャネルが動かなかった理由が分かります。',
    },
  },
  tour: {
    title: 'ツアー',
    subtitle:
      '試せることが{total}件。それぞれがBuildBaseの機能と、その出どころです。',
    progress: '{total}件中{done}件完了',
    markDone: '完了にする',
    undo: '元に戻す',
    open: '開く',
    detected: '自動で検出されます',
    manual: 'ご自身で確認',
    why: 'なぜ重要か',
    steps: 'やること',
    fromSdk: 'SDKから',
    fromConsole: 'コンソールで設定',
    fromApp: 'このアプリ内',
    requires: '先にやること',
    allDone: 'すべて完了しました。持ち帰りましょう。',
    homeTitle: 'ひとつずつ、すべて試す',
    homeSubtitle:
      'サインインして{groups}グループ・{total}件のタスクを進めます。それぞれがBuildBaseの機能、アプリでの見え方、設定場所を示します。',
    homeCta: 'ツアーを始める',
    dashboardCard: 'あなたのツアー',
    next: '次',
    cloneTitle: 'このアプリをクローン',
    cloneBody:
      'ここにあるすべてのページとタスクは、ひとつの公開リポジトリにあります。仕組みを読むことも、クローンして自分のアプリを始めることもできます。',
    browseCode: 'コードを見る',
    copy: 'コピー',
    copied: 'コピーしました',
    dashboardCta: '続ける',
  },
  help: {
    title: 'ヘルプセンター',
    description:
      'このページの内容はすべてコンソールで書かれています：ポリシー、ドキュメント、FAQ、お客様の声。そこで変更し、ここで再読み込みしてください。',
    notConfigured: {
      title: 'まだコンテンツがありません',
      token:
        'このアプリには組織のAPIトークンがないため、コンソールのコンテンツを読めません。BUILDBASE_API_TOKENを設定してください。',
      empty: '組織にはまだデモコンテンツがありません。次で作成できます：',
    },
    from: {
      richContent: 'リッチコンテンツ',
      docs: 'ドキュメント',
      faqs: 'FAQコレクション',
      testimonials: 'お客様の声',
    },
    docs: {
      title: 'ドキュメント',
      empty: '公開されたドキュメントはまだありません。',
    },
    faq: {
      title: 'よくある質問',
    },
    testimonials: {
      title: 'お客様の声',
    },
  },
  forms: {
    title: 'フォーム',
    description:
      'コンソールで作ったフォームを、そのライブスキーマから描画し、このアプリから送信します。',
    loading: 'フォームを読み込み中…',
    fromConsole:
      'フィールドはコンソールから来ます。そこで追加して再読み込みしてください。',
    submit: '送信',
    sending: '送信中…',
    sent: '送信済み',
    hint: '送信内容はコレクションのレコードとして保存され、form.submittedイベントを発火します。',
    errors: {
      title: 'プラットフォームがこの送信を拒否しました',
      generic: '受け付けられない項目があります。',
    },
    missing: {
      title: 'お問い合わせフォームがまだありません',
      token:
        'このアプリには組織のAPIトークンがありません。BUILDBASE_API_TOKENを設定してください。',
      form: '組織にContactという名前のフォームがありません。次で作成できます：',
    },
    toast: {
      sent: '送信しました。プラットフォーム上のレコードになりました。',
    },
    submissions: {
      title: '最近の送信',
      description: 'フォームのコレクションから読み戻しています。',
      refresh: '更新',
      empty: 'まだ送信はありません。',
    },
  },
  collections: {
    title: 'コレクション',
    description:
      'プラットフォーム上のカスタムデータ：バージョン管理されたスキーマと、ライブバージョンに対するレコード。',
    loading: 'レコードを読み込み中…',
    liveVersion: 'ライブバージョン {version}（{name}）、{fields} フィールド',
    noLiveVersion:
      'ライブバージョンがありません。コンソールで公開してください。',
    refresh: '更新',
    empty: 'レコードがありません。シードするかコンソールで追加してください。',
    actions: '操作',
    delete: 'レコードを削除',
    hint: 'コンソールでフィールドを追加した新バージョンを公開すると、再読み込みでここに列が現れます。',
    missing: {
      title: 'release-notesコレクションがまだありません',
      token:
        'このアプリには組織のAPIトークンがありません。BUILDBASE_API_TOKENを設定してください。',
      collection:
        '組織にスラッグrelease-notesのコレクションがありません。次で作成できます：',
    },
    toast: {
      deleted: 'プラットフォーム上のレコードを削除しました。',
      deleteFailed: 'レコードを削除できませんでした。',
    },
  },
  tracking: {
    title: 'トラッキング',
    description:
      'コンソールで設定した分析・広告タグを同意後に読み込み、独自イベントとアトリビューションを扱います。',
    loading: '読み込み中…',
    consent: {
      title: '同意',
      description:
        'このアプリに紐づくタグから構成され、ライブラリ全体からではありません。',
      noTags:
        'このアプリにタグはまだ紐づいていません。コンソールの設定 → トラッキングで追加し、クライアントに紐づけてください。',
      privacy: 'プライバシー',
      analytics: '分析',
      marketing: 'マーケティング',
      change: 'Cookieの設定を変更',
      state: '現在の状態',
      unset: '未回答',
    },
    installed: {
      title: '読み込まれたプロバイダー',
      description: '同意後にこのブラウザーで実際に読み込まれたもの。',
      none: '何も読み込まれていません。同意するか、コンソールでタグを紐づけてください。',
    },
    custom: {
      title: 'カスタムイベントを送る',
      description:
        '独自イベントはデータレイヤーと読み込まれた各ベンダーに届きます。',
      button: 'report_exported を送る',
      fired: '{count} 回送信',
    },
    attribution: {
      title: 'アトリビューション',
      description:
        '訪問者の流入元：最初のページで取得したクリックIDとキャンペーンパラメーター。',
      empty: '取得なし。次を付けて再読み込み:',
    },
    log: {
      title: 'ライブイベントログ',
      description: 'このタブでSDKが送ったすべてのイベント（自動送信を含む）。',
      empty:
        'イベントはまだありません。ページを移動するか、上で送ってください。',
    },
  },
  automations: {
    title: '自動化',
    description:
      'ワークフローはコンソールで作ります。このアプリはそのイベントを発生させ、あなた向けに実行された内容を読み取ります。',
    refresh: '更新',
    loading: '読み込み中…',
    notConfigured:
      'BUILDBASE_API_TOKEN が未設定のため、実行履歴を読み取れません。',
    error: '実行履歴を読み込めませんでした',
    runs: {
      title: 'あなたの実行',
      description:
        'プラットフォームがあなたのアカウント向けに開始したワークフローインスタンス。',
      empty:
        'まだ実行はありません。お問い合わせフォームを送信するか新規ユーザーを登録して更新してください。',
      workflow: 'ワークフロー',
      event: 'イベント',
      status: '状態',
      nodes: '完了ノード',
      started: '開始',
    },
    calls: {
      title: 'このアプリへの呼び出し',
      description:
        'ワークフローの HTTP Webhook アクションが /api/buildbase/provision に送った内容。共有シークレットで検証済み。',
      empty: 'プロビジョニング呼び出しはまだありません。',
    },
  },
  reports: {
    title: 'レポート',
    description:
      '各モジュールは同じチャート・カウントのエンドポイントで報告します。直近30日の3つを表示。',
    notConfigured:
      'BUILDBASE_API_TOKEN が未設定のため、レポートを読み取れません。',
    loading: '読み込み中…',
    refresh: '更新',
    window: '{from} 〜 {to}',
    counts: {
      current: 'ユーザー（直近30日）',
      previous: 'ユーザー（その前の30日）',
    },
    unavailable: '利用不可',
    series: {
      users: {
        title: '登録',
        description: '1日あたりの新規ユーザー。',
      },
      forms: {
        title: 'フォーム送信',
        description: '1日あたりのお問い合わせフォーム送信。',
      },
      links: {
        title: 'リンククリック',
        description: '1日あたりの短縮リンククリック。',
      },
    },
  },
  assets: {
    title: 'アセット',
    description:
      'このアプリからアップロードし、プラットフォームが保存・配信するファイル。',
    upload: 'ファイルをアップロード',
    uploading: 'アップロード中…',
    limit: '5 MBまで。画像はプレビュー表示されます。',
    uploaded: 'アップロードしました',
    gallery: 'ファイル',
    empty: 'まだファイルがありません。上からアップロードしてください。',
    public: '公開',
    private: '非公開',
    makePrivate: '非公開にする',
    makePublic: '公開にする',
    nowPublic: '公開になりました。URLが再び有効です。',
    nowPrivate: '非公開になりました。公開URLは無効になります。',
    openUrl: '開く',
    tooLarge: 'このファイルは5 MBを超えています。',
    loadFailed: 'プラットフォームに接続できませんでした。',
    notConfigured:
      'このページはAPIトークンで組織を読み取ります。BUILDBASE_API_TOKEN（コンソール → Settings → Tokens）を設定して再起動してください。',
  },
  links: {
    title: '短縮リンク',
    description:
      'プラットフォームがリダイレクトし、クリックを1件ずつ数える共有リンク。',
    create: '短縮リンクを作成',
    createHint:
      '任意のURL。プラットフォームが12文字のIDを発行し、国とデバイスとともに全クリックを記録します。',
    name: '名前',
    url: 'リンク先URL',
    createButton: '作成',
    created: 'リンクを作成しました',
    yourLinks: 'あなたのリンク',
    clicksHint:
      'リンクを開いてから更新してください。件数はこのページではなくプラットフォームから来ます。',
    refresh: '更新',
    empty: 'まだリンクがありません。',
    clicks: 'クリック',
    copy: '短縮URLをコピー',
    copied: 'コピーしました',
    follow: '開く',
    changeDestination: 'リンク先を変更',
    save: '保存',
    cancel: 'キャンセル',
    updated: 'リンク先を変更しました。短縮URLは同じです。',
    chart: 'クリック数（過去14日）',
    chartHint: '全リンク合計、日別。',
    chartEmpty: 'まだクリックがありません。',
    loadFailed: 'プラットフォームに接続できませんでした。',
    notConfigured:
      'このページはAPIトークンで組織を読み取ります。BUILDBASE_API_TOKEN（コンソール → Settings → Tokens）を設定して再起動してください。',
  },
  audience: {
    title: 'オーディエンスと属性',
    description:
      'アカウント以外にプラットフォームが保持する情報：カスタム属性、マーケティング連絡先、ウェイトリスト。',
    failed: '保存できませんでした。',
    notConfigured:
      'ニュースレターにはサーバー側のBUILDBASE_API_TOKENが必要です。',
    onboarding: {
      title: 'オンボーディングチェックリスト',
      description:
        '3つにチェックして保存すると、SDKがブラウザからあなたとして onboarded=true と役職をユーザー属性に書き込みます。',
      items: {
        profile: 'プロフィールを入力した',
        workspace: 'ワークスペースを作成した',
        invite: '誰かを招待した',
      },
      role: '役職（任意）',
      save: 'オンボーディングを完了',
      saved: '保存しました。コンソールで自分のレコードを開いて確認できます。',
      already: '属性によると、すでにオンボーディング済みです。',
    },
    attributes: {
      title: 'あなたの属性',
      description:
        'キーはコンソール（Users → Attributes）で定義され、値はユーザーに保存されます。',
      empty: 'まだ属性がありません。',
    },
    locale: {
      title: '国・タイムゾーン・通貨',
      description:
        'リストはSDK（@buildbase/sdk/data）に同梱、ダウンロード不要。',
      country: '国',
      timezone: 'タイムゾーン',
      currency: '通貨',
      save: '設定を保存',
      saved: '設定を属性として保存しました。',
    },
    newsletter: {
      title: 'ニュースレター',
      description:
        'マーケティング連絡先はアカウントとは別で、アカウントなしでも存在できます。サーバーが組織トークンで作成し、ニュースレターリストに追加します。',
      email: 'メール',
      subscribe: '購読',
      subscribed: '購読しました',
      listed: '{list} リストに追加しました。',
      noList:
        '連絡先を作成しました。この組織にはまだニュースレターリストがありません。',
      waitlistHint:
        'サインアウト中の訪問者はベータ版ウェイトリストに参加できます：',
    },
  },
  waitlist: {
    title: 'ウェイトリストに参加',
    description:
      'プラットフォームのベータフォーム：名前とメールを残すと、管理者がコンソールで承認します。',
    success: 'リストに登録されました。管理者がコンソールから承認します。',
    note: 'フォームと文言は組織のベータ設定（コンソール → Users → Beta）から来ています。',
  },
};

export default messages;
