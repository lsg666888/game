// 合约地址和ABI
const contractAddress = "YOUR_CONTRACT_ADDRESS"; // 替换为你的合约地址
const contractABI = [/* 完整的合约ABI */]; // 替换为你的合约ABI

// 全局变量
let web3;
let farmGameContract;
let accounts = [];
let nfts = [];

// DOM元素
const connectWalletBtn = document.getElementById('connectWallet');
const nftContainer = document.getElementById('nftContainer');
const buyBlindboxBtn = document.getElementById('buyBlindbox');
const nftModal = document.getElementById('nftModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalText = document.getElementById('modalText');
const modalActions = document.getElementById('modalActions');
const nftsTab = document.getElementById('nftsTab');
const blindboxTab = document.getElementById('blindboxTab');
const tabs = document.querySelectorAll('.tab');

// 初始化应用
async function initApp() {
    // 检查是否安装了TokenPocket或其他Web3提供者
    if (window.ethereum || window.web3) {
        try {
            // 请求账户访问
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            web3 = new Web3(window.ethereum);
            
            // 初始化合约
            farmGameContract = new web3.eth.Contract(contractABI, contractAddress);
            
            // 获取账户
            accounts = await web3.eth.getAccounts();
            
            // 更新UI
            updateWalletUI();
            loadNFTs();
            
            // 监听账户变化
            window.ethereum.on('accountsChanged', (newAccounts) => {
                accounts = newAccounts;
                updateWalletUI();
                loadNFTs();
            });
            
            // 监听链变化
            window.ethereum.on('chainChanged', () => {
                window.location.reload();
            });
            
        } catch (error) {
            console.error("Error initializing app:", error);
            alert("连接钱包失败: " + error.message);
        }
    } else {
        alert("请安装TokenPocket或其他Web3钱包应用!");
    }
}

// 更新钱包UI
function updateWalletUI() {
    if (accounts.length > 0) {
        const shortAddress = `${accounts[0].substring(0, 6)}...${accounts[0].substring(38)}`;
        connectWalletBtn.innerHTML = `<i>🔗</i> <span class="wallet-address">${shortAddress}</span>`;
    } else {
        connectWalletBtn.innerHTML = '<i>🔗</i> <span>连接钱包</span>';
    }
}

// 加载用户的NFT
async function loadNFTs() {
    if (!farmGameContract || accounts.length === 0) return;
    
    try {
        nftContainer.innerHTML = '<div class="empty-state"><div class="empty-icon">🔄</div><div>加载中...</div></div>';
        
        // 获取用户拥有的NFT数量
        const balance = await farmGameContract.methods.balanceOf(accounts[0]).call();
        
        if (balance === '0') {
            nftContainer.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">📦</div>
                    <div class="empty-text">你还没有任何NFT</div>
                    <button class="buy-blindbox-btn" onclick="switchTab('blindbox')">购买盲盒</button>
                </div>
            `;
            return;
        }
        
        // 获取每个NFT的tokenId
        const tokenPromises = [];
        for (let i = 0; i < balance; i++) {
            tokenPromises.push(farmGameContract.methods.tokenOfOwnerByIndex(accounts[0], i).call());
        }
        
        const tokenIds = await Promise.all(tokenPromises);
        
        // 获取每个NFT的详细信息
        const nftPromises = tokenIds.map(tokenId => {
            return Promise.all([
                farmGameContract.methods.tokenURI(tokenId).call(),
                farmGameContract.methods.nftInfos(tokenId).call()
            ]).then(([uri, info]) => {
                // 解析tokenURI
                const json = atob(uri.split(',')[1]);
                const data = JSON.parse(json);
                
                return {
                    tokenId,
                    image: data.image,
                    name: data.name,
                    type: data.attributes[0].value,
                    isOpened: info.isOpened,
                    nftType: info.nftType,
                    lastHarvestTime: info.lastHarvestTime,
                    lastFeedTime: info.lastFeedTime,
                    productionRate: data.attributes[1].value,
                    feedRequirement: data.attributes[2].value
                };
            });
        });
        
        nfts = await Promise.all(nftPromises);
        renderNFTs();
        
    } catch (error) {
        console.error("Error loading NFTs:", error);
        nftContainer.innerHTML = '<div class="empty-state"><div class="empty-icon">❌</div><div>加载NFT失败</div></div>';
    }
}

// 渲染NFT列表
function renderNFTs() {
    nftContainer.innerHTML = '';
    
    if (nfts.length === 0) {
        nftContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📦</div>
                <div class="empty-text">你还没有任何NFT</div>
                <button class="buy-blindbox-btn" onclick="switchTab('blindbox')">购买盲盒</button>
            </div>
        `;
        return;
    }
    
    nfts.forEach(nft => {
        const nftCard = document.createElement('div');
        nftCard.className = 'nft-card';
        nftCard.onclick = () => openNFTModal(nft);
        
        // 计算可收获数量
        const harvestAmount = calculateHarvestAmount(nft);
        
        let cardContent = `
            <img src="${nft.image}" class="nft-image" alt="${nft.name}">
            <div class="nft-info">
                <div class="nft-name">${nft.name}</div>
                <div class="nft-type">${nft.type}</div>
                <div class="nft-stats">
                    <span>产出: ${nft.productionRate}</span>
                    <span>饲料: ${nft.feedRequirement}</span>
                </div>
        `;
        
        if (harvestAmount > 0) {
            cardContent += `<div class="harvest-amount">+${harvestAmount}</div>`;
        }
        
        if (!nft.isOpened) {
            cardContent += `
                <div class="blindbox-overlay">
                    <div class="blindbox-text">点击查看盲盒详情</div>
                    <button class="open-blindbox-btn" onclick="event.stopPropagation(); openBlindbox(${nft.tokenId})">开启盲盒</button>
                </div>
            `;
        } else {
            cardContent += `<button class="nft-action" onclick="event.stopPropagation(); harvestNFT(${nft.tokenId})">收获</button>`;
        }
        
        cardContent += `</div>`;
        nftCard.innerHTML = cardContent;
        nftContainer.appendChild(nftCard);
    });
}

// 计算可收获数量
function calculateHarvestAmount(nft) {
    if (!nft.isOpened) return 0;
    
    const now = Math.floor(Date.now() / 1000);
    const lastHarvest = parseInt(nft.lastHarvestTime);
    const lastFeed = parseInt(nft.lastFeedTime);
    
    // 检查是否已喂食
    if (now - lastFeed > 86400) { // 24小时
        return 0;
    }
    
    // 根据NFT类型计算产量
    if (nft.nftType <= 2) { // 奶牛
        const hoursPassed = Math.floor((now - lastHarvest) / 3600);
        const rate = parseInt(nft.productionRate.split(' ')[0]);
        return hoursPassed * rate;
    } else { // 牧场
        const daysPassed = Math.floor((now - lastHarvest) / 86400);
        const rate = parseInt(nft.productionRate.split(' ')[0]);
        return daysPassed * rate;
    }
}

// 打开NFT模态框
function openNFTModal(nft) {
    modalImage.src = nft.image;
    modalTitle.textContent = nft.name;
    modalText.textContent = `类型: ${nft.type} | 产出: ${nft.productionRate} | 饲料: ${nft.feedRequirement}`;
    
    modalActions.innerHTML = '';
    
    if (!nft.isOpened) {
        const openBtn = document.createElement('button');
        openBtn.className = 'modal-btn';
        openBtn.textContent = '开启盲盒';
        openBtn.onclick = () => {
            openBlindbox(nft.tokenId);
            nftModal.classList.remove('active');
        };
        modalActions.appendChild(openBtn);
    } else {
        const harvestBtn = document.createElement('button');
        harvestBtn.className = 'modal-btn';
        harvestBtn.textContent = '收获';
        harvestBtn.onclick = () => {
            harvestNFT(nft.tokenId);
            nftModal.classList.remove('active');
        };
        modalActions.appendChild(harvestBtn);
        
        const feedBtn = document.createElement('button');
        feedBtn.className = 'modal-btn secondary';
        feedBtn.textContent = '喂食';
        feedBtn.onclick = () => {
            feedNFT(nft.tokenId);
            nftModal.classList.remove('active');
        };
        modalActions.appendChild(feedBtn);
    }
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'modal-btn secondary';
    closeBtn.textContent = '关闭';
    closeBtn.onclick = () => nftModal.classList.remove('active');
    modalActions.appendChild(closeBtn);
    
    nftModal.classList.add('active');
}

// 开启盲盒
async function openBlindbox(tokenId) {
    if (!farmGameContract || accounts.length === 0) return;
    
    try {
        buyBlindboxBtn.disabled = true;
        buyBlindboxBtn.innerHTML = '<span class="loading"></span> 处理中...';
        
        await farmGameContract.methods.openBlindBox(tokenId).send({ from: accounts[0] });
        
        // 刷新NFT列表
        await loadNFTs();
        
    } catch (error) {
        console.error("Error opening blind box:", error);
        alert("开启盲盒失败: " + error.message);
    } finally {
        buyBlindboxBtn.disabled = false;
        buyBlindboxBtn.textContent = '购买盲盒';
    }
}

// 收获NFT
async function harvestNFT(tokenId) {
    if (!farmGameContract || accounts.length === 0) return;
    
    try {
        const button = event.target;
        button.disabled = true;
        button.innerHTML = '<span class="loading"></span> 处理中...';
        
        await farmGameContract.methods.harvest(tokenId).send({ from: accounts[0] });
        
        // 刷新NFT列表
        await loadNFTs();
        
    } catch (error) {
        console.error("Error harvesting NFT:", error);
        alert("收获失败: " + error.message);
    }
}

// 喂食NFT
async function feedNFT(tokenId) {
    if (!farmGameContract || accounts.length === 0) return;
    
    try {
        const button = event.target;
        button.disabled = true;
        button.innerHTML = '<span class="loading"></span> 处理中...';
        
        await farmGameContract.methods.feed(tokenId).send({ from: accounts[0] });
        
        // 刷新NFT列表
        await loadNFTs();
        
    } catch (error) {
        console.error("Error feeding NFT:", error);
        alert("喂食失败: " + error.message);
    }
}

// 购买盲盒
async function buyBlindbox() {
    if (!farmGameContract || accounts.length === 0) return;
    
    try {
        buyBlindboxBtn.disabled = true;
        buyBlindboxBtn.innerHTML = '<span class="loading"></span> 处理中...';
        
        await farmGameContract.methods.purchaseBlindBox().send({ from: accounts[0] });
        
        // 刷新NFT列表
        await loadNFTs();
        
        // 切换回NFT标签页
        switchTab('nfts');
        
    } catch (error) {
        console.error("Error buying blind box:", error);
        alert("购买盲盒失败: " + error.message);
    } finally {
        buyBlindboxBtn.disabled = false;
        buyBlindboxBtn.innerHTML = '购买盲盒 <span class="price-tag">100 GGG</span>';
    }
}

// 切换标签页
function switchTab(tabName) {
    tabs.forEach(tab => {
        if (tab.dataset.tab === tabName) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    if (tabName === 'nfts') {
        nftsTab.style.display = 'block';
        blindboxTab.style.display = 'none';
    } else {
        nftsTab.style.display = 'none';
        blindboxTab.style.display = 'block';
    }
}

// 标签点击事件
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        switchTab(tab.dataset.tab);
    });
});

// 事件监听
connectWalletBtn.addEventListener('click', initApp);
buyBlindboxBtn.addEventListener('click', buyBlindbox);

// 初始化
initApp();
