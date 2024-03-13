import { loadSa11y } from './_loadSa11y';

const langCode = 'ptPT';
const message = {
  close: 'Fechar',
  heading: 'Atualização necessária',
  message: 'Por favor, atualize o bookmarklet do Sa11y adicionando o seguinte link à sua barra de marcadores.',
  features: 'Novas funcionalidades do bookmarklet',
  a: 'Detecção automática do idioma da página',
  aContent: 'Este bookmarklet exibe automaticamente uma versão traduzida do Sa11y com base no idioma da página. Se o idioma não for suportado, será utilizado o inglês.',
  b: 'Aviso da política de segurança',
  bContent: 'Será exibido um aviso se o site aplicar políticas de segurança que restrinjam o funcionamento do Sa11y nas suas páginas.',
};
loadSa11y(langCode, message);
