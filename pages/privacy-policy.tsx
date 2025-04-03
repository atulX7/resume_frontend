export default function PrivacyPolicy() {
    return (
        <div className="container py-16">
            <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
            <div className="max-w-2xl">
                <p className="text-white/70 mb-4">
                    Last updated: {new Date().toLocaleDateString()}
                </p>
                <p className="text-white/70 mb-4">
                    This Privacy Policy describes how we collect, use, and handle your information.
                </p>
                {/* Add more privacy policy content here */}
            </div>
        </div>
    );
}