import React from 'react'
import NavBar from '../components/NavBar';
import Header from '../components/Header';
import VideoSection from '../components/VideoSection';
import Footer from '../footer';
import { SharePlay } from '../components/SharePlay';
import { PourquoiLe10 } from '../components/PourquoiLe10';
import Stats from '../components/Stats';
import Image from 'next/image';
import bottomImage from '../../assets/bottom-image.png'; // Import the bottom image
import bottomImage2 from '../../assets/bottom-image2.png'; // Import the bottom image
import PourquoiCollaborer from '../components/PourquoiCollaborer';
import Comment_travailler_ensemble from '../components/Comment _travailler_ensemble';
import Startfreetrail from '../components/Startfreetrail';



export default function AboutPage() {

  return (
    <>
      <div className=" min-h-screen text-white">
        <NavBar />
        <Header />
        <VideoSection />
        <div className="w-full mt-[-280px] ">
          <Image
            src={bottomImage}
            alt="Line"
            width={1920}
            height={112}
            className="w-full block mx-auto"
          />
        </div>
        <SharePlay />
        <div
          className="  relative lg:block w-full overflow-hidden"
          style={{
            backgroundImage: `url(${bottomImage2.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            width: '100%',
            minHeight: '80vh',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <PourquoiLe10 />
          <Stats />
        </div>
        <PourquoiCollaborer />
        <Comment_travailler_ensemble />
        <div className="px-24">
          <Startfreetrail />
        </div>
        <Footer />

      </div>
    </>);
}

