import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchWithAuth } from "../../utils/api";
import type { UrlList, UrlListProps } from "../../types/types";

export default function UrlList({ onRefresh }: UrlListProps) {
    const navigate = useNavigate();
    const [urls, setUrls] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchWithAuth('/urls/allShortUrl').then((data) => {
            setUrls(data);
        }).catch((error) => {
            setError(error instanceof Error ? error.message : 'Failed to fetch URLs');
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    const handleUrlClick = async (shortUrl: string, originalUrl: string) => {
        try {
            await fetchWithAuth(`/urls/${shortUrl}`);
            const allUrls = await fetchWithAuth('/urls/allShortUrl');
            console.log("allUrls :",allUrls);
            setUrls(allUrls);
            window.open(originalUrl, '_blank', 'noopener,noreferrer');
        } catch (error) {
            console.error('Error tracking URL click:', error);
            window.open(originalUrl, '_blank', 'noopener,noreferrer');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500 font-bold">Error: {error}</div>;

    return (
        <>
        {loading ? <div>Loading...</div> : <></>}
        {error ? <div className="text-red-500 font-bold">Error: {error}</div> : <></>}
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">Short URL List</h1>
            {urls && urls.length > 0 ? (
                <div className="mt-8 grid gap-4 w-full max-w-2xl">
                    {urls.map((url:UrlList, i:number) => (
                        <div 
                            key={i} 
                            className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow duration-200"
                        >
                            <div className="flex flex-col space-y-2">
                                <div className="flex items-center justify-between">
                                    <a 
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleUrlClick(url.shortUrl, url.originalUrl);
                                        }}
                                        className="text-indigo-600 hover:text-indigo-800 font-medium text-lg truncate max-w-[70%]"
                                    >
                                        {url.shortUrl}
                                    </a>
                                    <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium">
                                        {url.clicks} clicks
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="mt-8 text-center text-gray-500">
                    No URLs found. Create your first short URL!
                </div>
            )}
        </div>
        <div className="mt-5">
            <button 
                className="bg-red-500 text-black px-4 py-2 rounded-md" 
                onClick={() => {
                    localStorage.removeItem('token');
                    navigate('/');
                }}
            >
                Logout
            </button>
        </div>
        </>
    )
}
