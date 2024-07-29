const title = Object.freeze({
    NONE: '',
    MR: 'Mr.',
    MRS: 'Mrs.',
    MS: 'Ms.',
    MISS: 'Miss.',
    DR: 'Dr.',
    PROF: 'Prof.',
    REV: 'Rev.',
    HON: 'Hon.'
});

const role = Object.freeze({
    TESTATOR:'testator',
    SPOUSE:'spouse',
    PARTNER:'partner',
    KID:'kid',
    BENEFIARY:'beneficiary',
    EXECUTOR:'executor'
})


const constants = {
    title,
    role
}

export default constants