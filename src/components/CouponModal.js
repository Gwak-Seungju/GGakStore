import { useState } from 'react';

export default function CouponModal({ isOpen, closeModal, amount, setDiscountAmount }) {
    const couponList = [
        { couponName: '첫 방문 할인 쿠폰(-5000원)', 할인율: 0, 할인금액: 5000 },
        { couponName: 'GGak Store 회원 정기 쿠폰(5%)', 할인율: 5, 할인금액: 0 },
        { couponName: 'GGak Store 회원 특별 쿠폰(7%)', 할인율: 7, 할인금액: 0 },
    ];
    const [isRadioChecked, setIsRadioChecked] = useState(null);
    const handleRadioCheck = (e) => {
        setIsRadioChecked(e.target.value);
    };

    return (
        <>
            {isOpen && (
                <>
                    <div id="modalBackground"></div>
                    <form id="modal">
                        <h2>적용 가능 쿠폰 리스트</h2>
                        <div id="couponGuide">쿠폰을 선택해주세요.(중복 선택 불가)</div>
                        <div id="couponListContainer">
                            <div className="couponHeader">쿠폰명</div>
                            <div className="couponHeader">할인율</div>
                            <div className="couponHeader">할인금액</div>
                            {couponList.map((item) => {
                                item['할인금액'] = item.할인금액 + (amount * item.할인율) / 100;
                            })}

                            {couponList.map((item, index) => (
                                <>
                                    <label className="coupon">
                                        <input
                                            type="radio"
                                            name="coupon"
                                            value={item.할인금액}
                                            onChange={handleRadioCheck}
                                        />{' '}
                                        {item.couponName}
                                    </label>
                                    <div className="discountRate"> {item.할인율 === 0 ? ' - ' : item.할인율}% </div>
                                    <div className="discountAmount">{item.할인금액.toLocaleString('ko-KR')}원</div>
                                </>
                            ))}
                        </div>
                        <div id="closeModalBtn">
                            <button onClick={closeModal} className="btn" id="cancelBtn">
                                취소
                            </button>
                            <button
                                onClick={() => {
                                    closeModal();
                                    setDiscountAmount(isRadioChecked);
                                }}
                                className="btn"
                                id="selectCouponBtn"
                            >
                                쿠폰선택
                            </button>
                        </div>
                    </form>
                </>
            )}
        </>
    );
}
