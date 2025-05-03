import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import Confetti from 'react-confetti';

const WinnerModal = ({ open, onClose }) => {
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
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    padding: '2rem',
                    borderRadius: '8px',
                    textAlign: 'center',
                    border: '2px solid #ffd700',
                    maxWidth: '400px',
                    width: '90%',
                }}
            >
                <Confetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                    recycle={false}
                    numberOfPieces={500}
                    gravity={0.2}
                />
                <Typography variant="h4" sx={{ color: '#ffd700', mb: 3 }}>
                    🎉 Congratulations! 🎉
                </Typography>
                <Typography sx={{ color: '#fef3c7', mb: 3 }}>
                    You won the battle! The opponent's card has been added to your collection.
                </Typography>
                <Button
                    onClick={onClose}
                    sx={{
                        backgroundColor: '#7c2d12',
                        color: '#fef3c7',
                        border: '2px solid #ffd700',
                        '&:hover': { backgroundColor: '#92400e' },
                    }}
                >
                    Claim Victory!
                </Button>
            </Box>
        </Modal>
    );
};

export default WinnerModal;
