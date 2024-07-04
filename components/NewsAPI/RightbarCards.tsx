"use client";

import { ScrollArea } from '@radix-ui/react-scroll-area';
import React from 'react';
import { usePathname } from 'next/navigation';
import { NewsCard } from './NewsCard';

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

interface props {
    alltitles: NewsJSON
}

const RightbarCards = ({alltitles}:props) => {

  const pathname = usePathname();
  const isHomePage = pathname === '/';

  //articles, all of these are array
  const titles = alltitles.articles.map(article => article.title);
  const source = alltitles.articles.map(article => article.source);
  const description = alltitles.articles.map(article => article.description);
  const articleurl = alltitles.articles.map(article => article.url);
  const urlToImage = alltitles.articles.map(article => article.urlToImage);
  const ariclecontent = alltitles.articles.map(article => article.content);
  const publishedAt = alltitles.articles.map(article => article.publishedAt);

  if (isHomePage) {
    return (
      <section className="custom-scrollbar rightsidebar">
        <div className="flex flex-1 flex-col justify-start" style={{ border: '1px', borderColor: '#232323', borderRadius: '20px', borderStyle: 'solid', padding: '20px', overflowY:'hidden' }}>
          <h3 className="text-heading4-small text-light-1">Suggested Community</h3>
          
          <ScrollArea className="text-light-1 h-20 w-full" style={{ overflowWrap: "anywhere", overflowY: "auto", height:'100%', marginTop:'20px' }}>
            
          </ScrollArea>

        </div>
        <div className="flex flex-1 flex-col justify-start" style={{ border: '1px', borderColor: '#232323', borderRadius: '20px', borderStyle: 'solid', padding: '20px', overflowY:'hidden' }}>
          <h3 className="text-heading4-small text-light-1">Latest News</h3>
          
          <ScrollArea className="text-light-1 h-20 w-full" style={{ overflowWrap: "anywhere", overflowY: "auto", height:'100%', marginTop:'20px' }}>
                {titles.map((title, index) => (
                    <NewsCard title={title} urlarticle={articleurl[index]} />
                ))}
          </ScrollArea>

        </div>
      </section>
    );
  } else {
    return <div></div>;
  }
};

export default RightbarCards;
