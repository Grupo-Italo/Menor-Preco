import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { tableStyles } from '../styles/tableStyles';

export function Listing({ data }) {
    if (!data) {
        return null;
    }

    const rows = data.produtos.map((item) => ({
        id: item.id,
        loja: item.estabelecimento.nm_emp,
        preco: item.valor,
        endereco: `${item.estabelecimento.nm_logr}, ${item.estabelecimento.nr_logr} - ${item.estabelecimento.bairro}`,
        distancia: `${item.distkm}m`,
        cidade: item.estabelecimento.mun
    }));

    const columns = [
        { field: 'loja', headerName: 'Loja', width: 400 },
        { field: 'preco', headerName: 'Preço', width: 120 },
        { field: 'endereco', headerName: 'Endereço', width: 400 },
        { field: 'distancia', headerName: 'Distância (m)', width: 300 },
        { field: 'cidade', headerName: 'Cidade/UF', width: 300 }
    ];

    return (
        <Box sx={{ height: 500, width: '100%', mt: 2 }}>
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