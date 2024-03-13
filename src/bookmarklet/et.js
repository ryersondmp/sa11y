import { loadSa11y } from './_loadSa11y';

const langCode = 'et';
const message = {
  close: 'Sulge',
  heading: 'Vajalik uuendus',
  message: 'Palun uuenda Sa11y järjehoidjat, lisades järgmise lingi oma järjehoidjateribale.',
  features: 'Uued järjehoidja funktsioonid',
  a: 'Lehe keele automaatne tuvastamine',
  aContent: 'See järjehoidja kuvab automaatselt tõlgitud versiooni Sa11y-st lehe keele põhjal. Kui keelt ei toetata, kasutatakse inglise keelt.',
  b: 'Turvapoliitika hoiatus',
  bContent: 'Kuvatakse hoiatus, kui veebisait rakendab turvapoliitikat, mis piirab Sa11y töötamist selle lehtedel.',
};
loadSa11y(langCode, message);
