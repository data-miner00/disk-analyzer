import type { Translations } from "../translations.svelte";
import { SETTINGS, HEADER, HOME, DISK_DETAIL } from "./keys";

export const PT: Translations = {
  [HEADER.MISC]: "Diversos",
  [HEADER.OPEN_EXPLORER]: "Abrir Explorador",
  [HEADER.UTILITY]: "Utilitário",
  [HEADER.EXPORT]: "Exportar",
  [HEADER.PRINT]: "Imprimir",
  [HEADER.EXIT]: "Sair",
  [HEADER.ALERTS]: "Alertas",
  [HEADER.CHARTS]: "Gráficos",
  [HEADER.SETTINGS]: "Configurações",

  [HOME.LOG]: "As informações do disco de hoje já foram registradas.",
  [HOME.SEARCH_PLACEHOLDER]: "Pesquisar...",
  [HOME.WARNING_NO_DISKS]: "Você tem um disco sem nome",
  [HOME.WARNING_NO_DISKS_DESCRIPTION]:
    "Um ou mais discos do seu sistema não possuem nome atribuído. Para evitar comportamentos indesejados, nomeie-os adequadamente.",

  [SETTINGS.TITLE]: "Configurações",
  [SETTINGS.PRESENTATION]: "Apresentação",
  [SETTINGS.DARK_MODE]: "Modo Escuro",
  [SETTINGS.DARK_MODE_DESCIPTION]:
    "Os temas disponíveis atualmente são claro e escuro. O modo escuro alivia drasticamente os olhos.",
  [SETTINGS.SEARCH_BAR]: "Barra de Pesquisa",
  [SETTINGS.SEARCH_BAR_DESCIPTION]:
    "Se deve ativar a funcionalidade da barra de pesquisa para páginas aplicáveis.",
  [SETTINGS.LANGUAGE]: "Idioma",
  [SETTINGS.LANGUAGE_DESCIPTION]:
    "O idioma usado para a interface do usuário a partir de uma predefinição limitada.",
  [SETTINGS.LANGUAGE_DEFAULT_LABEL]: "Selecionar idioma",
  [SETTINGS.PREFETCH_COUNT]: "Contagem de Pré-busca",
  [SETTINGS.PREFETCH_COUNT_DESCIPTION]:
    "O número de pontos de dados preferidos para buscar do histórico. A sugestão ideal é 20.",
  [SETTINGS.PREFETCH_COUNT_PLACEHOLDER]: "Contagem",
  [SETTINGS.BYTE_DISPLAY]: "Exibição de Bytes",
  [SETTINGS.BYTE_DISPLAY_DESCIPTION]:
    "O formato no qual os bytes serão exibidos por padrão.",
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
  [SETTINGS.ENABLE_BACKUP_DESCIPTION]:
    "Cria com segurança um ponto de restauração que pode ser restaurado a partir de um instantâneo anterior.",
  [SETTINGS.BACKUP_PATH]: "Caminho de Backup",
  [SETTINGS.BACKUP_PATH_DESCIPTION]:
    "A pasta ou diretório para manter o backup dos dados do aplicativo. O padrão é o caminho de dados do aplicativo.",
  [SETTINGS.BACKUP_PATH_PLACEHOLDER]: "Selecionar um diretório de backup",
  [SETTINGS.BACKUP_FREQUENCY]: "Frequência de Backup",
  [SETTINGS.BACKUP_FREQUENCY_DESCIPTION]:
    "O intervalo no qual os dados serão copiados para criar instantâneos restauráveis. O padrão é 7 dias.",
  [SETTINGS.SAVE_CHANGES]: "Salvar Alterações",

  [DISK_DETAIL.DESCRIPTION]:
    "Informações detalhadas sobre o disco chamado {diskName} no seu sistema.",
};

export default PT;
