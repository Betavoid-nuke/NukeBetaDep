
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

export const mockdata: NewsJSON = {
   status: 'ok',
   totalResults: 32,
   articles: [
     {
       source: [Object],
       author: 'Hadir Al Koshta',
       title: 'Shinfield TV and Film Studios / Scott Brownrigg',
       description: 'Shinfield Studios, a new £250 million film and TV studio in Reading, Berkshire, designed by Scott Brownrigg has reached completion. The one million sq. ft. studio facility, for US-based independent film and television studio platform Shadowbox Studios, featur...',
       url: 'https://www.archdaily.com/1018530/shinfield-tv-and-film-studios-scott-brownrigg',
       urlToImage: 'https://images.adsttc.com/media/images/6687/e395/057e/4000/01c4/c47d/large_jpg/Shinfield_10___Daniel_Shearing.jpg?1720181766',
       publishedAt: '2024-07-06T15:00:00Z',
       content: '© Daniel Shearing\r\n' +
         '+ 11\r\n' +
         '<ul><li>Lead Team: Scott Brownrigg\r\n' +
         '</li><li>Engineering &amp; Consulting &gt; Structural: Sweco\r\n' +
         '</li><li>Engineering &amp; Consulting &gt; Electrical: AWA\r\n' +
         '</li><li>Enginee... [+4087 chars]'
     },
     {
       source: [Object],
       author: 'Daven Hiskey',
       title: 'Who was Better? Nikola Tesla vs Thomas Edison',
       description: 'For most of history between the point Nikola Tesla and Thomas Alva Edison were respectively doing their things to the present day, if you asked just about anyone which of these men were greater, you’d likely have gotten a response akin to “Nikola who? ...I mean...',
       url: 'http://www.todayifoundout.com/index.php/2024/07/who-was-better-nikola-tesla-vs-thomas-edison/',
       urlToImage: 'http://www.todayifoundout.com/wp-content/uploads/2024/07/tesla-vs-edison.jpg',
       publishedAt: '2024-07-11T17:22:01Z',
       content: 'For most of history between the point Nikola Tesla and Thomas Alva Edison were respectively doing their things to the present day, if you asked just about anyone which of these men were greater, youd... [+328127 chars]'
     },
     {
       source: [Object],
       author: 'Samara Kamenecka, Niche Pursuits',
       title: 'My Local Email Newsletter Makes Over $200k/Year...Here’s How',
       description: 'This week, Jared interviews local newsletter expert Ryan Sneddon, who shares a ton of great information.  He shares the strategy he used to get his newsletter, Naptown Scoop , off the ground and he offers a ton of valuable tips...\n' +
         'The post My Local Email Newsle...',
       url: 'https://www.nichepursuits.com/my-local-email-newsletter-makes-over-200k-year-heres-how/',
       urlToImage: 'https://www.nichepursuits.com/wp-content/uploads/2024/06/200k-per-year-in-advertising-revenue-with-25k-investment-2.jpg',
       publishedAt: '2024-06-26T18:25:49Z',
       content: 'This week, Jared interviews local newsletter expert Ryan Sneddon, who shares a ton of great information. \r\n' +  
         'He shares the strategy he used to get his newsletter, Naptown Scoop\r\n' +
         ', off the ground and he... [+62562 chars]'
     },
     {
       source: [Object],
       author: 'Mark Graban',
       title: 'Karen Martin on the Power of Mistake Proofing in Lean Management',
       description: 'Scroll down for how to subscribe, transcript, and more My guest for Episode #510 of the Lean Blog Interviews Podcast is Karen Martin, Founder and CEO of TKMG and TKMG Academy, appearing for the fifth time. She is the author of books including The Outstanding ...',
       url: 'https://www.leanblog.org/2024/07/karen-martin-on-the-power-of-mistake-proofing-in-lean/',
       urlToImage: 'https://www.leanblog.org/wp-content/uploads/2024/07/YouTube-Video-Covers-1.jpg',
       publishedAt: '2024-07-10T10:40:41Z',
       content: 'Scroll down for how to subscribe, transcript, and more\r\n' +
         'My guest for Episode #510 of the Lean Blog Interviews Podcast is Karen Martin, Founder and CEO of TKMG and TKMG Academy, appearing for the fift... [+72873 chars]'
     },
     {
       source: [Object],
       author: 'Patrick Lejtenyi',
       title: 'Air accidents are more common among unprofitable and poorly managed airlines, new research shows',
       description: 'The airline industry is not for the faint of heart. Margins can be slim and external shocks like the COVID-19 pandemic or gas price fluctuations can be disruptive. And mishaps always balloon in the public imagination, fairly or not.',
       url: 'https://techxplore.com/news/2024-06-air-accidents-common-unprofitable-poorly.html',
       urlToImage: 'https://scx2.b-cdn.net/gfx/news/hires/2024/airplane.jpg',
       publishedAt: '2024-06-26T16:42:23Z',
       content: 'The airline industry is not for the faint of heart. Margins can be slim and external shocks like the COVID-19 pandemic or gas price fluctuations can be disruptive. And mishaps always balloon in the p... [+4977 chars]'
     },
     {
       source: [Object],
       author: 'UnchartedWorlds',
       title: 'The Iceberg Model: towards unraveling our patriarchal legacy',
       description: 'Can systems-thinking dismantle an unjust socio-technical system?',
       url: 'https://www.mechanical-orchard.com/insights/the-iceberg-model-towards-unraveling-our-patriarchal-legacy',
       urlToImage: 'https://cdn.prod.website-files.com/658c414dd5b4b250d00a128c/667c7863119b0cc2c9cf0268_Matt%27s%20blog%20Iceberg%20Model.png',
       publishedAt: '2024-07-07T05:47:02Z',
       content: 'At the DDD Europe 2024 conference in Amsterdam, Diana Montalion and I co-hosted a hands-on workshop titled Using The Iceberg Model to Improve Sociotechnical Systems. We had an agenda for this worksho... [+13358 chars]'
     },
     {
       source: [Object],
       author: 'Research and Markets',
       title: 'Switzerland Data Center Market Investment Analysis 2024-2029: $1.81 Billion Growth Opportunities in IT, Electrical, Mechanical Infrastructure, General Construction, and Tier Standards',
       description: `Dublin, July 01, 2024 (GLOBE NEWSWIRE) -- The "Switzerland Data Center Market - Investment Analysis & Growth Opportunities 2024-2029" report has been added to ResearchAndMarkets.com's offering.The Switzerland Data Center Market was valued at USD 1.21 Billion ...`,
       url: 'https://www.globenewswire.com/news-release/2024/07/01/2906601/28124/en/Switzerland-Data-Center-Market-Investment-Analysis-2024-2029-1-81-Billion-Growth-Opportunities-in-IT-Electrical-Mechanical-Infrastructure-General-Construction-and-Tier-Standards.html',
       urlToImage: 'https://ml.globenewswire.com/Resource/Download/908fb457-7f8e-4a08-9081-5565e3dfb3d7',
       publishedAt: '2024-07-01T11:07:00Z',
       content: `Dublin, July 01, 2024 (GLOBE NEWSWIRE) -- The "Switzerland Data Center Market - Investment Analysis &amp; Growth Opportunities 2024-2029" report has been added to ResearchAndMarkets.com's offering.\r\n` +
         '... [+7646 chars]'
     },
     {
       source: [Object],
       author: 'Transparency Market Research',
       title: 'Automotive Engineering Services Outsourcing Market Size to Hit USD 274.7 Bn at a 7.2% CAGR from 2024 to 2034 | Analysis by Transparency Market Research, Inc.',
       description: 'The automotive engineering services outsourcing market is driven by a rising focus on cost reduction and the increased adoption of research and development outsourcing. The automotive engineering services outsourcing market is driven by a rising focus on cost...',
       url: 'https://www.globenewswire.com/news-release/2024/07/10/2911256/32656/en/Automotive-Engineering-Services-Outsourcing-Market-Size-to-Hit-USD-274-7-Bn-at-a-7-2-CAGR-from-2024-to-2034-Analysis-by-Transparency-Market-Research-Inc.html',
       urlToImage: 'https://ml.globenewswire.com/Resource/Download/27b21b27-620b-4cae-8360-605a9662092b',
       publishedAt: '2024-07-10T14:46:00Z',
       content: 'Wilmington, Delaware, United States, Transparency Market Research. Inc. , July 10, 2024 (GLOBE NEWSWIRE) -- The global automotive engineering services outsourcing market ( ) stood at US$ 129 billion ... [+8312 chars]'
     },
     {
       source: [Object],
       author: 'Research and Markets',
       title: 'Turkey Data Center Market Investment & Growth Analysis 2024-2029 Featuring Key DC Investors - Equinix, NGN, PenDC, Telehouse, Turkcell, and Turk Telekom',
       description: `Dublin, July 02, 2024 (GLOBE NEWSWIRE) -- The "Turkey Data Center Market - Investment Analysis & Growth Opportunities 2024-2029" report has been added to ResearchAndMarkets.com's offering.The Turkey Data Center Market was valued at USD 471.00 Million in 2023,...`,
       url: 'https://www.globenewswire.com/news-release/2024/07/02/2907216/28124/en/Turkey-Data-Center-Market-Investment-Growth-Analysis-2024-2029-Featuring-Key-DC-Investors-Equinix-NGN-PenDC-Telehouse-Turkcell-and-Turk-Telekom.html',
       urlToImage: 'https://ml.globenewswire.com/Resource/Download/908fb457-7f8e-4a08-9081-5565e3dfb3d7',
       publishedAt: '2024-07-02T08:32:00Z',
       content: `Dublin, July 02, 2024 (GLOBE NEWSWIRE) -- The "Turkey Data Center Market - Investment Analysis &amp; Growth Opportunities 2024-2029" report has been added to ResearchAndMarkets.com's offering.\r\n` +
         'The T... [+7796 chars]'
     },
     {
       source: [Object],
       author: 'Research and Markets',
       title: 'Western Europe Data Center Construction Market Outlook Report 2024: A $14.41 Billion Industry by 2029, Driven by Chip-Level Security and Rising AI Wave Boost for Investment',
       description: `Dublin, July 02, 2024 (GLOBE NEWSWIRE) -- The "Western Europe Data Center Construction Market - Industry Outlook & Forecast 2024-2029" report has been added to ResearchAndMarkets.com's offering.`,
       url: 'https://www.globenewswire.com/news-release/2024/07/02/2907212/28124/en/Western-Europe-Data-Center-Construction-Market-Outlook-Report-2024-A-14-41-Billion-Industry-by-2029-Driven-by-Chip-Level-Security-and-Rising-AI-Wave-Boost-for-Investment.html',     
       urlToImage: 'https://ml.globenewswire.com/Resource/Download/908fb457-7f8e-4a08-9081-5565e3dfb3d7',
       publishedAt: '2024-07-02T08:29:00Z',
       content: `Dublin, July 02, 2024 (GLOBE NEWSWIRE) -- The "Western Europe Data Center Construction Market - Industry Outlook &amp; Forecast 2024-2029" report has been added to ResearchAndMarkets.com's offering.\r... [+12805 chars]`
     },
     {
       source: [Object],
       author: 'Future Market Insights Global and Consulting Pvt. Ltd.',
       title: 'Will Increasing Automation Bring about a Transformation in the Test and Measurement Equipment Market? Here’s what FMI has to say!',
       description: 'Booming Telecom Industry Drives Global Test and Measurement Equipment Market Towards USD 61,534.3 Million by 2034, with a 5.6% CAGR. The growth is driven by the booming telecom industry and the advent of 5G networks. Additionally, increasing complexity in ele...',
       url: 'https://www.globenewswire.com/news-release/2024/06/26/2904197/0/en/Will-Increasing-Automation-Bring-about-a-Transformation-in-the-Test-and-Measurement-Equipment-Market-Here-s-what-FMI-has-to-say.html',
       urlToImage: 'https://ml.globenewswire.com/Resource/Download/915d2f9c-7dc6-40c7-995c-2ba168208baa',
       publishedAt: '2024-06-26T00:30:00Z',
       content: 'NEWARK, Del, June 25, 2024 (GLOBE NEWSWIRE) -- According to Future Market Insights (FMI), the test and measurement equipment market is experiencing a 5.6% CAGR through 2034, with an estimated value o... [+10089 chars]'
     },
     {
       source: [Object],
       author: 'Research and Markets',
       title: 'Ireland Data Center Report 2024: Leading Colocation, Cloud Data Centers and Hyperscalers are Establishing Renewable Energy Partnerships with Key Vendors such as Orsted, Statkraft & Aker Horizons',
       description: `Dublin, July 12, 2024 (GLOBE NEWSWIRE) -- The "Ireland Data Center Market - Investment Analysis & Growth Opportunities 2024-2029" report has been added to ResearchAndMarkets.com's offering.The Ireland data center market is forecast to grow at a CAGR of 4.06% ...`,
       url: 'https://www.globenewswire.com/news-release/2024/07/12/2912413/28124/en/Ireland-Data-Center-Report-2024-Leading-Colocation-Cloud-Data-Centers-and-Hyperscalers-are-Establishing-Renewable-Energy-Partnerships-with-Key-Vendors-such-as-Orsted-Statkraft-Aker.html',
       urlToImage: 'https://ml.globenewswire.com/Resource/Download/908fb457-7f8e-4a08-9081-5565e3dfb3d7',
       publishedAt: '2024-07-12T13:33:00Z',
       content: `Dublin, July 12, 2024 (GLOBE NEWSWIRE) -- The "Ireland Data Center Market - Investment Analysis &amp; Growth Opportunities 2024-2029" report has been added to ResearchAndMarkets.com's offering.\r\n` +
         'The ... [+7717 chars]'
     },
     {
       source: [Object],
       author: 'Future Market Insights Global and Consulting Pvt. Ltd.',
       title: 'Global Lined Valve Market to Expand at a 4.1% CAGR by 2034, Reaching USD 5.1 Billion, Driven by Demand for High-performance Motorcycles | Future Market Insights, Inc.',
       description: 'The lined valve industry for ball valves is expected to experience the highest CAGR from 2024 to 2034. This growth is driven by the expanding chemical industry and the increasing need for sterile environments and purity in pharmaceutical processes The lined v...',
       url: 'https://www.globenewswire.com/news-release/2024/07/01/2906902/0/en/Global-Lined-Valve-Market-to-Expand-at-a-4-1-CAGR-by-2034-Reaching-USD-5-1-Billion-Driven-by-Demand-for-High-performance-Motorcycles-Future-Market-Insights-Inc.html',
       urlToImage: 'https://ml.globenewswire.com/Resource/Download/915d2f9c-7dc6-40c7-995c-2ba168208baa',
       publishedAt: '2024-07-01T15:30:00Z',
       content: 'NEWARK, Del, July 01, 2024 (GLOBE NEWSWIRE) -- According to a Future Market Insights (FMI), the lined valve market is expected to be valued at USD 3.4 Billion by 2024. The market valuation is registe... [+8399 chars]'
     },
     {
       source: [Object],
       author: 'Research and Markets',
       title: 'Sweden Data Center Market Investment Analysis & Growth Opportunities 2024-2029: Stockholm, Gothenburg, Malmo, and Lulea have Emerged as Top Destinations',
       description: `Dublin, July 02, 2024 (GLOBE NEWSWIRE) -- The "Sweden Data Center Market - Investment Analysis & Growth Opportunities 2024-2029" report has been added to ResearchAndMarkets.com's offering.The Sweden Data Center Market was valued at USD 1.51 billion in 2023, a...`,
       url: 'https://www.globenewswire.com/news-release/2024/07/02/2907199/28124/en/Sweden-Data-Center-Market-Investment-Analysis-Growth-Opportunities-2024-2029-Stockholm-Gothenburg-Malmo-and-Lulea-have-Emerged-as-Top-Destinations.html',
       urlToImage: 'https://ml.globenewswire.com/Resource/Download/908fb457-7f8e-4a08-9081-5565e3dfb3d7',
       publishedAt: '2024-07-02T08:05:00Z',
       content: `Dublin, July 02, 2024 (GLOBE NEWSWIRE) -- The "Sweden Data Center Market - Investment Analysis &amp; Growth Opportunities 2024-2029" report has been added to ResearchAndMarkets.com's offering.\r\n` +
         'The S... [+7918 chars]'
     },
     {
       source: [Object],
       author: 'Research and Markets',
       title: 'Finland Data Center Market Report 2024-2029: Strong Presence from Global Support Infrastructure Vendors such as ABB, Airedale, Caterpillar, Cummins, Delta Electronics, Eaton, Legrand, Rittal and STULZ',
       description: `Dublin, July 02, 2024 (GLOBE NEWSWIRE) -- The "Finland Data Center Market - Investment Analysis & Growth Opportunities 2024-2029" report has been added to ResearchAndMarkets.com's offering.The Finland Data Center Market was valued at $418 Million in 2023, and...`,
       url: 'https://www.globenewswire.com/news-release/2024/07/02/2907221/28124/en/Finland-Data-Center-Market-Report-2024-2029-Strong-Presence-from-Global-Support-Infrastructure-Vendors-such-as-ABB-Airedale-Caterpillar-Cummins-Delta-Electronics-Eaton-Legrand-Ritt.html',
       urlToImage: 'https://ml.globenewswire.com/Resource/Download/908fb457-7f8e-4a08-9081-5565e3dfb3d7',
       publishedAt: '2024-07-02T08:56:00Z',
       content: `Dublin, July 02, 2024 (GLOBE NEWSWIRE) -- The "Finland Data Center Market - Investment Analysis &amp; Growth Opportunities 2024-2029" report has been added to ResearchAndMarkets.com's offering.\r\n` +
         'The ... [+7822 chars]'
     },
     {
       source: [Object],
       author: 'Research and Markets',
       title: 'Netherlands Data Center Market Investment Analysis 2024-2029: Amsterdam Emerges as a Hub for Scalable Hosting Solutions, Rise in Investment, Acquisition, and Expansion Activities',
       description: `Dublin, July 02, 2024 (GLOBE NEWSWIRE) -- The "Netherlands Data Center Market - Investment Analysis & Growth Opportunities 2024-2029" report has been added to ResearchAndMarkets.com's offering.The Netherlands Data Center Market was valued at USD 1.20 Billion ...`,
       url: 'https://www.globenewswire.com/news-release/2024/07/02/2907200/28124/en/Netherlands-Data-Center-Market-Investment-Analysis-2024-2029-Amsterdam-Emerges-as-a-Hub-for-Scalable-Hosting-Solutions-Rise-in-Investment-Acquisition-and-Expansion-Activities.html',
       urlToImage: 'https://ml.globenewswire.com/Resource/Download/908fb457-7f8e-4a08-9081-5565e3dfb3d7',
       publishedAt: '2024-07-02T08:06:00Z',
       content: `Dublin, July 02, 2024 (GLOBE NEWSWIRE) -- The "Netherlands Data Center Market - Investment Analysis &amp; Growth Opportunities 2024-2029" report has been added to ResearchAndMarkets.com's offering.\r\n` +
         '... [+9358 chars]'
     },
     {
       source: [Object],
       author: 'Future Market Insights Global and Consulting Pvt. Ltd.',
       title: 'Global Casing Pipe Market Forecasted to Surge Past USD 22,738.90 Million by 2034, Amid Rising Demand in Oil and Gas Industry | Future Market Insights, Inc.',
       description: 'The casing pipe market in the United States is projected to surge at a compound annual growth rate (CAGR) of 4.4% over the assessment period. Meanwhile, the demand for casing pipes in Germany is expected to grow at a CAGR of 4.8% throughout the forecast perio...',
       url: 'https://www.globenewswire.com/news-release/2024/07/11/2911734/0/en/Global-Casing-Pipe-Market-Forecasted-to-Surge-Past-USD-22-738-90-Million-by-2034-Amid-Rising-Demand-in-Oil-and-Gas-Industry-Future-Market-Insights-Inc.html',
       urlToImage: 'https://ml.globenewswire.com/Resource/Download/915d2f9c-7dc6-40c7-995c-2ba168208baa',
       publishedAt: '2024-07-11T11:30:00Z',
       content: 'NEWARK, Del, July 11, 2024 (GLOBE NEWSWIRE) -- According to a Future Market Insights (FMI), the casing pipe market value is expected to rise from USD 12,939.30 Million in 2024 to USD 22,738.90 Millio... [+9720 chars]'
     },
     {
       source: [Object],
       author: 'Future Market Insights Global and Consulting Pvt. Ltd.',
       title: 'Paint Additive Market to Reach USD 15840.4 Million by 2034 Backed by Rising Demand for Fire and Harsh Climate Resistant Paints | Future Market Insights, Inc.',
       description: 'Expanding construction and building sector including infrastructure projects in developing countries will propel the market growth of the paint additives over the forecast period, Can Additives Enhance the Functionality of Paints and Coatings? Find Out More i...',
       url: 'https://www.globenewswire.com/news-release/2024/07/04/2908558/0/en/Paint-Additive-Market-to-Reach-USD-15840-4-Million-by-2034-Backed-by-Rising-Demand-for-Fire-and-Harsh-Climate-Resistant-Paints-Future-Market-Insights-Inc.html',
       urlToImage: 'https://ml.globenewswire.com/Resource/Download/915d2f9c-7dc6-40c7-995c-2ba168208baa',
       publishedAt: '2024-07-04T07:45:00Z',
       content: 'NEWARK, Del, July 04, 2024 (GLOBE NEWSWIRE) -- The global paint additive market is set to witness a CAGR of around 4.6% in the forecast period. The market will likely reach a value of USD 10096.6 mil... [+14356 chars]'
     },
     {
       source: [Object],
       author: 'Future Market Insights Global and Consulting Pvt. Ltd.',
       title: 'Global Test and Measurement Equipment Market to Reach USD 61,534.3 Million by 2034, With a 5.6% CAGR | Future Market Insights, Inc.',
       description: 'Demand for precise test and measurement equipment is rising across industries, driven by quality and performance needs, with significant growth in the telecom sector in emerging economies. Demand for precise test and measurement equipment is rising across ind...',
       url: 'https://www.globenewswire.com/news-release/2024/07/11/2911989/0/en/Global-Test-and-Measurement-Equipment-Market-to-Reach-USD-61-534-3-Million-by-2034-With-a-5-6-CAGR-Future-Market-Insights-Inc.html',
       urlToImage: 'https://ml.globenewswire.com/Resource/Download/915d2f9c-7dc6-40c7-995c-2ba168208baa',
       publishedAt: '2024-07-11T15:30:00Z',
       content: 'NEWARK, Del, July 11, 2024 (GLOBE NEWSWIRE) -- The test and measurement equipment market is experiencing a 5.6% CAGR through 2034, with an estimated value of USD 35,684.4 million in 2024 and a projec... [+9095 chars]'
     },
     {
       source: [Object],
       author: 'Future Market Insights Global and Consulting Pvt. Ltd.',
       title: 'Non-destructive Testing Inspection Service Market Poised to Reach USD 47 Billion by 2034, with a 7.7% CAGR | Future Market Insights, Inc.',
       description: 'The scope for NDT Inspection Services will grow exponentially as transportation services across developing and developed nations are continuously undergoing repair and maintenance, which demand detection of flaws at highest levels of accuracy. The scope for N...',
       url: 'https://www.globenewswire.com/news-release/2024/06/26/2904668/0/en/Non-destructive-Testing-Inspection-Service-Market-Poised-to-Reach-USD-47-Billion-by-2034-with-a-7-7-CAGR-Future-Market-Insights-Inc.html',
       urlToImage: 'https://ml.globenewswire.com/Resource/Download/915d2f9c-7dc6-40c7-995c-2ba168208baa',
       publishedAt: '2024-06-26T14:30:00Z',
       content: 'NEWARK, Del, June 26, 2024 (GLOBE NEWSWIRE) -- According to Future Market Insights (FMI), the worldwide non-destructive testing inspection service market is expected to reach USD 22.4 billion in 2024... [+10179 chars]'
     },
     {
       source: [Object],
       author: 'Future Market Insights Global and Consulting Pvt. Ltd.',
       title: 'Garage Equipment Market is Expected to Grow at a CAGR of 8.5% During the Forecast Period by 2034 | Future Market Insights Inc.',
       description: 'The global automotive garage equipment market has experienced significant growth and transformation, driven by increasing automobile sales globally, increase in demand for vehicle restoration, modification, and upgradation, also increase in vehicle complexity...',
       url: 'https://www.globenewswire.com/news-release/2024/07/02/2907271/0/en/Garage-Equipment-Market-is-Expected-to-Grow-at-a-CAGR-of-8-5-During-the-Forecast-Period-by-2034-Future-Market-Insights-Inc.html',
       urlToImage: 'https://ml.globenewswire.com/Resource/Download/915d2f9c-7dc6-40c7-995c-2ba168208baa',
       publishedAt: '2024-07-02T10:30:00Z',
       content: 'NEWARK, Del, July 02, 2024 (GLOBE NEWSWIRE) -- The garage equipment market is valued at US$ 9.4 billion in 2024. The market is expected to grow at a CAGR of 8.5% from 2024 to 2034. The global market ... [+10481 chars]'
     },
     {
       source: [Object],
       author: 'Future Market Insights Global and Consulting Pvt. Ltd.',
       title: 'Anthracene Market to Reach USD 625.6 Million by 2034 Amid Growing Demand for Anti-cancer Drugs and Rising Middle-class Population | Future Market Insights, Inc.',
       description: 'Anthracene, a solid polycyclic aromatic hydrocarbon (PAH) with the formula C14H10, is composed of three fused benzene rings and is commonly found in coal tar. It is widely used in the production of red dye alizarin, insecticides, anti-cancer agents, wood pres...',
       url: 'https://www.globenewswire.com/news-release/2024/07/08/2909475/0/en/Anthracene-Market-to-Reach-USD-625-6-Million-by-2034-Amid-Growing-Demand-for-Anti-cancer-Drugs-and-Rising-Middle-class-Population-Future-Market-Insights-Inc.html',
       urlToImage: 'https://ml.globenewswire.com/Resource/Download/915d2f9c-7dc6-40c7-995c-2ba168208baa',
       publishedAt: '2024-07-08T10:30:00Z',
       content: 'NEWARK, Del, July 08, 2024 (GLOBE NEWSWIRE) -- According to Future Market Insights (FMI), the worldwide anthracene market is expected to reach USD 395.2 million in 2024 and USD 625.6 million by 2034.... [+8693 chars]'
     },
     {
       source: [Object],
       author: 'Future Market Insights Global and Consulting Pvt. Ltd.',
       title: 'Automotive Valve Stem Seal Market Valuation to Reach USD 866.5 Million by 2034, Driven by Continued Growth in Automotive Industry and Technological Advancements | Future Market Insights Inc.',
       description: 'The United States remains a highly lucrative market for automotive valve stem seal manufacturers. According to the latest analysis, demand for automotive valve stem seals in the USA is projected to grow at a 3.7% CAGR during the assessment period, driven by t...',
       url: 'https://www.globenewswire.com/news-release/2024/07/05/2908846/0/en/Automotive-Valve-Stem-Seal-Market-Valuation-to-Reach-USD-866-5-Million-by-2034-Driven-by-Continued-Growth-in-Automotive-Industry-and-Technological-Advancements-Future-Market-Insigh.html',
       urlToImage: 'https://ml.globenewswire.com/Resource/Download/915d2f9c-7dc6-40c7-995c-2ba168208baa',
       publishedAt: '2024-07-05T00:30:00Z',
       content: 'NEWARK, Del, July 04, 2024 (GLOBE NEWSWIRE) -- The global automotive valve stem seal market value is forecast to increase from USD 564.3 million in 2024 to USD 866.5 million by 2034. Over the assessm... [+11316 chars]'
     },
     {
       source: [Object],
       author: 'Future Market Insights Global and Consulting Pvt. Ltd.',
       title: 'A Valuation of USD 4,697.5 million to be acquired by the Global Gas Jet Compressor Market by 2034 | Future Market Insights, Inc.',
       description: 'The global expansion of natural gas infrastructure is driving the demand for gas jet compressors, which are essential for compressing and transporting gas through distribution networks, storage facilities, and pipelines. These compressors ensure the safe long...',
       url: 'https://www.globenewswire.com/news-release/2024/06/27/2905388/0/en/A-Valuation-of-USD-4-697-5-million-to-be-acquired-by-the-Global-Gas-Jet-Compressor-Market-by-2034-Future-Market-Insights-Inc.html',
       urlToImage: 'https://ml.globenewswire.com/Resource/Download/915d2f9c-7dc6-40c7-995c-2ba168208baa',
       publishedAt: '2024-06-27T15:30:00Z',
       content: 'NEWARK, Del, June 27, 2024 (GLOBE NEWSWIRE) -- The global gas jet compressor market reached US$ 2464.8 million in 2019. Worldwide demand for gas jet compressors saw moderate growth in 2023, suggestin... [+9582 chars]'
     },
     {
       source: [Object],
       author: 'Future Market Insights Global and Consulting Pvt. Ltd.',
       title: 'Global Motor Bearing Market Projected to be Worth USD 256.79 Billion by 2034, Surging at 7% CAGR, Driven by Adoption of Electric Vehicles | Future Market Insights, Inc.',
       description: 'Demand for Motor Bearings Surges along with the Rapid Adoption of Electric Vehicles, Driving Innovation and Growth across the Automotive Sector. “Growing trends towards the electric future leads to simplify the foundation of vehicles which includes less movin...',
       url: 'https://www.globenewswire.com/news-release/2024/07/03/2908035/0/en/Global-Motor-Bearing-Market-Projected-to-be-Worth-USD-256-79-Billion-by-2034-Surging-at-7-CAGR-Driven-by-Adoption-of-Electric-Vehicles-Future-Market-Insights-Inc.html',
       urlToImage: 'https://ml.globenewswire.com/Resource/Download/915d2f9c-7dc6-40c7-995c-2ba168208baa',
       publishedAt: '2024-07-03T10:30:00Z',
       content: 'NEWARK, Del, July 03, 2024 (GLOBE NEWSWIRE) -- According to a Future Market Insights (FMI), the motor bearing market is anticipated to reach a valuation of USD 130.54 Billion by 2024 end, with estima... [+13715 chars]'
     },
     {
       source: [Object],
       author: 'CMI MARKET RESEARCH PRIVATE LIMITED',
       title: '[Latest] Global Automotive Electronics and Software Market Size/Share Worth USD 519,597 Million by 2033 at a 4.8% CAGR: Custom Market Insights (Analysis, Outlook, Leaders, Report, Trends, Forecast, Segmentation, Growth, Growth Rate, Value)',
       description: '[220+ Pages Latest Report] According to a market research study published by Custom Market Insights, the demand analysis of Global Automotive Electronics and Software Market size & share revenue was valued at approximately USD 325,128.1 Million in 2023 and is...',
       url: 'https://www.globenewswire.com/news-release/2024/07/11/2912024/0/en/Latest-Global-Automotive-Electronics-and-Software-Market-Size-Share-Worth-USD-519-597-Million-by-2033-at-a-4-8-CAGR-Custom-Market-Insights-Analysis-Outlook-Leaders-Report-Trends-Fo.html',
       urlToImage: 'https://ml.globenewswire.com/Resource/Download/74609d89-5437-4826-b7b8-31238ea2e65c',
       publishedAt: '2024-07-11T16:30:00Z',
       content: 'Austin, TX, USA, July 11, 2024 (GLOBE NEWSWIRE) -- Custom Market Insights has published a new research report titled Automotive Electronics and Software Market Size, Trends and Insights By Component ... [+28228 chars]'
     },
     {
       source: [Object],
       author: 'AstuteAnalytica India Pvt. Ltd.',
       title: 'Plastic Recycling Machine Market Set to Surpass Valuation of USD 5,342.2 Million by 2032 | Astute Analytica',       
       description: 'The plastic recycling machine market is experiencing strong growth due to rising environmental awareness, supportive government policies, and technological innovations. With increasing demand for sustainable solutions and efficient recycling processes, the ma...',
       url: 'https://www.globenewswire.com/news-release/2024/07/02/2907551/0/en/Plastic-Recycling-Machine-Market-Set-to-Surpass-Valuation-of-USD-5-342-2-Million-by-2032-Astute-Analytica.html',
       urlToImage: 'https://ml.globenewswire.com/Resource/Download/a77988df-ad1a-4619-9a4e-367c858dc70e',
       publishedAt: '2024-07-02T14:30:00Z',
       content: 'New Delhi, July 02, 2024 (GLOBE NEWSWIRE) -- The global plastic recycling machine market is projected to reach valuation of US$ 5,342.2 million by 2032 from US$ 3,127.3 million in 2023 at a of 6.13% ... [+16494 chars]'
     },
     {
       source: [Object],
       author: 'Precedence Research',
       title: 'Carboxymethyl Cellulose Market Size Expected to Reach USD 2.40 Billion by 2033',
       description: 'The global carboxymethyl cellulose market size is calculated at USD 1.64 billion in 2024 and is expected to reach around USD 2.40 billion by 2033, growing at a CAGR of 4.36% from 2024 to 2033. The global carboxymethyl cellulose market size is calculated at US...',
       url: 'https://www.globenewswire.com/news-release/2024/07/04/2908771/0/en/Carboxymethyl-Cellulose-Market-Size-Expected-to-Reach-USD-2-40-Billion-by-2033.html',
       urlToImage: 'https://ml.globenewswire.com/Resource/Download/501140d4-82c8-4a65-82a7-8466b5188635',
       publishedAt: '2024-07-04T15:00:00Z',
       content: 'Ottawa, July 04, 2024 (GLOBE NEWSWIRE) -- The global carboxymethyl cellulose market size was estimated at USD 1.57 billion in 2023 and is predicted to surpass around USD 2.40 billion by 2033, Accordi... [+17160 chars]'
     },
     {
       source: [Object],
       author: 'Nurani Parasuraman',
       title: 'Empowering Manufacturing Innovation: How AI & GenAI Centers of Excellence can drive Modernization',
       description: 'Introduction Technologies such as machine learning (ML), artificial intelligence (AI), and Generative AI (GenAI) unlock a new era of efficient and sustainable manufacturing while empowering the workforce. Areas where AI can be applied in manufacturing include...',
       url: 'https://aws.amazon.com/blogs/mt/empowering-manufacturing-innovation-how-ai-genai-centers-of-excellence-can-drive-modernization/',
       urlToImage: 'https://d2908q01vomqb2.cloudfront.net/972a67c48192728a34979d9a35164c1295401b71/2024/07/05/Empowering-Manufacturing-Innovation-How-AI-GenAI-Centers-of-Excellence-can-drive-Modernization.png',
       publishedAt: '2024-07-05T17:38:31Z',
       content: 'Introduction\r\n' +
         'Technologies such as machine learning (ML), artificial intelligence (AI), and Generative AI (GenAI) unlock a new era of efficient and sustainable manufacturing while empowering the work... [+12339 chars]'
     },
     {
       source: [Object],
       author: 'Drew Gorenz, Norbert Schwarz',
       title: 'How funny is ChatGPT? A comparison of human- and A.I.-produced jokes',
       description: 'Can a large language model produce humor? Past research has focused on anecdotal examples of large language models succeeding or failing at producing humor. These examples, while interesting, do not examine ChatGPT’s humor production abilities in ways compara...',
       url: 'https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0305364',
       urlToImage: 'https://journals.plos.org/plosone/article/figure/image?id=10.1371/journal.pone.0305364.g001&size=inline',      
       publishedAt: '2024-07-03T14:00:00Z',
       content: 'Abstract\r\n' +
         'Can a large language model produce humor? Past research has focused on anecdotal examples of large language models succeeding or failing at producing humor. These examples, while interestin... [+42521 chars]'
     },
     {
       source: [Object],
       author: 'Jacklyn Lord',
       title: 'American Association of Respiratory Care and Mary Ann Liebert, Inc. Sign Co-publishing Agreement Facilitated by KGL Consulting',
       description: 'Member News Release submitted by KnowledgeWorks Global Ltd.\n' +
         'The post American Association of Respiratory Care and Mary Ann Liebert, Inc. Sign Co-publishing Agreement Facilitated by KGL Consulting appeared first on SSP Society for Scholarly Publishing.',
       url: 'https://www.sspnet.org/community/news/american-association-of-respiratory-care-and-mary-ann-liebert-inc-sign-co-publishing-agreement-facilitated-by-kgl-consulting/',
       urlToImage: 'http://www.sspnet.org/wp-content/uploads/2022/01/og_1200x630_news-release-member.png',
       publishedAt: '2024-07-10T21:34:00Z',
       content: 'AARC will retain full ownership and editorial control of its flagship journal, and Mary Ann Liebert, Inc. will help broaden its reach to the global medical community.\r\n' +
         'The American Association of Res... [+4741 chars]'
     }
   ]
 }