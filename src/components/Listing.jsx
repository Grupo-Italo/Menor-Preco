import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { tableStyles } from '../styles/tableStyles';

export function Listing({ data }) {
    if (!data) {
        return null;
    }

    const rows = data.produtos.map((item) => ({
        id: item.id,
        loja: item.estabelecimento.nm_fan || item.estabelecimento.nm_emp,
        preco: `R$ ${item.valor}`,
        endereco: `${item.estabelecimento.nm_logr}, ${item.estabelecimento.nr_logr} - ${item.estabelecimento.bairro}`,
        distancia: `${item.distkm}km`,
        tempo: item.tempo ? `${item.tempo}` : '-',
        cidade: item.estabelecimento.mun
    }));

    const columns = [
        { field: 'loja', headerName: 'Loja', flex: 1, minWidth: 250 },
        { field: 'preco', headerName: 'Preço', width: 100 },
        { field: 'endereco', headerName: 'Endereço', flex: 1, minWidth: 300 },
        { field: 'distancia', headerName: 'Distância (km)', width: 120 },
        { field: 'tempo', headerName: 'Tempo', width: 100 },
        { field: 'cidade', headerName: 'Cidade/UF', flex: 0.8, minWidth: 150 }
    ];

    return (
        <Box sx={{ height: 'calc(100vh - 360px)', minHeight: 300, width: '100%', mt: 2, overflow: 'auto' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSizeOptions={[5, 10, 20]}
                initialState={{
                    pagination: { paginationModel: { pageSize: 10, page: 0 } }
                }}
                sx={tableStyles}
            />
        </Box>
    );
}