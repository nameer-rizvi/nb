const util = require("../util");
const client = require("./client");
const collection = require("./collection.json").test;

async function databaseTest() {
  // TEST 1 --> .add()

  util.log.database('client test started ("1")');

  const test1 = await client.add(
    { collection, value: 1 },
    { collection, value: 2 },
  );

  const result1A = test1[0].value === 1;

  const result1B = test1[1].value === 2;

  await client.size();

  if (result1A === true && result1B === true) {
    util.log.database('client test completed ("1")');
  } else {
    util.log.database('client test failed ("1")', "warn");
  }

  // TEST 2 --> .get()

  util.log.database('client test started ("2")');

  const test2 = await client.get({ id: test1[0].id }, { collection });

  const result2A = test2[0].id === test1[0].id;

  const result2B = test2[1].length >= test1.length;

  await client.size();

  if (result2A === true && result2B === true) {
    util.log.database('client test completed ("2")');
  } else {
    util.log.database('client test failed ("2")', "warn");
  }

  // TEST 3 --> .mod()

  util.log.database('client test started ("3")');

  const edit1 = "EDIT_1";

  const edit2 = "EDIT_2";

  const test3 = await client.mod(
    { collection, value: edit1 },
    { id: test1[0].id, value: edit2 },
  );

  const result3A = test3[0].some((i) => i.value === edit1);

  const result3B = test3[1].value === edit2;

  await client.size();

  if (result3A === true && result3B === true) {
    util.log.database('client test completed ("3")');
  } else {
    util.log.database('client test failed ("3")', "warn");
  }

  // TEST 4 --> .cut()

  util.log.database('client test started ("4")');

  const test4 = await client.cut({ id: test1[0].id }, { collection });

  const result4A = test4[0].id === test1[0].id;

  const result4B = test4[1].collection === collection;

  await client.size();

  if (result4A === true && result4B === true) {
    util.log.database('client test completed ("4")');
  } else {
    util.log.database('client test failed ("4")', "warn");
  }

  // TEST 5 --> nanoid size stress (must set NANOID_SIZE=1 in command line)

  if (process.env.NANOID_SIZE === "1") {
    let count = 0;
    try {
      while (true) {
        await client.add({ collection });
        count++;
      }
    } catch {
      util.log.database(`client test nanoid size ("${count}")`);
    }
  }

  process.exit();
}

databaseTest();
