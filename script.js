const cryptoBox = document.getElementById('crypto-data');

async function getCryptoData() {
    try {
        await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1')
        .then(response => response.json())
        .then(data => {
            cryptoBox.innerHTML = '';
            data.forEach(crypto => {
                const subiu = crypto.price_change_percentage_24h >= 0;
                const estiloCard = subiu 
                ? "border-zinc-600 bg-zinc-900/50 text-white" 
                : "border-zinc-900 bg-black text-zinc-500 opacity-60";
                const badgeEstilo = subiu
                ? "bg-zinc-200 text-black font-bold"
                : "bg-zinc-800 text-zinc-500";
                const tendenciaIcone = subiu ? '▲' : '▼';
                const card = document.createElement('div');
                card.className = `border rounded-xl p-5 transition-all duration-300 hover:scale-105 flex flex-col justify-between shadow-lg ${estiloCard}`;
                card.innerHTML = `
                <div class="flex items-center justify-between mb-4">
                    <div>
                        <h2 class="text-lg font-bold tracking-wide text-zinc-100">${crypto.name}</h2>
                        <span class="text-xs uppercase font-mono px-2 py-0.5 rounded ${badgeEstilo}">
                            ${crypto.symbol}
                        </span>
                    </div>
                    <img src="${crypto.image}" alt="${crypto.name}" class="w-8 h-8 ${subiu ? 'opacity-90' : 'opacity-40'}" />
                </div>
                <div class="mt-2 flex justify-between items-end">
                    <div>
                        <p class="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Preço Atual</p>
                        <p class="text-xl font-mono font-bold mt-0.5 ${subiu ? 'text-white' : 'text-zinc-400'}">
                            $${crypto.current_price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </p>
                    </div>
                    <div class="text-sm font-mono ${subiu ? 'text-zinc-300' : 'text-zinc-600'}">
                        ${tendenciaIcone} ${crypto.price_change_percentage_24h.toFixed(2)}%
                    </div>
                </div>
            `;
            cryptoBox.appendChild(card);
            })
        })
    } catch (error) {
        console.error('Error fetching crypto data:', error);
    }
}

getCryptoData();