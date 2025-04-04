import { FaGithub, FaTwitter } from 'react-icons/fa';

type SocialLink = {
    name: string;
    url: string;
    icon: React.ReactNode;
};

/** Simple navigation bar with social media icons */
export default function Navbar() {
    const socialLinks: SocialLink[] = [
        {
            name: 'Twitter',
            url: 'https://twitter.com/yourusername',
            icon: <FaTwitter size={25} />
        },
        {
            name: 'GitHub',
            url: 'https://github.com/yourusername',
            icon: <FaGithub size={25} />
        }
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-sm z-50">
            <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
                <div className="text-xl text-gray-400 font-bold">Hey Yall 👋</div>
                <div className="flex items-center gap-4">
                    {socialLinks.map(({ name, url, icon }) => (
                        <a
                            key={name}
                            href={url}
                            className="text-gray-400 hover:text-white transition-colors p-2"
                            aria-label={name}
                        >
                            {icon}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    );
} 