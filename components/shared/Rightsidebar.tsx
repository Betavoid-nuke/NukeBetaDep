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
  const [userInfo, setUserInfo] = useState<any>(null);

  //for placeholder and timeout hendlintg
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeoutError, setTimeoutError] = useState(false);

  useEffect(() => {

    const fetchData = async () => {
      try {

        //hending timeout shit
        const controller = new AbortController();
        const signal = controller.signal;
        const timeoutId = setTimeout(() => {
          controller.abort();
          setTimeoutError(true);
        }, 9000);
        
        //getting the latest news
        const newsData = await GetNewsFromApi({ title: 'new+industry+standards+in+mechanical+engineering' });

        //getting user information
        const currentUserData = await getCurrentUserData();
        if (!currentUserData) return;
        const userInfoData = await fetchUser(currentUserData.id);

        setNews(newsData);
        setUserInfo(userInfoData);

        //clearing timeout bomb
        clearTimeout(timeoutId);

      } catch (error:any) {
        if (error.name === 'AbortError') {
          console.log('Fetch aborted');
        } else {
          setError(error);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();

  }, []);

  return (
    <div>
      {loading ? (
        <div style={{background:'black', color:'white'}}>Loading...</div>
      ) : timeoutError ? (
        <div>No new news as of now.</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <RightbarCards alltitles={news} userInfo={userInfo} />
      )}
    </div>
  );

};

export default Rightsidebar;
