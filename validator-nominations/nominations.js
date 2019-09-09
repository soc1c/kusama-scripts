const symbol = 'KSM';
const decimals = 1000000000000;
const explorer_prefix = "https://polkascan.io/pre/kusama/account/";
const date_now = new Date().toGMTString();

const nominators = await api.query.staking.nominators();

console.log(`Last update: ${date_now}\n\n`);
console.log("### Nominators and nominations:");
for (let n = 0; n < nominators[0].length; n++) {
  const balance = await api.query.balances.freeBalance(nominators[0][n]) / decimals;
  console.log(`- [\`${nominators[0][n]}\`](${explorer_prefix}${nominators[0][n]}) (${balance} ${symbol}) nominates:`);
  for (let v = 0; v < nominators[1][n].length; v++) {
    console.log(`  - [\`${nominators[1][n][v]}\`](${explorer_prefix}${nominators[1][n][v]})`);
  }
}
