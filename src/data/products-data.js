export const products_data = [
  // --- Flash Deals / Offer Products ---
  {
    _id: "prd_offer_1",
    title: "Samsung Galaxy Tab S6 Lite 10.4-inch Tablet with S-Pen Stylus",
    img: "/assets/img/product/offer/product-offer-1.jpg",
    imageURLs: [
      { img: "/assets/img/product/offer/product-offer-1.jpg", color: { name: "Oxford Gray" } },
      { img: "/assets/img/product/product-1.jpg", color: { name: "Angora Blue" } }
    ],
    category: { name: "Mobile Phones", id: "cat_electronics_2" },
    parent: "Mobile Phones",
    children: "Tablets",
    price: 349.99,
    discount: 25,
    rating: 5,
    ratingVal: 5,
    status: "in-stock",
    description: "The Samsung Galaxy Tab S6 Lite is your do-it-all, take-anywhere notepad and entertainment hub. Featuring a crystal-clear 10.4-inch display, included S-Pen stylus, and rich AKG dual speakers with Dolby Atmos surround sound.",
    additionalInformation: [
      { key: "Screen Size", value: "10.4 inches TFT LCD (2000 x 1200)" },
      { key: "Processor", value: "Octa-Core Exynos 9611" },
      { key: "Storage / RAM", value: "64GB / 4GB RAM (expandable via MicroSD)" },
      { key: "Battery Life", value: "Up to 13 hours video playback" }
    ],
    reviews: [
      { _id: "rev_1", user: "Alex Johnson", rating: 5, date: "August 12, 2026", comment: "Crisp screen, responsive stylus, and long-lasting battery." }
    ],
    productType: "electronics",
    brand: { name: "Samsung" },
    tags: ["Tablet", "Samsung", "Android", "Stylus"],
    offerDate: {
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 3 * 24 * 3600 * 1000).toISOString(),
    },
    featured: true,
    new: true,
    topSellers: true,
  },
  {
    _id: "prd_offer_2",
    title: "B&O Beoplay H95 Flagship Wireless ANC Headphones (Chestnut Leather)",
    img: "/assets/img/product/offer/product-offer-2.jpg",
    imageURLs: [
      { img: "/assets/img/product/offer/product-offer-2.jpg", color: { name: "Chestnut Leather" } }
    ],
    category: { name: "Headphones", id: "cat_electronics_1" },
    parent: "Headphones",
    children: "Luxury Audio",
    price: 899.00,
    discount: 20,
    rating: 5,
    ratingVal: 5,
    status: "in-stock",
    description: "Crafted for discerning listeners, Bang & Olufsen Beoplay H95 headphones combine custom titanium drivers, adaptive active noise cancellation, and soft lambskin memory foam ear cushions.",
    additionalInformation: [
      { key: "Driver Type", value: "Custom Electro-dynamic Titanium 40mm" },
      { key: "Battery Life", value: "Up to 38 hours with Bluetooth & ANC" },
      { key: "Materials", value: "Aluminum, Titanium, Lambskin & Cowhide Leather" },
      { key: "Connectivity", value: "Bluetooth 5.1 with aptX Adaptive & AAC" }
    ],
    reviews: [
      { _id: "rev_2", user: "Michael Chen", rating: 5, date: "July 24, 2026", comment: "Unrivaled luxury lambskin comfort and audiophile titanium drivers." }
    ],
    productType: "electronics",
    brand: { name: "Bang & Olufsen" },
    tags: ["Headphones", "Luxury", "Wireless", "B&O"],
    offerDate: {
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 3 * 24 * 3600 * 1000).toISOString(),
    },
    featured: true,
    new: true,
    topSellers: true,
  },
  {
    _id: "prd_offer_3",
    title: "Thermaltake RGB Gaming Desktop PC (Intel i9, RTX 4080, Liquid Cooling)",
    img: "/assets/img/product/offer/product-offer-3.jpg",
    imageURLs: [
      { img: "/assets/img/product/offer/product-offer-3.jpg", color: { name: "Arctic White RGB" } }
    ],
    category: { name: "CPU & Gaming", id: "cat_electronics_3" },
    parent: "CPU & Gaming",
    children: "Gaming PC",
    price: 2499.00,
    discount: 15,
    rating: 5,
    ratingVal: 5,
    status: "in-stock",
    description: "Built for competitive eSports and next-gen content creation. Powered by Intel Core i9, NVIDIA GeForce RTX 4080 graphics, 32GB high-frequency DDR5 memory, and high-efficiency AIO liquid cooling.",
    additionalInformation: [
      { key: "CPU", value: "Intel Core i9-14900K 24-Core up to 6.0 GHz" },
      { key: "GPU", value: "NVIDIA GeForce RTX 4080 Super 16GB GDDR6X" },
      { key: "RAM & Storage", value: "32GB DDR5 6000MHz / 2TB NVMe Gen4 SSD" },
      { key: "Cooling", value: "360mm ARGB Liquid AIO System" }
    ],
    reviews: [
      { _id: "rev_3", user: "David Smith", rating: 5, date: "August 28, 2026", comment: "Crushes 4K 144Hz gaming with whisper-quiet RGB cooling." }
    ],
    productType: "electronics",
    brand: { name: "Thermaltake" },
    tags: ["Gaming", "PC", "RTX 4080", "Desktop"],
    offerDate: {
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 3 * 24 * 3600 * 1000).toISOString(),
    },
    featured: true,
    new: true,
    topSellers: true,
  },

  // --- Catalog / Trending / Gadget Products ---
  {
    _id: "prd_elec_1",
    title: "Samsung Galaxy Tab S6 Lite 64GB Android Tablet with S-Pen",
    img: "/assets/img/product/product-1.jpg",
    imageURLs: [
      { img: "/assets/img/product/product-1.jpg", color: { name: "Angora Blue" } }
    ],
    category: { name: "Mobile Phones", id: "cat_electronics_2" },
    parent: "Mobile Phones",
    children: "Tablets",
    price: 349.99,
    discount: 15,
    rating: 4.9,
    ratingVal: 4.9,
    status: "in-stock",
    description: "Slim, lightweight metal unibody design. Packed with long battery life, S-Pen precision writing, and vibrant multimedia playback.",
    additionalInformation: [
      { key: "Display", value: "10.4-inch WUXGA+ (2000 x 1200)" },
      { key: "OS", value: "Android 14 with One UI 6" },
      { key: "Connectivity", value: "Wi-Fi 5 / Bluetooth 5.0 / USB Type-C" }
    ],
    reviews: [
      { _id: "rev_4", user: "Sophia Turner", rating: 5, date: "August 15, 2026", comment: "Slim metal design with AKG dual speakers." }
    ],
    productType: "electronics",
    brand: { name: "Samsung" },
    tags: ["Tablet", "Samsung", "Android"],
    featured: true,
    new: true,
    topSellers: true,
  },
  {
    _id: "prd_elec_2",
    title: "Smart Fitness Watch with Body Temperature & Heart Rate Sensor",
    img: "/assets/img/product/product-2.jpg",
    imageURLs: [
      { img: "/assets/img/product/product-2.jpg", color: { name: "Obsidian Black" } }
    ],
    category: { name: "Smart Watch", id: "cat_electronics_4" },
    parent: "Smart Watch",
    children: "Wearables",
    price: 79.99,
    discount: 20,
    rating: 4.8,
    ratingVal: 4.8,
    status: "in-stock",
    description: "Advanced health tracking smartwatch with continuous body temperature monitoring, 24/7 heart rate, SpO2 blood oxygen sensing, and 14 sport workout modes.",
    additionalInformation: [
      { key: "Screen", value: "1.69-inch HD Full Touch Color Screen" },
      { key: "Waterproof Rating", value: "IP68 Swim-proof" },
      { key: "Battery Life", value: "Up to 10 days on a single charge" }
    ],
    reviews: [
      { _id: "rev_5", user: "Daniel Wilson", rating: 5, date: "August 10, 2026", comment: "Accurate real-time health metrics and 10-day battery life." }
    ],
    productType: "electronics",
    brand: { name: "FitPro" },
    tags: ["Smart Watch", "Fitness", "Health"],
    featured: true,
    new: true,
    topSellers: true,
  },
  {
    _id: "prd_elec_3",
    title: "Hi-Fi Wireless Bluetooth Over-Ear Headphones (Metallic Blue & Crimson)",
    img: "/assets/img/product/product-3.jpg",
    imageURLs: [
      { img: "/assets/img/product/product-3.jpg", color: { name: "Metallic Blue" } }
    ],
    category: { name: "Headphones", id: "cat_electronics_1" },
    parent: "Headphones",
    children: "Wireless",
    price: 89.99,
    discount: 15,
    rating: 4.7,
    ratingVal: 4.7,
    status: "in-stock",
    description: "Immersive Hi-Res stereo sound with 40mm neodymium acoustic drivers. Soft memory protein ear pads ensure lasting all-day comfort with foldable portable design.",
    additionalInformation: [
      { key: "Battery", value: "40 Hours Playtime with USB-C Fast Charge" },
      { key: "Bluetooth", value: "Version 5.3 with 33ft range" },
      { key: "Microphone", value: "Built-in HD noise reduction microphone" }
    ],
    reviews: [
      { _id: "rev_6", user: "Emily Davis", rating: 5, date: "July 30, 2026", comment: "Punchy deep bass and soft cushioned ear cups." }
    ],
    productType: "electronics",
    brand: { name: "SonicPro" },
    tags: ["Headphones", "Wireless", "Audio"],
    featured: true,
    new: true,
    topSellers: true,
  },
  {
    _id: "prd_elec_4",
    title: "4K UHD Professional Digital Video Camcorder with Shotgun Mic & Flip Screen",
    img: "/assets/img/product/product-4.jpg",
    imageURLs: [
      { img: "/assets/img/product/product-4.jpg", color: { name: "Matte Black" } }
    ],
    category: { name: "CPU & Gaming", id: "cat_electronics_3" },
    parent: "CPU & Gaming",
    children: "Cameras",
    price: 299.99,
    discount: 20,
    rating: 4.9,
    ratingVal: 4.9,
    status: "in-stock",
    description: "Ultra HD 4K 60FPS camcorder for filmmaking and video vlogging. Features 16X digital zoom, external directional shotgun microphone, stabilizer handle, and 270-degree rotatable touchscreen.",
    additionalInformation: [
      { key: "Video Resolution", value: "4K 60FPS / 2.7K 30FPS / 1080P 120FPS" },
      { key: "Sensor", value: "48MP CMOS Sensor" },
      { key: "Display", value: "3.0-inch IPS Touch Screen (270° Rotation)" }
    ],
    reviews: [
      { _id: "rev_7", user: "Robert King", rating: 5, date: "August 18, 2026", comment: "Crystal clear 4K video recording with top-handle stability." }
    ],
    productType: "electronics",
    brand: { name: "UltraCam" },
    tags: ["Camera", "4K", "Camcorder", "Video"],
    featured: true,
    new: true,
    topSellers: true,
  },
  {
    _id: "prd_elec_5",
    title: "20000mAh Dual Fast-Charging Power Bank with Digital LED % Display",
    img: "/assets/img/product/product-5.jpg",
    imageURLs: [
      { img: "/assets/img/product/product-5.jpg", color: { name: "Black & White Duo" } }
    ],
    category: { name: "Mobile Phones", id: "cat_electronics_2" },
    parent: "Mobile Phones",
    children: "Power Banks",
    price: 49.99,
    discount: 20,
    rating: 4.8,
    ratingVal: 4.8,
    status: "in-stock",
    description: "High capacity 20000mAh external battery power bank pack with real-time digital percentage LCD screen. Features 22.5W Power Delivery and Quick Charge 3.0 outputs.",
    additionalInformation: [
      { key: "Capacity", value: "20000mAh / 74Wh" },
      { key: "Output", value: "USB-C PD 22.5W + Dual USB-A QC 3.0" },
      { key: "Safety", value: "MultiProtect surge & temperature protection" }
    ],
    reviews: [
      { _id: "rev_8", user: "Jessica Taylor", rating: 5, date: "August 02, 2026", comment: "Charges phone 4 times over with fast PD 22.5W output." }
    ],
    productType: "electronics",
    brand: { name: "VoltCharge" },
    tags: ["Power Bank", "Charger", "Accessories"],
    featured: true,
    new: true,
    topSellers: true,
  },
  {
    _id: "prd_elec_6",
    title: "Dual Fast USB Quick-Charge Car Charger with Voltage LED Display",
    img: "/assets/img/product/product-6.jpg",
    imageURLs: [
      { img: "/assets/img/product/product-6.jpg", color: { name: "Carbon Black" } }
    ],
    category: { name: "Mobile Phones", id: "cat_electronics_2" },
    parent: "Mobile Phones",
    children: "Car Accessories",
    price: 19.99,
    discount: 10,
    rating: 4.7,
    ratingVal: 4.7,
    status: "in-stock",
    description: "All-metal aluminum alloy car charger with dual high-speed charging ports and real-time battery voltage monitoring display.",
    additionalInformation: [
      { key: "Input", value: "DC 12V-24V universal vehicle socket" },
      { key: "Output Power", value: "36W Total Max (Dual QC3.0)" }
    ],
    reviews: [
      { _id: "rev_9", user: "Brian Clark", rating: 5, date: "July 14, 2026", comment: "Real-time car battery monitor and super fast dual charging." }
    ],
    productType: "electronics",
    brand: { name: "AutoDrive" },
    tags: ["Car Charger", "USB", "Accessories"],
    featured: true,
    new: true,
    topSellers: true,
  },
  {
    _id: "prd_elec_7",
    title: "Beats Studio Buds True Wireless Noise Cancelling Earbuds (Beats Red)",
    img: "/assets/img/product/product-7.jpg",
    imageURLs: [
      { img: "/assets/img/product/product-7.jpg", color: { name: "Beats Red" } }
    ],
    category: { name: "Headphones", id: "cat_electronics_1" },
    parent: "Headphones",
    children: "Earbuds",
    price: 149.99,
    discount: 20,
    rating: 4.9,
    ratingVal: 4.9,
    status: "in-stock",
    description: "Engineered for music. Custom acoustic platform delivers powerful, balanced sound in a compact, in-ear form factor with Active Noise Cancelling (ANC) and Transparency mode.",
    additionalInformation: [
      { key: "Playtime", value: "Up to 8 hours (24 hours combined with case)" },
      { key: "Compatibility", value: "One-touch pairing for Apple & Android" },
      { key: "Sweat Resistance", value: "IPX4 rated sweat and water resistant" }
    ],
    reviews: [
      { _id: "rev_10", user: "Rachel Adams", rating: 5, date: "August 20, 2026", comment: "Custom acoustic platform delivers balanced, powerful sound." }
    ],
    productType: "electronics",
    brand: { name: "Beats" },
    tags: ["Beats", "Earbuds", "Wireless", "ANC"],
    featured: true,
    new: true,
    topSellers: true,
  },
  {
    _id: "prd_elec_8",
    title: "Waterproof Smart Fitness Tracker Watch with Olive Green Band",
    img: "/assets/img/product/product-8.jpg",
    imageURLs: [
      { img: "/assets/img/product/product-8.jpg", color: { name: "Olive Green" } }
    ],
    category: { name: "Smart Watch", id: "cat_electronics_4" },
    parent: "Smart Watch",
    children: "Wearables",
    price: 69.99,
    discount: 15,
    rating: 4.8,
    ratingVal: 4.8,
    status: "in-stock",
    description: "Sleek fitness smartwatch equipped with step counter, distance, calorie tracker, heart rate monitor, sleep stage analysis, and message notifications.",
    additionalInformation: [
      { key: "Strap", value: "Breathable Soft Silicone (Olive Green)" },
      { key: "Battery", value: "7-10 Days Regular Use" },
      { key: "Waterproof", value: "5ATM / 50M Water Resistance" }
    ],
    reviews: [
      { _id: "rev_11", user: "Thomas White", rating: 5, date: "July 22, 2026", comment: "IP68 waterproof with step tracking and sleep analysis." }
    ],
    productType: "electronics",
    brand: { name: "FitPro" },
    tags: ["Smart Watch", "Fitness", "Tracker"],
    featured: true,
    new: true,
    topSellers: true,
  },
  {
    _id: "prd_elec_9",
    title: "Hi-Res Audio In-Ear USB-C Wired Earphones with In-Line Mic",
    img: "/assets/img/product/product-9.jpg",
    imageURLs: [
      { img: "/assets/img/product/product-9.jpg", color: { name: "Gunmetal Gray" } }
    ],
    category: { name: "Headphones", id: "cat_electronics_1" },
    parent: "Headphones",
    children: "Earphones",
    price: 29.99,
    discount: 10,
    rating: 4.6,
    ratingVal: 4.6,
    status: "in-stock",
    description: "Lossless digital audio USB Type-C earbuds featuring built-in DAC decoding chip, ergonomic angled fit, and 3-button in-line remote control.",
    additionalInformation: [
      { key: "Interface", value: "Type-C Digital Audio" },
      { key: "Frequency Response", value: "20Hz - 40,000Hz (Hi-Res Certified)" }
    ],
    reviews: [
      { _id: "rev_12", user: "Kevin Lee", rating: 5, date: "June 19, 2026", comment: "Zero latency audio with clear calls and DAC chipset." }
    ],
    productType: "electronics",
    brand: { name: "SoundLine" },
    tags: ["Earphones", "USB-C", "Audio"],
    featured: true,
    new: true,
    topSellers: true,
  },
  {
    _id: "prd_elec_10",
    title: "Logitech C920 HD Pro 1080p Video Streaming Webcam with In-Ear Headset",
    img: "/assets/img/product/product-10.jpg",
    imageURLs: [
      { img: "/assets/img/product/product-10.jpg", color: { name: "Black" } }
    ],
    category: { name: "CPU & Gaming", id: "cat_electronics_3" },
    parent: "CPU & Gaming",
    children: "Computer Accessories",
    price: 89.99,
    discount: 15,
    rating: 4.9,
    ratingVal: 4.9,
    status: "in-stock",
    description: "The gold standard for streaming and remote meetings. Full HD 1080p video at 30 fps, dual stereo microphones with automatic noise reduction, and autofocus glass lens.",
    additionalInformation: [
      { key: "Max Resolution", value: "1080p/30fps - 720p/30fps" },
      { key: "Focus Type", value: "Autofocus with 78° Field of View" }
    ],
    reviews: [
      { _id: "rev_13", user: "Laura Bennett", rating: 5, date: "August 25, 2026", comment: "Full HD 1080p video with automatic light correction." }
    ],
    productType: "electronics",
    brand: { name: "Logitech" },
    tags: ["Logitech", "Webcam", "Streaming", "1080p"],
    featured: true,
    new: true,
    topSellers: true,
  },
  {
    _id: "prd_elec_11",
    title: "Logitech Zone Wireless Noise-Cancelling Headset with Flip-to-Mute Mic",
    img: "/assets/img/product/product-11.jpg",
    imageURLs: [
      { img: "/assets/img/product/product-11.jpg", color: { name: "Graphite" } }
    ],
    category: { name: "Headphones", id: "cat_electronics_1" },
    parent: "Headphones",
    children: "Office Headsets",
    price: 229.99,
    discount: 15,
    rating: 4.9,
    ratingVal: 4.9,
    status: "in-stock",
    description: "Designed for open workspaces. Active noise cancellation reduces background distractions, while a flip-to-mute noise-cancelling microphone keeps voice calls clear.",
    additionalInformation: [
      { key: "Wireless Range", value: "Up to 30m / 100ft" },
      { key: "Qi Wireless Charging", value: "Supported" }
    ],
    reviews: [
      { _id: "rev_14", user: "Marcus Evans", rating: 5, date: "August 29, 2026", comment: "Perfect for Microsoft Teams & Zoom meetings with ANC." }
    ],
    productType: "electronics",
    brand: { name: "Logitech" },
    tags: ["Logitech", "Headset", "Wireless", "ANC"],
    featured: true,
    new: true,
    topSellers: true,
  },
  {
    _id: "prd_elec_12",
    title: "Yamaha SV-250 Silent Electric Violin with Warm Walnut Frame",
    img: "/assets/img/product/product-12.jpg",
    imageURLs: [
      { img: "/assets/img/product/product-12.jpg", color: { name: "Walnut & Ebony" } }
    ],
    category: { name: "CPU & Gaming", id: "cat_electronics_3" },
    parent: "CPU & Gaming",
    children: "Audio Equipment",
    price: 1499.00,
    discount: 10,
    rating: 5,
    ratingVal: 5,
    status: "in-stock",
    reviews: [
      { _id: "rev_15", user: "Lucas Miller", rating: 5, date: "August 11, 2026", comment: "Studio-quality acoustic tone with dual piezo pickups." }
    ],
    description: "Innovative electric violin delivering natural warm acoustic violin tone via dual piezo pickups, built-in preamp control box, and ultra-lightweight wood/carbon fiber body.",
    productType: "electronics",
    brand: { name: "Yamaha" },
    tags: ["Yamaha", "Violin", "Instrument", "Electric"],
    featured: true,
    new: true,
    topSellers: true,
  },
  {
    _id: "prd_elec_13",
    title: "Microsoft Surface Pro 9 13-inch PixelSense 2-in-1 Tablet PC (Intel i7, 16GB)",
    img: "/assets/img/product/product-13.jpg",
    imageURLs: [
      { img: "/assets/img/product/product-13.jpg", color: { name: "Platinum" } }
    ],
    category: { name: "CPU & Gaming", id: "cat_electronics_3" },
    parent: "CPU & Gaming",
    children: "Laptops",
    price: 1299.99,
    discount: 12,
    rating: 5,
    ratingVal: 5,
    status: "in-stock",
    description: "Surface Pro 9 gives you tablet flexibility and laptop performance. Features 12th Gen Intel Core i7 processor, 13-inch edge-to-edge PixelSense Flow touch display, and Thunderbolt 4 ports.",
    reviews: [
      { _id: "rev_16", user: "Hannah Scott", rating: 5, date: "August 21, 2026", comment: "Ultra-portable tablet flexibility with laptop performance." }
    ],
    productType: "electronics",
    brand: { name: "Microsoft" },
    tags: ["Surface", "Microsoft", "Tablet", "Windows 11"],
    featured: true,
    new: true,
    topSellers: true,
  },
  {
    _id: "prd_elec_14",
    title: "3M Peltor Sport Tactical 500 Electronic Hearing Protection Earmuffs",
    img: "/assets/img/product/product-14.jpg",
    imageURLs: [
      { img: "/assets/img/product/product-14.jpg", color: { name: "Black & Orange" } }
    ],
    category: { name: "Headphones", id: "cat_electronics_1" },
    parent: "Headphones",
    children: "Hearing Protection",
    price: 179.95,
    discount: 15,
    rating: 4.8,
    ratingVal: 4.8,
    status: "in-stock",
    description: "SMART technology automatically suppresses gunshot noise while amplifying low-level voices. Bluetooth wireless connectivity allows streaming and taking phone calls in noisy environments.",
    reviews: [
      { _id: "rev_17", user: "Gordon Freeman", rating: 5, date: "July 11, 2026", comment: "Bluetooth connectivity with dynamic sound suppression." }
    ],
    productType: "electronics",
    brand: { name: "3M Peltor" },
    tags: ["Headphones", "Tactical", "Bluetooth", "3M"],
    featured: true,
    new: true,
    topSellers: true,
  },
  {
    _id: "prd_elec_15",
    title: "PerTronix Flame-Thrower Electronic Distributor (High Energy Billet)",
    img: "/assets/img/product/product-15.jpg",
    imageURLs: [
      { img: "/assets/img/product/product-15.jpg", color: { name: "Billet Aluminum" } }
    ],
    category: { name: "CPU & Gaming", id: "cat_electronics_3" },
    parent: "CPU & Gaming",
    children: "Automotive Electronics",
    price: 289.00,
    discount: 10,
    rating: 4.7,
    ratingVal: 4.7,
    status: "in-stock",
    description: "CNC machined 6061-T6 billet aluminum housing with patented Ignitor electronic technology for precision timing accuracy and high spark energy across the RPM range.",
    reviews: [
      { _id: "rev_18", user: "Sam Walker", rating: 5, date: "August 04, 2026", comment: "Provides maintenance-free electronic ignition accuracy." }
    ],
    productType: "electronics",
    brand: { name: "PerTronix" },
    tags: ["Electronics", "Automotive", "Distributor"],
    featured: true,
    new: true,
    topSellers: true,
  },
  {
    _id: "prd_elec_16",
    title: "Amazon Echo Show 5 Smart Display with Alexa & 2MP Video Calling",
    img: "/assets/img/product/product-16.jpg",
    imageURLs: [
      { img: "/assets/img/product/product-16.jpg", color: { name: "Charcoal" } }
    ],
    category: { name: "Bluetooth Speaker", id: "cat_electronics_5" },
    parent: "Bluetooth Speaker",
    children: "Smart Home",
    price: 89.99,
    discount: 25,
    rating: 4.9,
    ratingVal: 4.9,
    status: "in-stock",
    description: "Set alarms and timers, get news updates, stream music and shows, and make video calls with a clear 5.5-inch compact smart touch display and deep bass speaker.",
    reviews: [
      { _id: "rev_19", user: "Chloe Martin", rating: 5, date: "August 27, 2026", comment: "Compact 5.5-inch smart display with crisp audio and voice control." }
    ],
    productType: "electronics",
    brand: { name: "Amazon" },
    tags: ["Smart Display", "Alexa", "Speaker", "Smart Home"],
    featured: true,
    new: true,
    topSellers: true,
  },
  {
    _id: "prd_elec_17",
    title: "MUTEC Straight Mute for Trumpet & Brass Instruments (Aluminum Finish)",
    img: "/assets/img/product/product-17.jpg",
    imageURLs: [
      { img: "/assets/img/product/product-17.jpg", color: { name: "Brushed Silver" } }
    ],
    category: { name: "CPU & Gaming", id: "cat_electronics_3" },
    parent: "CPU & Gaming",
    children: "Music Accessories",
    price: 45.00,
    discount: 10,
    rating: 4.8,
    ratingVal: 4.8,
    status: "in-stock",
    description: "Precision spun aluminum mute designed and acoustically engineered to deliver superb intonation and clear projection across all registers.",
    reviews: [
      { _id: "rev_20", user: "Arthur Wright", rating: 5, date: "July 18, 2026", comment: "Free-blowing in all registers with real natural cork." }
    ],
    productType: "electronics",
    brand: { name: "MUTEC" },
    tags: ["Instrument", "Mute", "Brass", "Accessories"],
    featured: true,
    new: true,
    topSellers: true,
  },
];

export default products_data;
