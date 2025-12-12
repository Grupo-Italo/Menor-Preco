import { useQuery } from '@tanstack/react-query';

// Hook para requisições automáticas com react-query
export const useApi = (queryKey, url, options = {}) => {
    const { enabled = true, params = {} } = options;
    
    const buildUrl = () => {
        const queryParams = new URLSearchParams(params).toString();
        return queryParams ? `${url}?${queryParams}` : url;
    };
    
    return useQuery({
        queryKey: [queryKey, params],
        queryFn: async () => {
            const response = await fetch(buildUrl());
            if (!response.ok) {
                throw new Error(`Erro ao buscar dados de ${queryKey}`);
            }
            return response.json();
        },
        enabled,
    });
};

// Hook para requisições manuais com react-query
export const useManualApi = (queryKey, url, options = {}) => {
    const { params = {} } = options;
    
    const buildUrl = () => {
        const queryParams = new URLSearchParams(params).toString();
        return queryParams ? `${url}?${queryParams}` : url;
    };
    
    return useQuery({
        queryKey: [queryKey, params],
        queryFn: async () => {
            const response = await fetch(buildUrl());
            if (!response.ok) {
                throw new Error(`Erro ao buscar dados de ${queryKey}`);
            }
            return response.json();
        },
        enabled: false,
        retry: false,
    });
};