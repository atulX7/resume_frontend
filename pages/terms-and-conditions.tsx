export default function TermsAndConditions() {
    return (
        <div className="container py-16">
            <h1 className="text-4xl font-bold mb-8">Terms & Conditions</h1>
            <div className="max-w-2xl">
                <p className="text-white/70 mb-4">
                    Last updated: {new Date().toLocaleDateString()}
                </p>
                <p className="text-white/70 mb-4">
                    By accessing and using this website, you agree to these terms and conditions.
                </p>
                {/* Add more terms and conditions content here */}
            </div>
        </div>
    );
}