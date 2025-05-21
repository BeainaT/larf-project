import './App.css'
import BaseCard from './components/BaseCard'
import {useState } from 'react'

function App() {
    const [isSigninView, setIsSigninView] = useState(true);
    const [isResponseCard, setIsResponseCard] = useState<boolean>(false);

    const handleView = (childView : boolean) => {
        setIsSigninView(childView);
    }
    const handleResponse = (res : boolean) => {
        setIsResponseCard(res);
        
    }
    return (
        <>
            <div className={`base-card-wrapper w-full h-[500px] sm:w-[460px] sm:h-[560px] mx-auto relative ${isSigninView && !isResponseCard ? '' : 'transform-pr'}`}>
                <BaseCard toggleWiew={handleView} responseForm={handleResponse}/>
                <div className={`response-card grid content-center text-center w-full h-full bg-zinc-800 border-1 border-white rounded-md -z-10 ${!isSigninView ? 'rotate-y-180' : '-rotate-y-180'} ${isResponseCard ? `rotate-x-360 transition-transform duration-1000 delay-600` : 'rotate-x-270'}`}>
                    <h2 className='text-5xl'>{isSigninView ? 'WELCOME' : 'Thanks for signed up'}</h2>
                </div>
            </div>
            <div className={`animate size-60 md:size-80 rounded-full border-2 ${isSigninView ? 'border-[#7804ec]' : 'border-[#0405ec]'} fixed -top-10 left-1/2 -z-20`}></div>
            <div className={`animate size-60 rounded-full border-2 hidden md:block ${isSigninView ? 'border-[#7804ec]' : 'border-[#0405ec]'} fixed bottom-1/2 left-30 -z-30`}></div>
            <div className={`animate size-60 rounded-full border-2 hidden md:block ${isSigninView ? 'border-[#7804ec]' : 'border-[#0405ec]'} fixed bottom-0 left-1/3 -z-30`}></div>
            <div className={`animate size-60 rounded-full border-2 ${isSigninView ? 'border-[#7804ec]' : 'border-[#0405ec]'} fixed bottom-0 -left-0 md:left-5/6 -z-30`}></div>
        </>
    )
}

export default App
