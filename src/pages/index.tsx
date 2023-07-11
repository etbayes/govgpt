"use client";

{/* index file */}

import { useEffect, useState } from "react";
import { supabaseBrowserClient } from "utils/supabaseBrowser";
import { Auth } from "@supabase/auth-ui-react";
import {
  ThemeSupa,
} from "@supabase/auth-ui-shared";
import { Image, Text, ActionIcon, ThemeIcon, Button } from '@mantine/core';
import { IconSend, IconTrash, IconUser, IconTrendingUp, IconChevronRight, IconLogout, IconThumbUp, IconThumbDown, IconThumbDownFilled, IconThumbUpFilled } from '@tabler/icons-react';
import Search from './search';

type ConversationEntry = {
  message: string;
  speaker: "bot" | "user";
  url?: string;
  id?: string;
};

const updateChatbotMessage = (
  conversation: ConversationEntry[],
  message: { interactionId: string; token: string; event: "responseEnd" | "response", url?: string}
) => { 
  
  const interactionId = message.interactionId;

  const updatedConversation = conversation.reduce(
    (acc: ConversationEntry[], e: ConversationEntry) => [
      ...acc,
      e.id === interactionId ? { ...e, message: e.message + message.token, url: message.url ? message.url : e.url } : e,
    ],
    []
  );
  
  const updatedMessage: ConversationEntry = {
    id: interactionId,
    message: message.token,
    speaker: "bot",
    url: message.url ? message.url.replace("www.www.", "www.") : undefined,
  };
  

  return conversation.some((e) => e.id === interactionId)
    ? updatedConversation
    : [
        ...updatedConversation,
        updatedMessage
      ];
};



