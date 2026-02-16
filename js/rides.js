// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Get DOM elements
    const postRideForm = document.getElementById('postRideForm');
    const searchBar = document.getElementById('searchBar');
    const ridesGrid = document.getElementById('ridesGrid');
    const emptyState = document.getElementById('emptyState');
    const dateInput = document.getElementById('date');

    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);

    // Load all rides on page load
    loadRides();

    // Form submission handler
    postRideForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            from: document.getElementById('from').value.trim(),
            to: document.getElementById('to').value.trim(),
            date: document.getElementById('date').value,
            time: document.getElementById('time').value,
            seats: parseInt(document.getElementById('seats').value),
            costPerPerson: parseInt(document.getElementById('costPerPerson').value),
            driver: document.getElementById('driver').value.trim(),
            vehicle: document.getElementById('vehicle').value,
            notes: document.getElementById('notes').value.trim() || ''
        };

        // Basic validation
        if (!formData.from || !formData.to || !formData.date || !formData.time || 
            !formData.seats || !formData.costPerPerson || !formData.driver || !formData.vehicle) {
            alert('Please fill in all required fields');
            return;
        }

        // Validate date is not in the past
        const selectedDate = new Date(formData.date);
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        
        if (selectedDate < currentDate) {
            alert('Please select a date that is today or in the future');
            return;
        }

        // Validate seats (bikes/cycles typically have 1 passenger seat)
        if (formData.seats < 1 || formData.seats > 2) {
            alert('Seats must be between 1 and 2 (most bikes/cycles have max 1-2 passenger seats)');
            return;
        }

        // Validate cost
        if (formData.costPerPerson < 0) {
            alert('Cost cannot be negative');
            return;
        }

        try {
            // Add ride via API
            const newRide = await RideAPI.addRide(formData);
            
            // Show success message
            alert('Ride posted successfully!');
            
            // Reset form
            postRideForm.reset();
            
            // Reload rides
            loadRides();
            
        } catch (error) {
            console.error('Error posting ride:', error);
            alert('Failed to post ride. Please try again.');
        }
    });

    // Search handler
    searchBar.addEventListener('input', function() {
        filterRides();
    });

    // Load and display rides
    async function loadRides() {
        try {
            const rides = await RideAPI.getAllRides();
            displayRides(rides);
        } catch (error) {
            console.error('Error loading rides:', error);
            showEmptyState();
        }
    }

    // Filter rides based on search
    async function filterRides() {
        const searchQuery = searchBar.value.trim();
        
        try {
            const rides = await RideAPI.searchRides(searchQuery);
            displayRides(rides);
        } catch (error) {
            console.error('Error filtering rides:', error);
            showEmptyState();
        }
    }

    // Display rides in grid
    function displayRides(rides) {
        if (rides.length === 0) {
            showEmptyState();
            return;
        }

        hideEmptyState();
        
        // Sort rides by date (earliest first)
        const sortedRides = rides.sort((a, b) => {
            const dateA = new Date(a.date + ' ' + a.time);
            const dateB = new Date(b.date + ' ' + b.time);
            return dateA - dateB;
        });
        
        ridesGrid.innerHTML = sortedRides.map(ride => createRideCard(ride)).join('');
        
        // Add event listeners to join buttons
        addJoinButtonListeners();
    }

    // Create ride card HTML
    function createRideCard(ride) {
        // Format date
        const rideDate = new Date(ride.date);
        const formattedDate = rideDate.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
        });
        
        // Format time
        const formattedTime = formatTime(ride.time);
        
        // Calculate total cost
        const totalCost = ride.costPerPerson * ride.seats;
        
        // Determine seats badge class
        let seatsBadgeClass = '';
        if (ride.seats <= 1) {
            seatsBadgeClass = 'limited';
        } else if (ride.seats === 0) {
            seatsBadgeClass = 'full';
        }
        
        // Get driver initials
        const initials = getInitials(ride.driver);
        
        // Vehicle emoji mapping
        // Vehicle emoji mapping
        const vehicleEmojis = {
            'Bicycle': '🚴',
            'Electric Cycle': '🚴‍♂️',
            'Motorcycle': '🏍️',
            'Scooter': '🛵',
            'Other': '🚲'
        };
        
        const vehicleEmoji = vehicleEmojis[ride.vehicle] || '🚗';

        return `
            <div class="ride-card fade-in" data-id="${ride.id}">
                <div class="ride-header">
                    <div class="ride-route">
                        <div class="route-display">
                            <span class="location">${ride.from}</span>
                            <span class="route-arrow">→</span>
                            <span class="location">${ride.to}</span>
                        </div>
                        <div class="ride-datetime">
                            <span class="datetime-item">
                                📅 ${formattedDate}
                            </span>
                            <span class="datetime-item">
                                🕐 ${formattedTime}
                            </span>
                        </div>
                    </div>
                    <div class="ride-cost">
                        <div class="cost-label">Cost</div>
                        <div class="cost-amount">₹${ride.costPerPerson}</div>
                        <div class="cost-per-person">per person</div>
                    </div>
                </div>
                
                <div class="ride-details">
                    <div class="detail-item">
                        <span class="detail-icon">💺</span>
                        <div class="detail-content">
                            <span class="detail-label">Seats</span>
                            <span class="detail-value">${ride.seats} available</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <span class="detail-icon">${vehicleEmoji}</span>
                        <div class="detail-content">
                            <span class="detail-label">Vehicle</span>
                            <span class="detail-value">${ride.vehicle}</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <span class="detail-icon">💰</span>
                        <div class="detail-content">
                            <span class="detail-label">Total Split</span>
                            <span class="detail-value">₹${totalCost}</span>
                        </div>
                    </div>
                </div>
                
                <div class="ride-footer">
                    <div class="driver-info">
                        <div class="driver-avatar">${initials}</div>
                        <div class="driver-details">
                            <span class="driver-name">${ride.driver}</span>
                            <span class="vehicle-type">${ride.vehicle} driver</span>
                        </div>
                    </div>
                    <button class="join-btn" data-ride-id="${ride.id}" ${ride.seats === 0 ? 'disabled' : ''}>
                        ${ride.seats === 0 ? 'Fully Booked' : 'Join Ride'}
                    </button>
                </div>
            </div>
        `;
    }

    // Add event listeners to join buttons
    function addJoinButtonListeners() {
        const joinButtons = document.querySelectorAll('.join-btn');
        joinButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                const rideId = this.getAttribute('data-ride-id');
                handleJoinRide(rideId);
            });
        });
    }

    // Handle join ride action
    function handleJoinRide(rideId) {
        // In a real application, this would:
        // 1. Send request to backend to join the ride
        // 2. Update seat count
        // 3. Send notification to driver
        // 4. Add to user's "My Rides" list
        
        const confirmJoin = confirm('Do you want to join this ride? The driver will be notified.');
        
        if (confirmJoin) {
            alert('Ride joined successfully! The driver will contact you soon.');
            // Here you would make an API call to join the ride
            // Example: RideAPI.joinRide(rideId, userId)
        }
    }

    // Format time from 24h to 12h format
    function formatTime(time) {
        const [hours, minutes] = time.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 || 12;
        return `${hour12}:${minutes} ${ampm}`;
    }

    // Get initials from name
    function getInitials(name) {
        const names = name.trim().split(' ');
        if (names.length >= 2) {
            return (names[0][0] + names[names.length - 1][0]).toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    }

    // Show empty state
    function showEmptyState() {
        ridesGrid.style.display = 'none';
        emptyState.style.display = 'block';
    }

    // Hide empty state
    function hideEmptyState() {
        ridesGrid.style.display = 'flex';
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

    // Validate number inputs on input
    const seatsInput = document.getElementById('seats');
    const costInput = document.getElementById('costPerPerson');

   seatsInput.addEventListener('input', function() {
    if (this.value < 1) this.value = 1;
    if (this.value > 2) this.value = 2;  // Changed from 8 to 2
});

    costInput.addEventListener('input', function() {
        if (this.value < 0) this.value = 0;
    });
});