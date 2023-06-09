module.exports = {
  // transpileDependencies: true,
  devServer: {
    port: 3000,
    proxy: {
      '/query': {
        target: "http://127.0.0.1:8080",
        changeOrigin: true,
        logLevel: "debug"
      },
    }
  },
  lintOnSave: false,
  css: {
		loaderOptions: {
			less: {
				lessOptions: {
          modifyVars: {
            hack: `true; @import "@/assets/css/resetVant.less";`,
          },
        },
			},
		},
	},
}
