// 合约地址和ABI
const contractAddress = "0xc8De5C417a708a5B3ad2508eca4e93004fa2246c";
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "gggTokenAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "fggTokenAddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "ERC721IncorrectOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ERC721InsufficientApproval",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "approver",
				"type": "address"
			}
		],
		"name": "ERC721InvalidApprover",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "ERC721InvalidOperator",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "ERC721InvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			}
		],
		"name": "ERC721InvalidReceiver",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "ERC721InvalidSender",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ERC721NonexistentToken",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "OwnableInvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "OwnableUnauthorizedAccount",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "approved",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "enum FarmGame.NFTType",
				"name": "nftType",
				"type": "uint8"
			}
		],
		"name": "BlindBoxOpened",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "BlindBoxPurchased",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "enum FarmGame.NFTType",
				"name": "nftType",
				"type": "uint8"
			}
		],
		"name": "ConfigUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "isGGG",
				"type": "bool"
			}
		],
		"name": "Fed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "isGGG",
				"type": "bool"
			}
		],
		"name": "Harvested",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "blindBoxPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "blindBoxRates",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "calculateHarvestAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isGGG",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "feed",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "fggToken",
		"outputs": [
			{
				"internalType": "contract FGGToken",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getApproved",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "gggToken",
		"outputs": [
			{
				"internalType": "contract GGGToken",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "harvest",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "enum FarmGame.NFTType",
				"name": "",
				"type": "uint8"
			}
		],
		"name": "nftConfigs",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "productionRate",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "feedRequirement",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "imageURI",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "nftInfos",
		"outputs": [
			{
				"internalType": "enum FarmGame.NFTType",
				"name": "nftType",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "lastHarvestTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "lastFeedTime",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isOpened",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "openBlindBox",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "purchaseBlindBox",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "newPrice",
				"type": "uint256"
			}
		],
		"name": "setBlindBoxPrice",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "enum FarmGame.NFTType",
				"name": "nftType",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "productionRate",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "feedRequirement",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "imageURI",
				"type": "string"
			}
		],
		"name": "setNFTConfig",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "tokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "withdrawFGG",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "withdrawGGG",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

