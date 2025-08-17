export default function MarriageBenefits() {
    const benefits = [
        {
            title: "Peace & Tranquility",
            description:
                "Marriage brings comfort and peace to life, helping couples support each other through all situations.",
            icon: "💖",
        },
        {
            title: "Completes Half of Faith",
            description:
                "In Islam, marriage is considered completing half of one’s faith and protecting modesty.",
            icon: "🕌",
        },
        {
            title: "Emotional Support",
            description:
                "A spouse is like a garment—providing love, care, and emotional protection for one another.",
            icon: "🤝",
        },
        {
            title: "Family & Generations",
            description:
                "Marriage builds families, strengthens society, and ensures the growth of future generations.",
            icon: "👨‍👩‍👧‍👦",
        },
        {
            title: "Protects Modesty",
            description:
                "Marriage helps safeguard against temptations and encourages a pure, dignified lifestyle.",
            icon: "🌙",
        },
        {
            title: "Companionship",
            description:
                "Having a partner means you’re never alone—sharing dreams, struggles, and happiness together.",
            icon: "🌸",
        },
    ];

    return (
        <section className="mt-10 w-11/12 mx-auto  dark:from-gray-900 dark:to-gray-800">
            <div >
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-300">
                        Benefits of Marriage
                    </h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Discover how marriage can bring happiness, stability, and blessings
                        in life — for both men and women.
                    </p>
                </div>

                {/* Benefits Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {benefits.map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-white dark:bg-gray-700 rounded-2xl shadow-md hover:shadow-lg p-6 text-center transition"
                        >
                            <div className="text-4xl mb-4">{item.icon}</div>
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                                {item.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
