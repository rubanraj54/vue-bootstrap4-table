var chance = require('chance').Chance(88);

export function testdata() {
    let user;
    let users = [];
    for (let i = 1; i <= 500; i++) {
        user = {
            id: i,
            name: {
                first_name: chance.first(),
                last_name: chance.last(),
            },
            age: chance.age(),
            address: {
                city: chance.city(),
                street: chance.address(),
                postcode: chance.postcode(),
                country: chance.country({
                    full: true
                })
            },
            salary: chance.integer({
                min: 1500,
                max: 3000
            }),
            email: chance.email(),
            website: chance.domain(),
            mobile: chance.phone()
        }
        users.push(user);
    }
    return users;
}
