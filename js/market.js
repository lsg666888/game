// 加载市场数据
async function loadMarketData() {
    if (!accounts.length) return;
    
    try {
        // 加载农场市场
        const farmOrders = await contracts.market.methods.getFarmOrders().call();
        const farmMarketList = document.getElementById('farmMarketList');
        farmMarketList.innerHTML = '';
        
        if (farmOrders.length > 0) {
            farmOrders.forEach(order => {
                const orderItem = document.createElement('div');
                orderItem.className = 'list-group-item';
                orderItem.innerHTML = `
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h6>农场 #${order.farmId}</h6>
                            <small>卖家: ${order.seller.substring(0, 6)}...${order.seller.substring(38)}</small>
                        </div>
                        <div>
                            <span class="badge bg-primary rounded-pill">${web3.utils.fromWei(order.price, 'ether')} GGG</span>
                            <button class="btn btn-sm btn-success ms-2 buy-farm-btn" data-order-id="${order.id}">购买</button>
                        </div>
                    </div>
                `;
                farmMarketList.appendChild(orderItem);
            });
        } else {
            farmMarketList.innerHTML = '<div class="list-group-item text-center"><p>市场中没有农场出售</p></div>';
        }
        
        // 加载奶牛市场
        const cowOrders = await contracts.market.methods.getCowOrders().call();
        const cowMarketList = document.getElementById('cowMarketList');
        cowMarketList.innerHTML = '';
        
        if (cowOrders.length > 0) {
            cowOrders.forEach(order => {
                const orderItem = document.createElement('div');
                orderItem.className = 'list-group-item';
                orderItem.innerHTML = `
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h6>奶牛 #${order.cowId} (${order.cowType == 1 ? '普通' : '黄金'})</h6>
                            <small>卖家: ${order.seller.substring(0, 6)}...${order.seller.substring(38)}</small>
                        </div>
                        <div>
                            <span class="badge bg-primary rounded-pill">${web3.utils.fromWei(order.price, 'ether')} GGG</span>
                            <button class="btn btn-sm btn-success ms-2 buy-cow-btn" data-order-id="${order.id}">购买</button>
                        </div>
                    </div>
                `;
                cowMarketList.appendChild(orderItem);
            });
        } else {
            cowMarketList.innerHTML = '<div class="list-group-item text-center"><p>市场中没有奶牛出售</p></div>';
        }
        
        // 加载我的出售订单
        const mySellOrders = await contracts.market.methods.getMySellOrders(accounts[0]).call();
        const mySellOrdersList = document.getElementById('mySellOrders');
        mySellOrdersList.innerHTML = '';
        
        if (mySellOrders.length > 0) {
            mySellOrders.forEach(order => {
                const orderItem = document.createElement('div');
                orderItem.className = 'list-group-item';
                
                if (order.isFarm) {
                    orderItem.innerHTML = `
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h6>农场 #${order.assetId}</h6>
                                <small>状态: 出售中</small>
                            </div>
                            <div>
                                <span class="badge bg-primary rounded-pill">${web3.utils.fromWei(order.price, 'ether')} GGG</span>
                                <button class="btn btn-sm btn-danger ms-2 cancel-order-btn" data-order-id="${order.id}">取消</button>
                            </div>
                        </div>
                    `;
                } else {
                    orderItem.innerHTML = `
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h6>奶牛 #${order.assetId} (${order.cowType == 1 ? '普通' : '黄金'})</h6>
                                <small>状态: 出售中</small>
                            </div>
                            <div>
                                <span class="badge bg-primary rounded-pill">${web3.utils.fromWei(order.price, 'ether')} GGG</span>
                                <button class="btn btn-sm btn-danger ms-2 cancel-order-btn" data-order-id="${order.id}">取消</button>
                            </div>
                        </div>
                    `;
                }
                
                mySellOrdersList.appendChild(orderItem);
            });
        } else {
            mySellOrdersList.innerHTML = '<div class="list-group-item text-center"><p>您没有出售中的订单</p></div>';
        }
        
    } catch (error) {
        console.error("加载市场数据失败:", error);
    }
}

