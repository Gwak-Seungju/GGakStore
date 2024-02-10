import { useEffect, useState } from 'react';
import useStore from '../store/store';
import { Link } from 'react-router-dom';

export default function CategoryRanking() {
    const { shoppingData, items, addVisitedProduct } = useStore((state) => state);
    const productList = ['상의', '아우터', '바지', '스커트', '가방', '신발', '시계', '모자', '스포츠', '안경'];
    const [currentCategory, setCurrentCategory] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentCategory((prev) => (prev + 1) % productList.length);
        }, 8000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        shoppingData(productList[currentCategory]);
    }, [currentCategory]);

    return (
        <div id="rankingContainer">
            <div id="productListContainer">
                <div>상품</div>
                {productList.map((item, index) => (
                    <button
                        key={index}
                        className={'productBtn' + (index === currentCategory ? ' active' : '')}
                        onClick={() => {
                            setCurrentCategory(index);
                            shoppingData(item);
                        }}
                    >
                        {item}
                    </button>
                ))}
            </div>
            <div id="searchBoxContainer">
                {items &&
                    items.map((item, index) => (
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
        </div>
    );
}
