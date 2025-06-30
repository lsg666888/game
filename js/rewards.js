// 加载奖励中心数据
async function loadRewardData() {
    // 检查是否已领取注册奖励
    const hasRegistered = await contracts.rewardSystem.methods.hasRegistered(accounts[0]).call();
    document.getElementById('registerBtn').disabled = hasRegistered;
    
    // 检查今日是否已签到
    const hasSignedIn = await contracts.rewardSystem.methods.hasSignedInToday(accounts[0]).call();
    document.getElementById('signInBtn').disabled = hasSignedIn;
    document.getElementById('signInStatus').textContent = hasSignedIn ? '今日已签到' : '今日未签到';
    document.getElementById('signInProgress').style.width = hasSignedIn ? '100%' : '0%';
    
    // 获取邀请数据
    const inviteCount = await contracts.rewardSystem.methods.getInviteCount(accounts[0]).call();
    document.getElementById('inviteCount').textContent = inviteCount;
    
    // 生成邀请码
    const inviteCode = await contracts.rewardSystem.methods.getInviteCode(accounts[0]).call();
    document.getElementById('inviteCode').value = inviteCode || '未生成';
}

// 注册奖励按钮点击事件
document.getElementById('registerBtn').addEventListener('click', function() {
    if (!accounts.length) {
        showStatusModal('错误', '请先连接钱包');
        return;
    }
    
    showTransactionModal(
        '领取注册奖励',
        `<p>确定要领取 <strong>10 GGG</strong> 注册奖励吗?</p>`,
        async function() {
            try {
                // 领取注册奖励
                const tx = await contracts.rewardSystem.methods.register()
                    .send({ from: accounts[0] });
                
                showStatusModal('成功', '注册奖励领取成功!');
                loadUserData();
                
            } catch (error) {
                console.error("领取注册奖励失败:", error);
                showStatusModal('错误', '领取注册奖励失败: ' + error.message);
            }
        }
    );
});

// 每日签到按钮点击事件
document.getElementById('signInBtn').addEventListener('click', function() {
    if (!accounts.length) {
        showStatusModal('错误', '请先连接钱包');
        return;
    }
    
    showTransactionModal(
        '每日签到',
        `<p>确定要签到领取 <strong>1 GGG</strong> 奖励吗?</p>`,
        async function() {
            try {
                // 每日签到
                const tx = await contracts.rewardSystem.methods.signIn()
                    .send({ from: accounts[0] });
                
                showStatusModal('成功', '签到成功! 获得1 GGG奖励');
                loadUserData();
                
            } catch (error) {
                console.error("签到失败:", error);
                showStatusModal('错误', '签到失败: ' + error.message);
            }
        }
    );
});

// 生成邀请链接按钮点击事件
document.getElementById('inviteBtn').addEventListener('click', function() {
    if (!accounts.length) {
        showStatusModal('错误', '请先连接钱包');
        return;
    }
    
    showTransactionModal(
        '生成邀请链接',
        `<p>确定要生成邀请链接吗?</p>
         <p>每成功邀请一位好友可获得 <strong>5 GGG</strong> 奖励</p>`,
        async function() {
            try {
                // 生成邀请码
                const tx = await contracts.rewardSystem.methods.generateInviteCode()
                    .send({ from: accounts[0] });
                
                const inviteCode = await contracts.rewardSystem.methods.getInviteCode(accounts[0]).call();
                const inviteLink = `${window.location.origin}?ref=${inviteCode}`;
                
                showStatusModal(
                    '成功', 
                    `邀请链接生成成功!<br><br>
                    <strong>邀请码:</strong> ${inviteCode}<br>
                    <strong>邀请链接:</strong> <a href="${inviteLink}" target="_blank">${inviteLink}</a>`
                );
                
                loadUserData();
                
            } catch (error) {
                console.error("生成邀请链接失败:", error);
                showStatusModal('错误', '生成邀请链接失败: ' + error.message);
            }
        }
    );
});

// 复制邀请码按钮点击事件
document.getElementById('copyInviteBtn').addEventListener('click', function() {
    const inviteCode = document.getElementById('inviteCode');
    inviteCode.select();
    document.execCommand('copy');
    
    const tooltip = new bootstrap.Tooltip(inviteCode, {
        title: '已复制!',
        trigger: 'manual'
    });
    
    tooltip.show();
    setTimeout(() => tooltip.hide(), 1000);
});

