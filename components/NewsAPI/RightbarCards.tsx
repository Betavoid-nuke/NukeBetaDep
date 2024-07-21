"use client";

import { ScrollArea } from '@radix-ui/react-scroll-area';
import React from 'react';
import { usePathname } from 'next/navigation';
import { NewsCard } from './NewsCard';
import { Separator } from '@radix-ui/react-separator';
import Image from "next/image";
import HomeHeader from '../Homepageheader/HomeHeader';
import { User } from '@clerk/nextjs/dist/types/server';
import mongoose from 'mongoose';
import ScrollToTopButton from '../ScrollToTopButton/ScrollToTopButton';
import { cn } from '@/lib/utils';


interface Article {
  source: [Object];
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

interface UserInfo {
  _id: string,
  id: string,
  username: string,
  name: string,
  image: string,
  bio: string,
  threads: [],
  onboarded: {
    type: Boolean
  },
  communities: [
    {
      type: mongoose.Schema.Types.ObjectId
    },
  ],
}

interface props {
  alltitles: NewsJSON
  userInfo: UserInfo
}

const RightbarCards = ({alltitles, userInfo}:props) => {

  const pathname = usePathname();
  const isHomePage = pathname === '/';

  if (!userInfo) {
    return null;
  }

  if(alltitles){ //impliment the react timeout thing here, i think the new api is not working in production as it is free for dev only

    //articles, all of these are array
    const titles = alltitles.articles.map(article => article.title);
    const source = alltitles.articles.map(article => article.source);
    const description = alltitles.articles.map(article => article.description);
    const articleurl = alltitles.articles.map(article => article.url);
    const urlToImage = alltitles.articles.map(article => article.urlToImage);
    const ariclecontent = alltitles.articles.map(article => article.content);
    const publishedAt = alltitles.articles.map(article => article.publishedAt)
    
    if (isHomePage) {
      return (
        <>

          <section className="custom-scrollbar rightsidebar border-l border-l-dark-4" style={{paddingLeft:'20px', paddingRight:'20px', overflow:'visible'}}>

            <div className={cn(
              'absolute top-20 cursor-pointer'
            )} style={{right:'386px', zIndex:'30'}}>
              <ScrollToTopButton />
            </div>

            <div className="flex flex-1 flex-col justify-start" style={{ padding: '20px', display:'contents' }}>
            <div style={{display:'flex', justifyContent:'center', alignContent:'center'}}>
              <HomeHeader userInfo={userInfo} />
            </div>
            </div>

            <div className="flex flex-1 flex-col justify-start" style={{ border: '1px', borderColor: '#232323', borderRadius: '20px', borderStyle: 'solid', padding: '20px', overflowY:'hidden' }}>
            
            <h3 className="text-heading4-small text-light-1">Suggested Community</h3>
            
            <ScrollArea className="text-light-1 h-20 w-full" style={{ overflowWrap: "anywhere", overflowY: "auto", height:'100%', marginTop:'20px' }}>
            </ScrollArea>

            </div>

            <div className="flex flex-1 flex-col justify-start" style={{ border: '1px', borderColor: '#232323', borderRadius: '20px', borderStyle: 'solid', padding: '20px', overflowY:'hidden' }}>
            <h3 className="text-heading4-small text-light-1">Latest News</h3>
            <ScrollArea className="text-light-1 h-20 w-full" style={{ overflowWrap: "anywhere", overflowY: "auto", height:'100%', marginTop:'20px' }}>
              {titles.map((title, index) => (
                <div>
                  <Image
                    src={urlToImage[index]}
                        alt="projectPoster"
                        width={500}
                        height={50}
                    style={{height:'100px !important', objectFit:'cover', marginBottom:'20px'}}
                  />
                  <NewsCard title={title} urlarticle={articleurl[index]} />
                  <div className='flex flex-row mb-5' style={{fontSize:'12px'}}>
                    <div style={{fontStyle:'normal', fontWeight:'lighter'}}>{new Date(publishedAt[index]).toLocaleDateString('en-CA')}</div>
                  </div>
                  <Separator style={{height:'1px', backgroundColor:'#353535', marginBottom:'20px'}} />
                </div>
              ))}
            </ScrollArea>
            </div>
              
          </section>

        </>
      );
    } else {
      return <div></div>;
    }

  } else {
    return <div style={{background:'black'}}></div>;
  }
};

export default RightbarCards;
