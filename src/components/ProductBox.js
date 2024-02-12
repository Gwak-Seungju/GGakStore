import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/store';

export default function ProductBox({ product }) {
    const { addItem, bucket } = useStore((state) => state);
    const [productNumber, setProductNumber] = useState(1);
    const [isAddableProduct, setIsAddableProduct] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        bucket.map((item) => {
            if (item.title === product.title) setIsAddableProduct(false);
        });
    }, [bucket]);

    return (
        <div id="productBoxContainer">
            <img id="productBoxProductImage" src={product.image}></img>
            <div id="productInfo">
                <div id="productBoxProductName">{product.title.replace(/<b>/g, '').replace(/<\/b>/g, '')}</div>
                <div id="productBoxPriceContainer">
                    <span id="productBoxProductPrice">{(1 * product.lprice).toLocaleString('ko-KR')}</span>
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
                        <span id="totalProductPrice">{(productNumber * product.lprice).toLocaleString('ko-KR')}</span>
                        <span id="currWon">원</span>
                    </div>
                </div>
                <div id="buttonContainer">
                    <button
                        onClick={() => {
                            {
                                if (bucket.length === 0 || isAddableProduct) {
                                    product.productNumber = productNumber;
                                    addItem(product);
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
                            product.productNumber = productNumber;
                            navigate('/PaymentPage', {
                                state: { ...product },
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
