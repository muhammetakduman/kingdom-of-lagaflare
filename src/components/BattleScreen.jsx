import React from 'react';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';
import { getCardImage, getRarityStyles, Rarity } from '../utils/cardUtils';

const BattleScreen = ({ playerCard, opponentCard, winner, userAddress, onClose }) => {
    const { width, height } = useWindowSize();

    const isWinner = winner === userAddress.toLowerCase();

    const renderCard = (card, label, isHighlighted) => {
        const styles = getRarityStyles(card.rarity);
        return (
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <Card
                    sx={{
                        width: 300,
                        background: styles.bgGradient,
                        border: `4px solid ${isHighlighted ? '#ffd700' : styles.borderColor}`,
                        color: styles.textColor,
                        boxShadow: isHighlighted ? '0 0 20px 5px gold' : 'none',
                        mx: 2,
                        transform: isHighlighted ? 'scale(1.1)' : 'scale(1.0)',
                    }}
                >
                    <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" gutterBottom>{label}</Typography>
                        <img
                            src={getCardImage(card.name)}
                            alt={card.name}
                            style={{ width: '100%', marginBottom: '1rem' }}
                        />
                        <Typography variant="h5">{card.name}</Typography>
                        <Typography>Rarity: {Rarity[card.rarity]}</Typography>
                        <Typography>Attack: {(card.attackDamage / 100).toFixed(2)}</Typography>
                        <Typography>Token ID: {card.tokenId}</Typography>
                    </CardContent>
                </Card>
            </motion.div>
        );
    };

    return (
        <Box
            sx={{
                position: 'fixed',
                inset: 0,
                backgroundColor: '#111827',
                zIndex: 1300,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 4,
            }}
        >
            {isWinner && <Confetti width={width} height={height} numberOfPieces={300} />}
            <Typography variant="h4" sx={{ color: '#fef3c7', mb: 4 }}>
                {isWinner ? '🏆 You Won the Battle!' : '💀 You Lost the Battle'}
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                {renderCard(playerCard, 'Your Card', isWinner)}
                {renderCard(opponentCard, 'Opponent Card', !isWinner)}
            </Box>

            <Button
                onClick={onClose}
                sx={{
                    backgroundColor: '#7c2d12',
                    color: '#fef3c7',
                    border: '2px solid #b45309',
                    '&:hover': { backgroundColor: '#92400e' },
                    px: 4,
                    py: 1.5,
                    fontWeight: 'bold',
                }}
            >
                Close
            </Button>
        </Box>
    );
};

export default BattleScreen;
