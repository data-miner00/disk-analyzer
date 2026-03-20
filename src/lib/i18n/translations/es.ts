import type { Translations } from "../translations.svelte";
import { SETTINGS, HEADER, HOME, DISK_DETAIL, ALERTS, CHARTS } from "./keys";

export const ES: Translations = {
  [HEADER.MISC]: "Varios",
  [HEADER.OPEN_EXPLORER]: "Abrir Explorador",
  [HEADER.UTILITY]: "Utilidad",
  [HEADER.EXPORT]: "Exportar",
  [HEADER.PRINT]: "Imprimir",
  [HEADER.EXIT]: "Salir",
  [HEADER.ALERTS]: "Alertas",
  [HEADER.CHARTS]: "Gráficos",
  [HEADER.SETTINGS]: "Configuraciones",

  [HOME.LOG]: "La información del disco de hoy ya ha sido registrada.",
  [HOME.SEARCH_PLACEHOLDER]: "Buscar...",
  [HOME.DISK_COUNT]: "{diskCount} disco(s)",
  [HOME.WARNING_NO_DISKS]: "Tienes un disco sin nombre",
  [HOME.WARNING_NO_DISKS_DESCRIPTION]:
    "Uno o más discos de su sistema no tienen nombre asignado. Para evitar problemas, asígneles un nombre adecuado.",

  [SETTINGS.TITLE]: "Configuración",
  [SETTINGS.PRESENTATION]: "Presentación",
  [SETTINGS.DARK_MODE]: "Modo Oscuro",
  [SETTINGS.DARK_MODE_DESCIPTION]:
    "Los temas disponibles actualmente son claro y oscuro. El modo oscuro alivia drásticamente la vista.",
  [SETTINGS.SEARCH_BAR]: "Barra de Búsqueda",
  [SETTINGS.SEARCH_BAR_DESCIPTION]:
    "Si se debe habilitar la funcionalidad de la barra de búsqueda para las páginas aplicables.",
  [SETTINGS.LANGUAGE]: "Idioma",
  [SETTINGS.LANGUAGE_DESCIPTION]:
    "El idioma utilizado para la interfaz de usuario de una configuración predeterminada limitada.",
  [SETTINGS.LANGUAGE_DEFAULT_LABEL]: "Seleccionar idioma",
  [SETTINGS.PREFETCH_COUNT]: "Cantidad de Precarga",
  [SETTINGS.PREFETCH_COUNT_DESCIPTION]:
    "El número de puntos de datos que se prefiere obtener del historial. La sugerencia óptima es 20.",
  [SETTINGS.PREFETCH_COUNT_PLACEHOLDER]: "Cantidad",
  [SETTINGS.BYTE_DISPLAY]: "Visualización de Bytes",
  [SETTINGS.BYTE_DISPLAY_DESCIPTION]:
    "El formato en el que se mostrarán los bytes por defecto.",
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
  [SETTINGS.ENABLE_BACKUP_DESCIPTION]:
    "Crea de forma segura un punto de restauración que puede restaurarse desde una instantánea anterior.",
  [SETTINGS.BACKUP_PATH]: "Ruta de Copia de Seguridad",
  [SETTINGS.BACKUP_PATH_DESCIPTION]:
    "La carpeta o directorio para mantener la copia de seguridad de los datos de la aplicación. Por defecto es la ruta de datos de la aplicación.",
  [SETTINGS.BACKUP_PATH_PLACEHOLDER]:
    "Seleccionar un directorio de copia de seguridad",
  [SETTINGS.BACKUP_FREQUENCY]: "Frecuencia de Copia de Seguridad",
  [SETTINGS.BACKUP_FREQUENCY_DESCIPTION]:
    "El intervalo en el que se realizará la copia de seguridad de los datos para crear instantáneas restaurables. Por defecto son 7 días.",
  [SETTINGS.SAVE_CHANGES]: "Guardar Cambios",

  [DISK_DETAIL.DESCRIPTION]:
    "Información detallada sobre el disco llamado {diskName} en su sistema.",
  [DISK_DETAIL.SIZE]: "Tamaño",
  [DISK_DETAIL.SIZE_AVAILABLE_SPACE]: "Espacio disponible",
  [DISK_DETAIL.SIZE_TOTAL_SPACE]: "Espacio total",
  [DISK_DETAIL.SIZE_USED_SPACE]: "Espacio usado",
  [DISK_DETAIL.PROPERTIES]: "Propiedades",
  [DISK_DETAIL.PROPERTIES_MODE]: "Modo",
  [DISK_DETAIL.PROPERTIES_REMOVABLE]: "Extraíble",
  [DISK_DETAIL.PROPERTIES_FS]: "Sistema de Archivos",
  [DISK_DETAIL.PROPERTIES_TYPE]: "Tipo",

  [ALERTS.EMPTY_TITLE]: "Aún No Hay Alertas",
  [ALERTS.EMPTY_DESCRIPTION]:
    "Aún no has creado ninguna alerta. Comienza creando tu primera alerta.",
  [ALERTS.EMPTY_LEARN_MORE]: "Más Información",
  [ALERTS.SEARCH]: "Buscar alertas...",
  [ALERTS.CREATE_ALERT_BUTTON]: "Crear Alerta",
  [ALERTS.CREATE_DIALOG_TITLE]: "Crear Nueva Alerta",
  [ALERTS.CREATE_DIALOG_DESCRIPTION]:
    "Configure los ajustes para su nueva alerta a continuación.",
  [ALERTS.CREATE_DIALOG_NAME_LABEL]: "Nombre",
  [ALERTS.CREATE_DIALOG_NAME_DESCRIPTION]:
    "El nombre de la configuración de alerta.",
  [ALERTS.CREATE_DIALOG_FREQ_LABEL]: "Frecuencia",
  [ALERTS.CREATE_DIALOG_FREQ_DESCRIPTION]:
    "La frecuencia de verificación de la configuración de alerta.",
  [ALERTS.CREATE_DIALOG_THRESHOLD_LABEL]: "Umbral",
  [ALERTS.CREATE_DIALOG_THRESHOLD_DESCRIPTION]:
    "El valor umbral que debe alcanzarse para activar una alerta.",
  [ALERTS.CREATE_DIALOG_RULE_LABEL]: "Reglas",
  [ALERTS.CREATE_DIALOG_RULE_DESCRIPTION]:
    "La regla para la verificación de la configuración de alerta.",
  [ALERTS.CREATE_DIALOG_DISKNAME_LABEL]: "Nombre del Disco",
  [ALERTS.CREATE_DIALOG_DISKNAME_LABEL_SELECT]: "Seleccione un disco",
  [ALERTS.CREATE_DIALOG_DISKNAME_LABEL_DROPDOWN]: "Disco",
  [ALERTS.CREATE_DIALOG_DISKNAME_DESCRIPTION]:
    "El nombre del disco que será alertado.",
  [ALERTS.CREATE_DIALOG_CREATE_BUTTON]: "Crear",
  [ALERTS.LABEL_SELECT_RULE]: "Seleccione una regla",
  [ALERTS.FORM_ERROR]: "Por favor, corrija los errores en el formulario.",

  [CHARTS.TITLE]: "Gráficos",
  [CHARTS.DISK_USAGE_CHANGE_PCT_TITLE]: "Cambio de Uso del Disco en Porcentaje",
  [CHARTS.DISK_USAGE_CHANGE_PCT_DESCRIPTION]:
    "Muestra un desglose del uso de discos individuales en comparación con ayer.",
  [CHARTS.DISK_AVAILABLE_SPACE_TITLE]: "Espacio Disponible en Disco",
  [CHARTS.DISK_AVAILABLE_SPACE_DESCRIPTION]:
    "Muestra un desglose del espacio disponible de discos individuales para el PC actual.",
  [CHARTS.DISK_USAGE_TITLE]: "Uso del Disco en GB",
  [CHARTS.DISK_USAGE_DESCRIPTION]:
    "Muestra un desglose del uso de discos individuales para el PC actual.",
  [CHARTS.DISK_USAGE_PCT_TITLE]: "Uso del Disco en Porcentaje",
  [CHARTS.DISK_USAGE_PCT_DESCRIPTION]:
    "Muestra un desglose del uso de discos individuales en porcentaje para el PC actual.",
};

export default ES;
