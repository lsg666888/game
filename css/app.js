// 检查是否通过邀请链接访问
function checkInviteCode() {
    const urlParams = new URLSearchParams(window.location.search);
    const inviteCode = urlParams.get('ref');
    
    if (inviteCode && accounts.length > 0) {
        // 使用邀请码注册
        contracts.rewardSystem.methods.registerWithInvite(inviteCode)
            .send({ from: accounts[0] })
            .then(() => {
                showStatusModal('成功', '已使用邀请码注册!');
                loadUserData();
            })
            .catch(error => {
                console.error("使用邀请码注册失败:", error);
            });
    }
}

// 页面加载完成后检查钱包连接状态
document.addEventListener('DOMContentLoaded', function() {
    if (typeof window.ethereum !== 'undefined') {
        window.ethereum.request({ method: 'eth_accounts' })
            .then(result => {
                if (result.length > 0) {
                    accounts = result;
                    web3 = new Web3(window.ethereum);
                    
                    // 初始化合约实例
                    initContracts(web3);
                    
                    // 更新UI
                    updateWalletInfo();
                    loadUserData();
                    checkInviteCode();
                    
                    // 监听账户变化
                    window.ethereum.on('accountsChanged', function(newAccounts) {
                        accounts = newAccounts;
                        updateWalletInfo();
                        loadUserData();
                    });
                }
            })
            .catch(error => {
                console.error("检查钱包连接状态失败:", error);
            });
    }
});