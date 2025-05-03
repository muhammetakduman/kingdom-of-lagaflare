import Dragonblade from '../assets/Cards/Dragonblade.png';
import Frostguard from '../assets/Cards/Frostguard.png';
import Shadowstrike from '../assets/Cards/Shadowstrike.png';
import Soulreaver from '../assets/Cards/Soulreaver.png';
import Thunderclaw from '../assets/Cards/Thunderclaw.png';

export const Rarity = ['Common', 'Rare', 'Epic', 'Legendary'];

export const getCardImage = (name) => {
    switch (name) {
        case 'Dragonblade':
            return Dragonblade;
        case 'Frostguard':
            return Frostguard;
        case 'Shadowstrike':
            return Shadowstrike;
        case 'Soulreaver':
            return Soulreaver;
        case 'Thunderclaw':
            return Thunderclaw;
        default:
            return null;
    }
};

export const getRarityStyles = (rarity) => {
    switch (rarity) {
        case 0:
            return {
                borderColor: '#44403c',
                bgGradient: 'linear-gradient(to bottom, #57534e, #292524)',
                textColor: '#e7e5e4',
                accentColor: '#57534e',
            };
        case 1:
            return {
                borderColor: '#312e81',
                bgGradient: 'linear-gradient(to bottom, #3730a3, #1e1b4b)',
                textColor: '#e0e7ff',
                accentColor: '#3730a3',
            };
        case 2:
            return {
                borderColor: '#6b21a8',
                bgGradient: 'linear-gradient(to bottom, #7e22ce, #4c1d95)',
                textColor: '#f3e8ff',
                accentColor: '#7e22ce',
            };
        case 3:
            return {
                borderColor: '#854d0e',
                bgGradient: 'linear-gradient(to bottom, #a16207, #451a03)',
                textColor: '#fef3c7',
                accentColor: '#b45309',
            };
        default:
            return {
                borderColor: '#000',
                bgGradient: 'linear-gradient(to bottom, #333, #111)',
                textColor: '#fff',
                accentColor: '#333',
            };
    }
};
