import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import useStore from '../store/store';

export default function SearchBox() {
    const { items, shoppingData, addVisitedProduct } = useStore((state) => state);
    const { product } = useParams();
    const decodedProduct = decodeURIComponent(product);
    const currentURL = window.location.href;
    const regex = /\/SearchBox/;
    useEffect(() => {
        if (regex.test(currentURL)) {
            shoppingData(decodedProduct);
        }
    }, [decodedProduct]);

    return (
        <div id="searchBoxContainer">
            {items.map((item, index) => (
                <div id="searchBoxProduct" key={index}>
                    <div id="searchBoxRanking">{index + 1}위</div>
                    <Link to={`/ProductBox/${item.productId}/${index + 1}`}>
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
    );
}
