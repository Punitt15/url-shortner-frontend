export interface UrlList{
    _id: string;
    shortUrl: string;
    originalUrl: string;
    userId: string;
    clicks: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
} 

export interface UrlListProps {
    onRefresh?: () => void;
}

export interface UrlShortnerProps {
    onUrlAdded?: () => void;
}

export interface UrlList{
    _id: string;
    shortUrl: string;
    originalUrl: string;
    userId: string;
    clicks: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
