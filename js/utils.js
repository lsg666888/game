// 显示交易确认模态框
function showTransactionModal(title, content, callback) {
    document.getElementById('transactionModalTitle').textContent = title;
    document.getElementById('transactionModalBody').innerHTML = content;
    
    const modal = new bootstrap.Modal(document.getElementById('transactionModal'));
    modal.show();
    
    document.getElementById('confirmTransactionBtn').onclick = function() {
        modal.hide();
        if (callback) callback();
    };
}

// 显示状态模态框
function showStatusModal(title, content) {
    document.getElementById('statusModalTitle').textContent = title;
    document.getElementById('statusModalBody').innerHTML = content;
    
    const modal = new bootstrap.Modal(document.getElementById('statusModal'));
    modal.show();
}

// 更新农场选择下拉框
function updateFarmSelects() {
    const farmSelects = [
        'fertilizeFarmId', 
        'harvestFarmId', 
        'sellFarmId'
    ];
    
    farmSelects.forEach(selectId => {
        const select = document.getElementById(selectId);
        select.innerHTML = '';
        
        // 获取用户拥有的农场
        contracts.farmNFT.methods.balanceOf(accounts[0]).call()
            .then(farmCount => {
                if (farmCount > 0) {
                    for (let i = 0; i < farmCount; i++) {
                        contracts.farmNFT.methods.tokenOfOwnerByIndex(accounts[0], i).call()
                            .then(farmId => {
                                const option = document.createElement('option');
                                option.value = farmId;
                                option.textContent = `农场 #${farmId}`;
                                select.appendChild(option);
                            });
                    }
                } else {
                    const option = document.createElement('option');
                    option.value = '';
                    option.textContent = '没有可用农场';
                    select.appendChild(option);
                }
            });
    });
}

// 更新奶牛选择下拉框
function updateCowSelects() {
    const cowSelects = [
        'feedCowId', 
        'sellCowId', 
        'cowId1', 
        'cowId2'
    ];
    
    cowSelects.forEach(selectId => {
        const select = document.getElementById(selectId);
        select.innerHTML = '';
        
        // 获取用户拥有的奶牛
        contracts.cowNFT.methods.balanceOf(accounts[0]).call()
            .then(cowCount => {
                if (cowCount > 0) {
                    for (let i = 0; i < cowCount; i++) {
                        contracts.cowNFT.methods.tokenOfOwnerByIndex(accounts[0], i).call()
                            .then(cowId => {
                                const option = document.createElement('option');
                                option.value = cowId;
                                option.textContent = `奶牛 #${cowId}`;
                                select.appendChild(option);
                            });
                    }
                } else {
                    const option = document.createElement('option');
                    option.value = '';
                    option.textContent = '没有可用奶牛';
                    select.appendChild(option);
                }
            });
    });
}