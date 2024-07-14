import { schema } from "normalizr";

const user = new schema.Entity('users');

const people = new schema.Entity('people');

const assets = new schema.Entity('assets');

const order = new schema.Entity('orders', {
    user: user,
    people: [people],
    assets: [assets]
})

export {user, people, assets, order};