
import { useEffect, useState } from 'react';

import './styles/main.css';
import logoImg from './assets/Logo.png';

import * as Dialog from '@radix-ui/react-dialog';

import { GamerBanner } from './componets/GamerBanner';
import { AdBanner } from './componets/AdBanner';
import { AdModal } from './componets/AdModal';
import axios from 'axios';


interface Game {
    id: string;
    title: string;
    bannerUrl: string;
    _count: {
        ads: number;
    }
}


function App() {

    const [game, setGame] = useState<Game[]>([])

    useEffect(() => {
        axios('http://localhost:3000/games')
            //.then(response => response.json()) fecht -> axios
            .then(response => {
                setGame(response.data)
            })
    }, [])

    return (
        <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">

            {/* Img Logo */}
            <img src={logoImg} alt="" />

            {/* Logo */}
            <h1 className='text-6xl text-white font-black mt-20'>
                Seu
                <span className='text-transparent bg-nlw-gradient bg-clip-text'> duo </span>
                está aqui
            </h1>

            <div className='grid grid-cols-6 gap-6 mt-16'>
                {game.map(game => {
                    return (
                        /* Banner Games */
                        <GamerBanner
                            key={game.id}
                            bannerUrl={game.bannerUrl}
                            title={game.title}
                            adsCount={game._count.ads} />
                    )
                })}


            </div>

            <Dialog.Root>
                {/* Create Ad Banner */}
                <AdBanner />

                {/* Create Ad Modal */}
                <AdModal />
            </Dialog.Root>
        </div>
    )

}

export default App

/** formas de fazer comentário
 * Desse jeito ou //desse jeito ou
 */
//{/* Desse jeito */} 