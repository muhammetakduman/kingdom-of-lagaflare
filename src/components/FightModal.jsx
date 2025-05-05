import React from 'react';
import { Modal, Box, Button, Typography } from '@mui/material';

const FightModal = ({
    open,
    onClose,
    fightAction,
    setFightAction,
    fightId,
    setFightId,
    createdFightId,
    handleCreateFight,
    handleJoinFight,
    copyFightId
}) => {
    const handleClose = () => {
        onClose();
        setFightAction(null);
        setFightId('');
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
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
                    border: '2px solid #b45309',
                    maxWidth: '400px',
                    width: '90%',
                }}
            >
                {createdFightId ? (
                    <>
                        <Typography variant="h5" sx={{ color: '#ffd700', mb: 3 }}>
                            Fight Created Successfully!
                        </Typography>
                        <Box
                            sx={{
                                backgroundColor: '#1f2937',
                                padding: '1rem',
                                borderRadius: '4px',
                                border: '2px solid #ffd700',
                                mb: 3,
                                cursor: 'pointer',
                                '&:hover': { backgroundColor: '#374151' },
                            }}
                            onClick={copyFightId}
                        >
                            <Typography sx={{ color: '#fef3c7', fontSize: '32px', fontWeight: 'bold' }}>
                                Fight ID: {createdFightId}
                            </Typography>
                            <Typography sx={{ color: '#9ca3af', fontSize: '14px', mt: 1 }}>
                                Click to copy
                            </Typography>
                        </Box>
                        <Typography sx={{ color: '#fef3c7', mb: 3 }}>
                            Share this Fight ID with your opponent to join the fight!
                        </Typography>
                        <Button
                            onClick={handleClose}
                            sx={{
                                backgroundColor: '#7c2d12',
                                color: '#fef3c7',
                                border: '2px solid #b45309',
                                '&:hover': { backgroundColor: '#92400e' },
                            }}
                        >
                            Close
                        </Button>
                    </>
                ) : fightAction === 'join' ? (
                    <>
                        <Typography variant="h5" sx={{ color: '#fef3c7', mb: 3 }}>
                            Join Existing Fight
                        </Typography>
                        <input
                            type="number"
                            value={fightId}
                            onChange={(e) => setFightId(e.target.value)}
                            placeholder="Enter fight ID to join"
                            style={{
                                width: '100%',
                                padding: '10px',
                                marginBottom: '20px',
                                backgroundColor: '#1f2937',
                                border: '2px solid #b45309',
                                borderRadius: '4px',
                                color: '#fef3c7',
                            }}
                        />
                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                            <Button
                                onClick={handleJoinFight}
                                sx={{
                                    backgroundColor: '#7c2d12',
                                    color: '#fef3c7',
                                    border: '2px solid #b45309',
                                    '&:hover': { backgroundColor: '#92400e' },
                                }}
                            >
                                Join
                            </Button>
                            <Button
                                onClick={() => setFightAction(null)}
                                sx={{
                                    backgroundColor: '#1f2937',
                                    color: '#fef3c7',
                                    border: '2px solid #b45309',
                                    '&:hover': { backgroundColor: '#374151' },
                                }}
                            >
                                Back
                            </Button>
                        </Box>
                    </>
                ) : fightAction === 'create' ? (
                    <>
                        <Typography variant="h5" sx={{ color: '#fef3c7', mb: 3 }}>
                            Create New Fight
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                            <Button
                                onClick={handleCreateFight}
                                sx={{
                                    backgroundColor: '#7c2d12',
                                    color: '#fef3c7',
                                    border: '2px solid #b45309',
                                    '&:hover': { backgroundColor: '#92400e' },
                                }}
                            >
                                Create
                            </Button>
                            <Button
                                onClick={() => setFightAction(null)}
                                sx={{
                                    backgroundColor: '#1f2937',
                                    color: '#fef3c7',
                                    border: '2px solid #b45309',
                                    '&:hover': { backgroundColor: '#374151' },
                                }}
                            >
                                Back
                            </Button>
                        </Box>
                    </>
                ) : (
                    <>
                        <Typography variant="h5" sx={{ color: '#fef3c7', mb: 3 }}>
                            Choose Your Battle Path
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                            <Button
                                onClick={() => setFightAction('create')}
                                sx={{
                                    backgroundColor: '#7c2d12',
                                    color: '#fef3c7',
                                    border: '2px solid #b45309',
                                    '&:hover': { backgroundColor: '#92400e' },
                                }}
                            >
                                Create Fight
                            </Button>
                            <Button
                                onClick={() => setFightAction('join')}
                                sx={{
                                    backgroundColor: '#7c2d12',
                                    color: '#fef3c7',
                                    border: '2px solid #b45309',
                                    '&:hover': { backgroundColor: '#92400e' },
                                }}
                            >
                                Join Fight
                            </Button>
                        </Box>
                    </>
                )}
            </Box>
        </Modal>
    );
};

export default FightModal;
