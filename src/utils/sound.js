import click from "../assets/music/click.wav"

export const handleClickSound = () => {
        
        const sound = new Audio(click);
        sound.volume = 0.5;
        sound.play();
    };