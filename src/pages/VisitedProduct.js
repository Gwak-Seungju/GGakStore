import useStore from '../store/store';

export default function VisitedProduct() {
    const { visitedProduct, clearVisitedProduct } = useStore((state) => state);
    return (
        <div id="visitedProductContainer">
            <div id="visited">
                <div id="visitedHead">visited</div>
                {visitedProduct.length !== 0
                    ? visitedProduct.slice(0, 5).map((item, index) => (
                          <span key={index}>
                              <img id="visitedProductImage" src={item.image} alt={item.mallName}></img>
                          </span>
                      ))
                    : null}

                <button id="visitedProductClearButton" onClick={clearVisitedProduct}>
                    비우기
                </button>
            </div>
        </div>
    );
}
