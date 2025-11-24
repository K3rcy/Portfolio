'use server'

export async function Rates(){
    const rates = await fetch(
        `https://api.exchangerate.host/live?access_key=${process.env.EXCHANGERATE_API_KEY}&source=PLN&currencies=USD,EUR,GBP`
    );

    if(!rates.ok){
        const text = await rates.text();
        throw new Error(`Error occured: ${rates.status}, ${text}`);
    }

    const ratesResponse = await rates.json();
    return {
        "base": `${ratesResponse.source}`,
        "rates": {
            "USD": ratesResponse.quotes.PLNUSD,
            "EUR": ratesResponse.quotes.PLNEUR,
            "GBP": ratesResponse.quotes.PLNGBP
  }
    };
}