import type { Locale } from "./locale";

type LoadingCopy = {
  title: string;
  loading: string;
  slow: string;
  offline: string;
  failed: string;
  continue: string;
  retry: string;
};

export const loadingCopy: Record<Locale, LoadingCopy> = {
  en: {
    title: "Loading AMAC Group", loading: "Opening the fields…",
    slow: "The farm image is taking a little longer.",
    offline: "You’re offline. You can still explore the page.",
    failed: "The farm image couldn’t load.", continue: "Continue to site", retry: "Retry",
  },
  ar: {
    title: "جارٍ تحميل موقع مجموعة أماك", loading: "لحظات ونفتح لك أبواب الحقول…",
    slow: "تحميل صورة المزرعة يستغرق وقتًا أطول.",
    offline: "انقطع الاتصال. يمكنك متابعة تصفّح الصفحة.",
    failed: "تعذّر تحميل صورة المزرعة.", continue: "متابعة التصفّح", retry: "إعادة المحاولة",
  },
  fr: {
    title: "Chargement du site AMAC Group", loading: "Chargement en cours…",
    slow: "La photo de la ferme met un peu plus de temps à s’afficher.",
    offline: "Vous êtes hors ligne. Vous pouvez continuer à parcourir la page.",
    failed: "La photo de la ferme n’a pas pu être chargée.", continue: "Continuer vers le site", retry: "Réessayer",
  },
  de: {
    title: "AMAC Group wird geladen", loading: "Die Seite wird geladen…",
    slow: "Das Laden des Feldfotos dauert etwas länger.",
    offline: "Sie sind offline. Sie können die Seite weiterhin ansehen.",
    failed: "Das Feldfoto konnte nicht geladen werden.", continue: "Weiter zur Website", retry: "Erneut versuchen",
  },
  it: {
    title: "Caricamento del sito AMAC Group", loading: "Caricamento in corso…",
    slow: "La foto dei campi richiede un po’ più di tempo.",
    offline: "Sei offline. Puoi comunque continuare a esplorare la pagina.",
    failed: "Non è stato possibile caricare la foto dei campi.", continue: "Continua al sito", retry: "Riprova",
  },
  es: {
    title: "Cargando el sitio de AMAC Group", loading: "Cargando la página…",
    slow: "La foto del campo está tardando un poco más.",
    offline: "No tienes conexión. Puedes seguir explorando la página.",
    failed: "No se ha podido cargar la foto del campo.", continue: "Continuar al sitio", retry: "Reintentar",
  },
  ru: {
    title: "Загрузка сайта AMAC Group", loading: "Страница загружается…",
    slow: "Загрузка фотографии полей занимает чуть больше времени.",
    offline: "Нет подключения к интернету. Вы можете продолжить просмотр страницы.",
    failed: "Не удалось загрузить фотографию полей.", continue: "Перейти на сайт", retry: "Повторить",
  },
};
