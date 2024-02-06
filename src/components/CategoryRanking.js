import useStore from '../store/store';
import { Link } from 'react-router-dom';

export default function CategoryRanking() {
    const { shoppingData, items, addVisitedProduct, btnActive, setBtnActive } = useStore((state) => state);
    const productList = ['상의', '아우터', '바지', '스커트', '가방', '신발', '시계', '모자', '스포츠', '안경'];

    return (
        <div id="rankingContainer">
            <div id="productListContainer">
                <div>상품</div>
                {productList.map((item, index) => (
                    <button
                        key={index}
                        className={'productBtn' + (btnActive == item ? ' active' : '')}
                        onClick={() => {
                            setBtnActive(item);
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
        </div>
        // store에 itemsByCategory 전역변수 저장하고
        // CategoryRanking에서 카테고리 버튼 클릭 시 shoppingDataByCategory로
        // itemByCategory를 갱신. 그리고 state를 하나 만들어서 버튼 클릭 시마다 변경
        // state에 따라 보여주는 상품 랭킹을 달리함. --> state 가능 값이 매우 많아지면
        // 조건이 엄청 많이 생기는데 이는 상관이 없을까??
    );
}
