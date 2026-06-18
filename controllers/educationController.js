// Education articles data
const articles = [
    {
        slug: 'understanding-e-waste',
        title: 'Understanding E-Waste: A Comprehensive Guide',
        excerpt: 'Learn about the growing problem of electronic waste and its impact on our environment.',
        content: `Electronic waste, or e-waste, is one of the fastest-growing waste streams in the world. As technology advances and consumer electronics become more affordable, the volume of discarded electronic devices continues to rise at an alarming rate.

E-waste includes a wide range of electronic devices such as computers, smartphones, tablets, televisions, printers, and other household appliances. When these devices reach the end of their useful life, they often end up in landfills, where they can release harmful chemicals and heavy metals into the environment.

The United Nations estimates that approximately 50 million tonnes of e-waste are generated globally each year, with only about 20% being properly recycled. This means that the vast majority of electronic waste ends up in landfills or is informally processed in developing countries, often under hazardous conditions.

Proper e-waste management is crucial for protecting our environment and human health. By recycling electronic devices, we can recover valuable materials such as gold, silver, copper, and rare earth elements, while also preventing toxic substances like lead, mercury, and cadmium from contaminating our soil and water.`,
        author: 'Dr. Priya Sharma',
        date: '2024-01-15',
        readTime: '8 min read',
        category: 'Education',
        image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80'
    },
    {
        slug: 'health-hazards-of-e-waste',
        title: 'Health Hazards of Improper E-Waste Disposal',
        excerpt: 'Discover the serious health risks associated with improper electronic waste handling.',
        content: `Improper disposal of electronic waste poses significant health risks to humans and wildlife. Electronic devices contain a variety of hazardous materials that can leach into the environment when not properly managed.

Lead, found in cathode ray tubes and soldering materials, can cause damage to the nervous system, kidneys, and reproductive system. Mercury, used in flat-screen displays and switches, is a potent neurotoxin that can accumulate in the food chain. Cadmium, present in rechargeable batteries and semiconductors, is a known carcinogen that can cause kidney damage and bone disease.

Workers in informal e-waste recycling operations are particularly at risk. Without proper protective equipment and ventilation, they are exposed to toxic fumes from burning electronic components, as well as direct contact with hazardous substances.

Children living near e-waste processing sites have been found to have elevated levels of lead and other heavy metals in their blood, leading to developmental delays and cognitive impairment. Pregnant women exposed to e-waste toxins face increased risks of complications and adverse birth outcomes.`,
        author: 'Dr. Rajesh Kumar',
        date: '2024-02-10',
        readTime: '6 min read',
        category: 'Health',
        image: 'https://images.unsplash.com/photo-1567177662154-dfeb4c93b6ae?auto=format&fit=crop&w=800&q=80'
    },
    {
        slug: 'recycling-best-practices',
        title: 'E-Waste Recycling Best Practices for Businesses',
        excerpt: 'A guide for businesses on implementing effective e-waste recycling programs.',
        content: `Businesses generate a significant portion of the world's e-waste, making it essential for organizations to implement effective recycling programs. Here are some best practices for managing electronic waste in a corporate setting.

First, conduct an audit of your organization's electronic assets to understand the volume and types of devices in use. This will help you plan for their eventual disposal and identify opportunities for extending their useful life through maintenance and upgrades.

Establish partnerships with certified e-waste recyclers who follow environmentally responsible practices. Look for certifications such as R2 (Responsible Recycling) or e-Stewards, which ensure that recyclers meet high standards for environmental protection and worker safety.

Implement a data destruction policy to ensure that all sensitive information is securely erased from devices before they are recycled. This is not only an environmental responsibility but also a legal requirement under data protection regulations.

Consider donating functional devices to schools, non-profit organizations, or refurbishment programs. This extends the useful life of electronics and reduces the overall volume of e-waste generated.`,
        author: 'Amit Patel',
        date: '2024-03-05',
        readTime: '7 min read',
        category: 'Business',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=800&q=80'
    }
];

