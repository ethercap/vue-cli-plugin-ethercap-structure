module.exports = [{
    type: 'list',
    name: 'routerMode',
    message: 'What is your Vue-router mode?',
    choices: [
        { name: 'history', value: 'history' },
        { name: 'hash', value: 'hash' }
    ],
    default: 'history',
}, {
    type: "input",
    name: "appname",
    message: "Input your sso appname",
    validate: input => !!input,
    default: ""
}, {
    type: "input",
    name: "title",
    message: "Input your web title",
    validate: input => !!input,
    default: ""
}];