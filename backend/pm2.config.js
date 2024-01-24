module.exports = {
    apps: [
        {
            name: 'Smart Home Project',
            script: './dist/src/index.js',
            node_args: '-r ts-node/register -r tsconfig-paths/register'
        },
    ],
};