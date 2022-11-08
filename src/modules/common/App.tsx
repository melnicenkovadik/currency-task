import {Suspense, useEffect, useState} from 'react';
import {Route, Link, Outlet, Routes} from "react-router-dom";
import './App.css';
import Converter from "./modules/Converter";
import Courses from "./modules/Courses";
import {getExchangeRates} from "./API";
import Loader from './modules/common/Loader';
// Напишіть SPA для конвертації валют. Для отримання поточних курсів знайдіть та використовуйте будь-яке відкрите API.
// Наприклад: https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json

// example : [
//     {
//         "r030": 36,
//         "txt": "Австралійський долар",
//         "rate": 23.6763,
//         "cc": "AUD",
//         "exchangedate": "09.11.2022"
//     },
//     {
//         "r030": 124,
//         "txt": "Канадський долар",
//         "rate": 27.0858,
//         "cc": "CAD",
//         "exchangedate": "09.11.2022"
//     },
//     {
//         "r030": 156,
//         "txt": "Юань Женьміньбі",
//         "rate": 5.0412,
//         "cc": "CNY",
//         "exchangedate": "09.11.2022"
//     },
//     {
//         "r030": 191,
//         "txt": "Куна",
//         "rate": 4.846,
//         "cc": "HRK",
//         "exchangedate": "09.11.2022"
//     },
//     {
//         "r030": 203,
//         "txt": "Чеська крона",
//         "rate": 1.5005,
//         "cc": "CZK",
//         "exchangedate": "09.11.2022"
//     },
//     {
//         "r030": 208,
//         "txt": "Данська крона",
//         "rate": 4.9122,
//         "cc": "DKK",
//         "exchangedate": "09.11.2022"
//     },
//     {
//         "r030": 344,
//         "txt": "Гонконгівський долар",
//         "rate": 4.6584,
//         "cc": "HKD",
//         "exchangedate": "09.11.2022"
//     },
//     {
//         "r030": 348,
//         "txt": "Форинт",
//         "rate": 0.091182,
//         "cc": "HUF",
//         "exchangedate": "09.11.2022"
//     },
//     {
//         "r030": 356,
//         "txt": "Індійська рупія",
//         "rate": 0.4461,
//         "cc": "INR",
//         "exchangedate": "09.11.2022"
//     },
//     {
//         "r030": 360,
//         "txt": "Рупія",
//         "rate": 0.0023295,
//         "cc": "IDR",
//         "exchangedate": "09.11.2022"
//     },
//     {
//         "r030": 376,
//         "txt": "Новий ізраїльський шекель",
//         "rate": 10.3301,
//         "cc": "ILS",
//         "exchangedate": "09.11.2022"
//     },
//     {
//         "r030": 392,
//         "txt": "Єна",
//         "rate": 0.24973,
//         "cc": "JPY",
//         "exchangedate": "09.11.2022"
//     },
//     {
//         "r030": 398,
//         "txt": "Теньге",
//         "rate": 0.078671,
//         "cc": "KZT",
//         "exchangedate": "09.11.2022"
//     },
//     {
//         "r030": 410,
//         "txt": "Вона",
//         "rate": 0.026408,
//         "cc": "KRW",
//         "exchangedate": "09.11.2022"
//     },
//     {
//         "r030": 484,
//         "txt": "Мексиканське песо",
//         "rate": 1.8791,
//         "cc": "MXN",
//         "exchangedate": "09.11.2022"
//     },
//     {
//         "r030": 498,
//         "txt": "Молдовський лей",
//         "rate": 1.8903,
//         "cc": "MDL",
//         "exchangedate": "09.11.2022"
//     },
//     {
//         "r030": 554,
//         "txt": "Новозеландський долар",
//         "rate": 21.6742,
//         "cc": "NZD",
//         "exchangedate": "09.11.2022"
//     },
//     {
//         "r030": 578,
//         "txt": "Норвезька крона",
//         "rate": 3.5563,
//         "cc": "NOK",
//         "exchangedate": "09.11.2022"
//     },
//     {
//         "r030": 643,
//         "txt": "Російський рубль",
//         "rate": 0.59918,
//         "cc": "RUB",
//         "exchangedate": "09.11.2022"
//     },
//     {
//         "r030": 702,
//         "txt": "Сінгапурський долар",
//         "rate": 26.0646,
//         "cc": "SGD",
//         "exchangedate": "09.11.2022"
//     },
//     {
//         "r030": 710,
//         "txt": "Ренд",
//         "rate": 2.0492,
//         "cc": "ZAR",
//         "exchangedate": "09.11.2022"
//     },
//     {
//         "r030": 752,
//         "txt": "Шведська крона",
//         "rate": 3.3727,
//         "cc": "SEK",
//         "exchangedate": "09.11.2022"
//     },
//     {
//         "r030": 756,
//         "txt": "Швейцарський франк",
//         "rate": 36.8468,
//         "cc": "CHF",
//         "exchangedate": "09.11.2022"
//     },
//     {
//         "r030": 818,
//         "txt": "Єгипетський фунт",
//         "rate": 1.5014,
//         "cc": "EGP",
//         "exchangedate": "09.11.2022"
//     },
//     {
//         "r030": 826,
//         "txt": "Фунт стерлінгів",
//         "rate": 41.8363,
//         "cc": "GBP",
//         "exchangedate": "09.11.2022"
//     },
//     {
//         "r030": 840,
//         "txt": "Долар США",
//         "rate": 36.5686,
//         "cc": "USD",
//         "exchangedate": "09.11.2022"
//     },
//     {
//         "r030": 933,
//         "txt": "Білоруський рубль",
//         "rate": 13.2919,
//         "cc": "BYN",
//         "exchangedate": "09.11.2022"
//     },
//     {
//         "r030": 944,
//         "txt": "Азербайджанський манат",
//         "rate": 21.5528,
//         "cc": "AZN",
//         "exchangedate": "09.11.2022"
//     },
//     {
//         "r030": 946,
//         "txt": "Румунський лей",
//         "rate": 7.4612,
//         "cc": "RON",
//         "exchangedate": "09.11.2022"
//     },
//     {
//         "r030": 949,
//         "txt": "Турецька ліра",
//         "rate": 1.9652,
//         "cc": "TRY",
//         "exchangedate": "09.11.2022"
//     },
//     {
//         "r030": 960,
//         "txt": "СПЗ (спеціальні права запозичення)",
//         "rate": 47.0832,
//         "cc": "XDR",
//         "exchangedate": "09.11.2022"
//     },
//     {
//         "r030": 975,
//         "txt": "Болгарський лев",
//         "rate": 18.6803,
//         "cc": "BGN",
//         "exchangedate": "09.11.2022"
//     },
//     {
//         "r030": 978,
//         "txt": "Євро",
//         "rate": 36.5375,
//         "cc": "EUR",
//         "exchangedate": "09.11.2022"
//     },
//     {
//         "r030": 985,
//         "txt": "Злотий",
//         "rate": 7.7847,
//         "cc": "PLN",
//         "exchangedate": "09.11.2022"
//     },
//     {
//         "r030": 12,
//         "txt": "Алжирський динар",
//         "rate": 0.26034,
//         "cc": "DZD",
//         "exchangedate": "09.11.2022"
//     },
//     {
//         "r030": 50,
//         "txt": "Така",
//         "rate": 0.34208,
//         "cc": "BDT",
//         "exchangedate": "09.11.2022"
//     },
//     {
//         "r030": 51,
//         "txt": "Вірменський драм",
//         "rate": 0.092485,
//         "cc": "AMD",
//         "exchangedate": "09.11.2022"
//     },
//     {
//         "r030": 214,
//         "txt": "Домініканське песо",
//         "rate": 0.67943,
//         "cc": "DOP",
//         "exchangedate": "09.11.2022"
//     },
//     {
//         "r030": 364,
//         "txt": "Іранський ріал",
//         "rate": 0.00087068,
//         "cc": "IRR",
//         "exchangedate": "09.11.2022"
//     },
//     {
//         "r030": 368,
//         "txt": "Іракський динар",
//         "rate": 0.025047,
//         "cc": "IQD",
//         "exchangedate": "09.11.2022"
//     },
//     {
//         "r030": 417,
//         "txt": "Сом",
//         "rate": 0.43792,
//         "cc": "KGS",
//         "exchangedate": "09.11.2022"
//     },
//     {
//         "r030": 422,
//         "txt": "Ліванський фунт",
//         "rate": 0.024258,
//         "cc": "LBP",
//         "exchangedate": "09.11.2022"
//     },
//     {
//         "r030": 434,
//         "txt": "Лівійський динар",
//         "rate": 7.2354,
//         "cc": "LYD",
//         "exchangedate": "09.11.2022"
//     },
//     {
//         "r030": 458,
//         "txt": "Малайзійський ринггіт",
//         "rate": 7.7358,
//         "cc": "MYR",
//         "exchangedate": "09.11.2022"
//     },
//     {
//         "r030": 504,
//         "txt": "Марокканський дирхам",
//         "rate": 3.3434,
//         "cc": "MAD",
//         "exchangedate": "09.11.2022"
//     },
//     {
//         "r030": 586,
//         "txt": "Пакистанська рупія",
//         "rate": 0.16567,
//         "cc": "PKR",
//         "exchangedate": "09.11.2022"
//     },
//     {
//         "r030": 682,
//         "txt": "Саудівський ріял",
//         "rate": 9.734,
//         "cc": "SAR",
//         "exchangedate": "09.11.2022"
//     },
//     {
//         "r030": 704,
//         "txt": "Донг",
//         "rate": 0.0014723,
//         "cc": "VND",
//         "exchangedate": "09.11.2022"
//     },
//     {
//         "r030": 764,
//         "txt": "Бат",
//         "rate": 0.95983,
//         "cc": "THB",
//         "exchangedate": "09.11.2022"
//     },
//     {
//         "r030": 784,
//         "txt": "Дирхам ОАЕ",
//         "rate": 9.9561,
//         "cc": "AED",
//         "exchangedate": "09.11.2022"
//     },
//     {
//         "r030": 788,
//         "txt": "Туніський динар",
//         "rate": 11.1906,
//         "cc": "TND",
//         "exchangedate": "09.11.2022"
//     },
//     {
//         "r030": 860,
//         "txt": "Узбецький сум",
//         "rate": 0.0032708,
//         "cc": "UZS",
//         "exchangedate": "09.11.2022"
//     },
//     {
//         "r030": 901,
//         "txt": "Новий тайванський долар",
//         "rate": 1.13321,
//         "cc": "TWD",
//         "exchangedate": "09.11.2022"
//     },
//     {
//         "r030": 934,
//         "txt": "Туркменський новий манат",
//         "rate": 10.4482,
//         "cc": "TMT",
//         "exchangedate": "09.11.2022"
//     },
//     {
//         "r030": 941,
//         "txt": "Сербський динар",
//         "rate": 0.30893,
//         "cc": "RSD",
//         "exchangedate": "09.11.2022"
//     },
//     {
//         "r030": 972,
//         "txt": "Сомоні",
//         "rate": 3.58,
//         "cc": "TJS",
//         "exchangedate": "09.11.2022"
//     },
//     {
//         "r030": 981,
//         "txt": "Ларі",
//         "rate": 13.2017,
//         "cc": "GEL",
//         "exchangedate": "09.11.2022"
//     },
//     {
//         "r030": 986,
//         "txt": "Бразильський реал",
//         "rate": 6.8424,
//         "cc": "BRL",
//         "exchangedate": "09.11.2022"
//     },
//     {
//         "r030": 959,
//         "txt": "Золото",
//         "rate": 61113.44,
//         "cc": "XAU",
//         "exchangedate": "09.11.2022"
//     },
//     {
//         "r030": 961,
//         "txt": "Срібло",
//         "rate": 758.55,
//         "cc": "XAG",
//         "exchangedate": "09.11.2022"
//     },
//     {
//         "r030": 962,
//         "txt": "Платина",
//         "rate": 35864.29,
//         "cc": "XPT",
//         "exchangedate": "09.11.2022"
//     },
//     {
//         "r030": 964,
//         "txt": "Паладій",
//         "rate": 68871.47,
//         "cc": "XPD",
//         "exchangedate": "09.11.2022"
//     }
// ]

