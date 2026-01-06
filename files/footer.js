
class CustomFooter extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                footer {
                    background-color: #1a237e;
                    color: white;
                }
                .footer-link:hover {
                    color: #D4AF37;
                    transition: color 0.3s ease;
                }
                .footer-divider {
                    border-color: rgba(255, 255, 255, 0.1);
                }
            </style>
            <footer class="py-12 bg-primary text-white">
                <div class="container mx-auto px-6">
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h3 class="text-xl font-bold mb-4 text-secondary">CONGO MINING</h3>
                            <p class="mb-4">Bureau d'études et de consultance minière en République Démocratique du Congo.</p>
                            <div class="flex space-x-4">
                                <a href="#" class="text-white hover:text-secondary transition duration-300">
                                    <i data-feather="linkedin"></i>
                                </a>
                                <a href="#" class="text-white hover:text-secondary transition duration-300">
                                    <i data-feather="twitter"></i>
                                </a>
                                <a href="#" class="text-white hover:text-secondary transition duration-300">
                                    <i data-feather="facebook"></i>
                                </a>
                            </div>
                        </div>
                        
                        <div>
                            <h4 class="text-lg font-semibold mb-4">Liens rapides</h4>
                            <ul class="space-y-2">
                                <li><a href="#" class="footer-link">Accueil</a></li>
                                <li><a href="#about" class="footer-link">À propos</a></li>
                                <li><a href="#services" class="footer-link">Services</a></li>
                                <li><a href="#contact" class="footer-link">Contact</a></li>
                            </ul>
                        </div>
                        
                        <div>
                            <h4 class="text-lg font-semibold mb-4">Services</h4>
                            <ul class="space-y-2">
                                <li><a href="#" class="footer-link">Études minières</a></li>
                                <li><a href="#" class="footer-link">Ingénierie</a></li>
                                <li><a href="#" class="footer-link">Environnement</a></li>
                                <li><a href="#" class="footer-link">Formation</a></li>
                            </ul>
                        </div>
                        
                        <div>
                            <h4 class="text-lg font-semibold mb-4">Contact</h4>
                            <address class="not-italic">
                                <p class="mb-2">Boulevard du 30 Juin</p>
                                <p class="mb-2">Bâtiment Luxurus</p>
                                <p class="mb-2">Kinshasa-Gombe, RDC</p>
                                <p class="mb-2">+243 904 313 362</p>
                                <p>contact@congomining.cd</p>
                            </address>
                        </div>
                    </div>
                    
                    <div class="border-t footer-divider mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                        <p>© <span id="current-year"></span> Congo Mining. Tous droits réservés.</p>
                        <div class="mt-4 md:mt-0">
                            <a href="#" class="text-sm footer-link">Politique de confidentialité</a>
                            <span class="mx-2">|</span>
                            <a href="#" class="text-sm footer-link">Conditions d'utilisation</a>
                        </div>
                    </div>
                </div>
            </footer>
            <script>
                // Set current year
                document.getElementById('current-year').textContent = new Date().getFullYear();
                // Initialize feather icons
                feather.replace();
            </script>
        `;
    }
}

customElements.define('custom-footer', CustomFooter);