import { useEffect, useState } from 'react';
import useStore from '../store/store';
import CategoryRanking from './CategoryRanking';

export default function MainComponent() {
    const { shoppingData, items } = useStore((state) => state);
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
            <CategoryRanking products={items.slice(0, 10)} />
        </div>
    );
}
