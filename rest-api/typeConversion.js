export const transactionTypeConversion = (transactionObject) => {
    return {
        transaction_hash: transactionObject.transaction_hash,
        block_number: transactionObject.block_number,
        timestamp: transactionObject.timestamp,
        transaction_index: transactionObject.transaction_index,
        execution_status: transactionObject.transaction_execution_status,
        status: transactionObject.transaction_status,
        type: transactionObject.transaction_type,
        fee: transactionObject.actual_fee,
        sender: transactionObject.sender_address,
        contract_address: transactionObject.contract_address
    }
}


export const eventTypeConversion = (eventObject) => {
    return {
        transaction_hash: eventObject.transaction_hash,
        block_number: eventObject.block_number,
        timestamp: eventObject.timestamp,
        event_index: eventObject.event_index,
        from_address: eventObject.from_address,
        key_name: eventObject.key_name

    }
}


export const tokenTypeConversion = (tokenObject) => {
    return {
        address: tokenObject.tokenContractAddress.toLowerCase(),
        symbol: tokenObject.symbol,
        amount: tokenObject.holdingAmount
    }
}


export const nftBalanceTypeConversion = (balanceObject) => {
    return {
        contract_address: balanceObject.contract_address.toLowerCase(),
        token_id: balanceObject.token_id,
        name: balanceObject.name,
        description: balanceObject.description,
        image_url: balanceObject.image_url,
        animation_url: balanceObject.animation_url
    }
}


export const nftContractTypeConversion = (contractObject) => {
    return {
        contract_address: contractObject?.contract_address?.toLowerCase(),
        type: contractObject.schema,
        name: contractObject.name,
        description: contractObject.description,
        symbol: contractObject.symbol,
    }
}