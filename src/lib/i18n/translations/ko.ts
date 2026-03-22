import { ALERTS, CHARTS, DISK_DETAIL, HEADER, HOME, SETTINGS } from "./keys";

import type { Translations } from "../translations.svelte";

export const KO: Translations = {
  [HEADER.MISC]: "기타",
  [HEADER.OPEN_EXPLORER]: "탐색기 열기",
  [HEADER.UTILITY]: "유틸리티",
  [HEADER.EXPORT]: "내보내기",
  [HEADER.PRINT]: "인쇄",
  [HEADER.EXIT]: "종료",
  [HEADER.ALERTS]: "알림",
  [HEADER.CHARTS]: "차트",
  [HEADER.SETTINGS]: "설정",

  [HOME.LOG]: "오늘의 디스크 정보가 이미 기록되었습니다.",
  [HOME.SEARCH_PLACEHOLDER]: "검색...",
  [HOME.SEARCH_EMPTY]: "쿼리와 일치하는 디스크를 찾을 수 없습니다.",
  [HOME.DISK_COUNT]: "디스크 {diskCount}개",
  [HOME.WARNING_NO_DISKS]: "이름 없는 디스크가 있습니다",
  [HOME.WARNING_NO_DISKS_DESCRIPTION]:
    "시스템 상의 하나 이상의 디스크에 이름이 할당되어 있지 않습니다. 예기치 않은 동작을 방지하려면 적절히 이름을 지정해 주세요.",

  [SETTINGS.TITLE]: "설정",
  [SETTINGS.PRESENTATION]: "표시",
  [SETTINGS.DARK_MODE]: "다크 모드",
  [SETTINGS.DARK_MODE_DESCIPTION]:
    "현재 사용 가능한 테마는 라이트와 다크입니다. 다크 모드는 눈의 피로를 크게 줄여줍니다.",
  [SETTINGS.SEARCH_BAR]: "검색 바",
  [SETTINGS.SEARCH_BAR_DESCIPTION]:
    "해당 페이지에서 검색 바 기능을 활성화할지 여부입니다.",
  [SETTINGS.LANGUAGE]: "언어",
  [SETTINGS.LANGUAGE_DESCIPTION]:
    "제한된 프리셋에서 사용자 인터페이스에 사용되는 언어입니다.",
  [SETTINGS.LANGUAGE_DEFAULT_LABEL]: "언어 선택",
  [SETTINGS.PREFETCH_COUNT]: "프리페치 개수",
  [SETTINGS.PREFETCH_COUNT_DESCIPTION]:
    "기록에서 가져올 데이터 포인트의 선호 개수입니다. 최적 권장값은 20입니다.",
  [SETTINGS.PREFETCH_COUNT_PLACEHOLDER]: "개수",
  [SETTINGS.BYTE_DISPLAY]: "바이트 표시",
  [SETTINGS.BYTE_DISPLAY_DESCIPTION]:
    "바이트가 기본적으로 표시되는 형식입니다.",
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
  [SETTINGS.ENABLE_BACKUP_DESCIPTION]:
    "이전 스냅샷에서 복원할 수 있는 복원 지점을 안전하게 생성합니다.",
  [SETTINGS.BACKUP_PATH]: "백업 경로",
  [SETTINGS.BACKUP_PATH_DESCIPTION]:
    "애플리케이션 데이터의 백업을 보관하기 위한 폴더 또는 디렉토리입니다. 기본값은 애플리케이션 데이터 경로입니다.",
  [SETTINGS.BACKUP_PATH_PLACEHOLDER]: "백업 디렉토리 선택",
  [SETTINGS.BACKUP_FREQUENCY]: "백업 빈도",
  [SETTINGS.BACKUP_FREQUENCY_DESCIPTION]:
    "복원 가능한 스냅샷을 생성하기 위해 데이터가 백업되는 간격입니다. 기본값은 7일입니다.",
  [SETTINGS.SAVE_CHANGES]: "변경 사항 저장",

  [DISK_DETAIL.DESCRIPTION]:
    "시스템 상의 {diskName}라는 이름의 디스크에 대한 자세한 정보.",

  [DISK_DETAIL.SIZE]: "크기",
  [DISK_DETAIL.SIZE_AVAILABLE_SPACE]: "사용 가능한 공간",
  [DISK_DETAIL.SIZE_TOTAL_SPACE]: "전체 공간",
  [DISK_DETAIL.SIZE_USED_SPACE]: "사용된 공간",
  [DISK_DETAIL.PROPERTIES]: "속성",
  [DISK_DETAIL.PROPERTIES_MODE]: "모드",
  [DISK_DETAIL.PROPERTIES_REMOVABLE]: "이동식",
  [DISK_DETAIL.PROPERTIES_FS]: "파일 시스템",
  [DISK_DETAIL.PROPERTIES_TYPE]: "유형",

  [ALERTS.EMPTY_TITLE]: "아직 알림이 없습니다",
  [ALERTS.EMPTY_DESCRIPTION]:
    "아직 알림을 생성하지 않았습니다. 첫 번째 알림을 생성하여 시작하세요.",
  [ALERTS.EMPTY_LEARN_MORE]: "자세히 알아보기",
  [ALERTS.SEARCH]: "알림 검색...",
  [ALERTS.SEARCH_EMPTY]: "해당 검색어와 일치하는 알림이 없습니다.",
  [ALERTS.CREATE_ALERT_BUTTON]: "알림 생성",
  [ALERTS.CREATE_DIALOG_TITLE]: "새 알림 생성",
  [ALERTS.CREATE_DIALOG_DESCRIPTION]:
    "아래에서 새 알림에 대한 설정을 구성하세요.",
  [ALERTS.CREATE_DIALOG_NAME_LABEL]: "이름",
  [ALERTS.CREATE_DIALOG_NAME_DESCRIPTION]: "알림 설정의 이름입니다.",
  [ALERTS.CREATE_DIALOG_FREQ_LABEL]: "빈도",
  [ALERTS.CREATE_DIALOG_FREQ_DESCRIPTION]: "알림 설정 확인 빈도입니다.",
  [ALERTS.CREATE_DIALOG_THRESHOLD_LABEL]: "임계값",
  [ALERTS.CREATE_DIALOG_THRESHOLD_DESCRIPTION]:
    "알림을 트리거하기 위한 임계값입니다.",
  [ALERTS.CREATE_DIALOG_RULE_LABEL]: "규칙",
  [ALERTS.CREATE_DIALOG_RULE_DESCRIPTION]: "알림 설정 확인을 위한 규칙입니다.",
  [ALERTS.CREATE_DIALOG_DISKNAME_LABEL]: "디스크 이름",
  [ALERTS.CREATE_DIALOG_DISKNAME_LABEL_SELECT]: "디스크 선택",
  [ALERTS.CREATE_DIALOG_DISKNAME_LABEL_DROPDOWN]: "디스크",
  [ALERTS.CREATE_DIALOG_DISKNAME_DESCRIPTION]:
    "알림을 받을 디스크의 이름입니다.",
  [ALERTS.CREATE_DIALOG_CREATE_BUTTON]: "생성",
  [ALERTS.LABEL_SELECT_RULE]: "규칙 선택",
  [ALERTS.FORM_ERROR]: "양식의 오류를 수정해 주세요.",

  [CHARTS.TITLE]: "차트",
  [CHARTS.DISK_USAGE_CHANGE_PCT_TITLE]: "디스크 사용량 변화율",
  [CHARTS.DISK_USAGE_CHANGE_PCT_DESCRIPTION]:
    "어제와 비교한 개별 디스크 사용량의 분석을 표시합니다.",
  [CHARTS.DISK_AVAILABLE_SPACE_TITLE]: "디스크 사용 가능 공간",
  [CHARTS.DISK_AVAILABLE_SPACE_DESCRIPTION]:
    "현재 PC의 개별 디스크 사용 가능 공간의 분석을 표시합니다.",
  [CHARTS.DISK_USAGE_TITLE]: "디스크 사용량(GB)",
  [CHARTS.DISK_USAGE_DESCRIPTION]:
    "현재 PC의 개별 디스크 사용량의 분석을 표시합니다.",
  [CHARTS.DISK_USAGE_PCT_TITLE]: "디스크 사용률(백분율)",
  [CHARTS.DISK_USAGE_PCT_DESCRIPTION]:
    "현재 PC의 개별 디스크 사용률을 백분율로 분석하여 표시합니다.",
};

export default KO;
