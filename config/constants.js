// Application Constants & Mock Data

exports.centers = [
    {
        id: 0,
        name: 'Patna Green E-Waste Solutions',
        address: 'Plot No. 12, Pataliputra Industrial Estate, Patna, Bihar 800013',
        phone: '+91 612 234 5678',
        email: 'contact@patnagreen.com',
        website: 'https://www.patnagreen.com',
        hours: 'Monday - Saturday: 9:00 AM - 7:00 PM',
        acceptedItems: ['Computers', 'Laptops', 'Monitors', 'Printers', 'Mobile Phones', 'Tablets', 'Televisions', 'Batteries'],
        certifications: ['BSPCB Authorized', 'ISO 14001'],
        description: 'The premier e-waste recycling facility in Bihar, ensuring safe and eco-friendly disposal of electronics.',
        image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        latitude: 25.611,
        longitude: 85.144
    },
    {
        id: 1,
        name: 'EcoRecycle India',
        address: 'Plot No. 45, Okhla Industrial Area, Phase III, New Delhi, Delhi 110020',
        phone: '+91 11 2345 6789',
        email: 'info@ecorecycleindia.com',
        website: 'https://www.ecorecycleindia.com',
        hours: 'Monday - Saturday: 9:00 AM - 6:00 PM',
        acceptedItems: ['Computers', 'Laptops', 'Monitors', 'Printers', 'Mobile Phones', 'Tablets', 'Televisions', 'Batteries'],
        certifications: ['CPCB Authorized', 'ISO 14001'],
        description: 'EcoRecycle India is a leading e-waste management company in Delhi NCR, authorized by the Central Pollution Control Board.',
        image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        latitude: 28.5355,
        longitude: 77.2625
    },
    {
        id: 2,
        name: 'E-Waste Recyclers India',
        address: 'Shed No. 12, Bommasandra Industrial Area, Bengaluru, Karnataka 560099',
        phone: '+91 80 4123 4567',
        email: 'contact@ewasterecyclers.in',
        website: 'https://www.ewasterecyclers.in',
        hours: 'Monday - Saturday: 9:30 AM - 6:30 PM',
        acceptedItems: ['Computers', 'Laptops', 'Monitors', 'Printers', 'Mobile Phones', 'Tablets', 'Televisions', 'Batteries', 'Appliances'],
        certifications: ['KSPCB Authorized', 'R2 Certified'],
        description: 'E-Waste Recyclers India provides comprehensive recycling solutions for IT parks and corporate offices in Bengaluru.',
        image: 'https://images.unsplash.com/photo-1567177662154-dfeb4c93b6ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        latitude: 12.8245,
        longitude: 77.6896
    }
];

exports.facts = [
    {
        id: 1,
        title: 'Growing Problem',
        content: 'The world generates 50 million tons of e-waste annually, with only 20% being formally recycled.',
        source: 'Global E-waste Monitor 2020'
    },
    {
        id: 2,
        title: 'Valuable Resources',
        content: 'E-waste contains precious metals like gold, silver, copper, and palladium that can be recovered and reused.',
        source: 'United Nations University'
    },
    {
        id: 3,
        title: 'Environmental Impact',
        content: 'Improper disposal of e-waste releases toxic substances like lead, mercury, and cadmium into the environment.',
        source: 'Environmental Protection Agency'
    },
    {
        id: 4,
        title: 'Economic Value',
        content: 'The raw materials in e-waste are worth approximately $57 billion annually, yet most are discarded rather than recovered.',
        source: 'World Economic Forum'
    },
    {
        id: 5,
        title: 'Health Risks',
        content: 'Informal e-waste recycling exposes workers to hazardous chemicals that can cause respiratory problems, DNA damage, and cancer.',
        source: 'World Health Organization'
    },
    {
        id: 6,
        title: 'Fastest Growing Waste Stream',
        content: 'E-waste is the world\'s fastest-growing domestic waste stream, increasing by 21% in the five years since 2014.',
        source: 'United Nations'
    }
];

exports.tips = [
    {
        id: 1,
        title: 'Repair Before Replacing',
        content: 'Many electronic devices can be repaired rather than replaced. Look for local repair shops or learn DIY repair skills.'
    },
    {
        id: 2,
        title: 'Buy Durable Products',
        content: 'Research and invest in high-quality electronics that are built to last longer and are more repairable.'
    },
    {
        id: 3,
        title: 'Donate or Sell Used Electronics',
        content: 'If your device still works but you no longer need it, consider donating it to schools, charities, or selling it to someone who can use it.'
    },
    {
        id: 4,
        title: 'Proper Recycling',
        content: 'When a device reaches the end of its life, take it to a certified e-waste recycling center rather than throwing it in the trash.'
    },
    {
        id: 5,
        title: 'Consider Refurbished Products',
        content: 'Buying refurbished electronics extends the life of existing products and reduces the demand for new manufacturing.'
    },
    {
        id: 6,
        title: 'Upgrade Components, Not Devices',
        content: 'For computers and some other devices, upgrading individual components (like RAM or storage) can extend the life of the entire device.'
    }
];

exports.resources = [
    {
        id: 1,
        title: 'E-Waste Coalition',
        url: 'https://example.org/ewaste-coalition',
        description: 'A global network of organizations working to solve the e-waste crisis through policy advocacy and education.'
    },
    {
        id: 2,
        title: 'Circular Electronics Partnership',
        url: 'https://example.org/circular-electronics',
        description: 'An industry initiative promoting circular economy principles in electronics manufacturing and recycling.'
    },
    {
        id: 3,
        title: 'E-Waste Research Institute',
        url: 'https://example.org/ewaste-research',
        description: 'Academic research center focused on developing innovative solutions for e-waste management.'
    },
    {
        id: 4,
        title: 'Global E-waste Statistics Partnership',
        url: 'https://example.org/ewaste-statistics',
        description: 'Provides comprehensive data and analysis on global e-waste generation and management.'
    }
];
