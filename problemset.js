document.addEventListener('DOMContentLoaded', function() {
    // Handle "See More" buttons for questions
    const seeMoreButtons = document.querySelectorAll('.see-more');
    seeMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const fullContent = this.previousElementSibling;
            if (fullContent.style.display === 'none' || fullContent.style.display === '') {
                fullContent.style.display = 'block';
                this.textContent = 'See Less';
            } else {
                fullContent.style.display = 'none';
                this.textContent = 'See More';
            }
        });
    });

    // Handle book description toggles
    const toggleButtons = document.querySelectorAll('.toggle-description');
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const description = this.nextElementSibling;
            if (description.style.display === 'none' || description.style.display === '') {
                description.style.display = 'block';
                this.textContent = '▲';
            } else {
                description.style.display = 'none';
                this.textContent = '▼';
            }
        });
    });
});