
import { Box, Typography, Avatar, Paper, Divider } from '@mui/material';
import { useEffect, useState } from 'react';

interface UserInfo {
    id?: number;
    nome?: string;
    usuario?: string; // email
    foto?: string;
}

function Perfil() {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

    useEffect(() => {
        // Tenta carregar informações do usuário do localStorage (se foram salvas pelo login)
        const storedUserInfo = localStorage.getItem('userInfo');
        if (storedUserInfo) {
            try {
                const parsedUserInfo: UserInfo = JSON.parse(storedUserInfo);
                setUserInfo(parsedUserInfo);
            } catch (error) {
                console.error("Erro ao parsear userInfo do localStorage:", error);
            }
        } else {
            // Caso não haja info no localStorage, pode usar dados mockados
            setUserInfo({
                id: 999,
                nome: "Usuário Teste",
                usuario: "teste@farmacia.com",
                foto: "https://via.placeholder.com/150/0000FF/FFFFFF?text=VT" // Avatar placeholder
            });
        }
    }, []);


    return (
        <Box sx={{ p: 4, maxWidth: 800, mx: 'auto', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Paper elevation={3} sx={{ p: 5, borderRadius: 2, textAlign: 'center', width: '100%' }}>
                <Avatar
                    alt={userInfo?.nome || "Usuário"}
                    src={userInfo?.foto || "https://via.placeholder.com/150/CCCCCC/FFFFFF?text=UA"}
                    sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }}
                />
                <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                    {userInfo?.nome || "Meu Perfil"}
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                    {userInfo?.usuario || "email@exemplo.com"}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body1" color="text.primary">
                    ID: {userInfo?.id || "N/A"}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                    Gerencie suas informações e contribuições aqui.
                </Typography>
            </Paper>
        </Box>
    );
}

export default Perfil;