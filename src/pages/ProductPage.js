import { useLocation, useParams } from 'react-router-dom';
import ProductBox from '../components/ProductBox';
import useStore from '../store/store';

export default function ProductPage() {
    const location = useLocation();
    const ranking = useParams();
    const { items } = useStore((state) => state);
    return (
        <>
            {location.state === null ? (
                <ProductBox product={items[ranking.ranking - 1]} />
            ) : (
                <ProductBox product={location.state.item} />
            )}
        </>
    );
}
