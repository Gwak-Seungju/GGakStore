import useStore from '../store/store';
import { useLocation } from 'react-router-dom';
import PaymentBox from '../components/PaymentBox';

export default function PaymentPage() {
    const { bucket } = useStore((state) => state);
    const location = useLocation();

    return (
        <>
            {location.state === null ? (
                <PaymentBox purchaseItems={bucket} />
            ) : (
                <PaymentBox purchaseItems={[location.state]} />
            )}
        </>
    );
}
