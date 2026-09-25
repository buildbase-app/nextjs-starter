import type { TourText } from './types';

/** The tour's text, Simplified Chinese. Mirrors `en.ts`. */
export const zh: TourText = {
  groups: {
    start: {
      title: '开始使用',
      summary: '注册、登录，看看会话是什么。',
    },
    workspaces: {
      title: '工作区',
      summary: '你的应用的每个客户都有一个工作区。创建、切换、重命名、删除。',
    },
    team: {
      title: '团队',
      summary: '通过邮件邀请、角色、席位，以及每个角色能做什么。',
    },
    billing: {
      title: '套餐与计费',
      summary: '试用、套餐、结账、发票和计费门户，全部来自控制台。',
    },
    usage: {
      title: '用量与配额',
      summary: '计量你的应用做了什么，让套餐来设定上限。',
    },
    credits: {
      title: '积分',
      summary: '应用消耗的预付余额，以及用户购买的积分包。',
    },
    features: {
      title: '功能开关',
      summary: '无需部署，即可为某个工作区或某个用户打开一项功能。',
    },
    permissions: {
      title: '权限',
      summary: '按工作区划分的角色，由 SDK 和服务器共同检查。',
    },
    notifications: {
      title: '通知',
      summary: '邮件、推送，以及每个用户随时可以回来查看的收件箱。',
    },
    push: {
      title: '推送',
      summary: '浏览器推送，由平台完成订阅与投递。',
    },
    agents: {
      title: '代理与 MCP',
      summary: '以你自己的身份，把 Claude 或任意 MCP 客户端接入这个应用。',
    },
    webhooks: {
      title: 'Webhook',
      summary: '平台事件被镜像到这个应用自己的数据库中。',
    },
    platform: {
      title: '平台',
      summary: '语言、主题、你的数据，以及把这个仓库带回家。',
    },
    content: {
      title: '内容',
      summary: '在控制台撰写的文档、常见问题和文案，由本应用读取。',
    },
    forms: { title: '表单', summary: '在控制台搭建的表单，在这里渲染并提交。' },
    collections: {
      title: '数据集',
      summary: '带版本化结构的自定义数据，存储在平台上。',
    },
    assets: {
      title: '文件',
      summary: '通过应用上传的文件，由平台存储和分发。',
    },
    links: { title: '短链接', summary: '统计每一次点击的分享链接。' },
    audience: {
      title: '受众与属性',
      summary: '用户的自定义属性、候补名单和营销受众。',
    },
    tracking: {
      title: '追踪',
      summary: '带同意管理、自定义事件和来源归因的分析标签。',
    },
    workflows: {
      title: '工作流',
      summary: '在控制台搭建的自动化，由你在这里的操作触发。',
    },
    reports: {
      title: '报表',
      summary: '每个模块都有报表，本应用绘制其中几项。',
    },
  },
  tasks: {
    'sign-up': {
      title: '创建你的账户',
      why: '注册、邮箱验证和会话都属于平台，托管在平台页面上。这个应用不包含任何认证代码。',
      steps: [
        '在首页点击“登录”。',
        '用你的邮箱和收到的验证码注册。',
        '你会以登录状态回到这里。',
      ],
    },
    'trust-device': {
      title: '信任此设备',
      why: '受信任的设备保持登录 90 天，并跳过额外校验。每台设备和每个会话都会列出，并且可以退出登录。',
      steps: [
        '登录时选择“信任此设备”。',
        '打开个人资料 → 设备与会话，确认它已列出。',
      ],
    },
    'add-passkey': {
      title: '添加通行密钥',
      why: '用指纹、面容或设备 PIN 实现无密码登录。在控制台按组织启用即可，无需开发。',
      steps: [
        '打开个人资料 → 安全。',
        '添加通行密钥，按浏览器提示操作。',
        '退出登录，再用它登录。',
      ],
    },
    'see-session': {
      title: '看看会话如何到达你的服务器',
      why: 'SDK 持有一个会话 ID；这个应用把它保存在 httpOnly cookie 中，API 路由用它调用 BuildBase。你的服务器从不接触密码。',
      steps: [
        '打开个人资料。',
        '阅读“工作原理”面板：cookie、服务端客户端，以及是哪次调用取得了个人资料。',
      ],
    },
    'sign-out-everywhere': {
      title: '在所有地方退出登录',
      why: '结束平台上所有设备的所有会话，而不只是你当前所在的浏览器。',
      steps: [
        '打开个人资料 → 设备与会话。',
        '退出另一个会话，或使用“在所有地方退出登录”。',
      ],
    },
    'first-workspace': {
      title: '注意你的第一个工作区',
      why: '工作区就是租户：每个套餐、配额、积分余额和成员都属于某个工作区。你的第一个工作区由平台在注册时创建。',
      steps: ['看看侧边栏里的工作区名称。', '打开切换器，确认它在列表中。'],
    },
    'create-workspace': {
      title: '创建第二个工作区',
      why: '一个人可以属于多个租户。每个租户单独计费。',
      steps: ['打开工作区切换器。', '选择“创建工作区”并命名。'],
    },
    'switch-workspace': {
      title: '在它们之间切换',
      why: '切换会一次性替换全部上下文：订阅、用量、积分、成员、功能。',
      steps: ['打开切换器，选择另一个工作区。', '观察仪表盘卡片的变化。'],
    },
    'rename-workspace': {
      title: '重命名工作区',
      why: '内置的设置界面负责常规设置；显示哪些板块由你决定。',
      steps: ['打开设置 → 常规。', '修改名称并保存。'],
    },
    'workspace-settings-screens': {
      title: '打开每一个内置设置界面',
      why: '账户、安全、设备、已连接的代理、常规、成员、套餐与计费、用量、积分、功能、通知、危险区域：全部内置，全部可关闭。',
      steps: ['打开设置。', '逐个点击侧边栏的各个板块。'],
    },
    'delete-workspace': {
      title: '删除第二个工作区',
      why: '只有当设置允许一个人拥有多个工作区时，才会提供危险区域。',
      steps: ['切换到第二个工作区。', '设置 → 危险区域 → 删除。'],
    },
    'invite-member': {
      title: '通过邮件邀请某人',
      why: '这个地址不需要已有账户。对方收到邮件，点开链接，注册或登录，然后接受。待处理的邀请会占用一个席位。',
      steps: ['打开团队。', '输入一个你能查收的邮箱地址和角色，然后发送。'],
    },
    'pending-seat': {
      title: '看看待处理的邀请占用了席位',
      why: '邀请待处理期间席位照常计费，因此团队页面的席位数与套餐一致。',
      steps: [
        '在团队页面，阅读席位卡片和邀请表单下方的说明：待处理的那一行已被计入。',
      ],
    },
    'accept-invitation': {
      title: '接受邀请',
      why: '可以从邮件链接接受，也可以从应用内的待处理列表接受。通过链接进入即证明了邮箱归属，无需再单独验证。',
      steps: [
        '在另一个邮箱中打开邀请邮件并点开链接。',
        '注册或登录。每个仪表盘页面顶部的邀请横幅上有“接受”。',
      ],
    },
    'change-role': {
      title: '更改成员的角色',
      why: '角色按工作区划分，在控制台定义。成员会通过邮件和收件箱收到通知。',
      steps: ['在团队页面，为非所有者的成员选择另一个角色。'],
    },
    'viewer-limits': {
      title: '看看查看者不能做什么',
      why: 'SDK 会隐藏角色无权执行的操作，而服务器无论如何都会拒绝。',
      steps: [
        '以查看者身份登录。',
        '打开权限和文档：查看者没有的操作要么不显示，要么被禁用。',
      ],
    },
    'revoke-invitation': {
      title: '撤销一个待处理的邀请',
      why: '链接随即失效，席位被释放。',
      steps: ['邀请另一个地址，然后在待处理列表中撤销它。'],
    },
    'seat-limit': {
      title: '达到席位上限',
      why: '席位数由套餐决定。到达上限后，邀请表单会变成上限提示，服务器返回 402。',
      steps: ['持续邀请，直到表单提示已达上限。'],
    },
    'see-trial': {
      title: '查看你的试用',
      why: '新工作区从套餐定义的试用期开始。仪表盘会显示剩余时间。',
      steps: ['打开仪表盘，阅读试用卡片。'],
    },
    'compare-plans': {
      title: '比较各个套餐',
      why: '定价页面由控制台中的套餐生成：名称、各周期价格、配额、上限和功能。在那里改价格，这里也随之改变。',
      steps: ['打开定价。', '切换计费周期和货币。'],
    },
    subscribe: {
      title: '用测试卡订阅',
      why: '结账页面由 Stripe 提供，平台为你的工作区创建。请使用卡号 4242 4242 4242 4242。',
      steps: [
        '在定价页面选择一个套餐。',
        '用测试卡付款。',
        '你会带着该套餐回到仪表盘。',
      ],
    },
    'trial-banner-gone': {
      title: '看着试用横幅消失',
      why: '订阅上下文一变化，门控组件就会立刻重新渲染。',
      steps: ['回到仪表盘：试用卡片已消失，套餐卡片显示当前套餐。'],
    },
    'view-invoice': {
      title: '查看发票',
      why: '发票经由平台来自 Stripe，并附带托管的 PDF。',
      steps: ['打开发票，打开最新的一张。'],
    },
    'billing-portal': {
      title: '打开计费门户',
      why: '换卡、收据和取消订阅都在 Stripe 的门户完成，为该工作区打开。',
      steps: ['在仪表盘的套餐卡片上选择“管理计费”。'],
    },
    upgrade: {
      title: '升级到下一个套餐',
      why: '由 Stripe 按比例计费；配额和功能随套餐变化。',
      steps: ['在定价页面选择更高的套餐。'],
    },
    'cancel-resume': {
      title: '取消，然后恢复',
      why: '取消会持续到周期结束，在此之前可以撤销。',
      steps: ['从套餐卡片取消。', '在同一位置恢复。'],
    },
    'seat-price': {
      title: '看看成员加入时席位价格如何变化',
      why: '按席位计费的套餐会对成员和待处理的邀请收费。SDK 计算出的数字与平台实际收取的一致。',
      steps: ['在团队页面邀请某人；阅读席位行和套餐卡片。'],
    },
    'record-usage': {
      title: '记录用量',
      why: '你的应用计量自己做了什么（创建了一份文档、处理了一段视频）；套餐决定包含多少。',
      steps: [
        '打开文档并创建一份。',
        '阅读表单下方“平台记录了什么”这一行。',
        '打开用量：文档配额已发生变化。',
      ],
    },
    'usage-threshold': {
      title: '越过警告阈值',
      why: '在 80% 时会渲染一个门控，让你在到达上限前提醒用户。',
      steps: ['持续创建文档，直到列表上方出现提示。'],
    },
    'usage-limit': {
      title: '达到上限',
      why: '达到包含量后，服务器返回 402，创建按钮被锁定，除非套餐允许超额。界面和服务器读取的是同一个配额。',
      steps: ['持续创建，直到按钮被锁定且创建被拒绝。'],
    },
    'usage-log': {
      title: '阅读用量日志',
      why: '每一个记录的单位都是一行，按工作区、按配额划分。',
      steps: ['在用量页面打开日志。'],
    },
    'see-balance': {
      title: '查看你的积分余额',
      why: '每个工作区的预付余额，由套餐赠送或通过积分包购买。',
      steps: ['打开积分。'],
    },
    'spend-credits': {
      title: '用积分执行一个操作',
      why: '由你的服务器消耗；余额会在每个打开的标签页中更新。',
      steps: [
        '在文档页面创建一份：这会消耗一个积分。',
        '观察侧边栏余额和计量行的变化。',
      ],
    },
    'credits-low': {
      title: '余额不足',
      why: '在阈值处设有门控，让你在用完之前提供充值。',
      steps: ['持续创建文档，直到列表上方出现余额不足的提示。'],
    },
    'buy-credits': {
      title: '购买积分包',
      why: '积分包在控制台定义；结账由 Stripe 完成。',
      steps: ['在积分页面，用测试卡购买 100 积分的积分包。'],
    },
    'credit-transactions': {
      title: '阅读交易记录',
      why: '每一次赠送、购买和消耗都是一行，并标明来自哪个积分桶。',
      steps: ['在积分页面，滚动到“交易记录”。'],
    },
    'feature-off': {
      title: '看看一个已关闭的功能',
      why: '文档页面有三个板块受工作区开关控制：导出、共享、电子签名。关闭时显示的是锁定状态，而不是一个坏掉的按钮。',
      steps: ['打开文档，滚动到功能门控。', '找到一个标记为“已禁用”的板块。'],
    },
    'feature-on': {
      title: '看看它被打开',
      why: '开关在控制台修改，无需部署。套餐可以授予它们，也可以手动为某个工作区覆盖。',
      steps: [
        '升级到包含该功能的套餐，或者请我们为你的工作区打开一个。',
        '重新加载文档：该板块解锁。',
      ],
    },
    'user-feature': {
      title: '一个跟着人走、而不是跟着工作区走的开关',
      why: '用户功能跨工作区跟随这个人；工作区功能跟随租户。',
      steps: ['打开个人资料：那里列出的功能属于你，而不是工作区。'],
    },
    'permission-matrix': {
      title: '阅读你的权限矩阵',
      why: '你在这个工作区中的角色允许做什么，由平台解析。',
      steps: ['打开权限。'],
    },
    'forbidden-action': {
      title: '尝试一个被禁止的操作',
      why: '对查看者来说按钮是禁用的；如果你仍然调用 API，服务器会返回 403。两者读取的都是平台为你在这个工作区保存的角色。',
      steps: [
        '以查看者身份打开文档：创建和删除都被禁用。',
        '仍然从终端或 MCP 工具发送请求：403。',
      ],
    },
    'custom-role': {
      title: '看看一个自定义角色',
      why: '角色及其权限在控制台按组织定义。',
      steps: ['在权限页面阅读角色：这个演示定义了 admin、editor 和 viewer。'],
    },
    'inbox-first-item': {
      title: '找到你的第一条通知',
      why: '应用发给你的一切都会进入一个你随时可以回来查看的收件箱：无论通过什么渠道投递，每条通知一个条目。',
      steps: [
        '点击页眉的铃铛，或在侧边栏打开收件箱。',
        '应用发给你的一切都在那里；打开面板会标记为“已看到”，而不是“已读”。',
      ],
    },
    'send-notification': {
      title: '从应用发送一条通知',
      why: '一次调用同时通过邮件和推送发送；由平台的门控决定哪些渠道触发。',
      steps: [
        '打开通知。表单已填入“Comment added”事件。',
        '发给你自己，然后看看铃铛。',
      ],
    },
    'inbox-live': {
      title: '看着它实时到达',
      why: '打开着的收件箱会通过 socket 收到通知并重新拉取；无需刷新。',
      steps: ['在一个标签页保持收件箱打开，从另一个标签页发送。'],
    },
    'open-from-email': {
      title: '从邮件中打开它',
      why: '点击邮件链接会把收件箱条目标记为已读；仅仅打开邮件不会。',
      steps: [
        '打开你收到的邮件并点开链接。',
        '收件箱条目变为已读，标注为“通过邮件点击”。',
      ],
    },
    'mark-all-read': {
      title: '全部标为已读，归档一条',
      why: '已读、已看到和已归档是彼此独立的状态，按人保存。',
      steps: ['在收件箱中归档一条，把其余的标为已读。'],
    },
    'notification-preferences': {
      title: '为自己关闭一个渠道',
      why: '每个成员自己选择如何被打扰；工作区管理员设置默认值，并可以把某个事件标记为必需。',
      steps: [
        '设置 → 通知。',
        '关闭“Comment added”的邮件渠道；再发一次，看看它只到达收件箱。',
      ],
    },
    'required-event': {
      title: '看看一个必需事件',
      why: '管理员可以把事件设为必需；成员无法关闭它。',
      steps: ['设置 → 通知：“Weekly report”已锁定。'],
    },
    'delivery-log': {
      title: '查看控制台的投递日志',
      why: '发给每个用户的每条通知，包括邮件和推送的结果，以及是否已读。',
      steps: ['阅读这个任务上的截图；日志在控制台，而不在应用里。'],
    },
    'push-subscribe': {
      title: '让这个浏览器订阅推送',
      why: 'Web 推送使用平台的 VAPID 密钥和 SDK 自带的 service worker。',
      steps: ['打开通知并启用推送。', '允许浏览器的提示。'],
    },
    'push-receive': {
      title: '收到一条推送',
      why: '按设备发送，即使标签页已关闭，浏览器也会投递。',
      steps: ['在推送开启的情况下，把“Comment added”事件发给自己。'],
    },
    'push-click': {
      title: '点击它',
      why: '点击会经过平台的链接检查，并把收件箱条目标记为已读。',
      steps: ['点击推送通知。'],
    },
    'mcp-config': {
      title: '设置你的 MCP 客户端',
      why: '这个应用是一个 MCP 服务器。任何 MCP 客户端都用你的 BuildBase 账户登录，并以你的身份行事。',
      steps: [
        '打开个人资料 → 已连接的代理。',
        '在指南中选择你的客户端并按步骤操作：服务器地址是这个应用的 /api/mcp。',
      ],
    },
    'mcp-connect': {
      title: '连接一个代理',
      why: '客户端从 /.well-known 发现 OAuth 服务器，在托管页面上让你登录，并收到一个由这个应用用自己的密钥签发的令牌。',
      steps: ['重启客户端并批准连接。'],
    },
    'mcp-call': {
      title: '让它列出你的文档',
      why: '内置工具读取你的账户；应用自己的工具在你的权限范围内读写它的数据。',
      steps: [
        '提问：“列出我在 BuildBase Demo 中的文档”。',
        '代理调用 list_documents；工具一以你的身份运行，导览就会打勾。',
      ],
    },
    'mcp-write': {
      title: '让它创建一份',
      why: '通过代理进行的写入会像点击一样被计量和权限检查。',
      steps: [
        '提问：“创建一份名为 Agent test 的文档”。',
        '这需要你在授权页面授予的 documents:write 范围。',
      ],
    },
    'agent-list': {
      title: '查看已连接的代理，并断开它',
      why: '每一次对代理的授权都会连同其范围一起列出，并且可以撤销。',
      steps: ['个人资料 → 已连接的代理 → 断开连接。'],
    },
    'llms-txt': {
      title: '读一读代理读到的内容',
      why: 'llms.txt、API 目录和 .well-known 文档都由同一份配置生成。',
      steps: [
        '打开 /llms.txt，然后打开 /.well-known/mcp/server-card.json 和 /openapi.json。',
      ],
    },
    'webhook-received': {
      title: '看看平台事件落入这个应用的数据库',
      why: '订阅、工作区和成员在平台上发生变化；webhook 带着签名通知你的服务器。',
      steps: [
        '做任何平台会注意到的事：邀请某人、订阅、购买积分。',
        '打开事件：webhook 表格列出了到达的内容，每一条在存储前都经过签名校验。',
      ],
    },
    'sdk-events': {
      title: '也看看浏览器端的事件',
      why: 'SDK 在浏览器中发出生命周期事件；这个应用把它们转发出去，让自己的表保持同步。',
      steps: ['在事件页面阅读应用事件表格。'],
    },
    'switch-language': {
      title: '切换语言',
      why: 'SDK 自己的界面和这个应用都支持八种语言，含 ICU 复数和本地数字。',
      steps: ['使用页眉的语言切换器。'],
    },
    rtl: {
      title: '试试阿拉伯语',
      why: 'SDK 界面采用从右到左的布局，而不只是翻译了字符串。',
      steps: ['切换到 العربية 并打开设置。'],
    },
    'dark-mode': {
      title: '切换深色模式',
      why: 'SDK 的界面跟随你应用的 .dark 类和 CSS 变量。',
      steps: ['使用主题切换。'],
    },
    'export-data': {
      title: '导出你的数据',
      why: 'GDPR 第 15 条：这个应用自己的数据，加上平台上的个人资料，合在一个文件里。',
      steps: ['个人资料 → 导出我的数据。'],
    },
    'clone-it': {
      title: '把它带回家',
      why: '你刚才做的一切都在这个仓库里。克隆它，指向你的组织，从这里开始。',
      steps: [
        'git clone https://github.com/buildbase-app/nextjs-starter',
        '把 .env.example 复制为 .env.local，填入你的组织和客户端。',
        'npm install && npm run dev',
      ],
    },
    'delete-account': {
      title: '删除你的账户',
      why: 'GDPR 第 17 条：在这里和平台上都会被抹除。',
      steps: ['个人资料 → 删除我的账户。导览到此结束。'],
    },
    'help-policy': {
      title: '阅读帮助中心',
      why: '编辑内容存放在控制台，而不是这个仓库：政策区块、文档、常见问题、用户评价。应用用仅限服务器的令牌通过组织 API 读取它们。',
      steps: [
        '打开帮助中心。',
        '阅读退款政策区块。',
        '在控制台修改文字，然后重新加载。',
      ],
    },
    'help-doc': {
      title: '打开一篇文档',
      why: '文档有文件夹和发布标记；应用从目录树列出文件夹，只显示已发布的内容。',
      steps: ['在帮助中心左栏选择一篇文档。'],
    },
    'help-faq': {
      title: '展开一个常见问题',
      why: '常见问题集合是精选的问题列表，同一个问题可以放在多个集合中。',
      steps: [
        '在帮助中心打开“Frequently asked”下的一个问题。',
        '在控制台添加一个问题，然后重新加载。',
      ],
    },
    'help-testimonials': {
      title: '查看用户评价',
      why: '用户评价在有人于控制台发布之前一直是草稿。',
      steps: ['在帮助中心滚动到“What customers say”。'],
    },
    'form-submit': {
      title: '提交联系表单',
      why: '表单结构在控制台搭建并公开提供；每次提交都会成为一条数据集记录并触发 form.submitted。本应用通过自己的服务器转发提交，以加上自己的校验。',
      steps: [
        '打开 Forms。',
        '填写联系表单并发送。',
        '它会出现在“Latest submissions”中。',
      ],
    },
    'form-invalid': {
      title: '发送表单会拒绝的内容',
      why: '平台按当前结构校验，并一次返回所有错误；应用原样显示。',
      steps: [
        '留空一个必填字段，或输入无效的邮箱。',
        '发送，然后阅读错误信息。',
      ],
    },
    'form-console': {
      title: '在控制台查看提交',
      why: '每次提交都是表单数据集中的一条记录，还有提交量随时间变化的图表。',
      steps: ['打开控制台的 Forms 页面，找到 Contact 表单。'],
    },
    'form-workflow': {
      title: '给表单接上工作流',
      why: 'form.submitted 是工作流触发器：发送确认邮件、发到 Slack、调用你的服务器。在控制台搭建，这里无需部署。',
      steps: [
        '在控制台创建一个以 form.submitted 为触发器的工作流。',
        '再次提交表单，观察实例运行。',
      ],
    },
    'collection-read': {
      title: '阅读发布说明',
      why: '数据集是带版本化结构的自定义数据。应用读取当前生效版本的记录，所以修改结构只需发布，不需部署。',
      steps: ['打开 Collections。', '表格的列就是当前版本的字段。'],
    },
    'collection-delete': {
      title: '删除一条记录',
      why: '写入记录要用应用的令牌经过组织 API；控制台会立即显示变化。',
      steps: ['从表格中删除一条发布说明。', '查看控制台的记录页面。'],
    },
    'collection-version': {
      title: '发布一个新版本',
      why: '已生效的版本不可更改。新版本会复制字段，你加一个字段并设为生效，表格就多出一列。',
      steps: [
        '在控制台为 release-notes 添加一个多一个字段的版本，并设为生效。',
        '重新加载 Collections。',
      ],
    },
    'upload-asset': {
      title: '上传一个文件',
      why: '文件由平台存储和分发，每个最大 5 MB，可设为公开或私有。浏览器永远拿不到组织令牌：由服务器转发上传。',
      steps: ['打开 Assets。', '选择一张图片，等它带着宽高出现在图库中。'],
    },
    'asset-in-console': {
      title: '在控制台查看',
      why: '同一个文件出现在组织的文件列表中，附带平台掌握的全部信息。',
      steps: ['打开控制台的 Assets 页面。', '找到你刚上传的文件。'],
    },
    'asset-private': {
      title: '设为私有',
      why: '可见性是平台上的一个开关；私有文件的公开 URL 会立即失效。',
      steps: [
        '在文件卡片上选择“Make private”。',
        '打开它的 URL：已不再提供。',
        '再把它设回公开。',
      ],
    },
    'create-link': {
      title: '创建一个短链接',
      why: '平台生成一个 12 位的 ID 并负责跳转；目标地址由你决定。',
      steps: ['打开 Short links。', '起个名字，为本应用的 URL 创建链接。'],
    },
    'click-link': {
      title: '点击并查看计数',
      why: '每次点击都会连同国家、设备和时间记录下来；这里的计数是从平台读回的。',
      steps: [
        '选择“Follow”：短链接在新标签页打开并跳到目标地址。',
        '回来刷新：计数增加了。',
      ],
    },
    'change-link-destination': {
      title: '修改目标地址',
      why: '短链接本身不变，所以已经分享出去的链接照常可用。',
      steps: [
        '选择“Change destination”，输入另一个 URL 并保存。',
        '再次打开链接：它跳到了新地址。',
      ],
    },
    'link-analytics-console': {
      title: '查看分析页面',
      why: '控制台绘制点击量随时间的变化，并逐条列出。',
      steps: ['打开控制台的 Links → Analytics 页面。', '找到你的点击。'],
    },
    'finish-onboarding': {
      title: '完成新手清单',
      why: '自定义属性是用户身上的键值对，由 SDK 以你的身份从浏览器写入。键在控制台定义，便于之后筛选。',
      steps: [
        '打开 Audience。',
        '勾选全部三项，填写职位名称，然后完成。',
        '属性卡片显示 onboarded=true。',
      ],
    },
    'attributes-in-console': {
      title: '在你的记录上查看属性',
      why: '应用写入的内容就在控制台中你的用户上，管理员可以据此筛选或分群。',
      steps: [
        '打开控制台的 Users 页面，进入你自己的记录。',
        '找到 onboarded 和 role-title。',
      ],
    },
    'set-country': {
      title: '选择国家、时区和货币',
      why: 'SDK 自带国家、时区和货币列表，选择器无需额外下载；选择会保存为属性。',
      steps: ['在 Audience 上选择国家、时区和货币。', '保存偏好。'],
    },
    'subscribe-newsletter': {
      title: '订阅新闻通讯',
      why: '受众联系人是独立于账户的营销记录：没有账户也可以存在，是营销活动的发送对象。',
      steps: [
        '在 Audience 上用你的邮箱订阅。',
        '服务器创建联系人并把它加入 newsletter 列表。',
      ],
    },
    'join-waitlist': {
      title: '在未登录状态下加入候补名单',
      why: '平台的测试版候补名单：表单和文案来自控制台，报名也在那里审批。',
      steps: [
        '在隐私窗口中打开 /waitlist。',
        '留下姓名和邮箱。',
        '在控制台的 Users → Beta 中批准这条报名。',
      ],
    },
    'tracking-consent': {
      title: '给出同意，看着标签加载',
      why: '分析和广告标签在控制台设置，而不是在这份代码里。SDK 只在获得同意后加载它们，横幅只列出实际安装的内容，从不列出没有加载的厂商。',
      steps: [
        '打开 Tracking。',
        '阅读同意列表：它由挂在本应用上的标签生成。',
        '全部接受或只接受分析，看看安装了哪些提供方。',
      ],
    },
    'tracking-custom-event': {
      title: '发送一个自定义事件',
      why: '注册和购买会自动发送；你自己的事件通过 track() 发往数据层和每个已安装的厂商。',
      steps: [
        '在 Tracking 上点击“Track a custom event”。',
        '看它带着参数出现在实时日志中。',
      ],
    },
    'tracking-attribution': {
      title: '查看你从哪里来',
      why: '点击 ID 和活动参数在访客落地的第一个页面被记录，并跨子域附在之后的每个事件上。',
      steps: [
        '带上 ?utm_source=demo&utm_campaign=tour 重新加载 Tracking 页面。',
        '阅读来源归因卡片。',
      ],
    },
    'tracking-console-tag': {
      title: '在控制台查看标签',
      why: 'GA4、Meta、PostHog、Clarity 等十五种，每种都有同意类别和控制台为你的隐私政策生成的说明文字。',
      steps: [
        '在控制台打开 Settings → Tracking。',
        '打开 Auth → Clients，查看挂在本应用上的标签。',
      ],
    },
    'workflow-runs': {
      title: '查看你的工作流运行',
      why: '工作流在控制台用触发器、动作和条件搭建。应用从不调用工作流；它引发工作流监听的事件，并能读取为每个人运行了什么。',
      steps: [
        '打开 Automations。',
        '阅读平台为你启动的运行，包括状态和节点数。',
      ],
    },
    'workflow-cause': {
      title: '触发一次工作流运行',
      why: '注册、提交表单、付款或余额不足都会启动运行。应用里没有任何地方写着工作流的名字。',
      steps: [
        '在 Forms 上提交联系表单。',
        '回到 Automations 刷新：出现一条“Provision on form”的运行。',
      ],
    },
    'workflow-provision-call': {
      title: '接收来自工作流的调用',
      why: 'HTTP Webhook 动作可以调用你自己的服务器。调用不带签名，authorization 头也会被去掉，所以它在 x-webhook-secret 中携带共享密钥；由于平台会重试，路由是幂等的。',
      steps: [
        '触发“Provision on form”工作流。',
        '在 Automations 上阅读应用收到并保存的这次调用。',
      ],
    },
    'workflow-console-run': {
      title: '在控制台打开这次运行',
      why: '每个节点的结果、日志、重试和死信队列，你的代码里一样都不需要。',
      steps: [
        '在控制台打开 Workflows → Instances。',
        '打开你的运行，阅读每个节点的输出。',
      ],
    },
    'reports-view': {
      title: '查看来自平台的报表',
      why: '每个模块都有图表和计数接口，控制台仪表盘用的也是它们。本应用绘制最近三十天的注册、表单提交和链接点击。',
      steps: ['打开 Reports。', '阅读三张图表和主要数字。'],
    },
    'reports-console': {
      title: '与控制台仪表盘对比',
      why: '数字一致，因为来自同样的接口；其中一些是每十分钟刷新的汇总。',
      steps: ['打开控制台仪表盘，找到同样的注册曲线。'],
    },
    'see-badge': {
      title: '查看徽章',
      why: '一张“Built with BuildBase”图片和链接，在服务器上渲染，不用脚本、不发网络请求，可附带推荐码。',
      steps: ['滚动到首页的页脚。'],
    },
    'slack-alert': {
      title: '有人注册时收到 Slack 提醒',
      why: '最多 55 种系统事件的团队提醒会发到同一个 Slack 传入 Webhook URL。只在控制台设置：应用只负责引发事件。',
      steps: [
        '在控制台的 Settings → Slack 中粘贴一个传入 Webhook URL，并选择“user.registered”。',
        '注册一个测试用户，观察 Slack 频道。',
      ],
    },
    'receive-campaign': {
      title: '收到一封邮件营销',
      why: '面向受众的邮件在控制台撰写和发送：模板、已验证的发信域名、受众列表、按收件人生成的草稿、打开和点击追踪。',
      steps: [
        '在 Audience 上订阅新闻通讯。',
        '在控制台的 Emails → Campaigns 中针对该列表创建一个并发送。',
        '在收件箱中阅读。',
      ],
    },
    'unsubscribe-campaign': {
      title: '退订',
      why: '{{unsubscribe}} 合并标签会变成一个托管页面；联系人被标记为已退订，此后不再发送。',
      steps: [
        '点击营销邮件中的退订。',
        '在控制台的 Audience 中找到该联系人：已退订。',
      ],
    },
  },
};
