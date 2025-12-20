export type Translations = {
  [key: string]: string;
};

export type I18n = {
  [locale in "en" | "zh" | "ja" | "ms" | "ko" | "pt" | "es"]: Translations;
};

export const HOME = {
  LOG: "home.log",
  SEARCH_PLACEHOLDER: "home.search.placeholder",
};
export const HEADER = {
  MISC: "header.misc",
  OPEN_EXPLORER: "header.misc.openExplorer",
  UTILITY: "header.misc.utility",
  EXPORT: "header.misc.export",
  PRINT: "header.misc.print",
  EXIT: "header.misc.exit",

  ALERTS: "header.alerts",
  CHARTS: "header.charts",
  SETTINGS: "header.settings",
};
export const SETTINGS = {
  TITLE: "settings.title",

  PRESENTATION: "settings.presentation",
  DARK_MODE: "settings.presentation.darkMode",
  DARK_MODE_DESCIPTION: "settings.presentation.darkMode.description",
  SEARCH_BAR: "settings.presentation.searchBar",
  SEARCH_BAR_DESCIPTION: "settings.presentation.searchBar.description",
  LANGUAGE: "settings.presentation.language",
  LANGUAGE_DESCIPTION: "settings.presentation.language.description",
  LANGUAGE_DEFAULT_LABEL: "settings.presentation.language.defaultLabel",
  PREFETCH_COUNT: "settings.presentation.prefetchCount",
  PREFETCH_COUNT_DESCIPTION: "settings.presentation.prefetchCount.description",
  PREFETCH_COUNT_PLACEHOLDER: "settings.presentation.prefetchCount.placeholder",
  BYTE_DISPLAY: "settings.presentation.byteDisplay",
  BYTE_DISPLAY_DESCIPTION: "settings.presentation.byteDisplay.description",
  BYTE_DISPLAY_DEFAULT_LABEL: "settings.presentation.byteDisplay.defaultLabel",

  SERVICES: "settings.services",
  SERVICES_DESKTOP_NOTIFICATION: "settings.services.desktopNotification",
  SERVICES_DESKTOP_NOTIFICATION_DESCIPTION:
    "settings.services.desktopNotification.description",
  SERVICES_MINIMIZE_ON_CLOSE: "settings.services.minimizeOnClose",
  SERVICES_MINIMIZE_ON_CLOSE_DESCIPTION:
    "settings.services.minimizeOnClose.description",
  SERVICES_START_ON_BOOT: "settings.services.startOnBoot",
  SERVICES_START_ON_BOOT_DESCIPTION:
    "settings.services.startOnBoot.description",

  LOGGING: "settings.logging",
  ENABLE_LOGGING: "settings.logging.enableLogging",
  ENABLE_LOGGING_DESCIPTION: "settings.logging.enableLogging.description",
  LOGGING_PATH: "settings.logging.loggingPath",
  LOGGING_PATH_DESCIPTION: "settings.logging.loggingPath.description",
  LOGGING_PATH_PLACEHOLDER: "settings.logging.loggingPath.placeholder",

  BACKUP: "settings.backup",
  ENABLE_BACKUP: "settings.backup.enableBackup",
  ENABLE_BACKUP_DESCIPTION: "settings.backup.enableBackup.description",
  BACKUP_PATH: "settings.backup.backupPath",
  BACKUP_PATH_DESCIPTION: "settings.backup.backupPath.description",
  BACKUP_PATH_PLACEHOLDER: "settings.backup.backupPath.placeholder",
  BACKUP_FREQUENCY: "settings.backup.backupFrequency",
  BACKUP_FREQUENCY_DESCIPTION: "settings.backup.backupFrequency.description",

  SAVE_CHANGES: "settings.saveChanges",
}

