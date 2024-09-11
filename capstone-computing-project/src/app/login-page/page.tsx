// This will be for home page
// Important to not move this page.tsx into any other folders or to a different location


// helper home page
export default function Home() {
    return (
        <div className="min-h-screen flex flex-col">

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-28">
                    <div className="container mx-auto text-center flex flex-col justify-center items-center min-h-[70vh]">
                        <h1> TEMP </h1>
                    </div>
                </section>

                {/* Horizontal Line */}
                <div className="w-full border-t-4 border-[#49A097]"></div>

                {/* TEMP Section */}
                <section id="projects" className="py-20 bg-gray-100 text-gray-800">
                    <div className="container mx-auto text-center">
                        <h2 className="text-4xl font-bold mb-6 text-[#49A097]">
                            TEMP SECTION
                        </h2>
                        <p className="text-lg mb-8 max-w-2xl mx-auto">
                            TEMP STATEMENT
                        </p>
                        {/* Placeholder for your projects */}
                    </div>
                </section>

                {/* TEMP Line */}
                <div className="w-full border-t-4 border-[#49A097]"></div>
            </main>
        </div>
    );
}

