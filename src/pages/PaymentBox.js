import { useState } from 'react';
import useStore from '../store/store';
import { useLocation } from 'react-router-dom';

export default function PaymentBox() {
    const { bucket } = useStore((state) => state);
    const [isRadioChecked, setIsRadioChecked] = useState(null);
    const [checkboxes, setCheckBoxes] = useState([
        { id: 1, label: '[필수 ] 개인정보 수집 및 이용 동의', checked: false },
        { id: 2, label: '[필수 ] 개인정보 제 3자 제공 동의', checked: false },
        { id: 3, label: '[필수 ] 전자결제대행 이용 동의', checked: false },
    ]);
    const generalPayment = [
        '카드',
        '가상계좌',
        'Apple Pay',
        '휴대폰',
        '카카오페이',
        '삼성페이',
        '네이버페이',
        '페이코',
    ];
    const [clickedButton, setClickedButton] = useState('카드');
    const location = useLocation();

    let result = 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isRadioChecked === null) {
            alert('결제 방법을 선택해주세요');
        }
        const allChecked = checkboxes.every((checkbox) => checkbox.checked);
        if (allChecked && isRadioChecked !== null) {
            alert('결제가 완료되었습니다. 감사합니다.');
        } else {
            alert('필수 동의 사항을 모두 체크해주십시오.');
        }
    };

    const handleRadioCheck = (e) => {
        setIsRadioChecked(e.target.value);
    };

    const handleCheckboxChange = (id) => {
        setCheckBoxes((prev) =>
            prev.map((checkbox) => (checkbox.id === id ? { ...checkbox, checked: !checkbox.checked } : checkbox))
        );
    };

    return (
        <div id="bucketBoxContainer">
            {location.state == null ? (
                <div>
                    <div id="bucketBoxsubHeader">
                        <div id="bucketBoxTotalProductNumber">상품 총 개수: {bucket.length}</div>
                    </div>

                    {bucket.map((item, index) => (
                        <div id="bucketContainer" key={index}>
                            <img id="bucketBoxImage" src={item.image}></img>
                            <div id="bucketBoxProductName">{item.title.replace(/<b>/g, '').replace(/<\/b>/g, '')}</div>
                            <div id="bucketBoxProductNumber">{item.productNumber}개</div>
                            <div id="bucketBoxProductPrice">
                                {(item.lprice * item.productNumber).toLocaleString('ko-KR')}원
                            </div>
                        </div>
                    ))}
                    {bucket.map((item) => {
                        result = result + item.lprice * item.productNumber;
                    })}
                    <div id="paymentBoxPriceContainer">
                        <div id="paymentBoxPrice">
                            <div id="bucketBoxTotalPrice">상품 금액 </div>
                            <div id="bucketBoxTotalPrice">{result.toLocaleString('ko-KR')}원</div>
                        </div>
                        <div id="couponContainer">
                            <div id="coupon">쿠폰 할인</div>
                            <button className="btn" id="selectCoupon">
                                쿠폰 선택
                            </button>
                            <div id="deductedAmount">- 원</div>
                        </div>
                        <div id="paymentBoxTotalPrice">총 {result.toLocaleString('ko-KR')}원</div>
                    </div>
                </div>
            ) : (
                <div>
                    <div id="bucketBoxsubHeader">
                        <div id="bucketBoxTotalProductNumber">상품 총 개수: 1</div>
                    </div>
                    <div id="bucketContainer">
                        <img id="bucketBoxImage" src={location.state.image}></img>
                        <div id="bucketBoxProductName">
                            {location.state.title.replace(/<b>/g, '').replace(/<\/b>/g, '')}
                        </div>
                        <div id="bucketBoxProductNumber">{location.state.productNumber}개</div>
                        <div id="bucketBoxProductPrice">
                            {(location.state.lprice * location.state.productNumber).toLocaleString('ko-KR')}원
                        </div>
                    </div>
                    <div id="paymentBoxPriceContainer">
                        <div id="paymentBoxPrice">
                            <div id="bucketBoxTotalPrice">상품 금액 </div>
                            <div id="bucketBoxTotalPrice">
                                {(location.state.lprice * location.state.productNumber).toLocaleString('ko-KR')}원
                            </div>
                        </div>
                        <div id="couponContainer">
                            <div id="coupon">쿠폰 할인</div>
                            <button className="btn" id="selectCoupon">
                                쿠폰 선택
                            </button>
                            <div id="deductedAmount">- 원</div>
                        </div>
                        <div id="paymentBoxTotalPrice">
                            총 {(location.state.lprice * location.state.productNumber).toLocaleString('ko-KR')}원
                        </div>
                    </div>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div id="paymentInfoContainer">
                    <div className="guide" id="paymentMethod">
                        결제수단
                    </div>
                    <div id="paymentMethodContainer">
                        <input type="radio" name="payment" value="깍 페이" onChange={handleRadioCheck} /> 깍 페이
                        <br></br>
                        <input type="radio" name="payment" value="토스 페이" onChange={handleRadioCheck} /> 토스 페이
                        <br></br>
                        <input type="radio" name="payment" value="일반 결제" onChange={handleRadioCheck} /> 일반 결제
                        <br></br>
                    </div>
                    <div className="guide">결제 안내</div>
                    <div id="payGuideContainer">
                        {isRadioChecked == '깍 페이' && <div id="GGakPay">GG Pay</div>}
                        {isRadioChecked == '토스 페이' && (
                            <div id="tossPay">ㆍ토스페이: 모든 카드(신용/체크), 계좌 결제 가능, 토스 소액후불결제</div>
                        )}
                        {isRadioChecked == '일반 결제' &&
                            generalPayment.map((item, index) => (
                                <button
                                    className={'generalPaymentBtn' + (item === clickedButton ? ' clicked' : '')}
                                    type="button"
                                    key={index}
                                    onClick={() => {
                                        setClickedButton(item);
                                    }}
                                >
                                    {item}
                                </button>
                            ))}
                    </div>

                    <div className="guide" id="refundGuideTitle">
                        품절 시 환불 안내
                    </div>
                    <div id="refundGuide">
                        ㆍ입점업체 배송은 낮은 확률로 상품이 품절일 가능성이 있습니다. 이에 품절 시 빠르게 환불
                        처리해드립니다.<br></br>ㆍ현금 환불의 경우, 예금정보가 일치해야 환불 처리가 가능합니다. 은행명,
                        계좌번호, 예금주명을 정확히 기재 부탁드립니다.<br></br>
                        ㆍ환불 받으신 날짜 기준으로 3~5일(주말 제외) 후 결제대행사에서 직접 고객님의 계좌로 환불
                        처리됩니다.
                    </div>
                    <div className="guide" id="ordererAgreement">
                        주문자 동의
                    </div>
                    <div id="ordererAgreementContainer">
                        <div id="ordererAgreementGuide">주문 내용을 확인했으며 서비스 약관 및 결제에 동의합니다.</div>
                        {checkboxes.map((checkbox) => (
                            <label key={checkbox.id}>
                                <input
                                    type="checkbox"
                                    checked={checkbox.checked}
                                    onChange={() => handleCheckboxChange(checkbox.id)}
                                />
                                {checkbox.label}
                                <br />
                            </label>
                        ))}
                        <input type="checkbox" name="agreement" />
                        [선택 ] 페이지가 마음에 드신가요?<br></br>
                    </div>
                </div>
                {location.state == null ? (
                    <div id="paymentBoxPayContainer">
                        <input
                            type="submit"
                            className="btn"
                            id="paymentBoxPay"
                            value={`${result.toLocaleString('ko-KR')}원 결제하기`}
                        />
                    </div>
                ) : (
                    <div id="paymentBoxPayContainer">
                        <input
                            type="submit"
                            className="btn"
                            id="paymentBoxPay"
                            value={`${(location.state.productNumber * location.state.lprice).toLocaleString(
                                'ko-KR'
                            )}원 결제하기`}
                        />
                    </div>
                )}
            </form>
        </div>
    );
}
