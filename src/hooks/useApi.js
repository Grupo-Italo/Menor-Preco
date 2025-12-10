import { useQuery, useMutation } from '@tanstack/react-query';

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

export const useApiMutation = (url, options = {}) => {
    const { method = 'POST' } = options;

    return useMutation({
        mutationFn: async (data) => {
            try {
                const response = await fetch(url, {
                    method,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });
                
                if (!response.ok) {
                    const errorBody = await response.text();
                    console.error(`[API Error] Status: ${response.status}`, errorBody);
                    throw new Error(`Erro ${response.status} ao enviar dados para ${url}: ${errorBody || response.statusText}`);
                }
                
                return response.json();
            } catch (err) {
                console.error(`[API Request Error] ${url}:`, err);
                throw err;
            }
        }
    });
};
