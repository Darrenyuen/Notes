> 常用于实现页面的滚动，可应用于广告页，导航页，菜单页等
#### 基本使用

##### 1. 在布局文件中加入ViewPager控件
```
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent"
    tools:context="com.example.testviewpage_1.MainActivity" >
 
<android.support.v4.view.ViewPager
    android:id="@+id/viewpager"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:layout_gravity="center" />
</RelativeLayout>
```
##### 2. 新建三个layout文件，实现滚动它们
+ layout1.xml
```
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="#ffffff"
    android:orientation="vertical" >
</LinearLayout>
```
+ layout2.xml
```
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="#ffff00"
    android:orientation="vertical" >
</LinearLayout>
```
+ layout3.xml
```
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="#ff00ff"
    android:orientation="vertical" >
</LinearLayout>
```
##### 3. Activity中的代码
```
package com.example.testviewpage_1;

import java.util.ArrayList;
import java.util.List;
import java.util.zip.Inflater;
 
import android.app.Activity;
import android.os.Bundle;
import android.support.v4.view.PagerAdapter;
import android.support.v4.view.ViewPager;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
 
 
public class MainActivity extends Activity {
 
	private View view1, view2, view3;
	private ViewPager viewPager;  //对应的viewPager
	
	private List<View> viewList;//view数组

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        
        viewPager = (ViewPager) findViewById(R.id.viewpager);
        LayoutInflater inflater=getLayoutInflater();
        view1 = inflater.inflate(R.layout.layout1, null);
        view2 = inflater.inflate(R.layout.layout2,null);
        view3 = inflater.inflate(R.layout.layout3, null);
        
        viewList = new ArrayList<View>();// 将要分页显示的View装入数组中
		viewList.add(view1);
		viewList.add(view2);
		viewList.add(view3);

		PagerAdapter pagerAdapter = new PagerAdapter() {	
			@Override
			public boolean isViewFromObject(View arg0, Object arg1) {
				// TODO Auto-generated method stub
				return arg0 == arg1;
			}	
			@Override
			public int getCount() {
				// TODO Auto-generated method stub
				return viewList.size();
			}
			@Override
			public void destroyItem(ViewGroup container, int position,
					Object object) {
				// TODO Auto-generated method stub
				container.removeView(viewList.get(position));
			}	
			@Override
			public Object instantiateItem(ViewGroup container, int position) {
				// TODO Auto-generated method stub
				container.addView(viewList.get(position));
				return viewList.get(position);
			}
		};
		viewPager.setAdapter(pagerAdapter);
    }
}
```

#### 详解PagerAdaper中的四大函数

[参考此博客](https://blog.csdn.net/harvic880925/article/details/38487149)或者阅读官方文档
PagerAdapter （与ViewPagerAdapter, FragmentAdapter不同）必须重写的四个函数：

1. boolean isViewFromObject(View arg0, Object arg1)
2. int getCount() 
3. void destroyItem(ViewGroup container, int position,Object object)
4. Object instantiateItem(ViewGroup container, int position)
#### PagerTabStrip与PagerTitleStrip添加标题栏的异同
+ 注：PagerTabStrip和PagerTitleStrip都不适合用在实际用途中，当要在实际中运用，我们就要自己去实现相关的功能。

| 同 | 异|
|----|----|
|经常作为ViewPager控件的一个子控件被被添加在XML布局文件中。在布局文件中，将它作为子控件添加在ViewPager中。而且要将它的 android:layout_gravity 属性设置为TOP或BOTTOM来将它显示在ViewPager的顶部或底部。每个页面的标题是通过适配器的getPageTitle(int)函数提供给ViewPager的。`public CharSequence getPageTitle(int position){}`|PagerTabStrip是ViewPager的一个关于当前页面、上一个页面和下一个页面的一个非交互的指示器。PagerTabStrip是ViewPager的一个关于当前页面、上一个页面和下一个页面的一个可交互的指示器。关键在于能否交互。|
[自主实现滑动指示条](https://blog.csdn.net/harvic880925/article/details/38557517)

#### 使用Fragment实现ViewPager滑动
Android官方最推荐的一种实现ViewPager滑动的方法是使用fragment（前文是使用View实现）
&ensp;&ensp;&ensp;&ensp;我们知道，实现ViewPager是要有适配器的，前面用的适配器是PagerAdapter，而对于fragment,它所使用的适配器是：FragmentPagerAdapter。

&ensp;&ensp;&ensp;&ensp;FragmentPagerAdapter派生自PagerAdapter，它是用来呈现Fragment页面的，这些Fragment页面会一直保存在fragment manager中，以便用户可以随时取用。

&ensp;&ensp;&ensp;&ensp;这个适配器最好用于有限个静态fragment页面的管理。尽管不可见的视图有时会被销毁，但用户所有访问过的fragment都会被保存在内存中。因此fragment实例会保存大量的各种状态，这就造成了很大的内存开销。所以如果要处理大量的页面切换，建议使用FragmentStatePagerAdapter.

&ensp;&ensp;&ensp;&ensp;每一个使用FragmentPagerAdapter的ViewPager都要有一个有效的ID集合，有效ID的集合就是Fragment的集合（感谢夫诸同学的提示）

&ensp;&ensp;&ensp;&ensp;对于FragmentPagerAdapter的派生类，只需要重写getItem(int)和getCount()就可以了。
```

public class FragAdapter extends FragmentPagerAdapter {
 
	private List<Fragment> mFragments;
	
	public FragAdapter(FragmentManager fm,List<Fragment> fragments) {
		super(fm);
		// TODO Auto-generated constructor stub
		mFragments=fragments;
	}
 
	@Override
	public Fragment getItem(int arg0) {
		// TODO Auto-generated method stub
		return mFragments.get(arg0);
	}
 
	@Override
	public int getCount() {
		// TODO Auto-generated method stub
		return mFragments.size();
	}
 
}
```
```
public class MainActivity extends FragmentActivity {
 
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
 
        //构造适配器
        List<Fragment> fragments=new ArrayList<Fragment>();
        fragments.add(new Fragment1());
        fragments.add(new Fragment2());
        fragments.add(new Fragment3()); 
        FragAdapter adapter = new FragAdapter(getSupportFragmentManager(), fragments);
        
        //设定适配器
        ViewPager vp = (ViewPager)findViewById(R.id.viewpager);
        vp.setAdapter(adapter);
    }
 
}
```

