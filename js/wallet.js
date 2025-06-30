let web3;
let accounts = [];
let contracts = {}; // 存储合约实例

// 连接钱包
async function connectWallet() {
    try {
        let provider;
        if (typeof window.conflux !== 'undefined') {
            provider = window.conflux;
            accounts = await provider.request({ method: 'cfx_requestAccounts' });
            web3 = new Web3(provider);
            
            // 设置Conflux网络检查
            const chainId = await provider.request({ method: 'cfx_chainId' });
            if (chainId !== '0x1') { // Conflux主网chainId
                showStatusModal('错误', '请切换到Conflux主网');
                return;
            }
        } else if (typeof window.ethereum !== 'undefined') {
            provider = window.ethereum;
            accounts = await provider.request({ method: 'eth_requestAccounts' });
            web3 = new Web3(provider);
            
            // 设置Ethereum网络检查
            const chainId = await provider.request({ method: 'eth_chainId' });
            if (chainId !== '0x1') { // Ethereum 主网 chainId
                showStatusModal('错误', '请切换到Ethereum主网');
                return;
            }
        } else {
            showStatusModal('错误', '请安装ConfluxPortal或MetaMask钱包');
            return;
        }
        
        // 初始化合约实例
        await initContracts(web3);

        // 更新UI
        updateWalletInfo();
        loadUserData();

        // 监听账户变化
        provider.on('accountsChanged', (newAccounts) => {
            accounts = newAccounts;
            updateWalletInfo();
            loadUserData();
        });

        // 监听网络变化
        provider.on('chainChanged', (chainId) => {
            if (chainId !== '0x1') {
                showStatusModal('错误', '请切换到主网');
                return;
            }
        });
        
    } catch (error) {
        console.error("连接钱包失败:", error);
        showStatusModal('错误', '连接钱包失败: ' + error.message);
    }
}

// 更新钱包信息
function updateWalletInfo() {
    if (accounts.length > 0) {
        const shortAddress = accounts[0].substring(0, 6) + '...' + accounts[0].substring(38);
        document.getElementById('walletAddress').textContent = shortAddress;
        document.getElementById('walletAddress').classList.remove('d-none');
        document.getElementById('walletAddressShort').textContent = shortAddress;
        document.getElementById('connectWallet').textContent = '已连接';
        document.getElementById('connectWallet').classList.remove('connect-wallet-btn');
        document.getElementById('connectWallet').classList.add('btn-success');
    }
}

// 加载用户数据
async function loadUserData() {
    if (accounts.length > 0) {
        try {
            // 获取真实钱包余额
            const gggBalance = await contracts.gggToken.methods.balanceOf(accounts[0]).call();
            const fggBalance = await contracts.fggToken.methods.balanceOf(accounts[0]).call();

            // 获取虚拟钱包余额
            const virtualGggBalance = await contracts.rewardSystem.methods.virtualWalletGGG(accounts[0]).call();
            const virtualFggBalance = await contracts.rewardSystem.methods.virtualWalletFGG(accounts[0]).call();

            // 更新UI显示
            document.getElementById('gggBalance').textContent = web3.utils.fromWei(gggBalance, 'ether') + ' GGG';
            document.getElementById('fggBalance').textContent = web3.utils.fromWei(fggBalance, 'ether') + ' FGG';
            document.getElementById('virtualGggBalance').textContent = web3.utils.fromWei(virtualGggBalance, 'ether') + ' GGG';
            document.getElementById('virtualFggBalance').textContent = web3.utils.fromWei(virtualFggBalance, 'ether') + ' FGG';

            // 获取用户农场和奶牛
            await loadUserFarms();
            await loadUserCows();

            // 获取奖励中心数据
            await loadRewardData();
            
        } catch (error) {
            console.error("加载用户数据失败:", error);
        }
    }
}

// 初始化合约实例
async function initContracts(web3) {
    // 初始化合约实例并保存到 contracts 对象
    contracts.gggToken = new web3.eth.Contract(gggTokenABI, gggTokenAddress);
    contracts.fggToken = new web3.eth.Contract(fggTokenABI, fggTokenAddress);
    contracts.rewardSystem = new web3.eth.Contract(rewardSystemABI, rewardSystemAddress);
}

// 加载用户农场
async function loadUserFarms() {
    // 根据需求加载农场相关数据
    console.log('加载用户农场');
}

// 加载用户奶牛
async function loadUserCows() {
    // 根据需求加载奶牛相关数据
    console.log('加载用户奶牛');
}

// 获取奖励中心数据
async function loadRewardData() {
    // 根据需求加载奖励中心数据
    console.log('加载奖励中心数据');
}

// 错误弹框显示
function showStatusModal(title, message) {
    // 这里你可以自定义弹框显示
    alert(title + ': ' + message);
}

// 连接钱包按钮点击事件
document.getElementById('connectWallet').addEventListener('click', connectWallet);
