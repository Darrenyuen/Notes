module.exports = {
  base: '/',
  title: '博客，记录成长',
  description: '个人博客网站，记录与分享成长的经验',
  head: [ // 注入到当前页面的 HTML <head> 中的标签
    ['link', { rel: 'icon', href: '/img/logo.jpg' }]
    // ['link', { rel: 'manifest', href: '/manifest.json'}], 
  ],
  markdown: {
    lineNumbers: true,
  },
  themeConfig: {
    nav:[
          {text: '主页', link: '/home/introduction.md' },
          {text: '程序设计', link: '/programming/html/html.md'},
          {text: '软件开发', link: '/softwareDevelopment/frontEnd/vue.md'},
          {text: '算法', link: '/algorithm/dataStruct.md'},
          {text: '其他',
               items:[   
                     {text: 'CSDN', link: 'https://blog.csdn.net/weixin_41897234/article/details/80615801'},
                     {text: 'GitHub', link: 'https://github.com/Ysssf'},
                     {text: '博客园', link: 'https://www.cnblogs.com/yuansssf/'},
                     {text: '简书', link: 'https://www.jianshu.com/u/a81eb591e67f'}
                     ]
          },
    ],
    sidebar: {
      '/home/':[
          {
            title: '主页',
            collapsable: false,
            children: [
              ['/home/introduction.md', '介绍'],
              ['/home/about.md', '关于博主'],
            ]
          }
      ],
      '/programming/':[
          {
            title: 'HTML',
            collapsable: false,
            children: [
              ['/programming/html/html.md', 'HTML'],
            ]
          },
          {
            title: 'CSS',
            collapsable: false,
            children:[
              ['/programming/css/css.md','CSS']
            ]
          },
          {
            title: 'JavaScript',
            collapsable: false,
            children: [
              ['/programming/javascript/js.md','JavaScript']
            ]
          },
          {
            title: 'C++',
            collapsable: false,
            children: [
              ['/programming/cpp/cpp.md','C++']
            ]
          },
          {
            title: 'Java',
            collapsable: false,
            children: [
              ['/programming/java/java.md','Java']
            ]
          },
          {
            title: 'Python',
            collapsable: false,
            children: [
              ['/programming/python/组合数据类型.md','组合数据类型'],
              ['/programming/python/文件和数据格式化.md','文件和数据格式化']
            ]
          },
      ],
      // '/softwareDevelopment/': [
      //     {
      //       title: '软件开发',
      //       collapsable: false,
      //       children: [
      //         ['/softwareDevelopment/frontEnd/vue.md', '前端开发笔记'],
      //         ['/softwareDevelopment/Android.md', 'Android开发笔记'],
      //         ['/softwareDevelopment/iOS.md', 'iOS开发笔记'],
      //       ]
      //     }
      // ],
      '/softwareDevelopment/':[
          {
            title: '前端开发',
            collapsable: false,
            children:[
                ['/softwareDevelopment/frontEnd/vue.md', '前端开发笔记'],
            ]
          },
          {
            title: 'Android开发',
            collapsable: false,
            children: [
                ['/softwareDevelopment/Android/Android.md', 'Android开发笔记'],
                ['/softwareDevelopment/Android/Activity的生命周期.md','Activity的生命周期'],
                ['/softwareDevelopment/Android/Activity的启动模式.md','Activity的启动模式'],
                ['/softwareDevelopment/Android/ListView使用总结.md','ListView使用总结'],
                ['/softwareDevelopment/Android/ViewPager使用总结.md','ViewPager使用总结'],
                ['/softwareDevelopment/Android/ButterKnife使用总结.md','ButterKnife使用总结'],
                ['/softwareDevelopment/Android/主流的图片加载框架.md','主流的图片加载框架']
            ]
          },
          {
            title: 'iOS开发',
            collapsable: false, 
            children:[
                ['/softwareDevelopment/iOS.md', 'iOS开发笔记'],
            ]
          }
      ],
      '/algorithm/': [
          {
            title: '算法',
            collapsable: false,
            children: [
              ['/algorithm/dataStruct.md', '数据结构'],
              ['/algorithm/经典排序算法.md', '经典排序算法'],
              ['/algorithm/搜索算法.md', '搜索算法'],
            ]
          }
      ]
    },
    sidebarDepth: 3,
    themeConfig: {
      lastUpdated: 'Last Updated',
    }
  }
};