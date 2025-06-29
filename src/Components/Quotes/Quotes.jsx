import React, {useState, useEffect} from 'react';
import quotes from '../../assets/QuotesData/QuoteData';
import './Quotes.css'

const Quotes = () => {
    const [quoteIndex, setQuoteIndex] = useState(0);

    const getRandomIndex = () => {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * quotes.length);
        } while (newIndex === quoteIndex);
        return newIndex;
    };

    const handlePrevious = () => {
        setQuoteIndex((prevIndex) => (prevIndex -1 + quotes.length) % quotes.length)
    };

    const handleNext = () => {
        setQuoteIndex(getRandomIndex());
    };

    const currentQuote = quotes[quoteIndex];

    useEffect(() => {
        const interval = setInterval(() => {
            setQuoteIndex(getRandomIndex());
        }, 30000);

        return() => clearInterval(interval)
    }, [quoteIndex]);

    return(
        <div className="quotes-container">
            <div className="quote-card">
                <h2 className="quote-title">Quotes</h2>

                <div className="quote-content">
                    <button className="nav-button" onClick={handlePrevious}>
                        &lt;
                    </button>

                    <div className="quote-text">
                        <p className="quote">
                            "{currentQuote.text}"
                        </p>
                        <p className="author">
                            - {currentQuote.author}
                        </p>
                    </div>

                    <button className="nav-button" onClick={handleNext}>
                        &gt;
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Quotes;