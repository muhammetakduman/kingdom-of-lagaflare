import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { ethers } from 'ethers';

import CardDisplay from '../components/CardDisplay';
import NewCardModal from '../components/NewCardModal';
import FightModal from '../components/FightModal';
import WinnerModal from '../components/WinnerModal';
import LoserModal from '../components/LoserModal';
import ErrorSnackbar from '../components/ErrorSnackbar';
import LightningEffect from '../components/effect/LightningEffect';
import BattleScreen from '../components/BattleScreen';

const Dashboard = ({ provider, contractAddress, contractABI, userAddress }) => {
    const [battleResult, setBattleResult] = useState(null);
    const [isBattleScreenOpen, setIsBattleScreenOpen] = useState(false);

    const [showLightning, setShowLightning] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newCard, setNewCard] = useState(null);
    const [isCardRotating, setIsCardRotating] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    const [isFightModalOpen, setIsFightModalOpen] = useState(false);
    const [fightAction, setFightAction] = useState(null);
    const [fightId, setFightId] = useState('');
    const [createdFightId, setCreatedFightId] = useState(null);

    const [isWinnerModalOpen, setIsWinnerModalOpen] = useState(false);
    const [isLoserModalOpen, setIsLoserModalOpen] = useState(false);

    const [error, setError] = useState(null);
    const [nfts, setNfts] = useState([]);
    const [contract, setContract] = useState(null);

    useEffect(() => {
        const initContract = async () => {
            try {
                const signer = await provider.getSigner();
                const contractInstance = new ethers.Contract(contractAddress, contractABI, signer);
                setContract(contractInstance);
                await loadNFTs(contractInstance);
            } catch (err) {
                console.error('Kontrat başlatma hatası:', err);
                setError('Failed to connect to the contract.');
            }
        };

        initContract();
    }, []);

    const loadNFTs = async (contractInstance) => {
        try {
            const data = await contractInstance.getMyNFTsWithData();
            const [tokenIds, rarities, names, attackDamages] = data;

            const formatted = tokenIds.map((id, i) => ({
                tokenId: Number(id),
                rarity: Number(rarities[i]),
                name: names[i],
                attackDamage: Number(attackDamages[i]),
            }));

            setNfts(formatted);
        } catch (err) {
            console.error('NFT veri çekme hatası:', err);
            setError('Failed to load your NFTs.');
        }
    };

    const handleMint = async () => {
        try {
            if (!contract) return;
            const mintPrice = await contract.mintPrice();
            const tx = await contract.mintNFT({ value: mintPrice, gasLimit: 500000 });
            let receipt = null;
            while (!receipt) {
                receipt = await provider.getTransactionReceipt(tx.hash);
                if (!receipt) await new Promise((resolve) => setTimeout(resolve, 1000));
            }
            const log = receipt.logs.find((log) => {
                try {
                    return contract.interface.parseLog(log).name === 'NFTMinted';
                } catch {
                    return false;
                }
            });
            if (log) {
                const parsed = contract.interface.parseLog(log);
                const mintedCard = {
                    tokenId: Number(parsed.args[1]),
                    rarity: Number(parsed.args[2]),
                    name: parsed.args[3],
                    attackDamage: Number(parsed.args[4]),
                };
                setNewCard(mintedCard);
                setIsModalOpen(true);
                setIsCardRotating(true);
                setTimeout(() => {
                    setIsCardRotating(false);
                    setShowConfetti(true);
                }, 2000);
                await loadNFTs(contract);
            }
        } catch (err) {
            console.error('Mint hatası:', err);
            setError('Failed to mint NFT.');
        }
    };

    const handleCardSelect = (nft) => {
        setSelectedCard(nft.tokenId === selectedCard ? null : nft.tokenId);
    };

    const handleCreateFight = async () => {
        try {
            if (!selectedCard) {
                setError('Please select a card before creating a fight!');
                return;
            }

            const tx = await contract.startFight(selectedCard);
            let receipt = null;
            while (!receipt) {
                receipt = await provider.getTransactionReceipt(tx.hash);
                if (!receipt) await new Promise((resolve) => setTimeout(resolve, 1000));
            }

            const log = receipt.logs.find((log) => {
                try {
                    return contract.interface.parseLog(log).name === 'FightStarted';
                } catch {
                    return false;
                }
            });

            if (log) {
                const parsed = contract.interface.parseLog(log);
                const fightId = Number(parsed.args[0]);
                setCreatedFightId(fightId);
                await navigator.clipboard.writeText(fightId.toString());
                setError('Fight ID has been copied to clipboard!');
            }
        } catch (err) {
            console.error('Fight oluşturulamadı:', err);
            setError('Failed to create fight.');
        }
    };

    const handleJoinFight = async () => {
        try {
            if (!fightId || !selectedCard) {
                setError('Please select a card and enter a fight ID!');
                return;
            }

            const tx = await contract.joinFight(fightId, selectedCard);
            let receipt = null;
            while (!receipt) {
                receipt = await provider.getTransactionReceipt(tx.hash);
                if (!receipt) await new Promise((resolve) => setTimeout(resolve, 1000));
            }

            await resolveFight(fightId);
            setIsFightModalOpen(false);
            setFightAction(null);
            setFightId('');
        } catch (err) {
            console.error('Join fight hatası:', err);
            setError('Failed to join the fight.');
        }
    };

    const resolveFight = async (fightId) => {
        try {
            const tx = await contract.resolveFight(fightId);
            let receipt = null;
            while (!receipt) {
                receipt = await provider.getTransactionReceipt(tx.hash);
                if (!receipt) await new Promise((resolve) => setTimeout(resolve, 1000));
            }

            const log = receipt.logs.find((log) => {
                try {
                    return contract.interface.parseLog(log).name === 'FightResolved';
                } catch {
                    return false;
                }
            });

            if (log) {
                const parsed = contract.interface.parseLog(log);
                const winner = parsed.args[1].toLowerCase();

                const [tokenId1, tokenId2] = await contract.getFightStatus(fightId).then((res) => [res[0], res[1]]);
                const [rarity1, name1, damage1] = await contract.getNFTAttributes(tokenId1);
                const [rarity2, name2, damage2] = await contract.getNFTAttributes(tokenId2);

                const playerCard = {
                    tokenId: Number(tokenId1),
                    rarity: rarity1,
                    name: name1,
                    attackDamage: Number(damage1)
                };

                const opponentCard = {
                    tokenId: Number(tokenId2),
                    rarity: rarity2,
                    name: name2,
                    attackDamage: Number(damage2)
                };


                setBattleResult({ playerCard, opponentCard, winner });
                setIsBattleScreenOpen(true);
                setCreatedFightId(null);
                await loadNFTs(contract);
            }
        } catch (err) {
            console.error('Fight çözümleme hatası:', err);
            setError('Failed to resolve fight.');
        }
    };

    const copyFightId = () => {
        navigator.clipboard.writeText(createdFightId?.toString() || '');
    };

    const buttonStyles = {
        backgroundColor: '#7c2d12',
        color: '#fef3c7',
        fontFamily: 'serif',
        fontWeight: 'bold',
        fontSize: '1.125rem',
        border: '2px solid #b45309',
        borderRadius: '0.375rem',
        boxShadow: 'inset 0 2px 4px 0 rgba(146, 64, 14, 0.5)',
        transition: 'all 0.3s',
        '&:hover': { backgroundColor: '#92400e', color: '#fef9c3' },
        '&:active': { backgroundColor: '#431407' },
        letterSpacing: '0.025em',
        px: 3,
        py: 1.5,
    };

    return (
        <>
            {showLightning && <LightningEffect />}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 4, pt: 2 }}>
                <Typography
                    sx={{
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        color: '#fef3c7',
                        padding: '0.5em 1em',
                        borderRadius: '0.5em',
                        fontFamily: 'monospace',
                        fontSize: '0.875rem',
                        letterSpacing: '0.03em',
                    }}
                >
                    Welcome {userAddress?.substring(0, 6)}...{userAddress?.slice(-4)}
                </Typography>
            </Box>

            <Box display="flex" justifyContent="center" gap={2} mt={4} mb={2}>
                <Button variant="contained" sx={buttonStyles} onClick={handleMint}>OPEN PACK</Button>
                <Button
                    variant="contained"
                    sx={buttonStyles}
                    onClick={() => {
                        setShowLightning(true);
                        setTimeout(() => setShowLightning(false), 3000);
                        setIsFightModalOpen(true);
                        setFightAction(null);
                    }}
                >
                    FIGHT!
                </Button>
            </Box>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '4em',
                    padding: '2em',
                    margin: '2em auto',
                    maxHeight: '80vh',
                    overflowY: 'auto',
                    maxWidth: '1200px',
                    width: '100%',
                    boxSizing: 'border-box',
                }}
            >
                {[...nfts]
                    .sort((a, b) => {
                        const nameCompare = a.name.localeCompare(b.name);
                        if (nameCompare !== 0) return nameCompare;
                        return a.rarity - b.rarity;
                    })
                    .map((nft, index) => (
                        <Box key={index}>
                            <CardDisplay
                                nft={nft}
                                selectedCard={selectedCard}
                                onSelect={handleCardSelect}
                            />
                        </Box>
                    ))}
            </Box>

            <NewCardModal
                open={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setShowConfetti(false);
                }}
                newCard={newCard}
                isCardRotating={isCardRotating}
                showConfetti={showConfetti}
            />

            <FightModal
                open={isFightModalOpen}
                onClose={() => {
                    setIsFightModalOpen(false);
                    setFightAction(null);
                    setCreatedFightId(null);
                }}
                fightAction={fightAction}
                setFightAction={setFightAction}
                fightId={fightId}
                setFightId={setFightId}
                createdFightId={createdFightId}
                handleCreateFight={handleCreateFight}
                handleJoinFight={handleJoinFight}
                copyFightId={copyFightId}
            />

            <WinnerModal open={isWinnerModalOpen} onClose={() => setIsWinnerModalOpen(false)} />
            <LoserModal open={isLoserModalOpen} onClose={() => setIsLoserModalOpen(false)} />
            <ErrorSnackbar open={!!error} onClose={() => setError(null)} message={error} />

            {isBattleScreenOpen && battleResult && (
                <BattleScreen
                    playerCard={battleResult.playerCard}
                    opponentCard={battleResult.opponentCard}
                    winner={battleResult.winner}
                    userAddress={userAddress}
                    onClose={() => {
                        setIsBattleScreenOpen(false);
                        setBattleResult(null);
                    }}
                />
            )}
        </>
    );
};

export default Dashboard;
