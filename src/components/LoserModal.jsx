import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const LoserModal = ({ open, onClose }) => {
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
                    border: '2px solid #991b1b',
                    maxWidth: '400px',
                    width: '90%',
                }}
            >
                <Typography variant="h4" sx={{ color: '#991b1b', mb: 3 }}>
                    💔 Defeat! 💔
                </Typography>
                <Typography sx={{ color: '#fef3c7', mb: 3 }}>
                    You lost the battle! Your card has been claimed by the victor.
                </Typography>
                <Button
                    onClick={onClose}
                    sx={{
                        backgroundColor: '#7c2d12',
                        color: '#fef3c7',
                        border: '2px solid #991b1b',
                        '&:hover': { backgroundColor: '#92400e' },
                    }}
                >
                    Accept Defeat
                </Button>
            </Box>
        </Modal>
    );
};

export default LoserModal;
