import { create } from 'zustand';
import axios from 'axios';

const ClientID = process.env.REACT_APP_CLIENT_ID;
const ClientSecret = process.env.REACT_APP_CLIENT_SECRET;
const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';
const URL = `${PROXY}/v1/search/shop.json`;

const useStore = create((set, get) => ({
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
}));

export default useStore;
