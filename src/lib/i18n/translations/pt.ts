import type { Translations } from "../translations.svelte";
import { SETTINGS, HEADER, HOME, DISK_DETAIL, ALERTS } from "./keys";

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
  [HOME.DISK_COUNT]: "{diskCount} disco(s)",
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
  [DISK_DETAIL.SIZE]: "Tamanho",
  [DISK_DETAIL.SIZE_AVAILABLE_SPACE]: "Espaço disponível",
  [DISK_DETAIL.SIZE_TOTAL_SPACE]: "Espaço total",
  [DISK_DETAIL.SIZE_USED_SPACE]: "Espaço usado",
  [DISK_DETAIL.PROPERTIES]: "Propriedades",
  [DISK_DETAIL.PROPERTIES_MODE]: "Modo",
  [DISK_DETAIL.PROPERTIES_REMOVABLE]: "Removível",
  [DISK_DETAIL.PROPERTIES_FS]: "Sistema de Arquivos",
  [DISK_DETAIL.PROPERTIES_TYPE]: "Tipo",

  [ALERTS.EMPTY_TITLE]: "Ainda Sem Alertas",
  [ALERTS.EMPTY_DESCRIPTION]:
    "Você ainda não criou nenhum alerta. Comece criando seu primeiro alerta.",
  [ALERTS.EMPTY_LEARN_MORE]: "Saiba Mais",
  [ALERTS.SEARCH]: "Pesquisar alertas...",
  [ALERTS.CREATE_ALERT_BUTTON]: "Criar Alerta",
  [ALERTS.CREATE_DIALOG_TITLE]: "Criar Novo Alerta",
  [ALERTS.CREATE_DIALOG_DESCRIPTION]:
    "Configure as definições para o seu novo alerta abaixo.",
  [ALERTS.CREATE_DIALOG_NAME_LABEL]: "Nome",
  [ALERTS.CREATE_DIALOG_NAME_DESCRIPTION]: "O nome da configuração do alerta.",
  [ALERTS.CREATE_DIALOG_FREQ_LABEL]: "Frequência",
  [ALERTS.CREATE_DIALOG_FREQ_DESCRIPTION]:
    "A frequência da verificação da configuração do alerta.",
  [ALERTS.CREATE_DIALOG_THRESHOLD_LABEL]: "Limite",
  [ALERTS.CREATE_DIALOG_THRESHOLD_DESCRIPTION]:
    "O valor limite a ser atingido para acionar um alerta.",
  [ALERTS.CREATE_DIALOG_RULE_LABEL]: "Regras",
  [ALERTS.CREATE_DIALOG_RULE_DESCRIPTION]:
    "A regra para verificação da configuração do alerta.",
  [ALERTS.CREATE_DIALOG_DISKNAME_LABEL]: "Nome do Disco",
  [ALERTS.CREATE_DIALOG_DISKNAME_LABEL_SELECT]: "Selecione um disco",
  [ALERTS.CREATE_DIALOG_DISKNAME_LABEL_DROPDOWN]: "Disco",
  [ALERTS.CREATE_DIALOG_DISKNAME_DESCRIPTION]:
    "O nome do disco a ser alertado.",
  [ALERTS.CREATE_DIALOG_CREATE_BUTTON]: "Criar",
  [ALERTS.LABEL_SELECT_RULE]: "Selecione uma regra",
  [ALERTS.FORM_ERROR]: "Por favor, corrija os erros no formulário.",
};

export default PT;
