// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Get DOM elements
    const addItemForm = document.getElementById('addItemForm');
    const searchBar = document.getElementById('searchBar');
    const categoryFilter = document.getElementById('categoryFilter');
    const itemsGrid = document.getElementById('itemsGrid');
    const emptyState = document.getElementById('emptyState');

    // Load all resources on page load
    loadResources();

    // Form submission handler
    addItemForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            itemName: document.getElementById('itemName').value.trim(),
            category: document.getElementById('category').value,
            description: document.getElementById('description').value.trim(),
            availability: document.getElementById('availability').value,
            price: parseInt(document.getElementById('price').value) || 0,
            location: document.getElementById('location').value.trim(),
            image: null // Image upload will be handled by backend later
        };

        // Basic validation
        if (!formData.itemName || !formData.category || !formData.description || 
            !formData.availability || !formData.location) {
            alert('Please fill in all required fields');
            return;
        }

        try {
            // Add resource via API
            const newResource = await ResourceAPI.addResource(formData);
            
            // Show success message
            alert('Item added successfully!');
            
            // Reset form
            addItemForm.reset();
            
            // Reload resources
            loadResources();
            
        } catch (error) {
            console.error('Error adding resource:', error);
            alert('Failed to add item. Please try again.');
        }
    });

    // Search handler
    searchBar.addEventListener('input', function() {
        filterResources();
    });

    // Category filter handler
    categoryFilter.addEventListener('change', function() {
        filterResources();
    });

    // Load and display resources
    async function loadResources() {
        try {
            const resources = await ResourceAPI.getAllResources();
            displayResources(resources);
        } catch (error) {
            console.error('Error loading resources:', error);
            showEmptyState();
        }
    }

    // Filter resources based on search and category
    async function filterResources() {
        const searchQuery = searchBar.value.trim();
        const category = categoryFilter.value;
        
        try {
            const resources = await ResourceAPI.searchResources(searchQuery, category);
            displayResources(resources);
        } catch (error) {
            console.error('Error filtering resources:', error);
            showEmptyState();
        }
    }

    // Display resources in grid
    function displayResources(resources) {
        if (resources.length === 0) {
            showEmptyState();
            return;
        }

        hideEmptyState();
        
        itemsGrid.innerHTML = resources.map(item => createItemCard(item)).join('');
    }

    // Create item card HTML
    function createItemCard(item) {
    const priceDisplay = item.price === 0 ? 'Free' : `₹${item.price}`;
    const priceClass = item.price === 0 ? 'free' : '';
    
    const statusClass = item.availability.toLowerCase().replace(' ', '-');
    
    const categoryEmojis = {
        'Cycles': '🚴',
        'Books': '📚',
        'Electronics': '💻',
        'Kitchen': '🍳',
        'Furniture': '🪑',
        'Sports': '⚽',
        'Other': '📦'
    };
    
    const emoji = categoryEmojis[item.category] || '📦';

    return `
        <div class="item-card fade-in" data-id="${item.id}">
            <div class="item-image">
                ${item.image ? `<img src="${item.image}" alt="${item.itemName}">` : emoji}
            </div>
            <div class="item-content">
                <div class="item-header">
                    <h3 class="item-name">${item.itemName}</h3>
                    <span class="item-price ${priceClass}">${priceDisplay}</span>
                </div>
                <span class="item-category">${item.category}</span>
                <p class="item-description">${item.description}</p>
                <div class="item-footer">
                    <span class="item-location">
                        📍 ${item.location}
                    </span>
                    <span class="item-status ${statusClass}">${item.availability}</span>
                </div>
            </div>
        </div>
    `;
}

    // Show empty state
    function showEmptyState() {
        itemsGrid.style.display = 'none';
        emptyState.style.display = 'block';
    }

    // Hide empty state
    function hideEmptyState() {
        itemsGrid.style.display = 'grid';
        emptyState.style.display = 'none';
    }

    // Form validation - real-time feedback
    const requiredInputs = document.querySelectorAll('input[required], select[required], textarea[required]');
    requiredInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (!this.value.trim()) {
                this.style.borderColor = '#fc8181';
            } else {
                this.style.borderColor = '#48bb78';
            }
        });

        input.addEventListener('input', function() {
            if (this.value.trim()) {
                this.style.borderColor = '#e0e0e0';
            }
        });
    });
});