import { createContext, useContext } from 'react';

type CacheKeysValue = {
	postsKey: string;
};

const CacheKeysContext = createContext<CacheKeysValue>({
	postsKey: '/api/posts'
});

export const useCacheKeys = () => {
	return useContext(CacheKeysContext);
};

export default CacheKeysContext;
