import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import axios from 'axios';

const ClientID = process.env.REACT_APP_CLIENT_ID;
const ClientSecret = process.env.REACT_APP_CLIENT_SECRET;
const URL = '/v1/search/shop.json';

const useStore = create(
    persist(
        (set, get) => ({
            shoppingData: async (product) => {
                await axios
                    .get(URL, {
                        params: {
                            query: product,
                            display: 100,
                        },
                        headers: {
                            'X-Naver-Client-Id': ClientID,
                            'X-Naver-Client-Secret': ClientSecret,
                        },
                    })
                    .then((res) => get().setData(res.data.items))
                    .catch((e) => {});
            },
            setData: (data) => set({ items: data }),
            items: [],

            getShoppingData: () => {
                console.log(get().items);
            },

            bucket: [],
            setBucket: (data) => set({ bucket: data }),
            addItem: (item) => set((state) => ({ bucket: [...state.bucket, item] })),
            removeItem: (productId) =>
                set((state) => ({ bucket: state.bucket.filter((item) => item.productId !== productId) })),
            clearBucket: () => set({ bucket: [] }),

            visitedProduct: [],
            addVisitedProduct: (item) => {
                const { visitedProduct } = get();
                const existingIndex = visitedProduct.findIndex((i) => i.title === item.title);

                if (existingIndex !== -1) {
                    // 이미 방문한 상품인 경우, 해당 상품을 배열의 맨 앞으로 이동
                    const updatedVisitedProduct = [
                        visitedProduct[existingIndex],
                        ...visitedProduct.slice(0, existingIndex),
                        ...visitedProduct.slice(existingIndex + 1),
                    ];
                    set({ visitedProduct: updatedVisitedProduct });
                } else {
                    // 새로운 상품인 경우, 배열의 맨 앞에 추가
                    set({ visitedProduct: [item, ...visitedProduct] });
                }
            },

            clearVisitedProduct: () => set({ visitedProduct: [] }),
        }),
        {
            name: 'storage-key',
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);

export default useStore;
