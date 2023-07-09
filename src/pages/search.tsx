'use client'

{/* search.tsx */}

import { useState, useEffect } from 'react';
import { Switch, Image, Text, ActionIcon, ThemeIcon, Button, SegmentedControl, Center, Box } from '@mantine/core';
import { IconSend, IconTrash, IconUser, IconTrendingUp, IconChevronRight, IconSun, IconMoonStars } from '@tabler/icons-react';
import { ExperimentOutlined } from '@ant-design/icons';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import axios from 'axios';
import Papa from 'papaparse';
// import { Sparkle } from "utils/Sparkle";


export const Search = ({ setConversation, setIsInitialInputGiven }) => {
  const [items, setItems] = useState([]);
  const [initialText, setInitialText] = useState("");
  const [language, setLanguage] = useState('English');


  const handleInitialSubmit = async (text) => {
    setConversation([{ message: text, speaker: "user" }]);
    setIsInitialInputGiven(true);
    
    try { 
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: text }),
      });
 
      await response.json();
    } catch (error) {
      console.error("Error submitting initial message:", error);
    }
  };
 
  useEffect(() => {
    const fetchData = async () => {
      let url;
      if (language === 'Cymraeg') {
        url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSqKi1YOqksJOO3U07eGgNKU2P62-QjGmY4wzwI6vnUp8sjtU1CvnHcYu3PD_BVDfIjZUCuouNjsd9L/pub?output=csv';
      } else {
        url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRYnQg-krksesMIkfe-VcoJMS3C92t99MgvjklMkz_5VRLMHaRfNPzXcjwUg3hL7-4E77C-8V1-8HM-/pub?output=csv';
      }
      const response = await axios.get(url);
      const results = Papa.parse(response.data, { header: true, dynamicTyping: true });
      setItems(results.data);
    };
  
    fetchData();
  }, [language]); 
  


  const handleOnSearch = (string, results) => {
    console.log(string, results)
  }


  const handleOnHover = (result) => {
    console.log(result)
  }

  const handleOnSelect = (item) => {
    setInitialText(item.name);
 }
 
 const clickButton = (buttonText) => {
  setInitialText(buttonText);
  handleInitialSubmit(buttonText);
}



  const handleOnClick = (e) => {
    e.preventDefault();
  }

  const handleOnFocus = () => {
    console.log('Focused')
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleInitialSubmit();
 }
 

  const formatResult = (item) => {
    if (item && item.name) {
      return (
        <>
          <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
        </>
      );
    }
    return null;
  }
  
  return (
    
    <div id="homepage" className="flex flex-col h-screen items-center justify-between">
      <div className="flex flex-col items-center justify-center flex-grow">
      

      {
  language === 'Cymraeg' 
  ?
  <Image className="pb-6" height={50}  fit="contain" src="https://i.postimg.cc/bJhZ6j53/Frame-4.png" />
  :
  <Image className="pb-6" height={50}  fit="contain" src="https://i.postimg.cc/xTngTWcK/Group-7.png" />
}
     
        <div className="flex mb-2 px-28 w-full"> {/* Reduced margin-bottom to mb-2 */}
          <form id="searchbar" className="relative flex-grow  pr-3" onSubmit={handleFormSubmit}>
          <ReactSearchAutocomplete
            className="autocomplete-dropdown"
            items={items}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
            formatResult={formatResult}
            maxResults={7}
            placeholder={language === 'Cymraeg' ? 'Gofyn cwestiwn...' : 'Ask a question...'}
            showNoResults={false}
            showIcon={false}
            value={initialText} // add this line
            onChange={(e) => {
              setInitialText(e.target.value);
            }}
            styling={{ borderRadius: "5px", fontSize: "14px", height: "38px" }}
          />

          </form>
          
          <ActionIcon id="sendbutton" className="border border-gray-300 rounded h-10 w-10" onClick={handleFormSubmit}> 
            <IconSend size="1.125rem"/>
          </ActionIcon>
        </div>

        <div id="prompts" className="w-full flex gap-3 mb-2 pt-2 px-40 items-center justify-center gap-3"> {/* Reduced margin-bottom to mb-2, reduced padding to pt-2 and px-40 */}
          <IconTrendingUp size="1.125rem" style={{ color: '#697075' }} />
          <Button
            variant="outline"
            colorScheme="gray"
            radius="xl"
            compact
            style={{ borderColor: '#D8DBDF', color: '#697075', fontWeight: 'normal' }}
            onClick={() => clickButton(language === 'Cymraeg' ? 'Sut alla i gael cymorth costau byw?' : 'How can I get cost of living support?')}
          >
            {language === 'Cymraeg' ? 'Costau byw' : 'Cost of living'} 
          </Button>

          <Button
            variant="outline"
            colorScheme="gray"
            radius="xl"
            compact
            style={{ borderColor: '#D8DBDF', color: '#697075', fontWeight: 'normal' }}
            onClick={() => clickButton(language === 'Cymraeg' ? 'Pa help alla i ei gael gyda fy miliau ynni?' : 'What help can I get with my energy bills?')}
          >
            {language === 'Cymraeg' ? 'Biliau ynni' : 'Energy bills'}
          </Button>

          <Button
            variant="outline"
            colorScheme="gray"
            radius="xl"
            compact
            style={{ borderColor: '#D8DBDF', color: '#697075', fontWeight: 'normal' }}
            onClick={() => clickButton(language === 'Cymraeg' ? 'Sut mae cyflwyno hunanasesiad treth?' : 'How do I submit a tax self assessment?')}
          >
            {language === 'Cymraeg' ? 'Hunanasesiad treth' : 'Tax self assessment'}
          </Button>

          <Button
            variant="outline"
            colorScheme="gray"
            radius="xl"
            compact
            style={{ borderColor: '#D8DBDF', color: '#697075', fontWeight: 'normal' }}
            onClick={() => clickButton(language === 'Cymraeg' ? 'Sut mae gwneud cais am basbort?' : 'How do I apply for a passport?')}
          >
            {language === 'Cymraeg' ? 'Pasbort' : 'Passport'} 
          </Button>

        </div>
        
        <div id="language" className="w-full flex gap-3 pt-3 px-40 items-center justify-center gap-3"> {/* Reduced margin-bottom to mb-2, reduced padding to pt-2 and px-40 */}
        <SegmentedControl
      data={[
        {
          value: 'English',
          label: (
            <Center>
              <Text>🇬🇧</Text>
              <Box ml={6} sx={{ fontSize: '0.75rem' }}>English</Box>
            </Center>
          ),
        },
        {
          value: 'Cymraeg',
          label: (
            <Center>
              <Text >🏴󠁧󠁢󠁷󠁬󠁳󠁿</Text>
              <Box ml={6} sx={{ fontSize: '0.75rem' }}>Cymraeg</Box>
            </Center>
          ),
        },
      ]}
      onChange={setLanguage} 
    />

        </div>

      </div>

      <div id="bottom" className="w-full h-12 flex items-center justify-center gap-3">
      <Text fz="xs" style={{ color: '#697075' }}>{language === 'Cymraeg' ? 'Mae GOVGPT yn arbrawf' : 'GOVGPT is an experiment'}</Text>
        <ExperimentOutlined size="0.8rem" style={{ color: '#697075' }} />
        <p style={{ fontSize: '11px', color: '#697075' }}>|</p>
        <Text fz="xs" style={{ color: '#697075' }}>
        {language === 'Cymraeg' ? 'Cynnwys a gyhoeddwyd o dan y' : 'Content published under the'}{' '}
          <a href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/" style={{ textDecoration: 'underline' }}>
            Open Government Licence v3.0
          </a>
          .
        </Text>
        <p style={{ fontSize: '11px', color: '#697075' }}>|</p>
        <Text fz="xs" style={{ color: '#697075' }}>
        {language === 'Cymraeg' ? 'Adeiladwyd gyda ❤ yn ôl' : 'Built with ❤ by'}  <a href="https://www.general-purpose.io" style={{ textDecoration: 'underline' }}>General Purpose</a> 
        </Text>
      </div>
    </div>
  );
}