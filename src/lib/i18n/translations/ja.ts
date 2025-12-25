import { type Translations } from "../translations.svelte";
import { SETTINGS, HEADER, HOME, DISK_DETAIL } from "./keys";

export const JA: Translations = {
  [HEADER.MISC]: "その他",
  [HEADER.OPEN_EXPLORER]: "エクスプローラーを開く",
  [HEADER.UTILITY]: "ユーティリティ",
  [HEADER.EXPORT]: "エクスポート",
  [HEADER.PRINT]: "印刷",
  [HEADER.EXIT]: "終了",
  [HEADER.ALERTS]: "アラート",
  [HEADER.CHARTS]: "チャート",
  [HEADER.SETTINGS]: "設定",

  [HOME.LOG]: "本日のディスク情報は既に記録されています。",
  [HOME.SEARCH_PLACEHOLDER]: "検索...",
  [HOME.DISK_COUNT]: "ディスク{diskCount}枚",
  [HOME.WARNING_NO_DISKS]: "名前のないディスクがあります",
  [HOME.WARNING_NO_DISKS_DESCRIPTION]:
    "システム上の1つ以上のディスクに名前が割り当てられていません。予期しない動作を防ぐために、適切に名前を付けてください。",

  [SETTINGS.TITLE]: "設定",
  [SETTINGS.PRESENTATION]: "表示",
  [SETTINGS.DARK_MODE]: "ダークモード",
  [SETTINGS.DARK_MODE_DESCIPTION]:
    "現在利用可能なテーマはライトとダークです。ダークモードは目の負担を大幅に軽減します。",
  [SETTINGS.SEARCH_BAR]: "検索バー",
  [SETTINGS.SEARCH_BAR_DESCIPTION]:
    "該当するページで検索バー機能を有効にするかどうか。",
  [SETTINGS.LANGUAGE]: "言語",
  [SETTINGS.LANGUAGE_DESCIPTION]:
    "限定されたプリセットからユーザーインターフェースに使用される言語。",
  [SETTINGS.LANGUAGE_DEFAULT_LABEL]: "言語を選択",
  [SETTINGS.PREFETCH_COUNT]: "プリフェッチ数",
  [SETTINGS.PREFETCH_COUNT_DESCIPTION]:
    "履歴から取得するデータポイントの推奨数。最適な推奨値は20です。",
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
  [SETTINGS.ENABLE_BACKUP_DESCIPTION]:
    "以前のスナップショットから復元できる復元ポイントを安全に作成します。",
  [SETTINGS.BACKUP_PATH]: "バックアップパス",
  [SETTINGS.BACKUP_PATH_DESCIPTION]:
    "アプリケーションデータのバックアップを保存するフォルダまたはディレクトリ。デフォルトはアプリケーションのデータパスです。",
  [SETTINGS.BACKUP_PATH_PLACEHOLDER]: "バックアップディレクトリを選択",
  [SETTINGS.BACKUP_FREQUENCY]: "バックアップ頻度",
  [SETTINGS.BACKUP_FREQUENCY_DESCIPTION]:
    "復元可能なスナップショットを作成するためにデータがバックアップされる間隔。デフォルトは7日です。",
  [SETTINGS.SAVE_CHANGES]: "変更を保存",

  [DISK_DETAIL.DESCRIPTION]:
    "システム上の {diskName} という名前のディスクに関する詳細情報。",
};

export default JA;
