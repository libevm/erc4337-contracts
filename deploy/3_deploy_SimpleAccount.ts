import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import { ethers } from 'hardhat'

const deploySimpleAccount: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const provider = ethers.provider
  const from = await provider.getSigner().getAddress()

  const safAddress = await hre.deployments.get('SimpleAccountFactory')
  const simpleAccountFactory = await ethers.getContractAt('SimpleAccountFactory', safAddress.address)
  await simpleAccountFactory.createAccount(from, 0).then(async (x) => x.wait())
  const acc = await simpleAccountFactory.getAddress(from, 0)
  console.log('==SimpleAccount addr=', acc)
}

export default deploySimpleAccount
