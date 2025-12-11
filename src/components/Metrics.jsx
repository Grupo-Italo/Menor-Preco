import { Box, Card, CardContent, Typography } from '@mui/material';

export function Metrics({ data }) {
    debugger
    const calcularMetricas = () => {
        if (!data || !data.produtos || data.produtos.length === 0) {
            return {
                media: '-',
                moda: '-',
                menor: '-',
                maior: '-',
                totalOcorrencias: 0,
                statusServico: 'Offline',
                tempo: '-'
            };
        }

        const precos = data.produtos.map(p => parseFloat(p.valor));
        const menor = data.precos?.min
        const maior = data.precos?.max 
        const media = (precos.reduce((a, b) => a + b, 0) / precos.length).toFixed(2);

        const frequencia = {};
        precos.forEach(preco => {
            const precoFormatado = preco.toFixed(2);
            frequencia[precoFormatado] = (frequencia[precoFormatado] || 0) + 1;
        });
        const maxFreq = Math.max(...Object.values(frequencia));
        const moda = Object.keys(frequencia).find(key => frequencia[key] === maxFreq);

        return {
            media: `R$ ${media}`,
            moda: `R$ ${moda}`,
            menor: menor,
            maior: maior,
            totalOcorrencias: maxFreq,
            statusServico: 'Online',
            tempo: data.tempo ? `${data.tempo}ms` : '-'
        };
    };

    const metricas = calcularMetricas();
    const ultimaConsulta = data ? {
        local: data.local || '-',
        executadaEm: new Date().toLocaleString('pt-BR'),
        tempo: metricas.tempo
    } : { local: '-', executadaEm: '-', tempo: '-' };

    return (
        <Box sx={{ mt: 3, mb: 3, width: '100%' }}>
            <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
                <Card sx={{ backgroundColor: '#2c2c2c', color: 'white', flex: 1 }}>
                    <CardContent sx={{ py: 1.5 }}>
                        <Typography variant="subtitle2" sx={{ color: '#8ab4f8', mb: 0.5 }}>
                            Status do Serviço
                        </Typography>
                        <Typography variant="h6" sx={{ color: metricas.statusServico === 'Online' ? '#81c784' : '#e57373' }}>
                            {metricas.statusServico}
                        </Typography>
                    </CardContent>
                </Card>

                <Card sx={{ backgroundColor: '#2c2c2c', color: 'white', flex: 1 }}>
                    <CardContent sx={{ py: 1.5 }}>
                        <Typography variant="subtitle2" sx={{ color: '#8ab4f8', mb: 0.5 }}>
                            Produto
                        </Typography>
                        <Typography variant="h7" display={'block'}>
                            {/* {data.produtosInfo.prod_descricao} */}
                            Produto Exemplo
                        </Typography>
                        <Typography variant="subtitle2" display={'block'} sx={{ color: '#9e9e9eff' }}>
                            {/* {data.produtosInfo.prod_marca} */}
                            Marca Exemplo
                        </Typography>
                        <Typography variant="subtitle2" sx={{ color: '#9e9e9eff' }}>
                            {/* {data.produtosInfo.prod_codigo} */}
                            Gtin: 1234567890123
                        </Typography>
                    </CardContent>
                </Card>

                <Card sx={{ backgroundColor: '#2c2c2c', color: 'white', flex: 1 }}>
                    <CardContent sx={{ py: 1.5 }}>
                        <Typography variant="subtitle2" sx={{ color: '#8ab4f8', mb: 0.5 }}>
                            Última Consulta
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                            Local: {ultimaConsulta.local}
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                            Executada em: {ultimaConsulta.executadaEm}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#9e9e9eff' }}>
                            Tempo de resposta: {ultimaConsulta.tempo}
                        </Typography>
                    </CardContent>
                </Card>

                <Card sx={{ backgroundColor: '#2c2c2c', color: 'white', flex: 1 }}>
                    <CardContent sx={{ py: 1.5 }}>
                        <Typography variant="subtitle2" sx={{ color: '#8ab4f8', mb: 0.5 }}>
                            Média / Moda
                        </Typography>
                        <Typography variant="h6">
                            {metricas.media}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#9e9e9e' }}>
                            Moda: {metricas.moda} ({metricas.totalOcorrencias} ocorrências)
                        </Typography>
                    </CardContent>
                </Card>

                <Card sx={{ backgroundColor: '#2c2c2c', color: 'white', flex: 1 }}>
                    <CardContent sx={{ py: 1.5 }}>
                        <Typography variant="subtitle2" sx={{ color: '#8ab4f8', mb: 0.5 }}>
                            Menor / Maior
                        </Typography>
                        <Typography variant="body2">
                            Menor: {metricas.menor}
                        </Typography>
                        <Typography variant="body2">
                            Maior: {metricas.maior}
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}