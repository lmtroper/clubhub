import { resolve as _resolve } from 'path';
import { resolve as __resolve, join } from 'path';

export const mode = 'development';
export const entry = './src/index.js';
export const output = {
    filename: 'main.js',
    path: _resolve(__dirname, 'dist'),
};
export const resolve = {
    extensions: ['.js', '.jsx'],
    alias: {
        root: __dirname,
        src: __resolve(__dirname, 'src'),
        '@pages': _resolve(__dirname, 'src/pages'),
        '@api': _resolve(__dirname, 'src/api'),
        '@components': _resolve(__dirname, 'src/components'),
        '@forms': _resolve(__dirname, 'src/forms'),
        '@images': _resolve(__dirname, 'src/images'),
        '@/modals': _resolve(__dirname, 'src/modals'),
        '@/global': _resolve(__dirname, 'src/global')
    },
    fallback: {
        "path": require.resolve('path-browserify'),
    },
    node: {
        child_process: 'empty',
    },
    modules: ['node_modules', join(__dirname, 'src')]
};
export const module = {
    rules: [
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-react'],
                },
            },
        },
        {
            test: /\.(png|jpe?g|gif)$/i,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'images',
                    },
                },
            ],
        },
        {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
        },
    ],
};
