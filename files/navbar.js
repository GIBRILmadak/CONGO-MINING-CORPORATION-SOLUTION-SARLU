class CustomNavbar extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                .navbar {
                    transition: all 0.3s ease;
                }
                .navbar.scrolled {
                    background-color: rgba(30, 58, 138, 0.95);
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
                .nav-link {
                    position: relative;
                }
                .nav-link::after {
                    content: '';
                    position: absolute;
                    width: 0;
                    height: 2px;
                    bottom: 0;
                    left: 0;
                    background-color: #D4AF37;
                    transition: width 0.3s ease;
                }
                .nav-link:hover::after {
                    width: 100%;
                }
                .mobile-menu {
                    max-height: 0;
                    overflow: hidden;
                    transition: max-height 0.3s ease-out;
                }
                .mobile-menu.open {
                    max-height: 500px;
                }
                @media (min-width: 1024px) {
                    .mobile-menu {
                        max-height: none !important;
                    }
                }
            </style>
            <nav class="navbar fixed w-full z-50 bg-primary py-4 px-6 lg:px-12">
                <div class="container mx-auto flex justify-between items-center">
                    <a href="#" class="text-white font-bold text-2xl flex items-center">
                        <span class="text-secondary">CONGO</span> MINING
                    </a>
                    
                    <div class="hidden lg:flex space-x-8">
                        <a href="#" class="nav-link text-white hover:text-secondary">Accueil</a>
                        <a href="#about" class="nav-link text-white hover:text-secondary">À propos</a>
                        <a href="#services" class="nav-link text-white hover:text-secondary">Services</a>
                        <a href="#contact" class="nav-link text-white hover:text-secondary">Contact</a>
                    </div>
                    
                    <button id="mobile-menu-button" class="lg:hidden text-white focus:outline-none">
                        <i data-feather="menu"></i>
                    </button>
                </div>
                
                <div id="mobile-menu" class="mobile-menu lg:hidden bg-primary/90">
                    <div class="container mx-auto px-6 py-4 flex flex-col space-y-4">
                        <a href="#" class="nav-link text-white hover:text-secondary">Accueil</a>
                        <a href="#about" class="nav-link text-white hover:text-secondary">À propos</a>
                        <a href="#services" class="nav-link text-white hover:text-secondary">Services</a>
                        <a href="#contact" class="nav-link text-white hover:text-secondary">Contact</a>
                    </div>
                </div>
            </nav>
            
            <script>
                // Mobile menu toggle
                const menuButton = this.shadowRoot.getElementById('mobile-menu-button');
                const mobileMenu = this.shadowRoot.getElementById('mobile-menu');
                
                menuButton.addEventListener('click', () => {
                    mobileMenu.classList.toggle('open');
                    feather.replace();
                });
                
                // Navbar scroll effect
                const navbar = this.shadowRoot.querySelector('.navbar');
                window.addEventListener('scroll', () => {
                    if (window.scrollY > 50) {
                        navbar.classList.add('scrolled');
                    } else {
                        navbar.classList.remove('scrolled');
                    }
                });
            </script>
        `;
    }
}

customElements.define('custom-navbar', CustomNavbar);