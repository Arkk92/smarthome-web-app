module.exports = {
    apps: [
        {
            name: 'Smart Home Project',
            script: './dist/app/index.js',
            node_args: '-r ts-node/register -r tsconfig-paths/register'
        },
    ],
};