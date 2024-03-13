import { loadSa11y } from './_loadSa11y';

const langCode = 'ptBR';
const message = {
  close: 'Fechar',
  heading: 'Atualização necessária',
  message: 'Por favor, atualize o bookmarklet do Sa11y adicionando o seguinte link à sua barra de favoritos.',
  features: 'Novos recursos do bookmarklet',
  a: 'Detecção automática do idioma da página',
  aContent: 'Este bookmarklet exibe automaticamente uma versão traduzida do Sa11y com base no idioma da página. Se o idioma não for suportado, será usado o inglês.',
  b: 'Aviso de política de segurança',
  bContent: 'Um aviso aparecerá se o site aplicar políticas de segurança que restrinjam o funcionamento do Sa11y em suas páginas.',
};
loadSa11y(langCode, message);
