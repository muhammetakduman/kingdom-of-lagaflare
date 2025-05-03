import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const ErrorSnackbar = ({ open, onClose, message }) => {
    return (
        <Snackbar
            open={!!open}
            autoHideDuration={3000} // 3 saniyede otomatik kapanır
            onClose={onClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Ekranın üst ortasında
        >
            <Alert
                onClose={onClose}
                severity="error" // kırmızı uyarı
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
};

export default ErrorSnackbar;
