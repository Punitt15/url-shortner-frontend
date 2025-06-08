import { useState } from "react";
import { fetchWithAuth } from "../../utils/api";
import type { UrlShortnerProps } from "../../types/types";


export default function UrlShortner({ onUrlAdded }: UrlShortnerProps) {
    const [originalUrl, setOriginalUrl] = useState('');
    const [error, setError] = useState('');

    const handleShorten = async () => {
        setError('');
        try {
            await fetchWithAuth('/urls', {
                method: 'POST',
                body: JSON.stringify({ originalUrl })
            });
            setOriginalUrl('');
            if (onUrlAdded) {
                onUrlAdded();
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to shorten URL');
        }
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center">
                <div className="p-10">
                    <h1 className="mt-6 text-4xl font-extrabold text-blue-300 text-center">
                        {'URL Shortner'}
                    </h1>
                </div>
                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {error}
                    </div>
                )}
                <input
                    value={originalUrl}
                    onChange={(e) => setOriginalUrl(e.target.value)}
                    type="text"
                    placeholder="Enter URL"
                    className="mb-5 w-full border-2 border-gray-300 p-2 rounded-md"
                />
                <button
                    disabled={!originalUrl}
                    onClick={handleShorten}
                    className="bg-blue-500 text-black px-4 py-2 rounded-md mt-1"
                >
                    Shorten
                </button>
            </div>
        </>
    )
}
