import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, Chip } from '@mui/material';
import { useMemo } from 'react';

export function SearchGroupsListing({ data = [] }) {
    const { processedData, uniqueCompetitors } = useMemo(() => {
        if (!data || data.length === 0) {
            return { processedData: [], uniqueCompetitors: [] };
        }

        const competitorsSet = new Set();

        data.forEach(produto => {
            produto.concorrentes?.forEach(conc => {
                if (conc.nome_empresa) competitorsSet.add(conc.nome_empresa);
            });
        });

        const competitors = Array.from(competitorsSet);

        const processed = data.map(produto => {
            const competitorValues = {};

            produto.concorrentes?.forEach(conc => {
                if (conc.nome_empresa) {
                    competitorValues[conc.nome_empresa] = parseFloat(conc.valor) || 0;
                }
            });

            return {
                descricao: produto.prod_descricao || 'N/A',
                gtin: produto.prod_codbarras || 'N/A',
                valorLoja: parseFloat(produto.valor_loja) || 0,
                promocaoLoja: parseFloat(produto.promocao_loja) || 0,
                atacadoLoja: parseFloat(produto.atacado_loja) || 0,
                competitorValues
            };
        });

        return { processedData: processed, uniqueCompetitors: competitors };
    }, [data]);

    const formatCurrency = (value) => {
        if (!value || value === 0) return 'R$ 0,00';
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    const getPriceColor = (valorLoja, valorConcorrente) => {
        if (!valorLoja || !valorConcorrente) return 'inherit';
        if (valorLoja < valorConcorrente) return '#4caf50';
        if (valorLoja > valorConcorrente) return '#f44336';
        return '#ff9800';
    };

    if (!data || data.length === 0) {
        return (
            <Box sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary">
                    Nenhum dado encontrado
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Execute uma busca para visualizar os resultados
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ width: '100%', mt: 3 }}>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="h6">Comparação de Preços</Typography>
                <Chip label={`${processedData.length} produto(s)`} size="small" color="primary" />
                <Chip label={`${uniqueCompetitors.length} concorrente(s)`} size="small" color="secondary" />
            </Box>

            <TableContainer
                component={Paper}
                sx={{
                    maxHeight: 600,
                    overflowX: 'auto',
                    overflowY: 'auto',
                    backgroundColor: '#2c2c2c',
                    color: 'white'
                }}
            >
                <Table
                    stickyHeader
                    sx={{
                        tableLayout: 'auto',
                        width: 'max-content',
                        minWidth: '100%',
                        backgroundColor: '#2c2c2c'
                    }}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell
                                sx={{
                                    fontWeight: 'bold',
                                    backgroundColor: '#3a3a3a',
                                    color: 'white',
                                    minWidth: 250,
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                Produto
                            </TableCell>

                            <TableCell
                                sx={{
                                    fontWeight: 'bold',
                                    backgroundColor: '#3a3a3a',
                                    color: 'white',
                                    minWidth: 150,
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                GTIN
                            </TableCell>

                            <TableCell
                                align="right"
                                sx={{
                                    fontWeight: 'bold',
                                    backgroundColor: '#3a3a3a',
                                    color: 'white',
                                    minWidth: 120,
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                ÍTALO
                            </TableCell>

                            {uniqueCompetitors.map((competitor, index) => (
                                <TableCell
                                    key={index}
                                    align="right"
                                    sx={{
                                        whiteSpace: 'nowrap',
                                        fontWeight: 'bold',
                                        backgroundColor: '#3a3a3a',
                                        color: 'white'
                                    }}
                                >
                                    {competitor}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {processedData.map((produto, rowIndex) => (
                            <TableRow
                                key={rowIndex}
                                sx={{
                                    backgroundColor: '#3a3a3a',
                                    '&:hover': {
                                        backgroundColor: '#444'
                                    }
                                }}
                            >
                                <TableCell
                                    sx={{
                                        whiteSpace: 'nowrap',
                                        backgroundColor: '#3a3a3a',
                                        color: 'white'
                                    }}
                                >
                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                        {produto.descricao}
                                    </Typography>
                                </TableCell>

                                <TableCell
                                    sx={{
                                        whiteSpace: 'nowrap',
                                        backgroundColor: '#3a3a3a',
                                        color: 'white'
                                    }}
                                >
                                    <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                                        {produto.gtin}
                                    </Typography>
                                </TableCell>

                                <TableCell
                                    align="right"
                                    sx={{
                                        whiteSpace: 'nowrap',
                                        backgroundColor: '#3a3a3a',
                                        color: 'white'
                                    }}
                                >
                                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                                        {formatCurrency(produto.valorLoja)}
                                    </Typography>
                                </TableCell>

                                {uniqueCompetitors.map((competitor, colIndex) => {
                                    const valor = produto.competitorValues[competitor] || 0;
                                    const color = getPriceColor(produto.valorLoja, valor);

                                    return (
                                        <TableCell
                                            key={colIndex}
                                            align="right"
                                            sx={{
                                                whiteSpace: 'nowrap',
                                                backgroundColor: '#3a3a3a',
                                                color: 'white'
                                            }}
                                        >
                                            {valor > 0 ? (
                                                <Typography variant="body2" sx={{ fontWeight: 'bold', color }}>
                                                    {formatCurrency(valor)}
                                                </Typography>
                                            ) : (
                                                <Typography variant="body2" sx={{ color: '#999' }}>
                                                    -
                                                </Typography>
                                            )}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box sx={{ mt: 2, display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 16, height: 16, backgroundColor: '#4caf50', borderRadius: 1 }} />
                    <Typography variant="caption">Produto mais barato</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 16, height: 16, backgroundColor: '#f44336', borderRadius: 1 }} />
                    <Typography variant="caption">Produto mais caro</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 16, height: 16, backgroundColor: '#ff9800', borderRadius: 1 }} />
                    <Typography variant="caption">Preço igual</Typography>
                </Box>
            </Box>
        </Box>
    );
}
