"use client"
import { usePathname } from 'next/navigation';
import RightbarCards from '../NewsAPI/RightbarCards';
import GetNewsFromApi from '../NewsAPI/GetNewsFromApi';
import { fetchProject } from '@/lib/actions/thread.actions';
import { currentUser } from '@clerk/nextjs';
import { fetchUser, getCurrentUserData } from '@/lib/actions/user.action';
import React, { useState, useEffect } from 'react';
import { mockdata } from '../NewsAPI/MockData';

interface NewsJSON {
  status: string;
  totalResults: number;
  articles: {
    source: [Object];
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
  }[];
}

const Rightsidebar: React.FC = () => {

  const [news, setNews] = useState<NewsJSON>({
    status: '',
    totalResults: 0,
    articles: [{
      source: [Object],
      author: '',
      title: '',
      description: '',
      url: '',
      urlToImage: '',
      publishedAt: '',
      content: ''
    }]
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
        

        //NEWS API CALL_______________________________________

        //getting the latest news 
        //this is actual api call but this is only free on loackhost and paid when deployed, so wont work with free plan when deplotyed
        // const newsData = await GetNewsFromApi({ title: 'new+industry+standards+in+mechanical+engineering' });
        
        //this is mock data for the news as the actctualkl api call is paid and dont work on production on free plan
        const newsData = mockdata;



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
        <div style={{background:'black', color:'white'}}>No new news as of now.</div>
      ) : error ? (
        <div style={{background:'black', color:'white'}}>Error: {error}</div>
      ) : (
        <RightbarCards alltitles={news} userInfo={userInfo} />
      )}
    </div>
  );
};

export default Rightsidebar;
