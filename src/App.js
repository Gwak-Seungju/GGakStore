import React from 'react';
import useStore from './store/store';
import { useRef } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import MainComponent from './components/MainComponent';
import SearchPage from './pages/SearchPage';
import ProductPage from './pages/ProductPage';
import BucketPage from './pages/BucketPage';
import PaymentPage from './pages/PaymentPage';
import VisitedProduct from './components/VisitedProduct';
import './styles/App.css';

function App() {
    const { shoppingData, bucket } = useStore((state) => state);
    const inputRef = useRef();
    const navigate = useNavigate();

    const activeButton = () => {
        shoppingData(inputRef.current.value);
        navigate(`/SearchPage/${inputRef.current.value}`);
    };

    const activeEnter = (e) => {
        if (e.key === 'Enter') {
            activeButton();
        }
    };

    const goHome = () => {
        navigate('/');
    };

    return (
        <div id="container">
            <div id="headContainer">
                <div id="title">
                    <h1 className="btn" id="storeName" onClick={goHome}>
                        GGak Store
                    </h1>
                    <input
                        id="search"
                        placeholder="상품 입력"
                        type="text"
                        ref={inputRef}
                        onKeyDown={(e) => activeEnter(e)}
                    />
                    <svg
                        focusable="false"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="btn"
                        id="searchBtn"
                        onClick={activeButton}
                    >
                        <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                    </svg>
                </div>

                <div
                    id="bucket"
                    className="btn"
                    onClick={() => {
                        navigate('/BucketPage');
                    }}
                >
                    <div id="bucketNumber">{bucket.length}</div>
                    <svg
                        id="bucketIcon"
                        width="20"
                        height="20"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M6.5 20.5V7.5H23.5V26H11.5M6.5 22V26H10M10.5 10V8.43881C10.5 5.71118 12.5147 3.5 15 3.5C17.4853 3.5 19.5 5.71118 19.5 8.43881V10"
                            stroke="black"
                        ></path>
                    </svg>
                </div>
            </div>

            <VisitedProduct />

            <Routes>
                <Route path="/" element={<MainComponent />} />
                <Route path="/SearchPage/:product" element={<SearchPage />} />
                <Route path="/ProductPage/:productId/:ranking" element={<ProductPage />} />
                <Route path="/BucketPage" element={<BucketPage />} />
                <Route path="/PaymentPage" element={<PaymentPage />} />
            </Routes>
        </div>
    );
}

export default App;
