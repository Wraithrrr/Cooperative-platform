document.addEventListener('DOMContentLoaded', () => {
    fetch('/HTML/sidebar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('sidebar-container').innerHTML = data;
            const menuLinks = document.querySelectorAll('.nav-menu a');
            const currentPage = window.location.pathname.split('/').pop().toLowerCase();

            // Highlight link if it matches current page
            menuLinks.forEach(link => {
                const targetHref = link.getAttribute('href').toLowerCase();
                if (targetHref === currentPage) {
                    link.classList.add('active');
                }
                link.addEventListener('click', () => {
                    menuLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                });
            });
        });
});