// GGG代币合约ABI
const gggTokenABI = [
    {
        "constant": false,
        "inputs": [
            {"name": "spender","type": "address"},
            {"name": "value","type": "uint256"}
        ],
        "name": "approve",
        "outputs": [{"name": "","type": "bool"}],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {"name": "owner","type": "address"},
            {"name": "spender","type": "address"}
        ],
        "name": "allowance",
        "outputs": [{"name": "","type": "uint256"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [{"name": "account","type": "address"}],
        "name": "balanceOf",
        "outputs": [{"name": "","type": "uint256"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];

// 全局变量
let web3;
let farmGameContract;
let gggTokenContract;
let accounts = [];
let nfts = [];
let openingAnimation = null;

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
const buyCowTab = document.getElementById('buyCowTab');
const tabs = document.querySelectorAll('.tab');
const progressIndicator = document.getElementById('progressIndicator');
const animationContainer = document.createElement('div');
animationContainer.className = 'animation-container';
document.body.appendChild(animationContainer);

// 盲盒概率显示
const blindboxRates = {
    'CommonCow': '40%',
    'GoldenCow': '9%',
    'RareCow': '1%',
    'BeginnerFarm': '40%',
    'IntermediateFarm': '9%',
    'AdvancedFarm': '1%'
};

// 请求队列系统
class RequestQueue {
    constructor(maxConcurrent = 3, interval = 500) {
        this.queue = [];
        this.maxConcurrent = maxConcurrent;
        this.interval = interval;
        this.activeCount = 0;
    }
    
    add(requestFn) {
        return new Promise((resolve, reject) => {
            this.queue.push({
                requestFn,
                resolve,
                reject
            });
            this.processQueue();
        });
    }
    
    async processQueue() {
        if (this.activeCount >= this.maxConcurrent || this.queue.length === 0) {
            return;
        }
        
        this.activeCount++;
        const { requestFn, resolve, reject } = this.queue.shift();
        
        try {
            const result = await requestFn();
            resolve(result);
        } catch (error) {
            reject(error);
        } finally {
            this.activeCount--;
            setTimeout(() => this.processQueue(), this.interval);
        }
    }
}

// 初始化全局请求队列
const rpcQueue = new RequestQueue(3, 500);

// 带队列的RPC调用
async function safeRpcCall(method, ...args) {
    return rpcQueue.add(() => farmGameContract.methods[method](...args).call());
}

// 带重试机制的RPC调用
async function withRetry(fn, retries = 3, delay = 100) {
    try {
        return await fn();
    } catch (error) {
        if (retries <= 0) throw error;
        await new Promise(resolve => setTimeout(resolve, delay));
        return withRetry(fn, retries - 1, delay * 2);
    }
}

// 缓存系统
const nftCache = {
    get: (account) => {
        const cache = JSON.parse(localStorage.getItem(`nftCache_${account}`)) || {};
        if (cache.timestamp && Date.now() - cache.timestamp < 5 * 60 * 1000) {
            return cache.data;
        }
        return null;
    },
    set: (account, data) => {
        localStorage.setItem(`nftCache_${account}`, JSON.stringify({
            timestamp: Date.now(),
            data
        }));
    },
    clear: (account) => {
        localStorage.removeItem(`nftCache_${account}`);
    }
};

// 显示加载状态
function showLoading(message) {
    animationContainer.innerHTML = `
        <div class="animation-overlay">
            <div class="animation-content">
                <div class="spinner"></div>
                <h3>${message}</h3>
                <p>请等待交易确认...</p>
            </div>
        </div>
    `;
}

// 隐藏加载状态
function hideLoading() {
    animationContainer.innerHTML = '';
}

// 显示成功状态
function showSuccess(message) {
    animationContainer.innerHTML = `
        <div class="animation-overlay">
            <div class="animation-content">
                <div style="font-size: 3rem; color: var(--success);">✓</div>
                <h3>${message}</h3>
                <button class="modal-btn" onclick="hideAnimation()">确定</button>
            </div>
        </div>
    `;
}

// 显示错误状态
function showError(message) {
    animationContainer.innerHTML = `
        <div class="animation-overlay">
            <div class="animation-content">
                <div style="font-size: 3rem; color: var(--danger);">✗</div>
                <h3>操作失败</h3>
                <p>${message}</p>
                <button class="modal-btn" onclick="hideAnimation()">确定</button>
            </div>
        </div>
    `;
}

// 隐藏动画
function hideAnimation() {
    animationContainer.innerHTML = '';
}

// 初始化应用
async function initApp() {
    if (typeof window.ethereum !== 'undefined') {
        web3 = new Web3(window.ethereum);
        try {
            // 请求账户访问
            accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            
            // 初始化合约
            farmGameContract = new web3.eth.Contract(contractABI, contractAddress);
            
            // 获取GGG代币合约地址并初始化
            const gggTokenAddress = await farmGameContract.methods.gggToken().call();
            gggTokenContract = new web3.eth.Contract(gggTokenABI, gggTokenAddress);
            
            // 更新UI
            updateWalletUI();
            loadNFTs();
            updateBlindboxInfo();
            
            // 监听账户变化
            window.ethereum.on('accountsChanged', (newAccounts) => {
                accounts = newAccounts;
                updateWalletUI();
                nftCache.clear(accounts[0]);
                loadNFTs();
            });
            
            // 监听链变化
            window.ethereum.on('chainChanged', () => {
                window.location.reload();
            });
            
        } catch (error) {
            console.error("User denied account access or error occurred:", error);
            showError("连接钱包失败: " + error.message);
        }
    } else {
        showError("请安装MetaMask或其他Web3钱包应用!");
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

// 加载NFT
async function loadNFTs() {
    if (!farmGameContract || accounts.length === 0) return;
    
    try {
        // 检查缓存
        const cachedNFTs = nftCache.get(accounts[0]);
        if (cachedNFTs) {
            renderNFTs(cachedNFTs);
            return;
        }
        
        nftContainer.innerHTML = '<div class="empty-state"><div class="empty-icon">🔄</div><div>加载中...</div></div>';
        progressIndicator.style.display = 'block';
        
        // 获取用户拥有的NFT数量
        const balance = await withRetry(() => safeRpcCall('balanceOf', accounts[0]));
        
        if (balance === '0') {
            showEmptyState();
            progressIndicator.style.display = 'none';
            return;
        }
        
        // 分批次加载NFT
        await loadNFTsInBatches(balance);
        
    } catch (error) {
        console.error("Error loading NFTs:", error);
        showErrorState();
    } finally {
        progressIndicator.style.display = 'none';
    }
}

// 加载NFT批次
async function loadNFTsInBatches(balance) {
    const BATCH_SIZE = 5;
    const DELAY_MS = 200;
    const MAX_TOKENS = 500;
    
    let foundNFTs = 0;
    const allNFTs = [];
    
    for (let i = 1; i <= MAX_TOKENS; i += BATCH_SIZE) {
        const batchPromises = [];
        
        // 创建当前批次的请求
        for (let j = 0; j < BATCH_SIZE && (i + j) <= MAX_TOKENS; j++) {
            batchPromises.push(
                withRetry(() => checkTokenOwnership(i + j))
            );
        }
        
        // 处理当前批次
        const batchResults = await Promise.all(batchPromises);
        const validNFTs = batchResults.filter(nft => nft !== null);
        allNFTs.push(...validNFTs);
        foundNFTs += validNFTs.length;
        
        // 更新进度
        updateProgress(foundNFTs, MAX_TOKENS);
        
        // 添加批次间延迟
        if (i + BATCH_SIZE <= MAX_TOKENS) {
            await new Promise(resolve => setTimeout(resolve, DELAY_MS));
        }
        
        // 如果已经找到所有NFT，提前退出
        if (foundNFTs >= balance) break;
    }
    
    // 缓存结果
    nftCache.set(accounts[0], allNFTs);
    renderNFTs(allNFTs);
}

// 检查Token所有权
async function checkTokenOwnership(tokenId) {
    try {
        const owner = await safeRpcCall('ownerOf', tokenId);
        if (owner.toLowerCase() === accounts[0].toLowerCase()) {
            const [uri, info] = await Promise.all([
                safeRpcCall('tokenURI', tokenId),
                safeRpcCall('nftInfos', tokenId)
            ]);
            
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
        }
        return null;
    } catch (error) {
        // Token不存在或其他错误
        return null;
    }
}

// 更新加载进度
function updateProgress(loaded, total) {
    const percent = Math.min(100, Math.floor((loaded / total) * 100));
    progressIndicator.querySelector('.progress-bar').style.width = `${percent}%`;
    progressIndicator.querySelector('.progress-text').textContent = `加载中... ${percent}%`;
}

// 显示空状态
function showEmptyState() {
    nftContainer.innerHTML = `
        <div class="empty-state">
            <div class="empty-icon">📦</div>
            <div class="empty-text">你还没有任何NFT</div>
            <button class="buy-blindbox-btn" onclick="switchTab('blindbox')">购买盲盒</button>
            <button class="buy-blindbox-btn" onclick="switchTab('buyCow')" style="margin-top: 10px;">购买奶牛</button>
        </div>
    `;
}

// 显示错误状态
function showErrorState() {
    nftContainer.innerHTML = `
        <div class="empty-state">
            <div class="empty-icon">❌</div>
            <div class="empty-text">加载NFT失败</div>
            <button class="nft-action" onclick="loadNFTs()">重试</button>
        </div>
    `;
}

// 渲染NFT列表
function renderNFTs(nfts) {
    nftContainer.innerHTML = '';
    
    if (nfts.length === 0) {
        showEmptyState();
        return;
    }
    
    nfts.forEach(nft => {
        const nftCard = document.createElement('div');
        nftCard.className = 'nft-card';
        nftCard.onclick = () => openNFTModal(nft);
        
        // 计算可收获数量
        const harvestAmount = calculateHarvestAmount(nft);
        
        let cardContent = `
            <img src="${nft.image}" class="nft-image" alt="${nft.name}" onerror="this.src='fallback-nft.png'">
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
    modalImage.onerror = function() {
        this.src = 'fallback-nft.png';
    };
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
        const button = event.target;
        button.disabled = true;
        button.innerHTML = '<span class="loading"></span> 处理中...';
        
        await farmGameContract.methods.openBlindBox(tokenId).send({ from: accounts[0] });
        
        // 清除缓存并刷新NFT列表
        nftCache.clear(accounts[0]);
        await loadNFTs();
        
    } catch (error) {
        console.error("Error opening blind box:", error);
        showError("开启盲盒失败: " + error.message);
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
        
        // 清除缓存并刷新NFT列表
        nftCache.clear(accounts[0]);
        await loadNFTs();
        
    } catch (error) {
        console.error("Error harvesting NFT:", error);
        showError("收获失败: " + error.message);
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
        
        // 清除缓存并刷新NFT列表
        nftCache.clear(accounts[0]);
        await loadNFTs();
        
    } catch (error) {
        console.error("Error feeding NFT:", error);
        showError("喂食失败: " + error.message);
    }
}

// 购买盲盒
async function buyBlindbox() {
    if (!farmGameContract || accounts.length === 0) return;
    
    try {
        buyBlindboxBtn.disabled = true;
        buyBlindboxBtn.innerHTML = '<span class="loading"></span> 处理中...';
        
        // 检查GGG余额
        const price = await farmGameContract.methods.blindBoxPrice().call();
        const balance = await gggTokenContract.methods.balanceOf(accounts[0]).call();
        
        if (BigInt(balance) < BigInt(price)) {
            throw new Error('GGG代币余额不足');
        }
        
        // 检查授权额度
        const allowance = await gggTokenContract.methods.allowance(accounts[0], contractAddress).call();
        if (BigInt(allowance) < BigInt(price)) {
            // 需要先授权
            await gggTokenContract.methods.approve(contractAddress, price).send({ from: accounts[0] });
        }
        
        await farmGameContract.methods.purchaseBlindBox().send({ from: accounts[0] });
        
        // 清除缓存并刷新NFT列表
        nftCache.clear(accounts[0]);
        await loadNFTs();
        
        // 切换回NFT标签页
        switchTab('nfts');
        
    } catch (error) {
        console.error("Error buying blind box:", error);
        showError("购买盲盒失败: " + error.message);
    } finally {
        buyBlindboxBtn.disabled = false;
        buyBlindboxBtn.innerHTML = '购买盲盒 <span class="price-tag">100 GGG</span>';
    }
}

// 购买奶牛
async function buyCow(cowType) {
    if (!farmGameContract || accounts.length === 0) return;
    
    try {
        // 显示加载状态
        showLoading(`正在购买${getCowName(cowType)}...`);
        
        // 根据不同类型设置价格（使用GGG代币）
        let priceInGGG;
        switch(cowType) {
            case 1: // 普通奶牛
                priceInGGG = web3.utils.toWei('100', 'ether'); // 100 GGG
                break;
            case 2: // 黄金奶牛
                priceInGGG = web3.utils.toWei('500', 'ether'); // 500 GGG
                break;
            case 3: // 稀有奶牛
                priceInGGG = web3.utils.toWei('1000', 'ether'); // 1000 GGG
                break;
            default:
                throw new Error('未知奶牛类型');
        }
        
        // 检查用户是否有足够的GGG余额
        const gggBalance = await gggTokenContract.methods.balanceOf(accounts[0]).call();
        if (BigInt(gggBalance) < BigInt(priceInGGG)) {
            throw new Error('GGG代币余额不足');
        }
        
        // 检查合约是否有足够的授权额度
        const allowance = await gggTokenContract.methods.allowance(accounts[0], contractAddress).call();
        if (BigInt(allowance) < BigInt(priceInGGG)) {
            // 需要先授权
            await gggTokenContract.methods.approve(contractAddress, priceInGGG).send({ from: accounts[0] });
        }
        
        // 调用购买盲盒函数（因为我们没有专门的购买奶牛函数）
        await farmGameContract.methods.purchaseBlindBox().send({ from: accounts[0] });
        
        // 显示购买成功
        showSuccess(`成功购买${getCowName(cowType)}!`);
        
        // 刷新NFT列表
        nftCache.clear(accounts[0]);
        await loadNFTs();
        
    } catch (error) {
        console.error("购买失败:", error);
        showError(`购买失败: ${error.message}`);
    } finally {
        hideLoading();
    }
}

// 辅助函数：获取奶牛名称
function getCowName(cowType) {
    const names = ['', '普通奶牛', '黄金奶牛', '稀有奶牛'];
    return names[cowType] || '未知奶牛';
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
        buyCowTab.style.display = 'none';
    } else if (tabName === 'blindbox') {
        nftsTab.style.display = 'none';
        blindboxTab.style.display = 'block';
        buyCowTab.style.display = 'none';
    } else if (tabName === 'buyCow') {
        nftsTab.style.display = 'none';
        blindboxTab.style.display = 'none';
        buyCowTab.style.display = 'block';
    }
}

// 显示盲盒概率信息
function updateBlindboxInfo() {
    const infoContainer = document.createElement('div');
    infoContainer.className = 'rates-container';
    
    let html = '<h4>盲盒概率分布</h4><ul class="rates-list">';
    for (const [type, rate] of Object.entries(blindboxRates)) {
        html += `<li><span class="nft-type">${type}</span><span class="rate-badge">${rate}</span></li>`;
    }
    html += '</ul>';
    
    infoContainer.innerHTML = html;
    blindboxTab.querySelector('.section-title').after(infoContainer);
}

// 禁用所有按钮
function disableAllButtons() {
    document.querySelectorAll('button').forEach(btn => {
        btn.disabled = true;
    });
}

// 启用所有按钮
function enableAllButtons() {
    document.querySelectorAll('button').forEach(btn => {
        btn.disabled = false;
    });
}

// 事件监听
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        switchTab(tab.dataset.tab);
    });
});

connectWalletBtn.addEventListener('click', initApp);
buyBlindboxBtn.addEventListener('click', buyBlindbox);

// 初始化应用
initApp();
