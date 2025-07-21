// src/js/modules/SidebarToggle.js


export default class SidebarToggle {
  constructor() {
    this.sidebar = document.getElementById('sidebar');
    this.overlay = document.getElementById('sidebarOverlay');
    this.toggleBtn = document.getElementById('sidebarToggle');
    this.closeBtn = document.getElementById('sidebarClose');
    this.body = document.body;

    // Bind dos métodos para poder remover event listeners
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOverlayClick = this.handleOverlayClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);

    this.init();
  }

  init() {
    // Verificar se elementos existem antes de adicionar eventos
    if (!this.sidebar || !this.toggleBtn) {
      console.warn('⚠️ Elementos do SidebarToggle não encontrados');
      return;
    }

    // Toggle ao clicar no botão hambúrguer
    this.toggleBtn.addEventListener('click', this.handleToggle);

    // Fechar ao clicar no X
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', this.handleClose);
    }

    // Fechar ao clicar no overlay (se existir)
    if (this.overlay) {
      this.overlay.addEventListener('click', this.handleOverlayClick);
    }

    // Fechar com ESC
    document.addEventListener('keydown', this.handleKeyDown);

    // Adicionar suporte para touch em mobile
    this.addTouchSupport();

    /* // Debug log
    console.log('✅ SidebarToggle inicializado', {
      sidebar: !!this.sidebar,
      closeBtn: !!this.closeBtn,
      toggleBtn: !!this.toggleBtn,
      overlay: !!this.overlay
    });
 */

  }

  handleToggle(e) {
    e.preventDefault();
    e.stopPropagation();
    this.toggle();
  }

  handleClose(e) {
    e.preventDefault();
    e.stopPropagation();
    this.close();

    // Feedback visual
    this.closeBtn.style.transform = 'scale(0.9)';
    setTimeout(() => {
      this.closeBtn.style.transform = 'scale(1)';
    }, 150);
  }

  handleOverlayClick() {
    this.close();
  }

  handleKeyDown(e) {
    if (e.key === 'Escape' && this.isOpen()) {
      this.close();
    }
  }

  addTouchSupport() {
    // Melhorar experiência touch em mobile
    if ('ontouchstart' in window) {
      // Adicionar classe CSS para indicar suporte a touch
      this.body.classList.add('touch-device');

      // Melhorar área de toque dos botões
      if (this.toggleBtn) {
        this.toggleBtn.style.minHeight = '44px';
        this.toggleBtn.style.minWidth = '44px';
      }

      if (this.closeBtn) {
        this.closeBtn.style.minHeight = '44px';
        this.closeBtn.style.minWidth = '44px';
      }
    }
  }

  toggle() {
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    this.sidebar?.classList.add('active');
    this.overlay?.classList.add('active');
    this.body.classList.add('sidebar-open');
  }

  close() {
    this.sidebar?.classList.remove('active');
    this.overlay?.classList.remove('active');
    this.body.classList.remove('sidebar-open');
  }

  isOpen() {
    return this.sidebar?.classList?.contains('active') ?? false;
  }


  destroy() {
    // Remover todos os event listeners
    if (this.toggleBtn && this.handleToggle) {
      this.toggleBtn.removeEventListener('click', this.handleToggle);
    }
    if (this.closeBtn && this.handleClose) {
      this.closeBtn.removeEventListener('click', this.handleClose);
    }
    if (this.overlay && this.handleOverlayClick) {
      this.overlay.removeEventListener('click', this.handleOverlayClick);
    }
    if (this.handleKeyDown) {
      document.removeEventListener('keydown', this.handleKeyDown);
    }
    console.log('🧹 SidebarToggle destruído');
  }
}