export const translations: I18n = {
  en: {
    "header.misc": "Misc",
    "header.misc.openExplorer": "Open Explorer",
    "header.misc.utility": "Utility",
    "header.misc.export": "Export",
    "header.misc.print": "Print",
    "header.misc.exit": "Exit",
    "header.alerts": "Alerts",
    "header.charts": "Charts",
    "header.settings": "Settings",

    "home.log": "Today's disk info has already been recorded.",
    "home.search.placeholder": "Search...",

    [SETTINGS.TITLE]: "Settings",
    [SETTINGS.PRESENTATION]: "Presentation",
    [SETTINGS.DARK_MODE]: "Dark Mode",
    [SETTINGS.DARK_MODE_DESCIPTION]: "The themes available currently are light and dark. Dark mode eases the eyes drastically.",
    [SETTINGS.SEARCH_BAR]: "Search Bar",
    [SETTINGS.SEARCH_BAR_DESCIPTION]: "Whether to enable the search bar functionality for applicable pages.",
    [SETTINGS.LANGUAGE]: "Language",
    [SETTINGS.LANGUAGE_DESCIPTION]: "The language used for the user interface from a limited preset.",
    [SETTINGS.LANGUAGE_DEFAULT_LABEL]: "Select language",
    [SETTINGS.PREFETCH_COUNT]: "Prefetch Count",
    [SETTINGS.PREFETCH_COUNT_DESCIPTION]: "The number of data points that is preferred to fetch from the history. Optimal suggestion is 20.",
    [SETTINGS.PREFETCH_COUNT_PLACEHOLDER]: "Count",
    [SETTINGS.BYTE_DISPLAY]: "Byte Display",
    [SETTINGS.BYTE_DISPLAY_DESCIPTION]: "The format for which the bytes will be displayed by default.",
    [SETTINGS.BYTE_DISPLAY_DEFAULT_LABEL]: "Select byte format",

    [SETTINGS.SERVICES]: "Services",
    [SETTINGS.SERVICES_DESKTOP_NOTIFICATION]: "Desktop Notification",
    [SETTINGS.SERVICES_DESKTOP_NOTIFICATION_DESCIPTION]:
      "Notify through the desktop notification when the alert configured has reached its threshold.",
    [SETTINGS.SERVICES_MINIMIZE_ON_CLOSE]: "Minimize on Close",
    [SETTINGS.SERVICES_MINIMIZE_ON_CLOSE_DESCIPTION]:
      "Upon clicking the exit button, instead of exiting the program, it minimize to tray instead.",
    [SETTINGS.SERVICES_START_ON_BOOT]: "Start on Boot",
    [SETTINGS.SERVICES_START_ON_BOOT_DESCIPTION]:
      "Automatically start the program upon logon. Recommended to have consistent logs recorded.",

    [SETTINGS.LOGGING]: "Logging",
    [SETTINGS.ENABLE_LOGGING]: "Enable Logging",
    [SETTINGS.ENABLE_LOGGING_DESCIPTION]:
      "Log the activities that is happening when the program is running. Useful to find out bugs.",
    [SETTINGS.LOGGING_PATH]: "Logging Path",
    [SETTINGS.LOGGING_PATH_DESCIPTION]:
      "The folder or directory to keep track of the generated logs. Defaults to the application log path.",
      [SETTINGS.LOGGING_PATH_PLACEHOLDER]: "Select a logging directory",
    [SETTINGS.BACKUP]: "Backup",
    [SETTINGS.ENABLE_BACKUP]: "Enable Backup",
    [SETTINGS.ENABLE_BACKUP_DESCIPTION]: "Safely creates a restore point that can be restored from a previous snapshot.",
    [SETTINGS.BACKUP_PATH]: "Backup Path",
    [SETTINGS.BACKUP_PATH_DESCIPTION]: "The folder or directory to keep the backup for the application data. Defaults to the application data path.",
    [SETTINGS.BACKUP_PATH_PLACEHOLDER]: "Select a backup directory",
    [SETTINGS.BACKUP_FREQUENCY]: "Backup Frequency",
    [SETTINGS.BACKUP_FREQUENCY_DESCIPTION]: "The interval of which the data will be backed-up to create restorable snapshots. Defaults to 7 days.",
    [SETTINGS.SAVE_CHANGES]: "Save Changes",
  },
  zh: {
    "header.misc": "杂项",
    "header.misc.openExplorer": "打开资源管理器",
    "header.misc.utility": "实用工具",
    "header.misc.export": "导出",
    "header.misc.print": "打印",
    "header.misc.exit": "退出",
    "header.alerts": "警报",
    "header.charts": "图表",
    "header.settings": "设置",

    "home.log": "今日的磁盘信息已被记录。",
    "home.search.placeholder": "搜索...",

    [SETTINGS.TITLE]: "设置",
    [SETTINGS.PRESENTATION]: "展示",
    [SETTINGS.DARK_MODE]: "暗黑模式",
    [SETTINGS.DARK_MODE_DESCIPTION]: "可用的主题目前有浅色和深色。暗黑模式可以大大缓解眼睛疲劳。",
    [SETTINGS.SEARCH_BAR]: "搜索栏",
    [SETTINGS.SEARCH_BAR_DESCIPTION]: "是否为适用的页面启用搜索栏功能。",
    [SETTINGS.LANGUAGE]: "语言",
    [SETTINGS.LANGUAGE_DESCIPTION]: "用户界面使用的语言来自有限的预设。",
    [SETTINGS.LANGUAGE_DEFAULT_LABEL]: "选择语言",
    [SETTINGS.PREFETCH_COUNT]: "数据点索取数",
    [SETTINGS.PREFETCH_COUNT_DESCIPTION]: "首选从历史记录中获取的数据点数。最佳建议是20。",
    [SETTINGS.PREFETCH_COUNT_PLACEHOLDER]: "数量",
    [SETTINGS.BYTE_DISPLAY]: "字节显示",
    [SETTINGS.BYTE_DISPLAY_DESCIPTION]: "默认显示字节的格式。",
    [SETTINGS.BYTE_DISPLAY_DEFAULT_LABEL]: "选择字节格式",

[SETTINGS.SERVICES]: "服务",
    [SETTINGS.SERVICES_DESKTOP_NOTIFICATION]: "桌面通知",
    [SETTINGS.SERVICES_DESKTOP_NOTIFICATION_DESCIPTION]:
      "当配置的警报达到其阈值时，通过桌面通知进行提醒。",
    [SETTINGS.SERVICES_MINIMIZE_ON_CLOSE]: "关闭时最小化",
    [SETTINGS.SERVICES_MINIMIZE_ON_CLOSE_DESCIPTION]:
      "点击退出按钮时，不退出程序，而是最小化到托盘。",
    [SETTINGS.SERVICES_START_ON_BOOT]: "开机启动",
    [SETTINGS.SERVICES_START_ON_BOOT_DESCIPTION]:
      "登录时自动启动程序。建议启用以保持日志记录的连续性。",

    [SETTINGS.LOGGING]: "日志记录",
    [SETTINGS.ENABLE_LOGGING]: "启用日志记录",
    [SETTINGS.ENABLE_LOGGING_DESCIPTION]:
      "记录程序运行时发生的活动。有助于发现错误。",
    [SETTINGS.LOGGING_PATH]: "日志路径",
    [SETTINGS.LOGGING_PATH_DESCIPTION]:
      "用于保存生成日志的文件夹或目录。默认为应用程序日志路径。",
      [SETTINGS.LOGGING_PATH_PLACEHOLDER]: "选择日志目录",
    [SETTINGS.BACKUP]: "备份",
    [SETTINGS.ENABLE_BACKUP]: "启用备份",
    [SETTINGS.ENABLE_BACKUP_DESCIPTION]: "安全地创建还原点，可以从以前的快照中恢复。",
    [SETTINGS.BACKUP_PATH]: "备份路径",
    [SETTINGS.BACKUP_PATH_DESCIPTION]: "用于保存应用程序数据备份的文件夹或目录。默认为应用程序数据路径。",
    [SETTINGS.BACKUP_PATH_PLACEHOLDER]: "选择备份目录",
    [SETTINGS.BACKUP_FREQUENCY]: "备份频率",
    [SETTINGS.BACKUP_FREQUENCY_DESCIPTION]: "数据备份以创建可还原快照的时间间隔。默认为7天。",
    [SETTINGS.SAVE_CHANGES]: "保存更改",
  },
  ja: {
    "header.misc": "その他",
    "header.misc.openExplorer": "エクスプローラーを開く",
    "header.misc.utility": "ユーティリティ",
    "header.misc.export": "エクスポート",
    "header.misc.print": "印刷",
    "header.misc.exit": "終了",
    "header.alerts": "アラート",
    "header.charts": "チャート",
    "header.settings": "設定",

    "home.log": "本日のディスク情報は既に記録されています。",
    "home.search.placeholder": "検索...",

    [SETTINGS.TITLE]: "設定",
    [SETTINGS.PRESENTATION]: "表示",
    [SETTINGS.DARK_MODE]: "ダークモード",
    [SETTINGS.DARK_MODE_DESCIPTION]: "現在利用可能なテーマはライトとダークです。ダークモードは目の負担を大幅に軽減します。",
    [SETTINGS.SEARCH_BAR]: "検索バー",
    [SETTINGS.SEARCH_BAR_DESCIPTION]: "該当するページで検索バー機能を有効にするかどうか。",
    [SETTINGS.LANGUAGE]: "言語",
    [SETTINGS.LANGUAGE_DESCIPTION]: "限定されたプリセットからユーザーインターフェースに使用される言語。",
    [SETTINGS.LANGUAGE_DEFAULT_LABEL]: "言語を選択",
    [SETTINGS.PREFETCH_COUNT]: "プリフェッチ数",
    [SETTINGS.PREFETCH_COUNT_DESCIPTION]: "履歴から取得するデータポイントの推奨数。最適な推奨値は20です。",
    [SETTINGS.PREFETCH_COUNT_PLACEHOLDER]: "数",
    [SETTINGS.BYTE_DISPLAY]: "バイト表示",
    [SETTINGS.BYTE_DISPLAY_DESCIPTION]: "バイトがデフォルトで表示される形式。",
    [SETTINGS.BYTE_DISPLAY_DEFAULT_LABEL]: "バイト形式を選択",

    [SETTINGS.SERVICES]: "サービス",
    [SETTINGS.SERVICES_DESKTOP_NOTIFICATION]: "デスクトップ通知",
    [SETTINGS.SERVICES_DESKTOP_NOTIFICATION_DESCIPTION]:
      "設定されたアラートがしきい値に達したときにデスクトップ通知で通知します。",
    [SETTINGS.SERVICES_MINIMIZE_ON_CLOSE]: "閉じる時に最小化",
    [SETTINGS.SERVICES_MINIMIZE_ON_CLOSE_DESCIPTION]:
      "終了ボタンをクリックすると、プログラムを終了せずにトレイに最小化します。",
    [SETTINGS.SERVICES_START_ON_BOOT]: "起動時に開始",
    [SETTINGS.SERVICES_START_ON_BOOT_DESCIPTION]:
      "ログオン時にプログラムを自動的に開始します。一貫したログ記録のために推奨されます。",

    [SETTINGS.LOGGING]: "ログ記録",
    [SETTINGS.ENABLE_LOGGING]: "ログ記録を有効化",
    [SETTINGS.ENABLE_LOGGING_DESCIPTION]:
      "プログラムの実行中に発生するアクティビティを記録します。バグの発見に役立ちます。",
    [SETTINGS.LOGGING_PATH]: "ログパス",
    [SETTINGS.LOGGING_PATH_DESCIPTION]:
      "生成されたログを保存するフォルダまたはディレクトリ。デフォルトはアプリケーションのログパスです。",
      [SETTINGS.LOGGING_PATH_PLACEHOLDER]: "ログディレクトリを選択",
    [SETTINGS.BACKUP]: "バックアップ",
    [SETTINGS.ENABLE_BACKUP]: "バックアップを有効化",
    [SETTINGS.ENABLE_BACKUP_DESCIPTION]: "以前のスナップショットから復元できる復元ポイントを安全に作成します。",
    [SETTINGS.BACKUP_PATH]: "バックアップパス",
    [SETTINGS.BACKUP_PATH_DESCIPTION]: "アプリケーションデータのバックアップを保存するフォルダまたはディレクトリ。デフォルトはアプリケーションのデータパスです。",
    [SETTINGS.BACKUP_PATH_PLACEHOLDER]: "バックアップディレクトリを選択",
    [SETTINGS.BACKUP_FREQUENCY]: "バックアップ頻度",
    [SETTINGS.BACKUP_FREQUENCY_DESCIPTION]: "復元可能なスナップショットを作成するためにデータがバックアップされる間隔。デフォルトは7日です。",
    [SETTINGS.SAVE_CHANGES]: "変更を保存",
  },
  ms: {
    "header.misc": "Pelbagai",
    "header.misc.openExplorer": "Buka Penjelajah",
    "header.misc.utility": "Utiliti",
    "header.misc.export": "Eksport",
    "header.misc.print": "Cetak",
    "header.misc.exit": "Keluar",
    "header.alerts": "Amaran",
    "header.charts": "Carta",
    "header.settings": "Tetapan",

    "home.log": "Maklumat cakera hari ini telah direkodkan.",
    "home.search.placeholder": "Cari...",

    [SETTINGS.TITLE]: "Tetapan",
    [SETTINGS.PRESENTATION]: "Persembahan",
    [SETTINGS.DARK_MODE]: "Mod Gelap",
    [SETTINGS.DARK_MODE_DESCIPTION]: "Tema yang tersedia pada masa ini adalah cerah dan gelap. Mod gelap mengurangkan ketegangan mata dengan ketara.",
    [SETTINGS.SEARCH_BAR]: "Bar Carian",
    [SETTINGS.SEARCH_BAR_DESCIPTION]: "Sama ada untuk membolehkan fungsi bar carian untuk halaman yang berkaitan.",
    [SETTINGS.LANGUAGE]: "Bahasa",
    [SETTINGS.LANGUAGE_DESCIPTION]: "Bahasa yang digunakan untuk antara muka pengguna daripada pratetap yang terhad.",
    [SETTINGS.LANGUAGE_DEFAULT_LABEL]: "Pilih bahasa",
    [SETTINGS.PREFETCH_COUNT]: "Kiraan Praambil",
    [SETTINGS.PREFETCH_COUNT_DESCIPTION]: "Bilangan titik data yang diutamakan untuk diambil daripada sejarah. Cadangan optimum ialah 20.",
    [SETTINGS.PREFETCH_COUNT_PLACEHOLDER]: "Kiraan",
    [SETTINGS.BYTE_DISPLAY]: "Paparan Bait",
    [SETTINGS.BYTE_DISPLAY_DESCIPTION]: "Format di mana bait akan dipaparkan secara lalai.",
    [SETTINGS.BYTE_DISPLAY_DEFAULT_LABEL]: "Pilih format bait",

    [SETTINGS.SERVICES]: "Perkhidmatan",
    [SETTINGS.SERVICES_DESKTOP_NOTIFICATION]: "Pemberitahuan Desktop",
    [SETTINGS.SERVICES_DESKTOP_NOTIFICATION_DESCIPTION]:
      "Memberitahu melalui pemberitahuan desktop apabila amaran yang dikonfigurasi telah mencapai ambangnya.",
    [SETTINGS.SERVICES_MINIMIZE_ON_CLOSE]: "Minimize semasa Tutup",
    [SETTINGS.SERVICES_MINIMIZE_ON_CLOSE_DESCIPTION]:
      "Apabila mengklik butang keluar, program akan diminimumkan ke dulang dan bukannya keluar.",
    [SETTINGS.SERVICES_START_ON_BOOT]: "Mulakan semasa But",
    [SETTINGS.SERVICES_START_ON_BOOT_DESCIPTION]:
      "Mulakan program secara automatik semasa log masuk. Disyorkan untuk merekod log yang konsisten.",

    [SETTINGS.LOGGING]: "Pengelogan",
    [SETTINGS.ENABLE_LOGGING]: "Dayakan Pengelogan",
    [SETTINGS.ENABLE_LOGGING_DESCIPTION]:
      "Merekod aktiviti yang berlaku semasa program berjalan. Berguna untuk mencari pepijat.",
    [SETTINGS.LOGGING_PATH]: "Laluan Log",
    [SETTINGS.LOGGING_PATH_DESCIPTION]:
      "Folder atau direktori untuk menjejak log yang dijana. Lalai kepada laluan log aplikasi.",
      [SETTINGS.LOGGING_PATH_PLACEHOLDER]: "Pilih direktori pengelogan",
    [SETTINGS.BACKUP]: "Sandaran",
    [SETTINGS.ENABLE_BACKUP]: "Dayakan Sandaran",
    [SETTINGS.ENABLE_BACKUP_DESCIPTION]: "Mencipta titik pemulihan dengan selamat yang boleh dipulihkan daripada petikan sebelumnya.",
    [SETTINGS.BACKUP_PATH]: "Laluan Sandaran",
    [SETTINGS.BACKUP_PATH_DESCIPTION]: "Folder atau direktori untuk menyimpan sandaran data aplikasi. Lalai kepada laluan data aplikasi.",
    [SETTINGS.BACKUP_PATH_PLACEHOLDER]: "Pilih direktori sandaran",
    [SETTINGS.BACKUP_FREQUENCY]: "Kekerapan Sandaran",
    [SETTINGS.BACKUP_FREQUENCY_DESCIPTION]: "Selang masa di mana data akan disandarkan untuk mencipta petikan yang boleh dipulihkan. Lalai kepada 7 hari.",
    [SETTINGS.SAVE_CHANGES]: "Simpan Perubahan",
  },
  ko: {
    "header.misc": "기타",
    "header.misc.openExplorer": "탐색기 열기",
    "header.misc.utility": "유틸리티",
    "header.misc.export": "내보내기",
    "header.misc.print": "인쇄",
    "header.misc.exit": "종료",
    "header.alerts": "알림",
    "header.charts": "차트",
    "header.settings": "설정",

    "home.log": "오늘의 디스크 정보가 이미 기록되었습니다.",
    "home.search.placeholder": "검색...",

    [SETTINGS.TITLE]: "설정",
    [SETTINGS.PRESENTATION]: "표시",
    [SETTINGS.DARK_MODE]: "다크 모드",
    [SETTINGS.DARK_MODE_DESCIPTION]: "현재 사용 가능한 테마는 라이트와 다크입니다. 다크 모드는 눈의 피로를 크게 줄여줍니다.",
    [SETTINGS.SEARCH_BAR]: "검색 바",
    [SETTINGS.SEARCH_BAR_DESCIPTION]: "해당 페이지에서 검색 바 기능을 활성화할지 여부입니다.",
    [SETTINGS.LANGUAGE]: "언어",
    [SETTINGS.LANGUAGE_DESCIPTION]: "제한된 프리셋에서 사용자 인터페이스에 사용되는 언어입니다.",
    [SETTINGS.LANGUAGE_DEFAULT_LABEL]: "언어 선택",
    [SETTINGS.PREFETCH_COUNT]: "프리페치 개수",
    [SETTINGS.PREFETCH_COUNT_DESCIPTION]: "기록에서 가져올 데이터 포인트의 선호 개수입니다. 최적 권장값은 20입니다.",
    [SETTINGS.PREFETCH_COUNT_PLACEHOLDER]: "개수",
    [SETTINGS.BYTE_DISPLAY]: "바이트 표시",
    [SETTINGS.BYTE_DISPLAY_DESCIPTION]: "바이트가 기본적으로 표시되는 형식입니다.",
    [SETTINGS.BYTE_DISPLAY_DEFAULT_LABEL]: "바이트 형식 선택",

    [SETTINGS.SERVICES]: "서비스",
    [SETTINGS.SERVICES_DESKTOP_NOTIFICATION]: "데스크톱 알림",
    [SETTINGS.SERVICES_DESKTOP_NOTIFICATION_DESCIPTION]:
      "구성된 경고가 임계값에 도달하면 데스크톱 알림을 통해 알립니다.",
    [SETTINGS.SERVICES_MINIMIZE_ON_CLOSE]: "닫을 때 최소화",
    [SETTINGS.SERVICES_MINIMIZE_ON_CLOSE_DESCIPTION]:
      "종료 버튼을 클릭하면 프로그램을 종료하는 대신 트레이로 최소화합니다.",
    [SETTINGS.SERVICES_START_ON_BOOT]: "부팅 시 시작",
    [SETTINGS.SERVICES_START_ON_BOOT_DESCIPTION]:
      "로그온 시 프로그램을 자동으로 시작합니다. 일관된 로그 기록을 위해 권장됩니다.",

    [SETTINGS.LOGGING]: "로깅",
    [SETTINGS.ENABLE_LOGGING]: "로깅 활성화",
    [SETTINGS.ENABLE_LOGGING_DESCIPTION]:
      "프로그램이 실행되는 동안 발생하는 활동을 기록합니다. 버그를 찾는 데 유용합니다.",
    [SETTINGS.LOGGING_PATH]: "로그 경로",
    [SETTINGS.LOGGING_PATH_DESCIPTION]:
      "생성된 로그를 추적하기 위한 폴더 또는 디렉토리입니다. 기본값은 애플리케이션 로그 경로입니다.",
      [SETTINGS.LOGGING_PATH_PLACEHOLDER]: "로깅 디렉토리 선택",
    [SETTINGS.BACKUP]: "백업",
    [SETTINGS.ENABLE_BACKUP]: "백업 활성화",
    [SETTINGS.ENABLE_BACKUP_DESCIPTION]: "이전 스냅샷에서 복원할 수 있는 복원 지점을 안전하게 생성합니다.",
    [SETTINGS.BACKUP_PATH]: "백업 경로",
    [SETTINGS.BACKUP_PATH_DESCIPTION]: "애플리케이션 데이터의 백업을 보관하기 위한 폴더 또는 디렉토리입니다. 기본값은 애플리케이션 데이터 경로입니다.",
    [SETTINGS.BACKUP_PATH_PLACEHOLDER]: "백업 디렉토리 선택",
    [SETTINGS.BACKUP_FREQUENCY]: "백업 빈도",
    [SETTINGS.BACKUP_FREQUENCY_DESCIPTION]: "복원 가능한 스냅샷을 생성하기 위해 데이터가 백업되는 간격입니다. 기본값은 7일입니다.",
    [SETTINGS.SAVE_CHANGES]: "변경 사항 저장",
  },
  pt: {
    "header.misc": "Diversos",
    "header.misc.openExplorer": "Abrir Explorador",
    "header.misc.utility": "Utilitário",
    "header.misc.export": "Exportar",
    "header.misc.print": "Imprimir",
    "header.misc.exit": "Sair",
    "header.alerts": "Alertas",
    "header.charts": "Gráficos",
    "header.settings": "Configurações",

    "home.log": "As informações do disco de hoje já foram registradas.",
    "home.search.placeholder": "Pesquisar...",

    [SETTINGS.TITLE]: "Configurações",
    [SETTINGS.PRESENTATION]: "Apresentação",
    [SETTINGS.DARK_MODE]: "Modo Escuro",
    [SETTINGS.DARK_MODE_DESCIPTION]: "Os temas disponíveis atualmente são claro e escuro. O modo escuro alivia drasticamente os olhos.",
    [SETTINGS.SEARCH_BAR]: "Barra de Pesquisa",
    [SETTINGS.SEARCH_BAR_DESCIPTION]: "Se deve ativar a funcionalidade da barra de pesquisa para páginas aplicáveis.",
    [SETTINGS.LANGUAGE]: "Idioma",
    [SETTINGS.LANGUAGE_DESCIPTION]: "O idioma usado para a interface do usuário a partir de uma predefinição limitada.",
    [SETTINGS.LANGUAGE_DEFAULT_LABEL]: "Selecionar idioma",
    [SETTINGS.PREFETCH_COUNT]: "Contagem de Pré-busca",
    [SETTINGS.PREFETCH_COUNT_DESCIPTION]: "O número de pontos de dados preferidos para buscar do histórico. A sugestão ideal é 20.",
    [SETTINGS.PREFETCH_COUNT_PLACEHOLDER]: "Contagem",
    [SETTINGS.BYTE_DISPLAY]: "Exibição de Bytes",
    [SETTINGS.BYTE_DISPLAY_DESCIPTION]: "O formato no qual os bytes serão exibidos por padrão.",
    [SETTINGS.BYTE_DISPLAY_DEFAULT_LABEL]: "Selecionar formato de bytes",

    [SETTINGS.SERVICES]: "Serviços",
    [SETTINGS.SERVICES_DESKTOP_NOTIFICATION]: "Notificação da Área de Trabalho",
    [SETTINGS.SERVICES_DESKTOP_NOTIFICATION_DESCIPTION]:
      "Notifica através da notificação da área de trabalho quando o alerta configurado atingir seu limite.",
    [SETTINGS.SERVICES_MINIMIZE_ON_CLOSE]: "Minimizar ao Fechar",
    [SETTINGS.SERVICES_MINIMIZE_ON_CLOSE_DESCIPTION]:
      "Ao clicar no botão de saída, em vez de sair do programa, ele minimiza para a bandeja.",
    [SETTINGS.SERVICES_START_ON_BOOT]: "Iniciar na Inicialização",
    [SETTINGS.SERVICES_START_ON_BOOT_DESCIPTION]:
      "Inicia automaticamente o programa ao fazer login. Recomendado para ter registros consistentes gravados.",

    [SETTINGS.LOGGING]: "Registro",
    [SETTINGS.ENABLE_LOGGING]: "Ativar Registro",
    [SETTINGS.ENABLE_LOGGING_DESCIPTION]:
      "Registra as atividades que estão acontecendo quando o programa está em execução. Útil para descobrir bugs.",
    [SETTINGS.LOGGING_PATH]: "Caminho de Registro",
    [SETTINGS.LOGGING_PATH_DESCIPTION]:
      "A pasta ou diretório para rastrear os registros gerados. O padrão é o caminho de registro do aplicativo.",
      [SETTINGS.LOGGING_PATH_PLACEHOLDER]: "Selecionar um diretório de registro",
    [SETTINGS.BACKUP]: "Backup",
    [SETTINGS.ENABLE_BACKUP]: "Ativar Backup",
    [SETTINGS.ENABLE_BACKUP_DESCIPTION]: "Cria com segurança um ponto de restauração que pode ser restaurado a partir de um instantâneo anterior.",
    [SETTINGS.BACKUP_PATH]: "Caminho de Backup",
    [SETTINGS.BACKUP_PATH_DESCIPTION]: "A pasta ou diretório para manter o backup dos dados do aplicativo. O padrão é o caminho de dados do aplicativo.",
    [SETTINGS.BACKUP_PATH_PLACEHOLDER]: "Selecionar um diretório de backup",
    [SETTINGS.BACKUP_FREQUENCY]: "Frequência de Backup",
    [SETTINGS.BACKUP_FREQUENCY_DESCIPTION]: "O intervalo no qual os dados serão copiados para criar instantâneos restauráveis. O padrão é 7 dias.",
    [SETTINGS.SAVE_CHANGES]: "Salvar Alterações",
  },
  es: {
    "header.misc": "Varios",
    "header.misc.openExplorer": "Abrir Explorador",
    "header.misc.utility": "Utilidad",
    "header.misc.export": "Exportar",
    "header.misc.print": "Imprimir",
    "header.misc.exit": "Salir",
    "header.alerts": "Alertas",
    "header.charts": "Gráficos",
    "header.settings": "Configuraciones",

    "home.log": "La información del disco de hoy ya ha sido registrada.",
    "home.search.placeholder": "Buscar...",

    [SETTINGS.TITLE]: "Configuración",
    [SETTINGS.PRESENTATION]: "Presentación",
    [SETTINGS.DARK_MODE]: "Modo Oscuro",
    [SETTINGS.DARK_MODE_DESCIPTION]: "Los temas disponibles actualmente son claro y oscuro. El modo oscuro alivia drásticamente la vista.",
    [SETTINGS.SEARCH_BAR]: "Barra de Búsqueda",
    [SETTINGS.SEARCH_BAR_DESCIPTION]: "Si se debe habilitar la funcionalidad de la barra de búsqueda para las páginas aplicables.",
    [SETTINGS.LANGUAGE]: "Idioma",
    [SETTINGS.LANGUAGE_DESCIPTION]: "El idioma utilizado para la interfaz de usuario de una configuración predeterminada limitada.",
    [SETTINGS.LANGUAGE_DEFAULT_LABEL]: "Seleccionar idioma",
    [SETTINGS.PREFETCH_COUNT]: "Cantidad de Precarga",
    [SETTINGS.PREFETCH_COUNT_DESCIPTION]: "El número de puntos de datos que se prefiere obtener del historial. La sugerencia óptima es 20.",
    [SETTINGS.PREFETCH_COUNT_PLACEHOLDER]: "Cantidad",
    [SETTINGS.BYTE_DISPLAY]: "Visualización de Bytes",
    [SETTINGS.BYTE_DISPLAY_DESCIPTION]: "El formato en el que se mostrarán los bytes por defecto.",
    [SETTINGS.BYTE_DISPLAY_DEFAULT_LABEL]: "Seleccionar formato de bytes",

    [SETTINGS.SERVICES]: "Servicios",
    [SETTINGS.SERVICES_DESKTOP_NOTIFICATION]: "Notificación de Escritorio",
    [SETTINGS.SERVICES_DESKTOP_NOTIFICATION_DESCIPTION]:
      "Notifica a través de la notificación de escritorio cuando la alerta configurada ha alcanzado su umbral.",
    [SETTINGS.SERVICES_MINIMIZE_ON_CLOSE]: "Minimizar al Cerrar",
    [SETTINGS.SERVICES_MINIMIZE_ON_CLOSE_DESCIPTION]:
      "Al hacer clic en el botón de salida, en lugar de salir del programa, se minimiza a la bandeja.",
    [SETTINGS.SERVICES_START_ON_BOOT]: "Iniciar al Arrancar",
    [SETTINGS.SERVICES_START_ON_BOOT_DESCIPTION]:
      "Inicia automáticamente el programa al iniciar sesión. Se recomienda para tener registros consistentes grabados.",

    [SETTINGS.LOGGING]: "Registro",
    [SETTINGS.ENABLE_LOGGING]: "Habilitar Registro",
    [SETTINGS.ENABLE_LOGGING_DESCIPTION]:
      "Registra las actividades que están ocurriendo cuando el programa se está ejecutando. Útil para encontrar errores.",
    [SETTINGS.LOGGING_PATH]: "Ruta de Registro",
    [SETTINGS.LOGGING_PATH_DESCIPTION]:
      "La carpeta o directorio para realizar un seguimiento de los registros generados. Por defecto es la ruta de registro de la aplicación.",
      [SETTINGS.LOGGING_PATH_PLACEHOLDER]: "Seleccionar un directorio de registro",
    [SETTINGS.BACKUP]: "Copia de Seguridad",
    [SETTINGS.ENABLE_BACKUP]: "Habilitar Copia de Seguridad",
    [SETTINGS.ENABLE_BACKUP_DESCIPTION]: "Crea de forma segura un punto de restauración que puede restaurarse desde una instantánea anterior.",
    [SETTINGS.BACKUP_PATH]: "Ruta de Copia de Seguridad",
    [SETTINGS.BACKUP_PATH_DESCIPTION]: "La carpeta o directorio para mantener la copia de seguridad de los datos de la aplicación. Por defecto es la ruta de datos de la aplicación.",
    [SETTINGS.BACKUP_PATH_PLACEHOLDER]: "Seleccionar un directorio de copia de seguridad",
    [SETTINGS.BACKUP_FREQUENCY]: "Frecuencia de Copia de Seguridad",
    [SETTINGS.BACKUP_FREQUENCY_DESCIPTION]: "El intervalo en el que se realizará la copia de seguridad de los datos para crear instantáneas restaurables. Por defecto son 7 días.",
    [SETTINGS.SAVE_CHANGES]: "Guardar Cambios",
  },
};

export function getTranslation(locale: keyof I18n, key: string): string {
  const localeTranslations = translations[locale];
  return localeTranslations[key] || key;
}

export let locale = $state<{ current: keyof I18n }>({
  current: (localStorage.locale as keyof I18n) || "en",
});

export const t = (key: string, vars = {}) =>
  getTranslation(locale.current, key);
