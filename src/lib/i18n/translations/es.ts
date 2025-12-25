import type { Translations } from "../translations.svelte";
import { SETTINGS, HEADER, HOME, DISK_DETAIL } from "./keys";

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
};

export default ES;
