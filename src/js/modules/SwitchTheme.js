import DropdownFocus from './DropdownFocus.js';

// Variável para prevenir múltiplas inicializações
let isInitialized = false;

// Função para inicializar o toggle de tema
function initThemeToggle() {
  // Prevenir múltiplas inicializações
  if (isInitialized) {
    console.log('⚠️ SwitchTheme já foi inicializado');
    return;
  }

  const themeToggleBtn = document.querySelector('[data-theme-toggle]');
  const body = document.body;
  const icon = themeToggleBtn?.querySelector('i');
  const text = themeToggleBtn?.querySelector('.theme-text');

  if (!themeToggleBtn) {
    console.warn('⚠️ Botão de tema não encontrado');
    return;
  }

  // Verificar tema salvo ou usar preferência do sistema
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

  // Aplicar tema inicial
  setTheme(currentTheme);

  // Event listener para o botão (única vez)
  themeToggleBtn.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation(); // Prevenir propagação

    const newTheme = body.classList.contains('light-theme') ? 'dark' : 'light';
    setTheme(newTheme);

    // Animação do botão
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
      this.style.transform = 'scale(1)';
    }, 150);
  });

  function setTheme(theme) {
    // Adicionar classe de transição
    body.classList.add('theme-changing');

    // Forçar remoção de foco de todos os elementos interativos
    const focusedElements = document.querySelectorAll(':focus, [aria-expanded="true"]');
    focusedElements.forEach(element => {
      element.blur();
      // Remover atributos de estado do Bootstrap
      if (element.hasAttribute('aria-expanded')) {
        element.setAttribute('aria-expanded', 'false');
      }
    });

    // Remover classes anteriores
    body.classList.remove('light-theme', 'dark-theme');

    // Adicionar nova classe
    body.classList.add(`${theme}-theme`);

    // Salvar no localStorage
    localStorage.setItem('theme', theme);

    // Atualizar ícone e texto
    if (icon && text) {
      if (theme === 'light') {
        icon.className = 'fas fa-moon text-warning';
        text.textContent = 'Tema Escuro';
      } else {
        icon.className = 'fas fa-sun text-warning';
        text.textContent = 'Tema Claro';
      }
    }

    // Correção específica para tema claro usando o módulo DropdownFocus
    if (theme === 'light') {
      setTimeout(() => {
        DropdownFocus.removeAllFocus();
      }, 50);
    }

    // Remover classe de transição após animação
    setTimeout(() => {
      body.classList.remove('theme-changing');
    }, 500);

    // Dispatch evento personalizado para outros componentes
    window.dispatchEvent(new CustomEvent('themeChanged', {
      detail: { theme }
    }));

    // Log para debug
    console.log(`✅ Tema alterado para: ${theme}`);
  }

  // Listener para mudanças na preferência do sistema
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });

  // Marcar como inicializado
  isInitialized = true;
  console.log('✅ SwitchTheme inicializado');
}

export default initThemeToggle;