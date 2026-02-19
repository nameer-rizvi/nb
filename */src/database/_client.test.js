const util = require("../util");
const client = require("./_client");

async function databaseTest() {
  const collection = "test";

  // --> .add()

  util.log.database('client test started ("1")');

  const test1 = await client.add(
    { collection, value: 1 },
    { collection, value: 2 },
  );

  const resultA = test1[0].value === 1;

  const resultB = test1[1].value === 2;

  if (resultA === true && resultB === true) {
    util.log.database('client test completed ("1")');
  } else {
    util.log.database('client test failed ("1")', "warn");
  }

  // --> .get()

  util.log.database('client test started ("2")');

  const test2 = await client.get({ id: test1[0].id }, { collection });

  const result2A = test2[0].id === test1[0].id;

  const result2B = test2[1].length >= test1.length;

  if (result2A === true && result2B === true) {
    util.log.database('client test completed ("2")');
  } else {
    util.log.database('client test failed ("2")', "warn");
  }

  // --> .mod()

  util.log.database('client test started ("3")');

  const edit1 = "EDIT_1";

  const edit2 = "EDIT_2";

  const test3 = await client.mod(
    { collection, value: edit1 },
    { id: test1[0].id, value: edit2 },
  );

  const result3A = test3[0].some((i) => i.value === edit1);

  const result3B = test3[1].value === edit2;

  if (result3A === true && result3B === true) {
    util.log.database('client test completed ("3")');
  } else {
    util.log.database('client test failed ("3")', "warn");
  }

  // --> .cut()

  util.log.database('client test started ("4")');

  const test4 = await client.cut({ id: test1[0].id }, { collection });

  const result4A = test4[0].id === test1[0].id;

  const result4B = test4[1].collection === collection;

  if (result4A === true && result4B === true) {
    util.log.database('client test completed ("4")');
  } else {
    util.log.database('client test failed ("4")', "warn");
  }

  process.exit();
}

databaseTest();
