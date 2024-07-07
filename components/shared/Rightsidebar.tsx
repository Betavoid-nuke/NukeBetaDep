"use client"
import { usePathname } from 'next/navigation';
import RightbarCards from '../NewsAPI/RightbarCards';
import GetNewsFromApi from '../NewsAPI/GetNewsFromApi';
import { fetchProject } from '@/lib/actions/thread.actions';
import { currentUser } from '@clerk/nextjs';
import { fetchUser, getCurrentUserData } from '@/lib/actions/user.action';
import React, { useState, useEffect } from 'react';

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

const Rightsidebar: React.FC = () => {

  const [news, setNews] = useState<NewsJSON>({
    status: '',
    totalResults: 0,
    articles: [],
  });
  const [userInfo, setUserInfo] = useState<any>(null); // Adjust type as necessary

  useEffect(() => {

    const fetchData = async () => {
      try {
        
        const newsData = await GetNewsFromApi({ title: 'new+industry+standards+in+mechanical+engineering' });
        const currentUserData = await getCurrentUserData();
        if (!currentUserData) return;
        const userInfoData = await fetchUser(currentUserData.id);

        setNews(newsData);
        setUserInfo(userInfoData);

      } catch (error) {
        console.error(error);
      }
    };
    fetchData();

  }, []);

  return (
    <div>
      <RightbarCards alltitles={news} userInfo={userInfo} />
    </div>
  );

};

export default Rightsidebar;
