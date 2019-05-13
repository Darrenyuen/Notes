#### 前言

+ 简单介绍
>ButterKnife是一个专注于Android系统的View注入框架,以前总是要写很多findViewById来找到View对象，有了ButterKnife可以很轻松的省去这些步骤。是大神JakeWharton的力作，目前使用很广。最重要的一点，使用ButterKnife对性能基本没有损失，因为ButterKnife用到的注解并不是在运行时反射的，而是在编译的时候生成新的class。项目集成起来也是特别方便，使用起来也是特别简单。

+ ButterKnife 的优势
>1、强大的View绑定和Click事件处理功能，简化代码，提升开发效率
2、方便的处理Adapter里的ViewHolder绑定问题
3、运行时不会影响APP效率，使用配置方便
4、代码清晰，可读性强

#### 配置使用

在app的build.gradle中添加如下代码（我的Android Studio版本是3.2.1）：

<pre><code>
dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    implementation 'com.android.support:appcompat-v7:28.0.0-alpha1'
    testImplementation 'junit:junit:4.12'
    androidTestImplementation 'com.android.support.test:runner:1.0.2'
    androidTestImplementation 'com.android.support.test.espresso:espresso-core:3.0.2'
    implementation 'com.jakewharton:butterknife:8.2.1'  //添加这一行
}
</code></pre>

#### 绑定

+ 在Activity中绑定
绑定Activity 必须在setContentView之后。使用ButterKnife.bind(this)进行绑定。代码如下：

<pre><code>
public class MainActivity extends AppCompatActivity{  
    @Override  
    protected void onCreate(Bundle savedInstanceState) {  
        super.onCreate(savedInstanceState);  
        setContentView(R.layout.activity_main);  
        //绑定初始化ButterKnife  
        ButterKnife.bind(this);  
    }  
}  
</code></pre>

由于每次都要在Activity中的onCreate绑定Activity，所以个人建议写一个BaseActivity完成绑定，子类继承即可。
+ 在Fragment中绑定
Fragment的生命周期不同于activity。在onCreateView中绑定一个Fragment时，在onDestroyView中将视图设置为null。当你调用bind来为你绑定一个Fragment时,Butter Knife会返回一个Unbinder的实例。在适当的生命周期（onDestroyView）回调中调用它的unbind方法进行Fragment解绑。使用ButterKnife.bind(this, view)进行绑定。代码如下：

<pre><code>
public class ButterknifeFragment extends Fragment{  
    private Unbinder unbinder;  
    @Override  
    public View onCreateView(LayoutInflater inflater, ViewGroup container,  
                             Bundle savedInstanceState) {  
        View view = inflater.inflate(R.layout.fragment, container, false);  
        //返回一个Unbinder值（进行解绑），注意这里的this不能使用getActivity()  
        unbinder = ButterKnife.bind(this, view);  
        return view;  
    }  

    /** 
     * onDestroyView中进行解绑操作 
     */  
    @Override  
    public void onDestroyView() {  
        super.onDestroyView();  
        unbinder.unbind();  
    }  
}  
</code></pre>

+ 在Adapter中绑定
在Adapter的ViewHolder中使用，将ViewHolder加一个构造方法，在new ViewHolder的时候把view传递进去。使用ButterKnife.bind(this, view)进行绑定，代码如下：

<pre><code>
public class MyAdapter extends BaseAdapter {  

  @Override   
  public View getView(int position, View view, ViewGroup parent) {  
    ViewHolder holder;  
    if (view != null) {  
      holder = (ViewHolder) view.getTag();  
    } else {  
      view = inflater.inflate(R.layout.testlayout, parent, false);  
      holder = new ViewHolder(view);  
      view.setTag(holder);  
    }  

    holder.name.setText("Donkor");  
    holder.job.setText("Android");
    // etc...  
    return view;  
  }  

  static class ViewHolder {  
    @BindView(R.id.title) TextView name;  
    @BindView(R.id.job) TextView job;  

