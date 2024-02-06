import React from 'react';
import useStore from './store/store';
import { useRef, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import CategoryRanking from './components/CategoryRanking';
import SearchBox from './pages/SearchBox';
import ProductBox from './pages/ProductBox';
import BucketBox from './pages/BucketBox';
import PaymentBox from './pages/PaymentBox';
import VisitedProduct from './components/VisitedProduct';
import './styles/App.css';

function App() {
    const { shoppingData, setBtnActive } = useStore((state) => state);
    const inputRef = useRef();
    const navigate = useNavigate();

    const activeButton = () => {
        shoppingData(inputRef.current.value);
        navigate(`/SearchBox/${inputRef.current.value}`);
    };

    const activeEnter = (e) => {
        if (e.key === 'Enter') {
            activeButton();
        }
    };

    const goHome = () => {
        navigate('/');
    };

    useEffect(() => {
        setBtnActive('상의');
        shoppingData('상의');
    }, []);

    return (
        <div id="container">
            <div id="headContainer">
                <div>
                    <div id="title">
                        <h1 id="storeName" onClick={goHome}>
                            GGak Store
                        </h1>
                        <input
                            id="search"
                            placeholder="상품 입력"
                            type="text"
                            ref={inputRef}
                            onKeyDown={(e) => activeEnter(e)}
                        />
                        <button className="btn" onClick={activeButton}>
                            검색
                        </button>
                    </div>
                </div>
                <div>
                    <button
                        onClick={() => {
                            navigate('/BucketBox');
                        }}
                        id="bucket"
                    >
                        장바구니
                    </button>
                </div>
            </div>

            <VisitedProduct />

            <Routes>
                <Route path="/" element={<CategoryRanking />} />
                <Route path="/SearchBox/:product" element={<SearchBox />} />
                <Route path="/ProductBox/:productId/:ranking" element={<ProductBox />} />
                <Route path="/BucketBox" element={<BucketBox />} />
                <Route path="/PaymentBox" element={<PaymentBox />} />
            </Routes>
        </div>
    );
}

export default App;
