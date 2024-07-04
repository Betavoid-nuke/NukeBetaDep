
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

  var news: NewsJSON
  try {
    
    news = await GetNewsFromApi({title:'new+industry+standards+in+mechanical+engineering'});

    if(news){
      return (
        <div>
          <RightbarCards alltitles={news} />
        </div>
      )
    } else {
      return <div></div>
    }

  } catch (error) {
    console.log(error);
    return <div></div>
  }
  
}

export default Rightsidebar