// 上架农场按钮点击事件
document.getElementById('sellFarmBtn').addEventListener('click', function() {
    if (!accounts.length) {
        showStatusModal('错误', '请先连接钱包');
        return;
    }
    
    const farmId = document.getElementById('sellFarmId').value;
    const price = document.getElementById('farmPrice').value;
    
    if (!farmId) {
        showStatusModal('错误', '请选择农场');
        return;
    }
    
    if (!price || parseFloat(price) <= 0) {
        showStatusModal('错误', '请输入有效的价格');
        return;
    }
    
    showTransactionModal(
        '上架农场',
        `<p>确定要将农场 #${farmId} 以 <strong>${price} GGG</strong> 的价格上架出售吗?</p>`,
        async function() {
            try {
                const priceInWei = web3.utils.toWei(price, 'ether');
                
                // 批准农场NFT
                await contracts.farmNFT.methods.approve(contracts.market.address, farmId)
                    .send({ from: accounts[0] });
                
                // 上架农场
                const tx = await contracts.market.methods.sellFarm(farmId, priceInWei)
                    .send({ from: accounts[0] });
                
                showStatusModal('成功', `农场 #${farmId} 已上架出售!`);
                loadMarketData();
                
            } catch (error) {
                console.error("上架农场失败:", error);
                showStatusModal('错误', '上架农场失败: ' + error.message);
            }
        }
    );
});

// 上架奶牛按钮点击事件
document.getElementById('sellCowBtn').addEventListener('click', function() {
    if (!accounts.length) {
        showStatusModal('错误', '请先连接钱包');
        return;
    }
    
    const cowId = document.getElementById('sellCowId').value;
    const price = document.getElementById('cowPrice').value;
    
    if (!cowId) {
        showStatusModal('错误', '请选择奶牛');
        return;
    }
    
    if (!price || parseFloat(price) <= 0) {
        showStatusModal('错误', '请输入有效的价格');
        return;
    }
    
    showTransactionModal(
        '上架奶牛',
        `<p>确定要将奶牛 #${cowId} 以 <strong>${price} GGG</strong> 的价格上架出售吗?</p>`,
        async function() {
            try {
                const priceInWei = web3.utils.toWei(price, 'ether');
                
                // 批准奶牛NFT
                await contracts.cowNFT.methods.approve(contracts.market.address, cowId)
                    .send({ from: accounts[0] });
                
                // 上架奶牛
                const tx = await contracts.market.methods.sellCow(cowId, priceInWei)
                    .send({ from: accounts[0] });
                
                showStatusModal('成功', `奶牛 #${cowId} 已上架出售!`);
                loadMarketData();
                
            } catch (error) {
                console.error("上架奶牛失败:", error);
                showStatusModal('错误', '上架奶牛失败: ' + error.message);
            }
        }
    );
});

// 市场购买按钮事件委托
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('buy-farm-btn')) {
        const orderId = e.target.getAttribute('data-order-id');
        buyFarmOrder(orderId);
    }
    
    if (e.target.classList.contains('buy-cow-btn')) {
        const orderId = e.target.getAttribute('data-order-id');
        buyCowOrder(orderId);
    }
    
    if (e.target.classList.contains('cancel-order-btn')) {
        const orderId = e.target.getAttribute('data-order-id');
        cancelOrder(orderId);
    }
});

