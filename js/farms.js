// 加载用户农场
async function loadUserFarms() {
    // 实现加载用户农场的逻辑
    // 这里只是示例，需要根据实际合约方法实现
    const farmCount = await contracts.farmNFT.methods.balanceOf(accounts[0]).call();
    const farmListElement = document.getElementById('farmList');
    farmListElement.innerHTML = '';
    
    if (farmCount > 0) {
        for (let i = 0; i < farmCount; i++) {
            const farmId = await contracts.farmNFT.methods.tokenOfOwnerByIndex(accounts[0], i).call();
            
            // 创建农场卡片
            const farmCard = document.createElement('div');
            farmCard.className = 'col-md-4 mb-4';
            farmCard.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title"><i class="fas fa-tractor me-2"></i>农场 #${farmId}</h5>
                        <p class="card-text">奶牛数量: 0/10</p>
                        <div class="d-flex justify-content-between">
                            <button class="btn btn-sm btn-outline-primary view-farm-btn" data-farm-id="${farmId}">查看详情</button>
                            <button class="btn btn-sm btn-outline-secondary sell-farm-btn" data-farm-id="${farmId}">出售</button>
                        </div>
                    </div>
                </div>
            `;
            farmListElement.appendChild(farmCard);
        }
    } else {
        farmListElement.innerHTML = '<div class="col-md-12 text-center"><p>您还没有农场，点击下方按钮购买第一个农场</p></div>';
    }
    
    // 更新农场选择下拉框
    updateFarmSelects();
}

// 购买农场按钮点击事件
document.getElementById('buyFarmBtn').addEventListener('click', function() {
    if (!accounts.length) {
        showStatusModal('错误', '请先连接钱包');
        return;
    }
    
    showTransactionModal(
        '购买农场',
        `<p>确定要花费 <strong>60 GGG</strong> 购买一个新农场吗?</p>
         <p class="text-info">将从您的真实钱包扣除</p>`,
        async function() {
            try {
                const price = web3.utils.toWei('60', 'ether');
                
                // 检查真实GGG余额
                const balance = await contracts.gggToken.methods.balanceOf(accounts[0]).call();
                if (BigInt(balance) < BigInt(price)) {
                    showStatusModal('错误', 'GGG余额不足');
                    return;
                }
                
                // 批准GGG代币
                await contracts.gggToken.methods.approve(contracts.farmNFT.address, price)
                    .send({ from: accounts[0] });
                
                // 购买农场
                const tx = await contracts.farmNFT.methods.buyFarm(price)
                    .send({ from: accounts[0] });
                
                showStatusModal('成功', '农场购买成功!');
                loadUserData();
                
            } catch (error) {
                console.error("购买农场失败:", error);
                showStatusModal('错误', '购买农场失败: ' + error.message);
            }
        }
    );
});

// 施肥按钮点击事件
document.getElementById('fertilizeBtn').addEventListener('click', function() {
    if (!accounts.length) {
        showStatusModal('错误', '请先连接钱包');
        return;
    }
    
    const farmId = document.getElementById('fertilizeFarmId').value;
    if (!farmId) {
        showStatusModal('错误', '请选择农场');
        return;
    }
    
    showTransactionModal(
        '农场施肥',
        `<p>确定要花费 <strong>1 GGG</strong> 为农场 #${farmId} 施肥吗?</p>
         <p class="text-info">将从您的虚拟钱包扣除</p>`,
        async function() {
            try {
                const price = web3.utils.toWei('1', 'ether');
                
                // 检查虚拟GGG余额
                const balance = await contracts.rewardSystem.methods.virtualWalletGGG(accounts[0]).call();
                if (BigInt(balance) < BigInt(price)) {
                    showStatusModal('错误', '虚拟GGG余额不足');
                    return;
                }
                
                // 施肥 - 直接从虚拟钱包扣除
                const tx = await contracts.farmNFT.methods.fertilizeFarm(farmId)
                    .send({ from: accounts[0] });
                
                showStatusModal('成功', `农场 #${farmId} 施肥成功!`);
                loadUserData();
                
            } catch (error) {
                console.error("施肥失败:", error);
                showStatusModal('错误', '施肥失败: ' + error.message);
            }
        }
    );
});

// 收获FGG按钮点击事件
document.getElementById('harvestBtn').addEventListener('click', function() {
    if (!accounts.length) {
        showStatusModal('错误', '请先连接钱包');
        return;
    }
    
    const farmId = document.getElementById('harvestFarmId').value;
    if (!farmId) {
        showStatusModal('错误', '请选择农场');
        return;
    }
    
    showTransactionModal(
        '收获FGG',
        `<p>确定要从农场 #${farmId} 收获FGG代币吗?</p>`,
        async function() {
            try {
                // 收获FGG
                const tx = await contracts.farmNFT.methods.harvestFGG(farmId)
                    .send({ from: accounts[0] });
                
                // 获取收获数量
                const harvestAmount = web3.utils.fromWei(tx.events.Harvested.returnValues.amount, 'ether');
                
                showStatusModal('成功', `从农场 #${farmId} 成功收获 ${harvestAmount} FGG!`);
                loadUserData();
                
            } catch (error) {
                console.error("收获失败:", error);
                showStatusModal('错误', '收获失败: ' + error.message);
            }
        }
    );
});