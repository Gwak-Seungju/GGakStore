import { Link } from 'react-router-dom';
import useStore from '../store/store';

export default function CategoryRanking({ products }) {
    const { addVisitedProduct } = useStore((state) => state);
    return (
        <>
            <div id="searchBoxContainer">
                {products.map((item, index) => (
                    <div id="searchBoxProduct" key={index}>
                        <div id="searchBoxRanking">{index + 1}위</div>
                        <Link to={`/ProductPage/${item.productId}/${index + 1}`}>
                            <img
                                id="searchBoxProductImage"
                                src={item.image}
                                alt={item.mallName}
                                onClick={() => {
                                    addVisitedProduct(item);
                                }}
                            ></img>
                        </Link>
                        <div id="searchBoxProductName">{item.title.replace(/<b>/g, '').replace(/<\/b>/g, '')}</div>
                        <div>
                            <span id="searchBoxProductPrice">{(1 * item.lprice).toLocaleString('ko-KR')}</span>
                            <span>원</span>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
