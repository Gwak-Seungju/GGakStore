import useStore from './store';

export default function VisitedProduct() {
    const { visitedProduct, clearVisitedProduct } = useStore((state) => state);
    return (
        <div id="visitedProductContainer">
            <div id="visited">
                <div id="visitedHead">visited</div>
                {visitedProduct.length !== 0
                    ? visitedProduct.map((item, index) => (
                          <img id="visitedProductImage" src={item.image} alt={item.mallName}></img>
                      ))
                    : null}
                <button onClick={clearVisitedProduct}>비우기</button>
            </div>
        </div>
    );
}
