import type { Messages } from '../types';

const messages: Messages = {
  common: {
    nav: {
      cart: 'カート',
      bookings: '予約',
      orders: '注文',
      shop: 'ショップ',
      affiliates: 'アフィリエイト',
      home: 'ホーム',
      dashboard: 'ダッシュボード',
      documents: 'ドキュメント',
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
      heading: 'どのチームも作り直す SaaS の部分は、もう作らなくていい。',
      listLabel: 'このアプリで動いているもの：',
      checklist: [
        'サインイン',
        'ワークスペース',
        'チーム',
        '課金',
        '利用上限',
        'クレジット',
        '通知',
        'Webhook',
        'エージェント連携',
      ],
      description:
        'BuildBase SDK で動く本物の Next.js アプリです。サインインして {count} 個のタスクを進めると、それぞれの裏にあるフック、コンソール画面、このリポジトリのファイルがわかります。',
      start: 'ツアーを始める',
      viewSource: 'ソースを読む',
      cloneLabel: 'クローン用コマンド',
      copy: 'コピー',
      copied: 'コピーしました',
    },
    demo: {
      heading: '呼び出しひとつで、動く機能ひとつ',
      description:
        'ステップを選ぶと、SDK の呼び出しと表示結果が見られます。どれもツアーのタスクです。',
      tablist: 'SDK の例',
      preview: '呼び出しの表示結果',
      tryIt: 'ツアーで試す',
      steps: {
        signIn: {
          label: 'サインイン',
          result: 'サインイン済み',
          detail: 'このデバイスのセッション',
        },
        workspace: {
          label: 'ワークスペース',
          result: 'ワークスペースを作成',
          detail: '{count, plural, other {メンバー # 人}}',
        },
        plan: {
          label: '購読',
          result: 'プランが有効',
          detail: '毎月更新',
        },
        credits: {
          label: 'クレジット',
          result: '1 クレジットを消費',
          detail: '{count, plural, other {残り # クレジット}}',
        },
        notify: {
          label: '通知',
          result: 'ドキュメントに新しいコメント',
          detail: '受信箱、メール、プッシュに配信',
        },
      },
    },
    tourMap: {
      label: '点のひとつひとつがツアーのタスクで、列はグループごとです。',
      signedOut: 'サインインすると、終えたタスクから埋まっていきます。',
      progress: '{done, plural, other {{total} 個中 # 個のタスクが完了}}',
    },
    webhook: {
      heading: 'プラン変更がデータベースに届くまで',
      description:
        '顧客がプランを変えると、BuildBase があなたのサーバーに知らせます。このアプリでイベントがたどる道筋を一歩ずつ見られます。',
      play: 'アップグレードを再生',
      replay: 'もう一度再生',
      retry: 'もう一度送る',
      retried: '再配信：同じ行のまま、重複なし。',
      source: 'ハンドラーを読む',
      tryIt: 'ツアーで試す',
      status: 'ステップ {step}/{total}：{title}',
      stages: {
        click: {
          title: '顧客がアップグレード',
          body: 'プラン選択から Starter を Team に。',
        },
        send: {
          title: 'BuildBase が署名して送信',
          body: 'タイムスタンプと本文に対する HMAC-SHA256 署名。',
        },
        verify: {
          title: 'サーバーが検証',
          body: 'parseWebhookEvent は不正な署名や 5 分より古いものを拒否します。',
        },
        store: {
          title: 'Postgres に 1 行',
          body: 'キーは本文のハッシュなので、再送されても同じ行に入ります。',
        },
      },
    },
    agentPrompt: {
      label: 'コーディングエージェント用のプロンプト',
    },
    facts:
      '<n>{groups}</n> グループに <n>{tasks}</n> 個のタスク、<n>{languages}</n> 言語対応、手書きの認証コードは <n>0</n> 行。',
    cta: {
      heading: 'クローンするか、まず触ってみるか。',
      description:
        'アプリはオープンソースです。このページの画面はすべてリポジトリにあり、あなたがインストールするのと同じ SDK につながっています。',
      signIn: 'ツアーを始める',
      howBuilt: '構築方法',
    },
    meta: {
      title: 'BuildBase デモ：BuildBase SDK で動く本物の SaaS アプリ',
      description:
        'サインインして、認証、ワークスペース、課金、クレジット、通知、Webhook、AI エージェント連携を実際に動く Next.js アプリで試せます。すべての画面はオープンソースです。',
      tagline: 'SaaS のすべての機能を、ひとつずつ。',
    },
  },
  dashboard: {
    roles: {
      owner: 'オーナー',
      admin: '管理者',
      member: 'メンバー',
      editor: '編集者',
      viewer: '閲覧者',
    },
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
      statuses: {
        active: '有効',
        trialing: 'トライアル中',
        canceled: '解約済み',
        past_due: '支払い遅延',
        paused: '一時停止',
        incomplete: '未完了',
        unpaid: '未払い',
      },
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
  notifications: {
    preferencesLink: {
      title: '通知の設定',
      description:
        'どのイベントをメール、アプリ内、プッシュで受け取るかは、SDK の通知画面で設定します。',
      open: '設定を開く',
    },
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
    editAccount: 'アカウントを編集',
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
    openSettings: '設定の使用状況を開く',
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
    openSettings: 'パック、自動チャージ、履歴',
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
  account: {
    exports: {
      csv: 'CSVをエクスポート',
      locked: 'エクスポート',
      lockedHint:
        'エクスポートは有料プランの機能です。プランを選んで有効にしてください。',
    },
    creditPacks: {
      title: 'クレジットパック',
      description:
        'どのプランにも追加できます。クレジットはドキュメント作成とAI操作に使われます。',
      credits: '{count}クレジット',
    },
    permissions: {
      title: '組織の権限',
      description:
        'BuildBaseコンソールで定義し、ロールごとに付与したキー（カスタムロールを含む）。ドキュメントはサーバー側でもこれを確認します。',
      empty:
        'この組織はまだ独自の権限を定義していません。npm run seed:org を実行するか、コンソールの Workspace settings → Permissions でキーを追加してください。',
      permission: '権限',
      inApp: 'アプリ',
      backend: 'バックエンド',
      allowed: '許可',
      denied: '拒否',
      tryIt: '試す',
      codeOnly: 'このアプリのコードにのみあるため、ブラウザだけが確認します',
      tried: {
        allowed: '完了: バックエンドが許可しました',
        refused: 'バックエンドが拒否しました',
        error: '確認できませんでした',
      },
    },
    security: {
      title: 'セキュリティ',
      description:
        'サインインしているすべての場所、信頼しているデバイス、そしてそれらを終了する方法。',
      sessions: {
        title: 'セッション',
        description:
          'サインインごとにプラットフォーム上のセッションが作られます。サインアウトすると、どこでも即座に使えなくなります。',
        signOut: 'サインアウト',
        empty: 'ほかのセッションはありません。',
      },
      devices: {
        title: 'デバイス',
        description:
          'サインインに使ったブラウザやマシン。信頼済みデバイスは追加の確認を省略します。',
        signOut: 'サインアウト',
        empty: 'まだデバイスはありません。',
      },
      everywhere: {
        title: 'すべての場所からサインアウト',
        description:
          'このデバイスを含め、すべてのデバイスのすべてのセッションを終了します。',
        button: 'すべての場所からサインアウト',
        failed:
          'すべての場所からのサインアウトに失敗しました。もう一度お試しください。',
        confirmTitle: 'すべてのデバイスからサインアウトしますか？',
        confirmBody:
          'すべてのデバイスのすべてのセッションが今すぐ終了し、ここでも再度サインインが必要になります。',
        cancel: 'キャンセル',
        working: 'サインアウト中…',
      },
      passkeys: {
        title: 'パスキー',
        description:
          '指紋、顔、デバイスPINでサインインします。パスキーはホストされたサインインドメインに登録されるため、SDKの画面を開きます。',
        button: 'パスキーを管理',
      },
      agents: {
        title: '接続中のエージェント',
        description:
          'MCP経由でアクセスを許可したAIエージェント。プロフィールで確認・取り消しできます。',
        button: 'プロフィールを開く',
      },
    },
    invitations: {
      title: 'あなたへの招待',
      description:
        'あなたを招待したワークスペース。承認するとそのワークスペースに切り替わります。',
    },
    subscription: {
      cancel: 'プランを解約',
      canceling: '解約中…',
      resume: 'プランを継続',
      resuming: '再開中…',
      endsOn: '{date} に終了',
      canceled: 'プランはこの期間の終わりに終了します。',
      resumed: 'プランは継続されます。',
      failed: 'うまくいきませんでした。もう一度お試しください。',
    },
    invoice: {
      details: '詳細',
      title: '請求書 {number}',
      loading: '請求書を読み込み中…',
      missing: '請求書が見つかりません。',
      status: 'ステータス',
      amountDue: '請求額',
      amountPaid: '支払済み額',
      created: '発行日',
      due: '支払期日',
      note: '備考',
      open: 'ホストされた請求書を開く',
      pdf: 'PDFをダウンロード',
    },
    console: {
      title: 'テンプレートから始める',
      description:
        'BuildBaseコンソールの既製セット。複製すると、記入済みで組織に追加されます。',
      workflowTemplates: {
        title: 'ワークフローテンプレート',
        description:
          '10個のワークフロー：トライアル終了、支払い失敗、フォームからWebhook、CRM同期など。',
      },
      emailLibrary: {
        title: 'メールテンプレートライブラリ',
        description: '100以上のメールテンプレート。すべてのプランで無料です。',
      },
    },
  },
  entitlements: {
    title: 'プランに含まれるもの',
    description:
      'サーバーの利用権限をスラッグで確認します。プランに加え、アドオンや付与分も含みます。明示的に拒否された場合のみロックされます。',
    columns: {
      slug: 'スラッグ',
      kind: '種類',
      answer: '回答',
      detail: '詳細',
      source: '出どころ',
    },
    kind: {
      feature: '機能',
      limit: '上限',
      quota: 'クォータ',
      unknown: 'プランにない',
    },
    state: {
      granted: '含まれる',
      locked: 'ロック',
      unknown: '不明（許可）',
    },
    detail: {
      unlimited: '無制限',
      quota: '{limit} 件中 {used} 件使用、今期間の残り {remaining} 件',
      limit: '{limit} 件中 {used} 件、あと {remaining} 件追加可能',
    },
    source: {
      plan: 'プラン',
      floor: '付与で引き上げ',
      add: 'プラン＋アドオン',
      override: 'チームが設定',
      default: '既定',
    },
    pressure: {
      nearing: '残りわずか',
      reached: '上限に到達',
    },
    gate: {
      title: '高度なエクスポート（ゲート付き）',
      upgrade: 'アップグレードしてエクスポート',
      included: 'プランに含まれています',
    },
  },
  goals: {
    title: 'ウェブ解析のゴール',
    description:
      '大切な瞬間を、コンソールの Analytics でページビューと並べて数えます。ゴールは Cookie バナーに従い、拒否された後は何も送信されません。',
    record: 'ゴールを記録',
    recorded:
      '{name} を {count} 回記録しました。コンソールの Analytics の「ゴール」に表示されます。',
    notSent: '送信されていません: Cookie バナーで解析を拒否しています。',
    alsoDocuments:
      'このアプリは、ドキュメントを作成するたびに document_created も記録します。',
  },
  creditHolds: {
    title: 'クレジットを確保して後で精算',
    description:
      '終わるまでコストがわからない作業向け: 見積もりを確保し、実際にかかった分を精算します。少なければ残りが戻り、キャンセルすると全額が解放されます。',
    start: 'ジョブを開始（{amount} を確保）',
    held: '{time} まで {amount} クレジットを確保中。',
    finish: '完了: コストは {cost}',
    cancel: 'ジョブをキャンセル',
    settled: '{settled} を請求し、{returned} を残高に戻しました。',
    settledExtra:
      '{settled} を請求しました: 確保分より {extra} 多くかかりました。',
    released: '解放しました: {returned} を残高に戻しました。',
    insufficient:
      '見積もりを確保するのに十分なクレジットがありません（利用可能 {available}）。',
    notOpen: 'この確保はすでに終了しています。期限切れか、精算済みです。',
    failed: '確保を変更できませんでした。',
    jobDescription: 'デモジョブ（確保して精算）',
  },
  yourData: {
    title: 'あなたのデータ',
    description:
      'このアプリとプラットフォームが保持しているあなたのデータをすべてダウンロードするか、アカウントを削除します。',
    export: {
      button: 'データをエクスポート',
      working: '準備中…',
    },
    delete: {
      button: 'アカウントを削除',
      where:
        'セキュリティ画面を開きます。サインインから 10 分以上経っていれば本人確認を求め、プラットフォームがアカウントを削除すると、このアプリも保持しているあなたのデータを消去します。',
    },
    failed: '問題が発生しました。もう一度お試しください。',
  },
  affiliates: {
    title: 'アフィリエイト',
    description:
      '招待リンクからプログラムに参加し、自分のリンクを共有して、獲得額を確認します。あなたのリンクから来た人が購入すると、あなたの成果になります。',
  },
  shop: {
    title: 'ショップ',
    description:
      '出品者が公開したすべての商品です。購入は Stripe のチェックアウトで行われ、注文に表示されます。',
    empty:
      'まだ販売中の商品はありません。出品者が商品を公開するとここに表示されます。',
    by: '{seller}',
    free: '無料',
    notForSale: '現在は販売していません',
    pickTime: '先に時間を選んでください',
    addToCart: 'カートに追加',
    added: 'カートに追加しました。',
    viewCart: 'カート ({count})',
    tier: 'プラン',
    per: { day: '日', week: '週', month: '月', year: '年' },
  },
  orders: {
    title: '注文',
    description: '購入したものと、各注文で得たものです。',
    empty: 'まだ何も購入していません。',
    browse: 'ショップを見る',
    from: '{seller}',
    open: '開く',
    loading: '注文を読み込み中…',
    yourOrder: 'ご注文',
    total: '合計',
    whatYouGot: '受け取ったもの',
    fulfilment: {
      due: '販売者の対応待ち',
      in_progress: '販売者が対応中',
      fulfilled: 'お届け済み',
      returned: '返品済み',
    },
  },
  bookings: {
    title: '予約',
    description:
      '予約した時間と、それぞれのカレンダーファイルです。販売者のルールの範囲でキャンセルや変更ができます。',
    empty: 'まだ予約はありません。',
    browse: 'ショップで時間を予約する',
    loading: '予約を読み込んでいます…',
  },
  cart: {
    title: 'カート',
    description:
      'どの販売者の商品も、1つのStripeページでまとめて支払えます。販売者ごとに注文が作られます。',
    empty: 'カートは空です。',
    browse: 'ショップを見る',
    couponHint: 'コード DEMO10 で10%オフになります。',
  },
  reviews: {
    title: 'あなたのレビュー',
    ratingLabel: 'あなたの評価',
    outOf: '5つ星中{rating}',
    textLabel: 'いかがでしたか？',
    placeholder: 'いかがでしたか？（任意）',
    submit: 'レビューを投稿',
    update: '変更を保存',
    saving: '保存しています…',
    saved: 'ありがとうございます。レビューを投稿しました。',
    cancel: 'キャンセル',
    edit: 'レビューを編集',
    yours: 'あなたのレビュー',
    verifiedBuyer: '認証済みの購入者',
    summary: '5点中{average}（{count, plural, other {#件のレビュー}}）',
    closed: {
      reviews_off: 'この商品はレビューを受け付けていません。',
      not_paid: '支払い後にレビューできます。',
      refunded: '返金された購入はレビューできません。',
      not_delivered: '配達後にレビューできます。',
      booking_not_ended: '予約の終了後にレビューできます。',
      not_open_yet: 'レビューは{date}から受け付けます。',
      window_closed: 'レビューの受付期間は終了しました。',
    },
  },
  gates: {
    title: '役割・上限・プランで表示を切り替える',
    description:
      '各ゲートは、あなたとこのワークスペースに対するプラットフォームの回答に応じて中身か代替を表示し、読み込み中に誰かを締め出すことはありません。',
    roles: {
      shown: 'あなたはアプリの管理者です',
      hidden: 'アプリの管理者だけが表示できます',
    },
    limit: {
      invite: 'メンバーを招待',
      full: 'すべての席が埋まっています',
      room: '席に空きがあります',
      upgrade: '席を追加する',
    },
    quota: {
      available: '動画を追加できます',
      used: '今月の動画は残っていません',
    },
    upsell: {
      cta: 'アナリティクスは上位プランです',
      included: 'アナリティクスはプランに含まれています',
    },
    personal: {
      cta: 'Personal Pro にする',
      included: '優先サポートを利用できます',
    },
  },
  itemSubscriptions: {
    title: 'あなたの定期購入',
  },
  gifts: {
    send: 'ギフトとして贈る',
    title: 'どなたへ贈りますか？',
    email: '相手のメール',
    name: '相手の名前（任意）',
    message: 'メッセージ（任意）',
    pay: 'ギフトの代金を支払う',
    starting: '支払い画面を開いています…',
    cancel: 'キャンセル',
    pageTitle: 'あなたへのギフト',
    noLink: 'このページはメールのリンクからギフトを開きます。',
    loading: 'ギフトを開いています…',
    fromName: '{name}さんからのギフト',
    fromSomeone: 'あなたへのギフト',
    bySeller: '{seller}より',
    claimToAccount: '自分のアカウントに追加',
    claimAsGuest: 'アカウントなしで受け取る',
    claiming: '受け取っています…',
    signInHint:
      'アカウントに保存して注文で確認するには、先にサインインしてください。',
    claimedToAccount: 'アカウントに追加されました。',
    openOrders: '注文を開く',
    claimedAsGuest: '受け取りました。内容は次のとおりです：',
    claimedAt: '{date}に受け取り',
  },
};

export default messages;
