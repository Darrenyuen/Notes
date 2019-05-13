启动模式一共有4种，它们是：
+ standard 标准模式，每次都新建一个实例对象
+ singleTop 如果在任务栈顶发现了相同的实例则重用，否则新建并压入栈顶
+ singleTask 如果在任务栈中发现了相同的实例，将其上面的任务终止并移除，重用该实例。否则新建实例并入栈
+ singleInstance 允许不同应用，进程线程等共用一个实例，无论从何应用调用该实例都重用
&ensp;&ensp;&ensp;&ensp;可以在AndroidManifest.xml中通过给&lt;activity&gt;标签指定android:launchMode属性来选择启动模式。

#### standard

&ensp;&ensp;&ensp;&ensp;什么配置都不写的话就是这种启动模式。但是每次都新建一个实例的话真是过于浪费，为了优化应该尽量考虑余下三种方式。
#### singleTop
&ensp;&ensp;&ensp;&ensp;每次扫描栈顶，如果在任务栈顶发现了相同的实例则重用，否则新建并压入栈顶。

<pre><code>
&lt;activity&gt;
    android:name=".SingleTopActivity"
    android:label="@string/singletop"
    android:launchMode="singleTop" >
&lt;/activity>
</code></pre>
#### singleTask

&ensp;&ensp;&ensp;&ensp;当活动的启动模式指定为singleTask，每次启动该活动时系统首先会在返回栈中检查是否存在该活动的实例，如果发现已经存在则直接使用该实例，并把在这个活动之上的所有活动统统出栈，如果没有发现就会创建一个新的活动实例。
#### singleInstance

&ensp;&ensp;&ensp;&ensp;指定为singleInstance模式的活动会启用一个新的返回栈来管理这个活动。不管是哪个应用程序来访问这个活动，都公用一个返回栈，实现共享活动实例。
