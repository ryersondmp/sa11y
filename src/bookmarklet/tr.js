import { loadSa11y } from './_loadSa11y';

const langCode = 'tr';
const message = {
  close: 'Kapat',
  heading: 'Güncelleme Gerekli',
  message: 'Lütfen Sa11y yer imini, yer imler çubuğunuza aşağıdaki bağlantıyı ekleyerek güncelleyin.',
  features: 'Yeni yer işareti özellikleri',
  a: 'Otomatik sayfa dilini algılama',
  aContent: 'Bu yer işareti, sayfa diline dayanarak Sa11y\'nin çevrilmiş bir sürümünü otomatik olarak görüntüler. Dil desteklenmiyorsa varsayılan olarak İngilizce kullanılır.',
  b: 'Güvenlik politikası uyarısı',
  bContent: 'Web sitesi, Sa11y\'nin sayfalarındaki işlevselliğini kısıtlayan güvenlik politikalarını uyguluyorsa bir uyarı görüntülenir.',
};
loadSa11y(langCode, message);