// Education videos data
const videos = [
    {
        id: 1,
        title: 'The E-Waste Crisis Explained',
        description: 'An overview of the global e-waste problem and its environmental impact.',
        thumbnail: 'https://img.youtube.com/vi/ITwYEPCKFkM/maxresdefault.jpg',
        videoId: 'ITwYEPCKFkM',
        duration: '8:24',
        date: 'May 10, 2023',
        category: 'Education'
    },
    {
        id: 2,
        title: 'Inside an E-Waste Recycling Facility',
        description: 'Take a tour of a modern e-waste recycling facility and see how electronic devices are processed.',
        thumbnail: 'https://img.youtube.com/vi/HQkjP_DqgdQ/maxresdefault.jpg',
        videoId: 'HQkjP_DqgdQ',
        duration: '12:37',
        date: 'June 22, 2023',
        category: 'Behind the Scenes'
    },
    {
        id: 3,
        title: 'How to Prepare Your Devices for Recycling',
        description: 'Learn the steps to properly prepare your electronic devices before recycling them.',
        thumbnail: 'https://img.youtube.com/vi/0JZey9GJQP0/maxresdefault.jpg',
        videoId: '0JZey9GJQP0',
        duration: '6:15',
        date: 'July 5, 2023',
        category: 'How-to'
    },
    {
        id: 4,
        title: 'The Hidden Value in E-Waste',
        description: 'Discover the valuable materials contained in electronic waste and how they can be recovered.',
        thumbnail: 'https://img.youtube.com/vi/zU62hh3DBfY/maxresdefault.jpg',
        videoId: 'zU62hh3DBfY',
        duration: '9:42',
        date: 'August 18, 2023',
        category: 'Education'
    },
    {
        id: 5,
        title: 'E-Waste and the Circular Economy',
        description: 'How the principles of circular economy can be applied to electronic waste management.',
        thumbnail: 'https://img.youtube.com/vi/JXDrIvShZKU/maxresdefault.jpg',
        videoId: 'JXDrIvShZKU',
        duration: '15:08',
        date: 'September 3, 2023',
        category: 'Sustainability'
    },
    {
        id: 6,
        title: 'DIY Electronics Repair: Extending Device Lifespan',
        description: 'Basic repair techniques to help your electronic devices last longer and reduce e-waste.',
        thumbnail: 'https://img.youtube.com/vi/Kv5fSBfnue0/maxresdefault.jpg',
        videoId: 'Kv5fSBfnue0',
        duration: '18:22',
        date: 'October 12, 2023',
        category: 'How-to'
    }
];

// Education index page
exports.getEducationIndex = (req, res) => {
    res.render('pages/education/index', {
        title: 'Education Hub - E-Waste Management',
        path: '/education'
    });
};

// Facts page
exports.getFacts = (req, res) => {
    res.render('pages/education/facts', {
        title: 'E-Waste Facts - E-Waste Management',
        path: '/education/facts'
    });
};

// Tips page
exports.getTips = (req, res) => {
    res.render('pages/education/tips', {
        title: 'Recycling Tips - E-Waste Management',
        path: '/education/tips'
    });
};

// Resources page
exports.getResources = (req, res) => {
    res.render('pages/education/resources', {
        title: 'Resources - E-Waste Management',
        path: '/education/resources'
    });
};

// Articles list page
exports.getArticles = (req, res) => {
    res.render('pages/articles', {
        title: 'Articles - E-Waste Management',
        path: '/articles',
        articles: articles
    });
};

// Article detail page
exports.getArticleDetail = (req, res) => {
    const article = articles.find(a => a.slug === req.params.slug);

    if (!article) {
        return res.status(404).render('pages/404', {
            title: 'Article Not Found',
            path: '/articles',
            error: {
                status: 404,
                message: 'The article you are looking for does not exist.'
            }
        });
    }

    // Get related articles (exclude current)
    const relatedArticles = articles.filter(a => a.slug !== article.slug).slice(0, 2);

    res.render('pages/article-detail', {
        title: `${article.title} - E-Waste Management`,
        path: '/articles',
        article: article,
        relatedArticles: relatedArticles
    });
};

// Videos page
exports.getVideos = (req, res) => {
    res.render('pages/videos', {
        title: 'Educational Videos - E-Waste Management',
        path: '/videos',
        videos: videos || []
    });
};
