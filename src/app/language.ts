const current = localStorage.getItem('language');
const polyglot = new Object();

polyglot['ptbr'] = {
    welcome: 'Bem vindo',
    print: 'Imprimir',
    new: 'Novo',
    startpage: 'Página inicial',
    home: 'Home',
    loading: 'Carregando',
    waitseconds: 'Aguarde alguns segundos...',
};

polyglot['es'] = {
    welcome: 'Bien venido',
    print: 'Impresión',
    new: 'Nuevo',
    startpage: 'Bien venido',
    home: 'Página de inicio',
    loading: 'Cargando',
    waitseconds: 'Espera unos segundos...',
};

polyglot['en'] = {
    welcome: 'Welcome',
    print: 'Print',
    new: 'New',
    startpage: 'Start page',
    home: 'Home',
    loading: 'Loading',
    waitseconds: 'Please, wait a few seconds...',
};

export const language = (polyglot[(current) ? current : 'ptbr'] === undefined) ? polyglot['ptbr'] : polyglot[(current) ? current : 'ptbr'];