export default function Home() {
  const [text, setText] = useState("");
  const [conversation, setConversation] = useState<ConversationEntry[]>([]);
  const [botIsTyping, setBotIsTyping] = useState(false);
  const [statusMessage, setStatusMessage] = useState("Waiting for query...");
  const [userId, setUserId] = useState<string | undefined>();
  const [linkUrl, setLinkUrl] = useState("");
  const [isInitialInputGiven, setIsInitialInputGiven] = useState(true);
  const [votes, setVotes] = useState<Record<number, 'up' | 'down' | undefined>>({});
  
  const handleVote = (index: number, type: 'up' | 'down') => {
    setVotes(prevVotes => {
      if(prevVotes[index] === type){
        // If the current vote is the same as the clicked vote, remove the vote
        const newVotes = { ...prevVotes };
        delete newVotes[index];
        return newVotes;
      }else{
        // If the current vote is different than the clicked vote, change the vote
        return { ...prevVotes, [index]: type };
      }
    });
  };


  const signOut = async () => {
    const { error } = await supabaseBrowserClient.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
    }
  };

  function BotTyping() {
    return (
      botIsTyping ?
        <div className="flex flex-row whitespace-pre-wrap py-3 items-start pl-3" style={{ backgroundColor: '#F3F2F1' }}>
          <ThemeIcon size="md" variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }} className='shadow-md'>
            <Image maw={20} mx="auto" fit="contain" src="https://i.postimg.cc/MGvN9TNY/Vector-1.png" />
          </ThemeIcon>
          <div className="ml-3 flex flex-row" style={{ paddingTop: '3px' }}>
          <Image src="https://thumbs.gfycat.com/GrippingReflectingBasenji-max-1mb.gif" width={30} />
          </div>
        </div>
        : null
    );
  }
  

  useEffect(() => {
    supabaseBrowserClient.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        supabaseBrowserClient.auth.onAuthStateChange((_e, newSession) =>
          setUserId(newSession?.user.id)
        );
      } else {
        setUserId(session?.user.id);
      }
    });
  }, []);

  if (!isInitialInputGiven) {
    return <Search setConversation={setConversation} setIsInitialInputGiven={setIsInitialInputGiven} />;
  }
  

  if (!userId)
    return (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
       
      <Auth
        supabaseClient={supabaseBrowserClient}
        appearance={{ theme: ThemeSupa }}
        providers={[]}
      />
      </div>
    );

  const channel = supabaseBrowserClient.channel(userId);

  channel
  .on("broadcast", { event: "chat" }, ({ payload }) => {
    switch (payload.event) {
      case "responseEnd":
        setBotIsTyping(false);
        setConversation((currentConversation) =>
          updateChatbotMessage(currentConversation, payload)
        );
        // Add URLs to the conversation
        const urlEntry: ConversationEntry = {
          message: "",
          url: payload.urls && payload.urls[0] ? payload.urls[0].replace("www.www.", "www.") : undefined,
          speaker: 'bot'
        };
        setConversation((state) => [...state, urlEntry]);
        if (payload.urls && payload.urls[0]) {
          setLinkUrl(payload.urls[0].replace("www.www.", "www."));
        }
        
        break;
      
      case "status":
        setStatusMessage(payload.message);
        break;

      default:
        break;
    }
  })
  .subscribe();

  const clearMessages = async () => {
    setConversation([]);
    
    // Delete the conversation from Supabase for the current user
    try {
      await supabaseBrowserClient
        .from('conversations')
        .delete()
        .eq('user_id', userId);
    } catch (error) {
      console.error('Error deleting conversation:', error);
    }
  };


  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
     setConversation((state) => [
       ...state,
       {
         message: text,
         speaker: "user",
       },
     ]);
      try {
       setBotIsTyping(true);
       const response = await fetch("/api/chat", {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({ prompt: text }),
       });
        const data = await response.json();
        if (data.generations && data.generations[0] && data.generations[0][0]) {
          setConversation((currentConversation) => updateChatbotMessage(currentConversation, {interactionId: data.interactionId, token: data.generations[0][0].text, event: "responseEnd"}));
        }
         else {
          throw new Error("Unexpected data structure.");
        }
      } catch (error) {
       console.error("Error submitting message:", error);
     }
     setText("");
   };
  
  
  const handleButtonClick = async (text: string) => {
    setConversation([
      { message: text, speaker: 'user' }
    ]);
  
    try {
      setBotIsTyping(true);
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: text }),
      });
  
      const data = await response.json();
  
    } catch (error) {
      console.error("Error submitting message:", error);
    }
  };
  

  const showPrompts = conversation.length === 0;

  const renderMessageContent = (content: string) => {
    if (content.includes('http://') || content.includes('https://')) {
      const parts = content.split(/\b(https?:\/\/\S+)\b/);
      return parts.map((part, index) => {
        if (part.startsWith('http://') || part.startsWith('https://')) {
          return (
            <a
              key={index}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'underline' }}
            >
              {part}
            </a>
          );
        }
  
        return part;
      });
    }
  
    return content;
  };

  return (
    
    <div id="chatbotpage" className="flex flex-col h-screen">
      <div id="top" className="h-12 bg-black px-60 pt-2 flex justify-between items-center">
        <Image width={190} height={30} fit="contain" src="/logo.svg" />
        {/* <ActionIcon onClick={signOut} className="border border-gray-300 rounded h-10 w-10">
           <IconLogout size="1.125rem" /> 
        </ActionIcon> */}
      </div>

      <div id="paddingtop" className='px-60 pb-3'>
        <div className="gradient w-full h-3">
          
        </div>
      </div>

      <div id="chat" className="flex flex-col px-60 overflow-y-auto flex-grow">
        <div id="response" className="flex-grow">


        {conversation.length > 0
          ? conversation.map((entry, index) => (
            <div
              id="speechbubble"
              key={index}
              className={`flex flex-row whitespace-pre-wrap ${
                  entry.url ? '' : 'py-3'
              } items-start pl-3`}
              style={{
                  backgroundColor: entry.speaker !== 'user' ? '#F3F2F1' : '',
              }}
            >
              {entry.speaker === 'user' && !entry.url
                ? <ThemeIcon size="md" variant="gradient" gradient={{ from: 'orange', to: 'red' }} className='shadow-md'>
                    <IconUser size="1rem" />
                  </ThemeIcon>
                : !entry.url ? <ThemeIcon size="md" variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }} className='shadow-md'>
                    <Image maw={20} mx="auto" fit="contain" src="https://i.postimg.cc/MGvN9TNY/Vector-1.png" />
                  </ThemeIcon> : null}
              <div id="chatbotmessage" className="ml-3 flex flex-row" style={{ fontSize: '14px', paddingTop: '3px' }}>
                <Text id="chatmessage" fz="sm" style={{ color: '#697075' }}>{entry.message}</Text>
                {entry.url && entry.message !== "I don't know" && entry.message !== "Can you ask another question" && (
                  <div id="rlhf" className="flex justify-between w-full">
                  <Button 
                    id="urlbutton"
                    rightIcon={<IconChevronRight />}
                    onClick={() => { 
                      window.open(linkUrl, "_blank");  
                    }}
                    variant="outline" 
                    style={{ color: '#697075' }}
                    className='border border-gray-300 bg-white hover:bg-gray-300 ml-6 mb-3'
                  > 
                    Learn more 
                  </Button>
                      <div className="flex">
                      <ActionIcon 
                    variant="subtle"
                    onClick={() => handleVote(index, 'up')}
                  >
                    {votes[index] === 'up' ? <IconThumbUpFilled size="1.125rem" /> : <IconThumbUp size="1.125rem" />}
                  </ActionIcon>
                  <ActionIcon 
                    variant="subtle"
                    onClick={() => handleVote(index, 'down')}
                  >
                    {votes[index] === 'down' ? <IconThumbDownFilled size="1.125rem" /> : <IconThumbDown size="1.125rem" />}
                  </ActionIcon>
                  
                      </div>
                      </div>
                )}
      </div>
    </div>
  ))
