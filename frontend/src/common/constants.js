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

const maritalStatus = Object.freeze({
    MARRIED:'married',
    PARTNER:'partner',
    WIDOWED:'widowed',
    SINGLE:'single'
})


const constants = {
    title,
    role,
    maritalStatus
}

export default constants