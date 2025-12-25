import { type Translations } from "../translations.svelte";
import { SETTINGS, HEADER, HOME, DISK_DETAIL } from "./keys";

export const ZH: Translations = {
  [HEADER.MISC]: "杂项",
  [HEADER.OPEN_EXPLORER]: "打开资源管理器",
  [HEADER.UTILITY]: "实用工具",
  [HEADER.EXPORT]: "导出",
  [HEADER.PRINT]: "打印",
  [HEADER.EXIT]: "退出",
  [HEADER.ALERTS]: "警报",
  [HEADER.CHARTS]: "图表",
  [HEADER.SETTINGS]: "设置",

  [HOME.LOG]: "今日的磁盘信息已被记录。",
  [HOME.SEARCH_PLACEHOLDER]: "搜索...",
  [HOME.DISK_COUNT]: "{diskCount}个磁盘",
  [HOME.WARNING_NO_DISKS]: "你有一个未命名的磁盘",
  [HOME.WARNING_NO_DISKS_DESCRIPTION]:
    "系统上的一个或多个磁盘没有分配名称。为防止意外行为，请相应地为它们命名。",

  [SETTINGS.TITLE]: "设置",
  [SETTINGS.PRESENTATION]: "展示",
  [SETTINGS.DARK_MODE]: "暗黑模式",
  [SETTINGS.DARK_MODE_DESCIPTION]:
    "可用的主题目前有浅色和深色。暗黑模式可以大大缓解眼睛疲劳。",
  [SETTINGS.SEARCH_BAR]: "搜索栏",
  [SETTINGS.SEARCH_BAR_DESCIPTION]: "是否为适用的页面启用搜索栏功能。",
  [SETTINGS.LANGUAGE]: "语言",
  [SETTINGS.LANGUAGE_DESCIPTION]: "用户界面使用的语言来自有限的预设。",
  [SETTINGS.LANGUAGE_DEFAULT_LABEL]: "选择语言",
  [SETTINGS.PREFETCH_COUNT]: "数据点索取数",
  [SETTINGS.PREFETCH_COUNT_DESCIPTION]:
    "首选从历史记录中获取的数据点数。最佳建议是20。",
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
  [SETTINGS.ENABLE_BACKUP_DESCIPTION]:
    "安全地创建还原点，可以从以前的快照中恢复。",
  [SETTINGS.BACKUP_PATH]: "备份路径",
  [SETTINGS.BACKUP_PATH_DESCIPTION]:
    "用于保存应用程序数据备份的文件夹或目录。默认为应用程序数据路径。",
  [SETTINGS.BACKUP_PATH_PLACEHOLDER]: "选择备份目录",
  [SETTINGS.BACKUP_FREQUENCY]: "备份频率",
  [SETTINGS.BACKUP_FREQUENCY_DESCIPTION]:
    "数据备份以创建可还原快照的时间间隔。默认为7天。",
  [SETTINGS.SAVE_CHANGES]: "保存更改",

  [DISK_DETAIL.DESCRIPTION]: "系统上名为 {diskName} 的磁盘的详细信息。",
  [DISK_DETAIL.SIZE]: "大小",
  [DISK_DETAIL.SIZE_AVAILABLE_SPACE]: "可用空间",
  [DISK_DETAIL.SIZE_TOTAL_SPACE]: "总空间",
  [DISK_DETAIL.SIZE_USED_SPACE]: "已用空间",
  [DISK_DETAIL.PROPERTIES]: "属性",
  [DISK_DETAIL.PROPERTIES_MODE]: "模式",
  [DISK_DETAIL.PROPERTIES_REMOVABLE]: "可移动",
  [DISK_DETAIL.PROPERTIES_FS]: "文件系统",
  [DISK_DETAIL.PROPERTIES_TYPE]: "类型",
};

export default ZH;
