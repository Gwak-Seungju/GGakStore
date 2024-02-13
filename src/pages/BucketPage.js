import useStore from '../store/store';
import { useNavigate } from 'react-router-dom';

export default function BucketPage() {
    const { bucket, setBucket, removeItem, clearBucket } = useStore((state) => state);
    const handleDecrease = (index) => {
        const updatedItems = bucket.map((item, i) => {
            if (i === index && item.productNumber > 0) {
                return { ...item, productNumber: item.productNumber - 1 };
            }
            return item;
        });
        setBucket(updatedItems);
    };
    const handleIncrease = (index) => {
        const updatedItems = bucket.map((item, i) => {
            if (i === index) {
                return { ...item, productNumber: item.productNumber + 1 };
            }
            return item;
        });
        setBucket(updatedItems);
    };
    const navigate = useNavigate();
    let result = 0;
    return (
        <div id="bucketBoxContainer">
            <div id="bucketBoxsubHeader">
                <div id="bucketBoxTotalProductNumber">상품 총 개수: {bucket.length}</div>
                <button
                    className="btn"
                    id="clearBucket"
                    onClick={() => {
                        clearBucket();
                    }}
                >
                    장바구니 비우기
                </button>
            </div>
            {bucket.map((item, index) => (
                <div id="bucketContainer" key={index}>
                    <img id="bucketBoxImage" src={item.image} alt={item.mallName}></img>
                    <div id="bucketBoxProductName">{item.title.replace(/<b>/g, '').replace(/<\/b>/g, '')}</div>
                    <div id="bucketBoxProductNumberContainer">
                        <button
                            className="btn"
                            id="bucketBoxDecrease"
                            onClick={() => {
                                handleDecrease(index);
                            }}
                        >
                            -
                        </button>
                        <div id="bucketBoxProductNumber">{item.productNumber}</div>
                        <button
                            className="btn"
                            id="bucketBoxIncrease"
                            onClick={() => {
                                handleIncrease(index);
                            }}
                        >
                            +
                        </button>
                    </div>
                    <div id="bucketBoxProductPrice">{(item.lprice * item.productNumber).toLocaleString('ko-KR')}원</div>
                    <button
                        className="btn"
                        onClick={() => {
                            removeItem(item.productId);
                        }}
                        id="bucketBoxDelete"
                    >
                        x
                    </button>
                </div>
            ))}
            {bucket.map((item) => {
                result = result + item.lprice * item.productNumber;
            })}
            <div id="bucketBoxTotalPrice">총 결제 금액: {result.toLocaleString('ko-KR')}원</div>

            <button
                className="btn"
                id="bucketBoxPay"
                onClick={() => {
                    result === 0 ? alert('최소 하나 이상의 상품을 구매하셔야 합니다.') : navigate('/PaymentPage');
                }}
            >
                주문하기
            </button>
        </div>
    );
}
