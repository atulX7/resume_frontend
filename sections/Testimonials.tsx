import Tag from "@/components/extra/Tag";
import Image from "next/image";

const testimonials = [
    {
        name: "Sarah Johnson",
        role: "Software Engineer at Google",
        image: "https://i.pravatar.cc/150?img=1",
        quote: "The AI-powered resume analysis helped me optimize my CV perfectly for tech roles. Landed my dream job at Google!",
    },
    {
        name: "Michael Chen",
        role: "Product Manager at Microsoft",
        image: "https://i.pravatar.cc/150?img=2",
        quote: "The mock interviews were incredibly realistic. They prepared me well for the actual interviews.",
    },
    {
        name: "Emily Rodriguez",
        role: "UX Designer at Apple",
        image: "https://i.pravatar.cc/150?img=3",
        quote: "The ATS optimization feature ensured my resume got past the initial screening. Game changer!",
    },
    {
        name: "David Kim",
        role: "Data Scientist at Amazon",
        image: "https://i.pravatar.cc/150?img=4",
        quote: "Comprehensive career insights helped me negotiate a better salary package. Highly recommended!",
    },
    {
        name: "Lisa Thompson",
        role: "Marketing Director at Meta",
        image: "https://i.pravatar.cc/150?img=5",
        quote: "The platform made my career transition smooth and successful. Worth every penny!",
    },
    {
        name: "James Wilson",
        role: "Frontend Developer at Netflix",
        image: "https://i.pravatar.cc/150?img=6",
        quote: "Expert feedback on my portfolio made a huge difference in my job applications.",
    },
];

export default function Testimonials() {
    return (
        <section className="py-24 overflow-hidden bg-white">
            <div className="container">
                <div className="grid lg:grid-cols-2 items-center lg:gap-16">
                    <div>
                        <Tag className="bg-teal-50 text-teal-600">Testimonials</Tag>
                        <h2 className="text-6xl font-medium mt-6 text-gray-900">
                            Success stories from{" "}
                            <span className="text-teal-600">our users</span>
                        </h2>

                        <p className="text-gray-600 mt-4 text-lg">
                            Join thousands of professionals who have transformed their careers using our AI-powered platform. See what our users have to say about their journey to success.
                        </p>
                    </div>
                    <div>
                        <div className="grid md:grid-cols-2 gap-4 lg:h-[800px] h-[400px] lg:mt-0 mt-8 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
                            <div className="flex flex-col gap-4 animate-scroll">
                                {testimonials.map((testimonial, index) => (
                                    <div
                                        key={index}
                                        className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-teal-100 transition-colors"
                                    >
                                        <div className="flex items-center gap-4 mb-4">
                                            <Image
                                                src={testimonial.image}
                                                alt={testimonial.name}
                                                width={48}
                                                height={48}
                                                className="rounded-full"
                                            />
                                            <div>
                                                <h4 className="font-medium text-gray-900">{testimonial.name}</h4>
                                                <p className="text-sm text-gray-500">{testimonial.role}</p>
                                            </div>
                                        </div>
                                        <p className="text-gray-600">{testimonial.quote}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="hidden md:flex flex-col gap-4 animate-scroll-reverse">
                                {[...testimonials].reverse().map((testimonial, index) => (
                                    <div
                                        key={index}
                                        className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-teal-100 transition-colors"
                                    >
                                        <div className="flex items-center gap-4 mb-4">
                                            <Image
                                                src={testimonial.image}
                                                width={48}
                                                height={48}
                                                className="rounded-full"
                                                alt={testimonial.name}
                                            />
                                            <div>
                                                <h4 className="font-medium text-gray-900">{testimonial.name}</h4>
                                                <p className="text-sm text-gray-500">{testimonial.role}</p>
                                            </div>
                                        </div>
                                        <p className="text-gray-600">{testimonial.quote}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