// Користувач має мати змогу додавати валюти в обрані, обрані валюти показуються в списку зверху.
//
// За замовчуванням у користувача має визначатися «базова» валюта, яку може налаштувати.
//
// Основні вимоги:
// - Добре продуманий інтерфейс та зовнішній вигляд.
// - Тести (unit tests, e2e test, component/snapshot tests).
// - Максимальна швидкість роботи програми (як при завантаженні, так і при конвертуванні валют).
// - Live preview реалізованого проект, будь-яка платформа (vercel для прикладу).
//
// Для реалізації використовуйте будь-які бібліотеки, які вважаєте доречними.

function App() {
    const [currencies, setCurrencies] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        setIsFetching(true);
        getExchangeRates()
            .then((data) => {
                setCurrencies(data);
                setIsFetching(false);
            })
            .catch((error) => {
                console.log(error);
                setIsFetching(false);
            });
    }, []);

    return (
        <div className="converter-app">
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={
                        <Suspense fallback={<Loader/>}>
                            <Converter currencies={currencies}/>
                        </Suspense>}/>
                    <Route path="/courses" element={
                        <Suspense fallback={<Loader/>}>
                            <Courses currencies={currencies}/>
                        </Suspense>
                    }/>
                </Route>
            </Routes>
        </div>
    );
}

function Layout() {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Converter</Link>
                    </li>
                    <li>
                        <Link to="/courses">Courses</Link>
                    </li>
                </ul>
            </nav>
            <hr/>
            <Outlet/>
        </div>
    );
}

export default App;
