
import { usePathname } from 'next/navigation';
import RightbarCards from '../NewsAPI/RightbarCards';
import GetNewsFromApi from '../NewsAPI/GetNewsFromApi';

interface Article {
  source: { id: string | null; name: string };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

interface NewsJSON {
  status: string;
  totalResults: number;
  articles: Article[];
}

async function Rightsidebar() {

  const news: NewsJSON = await GetNewsFromApi({title:'new+industry+standards+in+mechanical+engineering'});

  return (
    <div>
      <RightbarCards alltitles={news} />
    </div>
  )
}

export default Rightsidebar