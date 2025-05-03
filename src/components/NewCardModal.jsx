import React from 'react';
import { Modal, Box, Card, CardContent, Typography, Button } from '@mui/material';
import Confetti from 'react-confetti';
import { motion } from 'framer-motion';
import { getCardImage, getRarityStyles, Rarity } from '../utils/cardUtils';

const NewCardModal = ({
    open,
    onClose,
    newCard,
    isCardRotating,
    showConfetti,
}) => {
    const styles = getRarityStyles(newCard?.rarity);

    return (
        <Modal
            open={open}
            onClose={onClose}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box
                sx={{
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: '2rem',
                    borderRadius: '8px',
                    textAlign: 'center',
                }}
            >
                {showConfetti && (
                    <Confetti
                        width={window.innerWidth}
                        height={window.innerHeight}
                        recycle={false}
                        numberOfPieces={500}
                        gravity={0.2}
                    />
                )}

                <motion.div
                    animate={{
                        rotateY: isCardRotating ? 360 : 0,
                        transition: { duration: 2, ease: 'linear' },
                    }}
                >
                    <Card
                        sx={{
                            width: 300,
                            background: styles.bgGradient,
                            border: `3px solid ${styles.borderColor}`,
                            color: styles.textColor,
                            overflow: 'hidden',
                        }}
                    >
                        <CardContent>
                            {newCard && getCardImage(newCard.name) && (
                                <img
                                    src={getCardImage(newCard.name)}
                                    alt={newCard.name}
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        marginBottom: '1rem',
                                    }}
                                />
                            )}
                            {!isCardRotating && newCard && (
                                <>
                                    <Typography variant="h5">{newCard.name}</Typography>
                                    <Typography>Rarity: {Rarity[newCard.rarity]}</Typography>
                                    <Typography>Attack: {(newCard.attackDamage / 100).toFixed(2)}</Typography>
                                    <Typography>Token ID: {newCard.tokenId}</Typography>
                                </>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>

                {!isCardRotating && (
                    <Button
                        variant="contained"
                        sx={{
                            mt: 2,
                            backgroundColor: '#7c2d12',
                            color: '#fef3c7',
                            border: '2px solid #b45309',
                            '&:hover': { backgroundColor: '#92400e' },
                        }}
                        onClick={onClose}
                    >
                        ADD TO MY DECK !
                    </Button>
                )}
            </Box>
        </Modal>
    );
};

export default NewCardModal;
