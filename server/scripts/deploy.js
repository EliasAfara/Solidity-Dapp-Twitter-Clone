const main = async () => {
  const contractFactory = await ethers.getContractFactory('TwitterAppContract');
  const contract = await contractFactory.deploy();
  await contract.deployed();

  console.log('Contract deployed to: ', contract.address);
};

const deployMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

deployMain();