: null}
<BotTyping />

            </div>
            </div>


          <div className="flex flex-col items-stretch">
          {showPrompts && (
          <div id="prompts" className='w-full flex gap-3 pt-3 px-60 items-center justify-center gap-3'>
            <IconTrendingUp size="1.125rem" style={{ color: '#697075' }}/>
            <Button
              variant="outline"
              color="gray"
              radius="xl"
              compact
              style={{
                borderColor: '#D8DBDF',
                color: '#697075',
                fontWeight: 'normal',
              }}
              onClick={() => handleButtonClick('How do I login to universal credit?')}
            >
              How do I login to universal credit?
            </Button>
            <Button
              variant="outline"
              color="gray"
              radius="xl"
              compact
              style={{
                borderColor: '#D8DBDF',
                color: '#697075',
                fontWeight: 'normal',
              }}
              onClick={() => handleButtonClick('How do I get help with my energy bills?')}
            >
              How do I get help with my energy bills?
            </Button>
            <Button
              variant="outline"
              color="gray"
              radius="xl"
              compact
              style={{
                borderColor: '#D8DBDF',
                color: '#697075',
                fontWeight: 'normal',
              }}
              onClick={() => handleButtonClick('How do I apply for a passport?')}
            >
              How do I apply for a passport?
            </Button>
          </div>
        )}
          <div id="searchbardiv" className="flex gap-3 mb-4 px-60 pt-3">
            <form id="searchbar" onSubmit={(e) => submit(e)} className="relative flex-grow">

              <input
                className="search-text w-full pr-10 border border-gray-300 rounded focus:shadow-lg"
                placeholder="Say something..."
                onChange={(e) => {
                  setText(e.target.value);
                }}
                value={text}
                style={{ fontSize: '14px', padding: '9px' }}
              />

              <ActionIcon 
                variant="transparent"
                type="submit" 
                className="absolute inset-y-0 right-0 pr-3 flex items-center border border-transparent rounded h-10 w-10">
                <IconSend size="1.125rem" />
              </ActionIcon>
            </form>
            <ActionIcon onClick={clearMessages} className="border border-gray-300 rounded h-10 w-10">
              <IconTrash size="1.125rem"/>
            </ActionIcon>
          </div>
          <div id="bottom" 
            className="w-full h-12 flex items-center justify-center gap-3" 
            style={{ backgroundColor: '#F3F2F1', borderTop: '1px solid #B1B4B6' }}
          >
            <Text fz="xs" style={{ color: '#697075' }}>Information correct as of June 2023.</Text>
            <Text fz="xs" style={{ color: '#697075' }}>|</Text>
            <Text fz="xs" style={{ color: '#697075' }}>Built with ❤ by <a href="https://www.general-purpose.io" style={{ textDecoration: 'underline' }}>General Purpose</a> </Text>
            <Text fz="xs" style={{ color: '#697075' }}>|</Text>
            <Text fz="xs" style={{ color: '#697075' }}>
              May produce inaccurate information.
            </Text>
          </div>
        </div>
      </div>
  );
}