// 购买农场订单
async function buyFarmOrder(orderId) {
    if (!accounts.length) {
        showStatusModal('错误', '请先连接钱包');
        return;
    }
    
    try {
        // 获取订单详情
        const order = await contracts.market.methods.getFarmOrder(orderId).call();
        
        showTransactionModal(
            '购买农场',
            `<p>确定要花费 <strong>${web3.utils.fromWei(order.price, 'ether')} GGG</strong> 购买农场 #${order.farmId} 吗?</p>
             <p>卖家: ${order.seller.substring(0, 6)}...${order.seller.substring(38)}</p>`,
            async function() {
                try {
                    // 检查GGG余额
                    const balance = await contracts.gggToken.methods.balanceOf(accounts[0]).call();
                    if (BigInt(balance) < BigInt(order.price)) {
                        showStatusModal('错误', 'GGG余额不足');
                        return;
                    }
                    
                    // 批准GGG代币
                    await contracts.gggToken.methods.approve(contracts.market.address, order.price)
                        .send({ from: accounts[0] });
                    
                    // 购买农场
                    const tx = await contracts.market.methods.buyFarm(orderId)
                        .send({ from: accounts[0] });
                    
                    showStatusModal('成功', `农场 #${order.farmId} 购买成功!`);
                    loadUserData();
                    loadMarketData();
                    
                } catch (error) {
                    console.error("购买农场失败:", error);
                    showStatusModal('错误', '购买农场失败: ' + error.message);
                }
            }
        );
        
    } catch (error) {
        console.error("获取订单详情失败:", error);
        showStatusModal('错误', '获取订单详情失败: ' + error.message);
    }
}

// 购买奶牛订单
async function buyCowOrder(orderId) {
    if (!accounts.length) {
        showStatusModal('错误', '请先连接钱包');
        return;
    }
    
    try {
        // 获取订单详情
        const order = await contracts.market.methods.getCowOrder(orderId).call();
        
        showTransactionModal(
            '购买奶牛',
            `<p>确定要花费 <strong>${web3.utils.fromWei(order.price, 'ether')} GGG</strong> 购买奶牛 #${order.cowId} 吗?</p>
             <p>卖家: ${order.seller.substring(0, 6)}...${order.seller.substring(38)}</p>`,
            async function() {
                try {
                    // 检查GGG余额
                    const balance = await contracts.gggToken.methods.balanceOf(accounts[0]).call();
                    if (BigInt(balance) < BigInt(order.price)) {
                        showStatusModal('错误', 'GGG余额不足');
                        return;
                    }
                    
                    // 批准GGG代币
                    await contracts.gggToken.methods.approve(contracts.market.address, order.price)
                        .send({ from: accounts[0] });
                    
                    // 购买奶牛
                    const tx = await contracts.market.methods.buyCow(orderId)
                        .send({ from: accounts[0] });
                    
                    showStatusModal('成功', `奶牛 #${order.cowId} 购买成功!`);
                    loadUserData();
                    loadMarketData();
                    
                } catch (error) {
                    console.error("购买奶牛失败:", error);
                    showStatusModal('错误', '购买奶牛失败: ' + error.message);
                }
            }
        );
        
    } catch (error) {
        console.error("获取订单详情失败:", error);
        showStatusModal('错误', '获取订单详情失败: ' + error.message);
    }
}

// 取消订单
async function cancelOrder(orderId) {
    if (!accounts.length) {
        showStatusModal('错误', '请先连接钱包');
        return;
    }
    
    showTransactionModal(
        '取消订单',
        `<p>确定要取消这个出售订单吗?</p>`,
        async function() {
            try {
                // 取消订单
                const tx = await contracts.market.methods.cancelOrder(orderId)
                    .send({ from: accounts[0] });
                
                showStatusModal('成功', '订单取消成功!');
                loadUserData();
                loadMarketData();
                
            } catch (error) {
                console.error("取消订单失败:", error);
                showStatusModal('错误', '取消订单失败: ' + error.message);
            }
        }
    );
}

// 初始化市场标签页点击事件
document.querySelectorAll('#marketTabs .nav-link').forEach(tab => {
    tab.addEventListener('click', function() {
        if (this.id === 'buy-tab' || this.id === 'my-orders-tab') {
            loadMarketData();
        }
    });
});