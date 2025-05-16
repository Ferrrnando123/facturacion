document.addEventListener('DOMContentLoaded', function() {
            const tabs = document.querySelectorAll('.tab');
            const notificationCards = document.querySelectorAll('.notification-card');
            
            tabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    tabs.forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                    
                    const filter = this.getAttribute('data-filter');
                    
                    notificationCards.forEach(card => {
                        if (filter === 'all') {
                            card.classList.remove('hidden');
                        } else {
                            if (card.getAttribute('data-type') === filter) {
                                card.classList.remove('hidden');
                            } else {
                                card.classList.add('hidden');
                            }
                        }
                    });
                });
            });
            
            document.querySelector('.tab.active').click();
        });