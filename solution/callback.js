module.exports = function (Homework) {
    const { add, equal } = Homework;

    return (array, fn, initialValue, cb) => {
        let acc = initialValue;

        array.length((length) => {
            function func(acc, i) {
                equal(i, length, (resEqual) => {
                    if (resEqual) {
                        cb(acc);
                    } else {
                        array.get(i, (curr) => {
                            fn(acc, curr, i, array, (acc) => {
                                add(i, 1, (resAdd) => {
                                    func(acc, resAdd);
                                });
                            });
                        });
                    }
                });
            }

            func(acc, 0);
        });
    };
};
