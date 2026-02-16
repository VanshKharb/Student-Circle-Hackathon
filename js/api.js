// Mock Data for Resources
const mockResources = [
    {
        id: 1,
        itemName: "Mountain Bike",
        category: "Cycles",
        description: "Good condition, 21 gears, suitable for campus commute and weekend trips. Used for 1 year.",
        availability: "Available",
        price: 3000,
        location: "Hostel A, Room 205",
        image: null,
        datePosted: "2026-02-10"
    },
    {
        id: 2,
        itemName: "Electric Kettle",
        category: "Kitchen",
        description: "1.5L capacity, barely used. Moving out, need to sell quickly.",
        availability: "Available",
        price: 0,
        location: "Hostel B, Room 112",
        image: null,
        datePosted: "2026-02-12"
    },
    {
        id: 3,
        itemName: "Data Structures Textbook",
        category: "Books",
        description: "By Tanenbaum. Great condition, no highlights or notes. Perfect for CS students.",
        availability: "Available",
        price: 500,
        location: "Central Library Area",
        image: null,
        datePosted: "2026-02-14"
    },
    {
        id: 4,
        itemName: "Study Lamp",
        category: "Electronics",
        description: "LED desk lamp with adjustable brightness. Works perfectly.",
        availability: "Reserved",
        price: 200,
        location: "Hostel C, Room 304",
        image: null,
        datePosted: "2026-02-13"
    },
    {
        id: 5,
        itemName: "Badminton Racket Set",
        category: "Sports",
        description: "Two rackets with shuttlecocks. Good for beginners.",
        availability: "Available",
        price: 800,
        location: "Sports Complex",
        image: null,
        datePosted: "2026-02-11"
    },
    {
        id: 6,
        itemName: "Mini Fridge",
        category: "Electronics",
        description: "Compact fridge, perfect for dorm room. 2 years old but works great.",
        availability: "Available",
        price: 2500,
        location: "Hostel D, Room 108",
        image: null,
        datePosted: "2026-02-09"
    }
];

// Mock Data for Rides
const mockRides = [
    {
        id: 1,
        from: "Campus Main Gate",
        to: "City Railway Station",
        date: "2026-02-18",
        time: "14:00",
        seats: 1,
        costPerPerson: 20,
        driver: "Rahul Sharma",
        vehicle: "Motorcycle",
        datePosted: "2026-02-15"
    },
    {
        id: 2,
        from: "Hostel Complex",
        to: "City Mall",
        date: "2026-02-17",
        time: "18:30",
        seats: 1,
        costPerPerson: 15,
        driver: "Priya Patel",
        vehicle: "Scooter",
        datePosted: "2026-02-15"
    },
    {
        id: 3,
        from: "Main Campus",
        to: "Airport",
        date: "2026-02-20",
        time: "06:00",
        seats: 1,
        costPerPerson: 50,
        driver: "Amit Kumar",
        vehicle: "Motorcycle",
        datePosted: "2026-02-14"
    },
    {
        id: 4,
        from: "Library Block",
        to: "Bus Stand",
        date: "2026-02-16",
        time: "16:00",
        seats: 1,
        costPerPerson: 10,
        driver: "Sneha Reddy",
        vehicle: "Bicycle",
        datePosted: "2026-02-15"
    },
    {
        id: 5,
        from: "Engineering Block",
        to: "City Center",
        date: "2026-02-19",
        time: "10:00",
        seats: 1,
        costPerPerson: 25,
        driver: "Vikram Singh",
        vehicle: "Electric Cycle",
        datePosted: "2026-02-13"
    }
];

// API Functions for Resources
const ResourceAPI = {
    // Get all resources
    getAllResources: function() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([...mockResources]);
            }, 300);
        });
    },

    // Add new resource
    addResource: function(resourceData) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newResource = {
                    id: mockResources.length + 1,
                    ...resourceData,
                    datePosted: new Date().toISOString().split('T')[0]
                };
                mockResources.push(newResource);
                resolve(newResource);
            }, 300);
        });
    },

    // Search resources
    searchResources: function(query, category) {
        return new Promise((resolve) => {
            setTimeout(() => {
                let filtered = [...mockResources];
                
                // Filter by category
                if (category && category !== 'all') {
                    filtered = filtered.filter(item => item.category === category);
                }
                
                // Filter by search query
                if (query) {
                    const lowerQuery = query.toLowerCase();
                    filtered = filtered.filter(item => 
                        item.itemName.toLowerCase().includes(lowerQuery) ||
                        item.description.toLowerCase().includes(lowerQuery) ||
                        item.category.toLowerCase().includes(lowerQuery)
                    );
                }
                
                resolve(filtered);
            }, 300);
        });
    }
};

// API Functions for Rides
const RideAPI = {
    // Get all rides
    getAllRides: function() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([...mockRides]);
            }, 300);
        });
    },

    // Add new ride
    addRide: function(rideData) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newRide = {
                    id: mockRides.length + 1,
                    ...rideData,
                    datePosted: new Date().toISOString().split('T')[0]
                };
                mockRides.push(newRide);
                resolve(newRide);
            }, 300);
        });
    },

    // Search rides
    searchRides: function(query) {
        return new Promise((resolve) => {
            setTimeout(() => {
                if (!query) {
                    resolve([...mockRides]);
                    return;
                }
                
                const lowerQuery = query.toLowerCase();
                const filtered = mockRides.filter(ride => 
                    ride.from.toLowerCase().includes(lowerQuery) ||
                    ride.to.toLowerCase().includes(lowerQuery) ||
                    ride.driver.toLowerCase().includes(lowerQuery)
                );
                
                resolve(filtered);
            }, 300);
        });
    }
};

// Export for use in other files
// When connecting to real backend, replace these functions with actual fetch() calls