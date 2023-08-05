"use client"
import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Head from 'next/head';


const Chatbot = () => {
    const [messages, setMessages] = useState([
        {
          role: "system",
          content: "You are a chatbot that is helpful and replies concisely",
        },
      ]); 
      const [newMessageText, setNewMessageText] = useState("");
      const [loadingStatus, setLoadingStatus] = useState(false);
    
      const onChange = (event) => {
        setNewMessageText(event.target.value);
      };
    
      const onClick = () => {
        setMessages([
          {
            role: "system",
            content: "You are a chatbot that is helpful and replies concisely",
          },
        ]);
        setNewMessageText("");
      };
    
      const onSubmit = async (event) => {
        event.preventDefault();
        setMessages([...messages, { role: "user", content: newMessageText }]);
        setLoadingStatus(true);
        setNewMessageText("");
      };
    
      const onKeyDown = (event) => {
        if (event.keyCode == 13 && event.shiftKey == false) {
          onSubmit(event);
        }
      };
    
      useEffect(() => {
        const fetchReply = async () => {
          try {
            const response = await fetch("/api/chat", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ messages }),
            });
    
            const responseBody = await response.json();
            const reply =
              response.status === 200
                ? responseBody.reply
                : responseBody.error.reply;
    
            setMessages([...messages, reply]);
          } catch {
            const reply = {
              role: "assistant",
              content: "An error has occured.",
            };
    
            setMessages([...messages, reply]);
          }
          setLoadingStatus(false);
        };
    
        
        if (loadingStatus === true) {
          fetchReply();
        }
      }, [loadingStatus]);
    
    
      const textareaRef = useRef(null);
      const backgroundRef = useRef(null);
      const whitespaceRef = useRef(null);
    
      useEffect(() => {
        
        textareaRef.current.style.height = "0px";
    
        const MAX_HEIGHT = 320;
        const HEIGHT_BUFFER = 4;
        const VERTICAL_SPACING = 20;
    
        const textareaContentHeight = textareaRef.current.scrollHeight + HEIGHT_BUFFER;
    
        const textareaHeight = Math.min(textareaContentHeight, MAX_HEIGHT);
    
        textareaRef.current.style.height = textareaHeight + "px";
        backgroundRef.current.style.height =
          textareaHeight + 2 * VERTICAL_SPACING + "px";
        whitespaceRef.current.style.height =
          textareaHeight + 2 * VERTICAL_SPACING + "px";
      }, [newMessageText]);
    
      return (
        <>
          <Head>
            <title>HEXA Chatbot</title>
            <meta
              name="description"
              content={
                "GPT Chatbot: A simple ChatGPT-powered chatbot" +
                " built with Next.js and Tailwind CSS"
              }
            />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>
    
          <main className="mx-auto h-screen max-w-full sm:max-w-3xl">
            <div className="py-8 flex flex-row justify-center">
            <img src='Blockchain_Network_Logo_3.png' className='lg:w-16 lg:h-16 w-12 h-12'></img>

              <h1 className="text-center lg:text-6xl text-4xl font-bold text-[#008080]">
                HEXA Chatbot
              </h1>
            </div>
    
            {messages.length === 1 && (
              <div className="mx-10 mt-10 flex justify-center">
                <div>
                  <p className="mb-2 font-bold text-white">
                    HEXA Chatbot is a basic chatbot built with the OpenAI API,
                    Next.js and Tailwind CSS
                  </p>
                  <p className="mb-32 text-white">
                    To start a conversation, type a message below and hit send
                  </p>
                </div>
              </div>
            )}
    
           

    <div>
  {messages.slice(1).map((message, index) => (
    <div
      className={`my-4 mx-2 ${
        message.role === "assistant" ? "my-4 p-2 justify-start" : "my-4 p-2 justify-end"
      }`}
      key={index.toString()}
    >
      <div
        className={`flex items-start ${
          message.role === "assistant" ? "justify-start" : "justify-end"
        }`}
      >
      
        {message.role === "assistant" && (
          <img
            src="BlockChain_Network_Logo_3.png"
            alt="Bot"
            className="w-10 h-10 rounded-full mr-2"
          />
        )}

      
        <div
          className={`w-5/12 rounded-3xl p-3 ${
            message.role === "assistant" ? "bg-[#008080] text-white" : "bg-[#008080] text-white"
          } `}
        >
          <p className="font-bold">{message.role === "assistant" ? "HEXA Chatbot" : "You"}</p>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
        </div>

      
        {message.role === "user" && (
          <img
            src="icons8-user-30.png"
            alt="User"
            className="w-10 h-10 rounded-full ml-2"
          />
        )}
      </div>
    </div>
  ))}
</div>




    
            {loadingStatus && (
              <div className="mx-2 mt-4 float-right">
                <p className="font-bold">Chatbot is replying...</p>
              </div>
            )}
    
         
            <div ref={whitespaceRef} className="z-0"></div>
            <div
              ref={backgroundRef}
              className="fixed bottom-0 z-10 w-full max-w-full
                         sm:max-w-3xl"
            ></div>
    
            <div
              className="fixed bottom-5 z-20 w-full max-w-full 
                         sm:max-w-3xl"
            >
              <form className="mx-2 flex items-end" onSubmit={onSubmit}>
                <textarea
                  ref={textareaRef}
                  className="mr-2 grow resize-none rounded-md border-2 
                        p-2 bg-[#008080] text-white
                             focus:outline-none"
                  value={newMessageText}
                  onChange={onChange}
                  onKeyDown={onKeyDown}
                  placeholder="Type Anything"
                />
    
                {loadingStatus ? (
                  <button
                    className="h-11 rounded-md border-2 border-blue-400
                             bg-blue-400 px-1 py-1"
                    disabled
                  >
                    <p className="font-bold text-white">Send</p>
                  </button>
                ) : (
                  <button
                   
                    type="submit"
                  >
                    <img src='icons8-send-24.png' className='w-12 h-12'></img>
                  </button>
                )}
              </form>
            </div>
          </main>
        </>
      );
};

export default Chatbot;
