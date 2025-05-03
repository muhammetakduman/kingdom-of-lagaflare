import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { getCardImage, getRarityStyles, Rarity } from '../utils/cardUtils';

const CardDisplay = ({ nft, selectedCard, onSelect }) => {
    const styles = getRarityStyles(nft.rarity);

    return (
        <Card
            sx={{
                background: styles.bgGradient,
                border: `3px solid ${nft.tokenId === selectedCard ? '#ffd700' : styles.borderColor}`,
                color: styles.textColor,
                overflow: 'hidden',
                maxWidth: 300,
                cursor: 'pointer',
                transition: 'border-color 0.3s',
            }}
            onClick={() => onSelect(nft)}
        >
            <CardContent>
                {getCardImage(nft.name) && (
                    <img
                        src={getCardImage(nft.name)}
                        alt={nft.name}
                        style={{
                            width: '100%',
                            height: 'auto',
                            marginBottom: '1rem',
                        }}
                    />
                )}
                <Typography variant="h5">{nft.name}</Typography>
                <Typography>Rarity: {Rarity[nft.rarity]}</Typography>
                <Typography>Attack: {(nft.attackDamage / 100).toFixed(2)}</Typography>
                <Typography>Card ID: {nft.tokenId}</Typography>
            </CardContent>
        </Card>
    );
};

export default CardDisplay;
