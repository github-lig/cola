module.exports = {
	title: 'Cola',
	description: 'Cola Cat',
	base:'/cola/',
	port: '9527',
	themeConfig: {
        // 你的GitHub仓库，请正确填写
        repo: 'https://github.com/github-lig/cola',
        // 自定义仓库链接文字。
        repoLabel: 'My GitHub',
        nav: [
            { text: 'Home', link: '/' },
            { text: 'FirstBlog', link: '/blog/FirstBlog.md' }
        ],
		sidebarDepth: 2
    },
	plugins: [
		['@vuepress/search', {
		  searchMaxSuggestions: 10
		}],
		"vuepress-plugin-auto-sidebar", {
			titleMode: "uppercase"
		}
	]
}