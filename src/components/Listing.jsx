import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';

export function Listing({ data }) {
    if (!data) {
        return null;
    }

    const rows = data.produtos.map((item) => ({
        id: item.id,
        loja: item.estabelecimento.nm_emp,
        preco: item.valor,
        // distancia: item.estabelecimento.distancia,
        cidade: item.estabelecimento.mun
    }));

    const columns = [
        { field: 'loja', headerName: 'Loja', width: 600 },
        { field: 'preco', headerName: 'Preço', width: 120 },
        // { field: 'Distancia (km)', headerName: 'Distancia', width: 250 },
        { field: 'cidade', headerName: 'Cidade/UF', width: 180 }
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
            />
        </Box>
    );
}