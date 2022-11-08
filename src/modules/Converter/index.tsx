import {useState} from 'react';
import useCurrency from "../../hooks/useCurrency";
import {ICurrency} from "../../types";
// *Конвертер із однієї валюти до іншої. На цій сторінці має бути текстове поле, в яке можна ввести текст у вигляді 15 usd in uah та отримати результат.

const Converter = () => {
    const {currencies} = useCurrency();
    const [selectedCurrency, setSelectedCurrency] = useState<string>('UAH');
    const [anotherCurrency, setAnotherCurrency] = useState<string>('');
    const [amount, setAmount] = useState<number>(0);
    const [result, setResult] = useState<number>(0);

    if (!currencies) {
        return <div>Loading...</div>;
    }


    const convertHandler = () => {
        if (selectedCurrency === anotherCurrency) {
            setResult(amount);
        }
        if (!anotherCurrency || anotherCurrency === '') {
            setResult(0);
            return
        }
        const selectedCurrencyObj: ICurrency = currencies.find((currency: ICurrency) => currency.cc === selectedCurrency) ?? null;
        const anotherCurrencyObj: ICurrency = currencies.find((currency: ICurrency) => currency.cc === anotherCurrency);

        if (!selectedCurrencyObj) {
            setResult(amount * anotherCurrencyObj.rate);
        } else {
            setResult(amount * anotherCurrencyObj.rate / selectedCurrencyObj.rate);
        }
    }

    return (
        <>
            <h1>Converter
            </h1>
            <hr/>
            <div className='converter'>

                <select
                    value={selectedCurrency}
                    onChange={(e) => setSelectedCurrency(e.target.value)}>
                    <option value={'UAH'}>UAH (Украинская гривна)</option>
                    {currencies.map((currency: ICurrency) => (
                        <option
                            disabled={currency.cc !== 'UAH'}
                            key={currency.cc}
                            value={currency.cc}>
                            {currency.cc}({currency.txt})
                        </option>
                    ))}
                </select>
                <br/>
                <select
                    value={anotherCurrency}
                    defaultValue={''}
                    onChange={(e) => setAnotherCurrency(e.target.value)}>
                    <option value={''}>Select currency</option>
                    {currencies.map((currency: ICurrency) => (
                        <option
                            key={currency.cc}
                            value={currency.cc}>
                            {currency.cc}({currency.txt})
                        </option>
                    ))}
                </select>
                <div className='result'>
                    Result: {result} {selectedCurrency}
                </div>
                <input type="number" value={amount} onChange={(e) => setAmount(+e.target.value)}/>
                <button disabled={!anotherCurrency || amount <= 0} onClick={convertHandler}>Convert</button>
                <br/>

            </div>
        </>
    );
}

export default Converter;