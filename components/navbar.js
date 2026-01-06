class CustomNavbar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <nav class="bg-primary text-white shadow-lg sticky top-0 z-50">
                <div class="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div class="flex items-center gap-3">
                        <img src="img/logo.jpeg" alt="CONGO MINING CORPORATION SOLUTION SARLU" class="h-10 w-10 rounded-full object-cover">
                        <a href="#" class="text-xl font-bold">CONGO MINING CORPORATION SOLUTION SARLU</a>
                    </div>
                    <div class="hidden md:flex gap-8">
                        <a href="#about" class="hover:text-secondary transition duration-300">À propos</a>
                        <a href="#services" class="hover:text-secondary transition duration-300">Services</a>
                        <a href="#contact" class="hover:text-secondary transition duration-300">Contact</a>
                    </div>
                    <button id="menu-toggle" class="md:hidden">
                        <i data-feather="menu"></i>
                    </button>
                </div>
                <div id="mobile-menu" class="hidden md:hidden bg-primary/95 px-6 py-4">
                    <a href="#about" class="block py-2 hover:text-secondary transition duration-300">À propos</a>
                    <a href="#services" class="block py-2 hover:text-secondary transition duration-300">Services</a>
                    <a href="#contact" class="block py-2 hover:text-secondary transition duration-300">Contact</a>
                </div>
            </nav>
            <script>
                document.getElementById('menu-toggle').addEventListener('click', function() {
                    document.getElementById('mobile-menu').classList.toggle('hidden');
                });
            </script>
        `;
    }
}

customElements.define('custom-navbar', CustomNavbar);
