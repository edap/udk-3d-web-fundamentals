const isSandbox = 'SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env

export default {
    root: 'src/', // where our source file are
    publicDir: '../static/', // where the assets are
    base: './',
    server:
    {
        host: true,
        open: !isSandbox // Open if it's not a CodeSandbox
    },
    build:
    {
        outDir: '../dist', // where the bundled files will land
        emptyOutDir: true,
        sourcemap: true
    }
}