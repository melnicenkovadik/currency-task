import {ICurrency} from "types";
import useCurrency from "../../hooks/useCurrency";
import {useAppSelector} from "../../hooks/redux";

const Courses = () => {
    const {currencies, addOrRemoveFavorite} = useCurrency();
    const {favoriteCurrencies} = useAppSelector(state => state.currencies);

    if (!currencies || currencies?.length === 0) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h1>Courses</h1>
            <hr/>
            <div>
                {
                    [...favoriteCurrencies, ...currencies
                        .filter((currency: ICurrency) => !favoriteCurrencies.map(a => a.cc).includes(currency.cc))]
                        .map((currency: ICurrency) => {
                            return (
                                <div className={`${currency.isFavorite ? 'favorite currency' : 'currency'}`} key={currency.cc}
                                     onClick={() => addOrRemoveFavorite(currency)}>
                                    <p>1 {currency.cc} ({currency.txt}) = {currency.rate} UAH</p>
                                </div>
                            )
                        })
                }
            </div>
        </div>
    );
}
export default Courses;