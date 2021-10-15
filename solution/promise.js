module.exports = function (Homework) {
    const promisify =
        (func) =>
        (...args) =>
            new Promise((resolve) => {
                const callback = (result) => {
                    resolve(result);
                };

                args.push(callback);

                func.call(this, ...args);
            });

    const { add, less } = Homework;

    const addPromise = promisify(add);
    const lessPromise = promisify(less);

    return async (array, fn, initialValue, cb) => {
        let acc = initialValue;

        const fnPromise = promisify(fn);
        const getPromise = promisify(array.get);
        const lengthPromise = promisify(array.length);
        const length = await lengthPromise();

        for (
            let i = 0;
            await lessPromise(i, length);
            i = await addPromise(i, 1)
        ) {
            const item = await getPromise(i);

            acc = await fnPromise(acc, item, i, array);
        }

        cb(acc);
    };
};
