import Image from 'next/image'
import Head from 'next/head';
import Chatbot from '../components/chatbot';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Chatbot Example</title>
        <meta name="description" content="Chatbot example using Next.js and Tailwind CSS" />
      </Head>
      <main>
      
        <Chatbot />
      </main>
    </div>
  )
}