    public ViewHolder(View view) {  
      ButterKnife.bind(this, view);  
    }  
  }  
}  
</code></pre>

#### 基本使用

+ 绑定View
	+ 控件id注解：@BindView()

	```
    @BindView(R.id.password)
    EditText password;
    @BindView(R.id.btn_login)
    Button login;
	```

	+ 多个控件id注解：@BindViews()

	```
	 @OnClick({R.id.btn_login, R.id.btn_clear})
	 public void onClick(View v) {
        int id = v.getId();
        switch (id) {
            case R.id.btn_login: loginPresenter.doLogin(account.getText().toString(), password.getText().toString()); break;
            case R.id.btn_clear: loginPresenter.clear();break;
        }
    }
	```

+ 绑定资源
	+ 绑定string字符串：@BindString()

	```
	@BindString(R.string.app_name)  //绑定资源文件中string字符串  
    String str;
    ```

    + 绑定string里面array数组：@Bind Array()

	```
	<resources>  
    <string name="app_name">城市</string>  
    <string-array name="city">  
        <item>北京市</item>  
        <item>天津市</item>  
        <item>哈尔滨市</item>  
        <item>大连市</item>  
        <item>香港市</item>  
    </string-array>  
    </resources> 
	```

	```
    @BindString(R.string.app_name)  //绑定资源文件中string字符串  
    String str;
    ```

	+ 绑定Bitmap资源：@BindBitmap()

	```
	@BindBitmap( R.mipmap.bm)//绑定Bitmap 资源  
    public Bitmap bitmap ;
    ```

	+ 绑定一个颜色值：@BindColor( )

	```
	@BindColor( R.color.colorAccent ) //具体色值在color文件中  
    int black ;  //绑定一个颜色值 
	```
	
+ 绑定事件
	+ 点击事件
	+ 长按事件

	```
	@OnClick(R.id.button1 )   //给 button1 设置一个点击事件  
    public void showToast(){  
        Toast.makeText(this, "is a click", Toast.LENGTH_SHORT).show();  
    }
    @OnLongClick( R.id.button1 )    //给 button1 设置一个长按事件  
    public boolean showToast2(){  
        Toast.makeText(this, "is a long click", Toast.LENGTH_SHORT).show();  
        return true ;  
    }
	```

+ 绑定监听

	+ Listeners可以自动配置到方法中

	```
	@OnClick(R.id.submit)  
    public void submit(View view) {  
      // TODO submit data to server...  
    }  
	```

	+ 对监听器的所有参数都是可选的

	```
	@OnClick(R.id.submit)  
    public void submit() {  
     // TODO submit data to server...  
    }  
	```

	+ 自定义一个特定类型，它将自动被转换

	```
	@OnClick(R.id.submit)  
    public void sayHi(Button button) {//看括号内参数的变化就明白了  
      button.setText("Hello!");  
    }  
	```

	+ 在单个绑定中指定多个id，用于公共事件处理。这里举例点击事件。其他的事件监听同样也是可以的

	```
	@OnClick(R.id.submitCode,R.id.submitFile,R.id.submitTest)  
    public void sayHi(Button button) {//多个控件对应公共事件
      button.setText("Success!");  
    }  
    ```

	+ 自定义视图可以通过不指定id来绑定它们自己的监听器

	```
	public class FancyButton extends Button {  
        @OnClick  
        public void onClick() {  
        // TODO do something!  
      }  
    }
	```

+ 使用findViewById

Butter Knife仍然包含了findById()方法，用于仍需从一个view ，Activity，或者Dialog上初始化view的时候，并且它可以自动转换类型。

