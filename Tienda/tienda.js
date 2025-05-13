
        document.addEventListener('DOMContentLoaded', function() {
            const tabs = document.querySelectorAll('.category-tab');
            const containers = document.querySelectorAll('.products-container');
            const featuredSection = document.querySelector('.featured-products');
            
            containers.forEach(container => {
                container.style.display = 'none';
            });
            featuredSection.style.display = 'block';
            
            tabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    tabs.forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                    
                    const category = this.getAttribute('data-category');
                    
                    if (category === 'featured') {
                        featuredSection.style.display = 'block';
                        containers.forEach(container => {
                            container.style.display = 'none';
                        });
                    } else {
                        featuredSection.style.display = 'none';
                        containers.forEach(container => {
                            container.style.display = 'none';
                            if (container.id === category) {
                                container.style.display = 'block';
                            }
                        });
                    }
                });
            });
            
            const wishlistButtons = document.querySelectorAll('.wishlist-button');
            wishlistButtons.forEach(button => {
                button.addEventListener('click', function() {
                    this.classList.toggle('active');
                    const icon = this.querySelector('i');
                    if (this.classList.contains('active')) {
                        icon.classList.remove('far');
                        icon.classList.add('fas');
                    } else {
                        icon.classList.remove('fas');
                        icon.classList.add('far');
                    }
                });
            });
        });
