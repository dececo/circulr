import intl from 'react-intl-universal'
import {commonFm} from 'modules/fomatter/common'
import {toNumber,toBig,toHex} from "LoopringJS/common/formatter";
export const getTypes = (token)=>{
  let types = [
    {label:intl.get(`global.all`)+ ' ' +intl.get('txs.type'),value:''},
    {label:intl.get(`txs.type_sell`),value:'sell'},
    {label:intl.get(`txs.type_buy`),value:'buy'},
    {label:intl.get(`txs.type_transfer`),value:'send'},
    {label:intl.get(`txs.type_receive`),value:'receive'},
    {label:intl.get(`txs.type_enable`),value:'approve'},
  ]
  let convertTypes = [{label:intl.get(`txs.type_convert`),value:'convert'}]
  let lrcTypes = [
     {label:intl.get(`txs.type_lrc_fee`),value:'lrc_fee'},
     {label:intl.get(`txs.type_lrc_reward`),value:'lrc_reward'},
  ]
  let othersTypes = [
     // {label:intl.get(`txs.type_others`),value:'others'},
  ]
  if(token.toUpperCase() === 'WETH' || token.toUpperCase() === 'ETH'){
    types = [...types,...convertTypes]
  }
  if(token.toUpperCase() === 'LRC'){
    types = [...types,...lrcTypes]
  }
  return [...types,...othersTypes]
}

export class TxFm{
  constructor(tx){
    this.tx = tx
    this.fill = tx.content
  }
  getType(){

  }
  getConfirmTime(){
    return commonFm.getFormatTime(toNumber(this.tx.updateTime) * 1e3)
  }
  getGas(){
    return this.tx.gas_used
  }
  getGasPrice(){
    return toNumber(this.tx.gasPrice)/(1e9).toString(10)
  }
  getLimit(){
    return toNumber(this.tx.gas).toString(10)
  }
  getNonce(){
   return toNumber(this.tx.nonce)
  }
  getValue(){
   return this.tx.value && toBig(this.tx.value).div(1e18).toNumber()
  }
  getFilledAmountOfSell(){
   return getValues(this.fill.symbol_b,this.fill.amount_b) + '' + this.fill.symbol_b
  }
  getFilledAmountOfBuy(){
   return getValues(this.fill.symbol_s,this.fill.amount_s) + '' + this.fill.symbol_s
  }
  getLrcFee(){
   return getValues('LRC',this.fill.lrc_fee) + '' + 'LRC'
  }
  getLrcReward(){
   return getValues('LRC',this.fill.lrc_reward) + '' + 'LRC'
  }
  getMarginSplit(){
   return getValues(this.fill.symbol_s,this.fill.amount_s) + '' + this.fill.symbol_s
  }
}
export const getValues = (symbol, value)=>{
 const tokenFormatter = new window.uiFormatter.TokenFormatter({symbol});
return  window.uiFormatter.getFormatNum(tokenFormatter.getAmount(value));
}

export const getType = (item) => {
      switch (item.type) {
        case 'approve':
          return intl.get('txs.type_enable_title', {symbol: item.symbol});
        case 'send':
          return intl.get('txs.type_transfer_title', {symbol: item.symbol});
        case 'receive':
          return intl.get('txs.type_receive_title', {symbol: item.symbol});
        case 'sell':
          return intl.get('txs.type_sell_title', {symbol: item.symbol});
        case 'buy':
          return intl.get('txs.type_buy_title', {symbol: item.symbol});
        case 'lrc_fee':
          return  intl.get('orders.LrcFee');
        case 'lrc_reward':
          return intl.get('orders.LrcReward');
        case 'convert_outcome':
          return item.symbol === 'ETH' ? intl.get('txs.type_convert_title_eth') : intl.get('txs.type_convert_title_weth');
        case 'convert_income':
          return item.symbol === 'WETH' ? intl.get('txs.type_convert_title_eth') : intl.get('txs.type_convert_title_weth');
        case 'cancel_order':
          return intl.get('txs.cancel_order')
        case 'cutoff':
          return intl.get('txs.cancel_all');
        case 'cutoff_trading_pair':
          return intl.get('txs.cancel_pair_order', {pair: item.content.market});
        default:
          return intl.get('txs.others')
      }
    }
