import { Link } from 'react-router-dom';
import useStore from './store';
import './App.css';

export default function SearchBox() {
    const { items } = useStore((state) => state);

    return (
        <div id="searchBoxContainer">
            {items.map((item, index) => (
                <div id="searchBoxProduct" key={index}>
                    <div id="searchBoxRanking">{index + 1}위</div>
                    <Link to={`/ProductBox/${item.productId}/${index + 1}`}>
                        <img id="searchBoxProductImage" src={item.image} alt={item.mallnmae}></img>
                    </Link>
                    <div id="searchBoxProductName">{item.title.replace(/<b>/g, '').replace(/<\/b>/g, '')}</div>
                    <br></br>
                    <span id="searchBoxProductPrice">{(1 * item.lprice).toLocaleString('ko-KR')}</span>
                    <span>원</span>
                </div>
            ))}
        </div>
    );
}
