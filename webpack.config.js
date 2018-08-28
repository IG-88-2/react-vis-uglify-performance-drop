const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');      
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')



module.exports = (env, argv) => {
    return ({      
        mode:"none",

        entry:{    
            'example':'./example.jsx',
        },  

        output:{             
            filename:'[name].js', 
            path:path.resolve(__dirname,argv.performance) 
        },  

        resolve:{ 
            extensions: [".js", ".jsx", ".json", ".css"]
        },             

        module:{ 
            rules: [ 
            {   
                test: /\.(css|scss)$/,  
                exclude: /(node_modules)/, 
                use: [ 'style-loader', 'css-loader']
            },  
            {   
                test   : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                exclude: /(node_modules)/, 
                loader: 'file-loader'  
            }, 
            {     
                test: /\.(js|jsx)?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader'
            } 
            ]    
        }, 

        devtool:argv.env==="development" ? "source-map" : undefined,
        
        target: "web",   

        plugins:[
            argv.env==="development" ? null : 
            new UglifyJsPlugin({
                uglifyOptions:{
                    compress:{
                        unsafe_comps:false,
                        properties:true,
                        keep_fargs:true,
                        pure_getters:true,
                        collapse_vars:true,
                        warnings:true,
                        sequences:true,
                        dead_code:true,
                        drop_debugger:true,
                        comparisons:true,
                        conditionals:true,
                        evaluate:true,
                        booleans:true,
                        loops:true,
                        unused:argv.performance==="slow",
                        hoist_funs:true,
                        if_return:true,
                        join_vars:true,
                        drop_console:true
                    },
                    output:{comments:false}
                }
            }),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV':JSON.stringify(argv.env),
                'mode':JSON.stringify(argv.env)
            }),
            argv.env==="development" ? null : new webpack.optimize.ModuleConcatenationPlugin(),
            argv.env==="development" ? null : new webpack.NoEmitOnErrorsPlugin(),
            new CopyWebpackPlugin([{from:'./assets'}]), 
            new HtmlWebpackPlugin({
                inject:true, 
                title:'',     
                chunks:['example'],
                filename: 'example.html' 
            })    
        ].filter(v => v),

        node:{ 
            __dirname: false, 
            __filename: false
        }       
    })

};
 
