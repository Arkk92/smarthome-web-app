module.exports = {
    apps: [
        {
            name: 'Smart Home Project',
            script: './dist/app/presentation/express/settings/server.js',
            node_args: '-r ts-node/register -r tsconfig-paths/register'
        },
    ],
};