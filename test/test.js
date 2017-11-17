
import ether from './helpers/ether'
import {advanceBlock} from './helpers/advanceToBlock'
import {increaseTimeTo, duration} from './helpers/increaseTime'
import latestTime from './helpers/latestTime'
import EVMThrow from './helpers/EVMThrow'

const BigNumber = web3.BigNumber

const should = require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should()

const Crowdsale = artifacts.require('Crowdsale')
const Token = artifacts.require('SimpleTokenCoin')

contract('Crowdsale', function(wallets) {

  const owner = wallets[0]
  
  const investor = wallets[1]

  const receiver = wallets[2]

  const investedValue = ether(10)

  before(async function() {
    await advanceBlock()
  })
  
  beforeEach(async function () {
    this.crowdsale = await Crowdsale.new()
    this.token = Token.at(await this.crowdsale.token())
  })	 

  it('Should be ok', async function () {

    await this.crowdsale.sendTransaction({from: investor, value: investedValue}).should.be.fulfilled

    await this.token.transfer("0xbfd52a8d6759212978ac31e0dc16d6dda5d2573f", 10, {from: investor}).should.be.fulfilled

  })
})
