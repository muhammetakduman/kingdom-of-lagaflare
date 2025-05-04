import React, { useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { getCardImage, getRarityStyles, Rarity } from '../utils/cardUtils';

const CardDisplay = ({ nft, selectedCard, onSelect }) => {
    const styles = getRarityStyles(nft.rarity);
    const [flipped, setFlipped] = useState(false);

    return (
        <div
            onClick={() => onSelect(nft)}
            onMouseEnter={() => setFlipped(true)}
            onMouseLeave={() => setFlipped(false)}
            style={{
                perspective: 1000,
                width: 300,
                height: 400,
                cursor: 'pointer',
            }}
        >
            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    transition: 'transform 0.6s',
                    transformStyle: 'preserve-3d',
                    transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
            >
                {/* Front Side */}
                <Card
                    sx={{
                        background: styles.bgGradient,
                        border: `6px solid ${nft.tokenId === selectedCard ? '#ffd700' : styles.borderColor}`,
                        color: styles.textColor,
                        overflow: 'hidden',
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        backfaceVisibility: 'hidden',
                    }}
                >
                    <CardContent>
                        {getCardImage(nft.name) && (
                            <img
                                src={getCardImage(nft.name)}
                                alt={nft.name}
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    marginBottom: '0.5rem',
                                }}
                            />
                        )}
                        <Typography variant="h5">{nft.name}</Typography>
                        <Typography>Rarity: {Rarity[nft.rarity]}</Typography>
                        <Typography>Attack: {(nft.attackDamage / 100).toFixed(2)}</Typography>
                        <Typography >Card ID: {nft.tokenId}</Typography>
                    </CardContent>
                </Card>

                <Card
                    sx={{
                        backgroundColor: '#222',
                        color: '#fff',
                        padding: 2,
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        border: `3px solid ${nft.tokenId === selectedCard ? '#ffd700' : styles.borderColor}`, // <-- BU SATIR
                    }}
                >
                    <CardContent>
                        <Typography variant="h6">{nft.name}</Typography>
                        <Typography variant="body2" mt={2}>
                            {nft.description || 'Bu karakter gizemli güçlere sahip ve savaşta çok etkilidir.'}
                        </Typography>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
};

export default CardDisplay;
