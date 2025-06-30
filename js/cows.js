// 加载用户奶牛
async function loadUserCows() {
    // 实现加载用户奶牛的逻辑
    // 这里只是示例，需要根据实际合约方法实现
    const cowCount = await contracts.cowNFT.methods.balanceOf(accounts[0]).call();
    const cowListElement = document.getElementById('cowList');
    cowListElement.innerHTML = '';
    
    if (cowCount > 0) {
        for (let i = 0; i < cowCount; i++) {
            const cowId = await contracts.cowNFT.methods.tokenOfOwnerByIndex(accounts[0], i).call();
            const cowType = await contracts.cowNFT.methods.cowType(cowId).call();
            const typeName = cowType == 1 ? '普通奶牛' : '黄金奶牛';
            const typeClass = cowType == 1 ? 'text-primary' : 'text-warning';
            
            // 创建奶牛卡片
            const cowCard = document.createElement('div');
            cowCard.className = 'col-md-4 mb-4';
            cowCard.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title"><i class="fas fa-cow me-2 ${typeClass}"></i>${typeName} #${cowId}</h5>
                        <p class="card-text">状态: 正常</p>
                        <div class="d-flex justify-content-between">
                            <button class="btn btn-sm btn-outline-primary view-cow-btn" data-cow-id="${cowId}">查看详情</button>
                            <button class="btn btn-sm btn-outline-secondary sell-cow-btn" data-cow-id="${cowId}">出售</button>
                        </div>
                    </div>
                </div>
            `;
            cowListElement.appendChild(cowCard);
        }
    } else {
        cowListElement.innerHTML = '<div class="col-md-12 text-center"><p>您还没有奶牛，点击下方按钮购买第一头奶牛</p></div>';
    }
    
    // 更新奶牛选择下拉框
    updateCowSelects();
}

// 购买普通奶牛按钮点击事件
document.getElementById('buyRegularCowBtn').addEventListener('click', function() {
    if (!accounts.length) {
        showStatusModal('错误', '请先连接钱包');
        return;
    }
    
    showTransactionModal(
        '购买普通奶牛',
        `<p>确定要花费 <strong>60 GGG</strong> 购买一头普通奶牛吗?</p>`,
        async function() {
            try {
                const price = web3.utils.toWei('60', 'ether');
                
                // 检查GGG余额
                const balance = await contracts.gggToken.methods.balanceOf(accounts[0]).call();
                if (BigInt(balance) < BigInt(price)) {
                    showStatusModal('错误', 'GGG余额不足');
                    return;
                }
                
                // 批准GGG代币
                await contracts.gggToken.methods.approve(contracts.cowNFT.address, price)
                    .send({ from: accounts[0] });
                
                // 购买奶牛
                const tx = await contracts.cowNFT.methods.buyCow(1, price) // 1表示普通奶牛
                    .send({ from: accounts[0] });
                
                showStatusModal('成功', '普通奶牛购买成功!');
                loadUserData();
                
            } catch (error) {
                console.error("购买奶牛失败:", error);
                showStatusModal('错误', '购买奶牛失败: ' + error.message);
            }
        }
    );
});

// 购买黄金奶牛按钮点击事件
document.getElementById('buyGoldenCowBtn').addEventListener('click', function() {
    if (!accounts.length) {
        showStatusModal('错误', '请先连接钱包');
        return;
    }
    
    showTransactionModal(
        '购买黄金奶牛',
        `<p>确定要花费 <strong>120 GGG</strong> 购买一头黄金奶牛吗?</p>`,
        async function() {
            try {
                const price = web3.utils.toWei('120', 'ether');
                
                // 检查GGG余额
                const balance = await contracts.gggToken.methods.balanceOf(accounts[0]).call();
                if (BigInt(balance) < BigInt(price)) {
                    showStatusModal('错误', 'GGG余额不足');
                    return;
                }
                
                // 批准GGG代币
                await contracts.gggToken.methods.approve(contracts.cowNFT.address, price)
                    .send({ from: accounts[0] });
                
                // 购买奶牛
                const tx = await contracts.cowNFT.methods.buyCow(2, price) // 2表示黄金奶牛
                    .send({ from: accounts[0] });
                
                showStatusModal('成功', '黄金奶牛购买成功!');
                loadUserData();
                
            } catch (error) {
                console.error("购买奶牛失败:", error);
                showStatusModal('错误', '购买奶牛失败: ' + error.message);
            }
        }
    );
});

// 喂养奶牛按钮点击事件
document.getElementById('feedCowBtn').addEventListener('click', function() {
    if (!accounts.length) {
        showStatusModal('错误', '请先连接钱包');
        return;
    }
    
    const cowId = document.getElementById('feedCowId').value;
    if (!cowId) {
        showStatusModal('错误', '请选择奶牛');
        return;
    }
    
    const feedType = document.querySelector('input[name="feedType"]:checked').value;
    const fggAmount = feedType === 'regular' ? '1' : '2';
    
    showTransactionModal(
        '喂养奶牛',
        `<p>确定要花费 <strong>${fggAmount} FGG</strong> 喂养奶牛 #${cowId} 吗?</p>`,
        async function() {
            try {
                const amount = web3.utils.toWei(fggAmount, 'ether');
                
                // 检查FGG余额
                const balance = await contracts.fggToken.methods.balanceOf(accounts[0]).call();
                if (BigInt(balance) < BigInt(amount)) {
                    showStatusModal('错误', 'FGG余额不足');
                    return;
                }
                
                // 批准FGG代币
                await contracts.fggToken.methods.approve(contracts.cowNFT.address, amount)
                    .send({ from: accounts[0] });
                
                // 喂养奶牛
                const tx = await contracts.cowNFT.methods.feedCow(cowId, amount)
                    .send({ from: accounts[0] });
                
                showStatusModal('成功', `奶牛 #${cowId} 喂养成功!`);
                loadUserData();
                
            } catch (error) {
                console.error("喂养失败:", error);
                showStatusModal('错误', '喂养失败: ' + error.message);
            }
        }
    );
});

// 合成奶牛按钮点击事件
document.getElementById('mergeCowsBtn').addEventListener('click', function() {
    if (!accounts.length) {
        showStatusModal('错误', '请先连接钱包');
        return;
    }
    
    const cowId1 = document.getElementById('cowId1').value;
    const cowId2 = document.getElementById('cowId2').value;
    
    if (!cowId1 || !cowId2) {
        showStatusModal('错误', '请选择两头奶牛');
        return;
    }
    
    if (cowId1 === cowId2) {
        showStatusModal('错误', '不能选择同一头奶牛');
        return;
    }
    
    showTransactionModal(
        '合成奶牛',
        `<p>确定要将奶牛 #${cowId1} 和奶牛 #${cowId2} 合成为一头黄金奶牛吗?</p>
         <p class="text-warning">成功率: 70%</p>`,
        async function() {
            try {
                // 合成奶牛
                const tx = await contracts.cowNFT.methods.mergeCows(cowId1, cowId2)
                    .send({ from: accounts[0] });
                
                // 检查是否成功
                if (tx.events.CowMerged) {
                    showStatusModal('成功', '奶牛合成成功! 获得一头黄金奶牛!');
                } else {
                    showStatusModal('失败', '奶牛合成失败，两头奶牛已销毁');
                }
                
                loadUserData();
                
            } catch (error) {
                console.error("合成失败:", error);
                showStatusModal('错误', '合成失败: ' + error.message);
            }
        }
    );
});