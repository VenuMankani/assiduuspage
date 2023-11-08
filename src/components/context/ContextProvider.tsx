import React, { useState, createContext, useEffect } from 'react'

interface IProps {
    children: React.ReactNode
}

interface PageContext {
    screenHeight: any;
    screenWidth: any;
    randomize: boolean;
    setRandomize: any;
    watchlistData: { account: string, month: string, ytd: string }[];
    data: number[];
    data1: number[];
    data2: number[];
    tickLabels: string[];
    showRandomData: boolean;
    shuffleArray: (array: any) => void;
    randomizeTCFData: () => void;
    randomizeInvoiceData: () => void;
    randomizeWatchlistData: () => void;
}

export const PageContext = createContext<PageContext>({} as PageContext);

const ContextProvider = ({ children }: IProps) => {

    const initdata1 = [25, 70, 45, 60, 46, 44];
    const initdata2 = [15, 100, 45, 80, 36, 44];
    let screenWidth;
    let screenHeight;
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const createData = (account: string, month: string, ytd: string) => {
        return { account, month, ytd };
    }
    const initialData = [
        createData('Sales', '1,194.58', '11,418.29'),
        createData('Advertising', '4,879.02', '9,271.36'),
        createData('Inventory', '4,692.26', '9,768.09'),
        createData('Entertainment', '0.00', '0.00'),
        createData('Product', '4,652.10', '2,529.90'),
    ];

    const getWindowSize = () => {
        const { innerWidth, innerHeight } = window;
        return { innerWidth, innerHeight };
    }

    const [windowSize, setWindowSize] = useState(getWindowSize());
    const [randomize, setRandomize] = useState<boolean>(false);
    const [tickLabels, setTickLabels] = useState<string[]>(months);
    const [data1, setData1] = useState<number[]>(initdata1);
    const [data2, setData2] = useState<number[]>(initdata2);
    const [showRandomData, setShowRandomData] = useState<boolean>(false);
    const [data, setData] = useState<number[]>([50, 100, 180, 130, 150, 70]);
    const [watchlistData, setWatchlistData] = useState(initialData);

    // Function to shuffle the data randomly
    const getRandomNumber = () => {
        const randomNumber: any = (Math.random() * 10000).toFixed(2);
        return formatNumberWithComma(randomNumber);
    };

    function formatNumberWithComma(number: number) {
        const numberString = number.toString();
        return numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    // Function to shuffle the numbers randomly
    const randomizeWatchlistData = () => {
        const shuffledData = watchlistData.map((item) => ({
            ...item,
            month: getRandomNumber(),
            ytd: getRandomNumber(),
        }));
        setWatchlistData(shuffledData);
    };

    const randomizeInvoiceData = () => {
        const newData = Array.from({ length: 6 }, () => Math.floor(Math.random() * 180));
        setData(newData);

        const shuffledMonths = shuffleArray([...months]);
        const randomMonths = shuffledMonths.slice(0, 6);
        setTickLabels(randomMonths);
    };

    const randomizeTCFData = () => {
        // Generate random data for data1 and data2
        const randomData1 = Array.from({ length: 6 }, () => Math.floor(Math.random() * 130));
        const randomData2 = Array.from({ length: 6 }, () => Math.floor(Math.random() * 130));

        setData1(randomData1);
        setData2(randomData2);
        setShowRandomData(!showRandomData);

        const shuffledMonths = shuffleArray([...months]);
        const randomMonths = shuffledMonths.slice(0, 6);
        setTickLabels(randomMonths);
    };

    const shuffleArray = (array: any) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }


        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };

    }, []);

    screenHeight = windowSize.innerHeight;
    screenWidth = windowSize.innerWidth;

    const value = {
        screenHeight,
        screenWidth,
        watchlistData,
        data,
        data1,
        data2,
        tickLabels,
        randomize,
        showRandomData,
        setRandomize,
        shuffleArray,
        randomizeTCFData,
        randomizeInvoiceData,
        randomizeWatchlistData
    }

    return <PageContext.Provider value={value}>{children}</PageContext.Provider>
}

export default ContextProvider;
