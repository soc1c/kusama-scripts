const symbol = 'KSM';
const decimals = 1000000000000;
const address = 'Dab4bfYTZRUDMWjYAUQuFbDreQ9mt7nULWu3Dw7jodbzVe9';
const block = await api.rpc.chain.getBlock();
const date_now = new Date().toGMTString();

let free = await api.query.balances.freeBalance(address) / decimals;
let reserved = await api.query.balances.reservedBalance(address) / decimals;
let locks = await api.query.balances.locks(address);
let vesting = await api.query.balances.vesting(address);

console.log(`Last update: ${date_now}\n\n`);
console.log(`### Balances for \`${address}\``);
let total = free + reserved;
console.log(`- Total: ${total} ${symbol} (Free: ${free} ${symbol}, Reserved: ${reserved} ${symbol})`);

if (locks && locks.length > 0) {
  console.log(`- Locks:`);
  for (let l = 0; l < locks.length; l++) {
    let amount = locks[l].amount / decimals;
    console.log(`  - ${l}: ${amount} ${symbol}`);
  }
} else { /* no locks; probably nothing at stake */ }

if (vesting) {
  try {
    vesting = JSON.parse(vesting);
    console.log(`- Vesting:`);
    let offset = vesting.offset / decimals;
    let per_block = vesting.perBlock / decimals;
    let starting_block = vesting.perBlock / decimals;
    let block_number = JSON.parse(block).block.header.number;
    let vested = block_number * per_block;
    console.log(`  - ${vesting.startingBlock}: ${offset} ${symbol} (Vested Total: ${vested} ${symbol}, per Block: ${per_block} ${symbol})`);
  } catch(e) { /* no json; probably not vesting */ }
}
