import { useState } from 'react';
import UrlList from '../../components/url-list/UrlList'
import UrlShortner from '../../components/url-shortner/UrlShortner'

export default function Dashboard() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleUrlAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <UrlShortner onUrlAdded={handleUrlAdded} />
      <UrlList key={refreshTrigger} />
    </div>
  )
}
