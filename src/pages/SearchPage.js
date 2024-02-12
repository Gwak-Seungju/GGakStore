import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../store/store';
import CategoryRanking from '../components/CategoryRanking';

export default function SearchPage() {
    const { shoppingData, items } = useStore((state) => state);
    const { product } = useParams();
    const decodedProduct = decodeURIComponent(product);
    const currentURL = window.location.href;
    const regex = /\/SearchPage/;
    useEffect(() => {
        if (regex.test(currentURL)) {
            shoppingData(decodedProduct);
        }
    }, [decodedProduct]);

    return <CategoryRanking products={items} />;
}
