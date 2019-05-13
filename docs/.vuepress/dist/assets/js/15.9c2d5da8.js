(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{183:function(t,a,n){"use strict";n.r(a);var e=n(0),i=Object(e.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("div",{staticClass:"content"},[n("h2",{attrs:{id:"activity的生命周期"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#activity的生命周期","aria-hidden":"true"}},[t._v("#")]),t._v(" Activity的生命周期")]),t._v(" "),n("h4",{attrs:{id:"返回栈"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#返回栈","aria-hidden":"true"}},[t._v("#")]),t._v(" 返回栈")]),t._v(" "),n("p",[t._v("    Android中的活动是可以层叠的，我们每启动一个新的活动，就会覆盖在原活动上，然后点击Back键会销毁最上面的活动，下面的一个活动就会显示出来。\n    Android是使用任务（task）来管理活动的，一个任务就是一组存放在栈里的活动的集合，这个栈也被称作返回栈（Back Stack）。栈是一种先进后出的数据结构。")]),t._v(" "),n("h4",{attrs:{id:"活动状态"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#活动状态","aria-hidden":"true"}},[t._v("#")]),t._v(" 活动状态")]),t._v(" "),n("ol",[n("li",[t._v("运行状态：活动处于栈顶时的状态，一般系统不会回收处于运行状态的活动；")]),t._v(" "),n("li",[t._v("暂停状态：当一个活动不再处于栈顶但仍然可见时的状态（注意并不是所有活动都会占满整个屏幕，比如对话框形式的活动，所以存在处于暂停状态的活动），一般系统不会回收这种活动；")]),t._v(" "),n("li",[t._v("停止状态：不再处于栈顶且完全不可见的状态，当内存不足时处于停止状态的活动会被系统回收；")]),t._v(" "),n("li",[t._v("销毁状态：活动不再存在于返回栈的状态。")])]),t._v(" "),n("h4",{attrs:{id:"活动的生存期"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#活动的生存期","aria-hidden":"true"}},[t._v("#")]),t._v(" 活动的生存期")]),t._v(" "),n("ul",[n("li",[t._v("Activity类中定义了7个回调方法，覆盖了活动生命周期的每一个环节。")])]),t._v(" "),n("ol",[n("li",[t._v("onCreate()：会在活动第一次被创建的时候调用，一般在该活动中完成初始化操作，比如加载布局、绑定事件；")]),t._v(" "),n("li",[t._v("onStart()：在活动由不可见变为可见的时候调用；")]),t._v(" "),n("li",[t._v("onResume()：在活动准备好和用户进行交互的时候调用，此时的活动处于返回栈的栈顶并处于运行状态；")]),t._v(" "),n("li",[t._v("onPause()：在系统准备去启动或者恢复另一个活动的时候调用，通常在这个方法中将一些消耗CPU的资源释放掉，以及保存一些关键数据，这个方法的执行必须要快，不然会影响新的栈顶活动的使用；")]),t._v(" "),n("li",[t._v("onStop()：这个方法会在活动完全不可见的时候调用，它和onPause()方法的主要区别在于，如果启动的新活动是一个对话框式的活动，那么onPause()会执行而onStop()不会被执行；")]),t._v(" "),n("li",[t._v("onDestroy()：在活动被销毁之前调用，之后活动的状态将变为销毁状态；")]),t._v(" "),n("li",[t._v("onRestart()：在活动由停止状态变为运行状态之前调用，也就是活动被重新启动了。")])]),t._v(" "),n("h4",{attrs:{id:"注意优化"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#注意优化","aria-hidden":"true"}},[t._v("#")]),t._v(" 注意优化")]),t._v(" "),n("p",[t._v("    Android中还提供了一个onSaveInstanceState()回调方法，这个方法可以保证在活动被回收之前一定会被调用，因此"),n("strong",[t._v("可以通过这个方法来解决活动被回收时临时数据得不到保存的问题")]),t._v('。\n    onSaveInstanceState()方法携带一个Bundle类型的参数，Bundle提供了一系列的方法用于保存数据，如使用putString()保存字符串等。每个保存需要传入两个参数（键与值），如\n```protected void onSaveInstanceState(Bundle outState) {\nsuper.onSaveInstanceState(outState);\nString tempData = "Somethind you input";\noutState.putString("key",tempData);\n}')]),t._v(" "),n("p",[t._v('    通过onCreate()方法中的Bundle参数进行恢复，这个参数一般情况下是null，但是如果在活动被系统回收之前有通过onSaveInstanceState()方法来保存数据的话，这个参数就会带有之前所保存的所有数据，只需要通过相应的取值方法将数据取出即可。如：\n``` if (savedInstanceState != null){\nString tempData = savedInstanceState.getString("key")\n}')]),t._v(" "),n("h2",{attrs:{id:"activity的启动模式"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#activity的启动模式","aria-hidden":"true"}},[t._v("#")]),t._v(" Activity的启动模式")]),t._v(" "),n("p",[t._v("    启动模式一共有4种，它们是：")]),t._v(" "),n("ul",[n("li",[t._v("standard 标准模式，每次都新建一个实例对象")]),t._v(" "),n("li",[t._v("singleTop 如果在任务栈顶发现了相同的实例则重用，否则新建并压入栈顶")]),t._v(" "),n("li",[t._v("singleTask 如果在任务栈中发现了相同的实例，将其上面的任务终止并移除，重用该实例。否则新建实例并入栈")]),t._v(" "),n("li",[t._v("singleInstance 允许不同应用，进程线程等共用一个实例，无论从何应用调用该实例都重用\n    可以在AndroidManifest.xml中通过给<activity>标签指定android:launchMode属性来选择启动模式。")])]),t._v(" "),n("h4",{attrs:{id:"standard"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#standard","aria-hidden":"true"}},[t._v("#")]),t._v(" "),n("strong",[t._v("standard")])]),t._v(" "),n("p",[t._v("    什么配置都不写的话就是这种启动模式。但是每次都新建一个实例的话真是过于浪费，为了优化应该尽量考虑余下三种方式。")]),t._v(" "),n("h4",{attrs:{id:"singletop"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#singletop","aria-hidden":"true"}},[t._v("#")]),t._v(" "),n("strong",[t._v("singleTop")])]),t._v(" "),n("p",[t._v("    每次扫描栈顶，如果在任务栈顶发现了相同的实例则重用，否则新建并压入栈顶。")]),t._v(" "),n("pre",[n("code",[t._v('\n<activity>\n    android:name=".SingleTopActivity"\n    android:label="@string/singletop"\n    android:launchMode="singleTop" >\n</activity>\n')])]),t._v(" "),n("h4",{attrs:{id:"singletask"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#singletask","aria-hidden":"true"}},[t._v("#")]),t._v(" "),n("strong",[t._v("singleTask")])]),t._v(" "),n("p",[t._v("    当活动的启动模式指定为singleTask，每次启动该活动时系统首先会在返回栈中检查是否存在该活动的实例，如果发现已经存在则直接使用该实例，并把在这个活动之上的所有活动统统出栈，如果没有发现就会创建一个新的活动实例。")]),t._v(" "),n("h4",{attrs:{id:"singleinstance"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#singleinstance","aria-hidden":"true"}},[t._v("#")]),t._v(" "),n("strong",[t._v("singleInstance")])]),t._v(" "),n("p",[t._v("    指定为singleInstance模式的活动会启用一个新的返回栈来管理这个活动。不管是哪个应用程序来访问这个活动，都公用一个返回栈，实现共享活动实例。")])])}],!1,null,null,null);a.default=i.exports}}]);