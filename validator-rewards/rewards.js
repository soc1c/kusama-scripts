const symbol = 'KSM';
const decimals = 1000000000000;
const explorer_prefix = "https://polkascan.io/pre/kusama/account/"

const validators = await api.query.staking.validators();

console.log("### Validator candidates and rewards:");
for (let i = 0; i < validators[0].length; i++) {
  const reward = validators[1][i].validatorPayment / decimals;
  console.log(`- [${validators[0][i]}](${explorer_prefix}${validators[0][i]}): ${reward} KSM`);
}