```
View view = LayoutInflater.from(context).inflate(R.layout.thing, null);  
TextView firstName = ButterKnife.findById(view, R.id.first_name);  
TextView lastName = ButterKnife.findById(view, R.id.last_name);  
ImageView iv = ButterKnife.findById(view, R.id.iv);  
```
+ 设置多个view的属性

	+ apply()：允许你立即对列表中的所有试图进行操作
	+ Action和Setter接口：允许指定简单的行为

	```
	public class MainActivity extends AppCompatActivity {  
    @BindViews({R2.id.first_name, R2.id.middle_name, R2.id.last_name})  
    List<EditText> nameViews;  
    @Override  
    protected void onCreate(Bundle savedInstanceState) {  
        super.onCreate(savedInstanceState);  
        setContentView(R.layout.activity_main);  
        //绑定activity  
        ButterKnife.bind(this);  
        //设置多个view的属性  
        //方式1：传递值  
        ButterKnife.apply(nameViews, DISABLE);  
        //方式2：指定值  
        ButterKnife.apply(nameViews, ENABLED, false);  
        ////方式3 设置View的Property  
        ButterKnife.apply(nameViews, View.ALPHA, 0.0f);//一个Android属性也可以用于应用的方法。  
    }  
    /* 
    * Action接口设置属性 
    */  
    static final ButterKnife.Action<View> DISABLE = new ButterKnife.Action<View>() {  
        @Override  
        public void apply(View view, int index) {  
            view.setEnabled(false);//目的是使多个view都具备此属性  
        }  
    };  
    /* 
    * Setter接口设置属性 
    */  
    static final ButterKnife.Setter<View, Boolean> ENABLED = new ButterKnife.Setter<View, Boolean>() {  
        @Override  
        public void set(View view, Boolean value, int index) {  
            view.setEnabled(value);//目的是使多个view都具备此属性，可变boolean值是可以传递的  
        }  
    };  
    }  
    ```

+ 使用注意事项

	+ ButterKinfe的注解标签因版本不同而有所变化
	8.0.0之前的Bind标签在8.0.0之后变成了BindView，而8.7.0之后在绑定view时，要用R2.id.XXX而不再是常用的R.id.XXX了。
	+ 默认情况下，@bind和 listener 的绑定是必需的。如果无法找到目标视图，将抛出一个异常。 
要抑制此行为并创建可选绑定，可以将@Nullable注解添加到字段中，或将@Optional注解添加到方法。
+ 更多绑定注解
>@BindView—->绑定一个view；id为一个view 变量
@BindViews —-> 绑定多个view；id为一个view的list变量
@BindArray—-> 绑定string里面array数组；@BindArray(R.array.city ) String[] citys ;
@BindBitmap—->绑定图片资源为Bitmap；@BindBitmap( R.mipmap.wifi ) Bitmap bitmap;
@BindBool —->绑定boolean值
@BindColor —->绑定color；@BindColor(R.color.colorAccent) int black;
@BindDimen —->绑定Dimen；@BindDimen(R.dimen.borth_width) int mBorderWidth;
@BindDrawable —-> 绑定Drawable；@BindDrawable(R.drawable.test_pic) Drawable mTestPic;
@BindFloat —->绑定float
@BindInt —->绑定int
@BindString —->绑定一个String id为一个String变量；@BindString( R.string.app_name ) String meg;

+ 更多事件注解
>@OnClick—->点击事件
@OnCheckedChanged —->选中，取消选中
@OnEditorAction —->软键盘的功能键
@OnFocusChange —->焦点改变
@OnItemClick item—->被点击(注意这里有坑，如果item里面有Button等这些有点击的控件事件的，需要设置这些控件属性focusable为false)
@OnItemLongClick item—->长按(返回真可以拦截onItemClick)
@OnItemSelected —->item被选择事件
@OnLongClick —->长按事件
@OnPageChange —->页面改变事件
@OnTextChanged —->EditText里面的文本变化事件
@OnTouch —->触摸事件
@Optional —->选择性注入，如果当前对象不存在，就会抛出一个异常，为了压制这个异常，可以在变量或者方法上加入一下注解,让注入变成选择性的,如果目标View存在,则注入, 不存在,则什么事情都不做

+ ButterKnife的代码混淆
+ ButterKnife插件：zelezny
	+ 插件安装
	+ 插件使用
	
参考：[https://blog.csdn.net/donkor_/article/details/77879630](https://blog.csdn.net/donkor_/article/details/77879630)