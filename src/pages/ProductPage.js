import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useStore from '../store/store';

export default function ProductPage() {
    const ranking = useParams();
    const { items, addItem, bucket } = useStore((state) => state);
    const [productNumber, setProductNumber] = useState(1);
    const [isAddableProduct, setIsAddableProduct] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        bucket.map((item) => {
            if (item.title === items[ranking.ranking - 1].title) setIsAddableProduct(false);
        });
    }, [bucket]);

    return (
        <div id="productBoxContainer">
            <img id="productBoxProductImage" src={items[ranking.ranking - 1].image}></img>
            <div id="productInfo">
                <div id="productBoxProductName">
                    {items[ranking.ranking - 1].title.replace(/<b>/g, '').replace(/<\/b>/g, '')}
                </div>
                <div id="productBoxPriceContainer">
                    <span id="productBoxProductPrice">
                        {(1 * items[ranking.ranking - 1].lprice).toLocaleString('ko-KR')}
                    </span>
                    <span id="prevWon">원</span>
                </div>
                <div id="purchaseQuantityContainer">
                    <span id="purchaseQunatity">구매 수량</span>
                    <div>
                        <button
                            className="btn"
                            id="decrease"
                            onClick={() => {
                                if (productNumber > 1) {
                                    setProductNumber((count) => count - 1);
                                }
                            }}
                        >
                            -
                        </button>
                        <span id="productNumber">{productNumber}</span>
                        <button
                            className="btn"
                            id="increase"
                            onClick={() => {
                                setProductNumber((count) => count + 1);
                            }}
                        >
                            +
                        </button>
                    </div>
                </div>
                <div id="totalPriceContainer">
                    <span id="toalPrice">총 상품 금액</span>
                    <div id="actualPrice">
                        <span id="totalProductPrice">
                            {(productNumber * items[ranking.ranking - 1].lprice).toLocaleString('ko-KR')}
                        </span>
                        <span id="currWon">원</span>
                    </div>
                </div>
                <div id="buttonContainer">
                    <button
                        onClick={() => {
                            {
                                if (bucket.length === 0 || isAddableProduct) {
                                    items[ranking.ranking - 1].productNumber = productNumber;
                                    addItem(items[ranking.ranking - 1]);
                                    alert('장바구니에 담겼습니다!');
                                } else {
                                    alert('이미 장바구니에 같은 상품이 있습니다.');
                                }
                            }
                        }}
                        className="btn"
                        id="productBoxBucket"
                    >
                        장바구니
                    </button>
                    <button
                        onClick={() => {
                            items[ranking.ranking - 1].productNumber = productNumber;
                            navigate('/PaymentPage', {
                                state: { ...items[ranking.ranking - 1] },
                            });
                        }}
                        className="btn"
                        id="productBoxPurchase"
                    >
                        구매하기
                    </button>
                </div>
            </div>
        </div>
    );
}