// 充值功能实现
document.getElementById('depositBtn').addEventListener('click', function() {
    if (!accounts.length) {
        showStatusModal('错误', '请先连接钱包');
        return;
    }
    
    showTransactionModal(
        '充值到虚拟钱包',
        `<div class="mb-3">
            <label for="depositAmount" class="form-label">充值金额</label>
            <input type="number" class="form-control" id="depositAmount" min="1">
        </div>
        <div class="mb-3">
            <label for="depositToken" class="form-label">代币类型</label>
            <select class="form-select" id="depositToken">
                <option value="GGG">GGG</option>
                <option value="FGG">FGG</option>
            </select>
        </div>`,
        async function() {
            try {
                const amount = document.getElementById('depositAmount').value;
                const token = document.getElementById('depositToken').value;
                
                if (!amount || parseFloat(amount) <= 0) {
                    showStatusModal('错误', '请输入有效的充值金额');
                    return;
                }
                
                const amountInWei = web3.utils.toWei(amount, 'ether');
                
                if (token === 'GGG') {
                    // 检查GGG余额
                    const balance = await contracts.gggToken.methods.balanceOf(accounts[0]).call();
                    if (BigInt(balance) < BigInt(amountInWei)) {
                        showStatusModal('错误', 'GGG余额不足');
                        return;
                    }
                    
                    // 批准GGG代币
                    await contracts.gggToken.methods.approve(contracts.rewardSystem.address, amountInWei)
                        .send({ from: accounts[0] });
                    
                    // 充值到虚拟钱包
                    await contracts.rewardSystem.methods.depositToVirtualWallet(amountInWei, "GGG")
                        .send({ from: accounts[0] });
                    
                } else {
                    // 检查FGG余额
                    const balance = await contracts.fggToken.methods.balanceOf(accounts[0]).call();
                    if (BigInt(balance) < BigInt(amountInWei)) {
                        showStatusModal('错误', 'FGG余额不足');
                        return;
                    }
                    
                    // 批准FGG代币
                    await contracts.fggToken.methods.approve(contracts.rewardSystem.address, amountInWei)
                        .send({ from: accounts[0] });
                    
                    // 充值到虚拟钱包
                    await contracts.rewardSystem.methods.depositToVirtualWallet(amountInWei, "FGG")
                        .send({ from: accounts[0] });
                }
                
                showStatusModal('成功', `成功充值 ${amount} ${token} 到虚拟钱包!`);
                loadUserData();
                
            } catch (error) {
                console.error("充值失败:", error);
                showStatusModal('错误', '充值失败: ' + error.message);
            }
        }
    );
});

// 提现按钮点击事件
document.getElementById('withdrawBtn').addEventListener('click', function() {
    if (!accounts.length) {
        showStatusModal('错误', '请先连接钱包');
        return;
    }
    
    const amount = document.getElementById('withdrawAmount').value;
    const token = document.getElementById('withdrawToken').value;
    
    if (!amount || parseFloat(amount) <= 0) {
        showStatusModal('错误', '请输入有效的提现金额');
        return;
    }
    
    showTransactionModal(
        '提现确认',
        `<p>确定要提现 <strong>${amount} ${token}</strong> 吗?</p>
         <p class="text-warning">注意: 提现将收取3-8%的随机手续费</p>`,
        async function() {
            try {
                const amountInWei = web3.utils.toWei(amount, 'ether');
                
                if (token === 'GGG') {
                    // 检查GGG余额
                    const balance = await contracts.gggToken.methods.balanceOf(accounts[0]).call();
                    if (BigInt(balance) < BigInt(amountInWei)) {
                        showStatusModal('错误', 'GGG余额不足');
                        return;
                    }
                    
                    // 提现GGG
                    const tx = await contracts.rewardSystem.methods.withdrawGGG(amountInWei)
                        .send({ from: accounts[0] });
                    
                } else {
                    // 检查FGG余额
                    const balance = await contracts.fggToken.methods.balanceOf(accounts[0]).call();
                    if (BigInt(balance) < BigInt(amountInWei)) {
                        showStatusModal('错误', 'FGG余额不足');
                        return;
                    }
                    
                    // 提现FGG
                    const tx = await contracts.rewardSystem.methods.withdrawFGG(amountInWei)
                        .send({ from: accounts[0] });
                }
                
                showStatusModal('成功', `成功提现 ${amount} ${token}!`);
                loadUserData();
                
            } catch (error) {
                console.error("提现失败:", error);
                showStatusModal('错误', '提现失败: ' + error.message);
            }
        }
    );
});